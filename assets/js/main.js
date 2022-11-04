const container = document.querySelector(".container");
const europe = document.querySelector("#europe");
const asia = document.querySelector("#asia");
const africa = document.querySelector("#africa");
const america = document.querySelector("#america");
const oceania = document.querySelector("#oceania");
const buttonContainer = document.querySelector('.button-container')
const loader = document.querySelector('.loader')

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


  const cities = data.data.map((city) => {
    return {
      country: city.country,
      name: city.city,
      population: city.populationCounts[0].value,
    };
  });

  return cities;
};

console.log(getfetchCities('Italy'));

const printCities = async (str) => {

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
   
      if (country.region == "Europe") {
        const button = document.createElement("button");
        buttonContainer.appendChild(button);
        buttonContainer.classList.add('show-eu')
        button.textContent = country.name.common;
        buttonContainer.classList.remove('hide')
        
      }
   


      console.log(country);
    }
   

  };

  const setSpinner = (bool) => {
    if (bool) {
      const spinner = document.createElement("div");
      spinner.className = 'spinner'
     
      loader.prepend(spinner);
    } else {
      const spinner = document.querySelector(".spinner");
      loader.removeChild(spinner);
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
      setSpinner(true)
      for (let i = 0; i < countries.length; i++) {
        console.log(countries[i]);
        countryArr.push(countries[i].name.common);
        regionArr.push(countries[i]);
       
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
   

      let currentCities = [];
      let currentPopulation = [];
      let currentBorders = [];
      for (let city of cityCountry) {

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
      setSpinner(false)
      const myChart = new Chart(ctx, {
        type: "line",
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
              color:"rgba(255, 159, 64, 1)",
            },
            
          ],
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          plugins: { 
            legend: {
              labels: {
                color: "#E4C1F9",  
            
                font: {
                  size: 14 
                }
              }
            }
          },
          
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: ["#FF99C8","#FCF6BD","#D0F4DE","#A9DEF9","#E4C1F9"], 
                // fontSize: 18,
                font: {
                  size: 14, 
                },
              },
              
            },
            x:{
              ticks: {
                color: ["#FF99C8","#FCF6BD","#D0F4DE","#A9DEF9","#E4C1F9"], 
              
                font: {
                  size: 14, 
                },
              },
            }
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
   
  }
 

  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  const myChart = new Chart(ctx, {
    type: "line",
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
      animations: {
        tension: {
          duration: 1000,
          easing: 'easeInOutQuad',
          from: 1,
          to: 0,
          loop: true
        }
      },
      plugins: { 
        legend: {
          labels: {
            color: "#FFAFCC",  
           
            font: {
              size: 14 
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: ["#CDB4DB","#FFC8DD","#FFAFCC","#BDE0FE","#A2D2FF"], 
    
            font: {
              size: 14, 
            },
          },
          
        },
        x:{
          ticks: {
            color: ["#CDB4DB","#FFC8DD","#FFAFCC","#BDE0FE","#A2D2FF"],
    
            font: {
              size: 14, 
            },
          },
        }
      },
    },
  });

};
