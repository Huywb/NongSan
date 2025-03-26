import express from 'express'
import cors from 'cors'


const app = express()
app.use(cors)

app.use('api/user',()=>{

})


app.listen('9999',()=>{
    console.log('Server is running at port 9999')
})