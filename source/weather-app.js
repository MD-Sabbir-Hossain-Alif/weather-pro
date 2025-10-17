// Weather API Configuration
const WEATHER_API_KEY = '86dc8ab1e5ce6a784ee1661553b9e752'; // OpenWeatherMap API key
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Fallback sample data for demo purposes
const sampleWeatherData = {
    'dhaka': {
        city: 'Dhaka, Bangladesh',
        current: {
            temp: 28,
            desc: 'Partly Cloudy',
            icon: '⛅',
            feelsLike: 32,
            humidity: 65,
            wind: 12,
            precipitation: 20,
            visibility: 10,
            pressure: 1013
        },
        hourly: [{
                time: 'Now',
                temp: 28,
                icon: '⛅'
            },
            {
                time: '2 PM',
                temp: 30,
                icon: '☀️'
            },
            {
                time: '3 PM',
                temp: 32,
                icon: '☀️'
            },
            {
                time: '4 PM',
                temp: 31,
                icon: '⛅'
            },
            {
                time: '5 PM',
                temp: 29,
                icon: '⛅'
            },
            {
                time: '6 PM',
                temp: 27,
                icon: '🌤️'
            },
            {
                time: '7 PM',
                temp: 25,
                icon: '🌙'
            },
            {
                time: '8 PM',
                temp: 24,
                icon: '🌙'
            }
        ],
        weekly: [{
                day: 'Today',
                high: 32,
                low: 24,
                icon: '⛅',
                desc: 'Partly Cloudy'
            },
            {
                day: 'Saturday',
                high: 30,
                low: 22,
                icon: '🌧️',
                desc: 'Light Rain'
            },
            {
                day: 'Sunday',
                high: 28,
                low: 20,
                icon: '⛈️',
                desc: 'Thunderstorm'
            },
            {
                day: 'Monday',
                high: 31,
                low: 23,
                icon: '☀️',
                desc: 'Sunny'
            },
            {
                day: 'Tuesday',
                high: 29,
                low: 21,
                icon: '⛅',
                desc: 'Partly Cloudy'
            },
            {
                day: 'Wednesday',
                high: 27,
                low: 19,
                icon: '🌧️',
                desc: 'Rainy'
            },
            {
                day: 'Thursday',
                high: 33,
                low: 25,
                icon: '☀️',
                desc: 'Hot & Sunny'
            }
        ]
    },
    'rangpur': {
        city: 'Rangpur, Bangladesh',
        current: {
            temp: 25,
            desc: 'Clear Sky',
            icon: '☀️',
            feelsLike: 28,
            humidity: 58,
            wind: 8,
            precipitation: 5,
            visibility: 12,
            pressure: 1015
        },
        hourly: [{
                time: 'Now',
                temp: 25,
                icon: '☀️'
            },
            {
                time: '2 PM',
                temp: 27,
                icon: '☀️'
            },
            {
                time: '3 PM',
                temp: 29,
                icon: '☀️'
            },
            {
                time: '4 PM',
                temp: 28,
                icon: '🌤️'
            },
            {
                time: '5 PM',
                temp: 26,
                icon: '🌤️'
            },
            {
                time: '6 PM',
                temp: 24,
                icon: '🌙'
            },
            {
                time: '7 PM',
                temp: 22,
                icon: '🌙'
            },
            {
                time: '8 PM',
                temp: 21,
                icon: '🌙'
            }
        ],
        weekly: [{
                day: 'Today',
                high: 29,
                low: 21,
                icon: '☀️',
                desc: 'Clear Sky'
            },
            {
                day: 'Saturday',
                high: 31,
                low: 23,
                icon: '☀️',
                desc: 'Sunny'
            },
            {
                day: 'Sunday',
                high: 28,
                low: 20,
                icon: '⛅',
                desc: 'Partly Cloudy'
            },
            {
                day: 'Monday',
                high: 26,
                low: 18,
                icon: '🌧️',
                desc: 'Light Rain'
            },
            {
                day: 'Tuesday',
                high: 30,
                low: 22,
                icon: '🌤️',
                desc: 'Partly Sunny'
            },
            {
                day: 'Wednesday',
                high: 32,
                low: 24,
                icon: '☀️',
                desc: 'Hot & Sunny'
            },
            {
                day: 'Thursday',
                high: 27,
                low: 19,
                icon: '⛅',
                desc: 'Cloudy'
            }
        ]
    }
};

// Weather icon mapping
function getWeatherIcon(weatherCode, isDay = true) {
    const iconMap = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '🌤️',
        '02n': '☁️',
        '03d': '⛅',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌧️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️'
    };
    return iconMap[weatherCode] || (isDay ? '☀️' : '🌙');
}

