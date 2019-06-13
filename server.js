const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

//From bodyParser: middleware that parses both json and urlencoded
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log(`Server running... on port: ${PORT}`);
});
