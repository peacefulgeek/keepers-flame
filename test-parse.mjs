#!/usr/bin/env node

const DEEPSEEK_API_KEY = 'sk-82bdad0a1fd34987b73030504ae67080';

async function main() {
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v4-pro',
      messages: [
        { role: 'system', content: 'You write articles. Return valid JSON only. No markdown code fences.' },
        { role: 'user', content: 'Write a 200-word test article. Return JSON: { "title": "Test", "excerpt": "...", "body": "<p>...</p>", "faqs": [] }' },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });
  const data = await response.json();
  const msg = data.choices[0].message;
  const text = msg.content;
  
  console.log('Has reasoning_content:', !!msg.reasoning_content);
  console.log('Content length:', text.length);
  console.log('First 300 chars:', text.slice(0, 300));
  console.log('Last 200 chars:', text.slice(-200));
  
  // Try parsing: strip markdown fences if present
  let cleaned = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
  
  try {
    const parsed = JSON.parse(cleaned);
    console.log('DIRECT PARSE OK! Title:', parsed.title);
    console.log('Body length:', parsed.body.length);
    return;
  } catch(e) {
    console.log('Direct parse failed:', e.message);
  }
  
  // Try regex extraction
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      console.log('REGEX PARSE OK! Title:', parsed.title);
      console.log('Body length:', parsed.body.length);
    } catch(e2) {
      console.log('Regex parse also failed:', e2.message);
      console.log('Full response saved to test-response.txt');
      const fs = await import('fs');
      fs.default.writeFileSync('test-response.txt', text);
    }
  } else {
    console.log('No JSON object found in response');
    const fs = await import('fs');
    fs.default.writeFileSync('test-response.txt', text);
  }
}

main().catch(console.error);
