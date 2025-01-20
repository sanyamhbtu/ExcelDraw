"use client"


import { useState, useEffect} from "react"
import { WS_URL } from "@/config";
import {Canvas} from "./Canvas";
import Cookies from "js-cookie";
export function RoomCanvas({roomId} : {roomId: string}){
    const token = Cookies.get("token");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() =>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTY1Z2k1dmcwMDAwdDVla2lnYThkNzViIiwiaWF0IjoxNzM3NDAyNDAwfQ.wrN72-40aasIxGKevOUEAAoiano_KzeNNiHzmrd_yt4`)
        ws.onopen = () =>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type : "join_room",
                roomId
            }))
        }
    },[]);

    
    if(!socket){
        return <div> Connecting to server ...</div>
    }
    return (
            <Canvas roomId={roomId} socket={socket}></Canvas>
            
        
    )
}