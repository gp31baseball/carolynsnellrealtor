import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchListings } from "@/lib/har";

// ✅ Type definition for a listing
interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  image?: string;
}

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchListings().then((data) => {
      if (Array.isArray(data)) setListings(data as Listing[]);
    });
  }, []);

  return (
    <section className="min-h-screen bg-offwhite py-20 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-navy tracking-tight">
          Featured Listings
        </h1>

        {listings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Loading listings...
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((home) => (
              <Link href={`/listings/${home.id}`} key={home.id}>
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
                  <img
                    src={home.image || "/homes/1.jpg"}
                    alt={home.address}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-navy mb-1">
                      {home.address}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {home.city}, {home.state}
                    </p>
                    <p className="text-gold font-bold mt-2 text-lg">
                      ${home.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
