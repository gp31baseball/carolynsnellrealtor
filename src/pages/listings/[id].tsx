import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchPropertyById } from '@/lib/har';
import axios from 'axios';

// ✅ Define property interface matching your mock data
interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description?: string;
  image?: string;
  images?: string[];
}

// ✅ Define contact form input type
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPropertyById(id).then(setProperty);
    }
  }, [id]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', { ...data, property: property?.address });
      alert('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message.');
    }
  };

  if (!property)
    return <p className="text-center py-20 text-gray-500">Loading property details...</p>;

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{property.address}</h1>
      <p className="text-lg text-gray-600 mb-6">
        {property.city}, {property.state}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Images */}
        <div className="space-y-4">
          {(property.images || [property.image]).map((img, i) => (
            <img
              key={i}
              src={img || '/placeholder.jpg'}
              alt={`Property image ${i + 1}`}
              className="rounded-xl w-full object-cover shadow-md"
            />
          ))}
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-2xl font-bold text-[#C7A93A] mb-4">
            ${property.price.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-2"><strong>Beds:</strong> {property.beds}</p>
          <p className="text-gray-700 mb-2"><strong>Baths:</strong> {property.baths}</p>
          <p className="text-gray-700 mb-2"><strong>Sq Ft:</strong> {property.sqft}</p>
          <p className="text-gray-700 mt-6">
            {property.description || 'Beautiful home with open layout and modern finishes.'}
          </p>
        </div>
      </div>

      {/* Google Map */}
      <div className="rounded-2xl overflow-hidden mb-12">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            `${property.address}, ${property.city}, ${property.state}`
          )}&z=14&output=embed`}
          className="w-full h-96 border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="bg-[#0A2351] text-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#FDB827]">
          Contact Carolyn About This Property
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            placeholder="Your Name"
            className="w-full p-3 rounded-md text-gray-900"
          />
          <input
            {...register('email', { required: true })}
            placeholder="Your Email"
            type="email"
            className="w-full p-3 rounded-md text-gray-900"
          />
          <textarea
            {...register('message', { required: true })}
            placeholder="Message..."
            rows={4}
            className="w-full p-3 rounded-md text-gray-900"
          />
          <button
            type="submit"
            className="bg-[#FDB827] hover:bg-[#e5a81f] text-[#0A2351] font-semibold px-6 py-3 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
