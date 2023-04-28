import './App.css';
import { useState } from "react";
import { Country } from "country-state-city";

function App() {
  const [currentCountry, setCountry] = useState(null);
  const [name, setName] = useState("Welcome!");
  const [capital, setCapital] = useState(null);
  const [population, setPopulation] = useState(null);

  const countryOptions = Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.name
  }));

  function changeCountry(selectedOption) {
    setCountry(selectedOption);
    console.log(selectedOption.label);
    var req = new XMLHttpRequest();
    req.open('GET', '/search/' + selectedOption.label, true);
    req.onreadystatechange = function(){
      if (req.readyState === 4) {
        var jsonArray = JSON.parse(req.responseText);
        var jsonData = jsonArray[0];
        setName(jsonData.name.common);
        setCapital("Capital: "+jsonData.capital);
        setPopulation("Population: "+jsonData.population);
      }
    };
    req.send();
  }

  return (
    <div className="App">
      <div className="App-input-block">
        <h1 className="input-header">{name}</h1>
        <div className="input">
          <select
            value={currentCountry}
            onChange={(event) => changeCountry(event.target.selectedOptions[0])}
          >
            <option value={null}>Select a country</option>
            {countryOptions.map(option => (
              <option key={option.value} value={option}>{option.label}</option>
            ))}
          </select>
          {capital!==null?<p className='jsonData'>{capital}</p>:null}
          {population!==null?<p className='jsonData'>{population}</p>:null}
        </div>
      </div>
    </div>
  );
}

export default App;
