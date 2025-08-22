<div align="center">
  <img src="https://raw.githubusercontent.com/isabelli-mocci/handwork-ecommerce/refs/heads/main/public/banner-github.png" alt="Mocci & Co. Logo">
 <br><br>

  # 🛍️ Mocci & Co. Handwork E-commerce

<br>

![React](https://img.shields.io/badge/React-19.1-FF69B4?style=for-the-badge&logo=react&logoColor=white&labelColor=FF69B4&link=https%3A%2F%2Freact.dev%2F)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=3178C6&link=https%3A%2F%2Fwww.typescriptlang.org%2F)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=06B6D4&link=https%3A%2F%2Ftailwindcss.com%2F)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=646CFF&link=https%3A%2F%2Fvitejs.dev%2F)
![Framer](https://img.shields.io/badge/Framer%20Motion-12.23-FF0081?style=for-the-badge&logo=framer&logoColor=white&labelColor=FF0081&link=https%3A%2F%2Fwww.framer.com%2Fmotion%2F)
![Router](https://img.shields.io/badge/React%20Router%20DOM-7.6-CA4245?style=for-the-badge&logo=react-router&logoColor=white&labelColor=CA4245&link=https%3A%2F%2Freactrouter.com%2F)

</div> <br>

<div align="center">

Mocci & Co. Handwork is a fictional **handmade baby layette and crafts e-commerce**, developed as a portfolio project to enhance my **frontend development** skills. I focused on software architecture, componentization, state management, and user experience (UX).


### Access the website [by clicking here!](https://mocci-and-co-handwork.vercel.app/)

</div>

### Main Features

* **Dynamic Product Catalog**: Product listing page with filters by category, color, price range, and sorting.
* **Product Details**: Dedicated page with complete information, image carousel, and interactivity.
* **Shopping Cart & Checkout**: Full purchase flow, from adding products to a multi-step checkout.
* **Wishlist**: Feature to favorite products and access them on a dedicated page.
* **Enhanced UI/UX**: Custom confirmation toasts, loading states, and responsive design.

### Live Demo

This project is online and can be accessed here:
👉 **[https://mocci-and-co-handwork.vercel.app/](https://mocci-and-co-handwork.vercel.app/)**

## 🚀 Technologies

| Category       | Technology                                        |
| -------------- | ------------------------------------------------- |
| **Frontend**   | 🔹 **React 19** (Main library)                    |
|                | 🔹 **TypeScript** (Static typing & safety)        |
| **Styling**    | 🔹 **Tailwind CSS** (Utility-first CSS framework) |
| **Animations** | 🔹 **Framer Motion** (Animation library)          |
| **Tools**      | 🔹 **Vite** (Dev environment & build tool)        |
| **Deployment** | 🔹 **Vercel** (Hosting & CI/CD deployment)        |
| **Others**     | 🔹 **React Router DOM** (Routing)                 |

## 📁 Project Structure & Architecture

The project follows a **Component-Based Architecture** with strong emphasis on separation of concerns. State logic and business rules are encapsulated in **custom hooks**, keeping UI components clean and reusable. This makes the code more maintainable, reusable, and testable.

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

## ✨ Features

### **Cart & Checkout**

The purchase flow is complete and intuitive. On the `CartPage`, users can adjust quantities and remove items. The `CheckoutPage` is divided into steps (shipping and payment), with loading feedback and a confirmation modal at the end.

### **Wishlist**

The `WishlistPage` allows users to save products for later. State persistence is handled via `localStorage`.

### **Filters & Search**

The `ProductsPage` offers filters by category, color, price, and a search bar, along with dynamic sorting options.

---

## 🔒 License & Copyright

© 2025 Mocci & Co. All rights reserved.

This is a **personal portfolio project**. The design, code, and concept must not be copied, modified, or distributed without permission.

---
<div align="center">
  Made with 🩷 by  <a href="https://www.isabellimocci.com/"> Isabelli Mocci</a>
</div> <br>

<!-- Minha assinatura -->
<table align="center">
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/isabelli-mocci">
        <img src="https://avatars.githubusercontent.com/u/191166352?v=4" width="100px" style="border-radius: 50%;" alt="Isabelli Mocci Avatar"/>
        <br>
      </a>
    </td>
    <td align="left" style="padding-left: 15px;">
      <p><strong>📬 Contact us:</strong></p>
      <p>
        <a href="https://www.linkedin.com/in/isabelli-mocci/" target="_blank" style="text-decoration: none;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="18px" alt="LinkedIn">
          <span>LinkedIn - Isabelli Cristina Mocci</span>
        </a>
      </p>
      <p>
        <a href="mailto:isabellimocci.tech@gmail.com" style="text-decoration: none;">
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="18px" alt="Email">
          <span>Email - isabellimocci.tech@gmail.com</span>
        </a>
      </p>
    </td>
  </tr>
</table>
