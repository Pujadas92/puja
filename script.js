const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city!');
        return;
    }

    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherDisplay.textContent = 'City not found!';
            } else {
                const { name } = data;
                const { temp } = data.main;
                const { description } = data.weather[0];

                weatherDisplay.innerHTML = `
                    <h3>${name}</h3>
                    <p>Temperature: ${temp}°C</p>
                    <p>Condition: ${description}</p>
                `;
            }
        })
        .catch(() => {
            weatherDisplay.textContent = 'Error fetching weather data!';
        });
});
