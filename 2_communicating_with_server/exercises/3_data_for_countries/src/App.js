import axios from 'axios';
import { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://restcountries.com/v3.1/all';

const Find = ({searchText, onChange}) => {
  return <p>find countries <input onChange={onChange} value={searchText}/></p>
}

const CountryName = ({name, showSingleCountry}) => {
  return <li>{name} <button onClick={(e) => {showSingleCountry(e, name)}}>show</button></li>
}

const CountryList = ({countries, showSingleCountry}) => {
  return countries.map(country => {
    const name = country.name.common;
    return <CountryName key={name} name={name} showSingleCountry={showSingleCountry}/>
  });
}

const CountryDetails = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = Object.values(country.languages);
  const flag = country.flag.png;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital : {capital}</p>
      <p>area : {area}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flag} alt='flag'/>
    </div>
  )
}

const DisplayCountries = ({selectedCountries , showSingleCountry}) => {
  const numSelectedCountries = selectedCountries.length;
  if (numSelectedCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (numSelectedCountries > 1) {
    return <CountryList countries={selectedCountries} showSingleCountry={showSingleCountry}/>
  } else if (numSelectedCountries === 1) {
    return <CountryDetails country={selectedCountries[0]}/>
  }
}

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINT)
         .then(response => {
          setCountriesData(response.data);
         });
  }, []);

  const updateSelectedCountries = (input) => {
    input = input.toLowerCase().trim();
    let filteredCountries;
    if (input === '') {
      filteredCountries = [];
    } else {
      filteredCountries = countriesData.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.startsWith(input);
      });
    }
    setSelectedCountries(filteredCountries);
  }

  const handleSearchTextChange = (event) => {
    const input = event.target.value;
    setSearchText(input);
    updateSelectedCountries(input);
  }

  const handleShowSingleCountry = (event, name) => {
    event.preventDefault();
    updateSelectedCountries(name);
  }

  return (
    <div>
      <div>
        <p>debug</p>
        <p>searchText : {searchText}</p>
        <p>n_selectedCounties : {selectedCountries.length}</p>
      </div>
      <Find onChange={handleSearchTextChange} searchText={searchText}/>
      <DisplayCountries selectedCountries={selectedCountries}
                        showSingleCountry={handleShowSingleCountry} />
    </div>
  )
}

export default App;
