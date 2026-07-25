//1)
async function fetchWithRetry(url = 'https://jsonplaceholde.typicode.com', retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      return data;
    } catch (error) {
      if (i === retries - 1) {
        console.error('ყველა მცდელობა ჩაიშალა:', error.message);
      }
    }
  }
}

//2)
async function logFastestRequest() {
  const url1 = 'https://dummyjson.com/users';
  const url2 = 'https://jsonplaceholder.typicode.com/users';

  try {
    const fastestResponse = await Promise.race([
      fetch(url1).then(res => res.json()),
      fetch(url2).then(res => res.json())
    ]);
    console.log(fastestResponse);
  } catch (error) {
    console.error('შეცდომა:', error);
  }
}

//3)
async function fetchAndFilterProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    
    const expensiveProducts = data.products.filter(product => product.price > 10);
    console.log(expensiveProducts);
  } catch (error) {
    console.error('შეცდომა:', error);
  }
}

//4)
async function fetchAndFilterDevelopers() {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();

    const webDevelopers = data.users
      .filter(user => user.company && user.company.title === 'Web Developer')
      .map(user => ({
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.address?.city,
        email: user.email,
        phone: user.phone
      }));

    console.log(webDevelopers);
  } catch (error) {
    console.error('შეცდომა:', error);
  }
}

//5)
async function fetchAllDataSimultaneously() {
  const urls = [
    'https://dummyjson.com/recipes',
    'https://dummyjson.com/comments',
    'https://dummyjson.com/todos',
    'https://dummyjson.com/quotes'
  ];

  try {
    const results = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    );
    console.log(results);
  } catch (error) {
    console.error('ერთ-ერთი რექუსთი ჩავარდა:', error);