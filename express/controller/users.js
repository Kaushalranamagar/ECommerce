
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const User = require("../model/User");

const index = async(req,res,next) =>{
    res.send (await User.find({}))
}


const signup = (req, res, next) => {
 
    console.log("body", req.body);


    const hash = bcrypt.hashSync(req.body.password, 10);
    //console.log({hash});
    //return;
    // req.body.password = req.body.password + "asmita"

  try {
    let user = User.create({...req.body,password:hash},(err, data) => {
        if (err) {
          next(err);
        } else {
          res.send({ data });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
       
         res.send(await User.findById(req.params.id))


     // console.log(req.params);
     // console.log(req.query);

//     let data = [
//       { id: 1, name: "John" },
//       { id: 2, name: "asmita" },
//     ];
//     let result = data.find((el) => el.id == req.params.id);

//     return res.render("home", {
//       name: result.name,
//       data: data,
//       person: result,
//     });

//     res.send(result);
  } catch (err) {
         next(err);
  }
};

const login = async (req,res,next)=>{
    try{
     //compare with hashed pasword
     let email = req.body.email
     let user = await User.findOne({email}).select("password")
     
     
     // console.log(user);
     // return;
     let status = bcrypt.compareSync(req.body.password, user.password);
     let user_obj = await User.findOne({email});
      //console.log(user_obj)

     var token =jwt.sign(user_obj.toObject(), 'shhhhh');
     if(status){
       return res.send({
            access_token: token
        })
     }
     return res.status(401).send({
            msg:"Invalid Credentials"
        })
    }catch(err) {
        next(err)
    }
    }

module.exports = {
  show,
  signup,
  index,
  login,
};
