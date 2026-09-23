# PawsShop - Premium Dog Products

A beautiful, modern e-commerce website for selling dog products.

## Features

- **Modern Design**: Clean, responsive UI with smooth animations
- **Product Catalog**: Featured products with ratings and reviews
- **Shopping Cart**: Interactive cart with add/remove functionality
- **Category Browsing**: Shop by category (Food, Toys, Beds, Grooming, etc.)
- **Newsletter Signup**: Email subscription for deals
- **Contact Form**: Get in touch functionality
- **Testimonials**: Customer reviews section

## Getting Started

### View the Site

Simply open `index.html` in your browser, or run a local server:

```bash
npm install
npm start
```

Then visit `http://localhost:3000`

## Project Structure

```
/
├── index.html          # Main HTML file
├── src/
│   ├── styles/
│   │   └── styles.css  # All CSS styles
│   └── scripts/
│       └── main.js     # JavaScript functionality
├── package.json
└── README.md
```

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Playfair Display)

## Customization

### Colors

Edit the CSS variables in `src/styles/styles.css`:

```css
:root {
    --primary-color: #FF6B35;
    --secondary-color: #2D3047;
    --accent-color: #419D78;
    /* ... */
}
```

### Products

Products are defined in `index.html`. Each product card includes:
- Product name
- Description
- Price
- Rating
- Add to cart button with data attributes

## License

ISC
