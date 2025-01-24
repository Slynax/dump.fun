import React from "react";
import {Modal, Button, Typography, Flex, Input} from "antd";
import {ModalContainer} from "./styles.tsx";

export const WalletModal: React.FC<{
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void ,
    setWalletIsConnected: (value: boolean) => void,
    setWalletPublicKey: (value: string) => void
}> = ({
    isModalOpen,
    setIsModalOpen,
    setWalletIsConnected,
    setWalletPublicKey
}:{
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void
    setWalletIsConnected: (value: boolean) => void
    setWalletPublicKey: (value: string) => void
}) => {
    const [mode, setMode] = React.useState("default")
    const [publicKey, setPublicKey] = React.useState("")
    const [privateKey, setPrivateKey] = React.useState("")

    const onModalClose = () => {
        setIsModalOpen(false)
    }
    const onCreateBtnClick = () => {
        setMode("create")
    }
    const onImportBtnClick = () => {
        setMode("import")
    }
    return (
        <Modal open={isModalOpen} onCancel={onModalClose} footer={null}>
            {mode === "default" &&
                <ModalContainer justify="space-evenly" vertical>
                    <Button onClick={onCreateBtnClick}>Create Wallet</Button>
                    <Button onClick={onImportBtnClick}>Import Wallet</Button>
                </ModalContainer>
            }
            {mode === "create" &&
                <ModalContainer justify="space-evenly" vertical>
                    <Flex><Typography.Text>public key</Typography.Text><Typography.Text copyable={{ text: publicKey }}>3sql...nl5l</Typography.Text></Flex>
                    <Flex><Typography.Text>private key</Typography.Text><Typography.Text copyable={{ text: privateKey }}>3REB...Q4SQ</Typography.Text></Flex>
                </ModalContainer>
            }
            {mode === "import" &&
                <ModalContainer justify="space-evenly" vertical>
                    <Input></Input><Button>Apply</Button>
                </ModalContainer>
            }
        </Modal>
    )
}