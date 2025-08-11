export default function BlogPage() {
  const posts = [
    { id: 1, title: '5 Tips to Boost Your Savings', date: '2024-07-10' },
    { id: 2, title: 'Understanding Credit Scores', date: '2024-06-02' },
  ];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Financial Tips</h1>
        <ul className="mt-8 space-y-4">
          {posts.map((p) => (
            <li key={p.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
              <p className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
