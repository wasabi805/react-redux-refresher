//this custom extension function is used to say that the input is not in a valid string format for validator to use
//value passed to this func is the form input from the user.

const isEmpty =(value)=> {
    return(
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length===0) || //ie if it's an obj && there are no keys (which basically says this obj is empty)
        (typeof  value=== 'string' && value.trim().length ===0) //ie if it is an empty string
    );
};

module.exports = isEmpty;
//after this is created, import it to validation/register  so we can use it with Validator.