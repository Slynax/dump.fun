import React from "react";
import {Flex, Input} from "antd";
import {TradeMenuContainer, PercentButton, ActionButton, SubmitButton, MenuTitle, ErrorLabel} from "./styles.tsx";
import { io } from 'socket.io-client';

export const TradeMenu: React.FC<{walletPublicKey:string,walletSecretKey:string}> = ({
    walletPublicKey,
    walletSecretKey
}:{
    walletPublicKey:string,
    walletSecretKey:string
}) => {
    const [percent, setPercent] = React.useState(0)
    const [action, setAction] = React.useState("Buy")
    const [amount, setAmount] = React.useState(0)
    const [tokenKey, setTokenKey] = React.useState("")
    const [errorMsg, setErrorMsg] = React.useState<string | false>(false)

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

    const onSubmitBtnClick = async () => {
        console.log("walletSecretKey : ", walletSecretKey);
        console.log("walletPublicKey : ", walletPublicKey);
        console.log("amount : ", amount);
        console.log("percent : ", percent);
        console.log("action : ", action);
        console.log("tokenKey : ", tokenKey);
        try {
            const socket = io('ws://localhost:5001');
            socket.on('connect', () => {
                const message = {
                    publicKey: walletSecretKey,
                    privateKey: walletSecretKey,
                    action: action.toUpperCase(),
                    amount: amount,
                    percent: percent,
                    tokenKey: tokenKey
                };
                socket.emit('order', message);
            });

            socket.on('error', (error: any) => {
                console.error('Socket error:', error);
            });

        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <TradeMenuContainer gap={10} justify="center" vertical>
            <Flex gap={5} justify="center">
                <MenuTitle level={4}>Trade Menu</MenuTitle>
            </Flex>
            <Flex gap={5}>
                <PercentButton onClick={() => setPercent(25)} active={percent === 25} id="percent-btn-25">25%</PercentButton>
                <PercentButton onClick={() => setPercent(50)} active={percent === 50} id="percent-btn-50">50%</PercentButton>
                <PercentButton onClick={() => setPercent(75)} active={percent === 75} id="percent-btn-75">75%</PercentButton>
                <PercentButton onClick={() => setPercent(100)} active={percent === 100} id="percent-btn-100">100%</PercentButton>
            </Flex>
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