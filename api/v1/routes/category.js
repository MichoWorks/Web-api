const express = require('express');
const router = express.Router();

// משיכה של הפעולות מקובץ המוצאים שנמצא בקונטרולר
const {
  GetAllCategories,
  GetCategoryById,
  AddCategory,
  UpdateCategory,
  DeleteCategory
} = require('../controllers/category');

// קבל את כל הקטגוריות
router.get('/', GetAllCategories);

// קבל קטגוריה ספציפית לפי מזהה
router.get('/:id', GetCategoryById);

// הוספת קטגוריה חדשה
router.post('/', AddCategory);

// עדכון קטגוריה קיימת
router.patch('/:id', UpdateCategory);

// מחיקת קטגוריה
router.delete('/:id', DeleteCategory);

module.exports = router;
