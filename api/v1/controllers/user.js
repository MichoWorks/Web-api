const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); /// חיבור לספריית JWT  

module.exports = {
  // קבלת כל המשתמשים
  GetAllUser: (req, res) => {
    User.find().then((data) => {
      return res.status(200).json(data);
    });
  },

// קבלת משתמש לפי מזהה
GetUserById: (req, res) => {
  let userid = req.params.id;
  User.findById(userid).then((data) => {
    if (!data) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(data);
  }).catch(err => {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  });
},

  // הוספת משתמש חדש
  AddUser: (req, res) => {
    let body = req.body;
    User.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },

  // עדכון פרטי משתמש
  UpdateUser: (req, res) => {
    let userid = req.params.id;
    let body = req.body;
    User.updateOne({ userid }, body).then(() => {
      return res.status(200).json({ msg: `User ${userid} has been successfully updated`, body });
    });
  },

  // מחיקת משתמש
  DeleteUser: (req, res) => {
    let userid = req.params.id;
    User.deleteOne({ userid }).then((data) => {
      return res.status(200).json(data);
    });
  },

  // הרשמת משתמש חדש
  RegisterUser: (req, res) => {
    const { fullname, email, pass } = req.body;
    User.find({ email }).then((result) => {
      if (result.length > 0) {
        return res.status(200).json({ msg: "❌ User Already Exist ❌" });
      }
      bcrypt.hash(pass, 10).then((hashPass) => {
        User.insertMany({ fullname, email, pass: hashPass }).then(() => {
          return res.status(200).json({ msg: "✅ You have successfully registered ✅" });
        });
      });
    });
  },

  // התחברות משתמש
  Login: (req, res) => {
    const { email, pass } = req.body;
    User.find({ email }).then((results) => {
      if (results.length === 0) {
        return res.status(200).json({ msg: "✖️ Username or Password Are Wrong ✖️" });
      }
      const hashPass = results[0].pass;
      bcrypt.compare(pass, hashPass).then((status) => {
        if (status) {
      const myUser=results[0];
      const token = jwt.sign({email,pass,fullname:myUser},process.env.PRIVATE_KEY,{expiresIn:'1h'}); ///// יצירת טוקן שתקף לשעה
          req.session.user=token;
      return res.status(200).json({ msg: "✅ Welcome Back ✅",token});
        } 
        else {
          return res.status(200).json({ msg: "✖️ Username or Password Are Wrong ✖️" });

        }
      });
    });
  },
};
