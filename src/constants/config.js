/* app specific configurations */

export const AppConfig = {
    transactionTitle: 'Transactions',
    transactionDetails: 'Transactions Details',
    merchantPlaceholder: 'Search by Merchant Name',
    addTransaction: 'Add Transaction',
    addNewTransaction: 'Add New Manual Transaction',
    editTransaction: 'Edit Transaction',
    deleteTransaction: 'Delete Transaction',
    amount: 'Amount',
    merchantName: 'Merchant Name',
    type: 'Type',
    reference: 'Reference',
    remarks: 'Remarks',
    enter: 'Enter',
    select: 'Select',
    submit: 'Submit',
    update: 'Update',
    delete: 'Delete',
    credit: 'CREDIT',
    debit: 'DEBIT',
    consentDelete: 'Are you sure to delete this transaction ?',
    itemsPerPage: 10,
    dateAndTime: 'Date & Time',
    amountKhd: 'Amount(HKD)',
    status: 'Status',
    noDataFound: 'No Data Found',
    ok: 'Ok',
    error: 'Something went wrong!',
    transactionAdded: 'Transaction has been added',
    transactionEdited: 'Transaction has been updated',
    transactionDeleted: 'Transaction has been deleted',
};

export const tableHeader = [
    {label: 'Date', value: 'datetime' },
    {label: 'Merchant', value: 'merchant'},
    {label: 'Amount(HKD)', value: 'amount' },
    {label: 'Status', value: 'status'},
    {label: 'Action'}
];

export const tablePlaceholder = [1, 2, 3, 4, 5];
