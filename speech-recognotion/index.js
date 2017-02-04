  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      p.textContent = poopScript;

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);

        let weather = transcript.match(/weather in (.*)/gi);

        if(weather) {
          let city = weather[0].split(' ')[2];

          fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e659df8d528a4a19ebb199810cd59ddd`)
                .then(response => response.json())
                .catch(e => console.log(e))
                .then(data => showWeather(data));
          }
      }
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();

  function showWeather(data) {
    const city = data.name;
    const temp = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;

    const weatherText = `Weather in ${city}: ${temp} °C, ${description}`;

    document.querySelector('.weather').textContent = weatherText;
  }