// Fetch weather data from API
async function fetchWeatherData(cityName) {
    // Check if API key is properly configured
    if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE' || WEATHER_API_KEY === 'demo_key') {
        showNotification('API key needed for live weather data', 'info');
        return null;
    }

    try {
        showLoadingState(true);

        // Current weather
        const currentResponse = await fetch(
            `${WEATHER_BASE_URL}/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
        );

        if (!currentResponse.ok) {
            if (currentResponse.status === 401) {
                throw new Error('Invalid API key');
            } else if (currentResponse.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Weather service unavailable');
            }
        }

        const currentData = await currentResponse.json();

        // 5-day forecast (includes hourly data)
        const forecastResponse = await fetch(
            `${WEATHER_BASE_URL}/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) {
            // If forecast fails, still return current weather
            return formatWeatherDataCurrentOnly(currentData);
        }

        const forecastData = await forecastResponse.json();

        return formatWeatherData(currentData, forecastData);

    } catch (error) {
        console.error('Weather API Error:', error);
        if (error.message === 'Invalid API key') {
            showNotification('Invalid API key - check your OpenWeatherMap key', 'error');
        } else if (error.message === 'City not found') {
            showNotification('City not found - try a different spelling', 'error');
        } else {
            showNotification('Weather service unavailable - using demo data', 'info');
        }
        return null;
    } finally {
        showLoadingState(false);
    }
}

// Format current weather only (fallback when forecast fails)
function formatWeatherDataCurrentOnly(current) {
    return {
        city: `${current.name}, ${current.sys.country}`,
        current: {
            temp: Math.round(current.main.temp),
            desc: current.weather[0].description.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            icon: getWeatherIcon(current.weather[0].icon),
            feelsLike: Math.round(current.main.feels_like),
            humidity: current.main.humidity,
            wind: Math.round(current.wind.speed * 3.6),
            precipitation: Math.round((current.clouds?.all || 0) * 0.8),
            visibility: Math.round((current.visibility || 10000) / 1000),
            pressure: current.main.pressure
        },
        hourly: [{
            time: 'Now',
            temp: Math.round(current.main.temp),
            icon: getWeatherIcon(current.weather[0].icon)
        }],
        weekly: [{
            day: 'Today',
            high: Math.round(current.main.temp_max),
            low: Math.round(current.main.temp_min),
            icon: getWeatherIcon(current.weather[0].icon),
            desc: current.weather[0].description.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        }]
    };
}

// Format API data to match our structure
function formatWeatherData(current, forecast) {
    const hourlyData = [];
    const weeklyData = [];

    // Process hourly data (next 8 hours)
    for (let i = 0; i < Math.min(8, forecast.list.length); i++) {
        const item = forecast.list[i];
        const time = new Date(item.dt * 1000);
        hourlyData.push({
            time: i === 0 ? 'Now' : time.toLocaleTimeString('en-US', {
                hour: 'numeric'
            }),
            temp: Math.round(item.main.temp),
            icon: getWeatherIcon(item.weather[0].icon)
        });
    }

    // Process daily data (group by day)
    const dailyMap = new Map();
    forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();

        if (!dailyMap.has(dayKey)) {
            dailyMap.set(dayKey, {
                day: date.toLocaleDateString('en-US', {
                    weekday: 'long'
                }),
                temps: [],
                weather: item.weather[0],
                icon: getWeatherIcon(item.weather[0].icon, true)
            });
        }
        dailyMap.get(dayKey).temps.push(item.main.temp);
    });

    // Convert daily map to array
    let dayCount = 0;
    for (const [date, data] of dailyMap) {
        if (dayCount >= 7) break;
        const high = Math.round(Math.max(...data.temps));
        const low = Math.round(Math.min(...data.temps));

        weeklyData.push({
            day: dayCount === 0 ? 'Today' : data.day,
            high: high,
            low: low,
            icon: data.icon,
            desc: data.weather.description.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        });
        dayCount++;
    }

    return {
        city: `${current.name}, ${current.sys.country}`,
        current: {
            temp: Math.round(current.main.temp),
            desc: current.weather[0].description.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            icon: getWeatherIcon(current.weather[0].icon),
            feelsLike: Math.round(current.main.feels_like),
            humidity: current.main.humidity,
            wind: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
            precipitation: Math.round((current.clouds?.all || 0) * 0.8), // Estimate from cloud cover
            visibility: Math.round((current.visibility || 10000) / 1000),
            pressure: current.main.pressure
        },
        hourly: hourlyData,
        weekly: weeklyData
    };
}

// Show loading state
function showLoadingState(isLoading) {
    const searchBtn = document.querySelector('button[onclick="searchWeather()"]');
    if (isLoading) {
        searchBtn.textContent = 'Loading...';
        searchBtn.disabled = true;
        searchBtn.classList.add('opacity-50');
    } else {
        searchBtn.textContent = 'Search';
        searchBtn.disabled = false;
        searchBtn.classList.remove('opacity-50');
    }
}


function updateCurrentDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

