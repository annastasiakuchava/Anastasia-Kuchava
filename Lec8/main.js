//1)
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const logMousePosition = debounce((e) => {
  console.log(e.clientX, e.clientY);
}, 300);

window.addEventListener('mousemove', logMousePosition);

//2)
const quoteBtn = document.getElementById('quoteBtn');
const quoteContainer = document.getElementById('quoteContainer');

quoteBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('https://dummyjson.com/quotes');
    const data = await response.json();
    
    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    const randomQuote = data.quotes[randomIndex];
    
    quoteContainer.innerHTML = `<p>"${randomQuote.quote}" - <strong>${randomQuote.author}</strong></p>`;
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
});

//3)
async function fetchUsersPage(page, limit = 30) {
  const skip = (page - 1) * limit;
  const url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`Page: ${page}`, data.users);
    
    const totalPages = Math.ceil(data.total / limit);
    return { users: data.users, totalPages };
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

//4)
const carIdInput = document.getElementById('carIdInput');
const searchCarBtn = document.getElementById('searchCarBtn');
const carInfo = document.getElementById('carInfo');

searchCarBtn.addEventListener('click', async () => {
  const id = carIdInput.value;
  if (!id) return;

  try {
    const response = await fetch(`https://myfakeapi.com/api/cars/${id}`);
    
    if (!response.ok) {
      throw new Error('Car not found');
    }

    const data = await response.json();
    
    if (!data.car) {
      throw new Error('Car not found');
    }

    carInfo.innerHTML = `
      <h3>${data.car.car} ${data.car.car_model}</h3>
      <p>Color: ${data.car.car_color}</p>
      <p>Year: ${data.car.car_model_year}</p>
      <p>Price: ${data.car.price}</p>
    `;
  } catch (error) {
    alert('გთხოვთ შეიყვანოთ სწორი აიდი');
    carInfo.innerHTML = '';
  }
});
