import React, {useState} from "react"
import {Button, Typography} from "antd"
import {MyNavBar, Title} from "./styles.tsx"
import {WalletModal} from "../WalletModal";

export const Navbar: React.FC<{setIsModalOpen: (value: boolean) => void }> = ({
    setIsModalOpen
}:{
    setIsModalOpen: (value: boolean) => void
}) => {
    const [walletIsConnected, setWalletIsConnected] = useState(false)
    const [publicKey, setPublicKey] = useState("")

    const onBtnClick = () => {
        setIsModalOpen(true);
    }
    return (
        <MyNavBar justify="space-between" align="center" >
            <Title level={3}>Dump.fun</Title>
            {walletIsConnected ? (
                <Typography.Text >{publicKey}</Typography.Text>
            ) : (
                <Button onClick={onBtnClick}>Create/import wallet</Button>
            )}

        </MyNavBar>
    )
}