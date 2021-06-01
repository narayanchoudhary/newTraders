export function groupByDate(payments) {

    console.log(payments);
    if (!payments) return [];
    if (payments.length === 0) return [];

    let paymentsGroupedByDate = [];

    let sum = payments[0].amount;
    let nestedPayments = [payments[0]];
    let date = null;

    payments.forEach((payment, index) => {
        if (payment.date.toDate().setHours(0, 0, 0, 0) !== date) {
            date = payment.date.toDate().setHours(0, 0, 0, 0)
            paymentsGroupedByDate = [
                ...paymentsGroupedByDate,
                {
                    sum: sum,
                    date: date,
                    nestedPayments: [...nestedPayments]
                }
            ]
            sum = payment.amount;
            nestedPayments = [payment];
        } else {
            sum = sum + payment.amount;
            nestedPayments = [...nestedPayments, payment]

        }

    });

    console.log(paymentsGroupedByDate);

    return paymentsGroupedByDate;
};

export function timestampToDate(timestamp) {
    let date = new Date(timestamp);
    return date.getDate().toString().padStart(2, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getFullYear();
}
