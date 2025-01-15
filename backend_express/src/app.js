const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db')
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UsersRoutes');
const app = express();
const port = 5000

app.use(cors());
app.use(express.json())
app.use(helmet({
    hsts: false,
}));

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);

connectDB()


app.listen(port, () => {
    console.log(`Server działa na porcie: ${port}`)
})