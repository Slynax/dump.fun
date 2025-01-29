import styled from 'styled-components';
import { Flex, Typography } from 'antd';

export const MyNavBar = styled(Flex)`
    width: calc(100% - 1em);
    background: #24262f;
    padding: 0.5em;
    height: 3em;
`;

export const Title = styled(Typography.Title)`
    color: white !important;
    margin: 0 !important;
`;

export const Label = styled(Typography.Text)`
    color: white;
`;