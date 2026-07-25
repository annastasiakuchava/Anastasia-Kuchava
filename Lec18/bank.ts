interface Transaction {
  type: "deposit" | "withdraw" | "transfer_in" | "transfer_out";
  amount: number;
  date: Date;
  details?: string;
}

class BankAccount {
  private readonly _accountNumber: string;
  private _balance: number;
  private _transactionHistory: Transaction[] = [];

  constructor(accountNumber: string, initialBalance: number) {
    this._accountNumber = accountNumber;
    this._balance = initialBalance;
    this.recordTransaction("deposit", initialBalance, "საწყისი ბალანსი");
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  get balance(): number {
    return this._balance;
  }

  getAccountInfo(): string {
    return `ანგარიში: ${this._accountNumber}, ბალანსი: ${this._balance} ₾`;
  }

  deposit(amount: number): void {
    if (amount <= 0) return;
    this._balance += amount;
    this.recordTransaction("deposit", amount, "თანხის შეტანა");
  }

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this._balance) return false;
    this._balance -= amount;
    this.recordTransaction("withdraw", amount, "თანხის გატანა");
    return true;
  }

  transferFunds(targetAccount: BankAccount, amount: number): void {
    if (amount <= 0 || this._balance < amount) return;

    this._balance -= amount;
    this.recordTransaction("transfer_out", amount, `გადარიცხვა ანგარიშზე: ${targetAccount.accountNumber}`);

    targetAccount.receiveFunds(this, amount);
  }

  receiveFunds(senderAccount: BankAccount, amount: number): void {
    this._balance += amount;
    this.recordTransaction("transfer_in", amount, `გადმორიცხვა ანგარიშიდან: ${senderAccount.accountNumber}`);
  }

  getTransactionHistory(): Transaction[] {
    return this._transactionHistory;
  }

  private recordTransaction(type: Transaction["type"], amount: number, details?: string): void {
    this._transactionHistory.push({
      type,
      amount,
      date: new Date(),
      details
    });
  }
}

const account1 = new BankAccount("GE00TB0000000001", 1000);
const account2 = new BankAccount("GE00BG0000000002", 500);

account1.deposit(200);
account1.withdraw(100);
account1.transferFunds(account2, 300);

console.log(account1.getAccountInfo());
console.log(account2.getAccountInfo());

console.log("Account 1 History:", account1.getTransactionHistory());
console.log("Account 2 History:", account2.getTransactionHistory());