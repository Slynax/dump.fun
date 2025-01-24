import {Navbar} from "../../components/NavBar";
import {Flex} from "antd";
import React, {useState} from "react";
import {WalletModal} from "../../components/WalletModal";
import {TradeMenu} from "../../components/TradeMenu";
export const Home: React.FC = () => {
    const [walletIsConnected, setWalletIsConnected] = useState(false)
    const [walletPublicKey, setWalletPublicKey] = useState("")
    const [walletSecretKey, setWalletSecretKey] = useState("")
    const [walletBalance, setWalletBalance] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Flex style={{width:"100%"}} vertical justify="center">
            <Navbar
                setIsModalOpen={setIsModalOpen}
                walletIsConnected={walletIsConnected}
                walletPublicKey={walletPublicKey}
                walletBalance={walletBalance}
            />
            <Flex justify="center">
                <TradeMenu
                    walletSecretKey={walletSecretKey}
                />
            </Flex>
            {isModalOpen &&
                <WalletModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setWalletIsConnected={setWalletIsConnected}
                    walletIsConnected={walletIsConnected}
                    setWalletPublicKey={setWalletPublicKey}
                    setWalletSecretKey={setWalletSecretKey}
                    setWalletBalance={setWalletBalance}
                />
            }
        </Flex>
    );
}