function updateWeatherDisplay(data) {
    // Update current weather
    document.getElementById('currentCity').textContent = data.city;
    document.getElementById('currentTemp').textContent = `${data.current.temp}°C`;
    document.getElementById('weatherDesc').textContent = data.current.desc;
    document.getElementById('weatherIcon').textContent = data.current.icon;

    // Update weather details
    document.getElementById('feelsLike').textContent = `${data.current.feelsLike}°C`;
    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.current.wind} km/h`;
    document.getElementById('precipitation').textContent = `${data.current.precipitation}%`;
    document.getElementById('visibility').textContent = `${data.current.visibility} km`;
    document.getElementById('pressure').textContent = `${data.current.pressure} hPa`;

    // Update hourly forecast
    const hourlyContainer = document.getElementById('hourlyForecast');
    hourlyContainer.innerHTML = '';
    data.hourly.forEach(hour => {
        const hourDiv = document.createElement('div');
        hourDiv.className = 'flex-shrink-0 text-center bg-white bg-opacity-10 rounded-xl p-4 min-w-[80px]';
        hourDiv.innerHTML = `
                    <div class="text-blue-100 text-sm mb-2">${hour.time}</div>
                    <div class="text-2xl mb-2">${hour.icon}</div>
                    <div class="text-white font-medium">${hour.temp}°</div>
                `;
        hourlyContainer.appendChild(hourDiv);
    });

    // Update weekly forecast
    const weeklyContainer = document.getElementById('weeklyForecast');
    weeklyContainer.innerHTML = '';
    data.weekly.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'flex items-center justify-between bg-white bg-opacity-10 rounded-xl p-4 hover:bg-opacity-20 transition-all';
        dayDiv.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <div class="text-2xl">${day.icon}</div>
                        <div>
                            <div class="text-white font-medium">${day.day}</div>
                            <div class="text-blue-100 text-sm">${day.desc}</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-white font-medium">${day.high}° / ${day.low}°</div>
                    </div>
                `;
        weeklyContainer.appendChild(dayDiv);
    });
}

async function searchWeather() {
    const searchInput = document.getElementById('citySearch');
    const cityName = searchInput.value.trim();

    if (!cityName) {
        showNotification('Please enter a city name', 'error');
        return;
    }

    // Add search animation
    searchInput.classList.add('search-animation');

    try {
        // Try to fetch live weather data
        const weatherData = await fetchWeatherData(cityName);

        if (weatherData) {
            // Use live API data
            updateWeatherDisplay(weatherData);
            showNotification(`Live weather data for ${weatherData.city}`, 'success');
            searchInput.value = '';
        } else {
            // Fallback to sample data
            const sampleKey = cityName.toLowerCase();
            if (sampleWeatherData[sampleKey]) {
                updateWeatherDisplay(sampleWeatherData[sampleKey]);
                showNotification(`Demo data for ${sampleWeatherData[sampleKey].city}`, 'info');
                searchInput.value = '';
            } else {
                showNotification('City not found. Try: Dhaka, Rangpur, or get an API key for live data', 'error');
            }
        }
    } catch (error) {
        showNotification('Weather service unavailable. Using demo data.', 'error');
        // Try sample data as final fallback
        const sampleKey = cityName.toLowerCase();
        if (sampleWeatherData[sampleKey]) {
            updateWeatherDisplay(sampleWeatherData[sampleKey]);
        }
    } finally {
        searchInput.classList.remove('search-animation');
    }
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    const bgColor = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'info': 'bg-blue-500'
    } [type] || 'bg-gray-500';

    notification.className = `fixed top-4 right-4 p-4 rounded-xl text-white z-50 transition-all transform translate-x-full ${bgColor}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


// Get user's current location and load weather
async function loadCurrentLocationWeather() {
    if (navigator.geolocation) {
        try {
            showLoadingState(true);
            showNotification('Getting your location...', 'info');

            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    enableHighAccuracy: true
                });
            });

            const {
                latitude,
                longitude
            } = position.coords;

            // Fetch weather by coordinates
            const currentResponse = await fetch(
                `${WEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
            );

            if (!currentResponse.ok) {
                throw new Error('Weather service unavailable');
            }

            const currentData = await currentResponse.json();

            // Get forecast data
            const forecastResponse = await fetch(
                `${WEATHER_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
            );

            let weatherData;
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                weatherData = formatWeatherData(currentData, forecastData);
            } else {
                weatherData = formatWeatherDataCurrentOnly(currentData);
            }

            updateWeatherDisplay(weatherData);
            showNotification(`Live weather for your location: ${weatherData.city}`, 'success');

        } catch (error) {
            console.error('Location weather error:', error);
            if (error.code === 1) {
                showNotification('Location access denied - showing demo weather', 'info');
            } else {
                showNotification('Could not get your location - showing demo weather', 'info');
            }
            // Fallback to demo data
            updateWeatherDisplay(sampleWeatherData.dhaka);
        } finally {
            showLoadingState(false);
        }
    } else {
        showNotification('Location not supported - showing demo weather', 'info');
        updateWeatherDisplay(sampleWeatherData.dhaka);
    }
}

// Initialize the app
updateCurrentDate();

// Load current location weather on startup
loadCurrentLocationWeather();

// Update date every minute
setInterval(updateCurrentDate, 60000);

// Mobile hamburger menu toggle
document.getElementById("menuBtn").addEventListener("click", function () {
    const nav = document.getElementById("navLinks");
    const icon = this.querySelector("i");
    nav.classList.toggle("hidden");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});