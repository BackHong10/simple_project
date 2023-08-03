declare global{
    namespace Express {
        
        interface User{
           id: number
        }
        interface Request{
            user:{
                id: number
            },
            query:{
                page:{
                    num: number
                },
                limit:{
                    num: number
                }
            }
        }
    }
    
}

export default {}