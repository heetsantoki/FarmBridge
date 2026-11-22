const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {
  APMC_MARKETS,
  getAvailableLocations,
  getMarketsByDistrict,
  calculateDistanceKm
} = require('../utils/apmcDirectory');
const {
  getNearestApmcWithPrices,
  getApmcByDistrictOrId,
  getPricesForMarket
} = require('../services/mandiService');

// Base dynamic market rates benchmarked to realistic Indian APMC mandis
const BASE_MANDI_DATA = [
  { crop: "Sharbati Wheat", basePrice: 2740, unit: "Qtl", mandi: "Sehore APMC (MP)", state: "Madhya Pradesh" },
  { crop: "Basmati 1121 Paddy", basePrice: 4890, unit: "Qtl", mandi: "Karnal (HR)", state: "Haryana" },
  { crop: "Yellow Soybean", basePrice: 4450, unit: "Qtl", mandi: "Indore (MP)", state: "Madhya Pradesh" },
  { crop: "Mustard Seed", basePrice: 5680, unit: "Qtl", mandi: "Kota (RJ)", state: "Rajasthan" },
  { crop: "Red Onion (Nashik)", basePrice: 2350, unit: "Qtl", mandi: "Lasalgaon (MH)", state: "Maharashtra" },
  { crop: "Fresh Hybrid Tomato", basePrice: 1850, unit: "Qtl", mandi: "Kolar (KA)", state: "Karnataka" },
  { crop: "Potato (Jyoti)", basePrice: 1480, unit: "Qtl", mandi: "Agra (UP)", state: "Uttar Pradesh" },
  { crop: "Desi Cotton (Kapas)", basePrice: 7320, unit: "Qtl", mandi: "Rajkot (GJ)", state: "Gujarat" },
  { crop: "Tur / Arhar Dal", basePrice: 10250, unit: "Qtl", mandi: "Gulbarga (KA)", state: "Karnataka" },
  { crop: "Chana Desi (Chickpea)", basePrice: 5980, unit: "Qtl", mandi: "Bikaner (RJ)", state: "Rajasthan" },
  { crop: "Green Moong", basePrice: 8400, unit: "Qtl", mandi: "Nagaur (RJ)", state: "Rajasthan" },
  { crop: "Groundnut (Bold)", basePrice: 6450, unit: "Qtl", mandi: "Gondal (GJ)", state: "Gujarat" },
  { crop: "Teja Green Chilli", basePrice: 6800, unit: "Qtl", mandi: "Guntur (AP)", state: "Andhra Pradesh" },
  { crop: "Haldi (Turmeric)", basePrice: 14200, unit: "Qtl", mandi: "Nizamabad (TS)", state: "Telangana" },
  { crop: "Garlic (Desi)", basePrice: 18500, unit: "Qtl", mandi: "Mandsaur (MP)", state: "Madhya Pradesh" },
  { crop: "Alphonso Mango", basePrice: 1200, unit: "Doz", mandi: "Ratnagiri (MH)", state: "Maharashtra" },
  { crop: "Ginger (Fresh)", basePrice: 8900, unit: "Qtl", mandi: "Wayanad (KL)", state: "Kerala" },
  { crop: "Maize (Yellow)", basePrice: 2180, unit: "Qtl", mandi: "Chhindwara (MP)", state: "Madhya Pradesh" },
];

/**
 * GET /api/mandi/nearest
 * Query params: lat, lng
 * Detects nearest APMC to user coordinates and returns live commodity prices
 */
router.get('/nearest', async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude query parameters are required"
      });
    }

    const result = await getNearestApmcWithPrices(parseFloat(lat), parseFloat(lng));

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("NEAREST APMC ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to detect nearest APMC and fetch prices",
      error: error.message
    });
  }
});

/**
 * GET /api/mandi/market
 * Query params: id, district, lat, lng
 * Returns commodity prices for a specific APMC market or district with distance if coordinates are provided
 */
router.get('/market', async (req, res) => {
  try {
    const { id, district, lat, lng } = req.query;

    const result = await getApmcByDistrictOrId({
      marketId: id,
      district,
      userLat: lat,
      userLng: lng
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("APMC BY MARKET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch APMC market prices",
      error: error.message
    });
  }
});

/**
 * GET /api/mandi/directory
 * Returns all available APMCs, states, and districts for manual location selection
 */
router.get('/directory', async (req, res) => {
  try {
    const states = getAvailableLocations();
    const markets = APMC_MARKETS.map(m => ({
      id: m.id,
      name: m.name,
      district: m.district,
      state: m.state,
      lat: m.lat,
      lng: m.lng,
      address: m.address,
      specialties: m.specialties
    }));

    res.status(200).json({
      success: true,
      states,
      totalMarkets: markets.length,
      markets
    });
  } catch (error) {
    console.error("MANDI DIRECTORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch APMC directory"
    });
  }
});

/**
 * GET /api/mandi/rates
 * Returns running marquee ticker rates with live dynamic fluctuation & listed produce blend
 */
router.get('/rates', async (req, res) => {
  try {
    const today = new Date();
    const daySeed = today.getDate() + (today.getMonth() * 31);

    // Also blend in current crops listed in the DB by farmers
    const listedProducts = await Product.find().select('name category priceRange unit').limit(5);

    const dynamicRates = BASE_MANDI_DATA.map((item, index) => {
      const variation = Math.sin(daySeed + index * 1.7) * 3.5;
      const roundedVariation = parseFloat(variation.toFixed(1));
      const up = roundedVariation >= 0;
      const adjustedPrice = Math.round(item.basePrice * (1 + roundedVariation / 100));

      return {
        crop: item.crop,
        price: `₹${adjustedPrice.toLocaleString('en-IN')}/${item.unit}`,
        rawPrice: adjustedPrice,
        unit: item.unit,
        change: `${up ? '+' : ''}${roundedVariation}%`,
        up,
        mandi: item.mandi,
        state: item.state,
        lastUpdated: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
    });

    listedProducts.forEach(prod => {
      const exists = dynamicRates.some(r => r.crop.toLowerCase().includes(prod.name.toLowerCase()));
      if (!exists && prod.priceRange?.min) {
        dynamicRates.unshift({
          crop: prod.name,
          price: `₹${prod.priceRange.min.toLocaleString('en-IN')}/${prod.unit || 'kg'}`,
          rawPrice: prod.priceRange.min,
          unit: prod.unit || 'kg',
          change: '+1.5%',
          up: true,
          mandi: 'FarmBridge Direct Lot',
          state: 'Verified Farm',
          lastUpdated: 'Live Today',
        });
      }
    });

    res.status(200).json({
      success: true,
      count: dynamicRates.length,
      rates: dynamicRates,
    });
  } catch (error) {
    console.error('MANDI RATES ERROR:', error);
    res.status(500).json({ message: 'Failed to fetch mandi rates' });
  }
});

module.exports = router;
