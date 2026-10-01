module.exports = [
  {
    chapterId: 'ch1',
    number: 1,
    title: 'Introduction to Accounting',
    sections: [
      {
        title: 'Meaning and Definition of Accounting',
        content: `Accounting is the process of identifying, measuring, recording, classifying, summarising, analysing, interpreting and communicating financial information of an organisation to enable users to make informed decisions.

American Institute of Certified Public Accountants (AICPA) defines Accounting as: "the art of recording, classifying and summarising in a significant manner and in terms of money, transactions and events which are, in part at least, of a financial character, and interpreting the results thereof."`,
        examples: ['Recording purchase of goods', 'Preparing financial statements'],
      },
      {
        title: 'Objectives of Accounting',
        content: `1. To maintain systematic records of business transactions
2. To ascertain profit or loss of the business
3. To show the financial position (Balance Sheet)
4. To provide information to users for decision making
5. To help in compliance with legal requirements
6. To facilitate comparison (inter-firm and intra-firm)`,
        examples: [],
      },
      {
        title: 'Functions of Accounting',
        content: `• Recording (Journal)
• Classifying (Ledger)
• Summarising (Trial Balance, Final Accounts)
• Analysing and Interpreting
• Communicating results to stakeholders`,
        examples: [],
      },
      {
        title: 'Bookkeeping vs Accounting',
        content: `Bookkeeping is the process of recording financial transactions systematically. It is clerical in nature.

Accounting is broader – it includes bookkeeping plus analysing, interpreting and reporting. Accounting starts where bookkeeping ends.`,
        examples: ['Bookkeeping = Journal & Ledger | Accounting = Final Accounts + Analysis'],
      },
      {
        title: 'Users of Accounting Information',
        content: `Internal Users: Owners, Management, Employees
External Users: Investors, Creditors/Banks, Government (Tax), Customers, Researchers, Public`,
        examples: [],
      },
    ],
    quiz: [
      {
        question: 'Accounting is mainly concerned with transactions of which nature?',
        options: ['Personal', 'Financial', 'Social', 'Political'],
        correctIndex: 1,
        explanation: 'Accounting deals with financial transactions expressed in money.',
      },
      {
        question: 'Which is broader – Bookkeeping or Accounting?',
        options: ['Bookkeeping', 'Accounting', 'Both same', 'Neither'],
        correctIndex: 1,
        explanation: 'Accounting includes bookkeeping plus analysis and interpretation.',
      },
    ],
  },
  {
    chapterId: 'ch2',
    number: 2,
    title: 'Basic Accounting Concepts',
    sections: [
      {
        title: 'Business Entity Concept',
        content: 'Business is treated as separate from its owner. Personal transactions of owner are not recorded in business books. Capital introduced is liability of business to owner.',
        examples: ['Owner withdraws cash → Drawings (not expense of owner personally in books)'],
      },
      {
        title: 'Going Concern Concept',
        content: 'Business is assumed to continue for foreseeable future. Assets are recorded at cost, not liquidation value. This justifies depreciation over useful life.',
        examples: [],
      },
      {
        title: 'Money Measurement Concept',
        content: 'Only transactions measurable in money are recorded. Qualitative factors (skill of manager, good location) are not recorded.',
        examples: ['Loyalty of customers – not recorded'],
      },
      {
        title: 'Accounting Period Concept',
        content: 'Life of business is divided into equal periods (usually 1 year) for reporting profit/loss and financial position. Financial year may be calendar year or any 12 months.',
        examples: [],
      },
      {
        title: 'Cost Concept',
        content: 'Assets are recorded at historical cost (purchase price + incidental costs). Market value is generally ignored in books (except certain revaluations).',
        examples: [],
      },
      {
        title: 'Dual Aspect Concept',
        content: 'Every transaction has two aspects – Debit and Credit. Accounting Equation: Assets = Liabilities + Capital. This is the foundation of double-entry system.',
        examples: ['Buy furniture for cash: Furniture↑ (Asset) and Cash↓ (Asset)'],
      },
      {
        title: 'Matching Concept',
        content: 'Expenses of a period are matched with revenues of the same period to ascertain correct profit. Accrual basis is followed.',
        examples: ['Outstanding salary is recorded even if not paid'],
      },
    ],
    quiz: [
      {
        question: 'Assets = Liabilities + ?',
        options: ['Drawings', 'Capital', 'Expenses', 'Revenue'],
        correctIndex: 1,
        explanation: 'Basic accounting equation: Assets = Liabilities + Capital.',
      },
    ],
  },
  {
    chapterId: 'ch3',
    number: 3,
    title: 'Accounting Equation',
 dualAspect: true,
    sections: [
      {
        title: 'Assets, Liabilities, Capital, Drawings',
        content: `Assets: Resources owned by business (Cash, Debtors, Stock, Furniture, Building)
Liabilities: Amounts owed to outsiders (Creditors, Bank Loan, Outstanding expenses)
Capital: Owner's claim on assets (Capital introduced − Drawings + Profit − Loss)
Drawings: Withdrawal of cash/goods by owner for personal use (reduces capital)`,
        examples: [],
      },
      {
        title: 'Effect of Transactions on Accounting Equation',
        content: `Every transaction affects the equation but it always remains balanced.

Examples:
1. Started business with cash 1,00,000 → Assets↑ Capital↑
2. Bought goods for cash 20,000 → Stock↑ Cash↓
3. Bought goods on credit 10,000 → Stock↑ Creditors↑
4. Sold goods for cash (cost 5,000, sold 8,000) → Cash↑ Stock↓ Capital↑ (profit)
5. Paid rent 2,000 → Cash↓ Capital↓ (expense)
6. Owner withdrew 5,000 → Cash↓ Capital↓ (drawings)`,
        examples: [],
      },
    ],
    quiz: [
      {
        question: 'Purchase of furniture for cash affects which side?',
        options: ['Only Assets', 'Assets and Capital', 'Assets and Liabilities', 'Only Capital'],
        correctIndex: 0,
        explanation: 'One asset increases, another decreases – total assets unchanged in composition change.',
      },
    ],
  },
  {
    chapterId: 'ch4',
    number: 4,
    title: 'Journal',
    sections: [
      {
        title: 'Meaning of Journal',
        content: 'Journal is the book of original entry. All transactions are first recorded in Journal in chronological order with debit and credit aspects and narration.',
        examples: [],
      },
      {
        title: 'Rules of Debit and Credit (Traditional)',
        content: `Personal Accounts: Debit the receiver, Credit the giver
Real Accounts: Debit what comes in, Credit what goes out
Nominal Accounts: Debit all expenses & losses, Credit all incomes & gains`,
        examples: [],
      },
      {
        title: 'Modern Rules (based on Accounting Equation)',
        content: `Assets & Expenses → Increase Debit, Decrease Credit
Liabilities, Capital & Income → Increase Credit, Decrease Debit`,
        examples: [],
      },
      {
        title: 'Journal Entries, Simple & Compound, Narration',
        content: `Format: Date | Particulars | L.F. | Debit (₹) | Credit (₹)

Simple entry: One debit, one credit
Compound entry: More than one debit or credit in a single entry

Narration: Brief explanation written below the entry in brackets.`,
        examples: [
          'Cash A/c Dr. 50,000\n  To Capital A/c 50,000\n(Being capital introduced)',
          'Purchases A/c Dr. 10,000\n  To Cash A/c 6,000\n  To Creditors A/c 4,000\n(Being goods purchased partly cash partly credit)',
        ],
      },
    ],
    quiz: [
      {
        question: 'Real Account rule is:',
        options: ['Debit receiver', 'Debit what comes in', 'Debit expenses', 'Credit what comes in'],
        correctIndex: 1,
        explanation: 'Real A/c: Debit what comes in, Credit what goes out.',
      },
    ],
  },
  {
    chapterId: 'ch5',
    number: 5,
    title: 'Ledger',
    sections: [
      {
        title: 'Meaning and Purpose',
        content: 'Ledger is the principal book of accounts. All journal entries are posted to respective ledger accounts. It shows balance of each account.',
        examples: [],
      },
      {
        title: 'Posting and Balancing',
        content: `Posting: Transferring debit/credit from Journal to Ledger.
Balancing: Total of debit side vs credit side. Difference is balance.
- Debit balance: Assets & Expenses
- Credit balance: Liabilities, Capital & Income

Closing balance of one period becomes opening balance of next.`,
        examples: [],
      },
    ],
    quiz: [
      {
        question: 'Ledger is also called:',
        options: ['Book of original entry', 'Principal book', 'Subsidiary book', 'Cash book only'],
        correctIndex: 1,
        explanation: 'Ledger is the principal book of accounts.',
      },
    ],
  },
  {
    chapterId: 'ch6',
    number: 6,
    title: 'Cash Book',
    sections: [
      {
        title: 'Types of Cash Book',
        content: `Single Column: Only Cash column
Double Column: Cash + Bank (or Cash + Discount)
Three Column: Cash + Bank + Discount (allowed & received)

Cash Book is both Journal and Ledger for cash/bank transactions.`,
        examples: [],
      },
      {
        title: 'Cash Discount & Bank Transactions',
        content: `Cash Discount: Allowed to encourage prompt payment. Discount Allowed (expense) Dr., Discount Received (income) Cr.

Contra Entry: Transfer between Cash and Bank (C in L.F. column). Both sides of Cash Book are affected.`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch7',
    number: 7,
    title: 'Bank Reconciliation Statement',
    sections: [
      {
        title: 'Meaning, Purpose & Causes of Difference',
        content: `BRS is a statement that reconciles the difference between Cash Book (Bank column) balance and Pass Book / Bank Statement balance.

Causes:
• Cheques issued but not yet presented
• Cheques deposited but not yet credited
• Bank charges / interest credited by bank not in Cash Book
• Direct deposits by customers
• Errors in Cash Book or Pass Book`,
        examples: [],
      },
      {
        title: 'Preparation of BRS',
        content: `Start with Cash Book balance (or Pass Book balance) and adjust the items that cause difference to arrive at the other balance.

Favourable balance = Debit balance in Cash Book / Credit balance in Pass Book.`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch8',
    number: 8,
    title: 'Trial Balance',
    sections: [
      {
        title: 'Meaning, Objectives & Preparation',
        content: `Trial Balance is a statement of debit and credit balances of all ledger accounts on a particular date.

Objectives:
1. To check arithmetical accuracy of books
2. To help in preparation of Final Accounts
3. To locate errors

If Trial Balance does not tally, there are errors.`,
        examples: [],
      },
      {
        title: 'Errors affecting Trial Balance',
        content: `Errors that make TB disagree:
• Wrong totalling of subsidiary books
• Posting to wrong side
• Omitting to post one aspect
• Wrong balancing of accounts

Errors that do NOT affect TB (still books wrong):
• Errors of omission (complete)
• Errors of principle
• Compensating errors
• Errors of commission (wrong account same side)`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch9',
    number: 9,
    title: 'Errors and Their Correction',
    sections: [
      {
        title: 'Types of Errors',
        content: `1. Errors of Omission – transaction completely or partially not recorded
2. Errors of Commission – wrong amount, wrong account, wrong side
3. Errors of Principle – capital vs revenue treated wrongly (e.g. purchase of asset debited to Purchases)
4. Compensating Errors – one error cancels another

Rectification: Through Journal entries (when books are closed, via Suspense A/c if needed).`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch10',
    number: 10,
    title: 'Depreciation',
    sections: [
      {
        title: 'Meaning & Causes',
        content: `Depreciation is the permanent and continuous decrease in the book value of a fixed asset due to use, wear and tear, passage of time, obsolescence, etc.

Causes: Physical wear & tear, effluxion of time, obsolescence, depletion (for mines).`,
        examples: [],
      },
      {
        title: 'Straight Line Method (SLM)',
        content: `Depreciation = (Cost − Residual Value) / Useful Life

Equal amount every year. Also called Fixed Instalment Method.

Journal: Depreciation A/c Dr. To Asset A/c (or Provision for Depreciation A/c)`,
        examples: ['Cost 1,00,000, Scrap 10,000, Life 9 years → Dep = 10,000 p.a.'],
      },
      {
        title: 'Written Down Value (WDV) / Reducing Balance',
        content: `Depreciation = Rate % × Book Value at beginning of year

Higher depreciation in early years. Rate is fixed but amount reduces.

Suitable for assets that lose more value in initial years (e.g. vehicles, computers).`,
        examples: [],
      },
    ],
    quiz: [
      {
        question: 'Which method charges equal depreciation every year?',
        options: ['WDV', 'Straight Line', 'Annuity', 'Depletion'],
        correctIndex: 1,
        explanation: 'Straight Line Method charges equal amount each year.',
      },
    ],
  },
  {
    chapterId: 'ch11',
    number: 11,
    title: 'Final Accounts',
    sections: [
      {
        title: 'Trading Account',
        content: `Trading A/c finds Gross Profit or Gross Loss.

Debit: Opening Stock, Purchases, Direct Expenses (wages, carriage inward, fuel...)
Credit: Sales, Closing Stock

Gross Profit = Credit side − Debit side (if credit higher)`,
        examples: [],
      },
      {
        title: 'Profit & Loss Account',
        content: `Starts with Gross Profit. Adds other incomes, deducts indirect expenses (rent, salaries, depreciation, bad debts...) to arrive at Net Profit or Net Loss.

Net Profit is transferred to Capital Account.`,
        examples: [],
      },
      {
        title: 'Balance Sheet',
        content: `Statement of Assets and Liabilities on a particular date (not an account).

Liabilities side: Capital, Loans, Creditors, Outstanding expenses...
Assets side: Fixed Assets, Current Assets (Stock, Debtors, Cash, Bank...)

It always tallies because of dual aspect.`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch12',
    number: 12,
    title: 'Adjustments in Final Accounts',
    sections: [
      {
        title: 'Common Adjustments',
        content: `• Closing Stock – shown in Trading (credit) and Balance Sheet (asset)
• Outstanding Expenses – add to expense in P&L, show as liability
• Prepaid Expenses – deduct from expense, show as asset
• Accrued Income – add to income, show as asset
• Income received in advance – deduct from income, show as liability
• Depreciation – expense in P&L, deduct from asset
• Bad Debts – expense; further bad debts + provision adjustments
• Provision for Doubtful Debts – create/maintain on debtors`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch13',
    number: 13,
    title: 'Capital and Revenue',
    sections: [
      {
        title: 'Capital vs Revenue',
        content: `Capital Expenditure: Benefits more than one year (purchase of fixed assets, improvement). Shown in Balance Sheet.

Revenue Expenditure: Benefits within the year (repairs, rent, salaries). Debited to P&L / Trading.

Capital Receipts: Capital introduced, loan taken, sale of fixed asset. Not income.

Revenue Receipts: Sales, interest received, commission. Credited to P&L / Trading.

Deferred Revenue Expenditure: Large revenue expense whose benefit extends beyond one year (heavy advertising). Written off over years.`,
        examples: [],
      },
    ],
    quiz: [],
  },
  {
    chapterId: 'ch14',
    number: 14,
    title: 'Bills of Exchange',
    sections: [
      {
        title: 'Meaning & Parties',
        content: `Bill of Exchange is an instrument in writing containing an unconditional order, signed by the maker, directing a certain person to pay a certain sum of money only to, or to the order of, a certain person or to the bearer of the instrument (negotiable instrument).

Parties:
• Drawer – who makes the bill (creditor)
• Drawee – who accepts (debtor)
• Payee – who receives payment (may be drawer or third party)`,
        examples: [],
      },
      {
        title: 'Drawing, Acceptance, Discounting, Endorsement, Dishonour, Renewal',
        content: `Drawing: Creditor draws bill on debtor
Acceptance: Drawee signs acceptance
Discounting: Bill endorsed to bank before due date; bank charges discount
Endorsement: Transfer of bill to another person
Dishonour: Non-payment on due date; noting charges may arise
Renewal: New bill drawn on cancellation of old bill (often with interest)`,
        examples: [],
      },
    ],
    quiz: [
      {
        question: 'Who is the drawer of a bill?',
        options: ['Debtor', 'Creditor', 'Bank', 'Payee only'],
        correctIndex: 1,
        explanation: 'Drawer is the creditor who draws the bill on the debtor.',
      },
    ],
  },
];
