const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // =====    SET BLANK FIELDS if any TO EMPTY S STRINGS (see below :ARE THE IInput Fields BLANK?)

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // =====    ARE THE Input Fields In the CORRECT FORMAT?    =====
    //  .isLength() ==> arg1 = data = form obj containing user's input from form | arg2 = requirements from from input

    if (!Validator.isEmail(data.email)) {
        errors.email = "This is not a real email address."
    }

    // =====    ARE THE Input Fields BLANK?    =====

    if (Validator.isEmpty(data.email)) {
        errors.email = "Hey, you didn't enter an email?";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "We didn't get your password";
    }


    return {
        errors: errors, //val is the obj we defined at the start of this func
        isValid: isEmpty(errors)
    }
};