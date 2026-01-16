# OnTrack Frontend

## Overview

OnTrack Frontend is the web application for the AI-driven career navigation platform, OnTrack. It manages user interactions, authentication flows, onboarding, assessments, dashboards, and visualizes AI-generated career roadmaps. The application is state-driven, ensuring it reacts solely to backend and database state, rather than predefined routes.

## Features & Functionality

- **Authentication**:
  - Email-based and Google OAuth integration.
- **State-based Routing**:
  - Seamless navigation from Onboarding to Assessment and Dashboard, driven by backend state.
- **Career Assessment UI**:
  - Intuitive interfaces for assessing user skills and interests.
- **Interactive Dashboard**:
  - Career summary and progression tracking.
  - Visualized skill gaps and tailored learning roadmaps.
- **AI Career Coach UI**:
  - Engaging career coaching powered by AI.
- **Smooth UX**:
  - Powered by Framer Motion for animations.
  - Lenis smooth scrolling for an enhanced experience.
- **Production Deployment**:
  - Fully deployed on Vercel.

## Tech Stack

- React (Vite)
- JavaScript
- Tailwind CSS
- Framer Motion
- Supabase Auth
- Vercel (Deployment)

## Prerequisites & Setup

### Requirements

- Node.js 18+
- Supabase project (URL + anon key)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Morpheus-xz/OnTrack-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ontrack-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file with the following variables:

```dotenv
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### Run Locally

Start the development server:

```bash
npm run dev
```

## Project Structure (High Level)

```plaintext
src/
 ├── pages/
 │   ├── Auth.jsx
 │   ├── Onboarding.jsx
 │   ├── Assessment.jsx
 │   ├── Dashboard.jsx
 ├── dashboard/
 ├── components/
 ├── lib/
 │   └── supabase.js
```

## Contribution Guidelines

- Avoid hardcoding navigation logic.
- Routing should rely on Supabase state.
- Keep UI logic isolated from backend logic.
- Maintain accessibility and performance across all features.

## Deployment

- Hosted on [Vercel](https://vercel.com/).
- Single Page Application (SPA) setup with routing fallback.
- Environment variables are configured via the Vercel dashboard.

## Additional Notes

OnTrack Frontend is a key part of the full-stack system, designed to react to validated backend outputs:

- AI decisions are guarded by backend logic and database constraints.
- The frontend strictly adheres to validated responses from the backend, ensuring accuracy and consistency.
