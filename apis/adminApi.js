//create mini-express app
const exp = require("express");
const adminApp = exp.Router();
const bcryptjs=require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken")
const expressAsyncHandler = require("express-async-handler")


//body parser middleware
adminApp.use(exp.json());


//CREATE  USER API (Routes)


//user login
adminApp.post("/admin-login", expressAsyncHandler(async (req, res) => {
    //get adminsCollectionObj
    let adminsCollectionObj = req.app.get("adminsCollectionObj");
    //get admin cred obj
    let adminCredObj = req.body;
    //verify username
    let userOfDb = await adminsCollectionObj.findOne({
      username: adminCredObj.username,
    });
    //if user not found
    if (userOfDb === null) {
      res.send({ message: "Invalid username" });
    }
    //if username is valid
    else {
      //if both are not matched
      if (adminCredObj.password !== userOfDb.password) {
        res.send({ message: "Invalid password" });
      }
      //if passwords are matched
      else {
        //create a token
        let signedToken = jwt.sign({ username: userOfDb.username }, "abcdef", {
          expiresIn: 15,
        });
        //send token in res
        res.send({
          message: "login success",
          token: signedToken,
          currentUser: userOfDb,
        });
      }
    }
  }));




//export adminApp
module.exports=adminApp;