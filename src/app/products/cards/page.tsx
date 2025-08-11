export default function CardsPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Credit & Debit Cards</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Choose from a range of cards with rewards, security, and global acceptance.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Cashback Credit Card</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>2% cashback on everyday purchases</li>
              <li>No annual fee</li>
              <li>Zero liability protection</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold">Travel Rewards Card</h3>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-600">
              <li>Earn miles on every purchase</li>
              <li>Airport lounge access</li>
              <li>Global acceptance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
