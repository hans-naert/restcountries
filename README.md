# Rest Countries API (Offline)

A simple offline API built with Express that serves country data from `world-countries` and local SVG flags from `flag-icons`.

## Requirements

- Node.js 18+ (recommended)
- npm

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

The server starts on:

- `http://localhost:3000`

---

## API Overview

### 1) Static flags

Flags are served locally from the `flag-icons` package.

- **Base URL:** `/flags`
- **Example:** `/flags/4x3/nl.svg`

### 2) Get all countries

Returns a simplified list of all countries.

- **Method:** `GET`
- **URL:** `/api/countries`

#### Response fields

Each item contains:

- `name` (string)
- `officialName` (string)
- `cca2` (string)
- `capital` (array or undefined)
- `region` (string)
- `flagUrl` (string)

#### Example

```bash
curl http://localhost:3000/api/countries
```

Example item:

```json
{
  "name": "Netherlands",
  "officialName": "Kingdom of the Netherlands",
  "cca2": "NL",
  "capital": ["Amsterdam"],
  "region": "Europe",
  "flagUrl": "/flags/4x3/nl.svg"
}
```

### 3) Get one country by code

Returns one full country object from `world-countries` plus `flagUrl`.

- **Method:** `GET`
- **URL:** `/api/countries/:code`
- **Path param:** `code` = 2-letter country code (case-insensitive), e.g. `nl`, `BE`

#### Example

```bash
curl http://localhost:3000/api/countries/nl
```

#### Not found

If the country code does not exist:

- **Status:** `404`
- **Body:**

```json
{
  "error": "Land niet gevonden"
}
```

---

## Notes

- The server port is currently fixed to `3000` in `index.js`.
- `flagUrl` is generated as a relative path: `/flags/4x3/{cca2-lowercase}.svg`.
