
Project Overview

This is a React-based web application showcasing a robust multi-theme switching functionality. Users can seamlessly switch between three distinct themes directly from the header dropdown, experiencing significant changes in colors, fonts, spacing, and layout across the entire application. The selected theme intelligently persists across page reloads using local storage, ensuring a consistent user experience.

The application also demonstrates multi-page navigation using React Router and fetches dynamic product data from a public API to enrich the content display.

Features
Fixed Header: A persistent top header featuring a dummy app logo/name and a theme selection dropdown.

Three Distinct Themes:

Theme 1 (Default): A minimalist, light-background layout with a simple sans-serif font.

Theme 2 (Dark Mode): A sleek dark mode with a unique sidebar layout and a bold serif font.

Theme 3 (Colorful): A vibrant, playful theme featuring a card-based grid layout and a fun Google Font ("Pacifico").

Dynamic Layouts: Each theme significantly alters the overall structure, font sizes, margins, and component appearance.

Main Content Area: Includes a title, dummy paragraph, action button, and a dynamic product display (card component).

Theme Persistence: The chosen theme is saved and loaded from localStorage, remembering your preference even after closing and reopening the browser.

Global State Management: Leverages React Context API for efficient and scalable theme management.

API Integration: Fetches sample product data from https://fakestoreapi.com/products to populate the homepage.

Responsive Design: Built with Tailwind CSS to ensure optimal viewing and interaction across various devices, from mobile phones to large desktops, including a responsive sidebar for Theme 2.

Subtle Animations: Smooth transitions enhance the theme-switching experience.

Multi-Page Application: Navigable through React Router with distinct "Home", "About", and "Contact" pages, demonstrating theme consistency across routes.

Type-Safe Development: Developed entirely using TypeScript for improved code quality and maintainability.

No Large UI Libraries: Adheres to the requirement of not using heavy UI frameworks like Material UI or Ant Design, relying solely on Tailwind CSS for styling.

Technologies Used
React: Frontend JavaScript library for building user interfaces.

TypeScript: A Superset of JavaScript that adds static types.

Tailwind CSS: A utility-first CSS framework for rapid UI development and responsive design.

React Router Dom: For declarative routing in React applications.

React Context API: For efficient state management, specifically for theme control.

Fetch API: Used for making asynchronous HTTP requests to external data sources.

Getting Started

npm install
npm start
http://localhost:3000

Code Structure Highlights
src/contexts/ThemeContext.tsx: Manages the current theme state and persistence.

src/components/Header.tsx: Contains the main navigation and theme switcher dropdown.

src/pages/HomePage.tsx: Displays main content and fetches/renders product data.

src/pages/AboutPage.tsx: Demonstrates theme application on an informational page.

src/pages/ContactPage.tsx: Shows theme-adapted forms and contact details.

tailwind.config.js: Defines custom theme colors, font families (including "Pacifico" from Google Fonts), and responsive breakpoints.


