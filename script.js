const translations = {
    en: {
        toggleLabels: "Toggle Labels",
        speed: "Speed:",
        solarSystem: "Solar System",
        hoverInstruction: "Hover over a planet to see details.",
        Mercury: { name: "Mercury", desc: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon." },
        Venus: { name: "Venus", desc: "Spins slowly in the opposite direction from most planets. Its thick atmosphere traps heat, making it the hottest planet." },
        Earth: { name: "Earth", desc: "Our home planet is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface." },
        Mars: { name: "Mars", desc: "A dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was – billions of years ago – wetter and warmer, with a thick atmosphere." },
        Jupiter: { name: "Jupiter", desc: "More than twice as massive as all the other planets combined. The Great Red Spot is a giant storm bigger than Earth." },
        Saturn: { name: "Saturn", desc: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's." },
        Uranus: { name: "Uranus", desc: "Rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side." },
        Neptune: { name: "Neptune", desc: "Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system." }
    },
    zh: {
        toggleLabels: "显示/隐藏标签",
        speed: "速度:",
        solarSystem: "太阳系",
        hoverInstruction: "悬停在行星上查看详情。",
        Mercury: { name: "水星", desc: "太阳系中最小的行星，也是离太阳最近的行星——仅比地球的月球稍大一点。" },
        Venus: { name: "金星", desc: "自转方向与大多数行星相反。其厚厚的大气层能留住热量，使其成为最热的行星。" },
        Earth: { name: "地球", desc: "我们的家园是目前已知唯一有生命存在的地方。它也是太阳系中唯一表面有液态水的行星。" },
        Mars: { name: "火星", desc: "一个多尘、寒冷、沙漠般的世界，大气层非常稀薄。有强有力的证据表明，数十亿年前的火星更湿润、更温暖，大气层也更厚。" },
        Jupiter: { name: "木星", desc: "质量是其他所有行星总和的两倍多。大红斑是一个比地球还大的巨大风暴。" },
        Saturn: { name: "土星", desc: "拥有令人眼花缭乱的复杂冰环系统，在太阳系中独一无二。其他巨行星也有光环，但都不如土星的光环壮观。" },
        Uranus: { name: "天王星", desc: "以近90度的角度旋转。这种独特的倾斜使天王星看起来像是躺在轨道上自转。" },
        Neptune: { name: "海王星", desc: "黑暗、寒冷，被超音速风吹拂，冰巨星海王星是太阳系中第八颗也是最远的行星。" }
    }
};

const planetSpeeds = {
    'Mercury': 4,
    'Venus': 10,
    'Earth': 16,
    'Mars': 30,
    'Jupiter': 60,
    'Saturn': 90,
    'Uranus': 120,
    'Neptune': 160
};

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const infoTitle = document.getElementById('planet-name');
    const infoDesc = document.getElementById('planet-desc');
    const speedInput = document.getElementById('speed-range');
    const toggleLabelsBtn = document.getElementById('toggle-labels');
    const toggleLangBtn = document.getElementById('toggle-lang');
    const universe = document.getElementById('universe');

    function updateLanguage() {
        // Update UI elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });

        // Update planet labels
        planets.forEach(planet => {
            const nameKey = planet.getAttribute('data-name');
            const label = planet.querySelector('.planet-label');
            if (label && translations[currentLang][nameKey]) {
                label.textContent = translations[currentLang][nameKey].name;
            }
        });

        // Reset info panel
        infoTitle.textContent = translations[currentLang].solarSystem;
        infoDesc.textContent = translations[currentLang].hoverInstruction;
    }

    toggleLangBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        updateLanguage();
    });

    // Add labels to planets
    planets.forEach(planet => {
        const nameKey = planet.getAttribute('data-name');
        const label = document.createElement('div');
        label.className = 'planet-label';
        label.textContent = translations[currentLang][nameKey].name;
        planet.appendChild(label);

        planet.addEventListener('mouseenter', () => {
            infoTitle.textContent = translations[currentLang][nameKey].name;
            infoDesc.textContent = translations[currentLang][nameKey].desc;
        });

        planet.addEventListener('mouseleave', () => {
            infoTitle.textContent = translations[currentLang].solarSystem;
            infoDesc.textContent = translations[currentLang].hoverInstruction;
        });
    });

    // Speed Control
    speedInput.addEventListener('input', (e) => {
        const factor = e.target.value;
        if (factor == 0) {
            document.querySelectorAll('.planet-container').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            return;
        }

        document.querySelectorAll('.planet-container').forEach(el => {
            el.style.animationPlayState = 'running';
            // We can't easily change animation-duration without resetting the animation, 
            // so we'll use a CSS variable or just accept that this simple implementation 
            // might be jumpy if we change duration directly. 
            // Better approach for smooth speed change: set animation-duration based on base speed / factor

            // However, changing duration resets animation. 
            // A hacky way is to not change it here for this simple demo, 
            // or use JS to animate rotation instead of CSS keyframes for full control.

            // Let's try a simple CSS variable update if we had set it up that way, 
            // but since we hardcoded durations, let's just leave it for now or implement a smarter JS animation loop?

            // Actually, let's switch to JS based animation for speed control if we want it smooth.
            // But for now, let's just update the duration and accept the jump.

            const planetName = el.querySelector('.planet').getAttribute('data-name');
            const baseSpeed = planetSpeeds[planetName];

            // If factor is high (fast), duration is low.
            // factor 1 = normal. factor 2 = 2x speed (half duration).
            const newDuration = baseSpeed / factor;
            el.style.animationDuration = `${newDuration}s`;
        });
    });

    // Toggle Labels
    toggleLabelsBtn.addEventListener('click', () => {
        universe.classList.toggle('show-labels');
    });

    // Generate random stars
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${Math.random() * 3 + 1}s infinite alternate`;
        starsContainer.appendChild(star);
    }

    // Add twinkle keyframe if not in CSS
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes twinkle {
            from { opacity: 0.2; }
            to { opacity: 1; }
        }
    `, styleSheet.cssRules.length);

    // Generate asteroids in the asteroid belt
    const asteroidBelt = document.getElementById('asteroid-belt');
    const beltRadius = 145; // Half of 290px diameter
    const numAsteroids = 150; // Increased from 80 for better visibility

    for (let i = 0; i < numAsteroids; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';

        // Random size between 1.5-4px (increased from 1-3px)
        const size = Math.random() * 2.5 + 1.5;
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;

        // Random angle around the belt
        const angle = (Math.random() * 360);

        // Random variation in radius to create belt thickness
        const radiusVariation = (Math.random() - 0.5) * 20; // ±10px variation
        const radius = beltRadius + radiusVariation;

        // Calculate position
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;

        // Position relative to center of belt (which is already centered)
        asteroid.style.left = `calc(50% + ${x}px)`;
        asteroid.style.top = `calc(50% + ${y}px)`;
        asteroid.style.transform = 'translate(-50%, -50%)';

        // Random opacity (increased from 0.3-0.7 to 0.5-0.9)
        asteroid.style.opacity = Math.random() * 0.4 + 0.5;

        asteroidBelt.appendChild(asteroid);
    }
});
