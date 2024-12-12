const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use('/uploads', express.static('uploads'));


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Bilalkhan:Pakistan@cluster1.moct8fi.mongodb.net/ZooManagementSystem', {
    
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/animals', require('./Routes/animals.js'));
app.use('/api/tickets', require('./Routes/tickets'));
app.use('/api/feedback', require('./Routes/feedback'));
app.use('/api/timeslots', require('./Routes/timeslots.js'));
app.use('/api/staff', require('./Routes/staffroute.js'));
app.use('/api/tasks', require('./Routes/tasksroute.js'));
app.use('/api/visitors', require('./Routes/visitorroute.js'));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
