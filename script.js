document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
        // Prevent scrolling when menu is open
        body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // 2. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const contentId = header.getAttribute('aria-controls');
            const content = document.getElementById(contentId);

            // Close all other items (optional, but cleaner)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                    otherContent.hidden = true;
                }
            });

            // Toggle current item
            header.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded;
        });
    });

    // 3. Coffee Finder Demo
    const coffeeData = [
        { 
            name: "Chikmagalur Estate", type: "light", notes: "Jasmine, Fruity, Hint of Spice",
            video: "https://cdn.pixabay.com/video/2019/11/14/29168-373801835_tiny.mp4",
            desc: "A stunning light roast from the birthplace of Indian coffee. Handpicked from the highest elevation estates of Karnataka, showcasing delicate floral aromas and a peachy sweetness.",
            process: "Light roasting stops immediately after the 'first crack' (approx 205°C) to prevent natural sugars from caramelizing and hiding the indigenous terroir.",
            brew: "V60 Pour Over perfectly highlights its tea-like body and bright acidity."
        },
        { 
            name: "Coorg Peaberry Blend", type: "medium", notes: "Caramel, Nutty, Red Fruit",
            video: "https://cdn.pixabay.com/video/2015/09/24/856-140685732_tiny.mp4",
            desc: "The quintessential Indian medium roast. The rare peaberry beans from Coorg perfectly balance the bean's natural fruitiness with rich, caramelized sugars.",
            process: "Roasted slightly past the first crack (around 215°C) to develop a deep amber color and enhance body without introducing bitterness.",
            brew: "Aeropress or South Indian Filter builds a velvety cup with smooth chocolate notes."
        },
        { 
            name: "Monsooned Malabar AA", type: "dark", notes: "Earthy, Spicy, Bold, Low Acidity",
            video: "https://cdn.pixabay.com/video/2021/04/13/70978-538189851_tiny.mp4",
            desc: "A globally unique dark roast native to the Malabar coast. The beans are exposed to monsoon winds, resulting in zero acidity and a deeply intense, earthy body.",
            process: "First monsooned for months, then roasted completely through to the 'second crack' (above 225°C). Oils emerge on the surface and deep smoky flavors take over.",
            brew: "French Press or Espresso extraction brings out the thick oils and intense traditional profile."
        },
        { 
            name: "Nilgiri Blue Mountain", type: "light", notes: "Bright, Citrus, Complex",
            video: "https://cdn.pixabay.com/video/2023/10/24/186358-877708316_tiny.mp4",
            desc: "Known for its sharp, wine-like acidity and citrus flavors grown alongside the famous Nilgiri teas. A light roast is essential to keep these sharp fruit notes intact.",
            process: "Pulled early from the roaster at 200°C. High moisture retention keeps the bright acids punchy and vibrant.",
            brew: "Chemex filtered brewing allows the clean complexity to shine."
        },
        { 
            name: "Araku Valley Tribal", type: "medium", notes: "Chocolate, Rich, Mild Spice",
            video: "https://cdn.pixabay.com/video/2019/11/14/29168-373801835_tiny.mp4",
            desc: "Grown in the pristine Eastern Ghats of Andhra Pradesh, this organic coffee naturally possesses a cocoa-heavy profile a medium roast perfectly exposes.",
            process: "Classic medium stage roasting. It unlocks the rich cocoa aroma while maintaining a subtle hint of apple-like acidity.",
            brew: "Moka Pot or Espresso extracts the dense chocolate syrup flavors."
        },
        { 
            name: "Wayanad Robusta Cherry", type: "dark", notes: "Bold, Smoky, Intense Caffeine",
            video: "https://cdn.pixabay.com/video/2015/09/24/856-140685732_tiny.mp4",
            desc: "A powerhouse dark roast from Kerala. Indian Robusta is considered the best globally. Intensely smoky, rich, with a massive caffeine kick.",
            process: "Roasted deep into the second crack. The beans are nearly black, highly oily, and all origin acidity is completely replaced by roasted carbon depth.",
            brew: "Espresso machine or strong South Indian decoction handles the dense beans best."
        }
    ];

    const coffeeGrid = document.getElementById('coffee-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roastModal = document.getElementById('roast-modal');
    const roastModalBody = document.getElementById('roast-modal-body');
    const closeRoastBtn = document.getElementById('close-roast-modal');

    function renderCoffee(filter = 'all') {
        coffeeGrid.innerHTML = '';
        const filteredData = filter === 'all' 
            ? coffeeData 
            : coffeeData.filter(item => item.type === filter);

        filteredData.forEach(coffee => {
            const card = document.createElement('div');
            card.className = 'coffee-card';
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => showRoastModal(coffee));
            card.innerHTML = `
                <div class="coffee-image-placeholder"></div>
                <div class="coffee-info">
                    <span class="coffee-tag">${coffee.type} roast</span>
                    <h3>${coffee.name}</h3>
                    <p>${coffee.notes}</p>
                </div>
            `;
            coffeeGrid.appendChild(card);
        });
    }

    function showRoastModal(coffee) {
        roastModalBody.innerHTML = `
            <div class="roast-detail-grid">
                <div class="video-container" style="border-radius: 12px; overflow: hidden; height: 100%; min-height: 250px; background: #000;">
                    <video src="${coffee.video}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;"></video>
                </div>
                <div class="roast-info">
                    <h2>${coffee.name}</h2>
                    <span class="tag mb-2" style="display:inline-block; margin-bottom: 1rem;">${coffee.type.toUpperCase()} ROAST</span>
                    
                    <div class="roast-info-block">
                        <h4>Taste Profile & Description</h4>
                        <p>${coffee.desc}</p>
                    </div>
                    
                    <div class="roast-info-block">
                        <h4>How It's Roasted</h4>
                        <p>${coffee.process}</p>
                    </div>
                    
                    <div class="roast-info-block">
                        <h4>Best Brew Method</h4>
                        <p>${coffee.brew}</p>
                    </div>
                </div>
            </div>
        `;
        roastModal.style.display = 'flex';
    }

    if(closeRoastBtn) {
        closeRoastBtn.addEventListener('click', () => {
            roastModal.style.display = 'none';
            roastModalBody.innerHTML = ''; // stops video 
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            const filter = btn.getAttribute('data-filter');
            renderCoffee(filter);
        });
    });

    // Initial render
    renderCoffee();

    // 4. Newsletter Form Submission (Mock)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thanks for joining, ${email}! We'll keep you caffeinated.`);
            newsletterForm.reset();
        });
    }

    // 5. Bhopal Cafes Integration (Top Rated 4+ Stars)
    const bhopalCafes = [
        {
            id: 'ich',
            name: 'Indian Coffee House (ICH)',
            desc: 'A nostalgic favorite in Bhopal, serving iconic filter coffee and dosas in a retro setting.',
            tags: ['⭐ 4.6', '👪 Family', 'Heritage'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Indian+Coffee+House+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.9228498455643!2d77.39864227599026!3d23.245903978021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c42a229a9e3a9%3A0xc31eedce04938360!2sIndian%20Coffee%20House!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹150 | 5 mins', ola: '₹140 | 8 mins', rapido: '₹65 | 2 mins' },
            menu: [
                { item: 'Filter Coffee', price: '₹45' },
                { item: 'Cold Coffee', price: '₹90' },
                { item: 'Masala Dosa', price: '₹120' },
                { item: 'Cheese Sandwich', price: '₹80' }
            ]
        },
        {
            id: 'nothing-before-coffee',
            name: 'Nothing Before Coffee',
            desc: 'Modern hangout spot known for specialty brews, aesthetic interiors, and loaded shakes.',
            tags: ['⭐ 4.8', '❤️ Couple', 'Aesthetic'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Nothing+Before+Coffee+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.1264259364!2d77.43389457599003!3d23.23849537805177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c423ba0c08bbf%3A0xa63a76cd63a7090b!2sNothing%20Before%20Coffee!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹120 | 4 mins', ola: '₹115 | 6 mins', rapido: '₹50 | 1 min' },
            menu: [
                { item: 'Classic Cappuccino', price: '₹160' },
                { item: 'Hazelnut Frappe', price: '₹220' },
                { item: 'Shrappe (Signature)', price: '₹250' },
                { item: 'Garlic Bread', price: '₹150' }
            ]
        },
        {
            id: 'amado',
            name: 'Amado Cafe & Bakery',
            desc: 'Premium patisserie and cafe in Arera Colony offering exquisite desserts and artisanal coffee.',
            tags: ['⭐ 4.7', '❤️ Couple', 'Premium'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Amado+Cafe+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.866160100416!2d77.4332824!3d23.2115162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43dc2c5f5b5f%3A0xe54e2fbcc12c40c1!2sAmado!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹180 | 7 mins', ola: '₹170 | 5 mins', rapido: '₹80 | 3 mins' },
            menu: [
                { item: 'Cafe Latte', price: '₹180' },
                { item: 'Macchiato', price: '₹190' },
                { item: 'Red Velvet Cheesecake', price: '₹260' },
                { item: 'Butter Croissant', price: '₹140' }
            ]
        },
        {
            id: 'pinewood',
            name: 'Pinewood Roasters',
            desc: 'A hidden gem dedicated to single-origin beans and pour-over brewing methods.',
            tags: ['⭐ 4.9', '🧑‍💻 Work', 'Specialty'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Pinewood+Roasters+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117304.75782782767!2d77.3370959082717!3d23.2562854378822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹95 | 3 mins', ola: '₹90 | 4 mins', rapido: '₹40 | 1 min' },
            menu: [
                { item: 'V60 Pour Over', price: '₹200' },
                { item: 'Aeropress Blend', price: '₹180' },
                { item: 'Espresso Tonic', price: '₹210' },
                { item: 'Vegan Brownie', price: '₹160' }
            ]
        },
        {
            id: 'third-wave',
            name: 'Third Wave Coffee',
            desc: 'Premium coffee chain offering expertly crafted drinks and relaxed ambiance.',
            tags: ['⭐ 4.5', '🧑‍💻 Work', 'Global'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Third+Wave+Coffee+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.1264259364!2d77.43389457599003!3d23.23849537805177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE4LjYiTiA3N8KwMjYnMDIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹140 | 6 mins', ola: '₹135 | 7 mins', rapido: '₹55 | 2 mins' },
            menu: [
                { item: 'Sea Salt Mocha', price: '₹250' },
                { item: 'French Vanilla Latte', price: '₹240' },
                { item: 'Almond Croissant', price: '₹180' }
            ]
        },
        {
            id: 'sagar-gaire',
            name: 'Sagar Gaire Cafe',
            desc: 'The legendary local chain combining quick bites, cold coffees, and unbeatable energetic vibes.',
            tags: ['⭐ 4.8', '👪 Family', 'Budget'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Sagar+Gaire+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117304.75782782767!2d77.3370959082717!3d23.2562854378822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE4LjYiTiA3N8KwMjYnMDIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹100 | 4 mins', ola: '₹90 | 4 mins', rapido: '₹40 | 1 min' },
            menu: [
                { item: 'Cold Coffee Extravaganza', price: '₹110' },
                { item: 'Peri Peri Fries', price: '₹130' },
                { item: 'Paneer Wrap', price: '₹150' }
            ]
        },
        {
            id: 'oliver',
            name: 'Oliver',
            desc: 'Highly rated aesthetic bistro offering gourmet food paired with fantastic coffee roasts.',
            tags: ['⭐ 4.6', '❤️ Couple', 'Luxurious'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Oliver+Cafe+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.866160100416!2d77.4332824!3d23.2115162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzQxLjUiTiA3N8KwMjUnNTkuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹165 | 6 mins', ola: '₹155 | 7 mins', rapido: '₹70 | 2 mins' },
            menu: [
                { item: 'Spanish Latte', price: '₹220' },
                { item: 'Truffle Mushroom Pasta', price: '₹340' },
                { item: 'Artisan Espresso', price: '₹150' }
            ]
        },
        {
            id: 'cafe-mocha',
            name: 'Cafe Mocha',
            desc: 'A vibrant oasis offering a vast menu of continental dishes, shakes, and premium coffees.',
            tags: ['⭐ 4.5', '👪 Family', 'Lounge'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Cafe+Mocha+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117304.75782782767!2d77.3370959082717!3d23.2562854378822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE4LjYiTiA3N8KwMjYnMDIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹170 | 5 mins', ola: '₹165 | 6 mins', rapido: '₹75 | 3 mins' },
            menu: [
                { item: 'Mocha Frappe', price: '₹240' },
                { item: 'Sizzler Cafe Brownie', price: '₹280' },
                { item: 'Cappuccino', price: '₹160' }
            ]
        },
        {
            id: 'pinewood',
            name: 'Pinewood Roasters',
            desc: 'A hidden gem dedicated to single-origin beans and pour-over brewing methods.',
            tags: ['🧑‍💻 Workspace', 'Quiet', 'Specialty Coffee'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Pinewood+Roasters+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117304.75782782767!2d77.3370959082717!3d23.2562854378822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹95 | 3 mins', ola: '₹90 | 4 mins', rapido: '₹40 | 1 min' },
            menu: [
                { item: 'V60 Pour Over', price: '₹200' },
                { item: 'Aeropress Blend', price: '₹180' },
                { item: 'Espresso Tonic', price: '₹210' },
                { item: 'Vegan Brownie', price: '₹160' }
            ]
        },
        {
            id: 'third-wave',
            name: 'Third Wave Coffee',
            desc: 'Premium coffee chain offering expertly crafted drinks and relaxed ambiance.',
            tags: ['❤️ Couple Friendly', '🧑‍💻 Workspace', 'Global Chain'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Third+Wave+Coffee+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.1264259364!2d77.43389457599003!3d23.23849537805177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzE4LjYiTiA3N8KwMjYnMDIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹140 | 6 mins', ola: '₹135 | 7 mins', rapido: '₹55 | 2 mins' },
            menu: [
                { item: 'Sea Salt Mocha', price: '₹250' },
                { item: 'French Vanilla Latte', price: '₹240' },
                { item: 'Almond Croissant', price: '₹180' },
                { item: 'Pancakes', price: '₹210' }
            ]
        },
        {
            id: 'starbucks',
            name: 'Starbucks DB City',
            desc: 'The iconic global coffee brand stationed in the heart of DB City Mall.',
            tags: ['👪 Family Friendly', 'Shopping Mall', 'Global Chain'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Starbucks+DB+City+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.9928498455643!2d77.42864227599026!3d23.235903978021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE0JzA5LjMiTiA3N8KwMjUnNDMuMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹160 | 5 mins', ola: '₹155 | 4 mins', rapido: '₹75 | 3 mins' },
            menu: [
                { item: 'Java Chip Frappuccino', price: '₹340' },
                { item: 'Caramel Macchiato', price: '₹310' },
                { item: 'Blueberry Muffin', price: '₹280' },
                { item: 'Signature Hot Chocolate', price: '₹260' }
            ]
        },
        {
            id: 'roasters',
            name: 'Roasters Coffee House',
            desc: 'Local favorite for specialty blends and an excellent workspace environment.',
            tags: ['❤️ Couple Friendly', 'Live Music', 'Artisan Coffee'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=Roasters+Coffee+House+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117304.75782782767!2d77.3370959082717!3d23.2562854378822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹110 | 4 mins', ola: '₹100 | 5 mins', rapido: '₹45 | 2 mins' },
            menu: [
                { item: 'Flat White', price: '₹190' },
                { item: 'Iced Americano', price: '₹140' },
                { item: 'Chicken Pesto Sandwich', price: '₹220' },
                { item: 'Brownie Shake', price: '₹210' }
            ]
        },
        {
            id: 'ten-suites',
            name: 'The Ten Suites',
            desc: 'A luxurious boutique cafe offering elegant Mediterranean dishes and mocktails intertwined with great coffee.',
            tags: ['❤️ Couple Friendly', 'Luxurious', 'Fine Dining'],
            gMapsLink: 'https://www.google.com/maps/search/?api=1&query=The+Ten+Suites+Bhopal',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.866160100416!2d77.4332824!3d23.2115162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzQxLjUiTiA3N8KwMjUnNTkuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
            cabs: { uber: '₹210 | 8 mins', ola: '₹200 | 9 mins', rapido: '₹95 | 4 mins' },
            menu: [
                { item: 'Turkish Coffee', price: '₹260' },
                { item: 'Matcha Latte', price: '₹280' },
                { item: 'Avocado Toast', price: '₹320' },
                { item: 'Truffle Fries', price: '₹240' }
            ]
        }
    ];

    const cafeListEl = document.getElementById('bhopal-cafe-list');
    const cafeTitleEl = document.getElementById('detail-cafe-name');
    const cafeDescEl = document.getElementById('detail-cafe-desc');
    const cafeTagsEl = document.getElementById('detail-cafe-tags');
    const directionsBtnEl = document.getElementById('detail-directions-btn');
    const cafeMapEl = document.getElementById('cafe-map-iframe');
    const menuBoxEl = document.getElementById('cafe-menu-box');
    const menuListEl = document.getElementById('cafe-menu-list');
    const rideOptionsEl = document.getElementById('ride-options');
    
    const uberEstEl = document.getElementById('est-uber');
    const olaEstEl = document.getElementById('est-ola');
    const rapidoEstEl = document.getElementById('est-rapido');

    if (cafeListEl) {
        bhopalCafes.forEach((cafe, index) => {
            const item = document.createElement('div');
            item.className = 'cafe-item';
            if (index === 0) item.classList.add('active'); // active first item
            
            item.innerHTML = `
                <h4>${cafe.name}</h4>
                <p>📍 ${cafe.tags[0]}</p>
            `;
            
            item.addEventListener('click', () => {
                // Remove active class
                document.querySelectorAll('.cafe-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                
                // Update details with animation
                cafeTitleEl.style.opacity = '0';
                cafeDescEl.style.opacity = '0';
                if(cafeTagsEl) cafeTagsEl.style.opacity = '0';
                
                setTimeout(() => {
                    cafeTitleEl.textContent = cafe.name;
                    cafeDescEl.textContent = cafe.desc;
                    cafeMapEl.src = cafe.mapSrc;
                    
                    // Show Directions Button
                    if(directionsBtnEl) {
                        directionsBtnEl.href = cafe.gMapsLink;
                        directionsBtnEl.style.display = 'inline-block';
                    }
                    
                    // Populate tags
                    if(cafeTagsEl) {
                        cafeTagsEl.innerHTML = cafe.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                        cafeTagsEl.style.opacity = '1';
                        cafeTagsEl.style.transition = 'opacity 0.3s ease';
                    }
                    
                    // Populate menu
                    menuListEl.innerHTML = '';
                    cafe.menu.forEach(mi => {
                        menuListEl.innerHTML += `
                            <li class="menu-item">
                                <span class="menu-item-name">${mi.item}</span>
                                <span class="menu-item-price">${mi.price}</span>
                            </li>
                        `;
                    });
                    
                    // Populate Live Cab Estimates
                    if(uberEstEl && cafe.cabs) uberEstEl.textContent = cafe.cabs.uber;
                    if(olaEstEl && cafe.cabs) olaEstEl.textContent = cafe.cabs.ola;
                    if(rapidoEstEl && cafe.cabs) rapidoEstEl.textContent = cafe.cabs.rapido;
                    
                    menuBoxEl.style.display = 'block';
                    rideOptionsEl.style.display = 'block';
                    
                    cafeTitleEl.style.opacity = '1';
                    cafeTitleEl.style.transition = 'opacity 0.3s ease';
                    cafeDescEl.style.opacity = '1';
                    cafeDescEl.style.transition = 'opacity 0.3s ease';
                }, 200);
            });
            
            cafeListEl.appendChild(item);
        });
        
        // Trigger click on first to init safely
        if (cafeListEl.firstElementChild) {
            try {
                cafeListEl.firstElementChild.click();
            } catch(e) { console.error("Error triggering cafe selection", e); }
        }
    }

    // Interactive ride buttons with Mobile Deep Linking / Official Web Booking
    document.querySelectorAll('.ride-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target.closest('.ride-btn');
            const service = btnEl.getAttribute('data-service');
            const cafeName = cafeTitleEl.textContent;
            const queryName = encodeURIComponent(cafeName + ', Bhopal');
            
            let deepLink = '';
            
            if (service === 'Uber') {
                deepLink = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${queryName}`;
            } else if (service === 'Ola') {
                deepLink = `https://book.olacabs.com/?pickup_name=Current+Location&drop_name=${queryName}`;
            } else if (service === 'Rapido') {
                // Safest cross-platform fallback for bike taxis where url schemes are strictly mobile
                deepLink = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${queryName}&travelmode=two-wheeler`;
            } else {
                deepLink = directionsBtnEl.href;
            }
            
            let userConfirm = confirm(`Launch the official ${service} portal to book a ride from your Current Location to ${cafeName}?`);
            if(userConfirm) {
                window.open(deepLink, '_blank');
            }
        });
    });

    // 6. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply clean minimal fade-in to sections
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial, .bhopal-cafes .cafe-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // 7. Interactive Quiz Modal Logic
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizModal = document.getElementById('quiz-modal');
    const closeQuizBtn = document.getElementById('close-quiz-modal');
    const quizContainer = document.getElementById('quiz-container');

    const quizQuestions = [
        {
            question: "How do you prefer your morning brew?",
            options: [
                { text: "Black & Strong ☕", type: "dark" },
                { text: "With Milk & Sugar 🥛", type: "medium" },
                { text: "Cold & Refreshing 🧊", type: "light" }
            ]
        },
        {
            question: "Which flavor profile speaks to you?",
            options: [
                { text: "Earthy, Smoky, Cocoa 🍫", type: "dark" },
                { text: "Sweet, Nutty, Caramel 🥜", type: "medium" },
                { text: "Fruity, Floral, Citrus 🍋", type: "light" }
            ]
        },
        {
            question: "What's your preferred brewing method?",
            options: [
                { text: "Espresso / French Press ⚙️", type: "dark" },
                { text: "Auto-Drip / Aeropress 🫖", type: "medium" },
                { text: "Pour Over / Cold Brew ❄️", type: "light" }
            ]
        }
    ];

    let currentQuestion = 0;
    let userAnswers = { light: 0, medium: 0, dark: 0 };

    if (startQuizBtn && quizModal) {
        startQuizBtn.addEventListener('click', () => {
            currentQuestion = 0;
            userAnswers = { light: 0, medium: 0, dark: 0 };
            renderQuiz();
            quizModal.style.display = 'flex';
        });
    }

    if (closeQuizBtn && quizModal) {
        closeQuizBtn.addEventListener('click', () => {
            quizModal.style.display = 'none';
        });
    }

    function renderQuiz() {
        if (currentQuestion >= quizQuestions.length) {
            showQuizResult();
            return;
        }
        
        const q = quizQuestions[currentQuestion];
        const progress = ((currentQuestion) / quizQuestions.length) * 100;
        
        let html = `
            <div class="quiz-progress"><div class="quiz-progress-bar" style="width: ${progress}%"></div></div>
            <h2 class="section-title text-accent mb-4" style="font-size: 1.5rem; color: var(--text-dark);">${q.question}</h2>
            <div class="quiz-options-list">
        `;
        
        q.options.forEach((opt) => {
            html += `<button class="quiz-option" onclick="handleQuizAnswer('${opt.type}')">${opt.text}</button>`;
        });
        
        html += `</div>`;
        quizContainer.innerHTML = html;
    }

    window.handleQuizAnswer = function(type) {
        userAnswers[type]++;
        currentQuestion++;
        renderQuiz();
    };

    function showQuizResult() {
        let resultType = Object.keys(userAnswers).reduce((a, b) => userAnswers[a] > userAnswers[b] ? a : b);
        const match = coffeeData.find(c => c.type === resultType);
        
        quizContainer.innerHTML = `
            <div class="quiz-progress"><div class="quiz-progress-bar" style="width: 100%"></div></div>
            <h2 class="section-title text-accent mb-2" style="font-size:2rem;">We Found Your Match!</h2>
            <p class="text-muted mb-4">Based on your taste profile, we recommend a ${resultType} roast.</p>
            
            <div class="roast-info-block" style="text-align: left; background: rgba(207,168,116,0.1); border-left: 3px solid var(--accent-green);">
                <span class="tag mb-2" style="display:inline-block;">${match.type.toUpperCase()} ROAST</span>
                <h3 style="color:var(--text-dark); margin-bottom:0.5rem; font-size:1.4rem;">${match.name}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;"><strong>Notes:</strong> ${match.notes}</p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <h4 style="color:var(--accent-green); margin-bottom:0.3rem;">Recommend Brew:</h4>
                    <p style="font-size:0.9rem; color: var(--text-dark);">${match.brew}</p>
                </div>
            </div>
            
            <button class="btn btn-primary mt-4" style="width:100%" onclick="document.getElementById('close-quiz-modal').click();">Explore Complete Menu</button>
        `;
    }

    // 8. Authentication & Login Modal Logic (OTP simulation)
    const navLoginBtn = document.getElementById('nav-login-btn');
    const heroLoginBtn = document.getElementById('hero-login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeLoginBtn = document.getElementById('close-login-modal');
    
    // Auth elements
    const authForm = document.getElementById('auth-form');
    const authContact = document.getElementById('auth-contact');
    const otpSection = document.getElementById('otp-section');
    const authOtp = document.getElementById('auth-otp');
    const authStepBtn = document.getElementById('auth-step-btn');
    const authStatus = document.getElementById('auth-status');
    const authDashboard = document.getElementById('auth-user-dashboard');
    const logoutBtn = document.getElementById('logout-btn');

    let currentAuthStep = 'phone'; // 'phone' -> 'otp'

    // Check if previously logged in
    function checkLoginState() {
        let user = null;
        try {
            user = localStorage.getItem('brewBuddyUser');
        } catch(e) {
            console.warn("localStorage not available", e);
        }

        if(user) {
            if(navLoginBtn) navLoginBtn.textContent = 'My Profile';
            if(authForm) authForm.style.display = 'none';
            if(authDashboard) authDashboard.style.display = 'block';
            return true;
        } else {
            if(navLoginBtn) navLoginBtn.textContent = 'Log In';
            if(authForm) {
                authForm.style.display = 'flex';
                // Safe reset
                try { authForm.reset(); } catch(e){}
                if(otpSection) otpSection.style.display = 'none';
                if(authStepBtn) authStepBtn.textContent = 'Get OTP';
                currentAuthStep = 'phone';
            }
            if(authDashboard) authDashboard.style.display = 'none';
            return false;
        }
    }

    checkLoginState(); // check on boot

    window.openLoginGlobal = function(e) {
        if(e) e.preventDefault();
        checkLoginState();
        if(loginModal) loginModal.style.display = 'flex';
        if(authStatus) authStatus.style.display = 'none';
    };

    const loginLinks = document.querySelectorAll('a[href="#login"]');
    loginLinks.forEach(link => {
        link.addEventListener('click', window.openLoginGlobal);
    });

    if(closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    if(authStepBtn) {
        authStepBtn.addEventListener('click', () => {
            if (currentAuthStep === 'phone') {
                if(authContact.value.trim().length < 5) return alert("Please enter a valid number or email.");
                
                authStatus.textContent = "Sending OTP securely...";
                authStatus.style.display = 'block';
                authStepBtn.disabled = true;
                
                // Simulate network delay
                setTimeout(() => {
                    authStatus.style.display = 'none';
                    authStepBtn.disabled = false;
                    otpSection.style.display = 'flex';
                    authStepBtn.textContent = 'Verify & Login';
                    currentAuthStep = 'otp';
                }, 1000);
            } else if (currentAuthStep === 'otp') {
                if(authOtp.value.trim().length < 4) return alert("Please enter the OTP.");
                
                authStatus.textContent = "Verifying...";
                authStatus.style.color = "var(--accent-green)";
                authStatus.style.display = 'block';
                authStepBtn.disabled = true;
                
                setTimeout(() => {
                    // Save to database/localStorage safely
                    try {
                        localStorage.setItem('brewBuddyUser', JSON.stringify({
                            contact: authContact.value,
                            timestamp: new Date().toISOString()
                        }));
                    } catch(e) { console.warn("Failed to save session", e); }
                    
                    authStatus.style.display = 'none';
                    authStepBtn.disabled = false;
                    checkLoginState();
                }, 1200);
            }
        });
    }
    
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
             try { localStorage.removeItem('brewBuddyUser'); } catch(e){}
             checkLoginState();
        });
    }

    // 9. AI Chatbot Logic
    const aiChatbotIcon = document.getElementById('ai-chatbot-icon');
    const aiChatbotWindow = document.getElementById('ai-chatbot-window');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSend = document.getElementById('ai-chat-send');

    if (aiChatbotIcon && aiChatbotWindow) {
        window.toggleChatbotGlobal = function(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            if(aiChatbotWindow.style.display === 'none' || window.getComputedStyle(aiChatbotWindow).display === 'none') {
                aiChatbotWindow.style.display = 'flex';
                aiChatbotIcon.style.transform = 'scale(0)';
            }
        };

        window.closeChatbotGlobal = function(e) {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            aiChatbotWindow.style.display = 'none';
            aiChatbotIcon.style.transform = 'scale(1)';
        };

        // Attach listeners locally too
        aiChatbotIcon.addEventListener('click', window.toggleChatbotGlobal);
        closeChatbotBtn.addEventListener('click', window.closeChatbotGlobal);

        const appendMessage = (text, sender) => {
            const msgLine = document.createElement('div');
            msgLine.style.maxWidth = '85%';
            msgLine.style.padding = '0.8rem 1rem';
            msgLine.style.borderRadius = '1rem';
            msgLine.style.marginBottom = '0.5rem';
            msgLine.style.lineHeight = '1.4';

            if (sender === 'user') {
                msgLine.style.alignSelf = 'flex-end';
                msgLine.style.background = 'var(--accent-green)';
                msgLine.style.color = '#14100e';
                msgLine.style.borderBottomRightRadius = '0';
            } else {
                msgLine.style.alignSelf = 'flex-start';
                msgLine.style.background = 'rgba(207,168,116,0.1)';
                msgLine.style.color = 'var(--text-dark)';
                msgLine.style.borderBottomLeftRadius = '0';
            }

            // Support simple html bolding
            msgLine.innerHTML = text; 
            aiChatMessages.appendChild(msgLine);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            return msgLine;
        };

        let chatState = "idle";

        const processBotResponse = (query) => {
            const q = query.toLowerCase();
            let response = "";

            if (q.includes('recommend') || q.includes('suggest') || q.includes('taste') || q.includes('which coffee')) {
                response = "I'd love to recommend a coffee or cafe! Tell me, do you prefer your coffee **Strong & Bold** (Dark), **Smooth & Sweet** (Medium), or **Fruity & Bright** (Light)?";
                chatState = "awaiting_preference";
            } 
            else if (chatState === "awaiting_preference" && (q.includes('strong') || q.includes('bold') || q.includes('dark'))) {
                response = "Since you love bold flavors, I highly recommend our **Wayanad Robusta Cherry** roast! It's intense and smoky. For a cafe in Bhopal, try **Indian Coffee House** for their authentic strong filter coffee.";
                chatState = "idle";
            }
            else if (chatState === "awaiting_preference" && (q.includes('smooth') || q.includes('sweet') || q.includes('medium') || q.includes('milk') || q.includes('sugar'))) {
                response = "A sweet and smooth choice! Check out the **Coorg Peaberry Blend**, which has caramel and nutty notes. In Bhopal, **Nothing Before Coffee** serves excellent creamy lattes that will suit your taste perfectly.";
                chatState = "idle";
            }
            else if (chatState === "awaiting_preference" && (q.includes('fruity') || q.includes('bright') || q.includes('light') || q.includes('black'))) {
                response = "For bright, citrusy notes, you must try the **Nilgiri Blue Mountain Light Roast**. It's stunning when brewed as a pour-over. I suggest visiting **Sagar Gaire** or a specialty roaster in Bhopal and asking for an Aeropress brew!";
                chatState = "idle";
            }
            else if (q.includes('bhopal') || q.includes('cafe')) {
                response = "I highly recommend **Indian Coffee House (ICH)** for its heritage and Filter Coffee, or **Nothing Before Coffee** for an aesthetic modern vibe. Both are top-rated in Bhopal! Would you like me to book a cab to one of them?";
            } else if (q.includes('heritage') || q.includes('history') || q.includes('indian')) {
                response = "India's coffee heritage runs deep! Legend says Baba Budan brought 7 coffee beans from Yemen to the Chandragiri hills in the 16th century. Today, Indian Monsooned Malabar and robusta beans from Wayanad are celebrated globally for their unique spicy, intense notes.";
            } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
                response = "Hello there! I'm BrewBot, your personal coffee expert. You can ask me for Bhopal cafe suggestions, or tell me your taste preferences and I'll recommend the perfectly matched Indian coffee roast!";
            } else if (q.includes('brew') || q.includes('recipe')) {
                response = "For a perfect V60 pour over: Use 15g of medium-fine coffee (like Chikmagalur Light Roast) and 250ml of 93°C water. Pour 45g of water to bloom for 30 seconds, then slowly pour the rest in continuous circles. Enjoy!";
            } else {
                response = "That's a fascinating query! I can analyze your taste and **recommend a coffee**, help you discover Bhopal's top cafes, guide you through brewing authentic filter coffee, or share rich insights into Indian coffee heritage. Try asking me for a 'Coffee Recommendation'!";
            }

            // Simulate AI "typing" delay
            const typingIndicator = appendMessage('...', 'bot');
            
            setTimeout(() => {
                typingIndicator.remove();
                appendMessage(response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'), 'bot');
            }, 1000 + Math.random() * 1000);
        };

        const handleSend = () => {
            const val = aiChatInput.value.trim();
            if(!val) return;
            appendMessage(val, 'user');
            aiChatInput.value = '';
            processBotResponse(val);
        };

        aiChatSend.addEventListener('click', handleSend);
        aiChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

});
