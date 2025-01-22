import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export const getExistingShape = async(roomId : string) =>{
    const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
    const messages = response.data.messages;
    const shapes = messages.map((x : {message : string}) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    })
    return shapes
}