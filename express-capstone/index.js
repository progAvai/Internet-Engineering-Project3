// // index.js (نسخه اولیه)
// const express = require('express');
// const app = express();
// const PORT = 3000;

// // این میان‌افزار برای خواندن JSON از بدنه‌ی درخواست (req.body) ضروری است
// app.use(express.json());

// // پایگاه داده موقت ما (درون حافظه‌ای)
// let users = [
//     { id: 1, name: 'Alice', email: 'alice@example.com' },
//     { id: 2, name: 'Bob', email: 'bob@example.com' }
// ];
// let nextId = 3;

// // --- مسیرهای CRUD ---

// // (Create) - POST /users
// app.post('/users', (req, res) => {
//     const { name, email } = req.body;
//     if (!name || !email) {
//         return res.status(400).json({ message: 'Name and email are required' });
//     }
//     const newUser = { id: nextId++, name, email };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// // (Read) - GET /users
// app.get('/users', (req, res) => {
//     res.status(200).json(users);
// });

// // (Read) - GET /users/:id
// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(u => u.id === id);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
// });

// // (Update) - PUT /users/:id
// app.put('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(u => u.id === id);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
    
//     const { name, email } = req.body;
//     user.name = name || user.name;
//     user.email = email || user.email;
    
//     res.status(200).json(user);
// });

// // (Delete) - DELETE /users/:id
// app.delete('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const userIndex = users.findIndex(u => u.id === id);
//     if (userIndex === -1) {
//         return res.status(404).json({ message: 'User not found' });
//     }
    
//     users.splice(userIndex, 1);
//     res.status(204).send(); // 204 No Content
// });

// // --- راه‌اندازی سرور ---
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // index.js (نسخه MVC)
// const express = require('express');
// const app = express();
// const PORT = 3000;

// const userRoutes = require('./routes/user'); // وارد کردن روتر کاربران

// app.use(express.json()); // میان‌افزار برای پارس کردن JSON

// // اتصال روتر کاربران به مسیر /users
// app.use('/users', userRoutes);

// app.listen(PORT, () => {
//     console.log(`MVC Server is running on http://localhost:${PORT}`);
// });

// // index.js (با میان‌افزارها)
// const express = require('express');
// const app = express();
// const PORT = 3000;

// const userRoutes = require('./routes/user');
// const logger = require('./middleware/logger');
// const errorHandler = require('./middleware/errorHandler');

// // 1. میان‌افزار لاگر (اجرا برای همه درخواست‌ها)
// app.use(logger);

// // 2. میان‌افزار پارس کردن JSON
// app.use(express.json());

// // 3. اتصال روترها
// app.use('/users', userRoutes); // میان‌افزار auth در داخل این روتر اعمال می‌شود

// // 4. میان‌افزار مدیریت خطای سراسری (باید آخر از همه باشد)
// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`Server with Middleware running on http://localhost:${PORT}`);
// });

// index.js (نهایی و امن)

// 1. بارگذاری متغیرهای محیطی (باید اولین خط باشد)
require('dotenv').config(); 

const express = require('express');
const https = require('https'); // ماژول داخلی نود برای HTTPS
const fs = require('fs'); // ماژول داخلی نود برای خواندن فایل‌ها
const rateLimit = require('express-rate-limit');
const app = express();

const userRoutes = require('./routes/user');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// --- تنظیمات امنیتی ---

// 2. تنظیم Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    max: 100, // حداکثر 100 درخواست در هر 15 دقیقه از هر IP
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter); // اعمال به تمام درخواست‌ها

// 3. تنظیمات گواهی SSL
const sslOptions = {
    key: fs.readFileSync('key.pem'), // خواندن کلید خصوصی
    cert: fs.readFileSync('cert.pem') // خواندن گواهی
};

// --- میان‌افزارها ---
app.use(logger);
app.use(express.json());

// --- روترها ---
app.use('/users', userRoutes);

// --- مدیریت خطا ---
app.use(errorHandler);

// --- راه‌اندازی سرور ---
const PORT = process.env.PORT || 3001; // خواندن پورت از .env

// 4. راه‌اندازی سرور امن HTTPS به جای app.listen
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`✅ Secure HTTPS Server running on https://localhost:${PORT}`);
});