import bs58 from 'bs58';

describe('base 58 test suites', () => {
   it('should decode the private key', () => {
       const secretKey = bs58.decode('EdXMLCtQRUdRvC6zgpunQSK4JrV1Gy64H6rMVCZM1L7qTno9Uubw9rfHc2chRs24PaQ34Y2P5ZqaVBS5SxovgW2');
       console.log(secretKey);
   })
});
