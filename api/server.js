const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const categoryRoutes = require('./src/routes/category.js');
const pageRoutes = require('./src/routes/page.js');
const postRoutes = require('./src/routes/post.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/category', categoryRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/post', postRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});