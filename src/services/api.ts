// API configuration - Keys are loaded from environment variables
// const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const transitApiKey = import.meta.env.VITE_TRANSIT_API_KEY;
// const metroApiKey = import.meta.env.VITE_BANGALORE_METRO_API_KEY;
// const bmtcApiKey = import.meta.env.VITE_BMTC_BUS_API_KEY;
// const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;

// Mock data for buses
export const mockBuses = [
  {
    id: 'BUS001',
    routeNumber: '1',
    routeName: 'Meghagalli - Indiranagar',
    currentLocation: { lat: 13.3352, lng: 74.7421 },
    nextStop: 'Silk Board Junction',
    arrivalTime: '5 mins',
    occupancy: '65%',
    status: 'On Time',
  },
  {
    id: 'BUS002',
    routeNumber: '2A',
    routeName: 'Vidhana Soudha - Mahadevapura',
    currentLocation: { lat: 13.3578, lng: 74.7266 },
    nextStop: 'Cubbon Park',
    arrivalTime: '8 mins',
    occupancy: '45%',
    status: 'On Time',
  },
  {
    id: 'BUS003',
    routeNumber: '23',
    routeName: 'Yeshwanthpur - Whitefield',
    currentLocation: { lat: 13.3456, lng: 74.5523 },
    nextStop: 'Manyata Tech Park',
    arrivalTime: '12 mins',
    occupancy: '80%',
    status: 'Delayed',
  },
];

// Mock data for trains
export const mockTrains = [
  {
    id: 'METRO001',
    lineName: 'Purple Line',
    trainNumber: 'M-001',
    currentStation: 'Mysore Road',
    nextStation: 'Vijayanagar',
    arrivalTime: '3 mins',
    occupancy: '70%',
    status: 'On Time',
    direction: 'Towards Whitefield',
  },
  {
    id: 'METRO002',
    lineName: 'Green Line',
    trainNumber: 'M-002',
    currentStation: 'Heelalige',
    nextStation: 'Indiranagar',
    arrivalTime: '6 mins',
    occupancy: '55%',
    status: 'On Time',
    direction: 'Towards Silk Board',
  },
  {
    id: 'METRO003',
    lineName: 'Red Line',
    trainNumber: 'M-003',
    currentStation: 'Yelachenahalli',
    nextStation: 'Konanakunte Cross',
    arrivalTime: '4 mins',
    occupancy: '85%',
    status: 'Minor Delay',
    direction: 'Towards Chikkanayyana palya',
  },
];

export interface Bus {
  id: string;
  routeNumber: string;
  routeName: string;
  currentLocation: { lat: number; lng: number };
  nextStop: string;
  arrivalTime: string;
  occupancy: string;
  status: string;
}

export interface Train {
  id: string;
  lineName: string;
  trainNumber: string;
  currentStation: string;
  nextStation: string;
  arrivalTime: string;
  occupancy: string;
  status: string;
  direction: string;
}

// API calls would go here in production
export const fetchBuses = async (): Promise<Bus[]> => {
  try {
    // In production, use actual API
    // const response = await axios.get(`https://api.example.com/buses?key=${bmtcApiKey}`);
    // return response.data;
    
    // Mock implementation
    return mockBuses;
  } catch (error) {
    console.error('Error fetching buses:', error);
    return mockBuses;
  }
};

export const fetchTrains = async (): Promise<Train[]> => {
  try {
    // In production, use actual API
    // const response = await axios.get(`https://api.example.com/metro?key=${metroApiKey}`);
    // return response.data;
    
    // Mock implementation
    return mockTrains;
  } catch (error) {
    console.error('Error fetching trains:', error);
    return mockTrains;
  }
};

export const searchBusByRoute = async (routeNumber: string): Promise<Bus[]> => {
  const buses = await fetchBuses();
  return buses.filter(bus => 
    bus.routeNumber.toLowerCase().includes(routeNumber.toLowerCase()) ||
    bus.routeName.toLowerCase().includes(routeNumber.toLowerCase())
  );
};

export const searchTrainByLine = async (lineName: string): Promise<Train[]> => {
  const trains = await fetchTrains();
  return trains.filter(train =>
    train.lineName.toLowerCase().includes(lineName.toLowerCase()) ||
    train.trainNumber.toLowerCase().includes(lineName.toLowerCase())
  );
};
