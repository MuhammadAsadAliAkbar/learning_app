from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

app = FastAPI(title="Accounting Calculators", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


class DepSLM(BaseModel):
    cost: float
    residual: float = 0
    life_years: float


class DepWDV(BaseModel):
    cost: float
    rate_percent: float
    years: int


class EquationTxn(BaseModel):
    description: str
    assets: float = 0
    liabilities: float = 0
    capital: float = 0


class BRSItem(BaseModel):
    description: str
    amount: float
    effect: str  # add_to_cashbook | less_from_cashbook | add_to_passbook | less_from_passbook


class BRSRequest(BaseModel):
    cashbook_balance: float
    is_favourable: bool = True
    items: List[BRSItem] = []


class JournalLine(BaseModel):
    account: str
    debit: float = 0
    credit: float = 0


class JournalEntry(BaseModel):
    lines: List[JournalLine]
    narration: str = ""


@app.get("/")
def root():
    return {"service": "Accounting Calculators (Python)", "tools": ["depreciation-slm", "depreciation-wdv", "equation", "brs", "journal-check"]}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/calc/depreciation-slm")
def dep_slm(body: DepSLM):
    if body.life_years <= 0:
        return {"success": False, "message": "Life must be > 0"}
    annual = (body.cost - body.residual) / body.life_years
    schedule = []
    book = body.cost
    for y in range(1, int(body.life_years) + 1):
        book = round(book - annual, 2)
        if book < body.residual:
            book = body.residual
        schedule.append({"year": y, "depreciation": round(annual, 2), "book_value": round(book, 2)})
    return {
        "success": True,
        "method": "Straight Line",
        "annual_depreciation": round(annual, 2),
        "schedule": schedule,
        "journal": f"Depreciation A/c Dr. {round(annual, 2)}\n    To Asset A/c {round(annual, 2)}",
    }


@app.post("/calc/depreciation-wdv")
def dep_wdv(body: DepWDV):
    rate = body.rate_percent / 100
    schedule = []
    book = body.cost
    for y in range(1, body.years + 1):
        dep = round(book * rate, 2)
        book = round(book - dep, 2)
        schedule.append({"year": y, "depreciation": dep, "book_value": book})
    return {
        "success": True,
        "method": "Written Down Value",
        "rate": body.rate_percent,
        "schedule": schedule,
    }


@app.post("/calc/equation")
def equation(txns: List[EquationTxn]):
    assets = liabilities = capital = 0
    steps = []
    for t in txns:
        assets += t.assets
        liabilities += t.liabilities
        capital += t.capital
        steps.append({
            "description": t.description,
            "assets": round(assets, 2),
            "liabilities": round(liabilities, 2),
            "capital": round(capital, 2),
            "balanced": abs(assets - (liabilities + capital)) < 0.01,
        })
    final_ok = abs(assets - (liabilities + capital)) < 0.01
    return {
        "success": True,
        "final": {"assets": round(assets, 2), "liabilities": round(liabilities, 2), "capital": round(capital, 2)},
        "equation_holds": final_ok,
        "steps": steps,
    }


@app.post("/calc/brs")
def brs(body: BRSRequest):
    bal = body.cashbook_balance
    adjustments = []
    for item in body.items:
        if item.effect == "add_to_cashbook":
            bal += item.amount
            adjustments.append(f"Add: {item.description} = {item.amount}")
        elif item.effect == "less_from_cashbook":
            bal -= item.amount
            adjustments.append(f"Less: {item.description} = {item.amount}")
    return {
        "success": True,
        "starting_balance": body.cashbook_balance,
        "adjusted_balance": round(bal, 2),
        "adjustments": adjustments,
        "note": "This is the balance as per Pass Book (after adjustments from Cash Book side).",
    }


@app.post("/calc/journal-check")
def journal_check(entry: JournalEntry):
    total_dr = sum(l.debit for l in entry.lines)
    total_cr = sum(l.credit for l in entry.lines)
    balanced = abs(total_dr - total_cr) < 0.01
    return {
        "success": True,
        "total_debit": round(total_dr, 2),
        "total_credit": round(total_cr, 2),
        "balanced": balanced,
        "message": "Entry is balanced (Debit = Credit)" if balanced else "Entry is NOT balanced. Debit must equal Credit.",
        "narration": entry.narration,
    }


@app.post("/calc/trial-balance")
def trial_balance(accounts: List[Dict[str, Any]]):
    """accounts: [{name, debit, credit}]"""
    total_dr = sum(float(a.get("debit", 0) or 0) for a in accounts)
    total_cr = sum(float(a.get("credit", 0) or 0) for a in accounts)
    return {
        "success": True,
        "total_debit": round(total_dr, 2),
        "total_credit": round(total_cr, 2),
        "tallies": abs(total_dr - total_cr) < 0.01,
        "difference": round(abs(total_dr - total_cr), 2),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
