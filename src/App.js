import React, { useState } from 'react';
import { GiTreeBranch, GiPathDistance } from "react-icons/gi";
import { FaPlane, FaCar, FaBus } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { MdDirectionsRailway } from "react-icons/md";
import { FaFerry } from "react-icons/fa6";
import BarChart from "./components/BarChart"; 
import { FaTree } from 'react-icons/fa';
import { FcGlobe } from "react-icons/fc";
import axios from 'axios';




function App() {

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

  const busTypes = [
    { value: "ClassicBus", label: "Classic Bus" },
    { value: "Coach", label: "Coach" }
  ];

  const ferryTypes = [
    { value: "FerryOnFoot", label: "Ferry On Foot" },
    { value: "FerryInCar", label: "Ferry In Car" }
  ];

  const railwayTypes = [
    { value: "NationalTrain", label: "National Train" },
    { value: "LightRail", label: "Light Rail" },
    { value: "Subway", label: "Subway" }
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
    { value: "LargePetrolCar", label: "Large Petrol Car" }

  ]; 
  const apiKey = 'f0971ecee8msh7fc7b4f891eb1e7p190eeajsn3fe1ee4d469d';

  const [distance, setDistance] = useState(0);
  const [travelMean, setTravelMean] = useState('CarbonFootprintFromFlight');
  const [travelMode, setTravelMode] = useState('plane');
  const [userEmissions, setUserEmissions] = useState(0);
  const [vehicleType, setVehicleType] = useState('DomesticFlight');
  const [publicTransitTypes, setPublicTransit] = useState('');
  const [averageEmissions, setAverageEmissions] = useState(0);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);



  const travelVehicleMap = {
    'CarbonFootprintFromFlight': flightTypes,
    'CarbonFootprintFromCarTravel': carTypes,  // Assuming car doesn't have specific types in this example
    'CarbonFootprintFromMotorBike': motorBikeTypes,
    'CarbonFootprintFromPublicTransit': publicTransitTypes  // Assuming public transit doesn't have specific types in this example
  };

  const averagesEmission = {
    'plane': 0.34, 
    'car': 0.47,
    'bus': 0.39,
    'motorbike': 0.4,
    'railway': 0.3,
    'ferry': 0.4,
  };

  const handleIconClick = (input) => {
    setTravelMode(input)
    switch (input) {
      case 'plane':
        setTravelMean('CarbonFootprintFromFlight');
        break;
      case 'car':
        setTravelMean('CarbonFootprintFromCarTravel');
        break;
      case 'bus':
        setTravelMean('CarbonFootprintFromPublicTransit');
        setPublicTransit(busTypes)
        break;
      case 'motorbike':
        setTravelMean('CarbonFootprintFromMotorBike');
        break;
      case 'railway':
        setTravelMean('CarbonFootprintFromPublicTransit');
        setPublicTransit(railwayTypes)
        break;
      case 'ferry':
        setTravelMean('CarbonFootprintFromPublicTransit');
        setPublicTransit(ferryTypes)

        break;
      default:
        setTravelMean('CarbonFootprintFromFlight');
        break;
    }
  };

  const handleCalculateEmissions = async () => {
    const url = 'https://carbonfootprint1.p.rapidapi.com/' + travelMean;
    setAverageEmissions(distance * averagesEmission[travelMode]);
    const distanceInKilometers = Math.ceil(distance * 1.60934);
    setHasBeenClicked(true);
  
    try {
      const response = await axios.get(url, {
        params: {
          distance: distanceInKilometers,
          type: vehicleType,
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com',
        },
      });
      const kgEmissions = response.data.carbonEquivalent;
      const lbsEmissions = Math.round(kgEmissions * 2.205);
      setUserEmissions(lbsEmissions);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <div className="navbar">
          <div className="logo">
            <GiTreeBranch  color="green" size="35px"/>
            <p>Bsustainable</p>
          </div>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#home">Home</a>
              </li>
            </ul>
          </nav>
      </div>
      <div className="page-container">
        <div className="page-content">
        <form> 
          <br />
          <div className="container">
          <h1 style={{color: 'rgb(14, 123, 99)'}}>CO2 Emissions Calculator</h1>

            <div className="mode-container">
              <label> Travel Mean:</label>
                <div className="icon-container">
                    <FaPlane
                      size="35px"
                      color= "black"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleIconClick('plane')}
                    />
                    <FaCar
                      size="35px"
                      color= "darkblue"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleIconClick('car')}
                    />
                    <FaBus
                      size="35px"
                      color="goldenrod"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleIconClick('bus')}
                    />
                    <RiMotorbikeFill
                      size="35px"
                      color= "darkred"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleIconClick('motorbike')}
                    />
                    <MdDirectionsRailway
                      size="35px"
                      color="darkgreen"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleIconClick('railway')}
                    />
                    <FaFerry
                      size="35px"
                      color="darkorange"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleIconClick('ferry')}
                    />
                </div>
              </div>
          <br />
            <label>
            <p style={{ display: 'inline-block', margin: '10px' }}>Vehicle Type:</p>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} style={{ paddingLeft: 'right' }}>
              {travelVehicleMap[travelMean].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          <br />

            <label>
            <p style={{ display: 'inline-block', margin: '10px' }}>Distance(mi): </p>
              <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)}  />
            </label>
          <br />
          <button type="button" onClick={handleCalculateEmissions}>
            Calculate CO2 Emissions
          </button>
          </div>

        </form>

        </div>
        {hasBeenClicked ? (
          <div style={{ width: '50%', margin: 'auto' }}>
            <h3>Your Emissions Compared to your transport mode average</h3>
            <BarChart averageEmissions={averageEmissions} userEmissions={userEmissions} />
          </div>
        ) : (
          <div style={{ width: '50%', margin: 'auto' }}>
         <FcGlobe  size= "60%"/>
         </div>
        )}
        </div>

      {hasBeenClicked && (
        <div>
          <h2>
            Your trip produces {userEmissions} lbs of CO2   
          </h2>
          {userEmissions <= averageEmissions ? (
              <h2 style={{ color: 'darkblue' }}>
                You are emitting less CO2 than the average for your transport mode. Keep being sustainable! 👏💅
              </h2>
                ) : (
              <h2 style={{ color: 'darkblue' }}>
                You are emitting more CO2 than the average for your transport mode. Try to find more sustainable travel modes! 😞
              </h2>
        )}          
        <h2 style ={{color:'darkblue'}}>
        Fun Fact: If you plant {Math.ceil(userEmissions / 48)} <FaTree color="darkgreen" /> trees today, in a year you would have offset your emission from this trip!
        </h2>
        </div>
      )}

    </div>
  );
}

export default App;
