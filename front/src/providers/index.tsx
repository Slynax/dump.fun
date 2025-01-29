import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

// We can define the shape of our context:
interface ISocketContext {
    socket: Socket | null;
}

// Create the context with a default of `null`
const SocketContext = createContext<ISocketContext>(null as any);

// Provider props
interface ISocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<ISocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io("http://localhost:5001", {
            // You can provide additional config here if needed
            // e.g. transports: ["websocket"]
        });

        setSocket(newSocket);

        // Cleanup when unmounting
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}

        </SocketContext.Provider>
    );
};

export function useSocketContext() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketProvider");
    }
    return context;
}


export function useSendMessage() {
    const { socket } = useSocketContext();

    const sendMessage = useCallback(
        (message: any) => {
            if (!socket) return;

            socket.emit("message", message);
        },
        [socket]
    );

    return sendMessage;
}

export function useListen(onMessage: (data: any) => void) {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (data: any) => {
            onMessage(data);
        };

        socket.on("update", handleMessage);

        // Cleanup
        return () => {
            socket.off("update", handleMessage);
        };
    }, [socket, onMessage]);
}
