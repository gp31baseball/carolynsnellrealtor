import axios from 'axios';

export async function fetchListings() {
  try {
    const response = await axios.get('/api/mock-listings');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return [];
  }
}

export async function fetchPropertyById(id: string) {
  try {
    const response = await axios.get('/api/mock-listings');
    return response.data.find((home: any) => home.id === id);
  } catch (error) {
    console.error('Failed to fetch property details:', error);
    return null;
  }
}
