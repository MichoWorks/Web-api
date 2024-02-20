const mongoose = require('mongoose');////// חיבור לספריית העבודה מול מונגו 
mongoose.pluralize(null);
///נגדיר סכימה עבור מוצר
const productSchema=new mongoose.Schema({
    pid:Number,
    id:Number,
    pname:String,
    price:Number,
    picname:String,
    pdesc:String
  });
  
  ///ניצור מודל עבור מוצר
module.exports=mongoose.model('products',productSchema);
