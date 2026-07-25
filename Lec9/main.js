//1)
class Todo {
  constructor(id, title, isDone = false) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
    this.createdAt = new Date();
  }
}

class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(id, title) {
    const newTodo = new Todo(id, title);
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  checkActiveTodo(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.isDone = !todo.isDone;
    }
  }

  getAllTodos(filterObj) {
    if (!filterObj) {
      return this.todos;
    }

    if (filterObj.active === true) {
      return this.todos.filter(todo => !todo.isDone);
    }

    if (filterObj.active === false) {
      return this.todos.filter(todo => todo.isDone);
    }

    return this.todos;
  }
}
//2)
class ShoppingCart {
  constructor() {
    this.items = []; // თითოეულ პროდუქტს ექნება: { id, name, price, quantity }
  }

  addToCart(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      this.items.push({ ...product, quantity: product.quantity || 1 });
    }
  }

  removeFromCart(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateItem(id, updatedFields) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      Object.assign(item, updatedFields);
    }
  }

  calculateTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
//3)
class Library {
  constructor() {
    this.books = []; // { id, title, author, year }
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
  }

  listBooks(sortBy) {
    const booksCopy = [...this.books];
    if (sortBy === 'year') {
      return booksCopy.sort((a, b) => a.year - b.year);
    }
    return booksCopy;
  }
}
//4)
class ContactManager {
  constructor() {
    this.contacts = []; // { name, phone, email }
  }

  addNewContact(name, phone, email) {
    const isDuplicateEmail = this.contacts.some(contact => contact.email === email);
    const isDuplicatePhone = this.contacts.some(contact => contact.phone === phone);

    if (isDuplicateEmail) {
      console.log("შეცდომა: კონტაქტი ამ იმეილით უკვე არსებობს!");
      return;
    }

    if (isDuplicatePhone) {
      console.log("შეცდომა: კონტაქტი ამ ტელეფონის ნომრით უკვე არსებობს!");
      return;
    }

    this.contacts.push({ name, phone, email });
    console.log("კონტაქტი წარმატებით დაემატა.");
  }

  viewAllContacts() {
    return this.contacts;
  }

  updatePhone(email, newPhone) {
    const isDuplicatePhone = this.contacts.some(contact => contact.phone === newPhone);
    if (isDuplicatePhone) {
      console.log("შეცდომა: ეს ნომერი უკვე სხვა კონტაქტს ეკუთვნის!");
      return;
    }

    const contact = this.contacts.find(contact => contact.email === email);
    if (contact) {
      contact.phone = newPhone;
    }
  }

  deleteContact(email) {
    this.contacts = this.contacts.filter(contact => contact.email !== email);
  }
}