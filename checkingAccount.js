"use strict";

class CheckingAccount extends Account {
    constructor(number, overdraftLimit = 500) {
        super(number);
        this._overdraftLimit = overdraftLimit;
    }

    getOverdraftLimit() {
        return this._overdraftLimit;
    }

    setOverdraftLimit(limit) {
        this._overdraftLimit = limit;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new RangeError("Withdraw amount has to be greater than zero");
        }

        if (amount > (this._balance + this._overdraftLimit)) {
            throw Error("Overdraft limit exceeded!");
        }
        this._balance -= amount;

        return undefined;
    }

    toString() {
        return "Checking Account " + this._number + ": balance " + this._balance;
    }

    endOfMonth() {
        return this._balance < 0 ? `Warning, low balance CheckingAccount 3: balance: -100 overdraft limit: 500`
            : "No action for Checking account";
    }
}