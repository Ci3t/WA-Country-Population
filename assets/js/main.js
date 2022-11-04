const container = document.querySelector(".container");
const europe = document.querySelector("#europe");
const asia = document.querySelector("#asia");
const africa = document.querySelector("#africa");
const america = document.querySelector("#america");
const oceania = document.querySelector("#oceania");
const buttonContainer = document.querySelector('.button-container')
let regions = ["africa", "americas", "asia", "europe", "oceania"];
const continents = {};

const getFetchData = async (url) => {
  try {
    const fetchData = await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getRegions = async () => {
  let continent = [];
  for (let i = 0; i < regions.length; i++) {
    let region = axios.get(
      `https://restcountries.com/v3.1/region/${regions[i]}`,
    );

    continent.push(region);
  }
  let fpromise = Promise.all(continent).then((res) => {
    return res;
  });

  return fpromise;
};

const getCountries = async () => {
  let fetchCountries = await getRegions();

  let countryNames = [];
  for (let i = 0; i < fetchCountries.length; i++) {
    let countryCall = fetchCountries[i].data;

    for (let extract of countryCall) {
      let { name, region, borders, cca3, flags, population, subregion } =
        extract;

      countryNames.push({
        name,
        region,
        borders,

        cca3,
        flags,
        population,
        subregion,
      });
    }
  }
  return countryNames;
};

const getCountriesPostmanApi = async () => {
  const fetchCountryData = await axios.get(
    "https://countriesnow.space/api/v0.1/countries",
  );
  let countries = fetchCountryData.data.data;
  let fetchedCountries = [];
  for (let country1 of countries) {
    // console.log(country);
    let { country, cities } = country1;
    fetchedCountries.push({ country, cities });
  }
  return fetchedCountries;
};

const getCitiesFromPostmanApi = async () => {
  let countries = await getCountriesPostmanApi();
  console.log(countries);
};
//   getCitiesFromPostmanApi()
const getAsiaOnPage = async () => {
  let countries = await getCountries();

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].region == "Asia") {
      const p = document.createElement("p");
      container.appendChild(p);
      //   p.textContent = countries[i].name.common;
    }
  }
};

const getAmericaOnPage = async () => {
  let countries = await getCountries();

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].region == "Americas") {
      const p = document.createElement("p");
      container.appendChild(p);
      //   p.textContent = countries[i].name.common;
    }
  }
};
const getAfricaOnPage = async () => {
  let countries = await getCountries();
  console.log(countries);
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].region == "Africa") {
      const p = document.createElement("p");
      container.appendChild(p);
      //   p.textContent = countries[i].name.common;
    }
  }
};
const getEuropeOnPage = async () => {
  let countries = await getCountries();
  console.log(countries);
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].region == "Europe") {
      const p = document.createElement("p");
      container.appendChild(p);
      //   p.textContent = countries[i].name.common;
    }
  }
};
const getOceaniaOnPage = async () => {
  let countries = await getCountries();
  console.log(countries);
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].region == "Oceania") {
      const p = document.createElement("p");
      container.appendChild(p);
      //   p.textContent = countries[i].name.common;
    }
  }
};

//!todo`````````````````````````````````
const getfetchCities = async (countryName) => {
  let fetchedCities = [];
  let countries = await getCountries();
  let res;
  try{
   res = await fetch(
    "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: 10,
        order: "asc",
        orderBy: "name",
        country: `${countryName}`,
      }),
    },
  );
 
}catch{err=>console.log(err);}


  const data = await res.json();

//   if(data.error){
//     for(let country of countries){
      
