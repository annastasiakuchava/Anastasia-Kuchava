import fs from 'fs/promises';

const [, , command, arg1, arg2] = process.argv;

async function getContacts() {
  try {
    const data = await fs.readFile('contacts.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveContacts(contacts) {
  await fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2));
}

async function handlePhoneCLI() {
  const contacts = await getContacts();

  if (command === 'add') {
    const phone = arg1;
    const name = arg2;

    if (!phone || !name) {
      console.log('გთხოვთ შეიყვანოთ ნომერიც და სახელიც. მაგალითად: node phone.js add 555151515 nika');
      return;
    }

    const exists = contacts.some(c => c.phone === phone);
    if (exists) {
      console.log('შეცდომა: ეს ნომერი უკვე არსებობს კონტაქტებში!');
      return;
    }

    contacts.push({ name, phone });
    await saveContacts(contacts);
    console.log(`კონტაქტი ${name} წარმატებით დაემატა!`);

  } else if (command === 'delete') {
    const phone = arg1;
    if (!phone) {
      console.log('გთხოვთ მიუთითოთ წასაშლელი ნომერი.');
      return;
    }

    const filtered = contacts.filter(c => c.phone !== phone);
    if (filtered.length === contacts.length) {
      console.log('კონტაქტი ამ ნომრით ვერ მოიძებნა.');
      return;
    }

    await saveContacts(filtered);
    console.log('კონტაქტი წარმატებით წაიშალა.');

  } else if (command === 'show') {
    console.log('ყველა კონტაქტი:', contacts);
  } else {
    console.log('არასწორი ბრძანება. გამოიყენეთ: add, delete, ან show');
  }
}

handlePhoneCLI();