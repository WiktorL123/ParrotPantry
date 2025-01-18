const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db')
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UsersRoutes');
const ParrotsRoutes = require('./routes/ParrotsRoutes');
const app = express();
const port = 3000

app.use(cors());
app.use(express.json())
app.use(helmet({
    hsts: false,
}))

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);
app.use('/api/parrots', ParrotsRoutes)

connectDB()


app.listen(port, () => {
    console.log(`Server działa na porcie: ${port}`)
})