// create mini express app
const exp=require('express');
const productApp=exp.Router();
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
        folder:'products',
        public_id:'photo'+"-"+Date.now()
      }
    }
  })

  //configure multer
const upload=multer({storage:cloudinaryStorage})

// body parser middleware
productApp.use(exp.json());

// products Api routes

// create products
productApp.post('/product',upload.single('photo'),async(req,res)=>{
    // productApp.post('/product',async(req,res)=>{
    // get productsObj
    let productsCollectionObj = req.app.get('productsCollectionObj')
    // get product details
    let newProduct = JSON.parse(req.body.newProduct)
    // let newProduct = req.body;
    // checking if product already exists
    let product = await productsCollectionObj.findOne({productId:newProduct.productId})
    if(product===null){
        newProduct.status=true
        //add image url to newUser
        newProduct.productImg=req.file.path;
        delete newProduct.photo;
        await productsCollectionObj.insertOne(newProduct)
        res.status(201).send({
            message:"created",
            currentProduct: newProduct
        })
    }else{
        res.send({message:'product already exists'})
    }
})

// read a product by productId
productApp.get('/product/:productId', async(req,res)=>{

    // get productsCollectionObj
    let productsCollectionObj = req.app.get('productsCollectionObj')
    // productsId from url
    let urlProductId = req.params.productId
    // checking for the productId
    let product = await productsCollectionObj.findOne({productId:urlProductId,status:true})
    if(product===null){
        res.send({message:"no product exists with that product Id"})
    }else{
        res.send({message:"product",payload:product})
    }
})

// read all products
productApp.get('/products',async(req,res)=>{

    // get productsCollectionObj
    let productsCollectionObj=req.app.get('productsCollectionObj')
    // getting all the products
    let products =await productsCollectionObj.find({status:true}).toArray()
    res.send({message:"all products",payload:products})
})


// post a product by productId
productApp.post('/product/:productId', async(req,res)=>{

    // get productsCollectionObj
    let productsCollectionObj = req.app.get('productsCollectionObj')
    // productsId from url
    let urlProductId = req.params.productId
    // checking for the productId
    let product = await productsCollectionObj.findOne({productId:urlProductId,status:true})
    if(product===null){
        res.send({message:"no product exists with that product Id"})
    }else{
        res.send({message:"product",payload:product})
    }
})

// update product by productId
productApp.put('/product/:productId', async(req,res)=>{

    // get productCollectionObj
    let productsCollectionObj=req.app.get('productsCollectionObj')
    // productId from url
    let productIdOfUrl = req.params.productId
    // getting modidified product
    let modifiedProduct=req.body
    // update
        await productsCollectionObj.updateOne({productId:productIdOfUrl},
            {
            $set:
            {
                ...modifiedProduct,
            }
        })
        res.send({message:"product modified"})
})

// delete product
productApp.delete('/products/:productId', async(req,res)=>{
    
    // get productsCollectionObj
    let productsCollectionObj=req.app.get('productsCollectionObj')
    // productId from url
    let urlProductId = Number(req.params.productId)
    // check if productId exists
    let product = await productsCollectionObj.findOne({productId:urlProductId})
    if(product===null){
        res.send({message:"product not found"})
    }else{
        await productsCollectionObj.updateOne({productId:urlProductId},{
            $set:{
                status:false,
            }
        })
        res.send({message:"product deleted"})
    }
})

// restore product
productApp.put('/products/:productId', async(req,res) =>{

    // get productsCollectionObj
    let productsCollectionObj=req.app.get('productsCollectionObj')
    // productId from url
    let urlProductId = Number(req.params.productId)
    // check if productId exists
    let product = await productsCollectionObj.findOne({productId:urlProductId})
    if(product===null){
        res.send({message:"product not found"})
    }else{
        await productsCollectionObj.updateOne({productId:urlProductId},{
            $set:{
                status:true,
            }
        })
        res.send({message:"product restored"})
    }
})



// exporting the productApp
module.exports=productApp;