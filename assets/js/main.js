const container = document.querySelector(".container");
const europe = document.querySelector("#europe");
const asia = document.querySelector("#asia");
const africa = document.querySelector("#africa");
const america = document.querySelector("#america");
const oceania = document.querySelector("#oceania");

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
      let { name, region, borders, ccn3, flags, population, subregion } =
        extract;

      countryNames.push({
        name,
        region,
        borders,

        ccn3,
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

  const res = await fetch(
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

  const data = await res.json();

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

// console.log(getfetchCities('Italy'));

const printCities = async (str) => {
  // const data = await getfetchCities()
  const countries = await getCountries();

  let countryArr = [];
  for (let i = 0; i < countries.length; i++) {
    countryArr.push(countries[i].name.common);
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
const getAfricaButtons = async () => {
  const countries = await getCountries();
  const buttonConitaner = document.createElement("div");
  buttonConitaner.id = "button-container";
  container.appendChild(buttonConitaner);
  for (let country of countries) {
    if (country.region == "Africa") {
      const button = document.createElement("button");
      buttonConitaner.appendChild(button);
      button.textContent = country.name.common;
    }
  }
};
const getAsiaButtons = async () => {
  const countries = await getCountries();
  const buttonConitaner = document.createElement("div");
  buttonConitaner.id = "button-container";
  container.appendChild(buttonConitaner);
  for (let country of countries) {
    if (country.region == "Asia") {
      const button = document.createElement("button");
      buttonConitaner.appendChild(button);
      button.textContent = country.name.common;
    }
  }
};
const getAmericaButtons = async () => {
  const countries = await getCountries();
  const buttonConitaner = document.createElement("div");
  buttonConitaner.id = "button-container";
  container.appendChild(buttonConitaner);
  for (let country of countries) {
    if (country.region == "Americas") {
      const button = document.createElement("button");
      buttonConitaner.appendChild(button);
      button.textContent = country.name.common;
    }
  }
};
const getOceaniaButtons = async () => {
  const countries = await getCountries();
  const buttonConitaner = document.createElement("div");
  buttonConitaner.id = "button-container";
  container.appendChild(buttonConitaner);
  for (let country of countries) {
    if (country.region == "Oceania") {
      const button = document.createElement("button");
      buttonConitaner.appendChild(button);
      button.textContent = country.name.common;
    }
  }
};
const getEuropeButtons = async () => {
  const countries = await getCountries();
  const buttonConitaner = document.createElement("div");
  buttonConitaner.id = "button-container";
  container.appendChild(buttonConitaner);
  for (let country of countries) {
    if (country.region == "Europe") {
      const button = document.createElement("button");
      buttonConitaner.appendChild(button);
      button.textContent = country.name.common;
    }
  }
};
// paintPageButtons()
// paintPage()

const eventListeners = () => {
  // const p = document.querySelectorAll(".container p");
  // container.addEventListener('click',(e)=>{

  // })
  asia.addEventListener("click", (e) => {
    if (e.target.id == "asia") {
      // getAsiaOnPage();

      getAsiaButtons();
      dummyChartData("Asia");
    }
  });
  africa.addEventListener("click", (e) => {
    if (e.target.id == "africa") {
      // getAfricaOnPage();
      getAfricaButtons();
      dummyChartData("Africa");
    }
  });
  europe.addEventListener("click", (e) => {
    if (e.target.id == "europe") {
      // getEuropeOnPage();
      getEuropeButtons();
      dummyChartData("Europe");
    }
  });
  oceania.addEventListener("click", (e) => {
    if (e.target.id == "oceania") {
      // getOceaniaOnPage();
      getOceaniaButtons();
      dummyChartData("Oceania");
    }
  });
  america.addEventListener("click", (e) => {
    if (e.target.id == "america") {
      dummyChartData("Americas");
      // getAmericaOnPage();
      getAmericaButtons();
    }
  });
};

const getCityByCountryButton = async () => {
  const Conitaner = document.querySelector(".container");
  // const cities = await getfetchCities();
  const countries = await getCountries();
  const ctx = document.getElementById("myChart").getContext("2d");
  // console.log(cities);

  let countryArr = [];
  let regionArr = [];
  let cityCountry = [];
  let currentCitiesBool = true
  let currentCities = []
  let currentPopulation = []
  Conitaner.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target;

      // console.log(button);
      for (let i = 0; i < countries.length; i++) {
        // console.log(countries[i]);
        countryArr.push(countries[i].name.common);
        regionArr.push(countries[i]);
      }
      // console.log(countryArr);
      
     
      for (let country of countryArr) {
      // for (let i = 0; i < countryArr.length; i++) {
        // console.log(countryArr[i]);
        try {
          if (button.textContent == country) {
            const data = await getfetchCities(country);
            // console.log(data[0].name);
            // console.log('yes');
            for (let city of data) {
              // console.log(city);
              // console.log(city);
              let { country, name, population } = city;
              // console.log(name);
              cityCountry.push({ country, name, population });
           
            }
          }
        } catch {
          (err) => console.log(err);
        }

      }
      cityCountry = cityCountry.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.country === value.country && t.name === value.name
      ))
    )
        console.log(currentCities);
    for(let city of cityCountry){

      let{name,country,population} = city
      console.log(`country ${country}`);

      if(button.textContent == country){
        
        if(currentCities.includes(city)){
          currentCities =[]
          currentPopulation= []
          
        }else{
          currentCities.push(name)
          currentPopulation.push(population)
        }
      }
      
  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
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
  });
    }
        
      
      // for (let i=0;i<countries.length;i++) {
      //     // console.log(countries[i].name.common);

      //       // console.log(countries[i].name);
      //       // return data

      //     // Object.assign(countryArr, data)
      //   }
      // let countryArr = [];
      // for (let country of countries) {
      //   countryArr.push(country.name.common);
      // }
      // for (let city of countryArr) {
      //   console.log(city);
      //   if(button.textContent == await getfetchCities(city)){
      //     console.log('yes');
      //   }
      // }
    }
    
  });
};
getCityByCountryButton();

const testCities = async (str) => {
  const city = await getCityByCountryButton();

  console.log(city);

  // let chartStatus = Chart.getChart("myChart");
  // if (chartStatus != undefined) {
  //   chartStatus.destroy();
  // }

  // const myChart = new Chart(ctx, {
  //   type: "bar",
  //   data: {
  //     labels: euArray,
  //     datasets: [
  //       {
  //         label: "Population",
  //         data: euPopArray,
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // });
};
// console.log(testCities());
eventListeners();

//!--------------------Chart.Js-----------------//

let array = [];

const dummyChartData = async (str) => {
  const cityArray = await getCountries();
  const ctx = document.getElementById("myChart").getContext("2d");
  let euArray = [];
  let euPopArray = [];

  for (let i = 0; i < cityArray.length; i++) {
    // console.log(country);
    if (cityArray[i].region == str) {
      euArray.push(cityArray[i].name.common);
    }
    if (cityArray[i].region == str) {
      euPopArray.push(cityArray[i].population);
    }
  }
  // console.log(euArray);

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
// console.log(array);
// arrayTestChar();
