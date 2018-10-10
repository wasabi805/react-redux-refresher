const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};// init the errors obj so we can send back if any errors
    //is length
    // arg1 = data = form obj containing user's input from form
    //arg2 = requirements from from input
    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 chars.'
    }
    return{
        errors: errors, //val is the obj we defined at the start of this func
        isValid : isEmpty(errors)
    }
};