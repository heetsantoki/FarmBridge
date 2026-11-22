/**
 * Master Directory of APMC Markets across India with Geographic Coordinates
 * Enables accurate distance calculation & nearest market detection.
 */

const APMC_MARKETS = [
  // --- GUJARAT: SAURASHTRA & KUTCH ---
  {
    id: "rajkot",
    name: "Rajkot APMC",
    marketNames: ["Rajkot APMC", "Rajkot", "Rajkot(Veg.Market)"],
    district: "Rajkot",
    state: "Gujarat",
    lat: 22.3382,
    lng: 70.8122,
    address: "Bedi Yard, Rajkot, Gujarat",
    specialties: ["Cotton (Kapas)", "Groundnut", "Sesame (Til)", "Cumin (Jeera)"]
  },
  {
    id: "gondal",
    name: "Gondal APMC",
    marketNames: ["Gondal APMC", "Gondal", "Gondal(Veg.market Gondal) APMC", "Gondal(Ghee Peeth Gondal)"],
    district: "Rajkot",
    state: "Gujarat",
    lat: 21.9619,
    lng: 70.7923,
    address: "National Highway 27, Gondal, Gujarat",
    specialties: ["Groundnut", "Red Chilli", "Coriander (Dhanya)", "Cotton", "Onion"]
  },
  {
    id: "jasdan",
    name: "Jasdan APMC",
    marketNames: ["JASDAN APMC", "Jasdan", "Jasdan APMC"],
    district: "Rajkot",
    state: "Gujarat",
    lat: 22.0333,
    lng: 71.2000,
    address: "Atkot Road, Jasdan, Gujarat",
    specialties: ["Groundnut", "Castor Seed", "Green Moong", "Cotton"]
  },
  {
    id: "morbi",
    name: "Morbi APMC",
    marketNames: ["Morbi APMC", "Morbi"],
    district: "Morbi",
    state: "Gujarat",
    lat: 22.8173,
    lng: 70.8377,
    address: "Sanala Road, Morbi, Gujarat",
    specialties: ["Cotton", "Sesame", "Groundnut", "Wheat"]
  },
  {
    id: "jamnagar",
    name: "Jamnagar APMC",
    marketNames: ["Jamnagar APMC", "Jamnagar"],
    district: "Jamnagar",
    state: "Gujarat",
    lat: 22.4707,
    lng: 70.0577,
    address: "Hapa Market Yard, Jamnagar, Gujarat",
    specialties: ["Groundnut", "Castor", "Cotton", "Garlic"]
  },
  {
    id: "junagadh",
    name: "Junagadh APMC",
    marketNames: ["Junagadh APMC", "Junagadh"],
    district: "Junagadh",
    state: "Gujarat",
    lat: 21.5222,
    lng: 70.4579,
    address: "Dolatpara, Junagadh, Gujarat",
    specialties: ["Groundnut", "Kesar Mango", "Wheat", "Sesame"]
  },
  {
    id: "amreli",
    name: "Amreli APMC",
    marketNames: ["Amreli APMC", "Amreli"],
    district: "Amreli",
    state: "Gujarat",
    lat: 21.6032,
    lng: 71.2223,
    address: "Station Road, Amreli, Gujarat",
    specialties: ["Cotton", "Groundnut", "Sesame", "Gram (Chana)"]
  },
  {
    id: "bhavnagar",
    name: "Bhavnagar APMC",
    marketNames: ["Bhavnagar APMC", "Bhavnagar", "Bhavnagar(Veg.Market)"],
    district: "Bhavnagar",
    state: "Gujarat",
    lat: 21.7645,
    lng: 72.1519,
    address: "Chitra GIDC, Bhavnagar, Gujarat",
    specialties: ["Onion (Red & White)", "Cotton", "Guava", "Groundnut"]
  },
  {
    id: "botad",
    name: "Botad APMC",
    marketNames: ["Botad APMC", "Botad"],
    district: "Botad",
    state: "Gujarat",
    lat: 22.1706,
    lng: 71.6667,
    address: "Paliyad Road, Botad, Gujarat",
    specialties: ["Cotton", "Wheat", "Gram", "Groundnut"]
  },
  {
    id: "surendranagar",
    name: "Surendranagar (Wadhwan) APMC",
    marketNames: ["Surendranagar APMC", "Wadhwan APMC", "Surendranagar", "Wadhwan"],
    district: "Surendranagar",
    state: "Gujarat",
    lat: 22.7284,
    lng: 71.6372,
    address: "Kuda Road, Surendranagar, Gujarat",
    specialties: ["Cotton", "Cumin", "Sesame", "Wheat"]
  },
  {
    id: "bhuj",
    name: "Bhuj APMC",
    marketNames: ["Bhuj APMC", "Bhuj", "Anjar APMC"],
    district: "Kachchh",
    state: "Gujarat",
    lat: 23.2420,
    lng: 69.6669,
    address: "Madhapar, Bhuj, Kachchh, Gujarat",
    specialties: ["Castor Seed", "Dates (Kharek)", "Cotton", "Groundnut"]
  },

  // --- GUJARAT: NORTH & CENTRAL ---
  {
    id: "ahmedabad",
    name: "Ahmedabad APMC",
    marketNames: ["Ahmedabad APMC", "Ahmedabad", "Ahmedabad(Chimanbhai Patel Market)", "Jetalpur APMC"],
    district: "Ahmedabad",
    state: "Gujarat",
    lat: 23.0225,
    lng: 72.5714,
    address: "Vasna / Jetalpur, Ahmedabad, Gujarat",
    specialties: ["Wheat (Bhalia)", "Vegetables", "Paddy", "Cotton"]
  },
  {
    id: "gandhinagar",
    name: "Gandhinagar (Mansa) APMC",
    marketNames: ["Mansa APMC", "Gandhinagar APMC", "Mansa", "Gandhinagar"],
    district: "Gandhinagar",
    state: "Gujarat",
    lat: 23.4248,
    lng: 72.6616,
    address: "Market Yard, Mansa, Gandhinagar, Gujarat",
    specialties: ["Wheat", "Mustard", "Castor", "Bajra"]
  },
  {
    id: "unjha",
    name: "Unjha APMC (Spice Mandi)",
    marketNames: ["Unjha APMC", "Unjha"],
    district: "Mehsana",
    state: "Gujarat",
    lat: 23.8039,
    lng: 72.3922,
    address: "Asia's Largest Spice Mandi, Unjha, Gujarat",
    specialties: ["Cumin (Jeera)", "Fennel (Saunf)", "Isabgol", "Mustard"]
  },
  {
    id: "mehsana",
    name: "Mehsana APMC",
    marketNames: ["Mehsana APMC", "Mehsana", "Kadi APMC"],
    district: "Mehsana",
    state: "Gujarat",
    lat: 23.5880,
    lng: 72.3693,
    address: "Radhanpur Road, Mehsana, Gujarat",
    specialties: ["Mustard", "Castor Seed", "Wheat", "Bajra"]
  },
  {
    id: "patan",
    name: "Patan (Harij) APMC",
    marketNames: ["Harij APMC", "Patan APMC", "Patan", "Harij"],
    district: "Patan",
    state: "Gujarat",
    lat: 23.8493,
    lng: 72.1266,
    address: "Station Road, Patan, Gujarat",
    specialties: ["Cotton Seed", "Castor", "Mustard", "Cumin"]
  },
  {
    id: "deesa",
    name: "Deesa APMC",
    marketNames: ["Deesa APMC", "Deesa", "Palanpur APMC"],
    district: "Banaskantha",
    state: "Gujarat",
    lat: 24.2586,
    lng: 72.1814,
    address: "Potato Capital Market Yard, Deesa, Banaskantha, Gujarat",
    specialties: ["Potato", "Mustard", "Castor", "Groundnut"]
  },
  {
    id: "anand",
    name: "Anand APMC",
    marketNames: ["Anand APMC", "Anand", "Khambhat APMC"],
    district: "Anand",
    state: "Gujarat",
    lat: 22.5645,
    lng: 72.9289,
    address: "Ganesh Chokdi, Anand, Gujarat",
    specialties: ["Tobacco", "Banana", "Paddy", "Vegetables"]
  },
  {
    id: "vadodara",
    name: "Vadodara APMC",
    marketNames: ["Vadodara APMC", "Vadodara", "Sayajipura APMC", "Baroda"],
    district: "Vadodara",
    state: "Gujarat",
    lat: 22.3072,
    lng: 73.1812,
    address: "Sayajipura, Vadodara, Gujarat",
    specialties: ["Cotton", "Tur (Pigeon Pea)", "Paddy", "Banana"]
  },
  {
    id: "dahod",
    name: "Dahod (Limkheda) APMC",
    marketNames: ["Limkheda APMC", "Dahod APMC", "Dahod", "Limkheda"],
    district: "Dahod",
    state: "Gujarat",
    lat: 22.8376,
    lng: 74.2552,
    address: "Station Road, Dahod, Gujarat",
    specialties: ["Maize (Deshi White)", "Soybean", "Gram", "Wheat"]
  },

  // --- GUJARAT: SOUTH ---
  {
    id: "surat",
    name: "Surat APMC",
    marketNames: ["Surat APMC", "Surat", "Sardar Patel Market Surat"],
    district: "Surat",
    state: "Gujarat",
    lat: 21.1702,
    lng: 72.8311,
    address: "Kadodara Road, Surat, Gujarat",
    specialties: ["Paddy", "Sugarcane", "Banana", "Vegetables"]
  },
  {
    id: "navsari",
    name: "Navsari APMC",
    marketNames: ["Navsari APMC", "Navsari", "Chikhli APMC"],
    district: "Navsari",
    state: "Gujarat",
    lat: 20.9467,
    lng: 72.9520,
    address: "Station Road, Navsari, Gujarat",
    specialties: ["Chikoo (Sapota)", "Mango", "Paddy", "Sugarcane"]
  },
  {
    id: "valsad",
    name: "Valsad APMC",
    marketNames: ["Valsad APMC", "Valsad", "Dharampur APMC"],
    district: "Valsad",
    state: "Gujarat",
    lat: 20.5992,
    lng: 72.9342,
    address: "Dharampur Road, Valsad, Gujarat",
    specialties: ["Alphonso Mango", "Chikoo", "Paddy", "Vegetables"]
  },

  // --- MAHARASHTRA ---
  {
    id: "lasalgaon",
    name: "Lasalgaon APMC",
    marketNames: ["Lasalgaon APMC", "Lasalgaon", "Lasalgaon-Niphad APMC"],
    district: "Nashik",
    state: "Maharashtra",
    lat: 20.1478,
    lng: 74.2269,
    address: "Asia's Largest Onion Market, Lasalgaon, Nashik, Maharashtra",
    specialties: ["Onion (Red/Pusa)", "Grapes", "Pomegranate", "Soybean"]
  },
  {
    id: "nashik",
    name: "Nashik APMC",
    marketNames: ["Nashik APMC", "Nashik", "Panchavati APMC"],
    district: "Nashik",
    state: "Maharashtra",
    lat: 19.9975,
    lng: 73.7898,
    address: "Panchavati Market Yard, Nashik, Maharashtra",
    specialties: ["Tomato", "Onion", "Grapes", "Vegetables"]
  },
  {
    id: "pune",
    name: "Pune APMC",
    marketNames: ["Pune APMC", "Pune", "Gultekdi APMC"],
    district: "Pune",
    state: "Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    address: "Gultekdi Market Yard, Pune, Maharashtra",
    specialties: ["Pomegranate", "Onion", "Sugarcane", "Wheat"]
  },
  {
    id: "vashi",
    name: "Vashi APMC (Navi Mumbai)",
    marketNames: ["Vashi APMC", "Navi Mumbai APMC", "Mumbai APMC", "Vashi"],
    district: "Thane",
    state: "Maharashtra",
    lat: 19.0760,
    lng: 72.9986,
    address: "Sector 19, Vashi, Navi Mumbai, Maharashtra",
    specialties: ["Alphonso Mango", "Apple", "Onion", "Spices", "Grains"]
  },

  // --- MADHYA PRADESH ---
  {
    id: "indore",
    name: "Indore APMC (Choithram)",
    marketNames: ["Indore APMC", "Indore", "Choithram APMC"],
    district: "Indore",
    state: "Madhya Pradesh",
    lat: 22.7196,
    lng: 75.8577,
    address: "Choithram Mandi, Indore, Madhya Pradesh",
    specialties: ["Soybean (Yellow)", "Sharbati Wheat", "Potato", "Garlic"]
  },
  {
    id: "mandsaur",
    name: "Mandsaur APMC",
    marketNames: ["Mandsaur APMC", "Mandsaur"],
    district: "Mandsaur",
    state: "Madhya Pradesh",
    lat: 24.0722,
    lng: 75.0683,
    address: "Krishi Upaj Mandi, Mandsaur, Madhya Pradesh",
    specialties: ["Garlic (Desi)", "Mustard", "Soybean", "Fenugreek (Methi)"]
  },
  {
    id: "sehore",
    name: "Sehore APMC",
    marketNames: ["Sehore APMC", "Sehore"],
    district: "Sehore",
    state: "Madhya Pradesh",
    lat: 23.2031,
    lng: 77.0844,
    address: "Mandi Yard, Sehore, Madhya Pradesh",
    specialties: ["Sharbati Wheat", "Soybean", "Gram"]
  },

  // --- RAJASTHAN ---
  {
    id: "kota",
    name: "Kota (Bhamashah) APMC",
    marketNames: ["Kota APMC", "Kota", "Bhamashah APMC"],
    district: "Kota",
    state: "Rajasthan",
    lat: 25.2138,
    lng: 75.8648,
    address: "Bhamashah Krishi Upaj Mandi, Kota, Rajasthan",
    specialties: ["Mustard Seed", "Soybean", "Wheat", "Coriander"]
  },
  {
    id: "bikaner",
    name: "Bikaner APMC",
    marketNames: ["Bikaner APMC", "Bikaner", "Nokha APMC"],
    district: "Bikaner",
    state: "Rajasthan",
    lat: 28.0229,
    lng: 73.3119,
    address: "Anaj Mandi, Bikaner, Rajasthan",
    specialties: ["Chana Desi (Chickpea)", "Guar Seed", "Moth Dal", "Mustard"]
  },

  // --- HARYANA & PUNJAB ---
  {
    id: "karnal",
    name: "Karnal APMC",
    marketNames: ["Karnal APMC", "Karnal", "Taraori APMC"],
    district: "Karnal",
    state: "Haryana",
    lat: 29.6857,
    lng: 76.9905,
    address: "New Grain Market, Karnal, Haryana",
    specialties: ["Basmati 1121 Paddy", "PR Paddy", "Wheat"]
  },
  {
    id: "khanna",
    name: "Khanna APMC",
    marketNames: ["Khanna APMC", "Khanna"],
    district: "Ludhiana",
    state: "Punjab",
    lat: 30.7027,
    lng: 76.2173,
    address: "Asia's Largest Grain Yard, Khanna, Punjab",
    specialties: ["Wheat", "Paddy (Pusa)", "Maize"]
  },

  // --- SOUTH INDIA ---
  {
    id: "kolar",
    name: "Kolar APMC",
    marketNames: ["Kolar APMC", "Kolar"],
    district: "Kolar",
    state: "Karnataka",
    lat: 13.1367,
    lng: 78.1340,
    address: "Tomato APMC Yard, Kolar, Karnataka",
    specialties: ["Fresh Hybrid Tomato", "Mango", "Silk Cocoons", "Potato"]
  },
  {
    id: "guntur",
    name: "Guntur APMC",
    marketNames: ["Guntur APMC", "Guntur", "Mirchi Yard Guntur"],
    district: "Guntur",
    state: "Andhra Pradesh",
    lat: 16.3067,
    lng: 80.4365,
    address: "Asia's Largest Chilli Yard, Guntur, Andhra Pradesh",
    specialties: ["Teja Red Chilli", "Cotton", "Turmeric", "Tobacco"]
  }
];

