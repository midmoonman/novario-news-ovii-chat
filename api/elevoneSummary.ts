// OpenRouter-powered ELEVONE Summary — no extra SDK needed

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY is not set" });
    }

    const systemInstruction = "You are a quiet observer. Summarize the following chat history between Himanshu and Ayushi (and occasionally ELEVONE) into a concise, emotional, and narrative summary of what they talked about. This summary will be used as long-term memory. Keep it under 150 words.";

    const formattedHistory = messages.map((msg: any) => `[${msg.name}]: ${msg.text}`).join("\n");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://novario-news.vercel.app",
        "X-Title": "ELEVONE"
      },
      body: JSON.stringify({
        model: "minimax/minimax-m2.5:free",
        messages: [
          { role: "user", content: `${systemInstruction}\n\nCHAT LOG:\n${formattedHistory}` }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || "OpenRouter error");
    const responseText = data.choices?.[0]?.message?.content || "";

    return res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("ELEVONE Summary API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
