import { useEffect, useState } from "react";


export default function App() {
  const [countries, setCountries] = useState([]);
  const [search,setSearch] = useState("");
  const [filteredCountries,setFilteredCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async()=>{
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
  } catch (err) {
      console.log("Error fetching data: ", err);
  }}
  fetchCountries()
  }, []);
  useEffect(()=>{
    if(search === ""){
      setFilteredCountries(countries)
    }
    else{
      setFilteredCountries(countries.filter((country)=>{return country.name.common.toLowerCase().includes(search.toLowerCase())}))
    }
  },[search,countries])
  const countryCard = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const searchstyle ={
    width:"500px",
    height:"30px",
    marginTop:"10px"
  }
  const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
  return (
    <div style={container}>
    <div ><input style={searchstyle} type="text" value={search} onChange={(e)=>{
      setSearch(e.target.value)
    }} placeholder="Search for countries..."/></div>
    <div style={containerStyle}>
      {filteredCountries.map((country) => (
        <div key={country.cca3} className="countryCard" style={countryCard}>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={imageStyle}
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
    </div>
  );
}
