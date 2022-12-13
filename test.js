"use strict";

describe("Account Object tests", () => {
    describe("Account creation", () => {
        it("should successfully create an account instance", () => {
            let account = new Account(12345);
            expect(account.toString()).to.eql("Account 12345: balance 0");
        });
    });
})

describe("Account Operation tests", () => {

    beforeEach(() => {
        this.account = new Account(12345);
    });

    describe("deposit", () => {
        it("should successfully deposit an amount of money into the account", () => {
            const amount = 1000;
            this.account.deposit(amount);
            expect(this.account.getBalance()).to.eql(amount);
        });
    });

    describe("unsuccessful deposit for invalid amount", () => {
        it("should not deposit into account if the amount is less than 0", () => {
            const amount = -1;
            expect(() => {
                this.account.deposit(amount);
            }).to.throw(RangeError, "Deposit amount has to be greater than zero");
        });
    });

    describe("withdraw", () => {
        it("should successfully withdraw a valid amount of money from the account", () => {
            const amount = 1000;
            this.account.deposit(amount);
            this.account.withdraw(500);
            expect(this.account.getBalance()).to.eql(500);
        });
    });

    describe("unsuccessful withdraw with insufficient balance", () => {
        it("should not withdraw from the account if the balance is insufficient", () => {
            const amount = 1000;
            expect(() => {
                this.account.withdraw(amount);
            }).to.throw(Error, "Insufficient funds");
        });
    });

    describe("unsuccessful withdraw for invalid amount", () => {
        it("should not withdraw from the account if the amount is less than 0", () => {
            const amount = -1;
            expect(() => {
                this.account.withdraw(amount);
            }).to.throw(RangeError, "Withdraw amount has to be greater than zero");
        });
    });
});

describe('Checking Account Test', () => {
    it('should not withdraw if overdraft limit is exceeded', () => {
        let checkingAccount = new CheckingAccount(12345, 200);
        expect(() => {
            checkingAccount.withdraw(500);
        }).to.throw(Error, "Overdraft limit exceeded!");
    });
});

describe('Bank Tests', () => {

    let bank;
    beforeEach(() => {
        bank = new Bank()
    });
    describe('Account Actions', () => {

        describe('Account Addition', () => {
            describe('Default Account', () => {
                it('should successfully add a default Account', () => {
                    bank.addAccount();
                    expect(bank.getAccounts().length).to.eql(1);
                    expect(bank.getAccounts()[0].getNumber()).to.eql(1);
                });
            });

            describe('Savings Account', () => {
                it('should successfully add a savings Account', () => {
                    bank.addSavingsAccount(5);
                    expect(bank.getAccounts().length).to.eql(1);
                    expect(bank.getAccounts()[0].getNumber()).to.eql(2);
                    expect(bank.getAccounts()[0].getInterest()).to.eql(5);
                });
            });

            describe('Checking Account', () => {
                it('should successfully add a checking Account', () => {
                    bank.addCheckingAccount(200);
                    expect(bank.getAccounts().length).to.eql(1);
                    expect(bank.getAccounts()[0].getNumber()).to.eql(3);
                    expect(bank.getAccounts()[0].getOverdraftLimit()).to.eql(200);
                });
            });
        });

        describe('Account Closure', () => {
            it('should successfully close an Account in the Bank', () => {
                bank.addCheckingAccount(200);
                const accountToClose = bank.getAccounts()[0];
                bank.closeAccount(4);
                expect(bank.getAccounts().length).to.eql(0);
                expect(bank.getAccounts().includes(accountToClose)).to.be.false;
            });
        });
    });


    describe('Account Report', () => {
        it('should generate an account report for all bank accounts within the bank', () => {
            bank.addSavingsAccount(5);
            bank.addSavingsAccount(10);
            bank.addCheckingAccount(300);

            expect(bank.accountReport()).to.eql("\nSavings Account 5: balance 0" +
                "\nSavings Account 6: balance 0" +
                "\nChecking Account 7: balance 0");
        });
    });

    describe('End Of month test', () => {
        it('should generate and endOfMonth Status by Performing needed actions at the end of the month', () => {
            bank.addSavingsAccount(5);
            bank.addSavingsAccount(10);
            bank.addCheckingAccount(300);
            console.log(bank.endOfMonth());
            expect(bank.endOfMonth()).to.eql("\nInterest added SavingsAccount 8: balance: 0 interest: 5" +
                "\nInterest added SavingsAccount 9: balance: 0 interest: 10" +
                "\nNo action for Checking account");
        });
    });
});