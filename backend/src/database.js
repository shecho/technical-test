const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courseTM', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database'));