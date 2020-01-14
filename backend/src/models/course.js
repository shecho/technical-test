const {
    model,
    Schema
} = require('mongoose');

const CourseSchema = new Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    imageText: {
        type: String
    },
    dateAdded: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = model('Course', CourseSchema);