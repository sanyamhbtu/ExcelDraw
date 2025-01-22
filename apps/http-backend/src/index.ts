 import express from 'express';
 import jwt from 'jsonwebtoken';
 import { JWT_SECRET } from '@repo/backend-common/config';
 import { CreateRoomSchema , CreateUserSchema, SigninSchema } from '@repo/common/schema';
 import { prismaClient } from '@repo/Database/db';
 import { middleware } from './middleware.js';
 import Cookie from "cookie";
 import bcrypt from 'bcrypt'
 import cors from 'cors'
 const app = express();
 app.use(cors({
    origin: 'http://localhost:3000',
  credentials: true
 }));
 app.use(express.json());
const bcryptSalt = 10
app.post('/signup', async (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message : "Invalid data"
        });
        return;
    }
    const { email, password , firstName , lastName , Avatar} = data.data;
    // db call
    try{
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);
        const user = await prismaClient.user.create({
            data : {
                email,
                password : hashedPassword,
                firstName,
                lastName,
                Avatar
            }
        });
        const userId = user.id;
        const token = jwt.sign({ userId }, JWT_SECRET);
        res.json({
            token ,
            message : "User created successfully"
            
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
   
});
app.post('/signin', async (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message : "Invalid data"
        })
        return;
    };
        // db call
    const email = data.data?.email;
    const password = data.data?.password;
    const user = await prismaClient.user.findUnique({
        where : {
            email
        }
    });
    if(!user){
        res.status(401).json({
            message : "No user find with email"
        });
        return;
    }
    if(!await bcrypt.compare(password, user.password)){
        res.status(401).json({
            message: "=passwords do not match"
        });
        return;
    }
    

    const userId = user.id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        token
    });
});
app.post('/room',middleware , async (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    // db.createRoom(req.body);
    if(!data.success){
        res.status(401).json({
            message: "Invalid credentials"
        })
        return;
    }
    const userId = req.userId;
    try{
        const room = await prismaClient.room.create({
            data : {
                slug : data.data.name,
                adminId : userId
            }
        })
        res.json({
            message : "Room created successfully",
            roomId : room.id
        });

    }catch(e){
        res.status(401).json({
            message : "Room already created with this slug"
        })
    }
    
    
});
app.get('/chats/:roodId',async (req,res) => {
    const roomId = Number(req.params.roodId) ;
    try{
        const messages = await prismaClient.chat.findMany({
            where : {
                roomId: roomId
            },
            orderBy :{
                id : "desc"
            },
            take : 10000
        })
        res.json({
            messages
        })
    }catch(e){
        res.status(401).json({
            message: "Failed to fetch data"
        })
    }
    

})
app.get('/room/:slug', async (req, res) => {

    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where : {
            slug
        }
    })
    res.json({
        room
    })
})

app.get('/rooms', async (req,res) => {
    try {
        const rooms = await prismaClient.room.findMany({
            select: {
                id : true,
                createdAt : true,
                slug : true
            }
        })
        
        res.status(200).json({
            rooms
        })
        
    } catch (error) {
        res.status(404).json({
            message : "failed to fetch rooms"
        });
    }
    
})




console.log("port is listening on 4000")
 app.listen(4000);
