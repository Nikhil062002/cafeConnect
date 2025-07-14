const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

function checkNetwork() {
  const status = document.getElementById('status');
  if ('connection' in navigator) {
    const c = navigator.connection;
    let msg = `Connection: ${c.effectiveType}`;
    if (c.downlink < 1) msg += ' — Low speed';
    status.innerText = msg;
  } else status.innerText = 'Network Information API not supported.';
}

async function fetchNearbyCafes(lat, lng) {
  const lat1 = lat - 0.01;
  const lat2 = lat + 0.01;
  const lng1 = lng - 0.01;
  const lng2 = lng + 0.01;
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="cafe"](${lat1},${lng1},${lat2},${lng2});out;`;

  try {
    const res = await fetch(overpassUrl);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    console.log('✅ OpenStreetMap Cafe Data:', data);
    return data.elements || [];
  } catch (error) {
    console.error('❌ Error fetching cafes:', error);
    throw error;
  }
}

async function initApp() {
  checkNetwork();

  if (!navigator.geolocation) {
    document.getElementById('location').innerText = 'Geolocation not supported.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      document.getElementById('location').innerText = `Your location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      try {
        const cafes = await fetchNearbyCafes(lat, lng);
        renderCafes(cafes);
      } catch (e) {
        document.getElementById('location').innerText += ' — Error loading cafes (see console).';
      }
    },
    (err) => {
      let message = '';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message = '❌ Location permission denied.';
          break;
        case err.POSITION_UNAVAILABLE:
          message = '📍 Location unavailable.';
          break;
        case err.TIMEOUT:
          message = '⏳ Location request timed out.';
          break;
        default:
          message = '⚠️ Unknown error getting location.';
      }
      document.getElementById('location').innerText = message;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function renderCafes(cafes) {
  const container = document.getElementById('cafe-list');
  if (!cafes.length) {
    container.innerHTML = '<div class="col-12 text-center text-muted">No cafes found nearby.</div>';
    return;
  }
  cafes.forEach(c => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4 cafe-card';
    col.innerHTML = `
      <div class="card shadow h-100">
        <div class="card-body">
          <h5 class="card-title">${c.tags.name || 'Unnamed Cafe'}</h5>
          <p class="card-text">Lat: ${c.lat.toFixed(4)}, Lng: ${c.lon.toFixed(4)}</p>
        </div>
      </div>`;
    container.appendChild(col);
    observer.observe(col);
  });
}

initApp();




