const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};// init the errors obj so we can send back if any errors

    // =====    SET BLANK FIELDS if any TO EMPTY S STRINGS (see below :ARE THE IInput Fields BLANK?)
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    // =====    ARE THE IInput Fields In the CORRECT FORMAT?    =====
    //  .isLength() ==> arg1 = data = form obj containing user's input from form | arg2 = requirements from from input
    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 chars.'
    }

    if(!Validator.isLength(data.password, {min:6, max:30})){
        errors.password = "Password must be at least 2 and not longer than 30 chars.  "
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "This is not a real email address."
    }

    // =====    ARE THE Input Fields BLANK?    =====

    //if isEmpty is true but, remember that isEmpty() only checks format: it wont set anything to an empty string
    //so.. if the form is blank, we need to turn the 'blank' into an empty string for Validator.isEmoty() below to work:
    //if we're testing for something to be empty,
    //we need to set it to an empty string BEFORE Validator.isEmpty() takes it in as an arg.
    // data.name = !isEmpty(data.name) ? data.name : ' '; //this ternary either gives back data.name with the inputted name OR turns the blank into an empty string
    if(Validator.isEmpty(data.name)){
        errors.name = "Hey, why did you press submit without entering a name? What do we call you?";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Hey, you didn't enter an email?";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Uhh, do want a password? Don't leave this blank?";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Can't confirm your password if you leave this blank.";
    }

    // =====    Do the PASSWORDS MATCH?    =====
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Your pw's don't match."
    }

    return{
        errors: errors, //val is the obj we defined at the start of this func
        isValid : isEmpty(errors)
    }
};