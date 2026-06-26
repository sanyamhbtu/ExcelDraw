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
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-[#121212] text-zinc-300">
                <div className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Connecting to server…
                </div>
            </div>
        )
    }
    return <Canvas roomId={roomId} socket={socket} />
}