function quickSort (arr) {
  if(arr.length <= 1) {return arr}
  const left = []
  const right = []
  const x= arr[0]
  for(let i = 1; i< arr.length;i++) {
    if(arr[i] <=  x) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(x, quickSort(right))
}
const arr = [1,12,4,65,7,8,76,45]

console.log(quickSort(arr))