# ☕ CafeConnect

CafeConnect is a modern, responsive web application that helps users discover real-time nearby cafes using their current location. Built entirely using front-end technologies, it combines real-world APIs and elegant UI design to deliver a smooth and intuitive experience.

🔍 Features
🌍 Real-time Geolocation using the Geolocation API

📡 Network status awareness using the Network Information API

🔭 Lazy-loading animations via the Intersection Observer API

🗺 Real cafe data fetched from OpenStreetMap using the Overpass API

🎨 Clean, modern UI with responsive Bootstrap styling and smooth animations

✅ No backend or API key required — deploy anywhere!

💡 APIs & Technologies Used
API	Purpose
Geolocation API	Get user’s live coordinates
Network Information API	Display current connection type and speed
Intersection Observer API	Animate cafe cards as they enter view
Overpass API (OpenStreetMap)	Fetch real-world cafes near the user

📁 Project Structure
bash
Copy
Edit
CafeConnect/
├── index.html       # Main structure
├── style.css        # Responsive design and animations
└── script.js        # API calls, logic, and DOM interaction
🚀 How to Run
Clone the repository

Open index.html in any browser

Allow location access

Cafes around you will appear!
