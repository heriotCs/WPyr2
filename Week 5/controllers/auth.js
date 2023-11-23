const mysql = require('mysql');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE 
});

exports.register = (req,res) =>{
    console.log(req.body);

    const{name,email,password,passwordConfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?',  [email], async (error,result) =>{
        if (error) {
            console.log(error);
        }
        if (result.length > 0){
            return res.render('register', {
                message: 'This email is already taken'
            })
        } else if (password !== passwordConfirm){
            return res.render('register', {
                message: 'passwords do not match'
            });
        }
    
    const hashedpassword = await bcrypt.hash(password,8);
    console.log(hashedpassword);

});


    res.send("form submitted");
};