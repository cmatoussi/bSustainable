import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const travelMeans = [
    { value: 'CarbonFootprintFromFlight', label: "Plane" },
    { value: 'CarbonFootprintFromCarTravel', label: "Car" },
    { value: 'CarbonFootprintFromMotorBike', label: "Motor Bike" },
    { value: 'CarbonFootprintFromPublicTransit', label: "Public Transit" }
  ];

  const flightTypes = [
    { value: "DomesticFlight", label: "Domestic Flight" },
    { value: "ShortEconomyClassFlight", label: "Short Economy Class Flight" },
    { value: "ShortBusinessClassFlight", label: "Short Business Class Flight" },
    { value: "LongEconomyClassFlight", label: "Long Economy Class Flight" },
    { value: "LongPremiumClassFlight", label: "Long Premium Class Flight" },
    { value: "LongBusinessClassFlight", label: "Long Business Class Flight" },
    { value: "LongFirstClassFlight", label: "Long First Class Flight" }
  ];

  const motorBikeTypes = [
    { value: "SmallMotorBike", label: "Small Motor Bike" },
    { value: "MediumMotorBike", label: "Medium Motor Bike" },
    { value: "LargeMotorBike", label: "Large Motor Bike" }
  ]; 

  const publicTransitTypes = [
    { value: "Taxi", label: "Taxi" },
    { value: "ClassicBus", label: "Classic Bus" },
    { value: "Coach", label: "Coach" },
    { value: "NationalTrain", label: "National Train" },
    { value: "LightRail", label: "Light Rail" },
    { value: "Subway", label: "Subway" },
    { value: "FerryOnFoot", label: "Ferry On Foot" },
    { value: "FerryInCar", label: "Ferry In Car" }
  ]; 

  const carTypes = [
    { value: "SmallDieselCar", label: "Small Diesel Car" },
    { value: "MediumDieselCar", label: "Medium Diesel Car" },
    { value: "LargeDieselCar", label: "Large Diesel Car" },
    { value: "MediumHybridCar", label: "Medium Hybrid Car" },
    { value: "LargeHybridCar", label: "Large Hybrid Car" },
    { value: "MediumLPGCar", label: "Medium LPG Cary" },
    { value: "LargeLPGCar", label: "Large LPG Car" },
    { value: "MediumCNGCar", label: "Medium CNG Car" }, 
    { value: "LargeCNGCar", label: "Large CNG Car" },
    { value: "SmallPetrolVan", label: "Small Petrol Van" },
    { value: "LargePetrolVan", label: "Large Petrol Van" },
    { value: "SmallDielselVan", label: "Small Dielsel Van" },
    { value: "MediumDielselVan", label: "Medium Dielsel Van" },
    { value: "LargeDielselVan", label: "Large Dielsel Van" },
    { value: "LPGVan", label: "LPG Van" },
    { value: "CNGVan", label: "CNG Van" }, 
    { value: "SmallPetrolCar", label: "Small Petrol Car" },
    { value: "MediumPetrolCar", label: "Medium Petrol Car" },
    { value: "LargePetrolCar", label: "Large Petrol Car" }, 

  ]; 
  const travelVehicleMap = {
    'CarbonFootprintFromFlight': flightTypes,
    'CarbonFootprintFromCarTravel': carTypes,  // Assuming car doesn't have specific types in this example
    'CarbonFootprintFromMotorBike': motorBikeTypes,
    'CarbonFootprintFromPublicTransit': publicTransitTypes  // Assuming public transit doesn't have specific types in this example
  };

  const [distance, setDistance] = useState(0);
  const [travelMean, setTravelMean] = useState('CarbonFootprintFromFlight');
  const [co2Emissions, setCo2Emissions] = useState(0);
  const [vehicleType, setVehicleType] = useState('');


  const apiKey = '319e39cbbemsh0f75dee223acb16p1a21aejsnaf14af559a86';

  const handleCalculateEmissions = async () => {
    const url = 'https://carbonfootprint1.p.rapidapi.com/'+travelMean
    try {
      const response = await axios.get(url, {
        params: {
          distance: distance,
          type: vehicleType,
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com',
        },
      });

      setCo2Emissions(response.data.carbonEquivalent); // Access the 'carbonEquivalent' property
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>CO2 Emissions Calculator</h1>
      <form>
        <label>
          Distance (KM):
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </label>
        <br />
        <label>
          Travel Mean:
          <select value={travelMean} onChange={(e) => setTravelMean(e.target.value)}>
          {travelMeans.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Vehicle Type:
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
          {travelVehicleMap[travelMean].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handleCalculateEmissions}>
          Calculate CO2 Emissions
        </button>
      </form>
        <p>
          CO2 emissions for {distance} miles of {travelMean}: {co2Emissions} kg CO2
        </p>
    </div>
  );
}

export default App;
