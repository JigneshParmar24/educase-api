# School Management API
REST API built with Node.js, Express, and MySQL.

## Live URL
(https://educase-api-production.up.railway.app/)

## Endpoints

### `POST /api/v1/school/add`
Add a new school.

**Body:**
```json
{
  "name": "Ryan International",
  "address": "Malad West, Mumbai",
  "latitude": 19.1863,
  "longitude": 72.8486
}
```

### `GET /api/v1/school/list?latitude=19.07&longitude=72.87`
Returns all schools sorted by distance from user's location.

## Setup Locally
```bash
npm install
# need to use a .env file with DB credentials in it and PORT
npm run dev
```

> Intitially for removing distance between user and school I used Euclidean distance formula.
> But Haversine formula, is better for removing precise distance between 2 pairs of longitudes and latitudes 
> As it determines the great-circle distance between two points on a sphere given their longitudes and latitudes.