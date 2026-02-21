import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mohammed (Mr X) Studio',
  description: 'Privacy policy for Mohammed (Mr X) Studio contact form and website',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>

        <div className="space-y-6 text-gray-text leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Introduction</h2>
            <p>
              Mohammed Studio ("we", "us", "our", or "Company") operates this website.
              This page informs you of our policies regarding the collection, use, and
              disclosure of personal data when you use our website and the choices you
              have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Information Collection & Use
            </h2>
            <p>
              We collect limited information through our contact form to respond to your
              project inquiries. The information we collect includes:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Email address (required)</li>
              <li>Project details / message content (required)</li>
              <li>User agent information (browser/device type)</li>
              <li>IP address hash (for spam prevention only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Use of Data</h2>
            <p>The data we collect is used exclusively to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Respond to your project inquiries</li>
              <li>Contact you about your submission</li>
              <li>Prevent spam and abuse (via rate limiting and honeypot field)</li>
              <li>Improve our contact form experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Data Retention</h2>
            <p>
              Submissions are retained for 60 days to allow us to respond to your inquiry.
              After 60 days, your personal data is automatically deleted from our
              database. If you do not wish your data to be retained, please contact us at
              the email address provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Data Protection</h2>
            <p>
              Your data security is important to us. We use industry-standard security
              measures to protect your personal information during transmission and
              storage. However, no method of transmission over the Internet is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your
              personal data at any time. To exercise these rights, please contact us using
              the information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Third-Party Services</h2>
            <p>We use the following third-party services to operate this website:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>
                <strong>Resend</strong> - Email delivery service
              </li>
              <li>
                <strong>PostgreSQL / Supabase</strong> - Data storage
              </li>
              <li>
                <strong>Vercel</strong> - Website hosting
              </li>
              <li>
                <strong>Upstash Redis</strong> - Rate limiting (optional)
              </li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We recommend reviewing them
              independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Cookies</h2>
            <p>
              Our website does not use cookies for tracking or analytics. We only use
              essential cookies if necessary for website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-3">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:contact@example.com"
                className="text-cyan-primary hover:opacity-80"
              >
                contact@example.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by updating the "Last updated" date below.
            </p>
            <p className="mt-3 text-sm">
              <strong>Last updated:</strong> February 2026
            </p>
          </section>

          <div className="pt-8 border-t border-dark-border">
            <Link
              href="/"
              className="text-cyan-primary hover:opacity-80 transition-opacity"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
