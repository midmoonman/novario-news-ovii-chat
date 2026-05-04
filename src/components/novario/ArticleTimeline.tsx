import React from "react";
import { Calendar, Briefcase, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Career milestone keywords that indicate a major life/career event
const MILESTONE_KEYWORDS = [
  "joined", "founded", "co-founded", "started", "left", "resigned", "appointed",
  "became CEO", "became president", "launched", "established", "acquired",
  "merged", "partnered", "signed", "released", "debuted", "retired", "won",
  "received", "awarded", "graduated", "enrolled"
];

// Company/org patterns — capitalized proper nouns after milestone keywords
const COMPANY_REGEX = /(?:joined|worked at|worked for|co-founded|founded|left|CEO of|president of|head of|signed with|acquired by)\s+([A-Z][a-zA-Z0-9.&' -]{2,30})/;

export function ArticleTimeline({ paragraphs }: { paragraphs: string[] }) {

  const isMilestoneParagraph = (text: string): boolean => {
    const lower = text.toLowerCase();
    return MILESTONE_KEYWORDS.some(kw => lower.includes(kw));
  };

  const parseParagraph = (text: string, index: number) => {
    const trimmed = text.trim();
    const yearMatch = trimmed.match(/\b(19\d{2}|20\d{2})\b/);
    const companyMatch = trimmed.match(COMPANY_REGEX);
    const isMilestone = isMilestoneParagraph(trimmed);
    const showBento = isMilestone && (!!yearMatch || !!companyMatch);

    // Detect Wikipedia section headers like "Breakthrough (2019–2023)" or "Early life" or "Career"
    // Heuristic: short (< 80 chars), no sentence-ending punctuation, possibly has (YYYY–YYYY)
    const isSectionHeader =
      trimmed.length < 80 &&
      !trimmed.endsWith(".") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(";") &&
      index > 0 &&
      /^[A-Z]/.test(trimmed);

    // First paragraph: drop-cap intro
    if (index === 0) {
      return (
        <p key={index} className="mb-10 leading-[1.9] text-foreground/90 md:text-xl font-serif text-balance first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:-mt-2 first-letter:leading-none first-letter:text-primary">
          {trimmed}
        </p>
      );
    }

    // Beautiful Section Header
    if (isSectionHeader) {
      // Extract year range if present: e.g. "(2019–2023)"
      const yearRange = trimmed.match(/\((\d{4}[–\-–]\d{4}|\d{4}[–\-–]present)\)/);
      const headingText = trimmed.replace(/\(.*?\)/, "").trim();
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 my-10"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
          <div className="flex flex-col items-center text-center shrink-0">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(135deg, #f9a825, #e65c00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {headingText}
            </h2>
            {yearRange && (
              <span className="mt-1 px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-widest border border-primary/20">
                {yearRange[1]}
              </span>
            )}
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-primary/60 via-primary/20 to-transparent" />
        </motion.div>
      );
    }

    // Normal paragraph (no milestone)
    if (!showBento) {
      return (
        <p key={index} className="mb-8 leading-[1.9] text-foreground/80 md:text-xl font-serif tracking-wide text-balance">
          {trimmed}
        </p>
      );
    }

    // Bento Box — only for genuine milestones
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="my-12 group"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-white/5 shadow-2xl p-8 md:p-12 hover:border-primary/30 transition-all duration-500">

          {/* Ambient glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/40 transition-colors duration-700 pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px] group-hover:bg-gold/30 transition-colors duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8 border-b border-white/10 pb-6">

              {yearMatch && (
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Year
                  </span>
                  <span
                    className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      background: "linear-gradient(135deg, #f9a825, #e65c00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {yearMatch[0]}
                  </span>
                </div>
              )}

              {companyMatch && (
                <div className="md:ml-auto flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-xl group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Involvement</div>
                    <div className="text-lg font-black text-foreground">{companyMatch[1].trim()}</div>
                  </div>
                </div>
              )}

              {!yearMatch && isMilestone && (
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Career Milestone
                </span>
              )}
            </div>

            <p className="leading-[1.9] text-foreground/90 md:text-xl font-serif text-balance">
              {text}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="py-4">
      {paragraphs.map((p, i) => parseParagraph(p, i))}
    </div>
  );
}

