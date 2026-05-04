import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchWikipediaFallback, type RemoteArticle } from "@/server/newsapi.functions";

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
        <h2 className="serif text-2xl font-bold mb-4 px-4 lg:px-0">Trending People</h2>
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
    <section className="py-6 border-b border-border">
      <h2 className="serif text-2xl font-bold mb-5 px-4 lg:px-0">Trending People</h2>
      <div className="flex gap-5 overflow-x-auto px-4 lg:px-0 scrollbar-hide pb-4">
        {people.map((person) => (
          <Link
            key={person.id}
            to="/news/$slug"
            params={{ slug: person.slug }}
            className="group flex flex-col items-center gap-3 shrink-0 w-24 transition-all hover:-translate-y-1"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-md">
              <img
                src={person.image}
                alt={person.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-xs font-bold text-center leading-tight">
              {person.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
