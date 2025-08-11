export default function HelpPage() {
  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to the login page and click “Forgot your password?”. Follow the instructions to receive a reset link.' },
    { q: 'How do I transfer money?', a: 'After logging in, go to Transfers and choose Internal, Within Bank, or External transfers.' },
    { q: 'How do I block a lost card?', a: 'Go to Cards in your dashboard and click Block/Unblock. You can also call support anytime.' },
  ];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Help Center / FAQs</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Find quick answers to common questions.
        </p>

        <div className="mt-8 space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">{f.q}</h3>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
