// twoSum

// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// 你可以按任意顺序返回答案。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/two-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。


const nums = [1,27,3,4,25,6]
const target = 4
var twoSum = function(nums, target) {
    const result = []
    for(let i = 0; i< nums.length; i++) {
        const arr =nums.slice(i)
        const first = arr[0]
        arr.slice(1).filter((v,innerIndex) => {
            if(result.length > 0) return
            if((first + v) === target ) {
                result[0] =i
                result[1] =i + innerIndex + 1
            }
        })
    }
    return result
};
const a= twoSum(nums, 28)
console.log(a)