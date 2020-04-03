import React, { useRef } from 'react';
import Helmet from 'react-helmet';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';
import axios from 'axios';
import { geoJSON } from 'leaflet';

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;



const IndexPage = () => {

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    let response;

    try {
      response = await axios.get("https://corona.lmao.ninja/countries")
    } catch (e){
      console.log(`Failed to fecth information: ${e.message}`, e);
      return;
    }

    const {data = []} = response;
    const hasData = Array.isArray(data) && data.length > 0;
    console.log(data);

    if (!hasData) return;

    const geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [ lng, lat ]
          }
        }
      })
      
    }
   
    console.log(geoJson)

  }


  
  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}/>
     

      
    </Layout>
  );
};

export default IndexPage;
