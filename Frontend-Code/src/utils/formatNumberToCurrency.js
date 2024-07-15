
export const formatNumberToCurrency = (number) => {
    return number.toLocaleString('en-IN' , {
        style : 'currency',
        currency : 'INR'
    })
}
