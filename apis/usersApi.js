//create mini-express app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs=require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken")
const expressAsyncHandler = require("express-async-handler")
const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')

// configure cloudinary
cloudinary.config({ 
  cloud_name: 'deg6mvd4o', 
  api_key: '144136826166175', 
  api_secret: '374z9r0DXef2faSytfuDFFBv3TI' 
});

// config cloudinary storage
const cloudinaryStorage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:async(req,file)=>{
    return{
      folder:'users',
      public_id:'photo'+"-"+Date.now()
    }
  }
})

//configure multer
const upload=multer({storage:cloudinaryStorage})

//body parser middleware
userApp.use(exp.json());


//CREATE  USER API (Routes)

//route to read all users
userApp.get("/users", expressAsyncHandler(async(req, res) => {
  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  let users=await usersCollectionObj.find({status:true}).toArray()
  // res
  res.send({message:'all users',payload:users})
}
));

//route to read one user by id
userApp.get("/users/:username", expressAsyncHandler(async(req, res) => {

  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  // get username from url
  let usernameOfUrl = req.params.username
  // find user by username
  let user=await usersCollectionObj.findOne({username:usernameOfUrl,status:true})
  // send res
  res.send({message:"one user",payload:user})
 
}));

//route to create new user
userApp.post("/user",upload.single('photo'), expressAsyncHandler(async(req, res) => {
 
  //get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  //get new user from req
  let newUser =JSON.parse(req.body.newUser);
  //verify user's existance
  let existingUser=await usersCollectionObj.findOne({username:newUser.username})
  //if user not existed
  if(existingUser===null){
    // adding status to the newUser
  newUser.status=true
    // hash the password
    let hashedPassword=await bcryptjs.hash(newUser.password,5)
    //replace plain paassword with hashed password
    newUser.password=hashedPassword;
    //add image url to newUser
    newUser.profileImg=req.file.path;
    //remove photo property
    delete newUser.photo;
    newUser.cart=[];
    //create new user
    await usersCollectionObj.insertOne(newUser)
    res.status(201).send({message:"created"})
  }
  else{
    res.send({message:'User already existed'})
  }
}));

userApp.post('/add-to-cart',async(req, res)=>{
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");


  // get the cart details
  let cartItem = req.body;
  let user=req.body.user;

  // checking whether the product is already present in the cart
  let alreadyInCart = await usersCollectionObj.findOne({cart:cartItem});
  if(alreadyInCart===null){
    await usersCollectionObj.updateOne({username:user},{$push:{cart:cartItem}})
    res.send({message:"item added successfully",
payload:cartItem});
  }
else{
  res.send({message:"already in cart"});
}
})


//user login
userApp.post("/user-login", expressAsyncHandler(async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get user cred obj
  let userCredObj = req.body;
  //verify username
  let userOfDb = await usersCollectionObj.findOne({
    username: userCredObj.username,
  });
  //if user not found
  if (userOfDb === null) {
    res.send({ message: "Invalid username" });
  }
  //if username is valid
  else {
    //compare passwords
    let result = await bcryptjs.compare(
      userCredObj.password,
      userOfDb.password
    );
    //if both are not matched
    if (result === false) {
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

// route to get user cart products
userApp.get("/cartProducts/:username", expressAsyncHandler(async(req,res) => {
  
  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  // get username from url
  let usernameOfUrl = req.params.username
  let products=await usersCollectionObj.findOne({username:usernameOfUrl})
  // res
  res.send({message:'all cart products',payload:products.cart})
}
));



//route to update  a user by id
userApp.put("/user/:username", expressAsyncHandler(async(req, res) => {
 
  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  // userObj url
  let usernameOfUrl=req.params.username
  // get modified user from client
  let modifiedUser = req.body
    // update
    await usersCollectionObj.updateOne(
      {username:usernameOfUrl},
      {
        $set :
      {
        ...modifiedUser,
      }
      }
    )
    res.send({message:"user modified successfully"})
}));

//route to delete a user by id
userApp.delete("/user/:username", expressAsyncHandler(async(req, res) => {
  // soft delete :: users can restore their account

  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  // get username from url
  let usernameOfUrl = req.params.username
  
  await 
  usersCollectionObj.updateOne({username:usernameOfUrl},{$set:{status:false}})
  
  res.send({message:'User deleted'})
}));

// route to restor the user
userApp.get('/restore-user/:username', expressAsyncHandler(async(req,res)=>{

  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  // get username from url
  let usernameOfUrl = req.params.username

  await usersCollectionObj.updateOne({username:usernameOfUrl},{$set:{status:true}})

  res.send({message:"user restored successfully"})
}))


userApp.get('/user-login', expressAsyncHandler(async(req,res)=>{

  // get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  // get the userOfDb
  let userCredObj = req.body;
  // verify the username
  let userOfDb= await usersCollectionObj.findOne({username:userCredObj.username})
  // if user is not found
  if(userOfDb===null){
    res.send({message:"username is invalid"})
  }else{
    // compare password
    let result = await bcryptjs.compare(userCredObj.password,userOfDb.password)
    // if password is not matched
    if(result===false){
      res.send({message:"password is invalid"})
    }
    // if password matches
    else{
      // create a token
      let signedToken=jwt.sign({username:userOfDb.username},'abcdef',{expiresIn:15})
      //syntax sign({userPayload},secret key,{options(validity period)})
      // send token in res
      res.send({message:"login success",token:signedToken,currentUser:userOfDb})
    }
  }
}))





// protected route
userApp.get('/protected-route',verifyToken, expressAsyncHandler((req,res)=>{
  res.send({message:"This is a protected info"})
}))



userApp.post('/write-review',verifyToken,(req,res)=>{

})

userApp.post('/buy-product',verifyToken,(req,res)=>{
  
})
userApp.post('/add-to-cart',verifyToken,(req,res)=>{
  
})

//export userApp
module.exports=userApp;