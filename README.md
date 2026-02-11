# Valentine's Prank Website

A humorous, interactive single-page website designed to prank your Valentine, built with the latest version of **Angular**.

## 🚀 Setup & Running Locally

### Prerequisites
-   **Node.js** (v18 or higher recommended) installed on your machine.
-   **Angular CLI** (optional, but good to have: `npm install -g @angular/cli`)

### 1. Installation
Open your terminal/command prompt in this project folder (`c:\coffeez\valenz`) and run:

```bash
npm install
```

This will install all necessary dependencies including Bootstrap and Angular core packages.

### 2. Run the App
To start the development server and open the site in your default browser, run:

```bash
ng serve --open
```

The app will typically load at `http://localhost:4200/`.

---

## 🎨 Features & Stages

The website guides the user through 8 stages of increasingly "annoying" but fun interactions:

1.  **The Gaslight**: Buttons swap positions and text changes to confuse the user.
2.  **The Runaway**: The "YES" button physically evades the mouse cursor.
3.  **The Loading Prank**: A gift that never quite loads, ending with a bad drawing.
4.  **The Rigged Survey**: A 5-star rating system that forces a 1-star review.
5.  **Backhanded Compliment**: A button that serves "compliments" like "You have a great forehead."
6.  **The Air Horn**: A "Is it peaceful?" question where "No" triggers a visual and audio alert.
7.  **The Dinner Loop**: An input field that overwrites whatever is typed with "Whatever you want, I don't care."
8.  **The Final Slider**: A slider that shakes the screen when moved to "Dumping" and reveals the surprise at "Love".

## 🛠️ Technical Details

-   **Framework**: Angular (Latest, Standalone Components)
-   **State Management**: Angular Signals (`signal`, `computed`, `effect`)
-   **Styling**: Bootstrap 5 + Custom CSS Glassmorphism
-   **Animations**: `@angular/animations` (Triggers, Keyframes, Transitions)

## 📂 Project Structure

-   `src/app/app.ts`: Main logic using Signals and Animation triggers.
-   `src/app/app.html`: The HTML template using `@if` and `@switch` syntax.
-   `src/app/app.css`: Custom styles for glass effect and specific animations.
-   `src/styles.css`: Global styles and Bootstrap import.

## 🎥 Video Backgrounds

The application supports background videos for different stages. 
Place the following video files in the `public/assets/` folder:

- `videoA.mp4`: Plays during Stage 2 & 3
- `videoB.mp4`: Plays during Stage 4 & 5
- `videoC.mp4`: Plays during Stage 6 & 7
- `videoD.mp4`: Plays after the final Stage 8 popup (The Real Surprise)

