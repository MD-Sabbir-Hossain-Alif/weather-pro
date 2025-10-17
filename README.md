# 🌦️ WeatherPro — Modern Weather App

WeatherPro is a **modern, responsive weather application** built using **HTML**, **Tailwind CSS**, and **Vanilla JavaScript**.  
It provides **real-time weather data**, **24-hour hourly forecasts**, and **7-day weekly forecasts** using the **OpenWeatherMap API** — with a smooth glassmorphism UI and mobile-friendly navigation.

---

## 🚀 Features

- 🌍 **Live weather** using [OpenWeatherMap API](https://openweathermap.org/api)
- 📍 **Auto location detection** (geolocation)
- 🕐 **24-hour hourly forecast**
- 📅 **7-day weekly forecast**
- 🔍 **City search support**
- ☁️ **Fallback demo data** (Dhaka & Rangpur)
- 📱 **Responsive design** with **hamburger menu**
- 🎨 **Glassmorphism UI** (Tailwind CSS)
- ⚡ **Real-time date updates**

---

## 🧩 Technologies Used

- **HTML5**
- **Tailwind CSS**
- **Font Awesome** (for icons)
- **JavaScript (ES6+)**
- **OpenWeatherMap API**

---

## 📂 Project Structure

```
WeatherPro/
│
├── index.html # Main HTML file
├── src/ # Source files
│ ├── style.css # Custom styles (glass effect, dark mode)
│ ├── weather-app.js # Core app logic (API, UI updates, notifications)
│ ├── cf-protection-loader.js # Cloudflare script (auto-generated)
│ └── favicon-logo.png # App icon
└── README.md # Project documentation
```

---

## ⚙️ Setup & Installation

1. **Clone this repo:**
   ```bash
   git clone https://github.com/md-sabbir-hossain-alif/weather-pro.git
   cd weatherpro
   ```

2. **OpenWeatherMap API Key**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up and get your **API key**
   - Replace this line inside `weather-app.js`:
     ```js
     const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
     ```

3. **Run locally**
   - Just open `index.html` in your browser
   - Or use a local server (e.g., VS Code Live Server)

---

## 🧠 How It Works

1. **On page load** → gets your current location & fetches live weather data  
2. **Search bar** → allows searching weather by city name  
3. **If API fails** → falls back to demo weather data  
4. **Hourly & weekly forecasts** → generated dynamically in the DOM  
5. **Mobile view** → shows hamburger menu for navigation  

---

## 📱 Responsive Design

- Tailwind CSS ensures full mobile responsiveness  
- Hamburger menu automatically appears below `md` breakpoint  
- Menu toggles smoothly and overlays above content  

---

## 🧰 Future Improvements

- Add temperature unit toggle (**°C / °F**)
- Add dark/light theme toggle
- Add weather condition icons instead of emojis
- Cache last searched city with `localStorage`
- Offline fallback mode (PWA-ready)

---

## 🛡️ License

This project is license free. Free to use, modify, and distribute.

---

## 💡 Author

**SabbirOfficial**  
Made with ❤️ using Tailwind CSS + OpenWeatherMap API.

---

### 🌐 Live Demo

> [Netlify](https://spectacular-speculoos-d73345.netlify.app/)
> [Github Pages](https://md-sabbir-hossain-alif.github.io/weather-pro/)