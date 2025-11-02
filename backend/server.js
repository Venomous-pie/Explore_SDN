const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load data
const placesDataPath = path.join(__dirname, 'data', 'places.json');
const diningDataPath = path.join(__dirname, 'data', 'dining.json');
const hotelsDataPath = path.join(__dirname, 'data', 'hotels.json');

let places = JSON.parse(fs.readFileSync(placesDataPath, 'utf8'));
let dining = JSON.parse(fs.readFileSync(diningDataPath, 'utf8'));
let hotels = JSON.parse(fs.readFileSync(hotelsDataPath, 'utf8'));

// Get all places with filtering
app.get('/api/places', (req, res) => {
  const { category, municipality, type, limit = 50, sort = 'rating' } = req.query;
  
  let filtered = [...places];

  if (category) {
    filtered = filtered.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }

  if (municipality) {
    filtered = filtered.filter(p => p.municipality?.toLowerCase() === municipality.toLowerCase());
  }

  if (type) {
    filtered = filtered.filter(p => p.type?.toLowerCase() === type.toLowerCase());
  }

  // Sort
  if (sort === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Limit
  filtered = filtered.slice(0, parseInt(limit));

  res.json({ success: true, data: filtered, total: filtered.length });
});

// Get single place
app.get('/api/places/:id', (req, res) => {
  const { id } = req.params;
  const place = places.find(p => p.id === parseInt(id));
  
  if (!place) {
    return res.status(404).json({ success: false, error: 'Place not found' });
  }

  res.json({ success: true, data: place });
});

// Search places
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ success: false, error: 'Search query required' });
  }

  const searchTerm = q.toLowerCase();
  const results = places.filter(place => 
    place.name.toLowerCase().includes(searchTerm) ||
    place.description?.toLowerCase().includes(searchTerm) ||
    place.municipality?.toLowerCase().includes(searchTerm) ||
    place.highlights?.some(h => h.toLowerCase().includes(searchTerm))
  );

  res.json({ success: true, data: results, total: results.length });
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = {};
  places.forEach(place => {
    const cat = place.category || 'Other';
    categories[cat] = (categories[cat] || 0) + 1;
  });

  const result = Object.entries(categories).map(([name, count]) => ({
    name,
    count
  }));

  res.json({ success: true, data: result });
});

// Get municipalities
app.get('/api/municipalities', (req, res) => {
  const municipalities = {};
  places.forEach(place => {
    const mun = place.municipality || 'Unknown';
    municipalities[mun] = (municipalities[mun] || 0) + 1;
  });

  const result = Object.entries(municipalities).map(([name, count]) => ({
    name,
    count
  }));

  res.json({ success: true, data: result });
});

// Get featured/top rated places
app.get('/api/featured', (req, res) => {
  const featured = places
    .filter(p => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  res.json({ success: true, data: featured });
});

// Add new place (for future expansion)
app.post('/api/places', (req, res) => {
  const newPlace = {
    id: places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };

  places.push(newPlace);
  
  // Save to file
  fs.writeFileSync(placesDataPath, JSON.stringify(places, null, 2));

  res.status(201).json({ success: true, data: newPlace });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const stats = {
    totalPlaces: places.length,
    averageRating: (places.reduce((sum, p) => sum + (p.rating || 0), 0) / places.length).toFixed(2),
    totalReviews: places.reduce((sum, p) => sum + (p.totalRatings || 0), 0),
    municipalities: Object.keys(places.reduce((acc, p) => {
      acc[p.municipality] = true;
      return acc;
    }, {})).length,
    categories: Object.keys(places.reduce((acc, p) => {
      acc[p.category || 'Other'] = true;
      return acc;
    }, {})).length
  };

  res.json({ success: true, data: stats });
});

// DINING ENDPOINTS

// Get all dining options
app.get('/api/dining', (req, res) => {
  const { cuisine, category, municipality, limit = 50, sort = 'rating' } = req.query;
  
  let filtered = [...dining];

  if (cuisine) {
    filtered = filtered.filter(d => d.cuisine?.toLowerCase().includes(cuisine.toLowerCase()));
  }

  if (category) {
    filtered = filtered.filter(d => d.category?.toLowerCase() === category.toLowerCase());
  }

  if (municipality) {
    filtered = filtered.filter(d => d.municipality?.toLowerCase() === municipality.toLowerCase());
  }

  // Sort
  if (sort === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  filtered = filtered.slice(0, parseInt(limit));
  res.json({ success: true, data: filtered, total: filtered.length });
});

// Get single dining place
app.get('/api/dining/:id', (req, res) => {
  const { id } = req.params;
  const restaurant = dining.find(d => d.id === parseInt(id));
  
  if (!restaurant) {
    return res.status(404).json({ success: false, error: 'Restaurant not found' });
  }

  res.json({ success: true, data: restaurant });
});

// Search dining
app.get('/api/dining/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ success: false, error: 'Search query required' });
  }

  const searchTerm = q.toLowerCase();
  const results = dining.filter(d => 
    d.name.toLowerCase().includes(searchTerm) ||
    d.cuisine?.toLowerCase().includes(searchTerm) ||
    d.description?.toLowerCase().includes(searchTerm) ||
    d.specialty?.some(s => s.toLowerCase().includes(searchTerm))
  );

  res.json({ success: true, data: results, total: results.length });
});

// HOTELS ENDPOINTS

// Get all hotels
app.get('/api/hotels', (req, res) => {
  const { category, type, municipality, limit = 50, sort = 'rating' } = req.query;
  
  let filtered = [...hotels];

  if (category) {
    filtered = filtered.filter(h => h.category?.toLowerCase().includes(category.toLowerCase()));
  }

  if (type) {
    filtered = filtered.filter(h => h.type?.toLowerCase().includes(type.toLowerCase()));
  }

  if (municipality) {
    filtered = filtered.filter(h => h.municipality?.toLowerCase() === municipality.toLowerCase());
  }

  // Sort
  if (sort === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'price') {
    filtered.sort((a, b) => (a.priceLevel || 0) - (b.priceLevel || 0));
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  filtered = filtered.slice(0, parseInt(limit));
  res.json({ success: true, data: filtered, total: filtered.length });
});

// Get single hotel
app.get('/api/hotels/:id', (req, res) => {
  const { id } = req.params;
  const hotel = hotels.find(h => h.id === parseInt(id));
  
  if (!hotel) {
    return res.status(404).json({ success: false, error: 'Hotel not found' });
  }

  res.json({ success: true, data: hotel });
});

// Search hotels
app.get('/api/hotels/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ success: false, error: 'Search query required' });
  }

  const searchTerm = q.toLowerCase();
  const results = hotels.filter(h => 
    h.name.toLowerCase().includes(searchTerm) ||
    h.description?.toLowerCase().includes(searchTerm) ||
    h.type?.toLowerCase().includes(searchTerm) ||
    h.amenities?.some(a => a.toLowerCase().includes(searchTerm))
  );

  res.json({ success: true, data: results, total: results.length });
});

// Get hotel categories
app.get('/api/hotels/categories', (req, res) => {
  const categories = {};
  hotels.forEach(hotel => {
    const cat = hotel.category || 'Other';
    categories[cat] = (categories[cat] || 0) + 1;
  });

  const result = Object.entries(categories).map(([name, count]) => ({
    name,
    count
  }));

  res.json({ success: true, data: result });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Loaded ${places.length} places, ${dining.length} restaurants, ${hotels.length} hotels`);
  console.log(`✨ JSON-based dynamic system - easily expandable!`);
});
