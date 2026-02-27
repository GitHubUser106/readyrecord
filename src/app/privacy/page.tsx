import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-12">
        <h1 className="mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-lg leading-relaxed text-foreground">
          <div className="bg-sage-50 border border-sage-100 rounded-xl p-6 text-xl font-semibold text-sage-700">
            Your data never leaves your device. Period.
          </div>

          <h2 className="mt-8 mb-3">What We Collect</h2>
          <p>
            <strong>Nothing.</strong> ReadyRecord does not collect, store,
            transmit, or have access to any of the information you enter.
          </p>

          <h2 className="mt-8 mb-3">Where Your Data Is Stored</h2>
          <p>
            All information you enter is stored in your web browser&apos;s
            local storage (localStorage). This is a standard browser feature
            that keeps data on your device only. It is not sent to any server,
            cloud service, or third party.
          </p>

          <h2 className="mt-8 mb-3">Cookies & Tracking</h2>
          <p>
            ReadyRecord uses <strong>zero cookies</strong>, zero tracking
            pixels, zero analytics scripts, and zero third-party services. We
            don&apos;t use Google Analytics, Facebook Pixel, or any other
            tracking technology.
          </p>
          <p>We literally don&apos;t know you&apos;re here.</p>

          <h2 className="mt-8 mb-3">PDF Generation</h2>
          <p>
            When you download a PDF, it is generated entirely within your
            browser using JavaScript. No data is sent to a server to create
            the PDF.
          </p>

          <h2 className="mt-8 mb-3">Clearing Your Data</h2>
          <p>
            You can delete all your data at any time using the &ldquo;Clear
            All Data&rdquo; button in the form. You can also clear it by
            clearing your browser&apos;s site data for this website.
          </p>

          <h2 className="mt-8 mb-3">Third-Party Services</h2>
          <p>
            ReadyRecord does not integrate with any third-party services. We
            do not connect to banks, government systems, or any external APIs.
          </p>

          <h2 className="mt-8 mb-3">Security Recommendations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use a private/incognito browser window if you&apos;re on a
              shared computer
            </li>
            <li>
              Download and save your PDF to a secure location (encrypted drive,
              safe, etc.)
            </li>
            <li>
              Clear your browser data after you&apos;ve downloaded your PDF if
              you&apos;re concerned about someone accessing your information
            </li>
            <li>
              If using the password-protected PDF option, choose a strong
              password and share it with your family separately
            </li>
          </ul>

          <h2 className="mt-8 mb-3">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at{" "}
            <a
              href="mailto:privacy@readyrecord.ca"
              className="text-primary underline"
            >
              privacy@readyrecord.ca
            </a>
            .
          </p>

          <p className="text-muted-foreground text-base mt-10">
            Last updated: February 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
