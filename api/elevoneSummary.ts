// OpenRouter-powered ELEVONE Summary — no extra SDK needed

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!process.env.OPENROUTER_API_KEY && !process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "Neither OPENROUTER_API_KEY nor GROQ_API_KEY is set" });
    }

    const systemInstruction = "You are a quiet observer. Summarize the following chat history between Himanshu and Ayushi (and occasionally ELEVONE) into a concise, emotional, and narrative summary of what they talked about. This summary will be used as long-term memory. Keep it under 150 words.";

    const formattedHistory = messages.map((msg: any) => `[${msg.name}]: ${msg.text}`).join("\n");

    // Try Groq first for lightning-fast summary
    let responseText = "";
    if (process.env.GROQ_API_KEY) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "user", content: `${systemInstruction}\n\nCHAT LOG:\n${formattedHistory}` }
            ]
          })
        });
        const data = await response.json();
        if (response.ok && data.choices?.[0]?.message?.content) {
          responseText = data.choices[0].message.content;
        }
      } catch (e: any) {
        console.error("Groq Summary failed, falling back:", e);
      }
    }

    // Fallback to OpenRouter if Groq failed or key not set
    if (!responseText && process.env.OPENROUTER_API_KEY) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://novario-news.vercel.app",
          "X-Title": "ELEVONE"
        },
        body: JSON.stringify({
          model: "google/gemma-2-9b-it:free",
          messages: [
            { role: "user", content: `${systemInstruction}\n\nCHAT LOG:\n${formattedHistory}` }
          ]
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || "OpenRouter error");
      responseText = data.choices?.[0]?.message?.content || "";
    }

    if (!responseText) {
      throw new Error("Both Groq and OpenRouter failed to generate a summary");
    }

    return res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("ELEVONE Summary API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
