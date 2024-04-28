
import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import userSchema from './models/zod_schema';

dotenv.config();
const app = express();
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/api/v1/signup', async (req, res) => {
    const payload = req.body;
    const validatedUser = userSchema.safeParse(payload);
    if(validatedUser.success){
        const prisma = new PrismaClient();
        try {
            const user = await prisma.user.create({
              data: payload,
            });
            res.status(200).json({msg: "User Created"})
            console.log(`User created with ID: ${user.id}`);
          } catch (error) {
            console.error("Error creating user:", error);
            res.status(400).json({msg: "Error Creating User"})
          } finally {
            await prisma.$disconnect();
          }
    }
    

      
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening `);
});
