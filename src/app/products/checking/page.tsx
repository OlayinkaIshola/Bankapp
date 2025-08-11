export default function CheckingPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Checking Accounts</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Convenient, everyday banking with no hidden fees and nationwide ATM access.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Everyday Checking</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>No monthly maintenance fee</li>
              <li>Free debit card</li>
              <li>Mobile deposits</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Premium Checking</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>Higher ATM withdrawal limits</li>
              <li>Priority support</li>
              <li>Exclusive offers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
