import axios from "axios";
import {HTTP_BACKEND} from "../config"
type Shape = {
    type : "rect",
    x : number,
    y : number,
    height : number,
    width : number
} | {
    type : "circle",
    centerX : number,
    centerY : number,
    radius : number
}
export async function initDraw(canvas: HTMLCanvasElement, roomId : string, socket : WebSocket) {
            
            const ctx = canvas.getContext("2d");
            let existingShape : Shape[] = await getExistingShape(roomId);
            console.log("exitingShape",existingShape)
            if(!ctx){
                return;
            }
            socket.onmessage = (event)=>{
                const message = JSON.parse(event.data);
                if(message.type === "chat"){
                    const parsedMessage = JSON.parse(message.message);
                    existingShape.push(parsedMessage.shape);
                    clearCanvas(existingShape,canvas,ctx);
                }
            }
            clearCanvas(existingShape,canvas,ctx)
            let clicked = false;
            let startx = 0;
            let starty = 0;

            canvas.addEventListener("mousedown", (e) =>{
                startx = e.clientX;
                starty = e.clientY;
                clicked = true;
            })
            canvas.addEventListener("mouseup", (e) =>{
                clicked = false;
                const width = e.clientX - startx;
                const height = e.clientY - starty;
                const shape : Shape ={
                    type : "rect",
                    x : startx,
                    y : starty,
                    width : width,
                    height : height
                }
                existingShape.push(shape);
                socket.send(JSON.stringify({
                    type : "chat",
                    message : JSON.stringify({
                        shape
                    }),
                    roomId
                }))
            })
            
            canvas.addEventListener("mousemove", (e) =>{
                if(clicked) {
                    const width = e.clientX - startx;
                    const height = e.clientY - starty;
                    clearCanvas(existingShape,canvas,ctx);
                    ctx.strokeStyle = 'rgba(255,255,255)'
                    ctx.strokeRect(startx, starty, width, height);
                }
            })
}

export function clearCanvas(existingShape: Shape[], canvas: HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    existingShape.map((shape: Shape) =>{
        if(shape.type === 'rect'){
            ctx.strokeStyle = 'rgba(255,255,255)'
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}

export async function getExistingShape(roomId: string){
    const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
    const messages = response.data.messages;
    const shapes = messages.map((x : {message : string}) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    })
    return shapes
}