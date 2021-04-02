const list = [1,2,3,4,5]

function reverse (list) {
    const reverseList = []
     function splice(list) {
        if(list.length === 0) return
        reverseList.push(list.splice(-1)[0])
        splice(list)
        }
     splice(list)
     return reverseList
}
const res = reverse(list)
console.log(res)


var reverseList = function f(head) {
    if(!(head&&head.next)) return head
    const last = f(head.next)
    head.next.next = head
    head.next = null
    return last
  };
  console.log(reverseList([1,2,3]))