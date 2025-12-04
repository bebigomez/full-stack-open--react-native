# Rate Repository App

A mobile application for rating and reviewing GitHub repositories, built as part of the [Full Stack Open](https://fullstackopen.com/) course (Part 10 - React Native).

## Screenshots

_Screenshots coming soon_

## About

This app lets users browse GitHub repositories, view repository details, create reviews, and manage their own reviews. It features authentication, infinite scrolling, search functionality, and sorting options.

## Tech Stack

- **React Native** with Expo
- **Apollo Client** for GraphQL queries and mutations
- **React Router Native** for navigation
- **Formik** and **Yup** for form handling and validation
- **AsyncStorage** for local token storage
- **React Native Paper** for UI components
- **Jest** and **Testing Library** for testing

## Setup

### Backend

This app requires the [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) backend server. Clone the repository and follow its setup instructions to get the API running locally.

The server uses SQLite (no additional database setup needed) and provides an Apollo GraphQL API for all application features.

### Frontend

1. Clone this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   APOLLO_URI=http://localhost:4000/graphql
   ```

4. Make sure the backend server is running

5. Start the Expo development server:
   ```bash
   npm start
   ```

6. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your phone

## Testing

Run tests with:
```bash
npm test
```

## Features

- Browse and search repositories
- Sort repositories by latest, highest rated, or lowest rated
- View repository details and reviews
- Open repositories directly in GitHub
- User authentication (sign in/sign up)
- Create reviews for repositories
- View and manage your own reviews
- Infinite scrolling for repositories and reviews