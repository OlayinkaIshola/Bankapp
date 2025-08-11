export default function EventsPage() {
  const events = [
    { id: 1, title: 'Webinar: First-Time Homebuyer Basics', date: '2024-09-15' },
    { id: 2, title: 'Workshop: Budgeting & Saving', date: '2024-10-05' },
  ];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Events & Webinars</h1>
        <ul className="mt-8 space-y-4">
          {events.map((e) => (
            <li key={e.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900">{e.title}</h3>
              <p className="text-sm text-gray-500">{new Date(e.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
