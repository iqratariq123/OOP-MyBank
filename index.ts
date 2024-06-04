import inquirer from "inquirer";

// Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    
    // Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`whitdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        
    }else {
        console.log("Insufficient balance.");
    }
}

// Credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successfull. remaining balance: $${this.balance}`);
    
}

// Check Balance
checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`);
}
}

// Customer Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}

// Creat Bank Account

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000),
];

// Creat Customers
const Customers: Customer[] = [
     new Customer ("burhan", "tariq", "Male", 27, 3142241505, accounts[0]),
     new Customer ("saeed", "shafiq", "Male", 30, 3112348792, accounts[1]),
     new Customer ("usman", "asghar", "Male", 29, 3112610632, accounts[2]),
]

// Function to interact which bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt(
            [
                {
                    name: "accountNumber",
                    type: "number",
                    message: "Enter your account number:"
                }
            ]
        )
        const Customer = Customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
            const ans = await inquirer.prompt(
                [
                    {
                        name: "select",
                        type: "list",
                        message: "Sale an operation",
                        choices: ["Deposit", "Withraw", "Check Balance", "Exit"],
                    }
                ]
            );
            switch (ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    }])
                    Customer.account.deposit(depositAmount.amount)
                    break;
                case "Withdraw":
                    const WithrawAmount = await inquirer.prompt([{
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    }])
                    Customer.account.deposit(WithrawAmount.amount)
                    break;
                case "Check Balance":
                    Customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        
        }else {
            console.log("invalid account number . please try again.");
            
        }
    } while(true)
}

service();