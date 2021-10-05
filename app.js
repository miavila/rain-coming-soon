var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var desc2 = document.querySelector('.desc2');
var button = document.querySelector('.submit');
var apiKey = "";

button.addEventListener('click', function () {
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&units=metric&lang=es&appid=' + apiKey;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var latValue = data['coord']['lat'];
      var lonValue = data['coord']['lon'];

      var tempValue = data['main']['temp'];
      var nameValue = data['name'];
      var descValue = data['weather'][0]['description'];
      var iconValue = data['weather'][0]['icon'];

      main.innerHTML = "Previsio avui a: " + nameValue;
      desc.innerHTML = "Desc - " + descValue;
      temp.innerHTML = "Temp - " + tempValue;
      document.getElementById("imgIcon").src = 'http://openweathermap.org/img/wn/' + iconValue + '@2x.png';
      input.value = "";
      console.log(data);
      var url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latValue + '&lon=' + lonValue + '&%20exclude=hourly,daily&lang=es&appid=c34a1885feb2bd31392fac5166e8d8db';
      proximaHora(url2);
    })
    .catch(err => alert("Wrong city name!"));

  function proximaHora(url2) {
    fetch(url2)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var hora = 0;
        for (hora = 0; hora < 2; hora++) {
          var descValue2 = data['hourly'][hora]['weather'][0]['description'];
          var iconValue2 = data['hourly'][hora]['weather'][0]['icon'];
          var rain = data['hourly'][hora]['rain'];
          if (typeof rain == 'undefined'){
            var rain = "0";
          } else {
            var rain = data['hourly'][hora]['rain']['1h'];
            console.log("lluvia" + rain);
          }
          console.log(descValue2);
          function Unix_timestamp(t) {
            var dt = new Date(t * 1000);
            var hr = dt.getHours();
            var m = "0" + dt.getMinutes();
            var s = "0" + dt.getSeconds();
            return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
          }

          var newDiv = document.createElement("div");
          var descripcion = document.createElement("p")

          descripcion.innerHTML = Unix_timestamp(data['hourly'][hora]['dt'])+ " - " + descValue2 + " - Prob. lluvia: " + rain;
          var imagen = document.createElement("img");
          imagen.setAttribute("src", "http://openweathermap.org/img/wn/" + iconValue2 + "@2x.png")
          document.getElementById("proximasHoras").appendChild(newDiv)
          newDiv.appendChild(imagen)
          newDiv.appendChild(descripcion)

        }
      })
  }
})


