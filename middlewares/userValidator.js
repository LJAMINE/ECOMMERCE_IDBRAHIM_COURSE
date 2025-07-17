const { body, validationResult } = require('express-validator');

exports.userSignUpValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email')
        .notEmpty()
        .withMessage('Email is required'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 3, max: 8 })
        .withMessage('Password must be between 3 and 8 characters'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()[0].msg
            });
        }
        next();
    }
];