import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Terms and Conditions
        </h2>
      </div>

      <div className="prose max-w-none">
        <p>
          <strong>Effective Date:</strong> 23/05/2025
        </p>
        <p>
          <strong>Business Name:</strong> Amar Dokan
        </p>

        <p className="mt-4">
          Welcome to Amar Dokan! These Terms and Conditions ("Terms") govern your
          use of our website, online ordering system, and any purchases made
          through our digital platform. By accessing or using our website, you
          agree to be bound by these Terms.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">General Information</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Amar Dokan is a dessert shop based in Barking, offering a range of
            sweet treats for online ordering and in-store collection/delivery.
          </li>
          <li>
            These Terms apply to all users of the website, including browsers,
            customers, and contributors of content.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Online Orders</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            All online orders are final and non-refundable. Please double-check
            your order before confirming payment.
          </li>
          <li>
            If there is an issue with your order (e.g., wrong item, missing
            item), please contact us immediately upon receipt so we can resolve
            the issue.
          </li>
          <li>
            We do not accept returns or exchanges for food items due to hygiene
            and safety concerns.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Payments</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Payments must be made in full at the time of order using the
            available online payment methods.
          </li>
          <li>
            We do not store any payment information. All payments are securely
            processed through a third-party provider.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Order Availability</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Products and prices are subject to change without notice.</li>
          <li>
            Orders are subject to availability. In the unlikely event a product
            becomes unavailable after your order is placed, we will contact you
            to offer an alternative or a refund for the unavailable item only.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Allergies and Dietary Information
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            While we take great care in preparing your desserts, please be aware
            that our kitchen handles allergens including nuts, dairy, gluten,
            and soy.
          </li>
          <li>
            We do not guarantee that any product is completely allergen-free.
            Please contact us before ordering if you have any specific allergy
            concerns.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Collection and Delivery
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Collection times and delivery options are shown during checkout.
            Please ensure the contact details and delivery address provided are
            correct.
          </li>
          <li>
            If you are not available to receive your order at the agreed time,
            we are not responsible for delays or missed deliveries.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Intellectual Property
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            All content on this website – including images, logos, designs, and
            written content – is the property of Amar Dokan or licensed to us.
            You may not use, reproduce, or distribute our content without
            written permission.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Website Use</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            You agree not to misuse the website for fraudulent or illegal
            activities.
          </li>
          <li>
            We reserve the right to refuse service or access to our website to
            anyone, at any time, for any reason.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Limitation of Liability
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            To the fullest extent permitted by law, Amar Dokan shall not be
            liable for any indirect, incidental, or consequential damages
            arising from your use of the website or ordering system.
          </li>
        </ul>
      </div>
    </div>
  );
}
