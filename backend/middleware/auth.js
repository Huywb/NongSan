import jwt from 'jsonwebtoken'

export const auth = async(req,res,next)=>{
    try {
        console.log("Headers:", req.headers);
        console.log("Cookies:", req.cookies);
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
       

        console.log(token)
        
        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return res.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }

        req.userId = decode.id

        next()

    } catch (error) {
        return res.status(500).json({
            message : "You have not login",
            error : true,
            success : false
        })
    }
}