export default function RatesPage() {
  const rates = [
    { name: 'Savings (APY)', value: '2.50%' },
    { name: 'Money Market (APY)', value: '3.10%' },
    { name: 'CD 12-Month (APY)', value: '4.20%' },
    { name: 'Home Loan (APR)', value: '6.10%' },
    { name: 'Personal Loan (APR)', value: '9.50%' },
    { name: 'Credit Card (APR)', value: '15.99%' },
  ];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Rates & Fees</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          We believe in transparency. Here are our current rates and common fees.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rates.map((r) => (
                <tr key={r.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Rates are indicative and subject to change. APR/APY may vary based on credit profile and market conditions.</p>
        </div>
      </section>
    </div>
  );
}
