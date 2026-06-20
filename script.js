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

// ==========================================
// SECTION 2.2: DYNAMIC CONTENT AND LIVE SEARCH
// ==========================================

// Complete array of all 11 café menu items extracted from your HTML
const menuProducts = [
    // Espresso & Hot Drinks
    { name: "Espresso", category: "hot", price: "R25.00", desc: "Rich, concentrated shot of our signature blend.", img: "images/istockphoto-2153935192-612x612.jpg" },
    { name: "Caffè Latte", category: "hot", price: "R35.00", desc: "Espresso with steamed milk and a light layer of foam.", img: "images/close-up-coffee-mug-isolated_23-2151833563.avif" },
    { name: "Americano", category: "hot", price: "R28.00", desc: "Espresso shots topped with hot water.", img: "images/latte-black-takeaway-full-cup-600nw-2644775925.webp" },
    { name: "Cappuccino", category: "hot", price: "R32.00", desc: "Equal parts espresso, steamed milk, and thick milk foam.", img: "images/3d-realistic-vector-icon-illustration-white-coffee-cup-cappucino-drink-isolated-white-backgrou_134830-2254.avif" },
    
    // Iced Beverages
    { name: "Iced Latte", category: "iced", price: "R38.00", desc: "Chilled milk and espresso served over ice.", img: "images/IcedAmericano-600x600-600x315.jpg" },
    { name: "Iced Americano", category: "iced", price: "R34.00", desc: "Espresso shots over cold water and ice.", img: "images/360_F_788101741_jF7FYM1ULUAQSamqQa8UhbR6FG4Kf2Kt.jpg" },
    
    // Fresh Pastries & Food
    { name: "Butter Croissant", category: "pastry", price: "R28.00", desc: "Flaky, golden, baked fresh daily.", img: "images/almond-butter-croissant-on-white-600nw-2703816513.webp" },
    { name: "Breakfast Sandwich", category: "pastry", price: "R45.00", desc: "Egg, cheese, and your choice of protein on a toasted roll.", img: "images/images.jpg" },
    
    // Saturday Specials
    { name: "Cold Brew Caramel Shake", category: "specials", price: "R45.00", desc: "Signature cold brew blended thick with vanilla ice cream and rich caramel drizzle.", img: "images/Cold Brew Caramel Coffe Milk shakes.jpg" },
    { name: "Classic Coffee Milkshake", category: "specials", price: "R42.00", desc: "Smooth espresso shake topped with thick whipped cream and crunchy caramel bits.", img: "images/Coffee Milkshake.avif" },
    { name: "Costa Tri-Combo Shakes", category: "specials", price: "R48.00", desc: "Your choice of creamy chocolate chip, strawberry swirl, or premium matcha blend.", img: "images/Saturdays special Combos.png" },
    { name: "Persian Iced Coffee", category: "specials", price: "R44.00", desc: "Exotic iced coffee layered with aromatic rosewater hints, deep caramel, and fresh beans.", img: "images/Persian Ice Coffee.webp" }
];

// Main function to sort and render dynamic cards to the screen
function renderMenu(items) {
    // Select the category flex row wrappers
    const categories = {
        hot: document.querySelector('#category-hot .products-flex-row'),
        iced: document.querySelector('#category-iced .products-flex-row'),
        pastry: document.querySelector('#category-pastry .products-flex-row'),
        specials: document.querySelector('#category-specials .products-flex-row')
    };

    // Exit safely if we aren't on the product page
    if (!categories.hot) return;

    // Clear previous items from all category blocks
    Object.values(categories).forEach(row => row.innerHTML = "");

    // Track how many items are rendered per category block
    const counts = { hot: 0, iced: 0, pastry: 0, specials: 0 };

    // Dynamically build individual product cards
    items.forEach(item => {
        if (categories[item.category]) {
            const cardLink = document.createElement('a');
            cardLink.href = "contact.html";
            cardLink.className = "product-card-link";

            cardLink.innerHTML = `
                <div class="menu-item">
                    <h3>${item.name}</h3>
                    <img src="${item.img}" width="250" height="200" style="object-fit: cover;">
                    <p>${item.desc}</p>
                    <p><strong>${item.price}</strong></p>
                </div>
            `;
            
            categories[item.category].appendChild(cardLink);
            counts[item.category]++;
        }
        
    });

    // Clean UI: Hide an entire category section if no searched items match it
    Object.keys(categories).forEach(key => {
        const parentBlock = document.getElementById(`category-${key}`);
        if (parentBlock) {
            parentBlock.style.display = counts[key] === 0 ? "none" : "flex";
        }
    });

    // Reinitialize the lightbox click system for our new dynamic images
    attachDynamicLightbox();
}

// Logic to attach Lightbox Listeners to newly generated images
function attachDynamicLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const itemImages = document.querySelectorAll('.menu-item img');

    if (lightbox && lightboxImg && closeBtn) {
        itemImages.forEach(img => {
            img.style.cursor = 'pointer';
            
            // Fix: prevent the parent box contact link from stealing the click event!
            img.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation();
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });
    }
}

// Event listener monitoring the live search text inputs
const menuSearchInput = document.getElementById('menu-search');
if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        
        const filteredList = menuProducts.filter(item => {
            return item.name.toLowerCase().includes(query) || 
                   item.desc.toLowerCase().includes(query);
        });
        
        renderMenu(filteredList);
    });
}

// Fire up the list initialization as soon as document elements load
document.addEventListener("DOMContentLoaded", () => {
    renderMenu(menuProducts);
});