//     console.log(country);
//     const response = await fetch(
//       "https://countriesnow.space/api/v0.1/countries/population/cities/filter",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           limit: 10,
//           order: "asc",
//           orderBy: "name",
//           country: `${country.name.official}`,
//         }),
//       },
//     );
//   }
// }

  // return data;
  // console.log(data);
  // let cities2 = []
  // for (let i = 0; i < data.data.length; i++) {
  //   // console.log(data.data[i]);

  //   let {city,country,populationCounts} = data.data[i]
  //   cities2.push({city,country,populationCounts})

  // }
  const cities = data.data.map((city) => {
    return {
      country: city.country,
      name: city.city,
      population: city.populationCounts[0].value,
    };
  });
  // console.log(cities);
  return cities;
};

console.log(getfetchCities('Italy'));

const printCities = async (str) => {
  // const data = await getfetchCities()
  const countries = await getCountries();

  let countryArr = [];
  let officialName = []
  for (let i = 0; i < countries.length; i++) {
    countryArr.push(countries[i].name.common);
    officialName.push(countries[i].name.official);
  }
  let country = [];
  countryArr.map(async (country) => {
    const data = await getfetchCities(country);
    

    for (let city of data) {
      let { country, city, population } = city;
      country.push({ country, city, population });
      
    }
  });
  console.log(await country);
};
// console.log(printCities());
// const printCitiesTest = async(str) => {
//   const cities = await printCities('Italy')
//   for(let city of cities.data){
//     console.log(city);
//   }
// }
// printCitiesTest()
// const getCities = async () => {
//   let countries = await getCountries();

//   // for(let box in countries)
//   // console.log(countries[0]);
//   let cities = [];
//   let cName1;
//   for (let i = 0; i < countries.length; i++) {
//     let cName = countries[i].name.common;

//     // const citiess = city.data.map((city)=>{
//     //     return {name:city.city,population:city,populationCounts};

//     // })
//     try {
//     const city = await getfetchCities(cName);

//       for (let x = 0; x < city.data.length; x++) {

//         let cityBlock = city.data[x].city
//         let  population = city.data[x].populationCounts
//         cities.push({cityBlock,population})
//       }
//     } catch {
//       (err) => console.log(err);
//     }
//   }
//   console.log(cities);
// };
// getCities();

//!todo``````````````````````


 

  const getAfricaButtons = async (str) => {
    buttonContainer.replaceChildren([])
    const countries = await getCountries();

    container.appendChild(buttonContainer);
    for (let country of countries) {
     
        if (country.region == str) {
          const button = document.createElement("button");
          buttonContainer.appendChild(button);
          button.textContent = country.name.common;
          
        } else {
        
        }
     
    }
  };
  const getAsiaButtons = async () => {
    buttonContainer.replaceChildren([])
    const countries = await getCountries();
   
   
    container.appendChild(buttonContainer);
    for (let country of countries) {
      if (country.region == "Asia") {
        const button = document.createElement("button");
        buttonContainer.appendChild(button);
        button.textContent = country.name.common;
   
      } 
    }
  };
  const getAmericaButtons = async () => {
    
    buttonContainer.replaceChildren([])
    const countries = await getCountries();
   
   
    container.appendChild(buttonContainer);
    for (let country of countries) {
      if (country.region == "Americas") {
        const button = document.createElement("button");
        buttonContainer.appendChild(button);
        button.textContent = country.name.common;
      }
    }
  };
  const getOceaniaButtons = async () => {
    buttonContainer.replaceChildren([])
    const countries = await getCountries();
  

    container.appendChild(buttonContainer);
    for (let country of countries) {
      if (country.region == "Oceania") {
        const button = document.createElement("button");
        buttonContainer.appendChild(button);
        button.textContent = country.name.common;
      }
    }
  };
  const getEuropeButtons = async () => {
    buttonContainer.replaceChildren([])
    const countries = await getCountries();

  
  
    container.appendChild(buttonContainer);
    for (let country of countries) {
      // if(){
      //   buttonConitaner.classList.add('hide')
      // }
      if (country.region == "Europe") {
        const button = document.createElement("button");
        buttonContainer.appendChild(button);
        buttonContainer.classList.add('show-eu')
        button.textContent = country.name.common;
        buttonContainer.classList.remove('hide')
        
      }
      // if(buttonConitaner.contains(country.name.common) == ){
      //   countryButton = false;
      //   buttonConitaner.classList.add('hide')
      //   // button.classList.add('hide')
      // }


      console.log(country);
    }

  };


