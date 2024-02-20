const express = require('express');
const router = express.Router();
// משיכה של הפעולות מקובץ המוצאים שנמצא בקונטרוללר
const {
  GetAllUser,
  GetUserById,
  AddUser,
  UpdateUser,
  DeleteUser,
  RegisterUser,
  Login
} = require('../controllers/user');

// קבל את כל המשתמשים
router.get('/', GetAllUser);

// קבל משתמש ספציפי לפי מזהה
router.get('/:id', GetUserById);

// הוספת משתמש חדש
router.post('/', AddUser);

// עדכון משתמש קיים
router.patch('/:id', UpdateUser);


// מחיקת משתמש
router.delete('/:id', DeleteUser);

// הרשמה משתמש
router.post('/register',RegisterUser);

// התחברות משתמש
router.post('/login',Login);

module.exports = router;
