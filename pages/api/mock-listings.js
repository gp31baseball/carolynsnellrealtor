export default function handler(req, res) {
  res.status(200).json([
    {
      id: '1',
      address: '123 Oak Meadow Dr',
      city: 'Pearland',
      state: 'TX',
      price: 479900,
      beds: 3,
      baths: 2,
      sqft: 2150,
      image: '/homes/1.jpg',
      images: ['/homes/1.jpg', '/homes/2.jpg'],
      description: 'Charming single-story with spacious kitchen and covered patio.',
    }
  ]);
}
