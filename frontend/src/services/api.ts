import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Place {
  id: number;
  name: string;
  type: string;
  category: string;
  address: string;
  municipality: string;
  island: string;
  latitude: number;
  longitude: number;
  rating: number;
  totalRatings: number;
  description: string;
  priceLevel: number;
  images: string[];
  highlights: string[];
  bestTimeToVisit: string;
  entryFee: string;
  activities?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
}

// Get all places
export async function getPlaces(params?: {
  type?: string;
  municipality?: string;
  limit?: number;
}): Promise<Place[]> {
  const queryParams = new URLSearchParams();
  if (params?.type) queryParams.append('type', params.type);
  if (params?.municipality) queryParams.append('municipality', params.municipality);
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const url = `${API_BASE_URL}/places${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  const response = await fetch(url);
  const result: ApiResponse<Place[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch places');
  }
  
  return result.data;
}

// Get single place with details
export async function getPlaceById(id: number): Promise<Place> {
  const response = await fetch(`${API_BASE_URL}/places/${id}`);
  const result: ApiResponse<Place> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch place details');
  }
  
  return result.data;
}

// Search places
export async function searchPlaces(query: string): Promise<Place[]> {
  const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
  const result: ApiResponse<Place[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to search places');
  }
  
  return result.data;
}

// Get categories
export async function getCategories(): Promise<{ type: string; count: number }[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  const result: ApiResponse<{ type: string; count: number }[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch categories');
  }
  
  return result.data;
}

// Get municipalities
export async function getMunicipalities(): Promise<{ municipality: string; count: number }[]> {
  const response = await fetch(`${API_BASE_URL}/municipalities`);
  const result: ApiResponse<{ municipality: string; count: number }[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch municipalities');
  }
  
  return result.data;
}

export interface Dining {
  id: number;
  name: string;
  cuisine: string;
  category: string;
  municipality: string;
  island: string;
  latitude: number;
  longitude: number;
  rating: number;
  totalRatings: number;
  description: string;
  priceLevel: number;
  images: string[];
  specialty?: string[];
  priceRange?: string;
  openHours?: string;
  tags?: string[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  bookingUrl?: string;
}

// using axios
export async function fetchPlaces(params?: {
  category?: string;
  municipality?: string;
  limit?: number;
}): Promise<Place[]> {
  const { data } = await axios.get<ApiResponse<Place[]>>(`${API_BASE_URL}/places`, { params });
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch places');
  }
  
  return data.data;
}

export async function fetchDining(params?: {
  municipality?: string;
  limit?: number;
}): Promise<Dining[]> {
  const { data } = await axios.get<ApiResponse<Dining[]>>(`${API_BASE_URL}/dining`, { params });
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch dining');
  }
  
  return data.data;
}

export interface Hotel {
  id: number;
  name: string;
  category: string;
  type: string;
  municipality: string;
  island: string;
  latitude: number;
  longitude: number;
  rating: number;
  totalRatings: number;
  description: string;
  priceLevel: number;
  images: string[];
  amenities?: string[];
  priceRange?: string;
  highlights?: string[];
  tags?: string[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  bookingUrl?: string;
}

export async function fetchHotels(params?: {
  municipality?: string;
  category?: string;
  limit?: number;
}): Promise<Hotel[]> {
  const { data } = await axios.get<ApiResponse<Hotel[]>>(`${API_BASE_URL}/hotels`, { params });
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch hotels');
  }
  
  return data.data;
}
