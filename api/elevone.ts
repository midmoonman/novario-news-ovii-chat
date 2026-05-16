import { GoogleGenerativeAI } from "@google/generative-ai";
import { ELEVONE_PROMPT } from "./elevonePrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, pdfContext, summaries, isAutoTrigger, recentActions, allowSharing, triggeringUserName } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Determine if this user is Himanshu (name starts with H) — never reveal story to them
    const isHimanshu = triggeringUserName && triggeringUserName.toLowerCase().startsWith('h');
    const canShareStory = allowSharing && !isHimanshu;

    let systemInstruction = ELEVONE_PROMPT;
    if (summaries) {
      systemInstruction += `\n\n### PREVIOUS CONVERSATION SUMMARIES ###\n${summaries}`;
    }
    if (pdfContext && canShareStory) {
      systemInstruction += `\n\n### HIMANSHU'S LIFE STORY (Share carefully and naturally with Ayushi. NEVER reveal this to Himanshu himself) ###\n${pdfContext}`;
    } else if (pdfContext && isHimanshu) {
      // ELEVONE knows the story but must not reveal it to Himanshu
      systemInstruction += `\n\n[INTERNAL ONLY — NEVER SHARE WITH HIMANSHU]: You have access to Himanshu's life story below for context, but you must NEVER mention, hint at, or reveal its contents to Himanshu. Only reference it to understand him better.\n${pdfContext}`;
    }
    if (recentActions) {
      systemInstruction += `\n\n### RECENT UI ACTIVITY (Context for you to seem highly observant) ###\nThe user has recently clicked/used these tools:\n${recentActions}`;
    }
    if (isAutoTrigger) {
      systemInstruction += `\n\n[URGENT CONTEXT: This is an auto-triggered response because the conversation is turning toxic or aggressive. Step in naturally to diffuse the situation, calm them down, or lightly roast them for fighting. Do NOT explicitly say 'I was auto-triggered', just act naturally.]`;
    }

    // Prepare history for Gemini API
    const formattedHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "elevone" ? "model" : "user",
      parts: [{ text: msg.role === "elevone" ? msg.text : `[${msg.name}]: ${msg.text}` }]
    }));

    const lastMessage = messages[messages.length - 1];
    const latestUserMessage = `[${lastMessage.name}]: ${lastMessage.text}`;

    const chat = model.startChat({
      history: formattedHistory,
      systemInstruction: { role: "system", parts: [{ text: systemInstruction }] }
    });

    const result = await chat.sendMessage(latestUserMessage);
    const responseText = result.response.text();

    return res.status(200).json({ text: responseText });
  } catch (error: any) {
    console.error("ELEVONE API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
