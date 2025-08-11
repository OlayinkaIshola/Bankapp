'use client';

import { useForm } from 'react-hook-form';

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log('Contact request:', data);
    alert('Thanks for contacting SecureBank! We will get back to you soon.');
    reset();
  };

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Contact Us</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl">
          We're here to help. Send us a message and we'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('name', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('email', { required: true })} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('subject', { required: true })} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('message', { required: true })} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Send Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
