const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Database mock
const bhopalCafes = [
    {
        id: 'ich',
        name: 'Indian Coffee House',
        desc: 'A nostalgic favorite in Bhopal, serving iconic filter coffee and dosas in a retro setting.',
        tags: ['👪 Family Friendly', 'Heritage', 'Budget Friendly'],
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
        tags: ['❤️ Couple Friendly', 'Aesthetic', 'Desserts'],
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
        tags: ['❤️ Couple Friendly', 'Private Seating', 'Premium'],
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

// API Routes
app.get('/api/cafes', (req, res) => {
    res.json({ success: true, data: bhopalCafes });
});

// Start Server
app.listen(PORT, () => {
    console.log(`BrewBuddy full-stack backend running on http://localhost:${PORT}`);
});
