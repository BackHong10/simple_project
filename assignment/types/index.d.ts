declare global{
    namespace Express {
        
        interface User{
           id: number
        }
        interface Request{
            user:{
                id: number
            },
            
        }
    }
    
}

export default {}