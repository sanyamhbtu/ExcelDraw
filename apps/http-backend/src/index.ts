 import express from 'express';
 import jwt from 'jsonwebtoken';
 import { JWT_SECRET } from '@repo/backend-common/config';
 import { CreateUserSchema , SigninSchema , CreateRoomSchema} from '@repo/common/schema';

 const app = express();

app.post('/signup', (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message : "Invalid data"
        });
        return;
    }

    
});
app.post('/signin', (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message : "Invalid data"
        })
    };
        // db call
    const userId = 'data.userId;'
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        token
    });
});
app.post('/room', (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    // db.createRoom(req.body);
    res.json({
        roomId: 123
    });
});





 app.listen(3000);
