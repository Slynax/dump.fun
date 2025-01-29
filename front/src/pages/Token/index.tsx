import {Flex} from "antd";
import {useParams} from "react-router-dom";
import {useListen, useSendMessage, useSocketContext} from "../../providers";
import {useEffect, useState} from "react";
import {Chart} from "../../components/Chart";
import {computeCandles} from "../../helpers/computeCandles.ts";

export const Token = () => {
    const {tokenId} = useParams<{ tokenId: string }>();
    const sendMessage = useSendMessage();

    const {socket} = useSocketContext();

    const [chartData, setChartData] = useState([]);
    const [transactions, setTransactions] = useState([] as any[]);

    useListen((message) => {
        const obj = JSON.parse(message.data);
        console.log(obj);

        if (!obj.mint){
            return;
        }

        setTransactions((prev) => [...prev, obj]);
    });

    useEffect(() => {
        if (!tokenId || !socket) {
            return;
        }
        sendMessage({type: "subscribe", key: tokenId});

        return () => {
            sendMessage({type: "unsubscribe", key: tokenId});
        }
    }, [tokenId, socket]);

    useEffect(() => {
        const candles = computeCandles(transactions);
        setChartData(candles);
        console.log(candles);
    }, [transactions]);

    return (
        <Flex vertical>
            <h1>{tokenId}</h1>
            <Chart
                data={
                    chartData
                }
            />

        </Flex>
    )
}
