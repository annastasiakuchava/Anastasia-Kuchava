//1)
function convert(celsius) {
    let fahrenheit = (celsius * 9/5) + 32
    return fahrenheit
}

//2)
function reverseString(str) {
    return str.split("").reverse().join("")
}


//3)
function countWords(sentence) {
    return sentence.split(" ").length
}

//4)
function countVowels(word) {
    const vowels = "aeiouAEIOU"
    let count = 0

    for (let i = 0; i < word.length; i++) {
        if (vowels.includes(word[i])) {
            count++
        }
    }

    return count
}

//5)
function Factorial(n) {
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result = result * i;
    }

    return result;
}

//6)
function sumEvenNumbers(n) {
    let sum = 0;

    for (let i = 0; i <= n; i++) {
        if (i % 2 === 0) {
            sum = sum + i;
        }
    }

    return sum;
}

//7)
function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "E";
    } else {
        return "F";
    }
}

//8)
function checkPassword(password) {
    const hasLength = password.length > 8;
    const hasNumber = /[0-9]/.test(password);
    const hasCapital = /[A-Z]/.test(password);

    if (hasLength && hasNumber && hasCapital) {
        return true;
    } else {
        return false;
    }
}