<div align="center">
  <br />
  <h1>✨ ExcelDraw</h1>
  <p>
    <strong>Instantly craft collaborative diagrams on the web.</strong>
  </p>
  <p>
    Draw at the speed of thought with an infinite, zooming workspace built for teams. 
  </p>
  <br />
</div>

## 📸 Preview

<div align="center">
  <!-- Note: Make sure to upload the landing page screenshot to the 'docs' folder or update this path to your hosted image URL -->
  <img src="./docs/landing.png" alt="ExcelDraw Landing Page" width="100%" style="border-radius: 12px; box-shadow: 0 4px 30px rgba(0,0,0,0.1);" />
</div>

## 🚀 Features

- **Infinite Canvas:** A seamless workspace where your ideas can blossom without limits.
- **Real-Time Collaboration:** Powered by WebSockets, multiple users can draw and interact simultaneously.
- **Cinematic UI/UX:** Stunning visuals, glassmorphism, fluid animations (Framer Motion), and a captivating particle background.
- **Team Workspaces:** Create rooms, share links, and sync instantly.
- **Modern Monorepo:** Structured using Turborepo for efficient scaling and development.

## 🛠 Tech Stack

**Frontend (Apps & UI)**
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/) (Shadcn components)

**Backend (API & Real-time)**
- Node.js & Express (`http-backend`)
- WebSockets (`websockets`)
- [Prisma](https://www.prisma.io/) (Database ORM)
- [PostgreSQL](https://www.postgresql.org/)

**Architecture**
- [Turborepo](https://turbo.build/repo)
- TypeScript

## 📂 Project Structure

This project is a monorepo utilizing **Turborepo** with the following layout:

### Apps
- `apps/excel_front`: The Next.js frontend application.
- `apps/http-backend`: REST API handling authentication, room creation, and user management.
- `apps/websockets`: Real-time WebSocket server for syncing canvas data.

### Packages
- `packages/common`: Shared types, constants, and validation schemas (Zod).
- `packages/database`: Prisma schema and database connection logic.
- `packages/ui`: Shared React component library.
- `packages/backend-common`: Shared logic for backend services.
- `packages/eslint-config` & `packages/typescript-config`: Centralized configurations.

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- [pnpm](https://pnpm.io/) package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanyamhbtu/ExcelDraw.git
   cd ExcelDraw
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Copy the example environment file and fill in your database/service credentials.
   ```bash
   cp .env.example .env
   ```

4. **Database Setup:**
   Run the Prisma migrations to set up your database schema.
   ```bash
   cd packages/database
   pnpm prisma generate
   pnpm prisma db push
   ```
   *(Or run `pnpm db:push` if you have a script for it)*

5. **Run the Development Server:**
   Start all apps simultaneously from the root directory.
   ```bash
   pnpm dev
   ```

This will start:
- Frontend on `http://localhost:3000`
- HTTP Backend on `http://localhost:8080` (default)
- WebSockets on `http://localhost:8081` (default)

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
