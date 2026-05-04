import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-6 py-16 flex-1">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">Legal Documentation</div>
          <h1 className="serif text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">Last Updated: May 4, 2026</p>
        </div>

        <div className="space-y-10 text-foreground/80 leading-relaxed font-serif text-lg">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">1. Introduction and Acceptance of Terms</h2>
            <p className="mb-4">
              Welcome to Novario ("Novario", "we", "us", or "our"). Novario provides an advanced, premium, and login-free digital news aggregation platform (the "Service"). By accessing or using our Service in any manner, including but not limited to visiting or browsing the Novario website, you expressly agree to be bound by these Terms of Service (the "Terms").
            </p>
            <p className="mb-4">
              These Terms govern your access to and use of all Novario services. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. Our platform is designed with a frictionless philosophy: we believe in providing world-class information access without the barrier of account creation, paywalls, or mandatory subscriptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">2. The Novario Experience & Login-Free Philosophy</h2>
            <p className="mb-4">
              Novario is committed to offering a premium, unimpeded reading experience. Unlike other platforms that mandate user registration, data harvesting, or restrictive paywalls, Novario is proudly a <strong>login-free</strong> environment.
            </p>
            <p className="mb-4">
              Our core offerings include:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Zero Friction Access:</strong> Immediate access to breaking news and curated stories without the need for an account.</li>
              <li><strong>Aggregated Intelligence:</strong> A unified, seamless reading interface that aggregates global intelligence into a single, beautiful dashboard.</li>
            </ul>
            <p className="mb-4">
              While we pride ourselves on this frictionless experience, your use of the Service must still comply with all applicable local, national, and international laws, rules, and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">3. Content Aggregation and Data Retrieval</h2>
            <p className="mb-4">
              To provide you with the most up-to-date and comprehensive news coverage, Novario operates as a sophisticated content aggregator. We utilize authorized third-party Application Programming Interfaces (APIs), RSS feeds, and standard web data retrieval methodologies to curate and display public content, headlines, snippets, and media.
            </p>
            <p className="mb-4">
              By using our Service, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li><strong>Third-Party Ownership:</strong> The news articles, images, trademarks, and media displayed on Novario are the intellectual property of their respective original publishers and copyright holders. Novario does not claim ownership over the raw data or journalistic content fetched via these external APIs.</li>
              <li><strong>Fair Use and Aggregation:</strong> Our display of content snippets and thumbnails is strictly for the purpose of aggregation, commentary, and directing users to the original source, in accordance with standard internet fair use principles.</li>
              <li><strong>API Continuity:</strong> Because our service relies on external data sources (including but not limited to search engines, media databases, and news wires), the availability of specific content is subject to the continuous operation of these third-party APIs. We are not liable for any temporary or permanent disruptions in content availability caused by changes to third-party API policies or rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">4. Intellectual Property Rights</h2>
            <p className="mb-4">
              Excluding the aggregated third-party content described in Section 3, the Novario platform itself—including its original design, source code, user interface, proprietary algorithms, and logo—is the exclusive property of Novario Media Pvt. Ltd. and its licensors.
            </p>
            <p className="mb-4">
              You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Service strictly for your personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the proprietary material on our Service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">5. User Conduct and Acceptable Use</h2>
            <p className="mb-4">
              While Novario does not require user accounts, your access to the platform is contingent upon your compliance with our acceptable use policy. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-8 space-y-2 mb-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Novario, a Novario employee, another user, or any other person or entity.</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Novario or users of the Service.</li>
              <li>To attempt to bypass, disable, or interfere with our API rate-limiting mechanisms or reverse-engineer any proprietary platform protocols.</li>
            </ul>
            <p className="mb-4">
              We reserve the right to block IP addresses or terminate access to our platform for any user who violates these conduct guidelines, without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">6. Disclaimer of Warranties</h2>
            <p className="mb-4">
              YOUR USE OF THE SERVICE, ITS CONTENT, AND ANY ITEMS OBTAINED THROUGH THE SERVICE IS AT YOUR OWN RISK. THE SERVICE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p className="mb-4">
              NEITHER NOVARIO NOR ANY PERSON ASSOCIATED WITH NOVARIO MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICE OR THE THIRD-PARTY CONTENT AGGREGATED THEREIN.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">7. Limitation of Liability</h2>
            <p className="mb-4">
              IN NO EVENT WILL NOVARIO, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SERVICE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">8. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless Novario, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">9. Governing Law and Jurisdiction</h2>
            <p className="mb-4">
              All matters relating to the Service and these Terms, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the jurisdiction in which Novario operates, without giving effect to any choice or conflict of law provision or rule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans tracking-tight">10. Changes to the Terms of Service</h2>
            <p className="mb-4">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center">
            If you have any questions regarding these Terms, please contact our legal department via the Contact page.
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
