import React from "react";
import {Flex, Input, Typography, notification} from "antd";
import {TradeMenuContainer, PercentButton, ActionButton, SubmitButton} from "./styles.tsx";

export const TradeMenu: React.FC<{walletSecretKey:string}> = ({
    walletSecretKey
}:{
    walletSecretKey:string
}) => {
    const [percent, setPercent] = React.useState(0)
    const [action, setAction] = React.useState("Buy")
    const [amount, setAmount] = React.useState(0)

    const onAmountChange = (value: any) => {
        setAmount(value);
    }

    const onSubmitBtnClick = async () => {
        try {
            //TODO use socket
        } catch (error) {
            console.error('Error restore wallet:', error);
        }
    }

    return (
        <TradeMenuContainer gap={10} justify="center" vertical>
            <Flex gap={5} justify="center">
                <Typography.Text>Trade Menu</Typography.Text>
            </Flex>
            <Flex gap={5}>
                <PercentButton onClick={() => setPercent(25)} active={percent === 25}>25%</PercentButton>
                <PercentButton onClick={() => setPercent(50)} active={percent === 50}>50%</PercentButton>
                <PercentButton onClick={() => setPercent(75)} active={percent === 75}>75%</PercentButton>
                <PercentButton onClick={() => setPercent(100)} active={percent === 100}>100%</PercentButton>
            </Flex>
            <Flex gap={5} justify="center">
                <ActionButton onClick={() => setAction("Buy")} active={action === "Buy"}>Buy</ActionButton>
                <ActionButton onClick={() => setAction("Sell")} active={action === "Sell"}>Sell</ActionButton>
            </Flex>
            <Flex gap={5} justify="center">
                <Input placeholder="enter amount" type="number" min={0} onChange={onAmountChange}></Input>
            </Flex>
            <Flex gap={5} justify="center">
                <SubmitButton style={{width:"100%"}} onClick={onSubmitBtnClick}>{action}</SubmitButton>
            </Flex>
        </TradeMenuContainer>
    );
}