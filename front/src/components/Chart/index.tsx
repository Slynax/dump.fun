import React, { useRef, useEffect } from 'react';
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts';

// Each candle has a numeric timestamp (seconds), plus OHLC data
export interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface LightweighthartProps {
    data: Candle[];
    width?: number;
    height?: number;
}

export const Chart = ({
    width = 600,
    height = 300,
    data
}: {
    width?: number;
    height?: number;
    data: Candle[];
}) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Create chart
        chartRef.current = createChart(chartContainerRef.current, {
            width,
            height,
        });

        // Add candlestick series
        seriesRef.current = (chartRef.current as any).addCandlestickSeries();
        (seriesRef.current as any).setData(
            data.map((candle) => ({
                time: candle.time,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
            }))
        );

        // Optional: Cleanup when unmounting
        return () => {
            if (chartRef.current) {
                (chartRef.current as any).remove();
            }
        };
    }, []);

    useEffect(() => {
        if (!seriesRef.current) return;

        // Update series data
        (seriesRef.current as any).setData(
            data.map((candle) => ({
                time: candle.time,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
            }))
        );
    }, [data]);

    return <div ref={chartContainerRef} style={{ position: 'relative' }} />;
};
