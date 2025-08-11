export default function SecurityPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Security Information</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Your security is our priority. Learn how we protect you and how to stay safe online.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Fraud Alerts</h3>
            <p className="mt-2 text-gray-600">Latest updates on fraud attempts targeting customers.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Safe Banking Tips</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
              <li>Enable two-factor authentication (2FA)</li>
              <li>Never share your OTP or password</li>
              <li>Verify URLs before logging in</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
