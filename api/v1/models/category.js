const mongoose = require('mongoose');
mongoose.pluralize(null);

const CategorySchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: String,
    description: String,
    // יתכן שיש לך פרטים נוספים של הקטגוריה
});

module.exports = mongoose.model('category', CategorySchema);
