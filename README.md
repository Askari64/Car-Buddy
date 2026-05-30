# Car Buddy - Intelligent Auto Matcher

Car Buddy is a full-stack web application designed to help users find their ideal car matches. It features a step-by-step recommendation wizard that scores and suggests cars from an inventory catalog based on user-defined preferences (such as budget, body style, fuel type, transmission, seating requirements, and safety priorities).

We did not add users to add more cars and reviews due to time constraints. The goal was to build enough functionality with enough data to create an MVP.

## Tech Stack

- **Frontend**: React (v19), Vite (v8), Tailwind CSS (v4), Radix UI, Lucide Icons.
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL (via Neon Serverless DB).

- Frontend Stack Philosophy: React allows us to build performant UIs meanwhile Shadcnui provides with accessible and extendable components and Tailwind lets us design quick.
- Backend Stack Philosophy: Node.js and Express are mature server side javascript frameworks, PostgreSQL is free and readily available Database meanwhile Prisma ORM allows us to safely and quickly describe data models and perform CRUD.

---

## AI and Developer's role

- I performed Initial setup, code review, architectural decisions, logic simplification decisions and steering, UI and functionality improvements.
- AI performed quick building of the app as per requirements and directions.

- **Where did they help?:** AI tools helped improving the workflow speed 10x and building an app without spendding much time on designing. It allows to quickly prototype and iterate over to improve.
- **Where did they get in the way?:**  They build multiple files quickly and often miss out on requirements and write poor unmaintainable code. It takes time to review it all and understand how it works to ensure if the code is scablable and maintainable. They often create bugs which they miss until found by developer.

---

## If I had 4 hours

- Allow users to add new car models that may not exist. (high priority)
- Add User Authentication and allow users to create a persistent wishlist with full CRUD functionality. (high priority)
- Allow users to compare their wishlist cars. (medium priority)
- I would connect the health endpoint to the to frontend to show when our backend is down. (low priority)

---

## Key Features

### 1. Recommendation Wizard
- **Preference Survey**: A 4-step interactive wizard collecting budget limits, use case (family, commuting, performance, off-road), body style, and powertrain choices.
- **Scoring Algorithm**: A backend recommendation engine that calculates and scores matches (up to 100%) by evaluating multiple criteria (price, body category, safety, fuel efficiency, seating, horsepower, and capabilities).
- **Match Results**: A premium, responsive scrollable layout displaying the top 5 car matches with rank indicators (`#X Match`), match scores, up to 3 detailed match reasons, key spec badges, starting MSRP, specs sheets, and comparison options.
- **Aspect-Ratio Stability**: Custom aspect-ratio limits prevent stretched images, and local error handling displays premium fallbacks if an image fails to load.

### 2. Inventory Catalog Browser
- **Dynamic Search & Filtering**: Multi-parameter search by brand/make, body style, transmission type, fuel type, and safety ratings.
- **Detailed Sorting**: Sort cars by base price, model, year, category, efficiency, safety rating, horsepower, and capacity.

### 3. Specifications Details Modal
- **Full Specs Sheet**: View a comprehensive specs page including engine, horsepower, torque, seating capacity, fuel efficiency, and standard feature lists.
- **Owner Reviews**: Access owner reviews and star ratings sorted by latest date.
- **Clean UI**: Custom slide-up animation and scrollbar-free scroll pane using the `.no-scrollbar` utility.

### 4. Comparison Drawer
- **Multi-Car Comparison**: Select up to 3 cars from the catalog or match results to compare their specs side-by-side in a comparison tray at the bottom of the page.

---

## Directory Structure

```text
Car Dekho Assignment/
├── backend/                  # Node.js + Express + Prisma backend server
│   ├── prisma/               # Prisma schema and seed scripts
│   └── src/                  # Express routes, controllers, and services
└── frontend/                 # Vite + React client application
    ├── public/               # Static public assets
    └── src/                  # React components, hooks, and styles
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` configuration:
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="your-postgresql-database-connection-url"
   ```
4. Push the database schema & seed initial car data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server runs at `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` configuration:
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The client application runs at `http://localhost:5173`.
