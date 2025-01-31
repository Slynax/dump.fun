import {Navbar} from "../../components/NavBar";
import {Flex, Space, Input, Button, notification } from "antd";
import React, {useState} from "react";
import {WalletModal} from "../../components/WalletModal";
import {TradeMenu} from "../../components/TradeMenu";
import {MainContainer} from "./styles";

export const Home: React.FC = () => {
    const [walletIsConnected, setWalletIsConnected] = useState(false)
    const [walletPublicKey, setWalletPublicKey] = useState("")
    const [walletSecretKey, setWalletSecretKey] = useState("")
    const [walletBalance, setWalletBalance] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tokenAddress, setTokenAddress] = useState("")
    const [tmpTokenAddress, setTmpTokenAddress] = useState("")

    const handleApplyBtn = () => {
        setTimeout(() => {
            setTokenAddress(tmpTokenAddress);
            notification.success({
                message: "Token Address Applied",
                description: "Token address has been applied successfully"
            });
        },500);
    }
    const handleTokenAddressChange = (e: any) => {
        setTmpTokenAddress(e.target.value);
    }

    return (
        <Flex style={{width:"100%"}} vertical justify="center" align="center">
            <Navbar
                setIsModalOpen={setIsModalOpen}
                walletIsConnected={walletIsConnected}
                walletPublicKey={walletPublicKey}
                walletBalance={walletBalance}
            />
            <MainContainer justify="center" align="center" vertical>
                <Flex>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder="enter token address" onChange={handleTokenAddressChange}/>
                        <Button type="primary" onClick={handleApplyBtn}>Apply</Button>
                        <></>
                    </Space.Compact>
                </Flex>
                <TradeMenu
                    walletPublicKey={walletPublicKey}
                    walletSecretKey={walletSecretKey}
                    tokenAddress={tokenAddress}
                />
            </MainContainer>
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