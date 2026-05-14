import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-6 py-16 flex-1 relative">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Privacy Manifest</div>
          <h1 className="serif text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">Last Updated: May 12, 2026</p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-relaxed font-serif text-lg">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">1. The Novario Privacy Commitment</h2>
            <p className="mb-4">
              At Novario, we believe that your reading habits are your own business. Our platform is built on a <strong>Login-Free</strong> philosophy. We do not require you to create an account, provide an email address, or link your social media profiles to stay informed.
            </p>
            <p className="mb-4">
              This policy outlines how Novario News ("Novario", "we", or "our") handles information when you interact with our news aggregation service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">2. Information We Do NOT Collect</h2>
            <p className="mb-4">
              Because we value true digital anonymity for our readers, we avoid the intrusive data collection practices common in traditional media. Specifically:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>No Personal Identity:</strong> We do not collect your name, physical address, or phone number.</li>
              <li><strong>No Biometric Data:</strong> We do not access your camera, microphone, or biometric sensors for news reading purposes.</li>
              <li><strong>No Reading Archives:</strong> Since there are no user accounts, we do not maintain a permanent archive of your personal reading history on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">3. Technical Data and Performance</h2>
            <p className="mb-4">
              To ensure Novario remains fast and responsive across all devices, we process minimal technical data:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Ephemeral Session Data:</strong> We may use local storage or temporary cookies to remember your interface preferences (such as Dark Mode or Language) during your current session.</li>
              <li><strong>Hardware Detection:</strong> Our 'Foreman Shield' protocol detects basic device capabilities (CPU/GPU load) to dynamically adjust visual effects.</li>
              <li><strong>Aggregate Analytics:</strong> We track overall traffic patterns (e.g., total views on a specific news category) to improve our content curation, but this data is never linked to an individual reader.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">4. Third-Party Media and APIs</h2>
            <p className="mb-4">
              Novario aggregates news from global sources via public APIs. When you click on an article, you are often interacting with content hosted by the original publisher.
            </p>
            <p className="mb-4">
              Please be aware that once you leave the Novario interface to visit an external news source, that publisher's own privacy policy and data collection practices will apply. We encourage you to review the policies of the news organizations you frequent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">5. Data Retention Philosophy</h2>
            <p className="mb-4">
              Our data retention is strictly limited. We operate on a 'Need-to-Know' basis. Any technical logs generated for security or performance troubleshooting are automatically purged after a short window. We believe in an internet where your data shouldn't follow you forever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">6. Changes to this Manifest</h2>
            <p className="mb-4">
              As we implement new technologies to further protect reader privacy, this manifest may be updated. We will notify you of any changes by updating the "Last Updated" date at the top of this page.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center italic">
            Novario News: Information without tracking. Intelligence without a paper trail.
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
