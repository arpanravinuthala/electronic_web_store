//CREATE EXPRESS APP
const exp=require('express')
const app=exp();
const path=require('path')
app.use(exp.json());

// connect react app with nodejs
app.use(exp.static(path.join(__dirname,'./build')))


//import MongoClient
const mngClient=require('mongodb').MongoClient;


//connecting to MongoDB server with mongo client
mngClient.connect('mongodb://127.0.0.1:27017/arpandb')
.then(client=>{
    //get db obj
    let db=client.db('arpandb')
    //get userscollection obj
    let usersCollectionObj=db.collection('users')
    // get productsCollection obj
    let productsCollectionObj=db.collection('products')
    // get productsCollection obj
    let adminsCollectionObj=db.collection('admins')
    //share usersCollectionObj
    app.set('usersCollectionObj',usersCollectionObj)
    // share productsCollectionObj
    app.set('productsCollectionObj',productsCollectionObj)
    // share productsCollectionObj
    app.set('adminsCollectionObj',adminsCollectionObj)


    console.log("Database connected successfully")
})
.catch(err=>console.log("err in db connect ",err))



const userApp=require("./apis/usersApi")
const productApp=require('./apis/productApi')
const adminApp=require('./apis/adminApi')


//if path starts with /user-api, then forward req to userApi
app.use('/user-api',userApp)
//if path starts with /product-api, then forward req to productApi
app.use('/product-api',productApp)
//if path starts with /product-api, then forward req to productApi
app.use('/admin-api',adminApp)

//page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
  })


// error handling using middleware
app.use((req,res,next)=>{
    res.send({message:"Invalid path"})
})


// error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error Occured",error:err.message})
})


//assign port number to HTTP Server
app.listen(4000,()=>console.log("server listening on port 4000..."))