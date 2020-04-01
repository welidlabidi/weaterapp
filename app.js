//to not show the cards before rending a city

document.getElementById("container").style.display = "none";
// making an array of weekdays
let weekDay = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

document.getElementById("input").addEventListener("input", async event => {
  const apiKey = "e771e8e6a985601ac3b1da6821bd3122";
  const city = event.target.value;

  //fetch wheatercast for 5days
  const days = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey} `
  );
  const data = await days.json();
  nextday(data);

  function nextday(day) {
    // click button to show the details of the card
    document.getElementById("btn").addEventListener("click", function() {
      for (i = 0; i < 5; i++) {
        let date = new Date(day.list[i * 8].dt_txt).getDay();

        // fetch icon
        const imgIcon = data.list[0].weather[0].icon;
        const urlIcon =
          "http://openweathermap.org/img/wn/" + imgIcon + "@2x.png";
        let sliceWeek = weekDay[date].slice(0, 3);
        const headerTemp = Math.floor(day.list[i * 8].main.temp);

        // change card with inneHTML with fetch data
        document.getElementById("card-temp" + [i]).innerHTML = headerTemp + "°";
        document.getElementById("card-title" + [i]).innerHTML = sliceWeek;
        document.getElementById("card-text" + [i]).innerHTML =
          day.list[i * 8].weather[0].description;
        document.getElementById("max-temp" + [i]).innerHTML =
          "Max: " + " " + data.list[i * 8].main.temp_max + "°";
        document.getElementById("min-temp" + [i]).innerHTML =
          "Min: " + " " + data.list[i * 8].main.temp_min + "°";
        document.getElementById("feels" + [i]).innerHTML =
          "Feels like: " + data.list[i * 8].main.feels_like + "°";
        document.getElementById("speed" + [i]).innerHTML =
          "Wind speed: " + data.list[i * 8].wind.speed;
        document.getElementById("humidity" + [i]).innerHTML =
          "Humidity: " + data.list[i * 8].main.humidity;
        document.getElementById("img" + [i]).src = urlIcon;
      }

      // to show the cards when rending and clicking on search
      document.getElementById("container").style.display = "block";
    });
  }
});
