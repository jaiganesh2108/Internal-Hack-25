<h1 align="center"> The Authenticity Validator for Academia system </h1>

## A well-organized folder and file structure for the frontend (Next.js) and backend     (Node.js/Express) parts of this project, tailored specifically for the Authenticity Validator for Academia system.

# Frontend (Next.js) Structure

```bash

nextjs-frontend/
├── public/
│   ├── assets/                # Images, logos, QR code icons, etc.
│   └── favicon.ico
├── src/
│   ├── app/                   # Next.js app directory with routing
│   │   ├── api/
│   │   │   ├── auth/          # OAuth and authentication endpoints (Next.js API routes)
│   │   │   ├── certificates/  # Certificate upload, status API routes
│   │   │   └── verification/  # Certificate verification API routes
│   │   ├── dashboard/         # User/admin dashboard pages
│   │   │   ├── page.tsx       # Dashboard main page
│   │   │   └── layout.tsx     # Dashboard layout wrapper
│   │   ├── upload/            # Upload certificate page for universities
│   │   │   └── page.tsx
│   │   ├── verify/            # Verification page for employers/students
│   │   │   └── page.tsx
│   │   ├── admin/             # Admin management pages
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── university/        # University-specific pages (profile, certificate status)
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Buttons, inputs, dialogs, modals, tables
│   │   ├── forms/             # Certificate upload form, verify form, login form
│   │   ├── dashboard/         # Analytics charts, notifications, stats cards
│   │   └── blockchain/        # Web3 wallet connectors, Metamask buttons
│   ├── hooks/                 # Custom React hooks for authentication, blockchain, data fetching
│   │   ├── useAuth.tsx
│   │   ├── useBlockchain.tsx
│   │   └── useUpload.tsx
│   ├── lib/                   # Utility functions, api calls, auth helpers
│   ├── types/                 # TypeScript types and interfaces for certificates, users, blockchain data
│   ├── styles/                # CSS / Tailwind styling files
│   └── config/                # Environment configs, constants
├── .env.local                 # Environment variables for API endpoints, keys
├── next.config.js             # Next.js configuration
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

# Backend (Node.js / Express) Structure

```bash 
nodejs-backend/
├── src/
│   ├── controllers/           # Express route handlers
│   │   ├── authController.ts  # DigiLocker OAuth login, token handling
│   │   ├── certificateController.ts  # Upload, issuance, blockchain registration
│   │   └── verificationController.ts # Certificate verification logic
│   ├── middleware/            # Middleware for auth, validation, file uploads
│   ├── models/                # Mongoose models for Users, Certificates, Institutions
│   ├── routes/                # Express route definitions
│   ├── services/              # Business logic services and integrations
│   │   ├── digilockerService.ts
│   │   ├── blockchainService.ts
│   │   └── aiService.ts       # Calls to Python AI microservice
│   ├── utils/                 # Utility functions (encryption, hashing, logger)
│   ├── config/                # DB, blockchain & service configuration files
│   └── server.ts              # Express server entrypoint
├── uploads/                   # Temporary upload storage (for multer)
├── .env                       # Environment config for secrets / URLs
├── package.json
├── tsconfig.json
├── docker-compose.yml         # For containerized deployment
└── README.md
```

### Steps to Clone & Run a Next.js Project
## 1. Clone the Repository

## Open your terminal (VS Code / Git Bash / Command Prompt) and run:
```bash
git clone https://github.com/jaiganesh2108/Internal-Hack-25.git
```

## 2. Go Into the Project Folder
```bash
cd Internal-Hack-25
```

## 3. Install Dependencies
### Most Next.js projects use npm. Run one of the following:
```bash
npm install
```

## 4. Run the Development Server
### Start the local dev server with:
```bash
npm run dev
```

## 5. Open in Browser
```bash
http://localhost:3000
```

---

## 👥 Contributors
<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/jaiganesh2108">
        <img src="https://github.com/jaiganesh2108.png" width="80px" style="border-radius:50%; border:2px solid #ccc;" alt="jaiganesh2108"/>
        <br /><sub><b>jaiganesh2108</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dillibasker">
        <img src="https://github.com/dillibasker.png" width="80px" style="border-radius:50%; border:2px solid #ccc;" alt="dillibasker"/>
        <br /><sub><b>dillibasker</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/abhishak26">
        <img src="https://github.com/abhishak26.png" width="80px" style="border-radius:50%; border:2px solid #ccc;" alt="abhishak26"/>
        <br /><sub><b>abhishak26</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mohanapriya200523">
        <img src="https://github.com/mohanapriya200523.png" width="80px" style="border-radius:50%; border:2px solid #ccc;" alt="mohanapriya200523"/>
        <br /><sub><b>mohanapriya200523</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kaviya0606">
        <img src="https://github.com/kaviya0606.png" width="80px" style="border-radius:50%; border:2px solid #ccc;" alt="kaviya0606"/>
        <br /><sub><b>kaviya0606</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/archana7708">
        <img src="https://github.com/archana7708.png" width="80px" style="border-radius:50%; border:2px solid #ccc;" alt="archana7708"/>
        <br /><sub><b>archana7708</b></sub>
      </a>
    </td>
  </tr>
</table>

<h1 align="center"> Thank You! varthukkal varthukkal! </h1>
