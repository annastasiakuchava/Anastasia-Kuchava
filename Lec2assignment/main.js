//1)
function getAbbr(fullName) {
    const words = fullName.toUpperCase().split(' ')
    let result = ""

    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let firstLetter = word[0]
        result += firstLetter + "."
    }

    return result
}

//2)
function getSumOf(number){
    let s = number.toString()
    let sum = 0
    for (let i =0; i < s.length; i++){
        sum+= Number(s[i])
    }
    return sum
}

//3)
function removeDuplicates(word) {
    let result = ""

    for (let i = 0; i < word.length; i++) {
        let char = word[i]

        if (result.includes(char)) {
        } else {
            result += char
        }
    }

    return result
}

//4)
function removeSpaces(text) {
    let result = ""

    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") {
            result += text[i]
        }
    }

    return result
}



//5)
function reverseEachWord(sentence) {
    let words = sentence.split(' ')
    let finalResult = ""

    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let reversedWord = ""

        for (let j = word.length - 1; j >= 0; j--) {
            reversedWord += word[j]
        }

        finalResult += reversedWord

        if (i < words.length - 1) {
            finalResult += " "
        }
    }

    return finalResult
}
