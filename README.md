# Spotify Stats

A modern web application to visualize your Spotify listening statistics, including top artists, tracks, genres, and playlists.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- 📊 **Dashboard** - Overview of your listening statistics
- 🎵 **Top Tracks** - Your most played songs across different time ranges
- 🎤 **Top Artists** - Your favorite artists with detailed stats
- 🎨 **Genre Analysis** - Visual breakdown of your music taste
- 📝 **Playlists** - Browse and manage your Spotify playlists
- 🌙 **Dark Theme** - Modern Spotify-inspired dark interface

## 🚀 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **TanStack Query v5** - Data fetching and caching
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

### Backend

- **Next.js Route Handlers** - API endpoints
- **Spotify Web API** - Music data source
- **HttpOnly Cookies** - Secure authentication

## 📦 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/yourStats-Spotify.git
   cd yourStats-Spotify
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Create \`.env\` file:
   \`\`\`env
   CLIENT_ID=your_spotify_client_id
   CLIENT_SECRET=your_spotify_client_secret
   REDIRECT_URI=https://localhost:3000/callback
   SCOPE=user-read-private user-read-email user-top-read user-read-currently-playing playlist-read-private
   \`\`\`

4. Run development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

5. Open [https://localhost:3000](https://localhost:3000)

## 🔧 Development

### Mock Data (Local Testing)

For local development without Spotify authentication, use the mock data:

\`\`\`typescript
import { mockUser, mockArtists, mockTracks, mockPlaylists } from '@/mocks/data';
\`\`\`

### Build for Production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 🎨 Design

The application features a modern dark theme inspired by Spotify's design language:

- **Sidebar Navigation** - Fixed navigation with active states
- **Stat Cards** - Dashboard metrics with icons
- **Genre Visualizations** - Donut charts and progress bars
- **Responsive Grid** - Adaptive layouts for all screen sizes

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