/**
 * Calculates geographic distance in kilometers between two coordinates using Haversine formula
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Rounded to 1 decimal place
}

/**
 * Finds nearest APMC markets given user latitude & longitude
 */
function findNearestMarkets(userLat, userLng, limit = 5) {
  const lat = parseFloat(userLat);
  const lng = parseFloat(userLng);

  if (isNaN(lat) || isNaN(lng)) {
    // Default fallback to Rajkot APMC
    const defaultMarket = APMC_MARKETS.find(m => m.id === "rajkot") || APMC_MARKETS[0];
    return [{ ...defaultMarket, distanceKm: 0 }];
  }

  const marketsWithDist = APMC_MARKETS.map(market => {
    const dist = calculateDistanceKm(lat, lng, market.lat, market.lng);
    return {
      ...market,
      distanceKm: dist
    };
  });

  marketsWithDist.sort((a, b) => a.distanceKm - b.distanceKm);
  return marketsWithDist.slice(0, limit);
}

/**
 * Get APMC markets by district or state name
 */
function getMarketsByDistrict(districtName) {
  if (!districtName) return [];
  const cleanDistrict = districtName.trim().toLowerCase();
  return APMC_MARKETS.filter(m =>
    m.district.toLowerCase().includes(cleanDistrict) ||
    cleanDistrict.includes(m.district.toLowerCase())
  );
}

/**
 * Get distinct states and districts for manual location selection
 */
function getAvailableLocations() {
  const map = {};
  APMC_MARKETS.forEach(m => {
    if (!map[m.state]) {
      map[m.state] = new Set();
    }
    map[m.state].add(m.district);
  });

  const result = [];
  for (const [state, districts] of Object.entries(map)) {
    result.push({
      state,
      districts: Array.from(districts).sort()
    });
  }

  // Put Gujarat first for best regional UX
  result.sort((a, b) => (a.state === "Gujarat" ? -1 : b.state === "Gujarat" ? 1 : a.state.localeCompare(b.state)));
  return result;
}

module.exports = {
  APMC_MARKETS,
  calculateDistanceKm,
  findNearestMarkets,
  getMarketsByDistrict,
  getAvailableLocations
};
