const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db')
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UsersRoutes');
const ParrotsRoutes = require('./routes/ParrotsRoutes');
const ShopsRoutes = require('./routes/ShopsRoutes');
const VeterinariansRoutes = require('./routes/VeterinariansRoutes');
const WeightNormsRoutes = require('./routes/WeightNormsRoutes');
const MedicineRoutes = require('./routes/MedicineNotificationsRoutes');
const vetVisitsNotificationsRoutes = require('./routes/VetVisitsNotificationsRoutes');
const WeightingNotificationsRoutes = require('./routes/WeightingNotificationsRoutes');
const FeedingNotificationsRoutes = require('./routes/FeedingNotificationsRoutes');
const app = express();
const port = 3000

app.use(cors());
app.use(express.json())
app.use(helmet({
    hsts: false,
}))
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);
app.use('/api/parrots', ParrotsRoutes)
app.use('/api/shops', ShopsRoutes)
app.use('/api/veterinarians', VeterinariansRoutes)
app.use('/api/weightRecords', WeightNormsRoutes)
app.use('/api/medicineNotifications', MedicineRoutes)
app.use('/api/vetVisitsNotifications', vetVisitsNotificationsRoutes)
app.use('/api/weightingNotifications', WeightingNotificationsRoutes)
app.use('/api/feedingNotifications', FeedingNotificationsRoutes)
connectDB()


app.listen(port, () => {
    console.log(`Server działa na porcie: ${port}`)
})
module.exports = app; // Eksport aplikacji
