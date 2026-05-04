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
      <main className="mx-auto max-w-4xl w-full px-6 py-16 flex-1">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Legal Documentation</div>
          <h1 className="serif text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">Last Updated: May 4, 2026</p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-relaxed font-serif text-lg">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">1. Our Commitment to Anonymity</h2>
            <p className="mb-4">
              At Novario, our core philosophy is built around unrestricted, anonymous access to global intelligence. Unlike traditional media platforms that mandate user accounts to harvest personal data and browsing habits, we have architected our system to be fundamentally <strong>login-free</strong>.
            </p>
            <p className="mb-4">
              This Privacy Policy explains how we handle the minimal data necessary to operate our Service and your rights regarding your digital footprint. By utilizing Novario, you consent to the data practices described in this document.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">2. Information We Do Not Collect</h2>
            <p className="mb-4">
              Because we do not require registration, we definitively do <strong>not</strong> collect, store, or process:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li>Names, physical addresses, or telephone numbers.</li>
              <li>Passwords, account credentials, or security questions.</li>
              <li>Financial information, credit card numbers, or billing details.</li>
              <li>Persistent behavioral profiles tied to a verified identity.</li>
            </ul>
            <p className="mb-4">
              If you optionally provide your email address exclusively for our daily newsletter subscription, that data is siloed and used strictly for dispatching the briefing, never for cross-site tracking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">3. Third-Party Data Processors and APIs</h2>
            <p className="mb-4">
              Novario relies on authorized third-party APIs (such as news aggregators, weather services, and media databases) to deliver real-time content to your dashboard. When your browser fetches this content:
            </p>
            <p className="mb-4">
              <strong>Technical Requests:</strong> Your device may make direct network requests to these third-party servers to load images or data. These external providers may temporarily log your IP address as part of standard web server operations. However, Novario does not transmit any identifiable user profiles, search histories, or tracking cookies to these API providers. We act purely as a conduit for the data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">4. Cookies and Local Storage</h2>
            <p className="mb-4">
              To provide a fast and customized experience without requiring an account, Novario utilizes localized browser storage mechanisms (such as <code>localStorage</code> and <code>sessionStorage</code>).
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Functional Storage:</strong> We use local storage to remember your theme preferences (e.g., dark mode), recent search history, and cached news articles to reduce load times.</li>
              <li><strong>No Third-Party Trackers:</strong> We do not deploy third-party tracking pixels, cross-site advertising cookies, or behavioral retargeting scripts. The data stored in your browser remains on your device and is not transmitted back to our servers for profiling.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">5. Law Enforcement and Compliance</h2>
            <p className="mb-4">
              Although we collect minimal data, Novario complies with valid, legally binding requests from law enforcement agencies. If compelled by a court order, subpoena, or search warrant, we will disclose whatever limited technical telemetry (such as server access logs) that may exist on our infrastructure at the exact moment the request is processed.
            </p>
            <p className="mb-4">
              Because of our minimal data architecture, we cannot produce data that has not been collected or has already been automatically purged by our systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">6. Children's Privacy</h2>
            <p className="mb-4">
              Novario is a general audience news platform and is not specifically directed at children under the age of 13 (or 16 in certain jurisdictions). We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us so we may promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">7. Your Rights Under GDPR and CCPA</h2>
            <p className="mb-4">
              Depending on your location, you may have specific rights regarding your data under the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA). Because Novario is a login-free platform that does not profile its users, fulfilling data export or deletion requests is technically challenging as we cannot definitively link an anonymous session to a specific human identity.
            </p>
            <p className="mb-4">
              However, you maintain complete control over the data we store by clearing your browser's local storage and cache. Clearing your browser data effectively deletes your entire localized Novario footprint.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">8. Modifications to this Policy</h2>
            <p className="mb-4">
              We reserve the right to update this Privacy Policy at any time to reflect changes in our technical architecture, API partnerships, or legal obligations. We encourage you to review this page periodically. Continued use of the Novario platform after any modifications constitutes your acknowledgment and acceptance of the updated terms.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center">
            If you have any questions or concerns about our privacy practices, please contact our Data Protection Officer via the Contact page.
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
