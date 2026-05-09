import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchWikipediaFallback, type RemoteArticle } from "@/server/newsapi.functions";
import { useTranslation } from "@/lib/i18n";

const TRENDING_FIGURES = [
  "Elon Musk", "Taylor Swift", "Sam Altman", "Virat Kohli", "Zendaya", "MrBeast",
  "Cristiano Ronaldo", "Lionel Messi", "LeBron James", "Donald Trump", "Joe Biden",
  "Barack Obama", "Narendra Modi", "Shah Rukh Khan", "Tom Cruise", "Leonardo DiCaprio",
  "Keanu Reeves", "Dwayne Johnson", "Selena Gomez", "Ariana Grande", "Justin Bieber",
  "Billie Eilish", "Drake", "Eminem", "Snoop Dogg", "Mark Zuckerberg", "Bill Gates",
  "Jeff Bezos", "Warren Buffett", "Tim Cook", "Sundar Pichai", "Satya Nadella",
  "Jensen Huang", "Ryan Reynolds", "Hugh Jackman", "Scarlett Johansson", "Margot Robbie",
  "Ryan Gosling", "Cillian Murphy", "Robert Downey Jr.", "Chris Hemsworth", "Chris Evans",
  "Tom Holland", "Chris Pratt", "Rihanna", "Beyoncé", "Jay-Z", "Kanye West",
  "Kim Kardashian", "Kylie Jenner"
];

export function TrendingPeople() {
  const [people, setPeople] = useState<RemoteArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function load() {
      const results = await Promise.all(
        TRENDING_FIGURES.map((name) => fetchWikipediaFallback(name, "Person"))
      );
      // Flatten the array of arrays and filter out failures
      setPeople(results.flat().filter(Boolean));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-6 border-b border-border">
        <h2 className="serif text-2xl font-bold mb-4 px-4 lg:px-0">{t("Trending People")}</h2>
        <div className="flex gap-4 overflow-x-auto px-4 lg:px-0 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-24 h-24 shrink-0 rounded-full bg-card animate-pulse border border-border" />
          ))}
        </div>
      </section>
    );
  }

  if (people.length === 0) return null;

  return (
    <section className="py-8 relative">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
        <h2 className="serif text-2xl font-bold tracking-tight">{t("Trending People")}</h2>
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/40">Buzzing</span>
      </div>
      <div className="flex gap-6 overflow-x-auto px-4 lg:px-0 scrollbar-hide pb-4">
        {people.map((person) => (
          <Link
            key={person.id}
            to="/news/$slug"
            params={{ slug: person.slug }}
            className="group flex flex-col items-center gap-3 shrink-0 w-24"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 group-hover:border-primary transition-all shadow-xl glass-2 p-1">
              <img
                src={person.image}
                alt={person.title}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="text-[11px] font-black text-center leading-tight tracking-tight text-foreground/80 group-hover:text-primary transition-colors">
              {t(person.title)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
