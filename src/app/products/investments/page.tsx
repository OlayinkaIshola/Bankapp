export default function InvestmentsPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Investments & Wealth</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Build long-term wealth with expert guidance and diversified options.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Mutual Funds</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>Diversified portfolios</li>
              <li>Professional management</li>
              <li>Low fees</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Fixed Deposits</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>Guaranteed returns</li>
              <li>Flexible tenures</li>
              <li>Safe and secure</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
