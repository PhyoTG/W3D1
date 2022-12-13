"use strict";

describe("Account", () => {
    describe("Account create", () => {
        it("successfully create an account", () => {
            let account = new Account(12345);
            expect(account.toString()).to.eql("Account 12345: balance 0");
        });
    });
})

describe("Account Methods", () => {

    beforeEach(() => {
        this.account = new Account(12345);
    });

    describe("deposit", () => {
        it("successfully deposit money", () => {
            const amount = 1000;
            this.account.deposit(amount);
            expect(this.account.getBalance()).to.eql(amount);
        });
    });

    describe("unsuccessful deposit for invalid amount", () => {
        it("not deposit in account if the amount is less than 0", () => {
            const amount = -1;
            expect(() => {
                this.account.deposit(amount);
            }).to.throw(RangeError, "Deposit amount has to be greater than zero");
        });
    });

    describe("withdraw", () => {
        it("successfully withdraw money from account", () => {
            this.account.deposit(1000);
            this.account.withdraw(450);
            expect(this.account.getBalance()).to.eql(550);
        });
    });

    describe("unsuccessful withdraw with insufficient balance", () => {
        it("not withdraw from the account if the balance is insufficient", () => {
            expect(() => {
                this.account.withdraw(1000);
            }).to.throw(Error, "Insufficient funds");
        });
    });

    describe("unsuccessful withdraw for invalid amount", () => {
        it("not withdraw from the account if the amount is less than 0", () => {
            expect(() => {
                this.account.withdraw(-1);
            }).to.throw(RangeError, "Withdraw amount has to be greater than zero");
        });
    });
});

describe('Checking Account', () => {
    it('not withdraw if overdraft limit is exceeded', () => {
        let checkingAccount = new CheckingAccount(12345, 200);
        expect(() => {
            checkingAccount.withdraw(500);
        }).to.throw(Error, "Overdraft limit exceeded!");
    });
});

describe('Bank', () => {

    let bank;
    beforeEach(() => {
        bank = new Bank()
    });
    describe('Account Methods', () => {

        describe('Account Addition', () => {
            describe('Default Account', () => {
                it('successfully add a default Account', () => {
                    bank.addAccount();
                    expect(bank.getAccounts().length).to.eql(1);
                    expect(bank.getAccounts()[0].getNumber()).to.eql(1);
                });
            });

            describe('Savings Account', () => {
                it('successfully add a savings Account', () => {
                    bank.addSavingsAccount(5);
                    expect(bank.getAccounts().length).to.eql(1);
                    expect(bank.getAccounts()[0].getNumber()).to.eql(2);
                    expect(bank.getAccounts()[0].getInterest()).to.eql(5);
                });
            });

            describe('Checking Account', () => {
                it('successfully add a checking Account', () => {
                    bank.addCheckingAccount(200);
                    expect(bank.getAccounts().length).to.eql(1);
                    expect(bank.getAccounts()[0].getNumber()).to.eql(3);
                    expect(bank.getAccounts()[0].getOverdraftLimit()).to.eql(200);
                });
            });
        });

        describe('Account Closure', () => {
            it('successfully close an Account in the Bank', () => {
                bank.addCheckingAccount(200);
                const accountToClose = bank.getAccounts()[0];
                bank.closeAccount(4);
                expect(bank.getAccounts().length).to.eql(0);
                expect(bank.getAccounts().includes(accountToClose)).to.be.false;
            });
        });
    });


    describe('Account Report', () => {
        it('generate an account report for all bank accounts within the bank', () => {
            bank.addSavingsAccount(5);
            bank.addSavingsAccount(10);
            bank.addCheckingAccount(300);

            expect(bank.accountReport()).to.eql("\nSavings Account 5: balance 0" +
                "\nSavings Account 6: balance 0" +
                "\nChecking Account 7: balance 0");
        });
    });

    describe('End Of Month', () => {
        it('generate and endOfMonth Status by Performing needed actions at the end of the month', () => {
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