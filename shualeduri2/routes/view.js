const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/expenses.json');

async function readData() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

router.get('/', async (req, res) => {
    try {
        let expenses = await readData();
        const { category } = req.query;

        if (category) {
            expenses = expenses.filter(e => 
                e.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        res.render('index', { expenses, currentSearch: category || '' });
    } catch (error) {
        res.status(500).send("Error");
    }
});

router.get('/expense/:id', async (req, res) => {
    try {
        const expenses = await readData();
        const expense = expenses.find(e => e.id === req.params.id);
        if (!expense) return res.status(404).send("Not Found");
        
        res.render('expense-detail', { expense });
    } catch (error) {
        res.status(500).send("Error");
    }
});

module.exports = router;