const eventListeners = () => {
const buttonConitaner = document.querySelector('#button-container')
 

  asia.addEventListener("click", (e) => {
    if (e.target.id == "asia") {

      getAsiaButtons();
      dummyChartData("Asia");
    }
  });
  africa.addEventListener("click", (e) => {

    if (e.target.id == "africa") {

        getAfricaButtons('Africa');
        dummyChartData("Africa");
     
      
    }
  });
  europe.addEventListener("click", (e) => {
    if (e.target.id == "europe") {

      getEuropeButtons();
      dummyChartData("Europe");
    }
  });
  oceania.addEventListener("click", (e) => {
    if (e.target.id == "oceania") {

      getOceaniaButtons();
      dummyChartData("Oceania");
    }
  });
  america.addEventListener("click", (e) => {
    if (e.target.id == "america") {
      dummyChartData("Americas");
 
      getAmericaButtons();
    }
  });
};

const getCityByCountryButton = async () => {
  const Conitaner = document.querySelector(".container");

  const countries = await getCountries();
  const ctx = document.getElementById("myChart").getContext("2d");


  let countryArr = [];
  let regionArr = [];
  let cityCountry = [];
 

  Conitaner.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;

      for (let i = 0; i < countries.length; i++) {
        console.log(countries[i]);
        countryArr.push(countries[i].name.common);
        regionArr.push(countries[i]);
       
        // currentCitiesBorders.push(countries[i].borders);
      }


      for (let country of countryArr) {
        
  
        try {
          if (button.textContent == country) {
            const data = await getfetchCities(country);

            for (let city of data) {

              let { country, name, population } = city;
 
              cityCountry.push({ country, name, population });
            }
          }
        } catch {
          (err) => console.log(err);
        }
      }
      cityCountry = cityCountry.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.country === value.country && t.name === value.name,
          ),
      );
   
            // console.log(currentCitiesTag);
      let currentCities = [];
      let currentPopulation = [];
      let currentBorders = [];
      for (let city of cityCountry) {
        // console.log(`country ${city}`);
        let { name, country, population } = city;

        if (button.textContent == country) {

   


          currentCities.push(name);
          currentPopulation.push(population);

        }
  
        ;
      }

     
      let chart22 = Chart.getChart("myChart");
      let chartStatus2 = Chart.getChart("myChart");
      if (chartStatus2 != undefined) {
        chartStatus2.destroy();
      }
   
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: currentCities,
          datasets: [
            {
              label: "Population",
              data: currentPopulation,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })


    }
  });
};
getCityByCountryButton();


eventListeners();

//!--------------------Chart.Js-----------------//

let array = [];

const dummyChartData = async (str) => {
  const cityArray = await getCountries();
  const ctx = document.getElementById("myChart").getContext("2d");
  let euArray = [];
  let euPopArray = [];

  let borderArray = []

 

  for (let i = 0; i < cityArray.length; i++) {

    if (cityArray[i].region == str) {
      euArray.push(cityArray[i].name.common);
      euPopArray.push(cityArray[i].population);
      const tag = cityArray[i].cca3
      const border = cityArray[i].borders
      const name = cityArray[i].name.common
      borderArray.push({name,border,tag});
    }
    // if (cityArray[i].region == str) {
    // }
  }
  // for(let border of borderArray){
  //   console.log(border);
  //   let {name,border,tag}= border
  //   if(name ==)
  // }

  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: euArray,
      datasets: [
        {
          label: "Population",
          data: euPopArray,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  // console.log(`Eu Arr : ${euArray}`);
  // console.log(`Eu Arr : ${euPopArray}`);
};
