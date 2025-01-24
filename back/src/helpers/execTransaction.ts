export const execTransaction = ({
  publicKey,
  privateKey,
  action,
  amount,
  percent,
  tokenKey,
}: {
    publicKey: string;
    privateKey: string;
    action: "SELL" | "BUY";
    amount: number;
    percent: number;
    tokenKey: string;
}) => {
    // On fait une fausse transaction parceque la flemme
    return true
};
