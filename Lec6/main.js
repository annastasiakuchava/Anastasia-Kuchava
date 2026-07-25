//1 
//(1, 5, 4, 3, 2)

//2
//(1, 5, 3, 2, 4)

//3) 
JavaScript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//4) 
JavaScript
function guessNumber(target) {
  if (target < 1 || target > 20) return;

  const intervalId = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    console.log(randomNumber);

    if (randomNumber === target) {
      clearInterval(intervalId);
    }
  }, 1000);
}
//5)
JavaScript
function countdown(number, delay) {
  console.log(number);

  const intervalId = setInterval(() => {
    number--;
    console.log(number);

    if (number === 0) {
      clearInterval(intervalId);
    }
  }, delay);
}