const User = require('../models/user-model')
const Admin = require('../models/admin-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.signup =async (req, res) => {


  const user =await new User({
    username: req.body.username,
    email: req.body.email,
    phoneno: req.body.phoneno,
    password: bcrypt.hashSync(req.body.password, 8),
    isVerified: true
  });

  await user.save((err, user) => {
    if (err) {
            return res.status(409).send({ message: err });
    }

    res.send({ message: "User was registered successfully!" });

  });
};


exports.login = async(req,res)=> {
  
  const user = await User.findOne({email : req.body.email})

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

  const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours 
      });

      

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        phoneno: user.phoneno,
        token: token
      });
    
};


exports.logout = (req, res)=> {
   try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
  
}


exports.admin_signup = async(req, res)=> {
  const admin =await new Admin({
    username : req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });


  await admin.save((err, user) => {
    if (err) {
            return res.status(409).send({ message: err });
    }

    res.send({ message: "Admin was registered successfully!" });

  });
}



exports.admin_login = async(req, res)=> {

  const admin = await Admin.findOne({email : req.body.email})

      if (!admin) {
        return res.status(404).send({ message: "Admin Not found." });
      }

  const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours 
      });

      

      req.session.token = token;

      res.status(200).send({
        id: admin._id,
        email: admin.email,
        token: token
      });

}
