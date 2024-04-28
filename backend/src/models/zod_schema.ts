import {z} from 'zod'


const userSchema = z.object({
    
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  export default userSchema