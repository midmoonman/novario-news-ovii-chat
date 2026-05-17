
require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch');

(async () => {
  const chatMessages = [
    { role: 'system', content: 'test' },
    { role: 'user', content: '[Ayushi]: good night' },
    { role: 'assistant', content: 'good morning' },
    { role: 'user', content: '[Himanshu]: @elevone weather' }
  ];
  
  const modelsToTry = [
    'meta-llama/llama-3-8b-instruct:free',
    'qwen/qwen-2-7b-instruct:free',
    'mistralai/mistral-7b-instruct:free'
  ];

  for (const model of modelsToTry) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY,
        'HTTP-Referer': 'https://novario-news.vercel.app',
        'X-Title': 'ELEVONE'
      },
      body: JSON.stringify({
        model: model,
        messages: chatMessages
      })
    });
    const data = await response.json();
    console.log('[' + model + '] Status:', response.status);
    if (!response.ok) {
      console.log(JSON.stringify(data));
    }
  }
})();

