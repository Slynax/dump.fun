import React, {useState} from "react"
import {Button, Flex} from "antd"
import {MyNavBar, Title, Label} from "./styles.tsx"

export const Navbar: React.FC<{
    setIsModalOpen: (value: boolean) => void,
    walletIsConnected:boolean,
    walletPublicKey: string
}> = ({
    setIsModalOpen,
    walletIsConnected,
    walletPublicKey
}:{
    setIsModalOpen: (value: boolean) => void,
    walletIsConnected: boolean,
    walletPublicKey: string
}) => {
    const onBtnClick = () => {
        setIsModalOpen(true);
    }
    return (
        <MyNavBar justify="space-between" align="center" >
            <Title level={3}>Dump.fun</Title>
            {walletIsConnected ? (
                <Flex gap={5} align="center">
                    <Label copyable={{text: walletPublicKey}}>{walletPublicKey.slice(0,4)}...{walletPublicKey.slice(-4)}</Label>
                    <Button onClick={onBtnClick}>Create/import wallet</Button>
                </Flex>
            ) : (
                <Button onClick={onBtnClick}>Create/import wallet</Button>
            )}
        </MyNavBar>
    )
}