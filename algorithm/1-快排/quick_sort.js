// const N = 100;

// let n;

function quick_sort(q, l, r) {
  if(l >=r) {return   }
  // 确定分界点 
  let x = q[l]

  // i,j 分别为数组两侧
  let i = l - 1
  let j = r + 1
  while (i < j) {
    do i++; while (q[i] < x);
    do j--; while (q[j] > x);
    if(i < j)  { 
      const y = q[i]
      q[i] = q[j]
      q[j] = y
    }
  }
  quick_sort(q,l, j)
  quick_sort(q, j + 1, r)
}
 

const arr = [13,1,12,4,65,7,8,76,45]
quick_sort(arr, 0, arr.length -1)
console.log(arr)