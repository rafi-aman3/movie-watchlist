# 🎬 Movie Watchlist

A modern movie watchlist application built with Next.js that allows users to search for movies, manage their watchlist, and track movies they want to watch.

## ✨ Features

- 🔍 Search for movies using an external movie API
- ➕ Add movies to your personal watchlist
- 📱 Responsive design for mobile and desktop
- ⚡ Fast and optimized with Next.js

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 20 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rafi-aman3/movie-watchlist.git
cd movie-watchlist
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (if needed):
Create a `.env.local` file in the root directory and add your API keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_annon_key
NEXT_PUBLIC_TMDB_TOKEN=your_tmdb_token
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Built With

- **[Next.js](https://nextjs.org)** - React framework for production
- **[React](https://reactjs.org)** - JavaScript library for building user interfaces
- **[Shadcn/ui](https://ui.shadcn.com)** - Beautifully designed components built with Radix UI and Tailwind CSS

## 📁 Project Structure

```
movie-watchlist/
├── app/                    # Next.js app directory
│   ├── page.js            # Main page component
│   ├── layout.js          # Root layout
│   └── ...
├── components/            # Reusable React components
├── public/               # Static assets
├── styles/              # CSS/styling files
├── .env.local          # Environment variables (not tracked)
├── next.config.js     # Next.js configuration
└── package.json      # Project dependencies
```

## 🎯 Usage

1. **Search for Movies**: Use the search bar to find movies by title
2. **Add to Watchlist**: Click the add button to save movies to your watchlist
3. **Manage Watchlist**: View your saved movies in the watchlist section
5. **Remove Movies**: Delete movies from your watchlist when no longer needed

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Add your environment variables in the Vercel dashboard
5. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more deployment options.

## 📚 Learn More

To learn more about Next.js and the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rafi Aman**
- GitHub: [@rafi-aman3](https://github.com/rafi-aman3)

## 🙏 Acknowledgments

- Thanks to the Next.js team for the amazing framework
- Movie data provided by [TMDB API](https://www.themoviedb.org/)
- Inspiration from various movie tracking applications

---

⭐️ If you found this project helpful, please consider giving it a star on GitHub!