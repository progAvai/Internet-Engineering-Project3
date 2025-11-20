// // routes/user.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user'); // وارد کردن کنترلر

// // نگاشت مسیرها به توابع کنترلر
// router.post('/', userController.createUser);
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// module.exports = router;

// routes/user.js with auth middleware
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth'); // وارد کردن میان‌افزار احراز هویت

// اعمال میان‌افزار auth به *تمام* مسیرهای این روتر
router.use(auth);

// نگاشت مسیرها به توابع کنترلر
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;