import styled from "styled-components";
import {Flex, Button} from "antd";

export const TradeMenuContainer = styled(Flex)`
    margin-top: 3em;
    padding: 0.5em;
    border-radius: 5px;
    background-color: #444444;
`

export const PercentButton = styled(Button)<{active:boolean}>`
    background-color: ${props => props.active ? "#1890ff" : "#444444"};

    &:hover {
        background-color: #c5e4fb !important;
    }
`;

export const ActionButton = styled(Button)<{active:boolean}>`
    background-color: ${props => props.active ? "#1890ff" : "#444444"};
    width: 50%;
    &:hover {
        background-color: #c5e4fb !important;
    }
`;

export const SubmitButton = styled(Button)`
    width: 100%;
`;