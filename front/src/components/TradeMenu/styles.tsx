import styled from "styled-components";
import {Flex, Button, Typography} from "antd";

export const TradeMenuContainer = styled(Flex)`
    margin-top: 3em;
    padding: 0.5em;
    border-radius: 5px;
    background-color: RGBA(255,255,255,0.05);
    border: 0.1em solid RGBA(255,255,255,0.15);
`

export const PercentButton = styled(Button)<{active:boolean}>`
    background-color: ${props => props.active ? "#1890ff" : "#444444"};

    &:hover {
        background-color: #c5e4fb !important;
        border:none;
    }
    border:none;
    color: white;
`;

export const ActionButton = styled(Button)<{active:boolean}>`
    background-color: ${props => props.active ? "#1890ff" : "#444444"};
    width: 50%;
    &:hover {
        background-color: #c5e4fb !important;
        border:none;
    }
    border:none;
    color: white;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    border:none;
`;

export const MenuTitle = styled(Typography.Title)`
    color: white !important;
`;

export const ErrorLabel = styled(Typography.Text)`
    color: red;
`