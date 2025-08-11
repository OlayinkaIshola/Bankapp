export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">About SecureBank</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          For over 50 years, SecureBank has helped individuals and businesses achieve their financial goals. 
          We combine innovative technology with personalized service to deliver secure, reliable banking solutions.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              To empower our customers with secure, accessible, and innovative financial services that improve lives.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
            <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-2">
              <li>Integrity & Transparency</li>
              <li>Security & Compliance</li>
              <li>Customer-First Innovation</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Awards</h3>
            <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-2">
              <li>Best Digital Bank 2024</li>
              <li>Top Workplace 2023</li>
              <li>Excellence in Customer Service 2022</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
