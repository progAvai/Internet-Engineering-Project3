// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // لاگ کردن خطا برای دیباگ

    // ارسال یک پاسخ خطای استاندارد و عمومی به کاربر
    res.status(500).json({
        message: 'Something went wrong on the server',
        error: err.message // در محیط "production" بهتر است این خط حذف شود
    });
};

module.exports = errorHandler;