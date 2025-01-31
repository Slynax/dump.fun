import React from "react"
import {Button, Flex} from "antd"
import {MyNavBar, Title, Label} from "./styles.tsx"

export const Navbar: React.FC<{
    setIsModalOpen: (value: boolean) => void,
    walletIsConnected:boolean,
    walletPublicKey: string,
    walletBalance: number
}> = ({
    setIsModalOpen,
    walletIsConnected,
    walletPublicKey,
    walletBalance
}:{
    setIsModalOpen: (value: boolean) => void,
    walletIsConnected: boolean,
    walletPublicKey: string,
    walletBalance: number
}) => {
    const onBtnClick = () => {
        setIsModalOpen(true);
    }
    return (
        <MyNavBar justify="space-between" align="center" >
            <Title level={3}>Dump.fun</Title>
            {walletIsConnected ? (
                <Flex gap={10} align="center">
                    <Label id="wallet-balance">Balance: ${walletBalance}</Label>
                    <Label copyable={{text: walletPublicKey}} id="wallet-public-key">{walletPublicKey.slice(0,4)}...{walletPublicKey.slice(-4)}</Label>
                    <Button onClick={onBtnClick} id="open-modal-btn">Create/import wallet</Button>
                </Flex>
            ) : (
                <Button onClick={onBtnClick} id="open-modal-btn">Create/import wallet</Button>
            )}
        </MyNavBar>
    )
}