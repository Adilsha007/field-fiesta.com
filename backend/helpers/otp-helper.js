const fast2sms = require('fast-two-sms')



let otpArray = []


exports.otpGenerator = (req,res)=>{

    const username = req.body.username
    const email = req.body.email
    const phoneno = req.body.phoneno

    const randomOTP = Math.floor(Math.random() * 10000)
    
    const options = {
        authorization : process.env.F2SMS_Auth_ID,
        message : `${username}, here's your OTP to verify your phone number on fieldfiesta.com, ${randomOTP}`,
        numbers : [phoneno]
    }

    

    fast2sms.sendMessage(options)
            .then((result)=>{

                otpArray.push(randomOTP)
                console.log(randomOTP);
                const msg = result.message[0]
                res.status(200).send({message : msg})
            })
            .catch((err)=>{
                console.log(err);
            })

}


exports.otpVerification = (req, res, next) => {
    const otp = req.body.otp * 1;
        
    const indexToRemove = otpArray.indexOf(otp);
    
    if (indexToRemove > -1) {
        otpArray.splice(indexToRemove, 1);
        next()
    }else{
        return res.status(401).send({ message: "Failed! Enter correct OTP!" });
    }
  
};