import { Tool } from "@/components/Canvas";
import { getExistingShape } from "./http";

type Shape = 
      {
      type: "rect";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "rhombus";
      x: number;
      y: number;
      width: number; // Horizontal
      height: number; // Vertical
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    }
  | {
      type: "eraser";
      x: number;
      y: number;
      size: number;
    };

//let pencilPoints: { x: number; y: number }[] = [];
export class Game {
    private canvas : HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D;
    private existingShape : Shape[];
    private roomId : string
    private pencilPoints : {x : number ; y : number}[]
    private clicked : boolean
    private startx : number;
    private starty : number;
    private selectedTool : Tool;
    socket : WebSocket

    constructor(canvas: HTMLCanvasElement, roomId:string, socket:WebSocket){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShape = [];
        this.roomId = roomId
        this.init();
        this.socket = socket;
        this.initHandler();
        this.pencilPoints = [];
        this.initMouseHandler();
        this.clicked = false
        this.startx = 0;
        this.starty = 0;
        this.selectedTool = "pencil";
    }
    setShape(shape : Tool){
        this.selectedTool = shape;
    }
    
    async init() {
        
        this.existingShape = await getExistingShape(this.roomId)
        this.clearCanvas();
    }
    initHandler(){
        
        console.log("fuck",this.socket);
        this.socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            if(message.type === "chat"){
                const parsedMessage = JSON.parse(message.message);
                const shapeExists = this.existingShape.some(shape => {
                return JSON.stringify(shape) === JSON.stringify(parsedMessage);
                
                    });
                if(!shapeExists){
                    this.existingShape.push(parsedMessage);
                    }
                this.clearCanvas();
            }else {
                console.warn("Unhandled message type: ", message.type);
            }
        }
    }
    destroy(){
        this.canvas.removeEventListener("mousedown",this.handleMouseDown);

        this.canvas.removeEventListener("mouseup",this.handleMouseUp);

         this.canvas.removeEventListener("mousemove",this.handleMouseMove)
    }
    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let selectedToolInside = "";
        this.existingShape.forEach((shape: Shape) => {
            switch (shape.type) {
                case "rect":
                    this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                    selectedToolInside = "rect"
                    break;

                case "circle":
                    this.ctx.beginPath();
                    this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                    selectedToolInside = "circle"
                    break;

                case "line":
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.startX, shape.startY);
                    this.ctx.lineTo(shape.endX, shape.endY);
                    selectedToolInside = "line"
                    break;

                case "rhombus":
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.x + shape.width / 2, shape.y);
                    this.ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2);
                    this.ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
                    this.ctx.lineTo(shape.x, shape.y + shape.height / 2);
                    this.ctx.closePath();
                    selectedToolInside = "rhombus"
                    break;

                case "pencil":
                    this.ctx.beginPath();
                    shape.points.forEach((point, index) => {
                        if (index === 0) {
                            this.ctx.moveTo(point.x, point.y);
                        } else {
                            this.ctx.lineTo(point.x, point.y);
                        }
                    });
                    selectedToolInside = "pencil"
                    break;
            }
            this.ctx.strokeStyle = "rgba(255,255,255)"
            this.ctx.stroke();
        });
        if ( selectedToolInside === "pencil" && this.pencilPoints.length > 0) {
            this.ctx.beginPath();
            this.pencilPoints.forEach((point, index) => {
            if (index === 0) this.ctx.moveTo(point.x, point.y);
            else this.ctx.lineTo(point.x, point.y);
            });
            this.ctx.stroke();
        }
    }
    handleMouseDown = (e : MouseEvent) => {
        const rect = this.canvas.getBoundingClientRect();
            this.startx = e.clientX - rect.left;
            this.starty = e.clientY - rect.top;
            this.clicked = true;
            if (this.selectedTool === "eraser") {
                let mousex = this.startx;
                let mousey = this.starty;
            }
            if(this.selectedTool === "pencil"){
                this.pencilPoints = [{x : this.startx, y: this.starty}]
            }
    }
    handleMouseUp = (e: MouseEvent) => {
        this.clicked = false;
            const width = e.clientX - this.startx;
            const height = e.clientY - this.starty;
            let shape: Shape | null = null;
            switch(this.selectedTool) {
                case "rect" :
                    shape = {
                        type : "rect",
                        x : this.startx,
                        y : this.starty,
                        width : width,
                        height : height
                    }
                    break;
                case "circle" :
                    const radius = Math.sqrt(Math.pow(e.clientX-this.startx,2) + Math.pow(e.clientY-this.starty,2));
                    shape  = {
                        type : "circle",
                        centerX : this.startx,
                        centerY : this.starty,
                        radius : radius
                    }
                    break;
                case "line" :
                    shape = {
                        type : "line",
                        startX : this.startx,
                        startY : this.starty,
                        endX : e.clientX,
                        endY : e.clientY
                    }
                    break;
                case "rhombus" :
                    shape = {
                        type : "rhombus",
                        x : this.startx,
                        y : this.starty,
                        width,
                        height
                    }
                    break;
                case "pencil" :
                    shape = {
                        type : "pencil",
                        points : this.pencilPoints
                    };
                    break;
            }
            if(shape){
                this.existingShape.push(shape);
                const stringifyShape = JSON.stringify({
                    type : "chat",
                    message : JSON.stringify(shape),
                    roomId : this.roomId
                })
                this.socket.send(stringifyShape);
            }
    }
    handleMouseMove = (e: MouseEvent) => {
        if(this.clicked) {
            switch (this.selectedTool) {
                case "pencil" :
                    this.pencilPoints.push({x:e.clientX , y: e.clientY});
                    this.clearCanvas();
                    this.ctx.beginPath();
                    this.pencilPoints.forEach((point,index) => {
                        if(index === 0){
                            this.ctx.moveTo(point.x,point.y);
                        }else{
                            this.ctx.lineTo(point.x,point.y);
                            }
                    })
                    this.ctx.stroke();
                    break;
                            
                case "rect" : 
                    const width = e.clientX - this.startx;
                    const height = e.clientY - this.starty;
                    this.clearCanvas();
                    this.ctx.strokeStyle = "rgba(255,255,255)"
                    this.ctx.strokeRect(this.startx,this.starty,width,height);
                    break;
                case "circle" :
                    const diameterX = e.clientX - this.startx;
                    const diameterY = e.clientY - this.starty;
                    const radius = Math.sqrt(diameterX*diameterX + diameterY*diameterY);
                    this.clearCanvas();
                    this.ctx.beginPath()
                    this.ctx.arc(this.startx,this.starty,radius,0,2*Math.PI)
                    this.ctx.strokeStyle = "rgba(255,255,255)";
                    this.ctx.stroke();
                    break;
                case "line" :
                    this.clearCanvas();
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.startx,this.starty);
                    this.ctx.lineTo(e.clientX,e.clientY);
                    this.ctx.stroke();
                    break;
                case "rhombus" :
                    const centerX = (this.startx + e.clientX) / 2;
                    const centerY = (this.starty + e.clientY) / 2;
                    this.clearCanvas();
                    this.ctx.beginPath();
                    this.ctx.moveTo(centerX, this.starty);
                    this.ctx.lineTo(e.clientX, centerY);
                    this.ctx.lineTo(centerX, e.clientY);
                    this.ctx.lineTo(this.startx, centerY);
                    this.ctx.closePath();
                    this.ctx.stroke();
                    break;
                case "eraser" : 
                    const eraser = {x : e.clientX , y : e.clientY , size : 20};
                    this.existingShape = this.existingShape.filter((shape) => {
                        switch(shape.type){
                            case "rect" :
                                return !(
                                    eraser.x < shape.x + shape.width &&
                                    eraser.x + eraser.size > shape.x &&
                                    eraser.y < shape.y + shape.height &&
                                    eraser.y + eraser.size > shape.y
                                );
                            case "circle":
                                const dx = eraser.x - shape.centerX;
                                const dy = eraser.y - shape.centerY;
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                return distance > shape.radius + eraser.size / 2;
                            case "line" :
                                const lineStartX = shape.startX;
                                const lineStartY = shape.startY;
                                const lineEndX = shape.endX;
                                const lineEndY = shape.endY;
                                const distanceToLine = Math.abs(
                                    (lineEndY - lineStartY) * eraser.x - (lineEndX - lineStartX) * eraser.y +
                                    lineEndX * lineStartY - lineEndY * lineStartX
                                    ) / Math.sqrt(Math.pow(lineEndY - lineStartY, 2) + Math.pow(lineEndX - lineStartX, 2));
                                return distanceToLine > eraser.size;
                            case "rhombus" :
                                const { x: cx, y: cy, width: w, height: h } = shape;
                                const top = cy - h / 2;
                                const bottom = cy + h / 2;
                                const left = cx - w / 2;
                                const right = cx + w / 2;
                                if (eraser.x > left && eraser.x < right && eraser.y > top && eraser.y < bottom) {
                                    const dx1 = eraser.x - cx;
                                    const dy1 = eraser.y - cy;
                                    const leftDiag = (dy1 - dx1) * (dy1 + dx1) < 0; 
                                    const rightDiag = (dy1 + dx1) * (dy1 - dx1) > 0;
                                    return !(leftDiag && rightDiag);
                                }
                                return true;
                        }
                         return true;
                    })
                     this.clearCanvas();
            }
        }
    }
    initMouseHandler(){
        this.canvas.addEventListener("mousedown",this.handleMouseDown);

        this.canvas.addEventListener("mouseup",this.handleMouseUp);

         this.canvas.addEventListener("mousemove",this.handleMouseMove)
    }
   
}