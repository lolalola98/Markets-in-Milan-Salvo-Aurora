/**
 * Main Application Logic - Leaflet map integration
 */

let map;
let markerLayer;
let markers = [];
let markets = [];
let filteredMarkets = [];
const MILAN_CENTER = [45.4642, 9.1900];

const greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const grayIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

function initMap() {
    map = L.map('map', {
        center: MILAN_CENTER,
        zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);
    loadMarkets();
}

function loadMarkets() {
    fetch('assets/markets.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            markets = data;
            filteredMarkets = markets;

            UI.currentMarkets = markets;
            UI.init();
            UI.populateFilters(markets);
            UI.restoreCheckedFilters();

            const savedFilters = JSON.parse(localStorage.getItem('selectedFilters')) || { locations: [], marketTypes: [], products: [] };
            if (savedFilters.locations.length > 0 || savedFilters.marketTypes.length > 0 || savedFilters.products.length > 0) {
                filteredMarkets = UI.filterMarkets(markets);
            }

            UI.renderCards(filteredMarkets);
            renderMapMarkers(filteredMarkets);
        })
        .catch(error => {
            console.error('Error loading markets:', error);
            const errorMsg = error.message.includes('file://') || error.message.includes('Failed to fetch') 
                ? 'Error: Please serve this site using a web server (not file://). Use "python3 -m http.server" or similar.'
                : `Error loading market data: ${error.message}`;
            alert(errorMsg);
        });
}

function renderMapMarkers(marketList) {
    markerLayer.clearLayers();
    markers = [];

    if (!marketList || marketList.length === 0) {
        return;
    }

    marketList.forEach(market => {
        const isOpen = market.isOpen !== false;
        const markerIcon = isOpen ? greenIcon : grayIcon;

        const marker = L.marker([market.location.lat, market.location.lng], {
            icon: markerIcon
        }).addTo(markerLayer);

        marker.bindPopup(createInfoWindowContent(market));

        marker.on('click', () => {
            UI.selectMarket(market.id);
            map.setView([market.location.lat, market.location.lng], 15);
            marker.openPopup();
        });

        markers.push({ id: market.id, marker });
    });
}

function createInfoWindowContent(market) {
    return `
        <div style="max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">${market.name}</h3>
            <p style="margin: 0.25rem 0; font-size: 0.85rem; color: #666;">
                <strong>Hours:</strong> ${market.hours}
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.85rem; color: #666;">
                <strong>Types:</strong> ${market.marketType.join(', ')}
            </p>
            <p style="margin: 0.5rem 0; font-size: 0.85rem;">${market.description}</p>
            <a href="${market.googleMapsLink}" target="_blank" style="color: #1f78d1; text-decoration: none; font-size: 0.85rem;">
                Get Directions →
            </a>
        </div>
    `;
}

function centerMapOnMarket(market) {
    if (!map) {
        return;
    }

    map.setView([market.location.lat, market.location.lng], 15);

    const markerEntry = markers.find(entry => entry.id === market.id);
    if (markerEntry) {
        markerEntry.marker.openPopup();
    }
}

function updateMapMarkers(filtered) {
    renderMapMarkers(filtered);
}

window.updateMapMarkers = updateMapMarkers;
window.centerMapOnMarket = centerMapOnMarket;

initMap();
