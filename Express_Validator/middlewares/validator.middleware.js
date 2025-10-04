const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    next();
}

const registerValidationRules = [
    body("username")
        .isString().withMessage("username must be a string")
        .isLength({ min: 3 }).withMessage("username must be atleast 3 characters long"),
    body("email")
        .isEmail().withMessage("Invalid email format!"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validate
]

module.exports = {registerValidationRules};