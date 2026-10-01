# 📚 Accounting Learning & Practice System

Complete educational platform covering **all basic accounting topics** with theory, quizzes, and interactive calculators.

## Curriculum (14 Chapters)

1. Introduction to Accounting  
2. Basic Accounting Concepts  
3. Accounting Equation  
4. Journal  
5. Ledger  
6. Cash Book  
7. Bank Reconciliation Statement  
8. Trial Balance  
9. Errors and Their Correction  
10. Depreciation  
11. Final Accounts  
12. Adjustments in Final Accounts  
13. Capital and Revenue  
14. Bills of Exchange  

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | **Next.js 14** + TypeScript + Tailwind |
| Backend   | **Node.js + Express + MongoDB** |
| Calculators | **Python FastAPI** |

## Features

- Full theory content with examples for every chapter  
- Built-in quizzes with explanations  
- Progress tracking (mark complete, quiz scores)  
- **Practice Tools** (Python-powered):
  - Journal Entry Checker (Debit = Credit)
  - Depreciation Calculator (SLM & WDV + schedule)
  - Accounting Equation simulator
  - Bank Reconciliation Statement builder
  - Trial Balance checker
- JWT Authentication  

## Quick Start

### 1. Backend (Port 5002)
```bash
cd backend
npm install
npm run seed          # loads 14 chapters + demo user
npm run dev
```

**Demo login:** `student@accounting.com` / `student123`

### 2. Python Calculators (Port 8002)
```bash
cd python-service
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### 3. Frontend (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

## Project Structure

```
accounting-learning-system/
├── backend/           # Express API + chapter content
├── frontend/          # Next.js app
├── python-service/    # Depreciation, BRS, Equation, Journal, TB calculators
└── README.md
```

## API Overview

| Endpoint | Description |
|----------|-------------|
| GET /api/chapters | List all chapters |
| GET /api/chapters/:id | Full chapter + quiz |
| POST /api/calc/depreciation-slm | SLM calculator |
| POST /api/calc/depreciation-wdv | WDV calculator |
| POST /api/calc/journal-check | Validate journal entry |
| POST /api/calc/brs | Prepare BRS |
| POST /api/calc/equation | Accounting equation steps |
| POST /api/calc/trial-balance | Check TB tallies |

---

Ideal for students learning Class 11 / B.Com foundation accounting.
# learning_app
