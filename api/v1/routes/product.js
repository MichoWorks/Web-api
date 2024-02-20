const express = require('express');
const router = express.Router();


//משיכה של הפעולות מקובץ המוצאים שנמצא בקונטרוללר
const{
  GetAllProduct,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct
} = require('../controllers/product')


// קבל את כל המוצרים
router.get('/', GetAllProduct);

// קבל מוצר ספציפי לפי מזהה
router.get('/:id', GetProductById);

// הוספת מוצר חדש
router.post('/',AddProduct);

// עדכון מוצר קיים
router.patch('/:id', UpdateProduct);

// מחיקת מוצר
router.delete('/:id', DeleteProduct);

module.exports = router;