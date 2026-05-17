
require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch');

(async () => {
  console.log('KEY:', process.env.OPENROUTER_API_KEY ? 'exists' : 'missing');
  const chatMessages = [
    { role: 'user', content: 'hello' }
  ];
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY,
      'HTTP-Referer': 'https://novario-news.vercel.app',
      'X-Title': 'ELEVONE'
    },
    body: JSON.stringify({
      model: 'google/gemma-2-9b-it:free',
      messages: chatMessages
    })
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
})();

