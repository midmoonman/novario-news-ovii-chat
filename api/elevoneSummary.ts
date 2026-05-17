import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemInstruction = "You are a quiet observer. Summarize the following chat history between Himanshu and Ayushi (and occasionally ELEVONE) into a concise, emotional, and narrative summary of what they talked about. This summary will be used as long-term memory. Keep it under 150 words.";

    const formattedHistory = messages.map((msg: any) => `[${msg.name}]: ${msg.text}`).join("\n");

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nCHAT LOG:\n${formattedHistory}` }] }],
    });

    const responseText = result.response.text();

    return res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("ELEVONE Summary API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
