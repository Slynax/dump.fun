import React from "react";
import {Flex, Input} from "antd";
import {TradeMenuContainer, PercentButton, ActionButton, SubmitButton, MenuTitle} from "./styles.tsx";

export const TradeMenu: React.FC<{walletSecretKey:string}> = ({
    walletSecretKey
}:{
    walletSecretKey:string
}) => {
    const [percent, setPercent] = React.useState(0)
    const [action, setAction] = React.useState("Buy")
    const [amount, setAmount] = React.useState(0)
    const [tokenKey, setTokenKey] = React.useState("")

    const onAmountChange = (value: any) => {
        setAmount(value);
    }

    const onSubmitBtnClick = async () => {
        try {
            const socket = new WebSocket('ws://localhost:8001');
            socket.onopen = () => {
                const message = {
                    publicKey: walletSecretKey,
                    privateKey: walletSecretKey,
                    action: action.toUpperCase(),
                    amount: amount,
                    tokenKey: tokenKey
                };
                socket.send(JSON.stringify({ channel: 'order', message }));
            };
            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
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
                <SubmitButton style={{width:"100%"}} onClick={onSubmitBtnClick} id="submit-btn">{action}</SubmitButton>
            </Flex>
        </TradeMenuContainer>
    );
}