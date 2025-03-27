import ProductModel from "../models/Product.js"


export const CreateProduct = async(req,res)=>{
    try {
        const {name,image,category,subCategory,unit,stock,price,discount,description,more_details} = req.body
            //
        if(!name ||!image[0] || !category[0] || !subCategory[0] ||  !unit || !price || !description){
            return res.status(400).json({message:"All fields are required",error:true,success:false})
        }
        const newProduct = await ProductModel.create({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        })

        res.status(200).json({message:"Create new product Success",error:false,success:true})
    } catch (error) {
        console.log("Error [CreateProduct controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})  
    }
}

export const getProduct = async(req,res)=>{
    try {

        let {page, limit,search} = req.query

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])


        res.status(200).json({message:"getProduct Data ",error:false,success:true,totalCount: totalCount,totalNoPage : Math.ceil(totalCount/limit),data: data})

    } catch (error) {
        console.log("Error [GetProduct controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getProductByCategory = async(req,res)=>{
    try {
        const {id} = req.body
        
        if(!id){
            return res.status(400).json({message: "provide category ID",error:true,success:false})
        }

        const product = await ProductModel.find({category: {$in : id}}).limit(15)

        res.status(200).json({message:"GetproductbyCategory Success",error:false,success:true,data : product})
    } catch (error) {
        console.log("Error [GetProductByCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getProductByCategoryAndSubCategory = async (req,res)=>{
    try {
        const {categoryId,subCategoryId,page,limit} = req.query

        if(!categoryId || !subCategoryId){
            return res.status(400).json({message:"Provide categoryId and subCategoryId",success:false,error:true})
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category: {$in : categoryId},
            subCategory: {$in : subCategoryId}
        }

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        res.status(200).json({message:"getProductByCateAndSubCate success",error:false,success:true,})

    } catch (error) {
        console.log("Error [GetProductByCategoryAndSubCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getProductDetail = async(req,res)=>{
    try {
        const {productId} = req.body

        const product = await ProductModel.findOne({_id: productId})

        res.status(200).json({message:"Product Details",error:false,success:true,data: product})
    } catch (error) {
        console.log("Error [GetProductByCategoryAndSubCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateProduct = async(req,res)=>{
    try {
        const {productId,name,image,category,subCategory,unit,stock,price,discount,description,more_details} = req.body

        const updateProduct = await ProductModel.findByIdAndUpdate(productId,{
            ...(name && { name }),
            ...(image && { image }),
            ...(category && { category }),
            ...(subCategory && { subCategory }),
            ...(unit && { unit }),
            ...(stock && { stock }),
            ...(price && { price }),
            ...(discount && { discount }),
            ...(description && { description }),
            ...(more_details && { more_details })
        },{new:true})

        res.status(200).json({message:"UpdateProduct Success",error:false,success:true,data:updateProduct})
    } catch (error) {
        console.log("Error [GetProductByCategoryAndSubCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params

        if(!id){
            return res.status(400).json({message: "Provide id",error:true,success:false})
        }

        const deleteProduct = await ProductModel.findByIdAndDelete(id)

        res.status(200).json({message:"DeleteProduct success",error:false,success:true})
    } catch (error) {
        console.log("Error [GetProductByCategoryAndSubCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const searchProduct = async(req,res)=>{
    try {
        let {page,limit,search} = req.query

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        res.status(200).json({message:"Search Product success",success:true,error:false,totalCount: totalCount,totalNoPage : Math.ceil(totalCount/limit),data: data})

    } catch (error) {
        console.log("Error [GetProductByCategoryAndSubCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}