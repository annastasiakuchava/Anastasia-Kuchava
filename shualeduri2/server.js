const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const viewRoutes = require('./routes/view');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/expenses', apiRoutes); 
app.use('/', viewRoutes);            

app.listen(PORT, () => {
    console.log(`სერვერი ჩაირთო! გახსენი: http://localhost:${PORT}`);
});