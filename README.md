# Manifest Me

Manifest Me is a calming web application that helps users reflect on their emotions and receive supportive affirmations. The app combines journaling with AI-generated encouragement to promote mindfulness and emotional well-being.

🔗 Live Demo  
https://manifest-me-five.vercel.app

---

## Overview

Manifest Me provides two core features:

### Daily Affirmations
- Generates positive affirmations to help users start their day with encouragement.
- Users can also add their own affirmations.

### Ask the Universe
- Users can describe how they feel.
- The app sends the prompt to an AI API which returns a short supportive affirmation.

The goal of this project was to explore how AI can be used responsibly to support mental wellness while maintaining a simple, calming user experience.

---

## Tech Stack

Frontend
- Next.js
- React
- Tailwind CSS

Backend
- Next.js API Routes

AI Integration
- Google Gemini API

Deployment
- Vercel

Version Control
- GitHub

---

## Key Features

- AI-powered affirmation generator
- User mood input with supportive AI response
- Daily affirmation generator
- Custom affirmation input
- Responsive UI with Tailwind CSS
- Secure API key handling through server-side routes
- Rate limiting to protect free API usage

---

## What I Learned

Building this project helped me gain experience with:

- Creating server-side API routes in Next.js
- Integrating third-party APIs securely
- Managing environment variables for production deployments
- Handling API errors and rate limits gracefully
- Designing a user-friendly interface with Tailwind CSS
- Deploying full-stack applications using Vercel

---

## Future Improvements

Potential improvements include:

- Saving affirmation history for users
- Adding user authentication
- Improving AI prompt engineering for more personalized responses
- Adding mood tracking or journaling history
- Enhancing accessibility and UI polish

---
## Author
-Shaina Bowser
Software Engineering Student | Frontend Developer

## Demo

Watch the application in action:

[Manifest Me Demo](./manifest-me.mp4)

## Getting Started

Clone the repository

```bash
git clone https://github.com/poisonivy91/Manifest-ME.git
cd Manifest-ME
Install dependencies

npm install

Create a .env.local file

GEMINI_API_KEY=your_api_key_here

Run the development server

npm run dev

Open:

http://localhost:3000
