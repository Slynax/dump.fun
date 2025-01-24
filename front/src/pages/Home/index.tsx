import {Navbar} from "../../components/NavBar";
import {Flex} from "antd";
import React, {useState} from "react";
import {WalletModal} from "../../components/WalletModal";
export const Home: React.FC = () => {
    const [walletIsConnected, setWalletIsConnected] = useState(false)
    const [walletPublicKey, setWalletPublicKey] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Flex style={{width:"100%"}}>
            <Navbar setIsModalOpen={setIsModalOpen}/>
            {isModalOpen &&
                <WalletModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setWalletIsConnected={setWalletIsConnected}
                    setWalletPublicKey={setWalletPublicKey}
                />
            }
        </Flex>

    );
}