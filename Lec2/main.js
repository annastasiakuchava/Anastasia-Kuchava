let userName="Nika"

userName[0]="L"

//console.log(userName)

const names = ['nika', 'dato', 'giorgi']

names[0]='Lika'

//console.log(names)

let userAge = 22
let userAge2 = userAge
userAge2 = 25
//console.log(userAge,"userAge")
//console.log(userAge2, "userAge2")

let user = {
    age: 22
}
let user2 = user
user2.age = 25
//console.log(user.age,"userAge")
//console.log(user.age2, "userAge2")

const personName = "Giorgi"

//console.log(personName.charAt(2)) //[2]
//console.log(personName.slice(-4)) 

const str1 = "He$ll$o"
const str2 = "world"
//console.log(str1.toLowerCase())
//console.log(str1.concat(str2)) //str1 + str2
//const fullStr = str1 + " " + str2 //bad example
//const fullStr = '${str1} ${str2}' //good example
//console.log(fullStr)
//console.log(str1.trim().length)
//console.log(str1.split('$'))
//const str = "h1el1l1o"
//console.log(str.replaceAll('1', '2'))
const str = "hello"
//console.log(str.toLowerCase().includes('H'.toLowerCase()))
//console.log(str.startsWith('he'))
//console.log(str.indexOf('r'))
//const a=57
//if(a > 20){
  //  console.log('metia 20ze')
//}else{
  //  console.log('naklebia 20ze')
//}
//a > 20 ? console.log('a metia 20ze') : console.log('naklebia 20ze')

//let str3 = 'Javascript'
//for(let i = 0; i < str3.length; i++){
 //   console.log(i)
//}
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
       // console.log('FizzBuzz');
    } else if (i % 3 === 0) {
       // console.log('Fizz');
    } else if (i % 5 === 0) {
       // console.log('Buzz');
    } else {
        //console.log(i);
    }
}
function Getcount(word, letter) {
    let mtvleli = 0;
    for (let i=0; i<=word.length; i++) {
        if (word[i] === letter.toLowerCase()) {
            mtvleli++;
        }
    }
    return mtvleli;
}
//console.log(Getcount("javascript","A"))

function getLongestWord(sentence) {
    const words = sentence.split(' ');
    let longestWord = words[0];
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }
    return longestWord;
}

const res = getLongestWord("hello world test gdvcushgffgiyh ytytytyy");
console.log(res);  
