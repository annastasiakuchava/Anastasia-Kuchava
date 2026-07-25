import fs from 'fs/promises';

async function fetchAndSaveUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const filteredUsers = users.map(({ id, name, username, email }) => ({
      id,
      name,
      username,
      email
    }));

    await fs.writeFile('users.json', JSON.stringify(filteredUsers, null, 2));
    console.log('users.json წარმატებით შეიქმნა!');
  } catch (error) {
    console.error('შეცდომა:', error);
  }
}

fetchAndSaveUsers();