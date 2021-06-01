export function groupByDate(payments) {

    console.log(payments);
    if (!payments) return [];
    if (payments.length === 0) return [];

    let paymentsGroupedByDate = [];

    let sum = 0;
    let nestedPayments = [];
    let date = null;

    payments.forEach((payment, index) => {

        sum = sum + payment.amount;
        nestedPayments = [...nestedPayments, payment]
        date = payment.date.toDate().setHours(0, 0, 0, 0);

        if (!payments[index + 1] || (payments[index + 1].date.toDate().setHours(0, 0, 0, 0) !== date)) {

            paymentsGroupedByDate = [
                ...paymentsGroupedByDate,
                {
                    sum: sum,
                    date: date,
                    nestedPayments: [...nestedPayments]
                }
            ]
            sum = 0;
            nestedPayments = [];
        }
    });

    return paymentsGroupedByDate;
};

export function timestampToDate(timestamp) {
    let date = new Date(timestamp);
    return date.getDate().toString().padStart(2, '0') + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getFullYear();
}
