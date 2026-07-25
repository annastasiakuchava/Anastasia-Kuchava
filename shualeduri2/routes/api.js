const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/expenses.json');

async function readData() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

router.get('/', async (req, res) => {
    try {
        const expenses = await readData();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const expenses = await readData();
        const expense = expenses.find(e => e.id === req.params.id);
        if (!expense) return res.status(404).json({ message: "Not Found" });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        const expenses = await readData();
        
        const newExpense = {
            id: Date.now().toString(),
            title,
            amount: Number(amount),
            category
        };
        
        expenses.push(newExpense);
        await writeData(expenses);
        res.status(201).redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        let expenses = await readData();
        const index = expenses.findIndex(e => e.id === req.params.id);
        
        if (index === -1) return res.status(404).json({ message: "Not Found" });
        
        expenses[index] = { ...expenses[index], title, amount: Number(amount), category };
        await writeData(expenses);
        res.json({ message: "Updated" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let expenses = await readData();
        expenses = expenses.filter(e => e.id !== req.params.id);
        await writeData(expenses);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
});

module.exports = router;