//1)
function findAverage(numbers) {
    let sum = 0
    
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }

    return sum / numbers.length
}
//2)
function reverseNumberToArray(num) {
    const reversedStrings = String(num).split("").reverse()
    return reversedStrings.map(Number)
}
//3)
function difference(array1, array2) {
    return array1.filter(item => !array2.includes(item))
}
//4)
function findSecondLargest(numbers) {
    const sortedNumbers = [...numbers].sort((a, b) => b - a)

    return sortedNumbers[1]
}
//5)
function filterPalindromes(words) {
    return words.filter(word => {
        const reversedWord = word.split("").reverse().join("")
        
        return word === reversedWord
    })
}
//6)
function findMostFrequent(numbers) {
    if (numbers.length === 0) return null

    const counts = {}
    let mostFrequentNum = numbers[0]
    let maxCount = 0

    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i]
        
        counts[num] = (counts[num] || 0) + 1

        if (counts[num] > maxCount) {
            maxCount = counts[num]
            mostFrequentNum = num
        }
    }

    return mostFrequentNum
}