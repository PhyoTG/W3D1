class Bank {
    static nextNumber = 1;

    constructor() {
        this._accounts = [];
    }

    getAccounts() {
        return this._accounts;
    }

    addAccount() {
        this._accounts.push(new Account(Bank.nextNumber++));
    }

    addSavingsAccount(interest) {
        this._accounts.push(new SavingsAccount(Bank.nextNumber++, interest));
    }

    addCheckingAccount(overdraft) {
        this._accounts.push(new CheckingAccount(Bank.nextNumber++, overdraft));
    }

    closeAccount(number) {
        this._accounts = this._accounts.filter(x => x.getNumber() !== number);
    }

    accountReport() {
        return this._accounts.reduce((a, b) => a.toString() + "\n" + b.toString(), "");
    }

    endOfMonth() {
        return this._accounts.map(a => a.endOfMonth()).reduce((a, b) => a + "\n" + b, "");
    }
}