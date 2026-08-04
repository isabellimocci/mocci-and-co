<div align="center">
  <img src="https://raw.githubusercontent.com/isabellimocci/handwork-ecommerce/refs/heads/main/public/banner-github.png" alt="Mocci & Co. Logo">
 <br><br>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion_12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7.6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

  # Mocci & Co. Handwork E-commerce

</div>

<div align="justify">

<strong>Mocci & Co. Handwork</strong> is a fictional e-commerce site specializing in handmade plush toys. Developed as a portfolio project to demonstrate advanced frontend development skills, it focuses on:

- Scalable software architecture
- Componentization and code reuse
- User experience (UX) and modern interface
- Mobile-first responsive design
- Performance and optimization

This project showcases real-world e-commerce functionality including product browsing, filtering, shopping cart management, and a complete checkout flow.

> 👉 Access the website [by clicking here!](https://mocci-and-co-handwork.vercel.app/)

</div>

## Features

### **Advanced Product Catalog**
- **Smart Filtering System**: Multi-criteria filtering by category, color, price range, and text search
- **Dynamic Sorting**: Sort products by price (ascending/descending), name (A-Z/Z-A), and best-selling
- **Responsive Design**: Optimized sidebar filters for mobile and desktop layouts
- **Real-time Updates**: Instant filtering and sorting without page reloads

### **Immersive Product Experience**
- **Interactive Image Gallery**: Multiple product images with smooth transitions
- **Mobile-Optimized Carousel**: Touch-friendly image navigation for mobile devices
- **Lightbox Integration**: Full-screen image viewing with `yet-another-react-lightbox`
- **Product Actions**: Add to cart, add to wishlist, share functionality

### **Seamless Shopping Flow**
- **Persistent Cart State**: Shopping cart maintained across sessions using React Context
- **Multi-step Checkout**: Guided checkout process with shipping and payment steps
- **Form Validation**: Real-time form validation with TypeScript type safety
- **Loading States**: Comprehensive loading feedback throughout the purchase flow

### **Enhanced User Experience**
- **Toast Notifications**: Custom notifications using `react-hot-toast`
- **Micro-interactions**: Smooth animations powered by Framer Motion
- **Wishlist Persistence**: Favorites saved to localStorage with state management
- **Error Boundaries**: Graceful error handling with custom error pages

## Technologies

| Category       | Technology                                        |
| -------------- | ------------------------------------------------- |
| **Frontend**   | 🔹 **React 19** (Main library)                    |
|                | 🔹 **TypeScript** (Static typing & safety)        |
| **Styling**    | 🔹 **Tailwind CSS** (Utility-first CSS framework) |
| **Animations** | 🔹 **Framer Motion** (Animation library)          |
| **Tools**      | 🔹 **Vite** (Dev environment & build tool)        |
| **Deployment** | 🔹 **Vercel** (Hosting & CI/CD deployment)        |
| **Routing**    | 🔹 **React Router DOM** (Client-side routing)     |
| **UI/UX**      | 🔹 **React Hot Toast** (Notifications system)     |
|                | 🔹 **React Icons** (Icon library)                 |
|                | 🔹 **Yet Another React Lightbox** (Image gallery) |
| **Code Quality** | 🔹 **ESLint** (Code linting & formatting)       |
|                | 🔹 **Jest & Testing Library** (Unit testing)      |

## Project Structure

The project follows a **Component-Based Architecture** with strong emphasis on separation of concerns. State logic and business rules are encapsulated in **custom hooks**, keeping UI components clean and reusable.

### Folder Organization

```
src/
├── assets/        # Static assets
├── components/    # Reusable components
│   ├── common/    # Generic components
│   ├── features/  # Feature-specific components
│   ├── layout/    # Layout components
│   └── sections/  # Page sections
├── constants/     # Global constants
├── context/       # Global state management
├── data/          # Mock data (products, filters)
├── hooks/         # Custom hooks
├── models/        # Data models & TypeScript interfaces
├── pages/         # Main application pages
├── styles/        # Global styles & Tailwind config
├── types/         # Type definitions
└── utils/         # Utility functions & helpers
```

## Visual Showcase

### Desktop Experience

<div align="center">
  <img src="./public/desktop-demo.gif" alt="Desktop Demo">
</div>

### Mobile Experience

<div align="center">
  <img src="./public/mobile-demo.gif" alt="Mobile Demo" width="200px">
</div>

### Responsive Design
- **Mobile-First**: Optimized touch interactions and mobile navigation
- **Tablet-Friendly**: Adapted layouts for medium screen sizes
- **Desktop Enhanced**: Full-featured experience with expanded layouts
  
---

### ⚠️ Known Limitations
- **Mock Data**: Currently uses static data instead of real API
- **Payment Processing**: Simulated payment flow (no real transactions)
- **User Authentication**: Not implemented (planned for future versions)
- **Inventory Management**: Static stock levels (no real-time updates)

---

### 🔒 License & Copyright

© 2025 Mocci & Co. All rights reserved.

This is a **personal portfolio project**. The design, code, and concept must not be copied, modified, or distributed without permission.

---
<div align="center">
  Made with 🩷 by  <a href="https://www.isabellimocci.com/"> Isabelli Mocci</a>

  [🌐 Portfolio](www.isabellimocci.com) 
| [💼 LinkedIn](https://linkedin.com.br/in/isabellimocci/)
| [🐱 GitHub](https://github.com/isabellimocci) 
| [📬 E-mail](isabellimocci.tech@gmail.com)

</div>


