import React, {useEffect} from "react";
import {Flex, Input, notification} from "antd";
import {TradeMenuContainer, PercentButton, ActionButton, SubmitButton, MenuTitle, ErrorLabel, PercentButtonContainer} from "./styles.tsx";
import { io } from 'socket.io-client';

export const TradeMenu: React.FC<{walletPublicKey:string,walletSecretKey:string, tokenAddress:string}> = ({
    walletSecretKey,
    tokenAddress
}:{
    walletPublicKey:string,
    walletSecretKey:string,
    tokenAddress:string
}) => {
    const [percent, setPercent] = React.useState(0)
    const [action, setAction] = React.useState("Buy")
    const [amount, setAmount] = React.useState(0)
    const [errorMsg, setErrorMsg] = React.useState<string | false>(false)
    const [socket , setSocket] = React.useState<any>(null);

    const onAmountChange = (e: any) => {
        const value = e.target.value;
        if(value <= 0) {
            setErrorMsg("Amount must be greater than 0");
            return;
        }else{
            setErrorMsg(false);
            setAmount(value);
        }
    }

    const initWebSocket = () => {
        const socket = io('ws://localhost:5001');
        socket.on('connect', () => {
            console.log('Connected');
        });

        socket.on("order", (data: any) => {
            if(data){
                notification.success({
                    message: "Order Executed",
                    description: "Order has been executed successfully"
                });
            }
        });

        socket.on('error', (error: any) => {
            console.error('Socket error:', error);
        });
        setSocket(socket);
    }

    const onSubmitBtnClick = async () => {
        try {
            socket.emit('order', {
                publicKey: walletSecretKey,
                privateKey: walletSecretKey,
                action: action.toUpperCase(),
                amount: amount,
                percent: percent,
                tokenKey: tokenAddress
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    useEffect(
        () => {
            initWebSocket();
        },[]
    )
    return (
        <TradeMenuContainer gap={10} justify="center" vertical>
            <Flex gap={5} justify="center">
                <MenuTitle level={4}>Trade Menu</MenuTitle>
            </Flex>
            <PercentButtonContainer gap={5}>
                <PercentButton onClick={() => setPercent(25)} active={percent === 25} id="percent-btn-25">25%</PercentButton>
                <PercentButton onClick={() => setPercent(50)} active={percent === 50} id="percent-btn-50">50%</PercentButton>
                <PercentButton onClick={() => setPercent(75)} active={percent === 75} id="percent-btn-75">75%</PercentButton>
                <PercentButton onClick={() => setPercent(100)} active={percent === 100} id="percent-btn-100">100%</PercentButton>
            </PercentButtonContainer>
            <Flex gap={5} justify="center">
                <ActionButton onClick={() => setAction("Buy")} active={action === "Buy"} id="action-btn-buy">Buy</ActionButton>
                <ActionButton onClick={() => setAction("Sell")} active={action === "Sell"} id="action-btn-sell">Sell</ActionButton>
            </Flex>
            <Flex gap={5} justify="center">
                <Input placeholder="enter amount" type="number" min={0} onChange={onAmountChange} id="input-amout"></Input>
            </Flex>
            <Flex gap={5} justify="center">
                <SubmitButton style={{width:"100%"}} onClick={onSubmitBtnClick} id="submit-btn" disabled={errorMsg !== false}>{action}</SubmitButton>
            </Flex>
            {errorMsg &&
                <ErrorLabel>{errorMsg}</ErrorLabel>
            }
        </TradeMenuContainer>
    );
}