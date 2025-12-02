// Data with CORRECTLY MATCHED images and titles
const specialsData = [
    {
        id: 1,
        title: "Golden Turmeric Latte",
        description: "Anti-inflammatory turmeric blended with coconut milk, black pepper, and a touch of honey",
        price: "$6.50",
        image: "assets/golden.png",
        tags: ["Hot", "Healthy", "Dairy-Free"]
    },
    {
        id: 2,
        title: "Artisan Croissant",
        description: "Freshly baked buttery croissant with flaky layers, served warm",
        price: "$4.75",
        image: "assets/Croissant.png",
        tags: ["Fresh", "Vegan Option", "Baked Daily"]
    },
    {
        id: 3,
        title: "Cold Brew Flight",
        description: "Three distinct cold brew samples: Ethiopian, Colombian, and Sumatra",
        price: "$8.99",
        image: "assets/coffee.png",
        tags: ["Cold", "Flight", "Limited"]
    }
];

const menuData = [
    {
        id: 1,
        name: "Espresso Con Panna",
        description: "A shot of our premium espresso topped with a dollop of fresh whipped cream",
        price: "$4.25",
        category: "espresso",
        calories: "85 cal",
    },
    {
        id: 2,
        name: "Flat White",
        description: "Ristretto shots of espresso with microfoam for a velvety texture",
        price: "$5.50",
        category: "espresso",
        calories: "120 cal",
    },
    {
        id: 3,
        name: "V60 Pour Over",
        description: "Single-origin beans brewed through a ceramic V60 for optimal extraction",
        price: "$6.75",
        category: "brew",
        calories: "5 cal",
        },
    {
        id: 4,
        name: "Chemex Brew",
        description: "Clean, bright coffee using our special Chemex filters and technique",
        price: "$7.25",
        category: "brew",
        calories: "5 cal",
    },
    {
        id: 5,
        name: "Almond Croissant",
        description: "Flaky croissant filled with homemade almond cream and sliced almonds",
        price: "$5.95",
        category: "pastry",
        calories: "320 cal",
    },
    {
        id: 6,
        name: "Matcha Danish",
        description: "Buttery danish pastry with green tea matcha cream and white chocolate",
        price: "$6.25",
        category: "pastry",
        calories: "280 cal",
    },
    {
        id: 7,
        name: "Cortado",
        description: "Equal parts espresso and steamed milk for a balanced, bold flavor",
        price: "$4.75",
        category: "espresso",
        calories: "60 cal",
    },
    {
        id: 8,
        name: "French Press",
        description: "Full-bodied brew using our French press method with coarse grounds",
        price: "$6.50",
        category: "brew",
        calories: "5 cal",
    }
];

// DOM Elements
const specialsGrid = document.querySelector('.specials-grid');
const menuItemsGrid = document.querySelector('.menu-items-grid');
const categoryCards = document.querySelectorAll('.category-card');
const reservationForm = document.getElementById('reservationForm');
const successMessage = document.getElementById('successMessage');
const backToTopBtn = document.getElementById('backToTop');
const floatingNav = document.querySelector('.floating-nav');
const navItems = document.querySelectorAll('.nav-item');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load specials
    loadSpecials();
    
    // Load menu items
    loadMenuItems('all');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize date picker with tomorrow's date
    initDatePicker();
    
    // Setup scroll effects
    setupScrollEffects();
});

// Load specials into the grid
function loadSpecials() {
    specialsGrid.innerHTML = '';
    
    specialsData.forEach(special => {
        const specialCard = document.createElement('div');
        specialCard.className = 'special-card';
        
        specialCard.innerHTML = `
            <div class="special-badge">Today's Pick</div>
            <img src="${special.image}" alt="${special.title}" class="special-image">
            <div class="special-content">
                <div class="special-title">
                    <span>${special.title}</span>
                    <span class="special-price">${special.price}</span>
                </div>
                <p class="special-description">${special.description}</p>
                <div class="special-tags">
                    ${special.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        specialsGrid.appendChild(specialCard);
    });
}

// Load menu items by category
function loadMenuItems(category) {
    menuItemsGrid.innerHTML = '';
    
    const itemsToShow = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    if (itemsToShow.length === 0) {
        menuItemsGrid.innerHTML = `
            <div class="no-items-message">
                <i class="fas fa-mug-hot"></i>
                <h3>No items in this category yet</h3>
                <p>Check back soon for new additions!</p>
            </div>
        `;
        return;
    }
    
    itemsToShow.forEach(item => {
        const menuItemCard = document.createElement('div');
        menuItemCard.className = 'menu-item-card';
        
        menuItemCard.innerHTML = `
            <div class="item-header">
                <h3 class="item-name">${item.name}</h3>
                <div class="item-price">${item.price}</div>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-meta">
                <span class="item-category">${item.category === 'espresso' ? 'Espresso' : 
                    item.category === 'brew' ? 'Pour Over' : 'Pastry'}</span>
                <span class="item-calories">${item.calories}</span>
            </div>
        `;
        
        menuItemsGrid.appendChild(menuItemCard);
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Category selection
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Load items for selected category
            const category = this.getAttribute('data-category');
            loadMenuItems(category);
        });
    });
    
    // Navigation active state
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reservation form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('reservationName').value;
        const email = document.getElementById('reservationEmail').value;
        const date = document.getElementById('reservationDate').value;
        const time = document.getElementById('reservationTime').value;
        const message = document.getElementById('reservationMessage').value;
        
        // In a real app, you would send this to a server
        console.log('Reservation submitted:', { name, email, date, time, message });
        
        // Show success message
        successMessage.style.display = 'flex';
        
        // Reset form
        reservationForm.reset();
        initDatePicker(); // Reset date to tomorrow
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize date picker with tomorrow's date
function initDatePicker() {
    const dateInput = document.getElementById('reservationDate');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format as YYYY-MM-DD
    const minDate = tomorrow.toISOString().split('T')[0];
    
    // Set min date to tomorrow
    dateInput.min = minDate;
    
    // Set default value to tomorrow
    dateInput.value = minDate;
}

// Setup scroll effects
function setupScrollEffects() {
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });
}

// Update active navigation based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Floating navigation effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        floatingNav.style.transform = 'translateX(-50%) translateY(-100px)';
        floatingNav.style.opacity = '0';
    } else {
        // Scrolling up
        floatingNav.style.transform = 'translateX(-50%) translateY(0)';
        floatingNav.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;
});