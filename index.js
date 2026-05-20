const express = require('express');
const countries = require('world-countries');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Serveer de vlaggen-map lokaal als statische bestanden
// Nu is elke vlag bereikbaar via: http://localhost:3000/flags/4x3/nl.svg
app.use('/flags', express.static(path.join(__dirname, 'node_modules/flag-icons/flags')));

// 2. Endpoint om alle landen op te halen (inclusief lokale link naar de vlag)
app.get('/api/countries', (req, res) => {
  const customCountries = countries.map(country => ({
    name: country.name.common,
    officialName: country.name.official,
    cca2: country.cca2, // bijv. "NL", "BE"
    capital: country.capital,
    region: country.region,
    // Relative link naar de vlag (werkt ook in Android emulator):
    flagUrl: `/flags/4x3/${country.cca2.toLowerCase()}.svg`
  }));
  
  res.json(customCountries);
});

// 3. Endpoint voor specifiek land op basis van landcode
app.get('/api/countries/:code', (req, res) => {
  const country = countries.find(c => c.cca2.toLowerCase() === req.params.code.toLowerCase());
  if (!country) return res.status(404).json({ error: "Land niet gevonden" });
  
  res.json({
    ...country,
    flagUrl: `/flags/4x3/${country.cca2.toLowerCase()}.svg`
  });
});

app.listen(PORT, () => {
  console.log(`Landen API draait offline op http://localhost:${PORT}`);
});