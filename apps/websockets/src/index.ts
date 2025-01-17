import { WebSocketServer, WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import {prismaClient} from '@repo/database/db'
const wss = new WebSocketServer({ port: 8080 });

interface User {
  userId: string;
  rooms: string[];
  socket: WebSocket;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }
  
  const queryParams = new URLSearchParams(url.split('?')[1] || '');
  const token = queryParams.get('token') || '';
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  const user: User = {
    userId,
    rooms: [],
    socket: ws,
  };

  users.push(user);

  ws.on('message', async function message(data) {
    try {
      const parsedData = JSON.parse(data.toString());
      
      if (parsedData.type === "join_room") {
        const roomId = parsedData.roomId;
        const user = users.find(x => x.userId === userId);
        if (user && roomId) {
          user.rooms.push(roomId);
        }
      } else if (parsedData.type === "leave_room") {
        const roomId = parsedData.roomId;
        const user = users.find(x => x.userId === userId);
        if (user && roomId) {
          user.rooms = user.rooms.filter(x => x !== roomId);
        }
      } else if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;
        try {
          const data = await prismaClient.chat.create({
            data : {
              message,
              userId,
              roomId : Number(roomId)
            }
          })
            users.forEach(user => {
              if (user.rooms.includes(roomId) && user.socket.readyState === WebSocket.OPEN) {
                user.socket.send(JSON.stringify({
                  type: "chat",
                  message,
                  roomId,
                }));
              }
            });
        } catch (error) {
           console.log(error);
        }
        
        
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    // Clean up user from users array on socket close
    const index = users.findIndex(u => u.userId === userId);
    if (index !== -1) {
      users.splice(index, 1);
    }

    
  });
});
