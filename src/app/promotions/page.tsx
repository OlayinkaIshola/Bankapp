export default function PromotionsPage() {
  const promos = [
    { id: 1, title: 'Summer Savings Bonus', desc: 'Earn a $200 bonus when you open a new savings account.' },
    { id: 2, title: '0% APR for 12 months', desc: 'On balance transfers to SecureBank Credit Card.' },
  ];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Promotions & Offers</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {promos.map((p) => (
            <div key={p.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{p.title}</h3>
              <p className="mt-2 text-gray-700">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
