const axios = require('axios');

test('front-end application is running', async () => {
  const response = await axios.get('http://localhost:80');
  expect(response.status).toBe(200);
});