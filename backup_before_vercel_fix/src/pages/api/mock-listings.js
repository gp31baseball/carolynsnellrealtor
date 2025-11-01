export default function handler(req, res) {
  const listings = [
    {
      id: "1",
      address: "123 Oak Meadow Dr",
      city: "Pearland",
      state: "TX",
      price: 479900,
      image: "/homes/home1.jpg",
    },
    {
      id: "2",
      address: "942 Sunset Ridge Ln",
      city: "Friendswood",
      state: "TX",
      price: 589500,
      image: "/homes/home2.jpg",
    },
    {
      id: "3",
      address: "2218 Lakeview Ct",
      city: "League City",
      state: "TX",
      price: 649000,
      image: "/homes/home3.jpg",
    },
  ];

  res.status(200).json(listings);
}
