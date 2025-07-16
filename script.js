const planets = [
    {
        name: "Earth",
        orbitalPeriod: 365.25,
        color: "#2E86AB",
        fact: "Our vibrant blue world is the only known planet to support life and vast oceans.",
        animation: "assets/planets/earth.mp4"
    },
    {
        name: "Mercury",
        orbitalPeriod: 88,
        color: "#B5B5B5",
        fact: "Closest to the Sun, Mercury races through space with searing days and freezing nights.",
        animation: "assets/planets/mercury.mp4"
    },
    {
        name: "Venus",
        orbitalPeriod: 224.7,
        color: "#E6AF2E",
        fact: "A runaway greenhouse effect makes Venus the solar system’s hottest and most hostile world.",
        animation: "assets/planets/venus.mp4"
    },
    {
        name: "Mars",
        orbitalPeriod: 687,
        color: "#C1440E",
        fact: "The dusty Red Planet may once have had rivers, lakes, and the potential for ancient life.",
        animation: "assets/planets/mars.mp4"
    },
    {
        name: "Jupiter",
        orbitalPeriod: 4333,
        color: "#D8C99B",
        fact: "Gigantic Jupiter’s swirling storms and Great Red Spot make it a dynamic gas giant.",
        animation: "assets/planets/jupiter.mp4"
    },
    {
        name: "Saturn",
        orbitalPeriod: 10759,
        color: "#E3DDB1",
        fact: "Famed for its icy rings, Saturn also hosts over 100 moons of varied composition.",
        animation: "assets/planets/saturn.mp4"
    },
    {
        name: "Uranus",
        orbitalPeriod: 30687,
        color: "#D1E7E7",
        fact: "Icy Uranus spins on its side, giving rise to extreme seasons lasting decades.",
        animation: "assets/planets/uranus.mp4"
    },
    {
        name: "Neptune",
        orbitalPeriod: 60190,
        color: "#5B5DDF",
        fact: "Neptune’s supersonic winds and deep‑blue hue make it the solar system’s windiest realm.",
        animation: "assets/planets/neptune.mp4"
    },
    {
        name: "Pluto",
        orbitalPeriod: 90560,
        color: "#B5AEAE",
        fact: "Though a dwarf planet, Pluto boasts icy mountains, nitrogen glaciers, and a thin atmosphere.",
        animation: "assets/planets/pluto.mp4"
    }
];

function initPlanets() {
    const grid = document.getElementById('planets-grid');
    grid.innerHTML = '';

    planets.forEach(planet => {
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.innerHTML = `
            <div class="planet-video-container">
                <video autoplay loop muted playsinline>
                    <source src="${planet.animation}" type="video/mp4">
                </video>
            </div>
            <h3 class="planet-name">${planet.name}</h3>
            <p>Your age: <span class="planet-age">0</span> years</p>
            <p class="planet-fact">${planet.fact}</p>
        `;
        grid.appendChild(card);
    });
}

function calculateAges() {
    const earthAge = parseFloat(document.getElementById('age-input').value);
    
    if (isNaN(earthAge)) {
        showNotification('Please enter a valid number!', 'error');
        return;
    }
    
    if (earthAge <= 0 || earthAge > 120) {
        showNotification('Age must be between 1-120 years', 'error');
        return;
    }
    
    planets.forEach(planet => {
        const planetAge = (earthAge * planets[0].orbitalPeriod / planet.orbitalPeriod).toFixed(2);
        updatePlanetAge(planet.name, planetAge, planet.color);
    });
    
    showNotification('Age calculated across the solar system!', 'success');
}

function updatePlanetAge(name, age, color) {
    const cards = document.querySelectorAll('.planet-card');
    cards.forEach(card => {
        if (card.querySelector('.planet-name').textContent === name) {
            const ageElement = card.querySelector('.planet-age');
            ageElement.textContent = age;
            ageElement.style.color = color;
        }
    });
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    initPlanets();
    document.getElementById('calculate-btn').addEventListener('click', calculateAges);
    document.getElementById('age-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateAges();
    });
});