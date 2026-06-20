// FAQ Accordion with Animations based on actual HTML
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    // Find the h3 question and the p answer inside this specific article item
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    if (question && answer) {
        // Style cursor to point so users know they can click it
        question.style.cursor = 'pointer';

        question.addEventListener('click', () => {
            // Check if this specific item is already active
            const isOpen = item.classList.contains('active');
            
            // Close all other open FAQs first
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // If it wasn't open, add the active class to slide it down
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    }
});

// Lightbox Gallery Click Interactions
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

// This targets all images inside your product containers. 
// (If your menu elements use a class like .menu-card or .product-item, swap it here!)
const galleryImages = document.querySelectorAll('.menu-item img, .product-item img');

if (lightbox && lightboxImg && closeBtn) {
    galleryImages.forEach(img => {
        // Change cursor to show it can be interacted with
        img.style.cursor = 'pointer';

        img.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.style.display = 'flex'; // Reveals the hidden overlay container
            lightboxImg.src = img.src;     // Swaps the blank source to the clicked image's source
        });
    });

    // Close the gallery display when clicking the X
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close the gallery display if clicking outside the photo onto the dark area
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Interactive Map Setup for Tokai, Cape Town
const mapElement = document.getElementById('map');

if (mapElement) {
    // Coordinates for Tokai, Cape Town area: [-34.0484, 18.4528]
    const map = L.map('map').setView([-34.0484, 18.4528], 15);

    // Load and display beautiful open-source map tile layers
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker pin precisely in Tokai
    const cafeMarker = L.marker([-34.0484, 18.4528]).addTo(map);
    
    // Add the popup text bubble
    cafeMarker.bindPopup("<b>The Daily Grind Café</b><br>Tokai, Cape Town<br>Come visit us for the best brew in town!").openPopup();
}