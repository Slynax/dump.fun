import React from "react";
import {Modal, Button, Typography, Flex, Input, notification} from "antd";
import {ModalContainer} from "./styles.tsx";

export const WalletModal: React.FC<{
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void ,
    setWalletIsConnected: (value: boolean) => void,
    walletIsConnected: boolean,
    setWalletPublicKey: (value: string) => void,
    setWalletSecretKey: (value: string) => void,
    setWalletBalance: (value: number) => void
}> = ({
    isModalOpen,
    setIsModalOpen,
    setWalletIsConnected,
    walletIsConnected,
    setWalletPublicKey,
    setWalletSecretKey,
    setWalletBalance
}:{
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void
    setWalletIsConnected: (value: boolean) => void
    walletIsConnected: boolean,
    setWalletPublicKey: (value: string) => void,
    setWalletSecretKey: (value: string) => void,
    setWalletBalance: (value: number) => void
}) => {
    const [mode, setMode] = React.useState("default")
    const [publicKey, setPublicKey] = React.useState("")
    const [privateKey, setPrivateKey] = React.useState("")

    const onModalClose = () => {
        setIsModalOpen(false)
    }
    const onCreateBtnClick = () => {
        createWallet()
    }
    const onImportBtnClick = () => {
        setMode("import")
    }

    const createWallet = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/generateWallet', {
                method: 'GET',
            });
            const data = await response.json();
            if (response.status == 200) {
                setPublicKey(data.publicKey);
                setPrivateKey(data.privateKey);
                setWalletPublicKey(data.publicKey);
                setWalletSecretKey(data.privateKey);
                setWalletBalance(data.balance);
                setWalletIsConnected(true);
                setMode("create");
                notification.success({
                    message: 'Success',
                    description: 'Wallet created successfully',
                });
            }else{
                notification.error({
                    message: 'Error',
                    description: 'An error occured while creating wallet',
                });
            }
        } catch (error) {
            console.error('Error generating wallet:', error);
        }
    }

    const restoreWallet = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/restoreWallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ privateKey })
            });

            const data = await response.json();
            if (response.status == 200) {
                setPublicKey(data.publicKey);
                setWalletPublicKey(data.publicKey);
                setWalletSecretKey(privateKey);
                setWalletBalance(data.balance);
                setWalletIsConnected(true);
                setIsModalOpen(false);
                notification.success({
                    message: 'Success',
                    description: 'Wallet restored successfully',
                });
            }else{
                notification.error({
                    message: 'Error',
                    description: 'An error occured while restoring wallet',
                });
            }
        } catch (error) {
            console.error('Error restore wallet:', error);
        }
    }

    const onSecretKeyChange = (e: any) => {
        setPrivateKey(e.target.value)
    }

    return (
        <Modal open={isModalOpen} onCancel={onModalClose} footer={null}>
            {mode === "default" &&
                <ModalContainer justify="space-evenly" vertical>
                    {walletIsConnected && <Typography.Text strong={true}>You are already connected !</Typography.Text>}
                    <Button onClick={onCreateBtnClick} id="create-wallet-btn">Create Wallet</Button>
                    <Button onClick={onImportBtnClick} id="import-wallet-btn">Import Wallet</Button>
                </ModalContainer>
            }
            {mode === "create" &&
                <ModalContainer justify="space-evenly" vertical>
                    <Flex gap={5}><Typography.Text strong={true}>public key :</Typography.Text><Typography.Text copyable={{ text: publicKey }}>{publicKey.slice(0,4)}...{publicKey.slice(-4)}</Typography.Text></Flex>
                    <Flex gap={5}><Typography.Text strong={true}>private key :</Typography.Text><Typography.Text copyable={{ text: privateKey }}>{privateKey.slice(0,4)}...{privateKey.slice(-4)}</Typography.Text></Flex>
                </ModalContainer>
            }
            {mode === "import" &&
                <ModalContainer justify="space-evenly" vertical>
                    <Input placeholder="enter private Key" onChange={onSecretKeyChange} id="private-key-input"></Input><Button onClick={restoreWallet} id="restore-wallet-btn">Apply</Button>
                </ModalContainer>
            }
        </Modal>
    )
}