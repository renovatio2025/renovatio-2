# Lotto Number Generator Blueprint

## Overview
A modern, interactive web application that generates random Lotto numbers (6 out of 45) with a polished UI and smooth animations.

## Features
- **Random Generation:** Generates 6 unique numbers between 1 and 45.
- **Interactive UI:** A "Generate" button with hover effects and active states.
- **Visual Feedback:** Numbers appear with a sequential "pop" animation.
- **Responsive Design:** Fully functional and beautiful on both mobile and desktop.
- **Modern Aesthetics:** Uses `oklch` colors, glassmorphism effects, and deep shadows.

## Design Specifications
- **Typography:** Expressive sans-serif fonts.
- **Colors:** Vibrant palette based on Lotto ball categories (1-10: Yellow, 11-20: Blue, 21-30: Red, 31-40: Gray, 41-45: Green).
- **Effects:** Subtle noise texture background, multi-layered drop shadows for depth.

## Implementation Plan
1. **Scaffold Structure:** Update `index.html` with the main layout.
2. **Component Development:** Create a `LottoBall` web component.
3. **Styling:** Implement modern CSS in `style.css`.
4. **Logic:** Write the generation and animation logic in `main.js`.
