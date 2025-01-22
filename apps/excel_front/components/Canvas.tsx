"use client"
import { useEffect, useRef, useState } from "react";
import { DrawingToolbar} from "@/components/canvas/navbar";
import { Game } from "@/draw/Game";
export type Tool = "circle" | "rect" | "pencil" | "eraser" | "line" | "rhombus"
export function Canvas({roomId,socket} : {roomId: string ; socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const [game,setGame] = useState<Game>();
    const [selectedTool,setSelectedTool] = useState<Tool>("pencil");
    useEffect(()=>{
        game?.setShape(selectedTool);
    },[selectedTool,game])

    useEffect(() => {
          if (canvasRef.current && socket) {
            const g = new Game(canvasRef.current, roomId, socket)
            console.log("after g",socket);
            console.log(g);
            setGame(g);
            return () =>{
                g.destroy()
            }
          }else{
            console.log("socket fucked up")
          }
    }, [canvasRef,socket]);
   return(
    <main className="relative w-screen h-screen overflow-hidden bg-background">
        <DrawingToolbar setSelectedTool={setSelectedTool} />
        <div className="pt-20 px-4">
        <canvas ref={canvasRef} className="absolute inset-0 canvas-grid" width={width} height={height} ></canvas>
        </div>
    
    
    </main>
   )
}
