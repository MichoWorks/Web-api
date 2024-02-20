const http = require('http'); // מקשר לספריית HTTP
const app =  require('./app'); // מקשר לקובץ app

const sev = http.createServer(app); // משתנה של היצירת שרת
const port = 3000; // משתנה של הפורט שאליו השרת יאזין

/// הפעלת השרת שיאזין לפורט ויוציא פלט שהשרת רץ בקונסול
sev.listen(port, ()=> {
  console.log(`server started on port ${port}`);
});