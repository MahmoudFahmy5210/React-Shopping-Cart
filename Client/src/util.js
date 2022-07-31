// write function to use in many fiiles
export default function formatCurrency(num){
    return "$" +Number(num.toFixed(1)).toLocaleString() +" "
}