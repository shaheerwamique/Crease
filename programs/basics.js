function reverseString(str) {
    return str.split("").reverse().join("");
}
console.log(reverseString("hello"));

function findSum(arr){
    let sum = 0;
    for(let i=0;i<=arr.length-1;i++){
        sum += arr[i]
    }
    return sum;
}
console.log(findSum([1,2,3,4]));