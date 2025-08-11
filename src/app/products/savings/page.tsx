export default function SavingsPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Savings Accounts</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Grow your savings with competitive interest rates and no minimum balance.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">High-Yield Savings</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>2.5% APY</li>
              <li>No minimum balance</li>
              <li>FDIC insured</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Money Market</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>Tiered interest rates</li>
              <li>Check writing privileges</li>
              <li>Online transfers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
