import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./auth-context";


const SocketContext = createContext({
    socket: null,
    isConnected: false,
});

export const SocketProvider = ({ children }) => {
    const auth = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
      let socketInstance = null;
    
        const connectSocket = async () => {
          const token = auth?.token;
          const userId = auth?.user?._id;
    
          if (!token || !userId) {
            setIsConnected(false);
            setSocket(null);
            console.log("❌ No token/user for socket connection");
            return;
          }

          if (!process.env.REACT_APP_SOCKET_ENDPOINT) {
            console.log("❌ Missing REACT_APP_SOCKET_ENDPOINT");
            return;
          }
         
          socketInstance = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
              transports: ["websocket"],
              auth: { token },
          });
    
          socketInstance.on("connect", () => {
              console.log("🔌 Connected to Instance server");
              setIsConnected(true);
              setSocket(socketInstance);
          });
      
      
          socketInstance.on("disconnect", () => {
            console.log("❌ Disconnected from socket server");
            setIsConnected(false);
            setSocket(null);
          });
      
          socketInstance.on('connect_error', (err) => {
              console.log('❌❌❌ Socket connection error:', err.message);
            });
        };
    
        connectSocket();
    
        return () => {
          if(socketInstance) {
            socketInstance.disconnect();
          }
        };
      }, [auth?.token, auth?.user?._id]);
    
      return (
        <SocketContext.Provider value={{ socket, isConnected }}>
          {children}
        </SocketContext.Provider>
      );
    };
    
    export const useSocket = () => useContext(SocketContext);