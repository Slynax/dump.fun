export type RequestInterfaceBody = {};

export type RequestInterfaceQuery = {
    privateKey: string;
};

export type RequestInterfaceParams = {
    [key: string]: unknown;
};

export type ResponseInterface = {
    publicKey: string;
    balance: number;
};
