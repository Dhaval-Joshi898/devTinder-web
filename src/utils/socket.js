import { io } from "socket.io-client";
import BASE_URL from "./constants";


export const createSocketConnection=()=>{
    return io(BASE_URL); //telling client to connect to backend to emit events like connection ,send mEssage
}