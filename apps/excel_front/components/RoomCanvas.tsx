"use client"


import { useState, useEffect} from "react"
import { WS_URL } from "@/config";
import {Canvas} from "./Canvas";
import Cookies from "js-cookie";
export function RoomCanvas({roomId} : {roomId: string}){
    const token = Cookies.get("token");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() =>{
        const ws = new WebSocket(`${WS_URL}?token=${token}`)
        ws.onopen = () =>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type : "join_room",
                roomId
            }))
        }
        return () => {
            ws.close();
        };
    },[roomId, token]);

    
    if(!socket){
        return <div> Connecting to server ...</div>
    }
    console.log("roomcanvas",socket);
    return (
        
            <Canvas roomId={roomId} socket={socket}></Canvas>
            
        
    )
}