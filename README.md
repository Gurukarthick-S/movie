# MovieHub – Movie Discovery Application

## 1. Project Overview

MovieHub is a movie discovery web application that helps users search for movies, explore movie information, and save their favourite movies.

The goal is to provide a simple and user-friendly platform for discovering and managing movies.

## 2. Main Features

- Browse popular sample movies.
- Search for movies using the TMDB API.
- View movie details and descriptions.
- Add movies to favourites.
- Remove movies from favourites.
- Save favourite movies using browser localStorage.
- Display loading, error, and empty states.

## 3. Technologies Used

- React
- JavaScript
- Vite
- CSS
- TMDB API
- Vitest
- React Testing Library

## 4. Project Setup

### Requirements

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Open the project folder:

```bash
cd movie-app
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_token_here
```

Replace the placeholder with your TMDB API access token.

Do not share or upload your actual `.env` file.

### Run the Application

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 5. Testing

The project uses Vitest and React Testing Library.

Run all tests:

```bash
npm run test -- --run
```

Current test results:

- Movie service tests: 4 passed.
- React application tests: 6 passed.
- Total: 10 tests passed.

## 6. Production Build

Create a production build:

```bash
npm run build
```

The generated production files are saved in the `dist` folder.

## 7. Code Quality

Run the lint check:

```bash
npm run lint
```

Latest result: 0 warnings and 0 errors.

## 8. AI Assistance

AI tools were used as development assistants to help with implementation, debugging, test creation, and improving code quality.

Generated code and suggestions were reviewed and tested during development.

## 9. Limitations and Future Improvements

- Add an LLM-powered movie recommendation feature.
- Improve accessibility and keyboard navigation.
- Complete performance and Lighthouse audits.
- Deploy the application.
- Move TMDB API requests to a secure backend to protect the API token.
- Improve error handling and user experience.

## 10. Project Status

The application currently supports movie browsing, searching, viewing details, and managing favourites.

Unit and application tests pass, the production build succeeds, and lint reports no warnings or errors.

Deployment and remaining quality audits are still in progress.