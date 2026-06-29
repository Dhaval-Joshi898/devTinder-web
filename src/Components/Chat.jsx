// import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   // console.log(targetUserId)
//   return (
//     <div className="mt-20 border border-red-700 w-1/2 mx-auto bg-slate-900">
//       <div className="mt-20 text-white ">Chat</div>
//       <div className="chat chat-start ">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
//             />
//           </div>
//         </div>
//         <div className="chat-header">
//           Obi-Wan Kenobi
//           <time className="text-xs opacity-50">12:45</time>
//         </div>
//         <div className="chat-bubble">You were the Chosen One!</div>
//         <div className="chat-footer opacity-50">Delivered</div>
//       </div>
//       <div className="chat chat-end">
//         <div className="chat-image avatar">
//           <div className="w-10 rounded-full">
//             <img
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//             />
//           </div>
//         </div>
//         <div className="chat-header">
//           Anakin
//           <time className="text-xs opacity-50">12:46</time>
//         </div>
//         <div className="chat-bubble">I  you!</div>
//         <div className="chat-footer opacity-50">Seen at 12:46</div>

//       </div>
//       <div className="w-max">
//         <input type="text" className="w-[50vw]"></input>
//         <button className="bg-slate-500 border ">Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user); //will get logged in user(obj) from store.
  const userId = user?._id;

  const fetchUserMessages=async ()=>{
      const chats=await axios.get(`${BASE_URL}/chat/${targetUserId}`,{ withCredentials: true })
      // console.log(chats.data.messages)

      const chatMessages=chats?.data?.messages.map((msg)=>{
        return {senderId: msg.senderId._id,firstName:msg.senderId.firstName,lastName:msg.senderId.lastName,text:msg.text}
      })
      setMessages(chatMessages)
  }

  useEffect(()=>{
    fetchUserMessages()
  },[])

  useEffect(() => {
    if (!userId) return; //no userId present do not create socket connection
    const socket = createSocketConnection();
    //As soon as page loaded,the socket connection is mad e and joinChat event is emmited.(and emmited events are handled by backend)
    socket.emit("joinChat", {
      firstName: user?.firstName,
      lastName:user?.lastName,
      userId,
      targetUserId,
    });

    //the message recived send by backend is listen by frontend
    socket.on("messageReceived", ({ firstName,lastName, text,senderId,targetUserId }) => {
      console.log(firstName,lastName, ":", text);
      setMessages((prev)=>([...prev,{firstName,lastName,text,senderId,targetUserId}]))
      
    });

    //whenever component unloads(unMount) need to cleanup socket otherwise loose open connection will be there
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    //in this need to send message w e will need socket again doing createSocketConnection to emit
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName:user?.lastName,
      userId,
      targetUserId,
      newMessage: newMessage,
    });
    setNewMessage("")
    console.log("SET MESSAFES",messages)
  };

  return (
     <div
    className="
      mx-auto my-24
      flex flex-col
      h-[80dvh]
      w-full sm:w-[90%] md:w-[70%] lg:w-1/2
      bg-slate-900 border border-slate-700 rounded-lg
    "
  >
    {/* Header */}
    <div className="text-white text-center py-4 border-b text-lg font-semibold">
      Chat Room
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {messages.map((msg, index) => {
        const isMe = msg.senderId === userId;


        return (
          <div
            key={index}
            className={`chat ${isMe ? "chat-end" : "chat-start"}`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="avatar"
                  src={
                    isMe
                      ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                      : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  }
                />
              </div>
            </div>

            {/* Name + Time */}
            <div className="chat-header text-xs text-gray-400 flex gap-2">
              <span>{msg.firstName} {msg.lastName}</span>
              <time>{msg.time}</time>
            </div>

            {/* Message Bubble */}
            <div
              className={`chat-bubble ${
                isMe ? "bg-blue-600 text-white" : "bg-slate-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>

    {/* Input */}
    <div className="sticky bottom-0 p-3 bg-slate-800 border-t flex gap-2">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
        className="
          flex-1 px-3 py-2
          rounded bg-slate-700 text-white
          outline-none
        "
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Send
      </button>
    </div>
  </div>
    // <div
    //   className="border border-red-700
    //     bg-slate-900
    //     mx-auto
    //     my-20
    //     flex flex-col
    //     h-[80dvh]
    //     w-full
    //     sm:w-[90%]
    //     md:w-[70%]
    //     lg:w-1/2  
    //   "
    // >
    //   {/* Header */}
    //   <div className="text-white text-center py-4 border-b text-lg font-semibold">
    //     Chat
    //   </div>
    //   {/* {console.log("all messsages",messages)} */}
    //   {messages.map((message,index)=>(
        
    //     <div className={`chat ${message.userId !==userId ? "chat-start":"chat-end"}`}>
    //     <div className="chat-image avatar">
    //       <div className="w-10 rounded-full">
    //         <img
    //           alt="Tailwind CSS chat bubble component"
    //           src={`${message.userId !==userId ? "https://img.daisyui.com/images/profile/demo/kenobee@192.webp":"https://img.daisyui.com/images/profile/demo/anakeen@192.webp"}`}
    //           // src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
    //         />
    //       </div>
    //     </div>
    //     <div className="chat-header">
    //       {message.firstName}
    //       {/* <time className="text-xs opacity-50">12:45</time> */}
    //     </div>
    //     <div className="chat-bubble"> {message.newMessage}</div>
    //     {/* <div className="chat-footer opacity-50">Delivered</div> */}
    //   </div>
      
    //   ))}
  
    //   {/* Input */}
    //   <div className="p-2 sm:p-3 border-t bg-slate-800 flex gap-2">
    //     <input
    //       value={newMessage}
    //       onChange={(e) => setNewMessage(e.target.value)}
    //       type="text"
    //       placeholder="Type a message..."
    //       className="
    //         flex-1
    //         px-3 py-2
    //         text-sm sm:text-base
    //         rounded
    //         bg-slate-700
    //         text-white
    //         outline-none
    //       "
    //     />
    //     <button
    //       onClick={sendMessage}
    //       className="
    //         px-3 sm:px-4
    //         py-2
    //         bg-blue-600
    //         text-white
    //         rounded
    //         text-sm sm:text-base
    //       "
    //     >
    //       Send
    //     </button>
    //   </div>
    // </div>
  );
};

export default Chat;
