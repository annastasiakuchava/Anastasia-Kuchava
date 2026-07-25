#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs/promises';

const program = new Command();
const FILE_PATH = './todo.json';

async function readTodos() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeTodos(todos) {
  await fs.writeFile(FILE_PATH, JSON.stringify(todos, null, 2));
}

program
  .name('todo-cli')
  .description('A simple CLI Todo manager');

// 1. SHOW
program
  .command('show')
  .description('Show all todo items')
  .action(async () => {
    const todos = await readTodos();
    console.log('ყველა თუდუ:', todos);
  });

// 2. ADD
program
  .command('add <todoName>')
  .description('Add a new todo item')
  .action(async (todoName) => {
    const todos = await readTodos();
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: todoName,
      isDone: false
    };
    todos.push(newTodo);
    await writeTodos(todos);
    console.log('შექმნილი თუდუ:', newTodo);
  });

// 3. DELETE
program
  .command('delete <todoId>')
  .description('Delete a todo item by id')
  .action(async (todoId) => {
    const todos = await readTodos();
    const id = parseInt(todoId);
    const todoToDelete = todos.find(t => t.id === id);

    if (!todoToDelete) {
      console.log(`თუდუ ID-ით ${todoId} ვერ მოიძებნა.`);
      return;
    }

    const filtered = todos.filter(t => t.id !== id);
    await writeTodos(filtered);
    console.log('წაშლილი თუდუ:', todoToDelete);
  });

// 4. UPDATE (არგუმენტით და option მეთოდით)
program
  .arguments('<todoId>')
  .option('-n, --name <todoName>', 'Update the name of the todo')
  .action(async (todoId, options) => {
    // ეს ბლოკი გაეშვება მხოლოდ მაშინ, როცა show/add/delete ქომანდები არ ემთხვევა
    const todos = await readTodos();
    const id = parseInt(todoId);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      console.log(`თუდუ ID-ით ${todoId} ვერ მოიძებნა.`);
      return;
    }

    if (options.name) {
      todo.title = options.name;
      await writeTodos(todos);
      console.log('განახლებული თუდუ:', todo);
    } else {
      console.log('გთხოვთ გამოიყენოთ option ფლაგი, მაგალითად: todo-cli 1 --name "New Title"');
    }
  });

program.parse(process.argv);