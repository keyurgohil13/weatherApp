const apiKey = "BC7QV7VH2NLTYGLQZFJN6KF5J";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;

console.log(url);
async function getWeatherByLocation(city){

        console.log(url(city));

         const resp = await fetch(url(city), {
             origin: "cros" });
         const respData = await resp.json();
            console.log(respData);
           addWeatherToPage(respData);
          
     }

      function addWeatherToPage(data){
        console.log("data",data);
          const temp = Ftoc(data.currentConditions.temp);
          console.log("temp",temp);

          const weather = document.createElement('div')
          weather.classList.add('weather');

          weather.innerHTML = `
          <h2><img src="https://weather.visualcrossing.com/img/wn/${data.currentConditions.icon}@2x.png" /> ${temp}°C <img src="https://weather.visualcrossing.com/img/wn/${data.currentConditions.icon}@2x.png" /></h2>
          <small>${data.currentConditions.main}</small>
          
          `;


        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
      };


     function Ftoc(F){
        console.log("F >>", F);
         return Math.floor((F-32) * 5/9 );
     }



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });
