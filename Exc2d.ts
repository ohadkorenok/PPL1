interface YMDDate {
    year: number;
    month: number;
    day: number;
}

interface Cash {
    amount: number;
    tag: "Cash"
}

interface Debit {
    amount: number;
    expirationDate: YMDDate;
    tag: "Debit"

}

type PaymentMethod = Debit | Cash;

interface Wallet {
    paymentMethods: PaymentMethod[];
    tag: "Wallet";
}

const makeDebitCard = (amount: number, expirationDate: YMDDate): Debit => {
    return {expirationDate: expirationDate, amount: amount, tag: "Debit"};
};


const makeCash = (amount: number): Cash => {
    return {amount: amount, tag: "Cash"};
};

const makeWallet = (paymentsMethods: PaymentMethod[]): Wallet => {
    return {paymentMethods: paymentsMethods, tag: "Wallet"}
};

const isDebit = (x: any): x is Debit => x.tag === "Debit";
const isCash = (x: any): x is Cash => x.tag === "Cash";


const comesBefore: (date1: YMDDate, date2: YMDDate) => boolean = (date1, date2) => {
    if (date1.year < date2.year) {
        return true;
    }
    if (date1.year === date2.year && date1.month < date2.month) {
        return true;
    }
    if (date1.year === date2.year && date1.month === date2.month && date1.day < date2.day) {
        return true;
    }
    return false;
};


interface ChargeResult {
    amountLeft: number;
    wallet: Wallet;
}


const chargeCash = (payment: PaymentMethod, amountLeft: number): number => {
    return payment.amount > amountLeft ? amountLeft : payment.amount;
};

const chargeDebit = (payment: Debit, amountLeft: number, todayTime: YMDDate): number => {
    return comesBefore( todayTime, payment.expirationDate) ? payment.amount > amountLeft ? amountLeft : payment.amount: 0;
};

const chargeCashOrDebit = (payment: PaymentMethod, amountLeft: number, todayTime: YMDDate) => {
    return isCash(payment) ? chargeCash(payment, amountLeft) : chargeDebit(payment, amountLeft, todayTime);
};

const charge = (wallet: Wallet, amountLeft: number, todayTime: YMDDate) => {
    return wallet.paymentMethods.reduce((acc: ChargeResult, currentValue: PaymentMethod) => {

        const updatedPaymentAmount: number = chargeCashOrDebit(currentValue, acc.amountLeft, todayTime); //Charged money
        return {
            amountLeft: acc.amountLeft - updatedPaymentAmount,
            wallet: {
                paymentMethods: acc.wallet.paymentMethods.concat(isCash(currentValue) ? {
                    tag: "Cash",
                    amount: currentValue.amount - updatedPaymentAmount
                } : {tag: "Debit", amount: currentValue.amount - updatedPaymentAmount, expirationDate: currentValue.expirationDate}),
                tag: "Wallet"
            }
        }
    }, {amountLeft: amountLeft, wallet: {paymentMethods: [], tag: "Wallet"}})

};


const wallet1 = makeWallet([
    makeCash(4500),
    makeDebitCard(3000, {year: 2020, month: 7, day: 31}),
    makeDebitCard(300, {year: 2020, month: 7, day: 31})
]);
const wallet2 = makeWallet([
    makeCash(4500),
    makeDebitCard(3000, {year: 2010, month: 7, day: 31}), // note the expiration date
    makeDebitCard(300, {year: 2020, month: 7, day: 31})
]);

console.log(JSON.stringify(charge(wallet1, 7000, {year: 2019, month: 3, day: 7})));
console.log(JSON.stringify(charge(wallet2, 7000, {year: 2019, month: 3, day: 7})));


