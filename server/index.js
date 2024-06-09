require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);

const DB_URL = process.env.DB_URL;

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(DB_URL);  
    console.log('Database connected');
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
   