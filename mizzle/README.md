#MIZZLE ECOMERCE 


Project Overview

Mizzle is a modern e-commerce web application built with Next.js. It features a robust authentication flow, user management, and a modular frontend-backend architecture. The app includes login/signup functionality, API integration, and reusable components to ensure scalability and maintainability.

It is designed to provide a smooth user experience with secure access to protected routes such as cart, checkout, and profile pages.

Key Features
User Authentication: Secure login and signup system with protected routes.
Modular File Structure: Well-organized folders for pages (app), API (api), state (store), and styling (styles).
Reusable Components: Navbar, Footer, Buttons, Inputs, and Product components for faster development.
API Integration: Backend handled through api/auth and api/products routes.
Protected Routes: Middleware integration for secure pages.
Next.js Framework: SEO-friendly, server-side rendered, and high-performance web app.
Folder Structure
mizzle/
├── app/                              # Pages & Routes
│   ├── layout.js                     # Global layout (Navbar/Footer, Providers)
│   ├── loading.js                    # Common loading spinner
│   ├── page.js                       # Homepage ('/')
│   ├── login/
│   │   └── page.js                   # Login page ('/login')
│   ├── register/
│   │   └── page.js                   # Signup page ('/register')
│   ├── products/
│   │   ├── page.js                   # All Products ('/products')
│   │   └── [id]/page.js              # Single Product ('/products/:id')
│   ├── cart/page.js                  # Shopping Cart ('/cart', protected)
│   ├── checkout/page.js              # Checkout ('/checkout', protected)
│   ├── profile/
│   │   ├── page.js                   # User Profile ('/profile', protected)
│   │   └── orders/page.js            # Order History ('/profile/orders', protected)
│   └── api/                          # Backend API routes
│       ├── products/route.js         # Products API
│       └── auth/route.js             # Login/Signup API
│
├── components/                       # Reusable UI components
│   ├── layout/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── ui/
│   │   ├── Button.js
│   │   └── Input.js
│   └── product/                      # Product card components
│
├── middleware.js                     # Protected route middleware
├── public/                           # Static assets
│   └── logo.png
├── store/                             # State management (Redux/Zustand)
│   └── useCartStore.js
└── styles/                            # Global CSS / SCSS
    └── globals.css
Technologies Used
Next.js – React-based framework for SSR and routing.
React – Component-driven UI development.
JavaScript (ES6+) – Core logic and interactivity.
CSS/SCSS – Styling components and layouts.
Node.js – Backend logic via API routes.
Middleware – Authentication and protected route handling.
Setup & Installation

Clone the repository:

git clone https://github.com/Dineshindiexpert/inditronix.git

Navigate to the project directory:

cd mizzle

Install dependencies:

npm install

Run the development server:

npm run dev
Open in browser:
http://localhost:3000
Usage
Visit the signup page to create a new account.
Login through the login page to access protected features.
Browse products, add items to the cart, and checkout.
Access your profile to view order history.
API endpoints can be tested via /api/auth and /api/products.
Contributors
Dinesh (Dineshindiexpert) – Full-stack development, architecture, and project implementation
