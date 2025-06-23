# Sportradar Assignment

## Overview

This project is a solution for the Sportradar assignment. It is a React-based web application that allows users to view and filter sports matches by sport and tournament, fetching data from a backend API.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Bun](https://bun.sh/) (if you prefer Bun over npm/yarn)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (if not using Bun)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd sportradar-assignment
    ```

2.  **Install dependencies:**
    - Using Bun:
      ```bash
      bun install
      ```
    - Or using npm:
      ```bash
      npm install
      ```
    - Or using yarn:
      ```bash
      yarn install
      ```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```env
VITE_API_BASE_URL=<your_api_base_url>
```

Replace `<your_api_base_url>` with the actual base URL for your API.
It should look something like this: `https://your-api-gateway-id.execute-api.your-region.amazonaws.com/HiringTest`

### Running the Application

- Using Bun:
  ```bash
  bun run dev
  ```
- Or using npm:
  ```bash
  npm run dev
  ```
- Or using yarn:
  ```bash
  yarn dev
  ```

The app will be available at [http://localhost:3000](http://localhost:3000) by default.

### Testing

- To run tests (if any are present):
  ```bash
  bun test
  ```
  or
  ```bash
  npm test
  ```
  or
  ```bash
  yarn test
  ```

## Notes & Assumptions

### Match Filtering Logic

The application filters matches based on the following rules:

- **Default:** All matches are shown if no filters are active.
- **Sport Selection:**
  - Selecting sports filters visible tournaments to only those related to the chosen sports.
  - Previously selected tournaments not matching current sport selections are automatically deselected.
- **Tournament Precedence:** Explicitly selected tournaments take priority, filtering matches directly.
- **Search:**
  - Matches can be further filtered by team name using the search bar.
  - The search term is reset whenever sport or tournament filters are changed.
- **UI Behavior:** The interface provides immediate feedback, ensuring consistent display of selected filters and matches.

### Alternative Route

- **Alternative Filtering Route:** An alternative filtering approach, where filters are managed via the URL, is available at [http://localhost:3000/alternative](http://localhost:3000/alternative). This method provides bookmarkable URLs and might be a better fit for server-side filtering integrations.
