import CategoryModel from "../models/Category.js"



export const AddCategory = async(req,res)=>{
    try {
        const {name,image} = req.body

        if(!name || !image[0]){
            return res.status(400).json({message:"All fields are required",success:false,error:true})
        }

        const newCategory = await CategoryModel.create({
            name,
            image               
        })

        res.status(200).json({message:"Add new category success",success:true,error:false,data:newCategory})
    } catch (error) {
        console.log("Error [addCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getCategory = async(req,res)=>{
    try {
        const allCategory = await CategoryModel.find()
        
        res.status(200).json({message:"Get all Category success",success:true,error:false,data : allCategory})
    } catch (error) {
        console.log("Error [getCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateCategory = async(req,res)=>{
    try {
        const {id} = req.params
        
        const {name,image} = req.body

        const CategoryUpdate = await CategoryModel.findByIdAndUpdate(id,{
            ...(name && { name }),  
            ...(image && { image }),
        },{new:true})

        res.status(200).json({message:"Update Category success",success:true,error:false,data: CategoryUpdate})
    } catch (error) {
        console.log("Error [updateCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params
        
        await CategoryModel.findByIdAndDelete(id)

        res.status(200).json({message:"Delete Category success",success:true,erorr:false})
    } catch (error) {
        console.log("Error [deleteCategory controller]",error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}