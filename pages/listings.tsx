import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchListings } from '@/lib/har';

export default function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings().then(setListings);
  }, []);

  return (
    <section className='py-20 px-6 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-center text-gray-800'>
        Featured Listings
      </h1>
      {listings.length === 0 ? (
        <p className='text-center text-gray-500'>Loading listings...</p>
      ) : (
        <div className='grid md:grid-cols-3 gap-8'>
          {listings.map((home) => (
            <Link href={'/listings/' + home.id} key={home.id}>
              <div className='bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform'>
                <img src={home.image || '/placeholder.jpg'} alt={home.address} className='w-full h-56 object-cover' />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-900'>{home.address}</h2>
                  <p className='text-gray-600'>{home.city}, {home.state}</p>
                  <p className='text-[#C7A93A] font-bold mt-2'>\</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
