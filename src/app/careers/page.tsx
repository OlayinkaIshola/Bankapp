export default function CareersPage() {
  const jobs = [
    { id: 1, title: 'Frontend Engineer', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Product Manager', location: 'New York, NY', type: 'Full-time' },
    { id: 3, title: 'Customer Success Specialist', location: 'Remote', type: 'Contract' },
  ];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Careers</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          Join a team that's transforming banking for the better.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
