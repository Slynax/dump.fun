import './App.css'
import AppRouter from './router';
import {SocketProvider} from "./providers";

function App() {
  return (
    <SocketProvider>
        <AppRouter />
    </SocketProvider>
  )
}

export default App
