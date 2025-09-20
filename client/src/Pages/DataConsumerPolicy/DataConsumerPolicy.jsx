import React from "react";

export default function DataConsumerPolicy() {
  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Data Consumer Policy
        </h2>
      </div>

      <div className="prose max-w-none">
        <p>
          <strong>Effective Date:</strong> 23/05/2025
        </p>

        <p className="mt-4">
          At Amar Dokan, we are committed to protecting the privacy and security
          of our users' personal data. This Data Consumer Policy explains how we
          collect, use, store, and share data from individuals who interact with
          our services. By using our website and services, you agree to the
          terms outlined in this policy.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Data we collect:</h3>
        <p>We may collect the following types of data from consumers:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, postal address, and other identifying information submitted
            through forms or account creation.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how users interact
            with our website, such as pages visited, links clicked, and time
            spent on the site.
          </li>
          <li>
            <strong>Device & Technical Data:</strong> IP address, browser type,
            device identifiers, operating system, and cookies.
          </li>
          <li>
            <strong>Transactional Data:</strong> If purchases are made, we
            collect order details, payment status (no credit card data is stored
            on our servers), and delivery information.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          How We Use Your Data
        </h3>
        <p>Your data helps us:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide and improve our services and offerings.</li>
          <li>Personalize user experiences.</li>
          <li>
            Communicate with you regarding services, updates, and promotions
            (only if you opt-in).
          </li>
          <li>Ensure security and prevent fraud.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Data Sharing and Disclosure
        </h3>
        <p>
          We do not sell or rent your personal data to third parties. However,
          we may share your data with:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Service Providers:</strong> Trusted vendors who perform
            services on our behalf (e.g., payment processors, analytics, email
            delivery).
          </li>
          <li>
            <strong>Legal Authorities:</strong> If required by law, regulation,
            or legal process.
          </li>
        </ul>
        <p>
          All third-party partners are contractually obligated to protect your
          data and use it only for the specified purpose.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Data Security</h3>
        <p>
          We use industry-standard security protocols, including encryption,
          secure servers, and regular audits, to protect your data from
          unauthorized access, loss, or misuse.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Your Rights</h3>
        <p>
          Depending on your location, you may have the following rights
          regarding your data:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Access the data we hold about you.</li>
          <li>Request correction or deletion of your personal data.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Withdraw consent for data processing (where applicable).</li>
          <li>Lodge a complaint with a data protection authority.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at
          contact@amardokan.com.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Cookies and Tracking
        </h3>
        <p>
          Our website uses cookies to enhance user experience and gather
          analytics. You can manage your cookie preferences in your browser
          settings. For more details, please refer to our Cookie Policy.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Data Retention</h3>
        <p>
          We retain personal data only for as long as necessary to fulfill the
          purposes for which it was collected, including legal, accounting, or
          reporting obligations.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Changes to This Policy
        </h3>
        <p>
          We may update this policy from time to time. Changes will be posted on
          this page with a revised effective date. We encourage users to review
          this policy periodically.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Contact Us</h3>
        <p>
          If you have any questions or concerns about this Data Consumer Policy,
          please contact us at:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Amar Dokan</strong>
          </li>
          <li>
            <strong>Email:</strong> contact@amardokan.com
          </li>
        </ul>
      </div>
    </div>
  );
}
