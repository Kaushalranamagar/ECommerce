
const {body, validationResult} = require('express-validator');

 
//body('password').isLength({min:8})
const validate = validations => {
    return async (req,res,next) =>{
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }
        res.status(400).json({errors:errors.array()});
    }
}

const signup_validator= validate(
    [
        body('password').isLength({min:8}),
        body('name').exists(),
        body('role').exists(),
        body('email').exists(),
    ]) 

    const login_validator= validate(
        [
            body('email').exists(),
            body('password').exists(),
        ]) 
    

module.exports = {
    signup_validator,
    login_validator,

}