# Quick Start Guide

## Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- Code editor (VS Code recommended)

## Installation

### 1. Clone or Download

If using Git:
\`\`\`bash
git clone <your-repo-url>
cd healthcare-data-system
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Configure Environment

Copy the example environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` with your API credentials:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://your-healthcare-api.com
API_KEY=your_secret_api_key_here
POST_ENDPOINT=https://your-api.com/results
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing Without External API

For testing without a real healthcare API, modify \`app/api/fetch/route.ts\`:

\`\`\`typescript
// Add this mock data at the top of the GET function
const mockData = [
  {
    id: '1',
    patientId: 'P001',
    recordType: 'blood_pressure',
    value: 120,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    patientId: 'P002',
    recordType: 'heart_rate',
    value: 75,
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    patientId: 'P001',
    recordType: 'blood_pressure',
    value: 118,
    timestamp: new Date().toISOString()
  }
];

// Comment out the real API call and return mock data
return NextResponse.json({
  success: true,
  data: mockData,
  timestamp: new Date().toISOString(),
});
\`\`\`

## Using the Application

### Step 1: Fetch Data
Click **"1️⃣ Fetch Data"** to retrieve healthcare records from the API.

### Step 2: Process & Analyze
Click **"2️⃣ Process & Analyze"** to clean and analyze the fetched data.

### Step 3: Submit Results
Click **"3️⃣ Submit Results"** to POST the analysis to the configured endpoint.

## Project Structure Quick Reference

\`\`\`
├── app/
│   ├── api/              # Backend API routes
│   └── page.tsx          # Main UI page
├── components/           # React components
├── lib/                  # Business logic
│   ├── dataFetcher.ts   # Fetch from APIs
│   ├── dataProcessor.ts # Clean data
│   ├── dataAnalyzer.ts  # Analyze data
│   └── dataSubmitter.ts # Submit results
└── .env.local           # Your configuration
\`\`\`

## Common Commands

\`\`\`bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Run production server
npm run lint      # Run ESLint
\`\`\`

## Troubleshooting

### Port Already in Use
\`\`\`bash
# Use different port
npm run dev -- -p 3001
\`\`\`

### Module Not Found
\`\`\`bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

### TypeScript Errors
\`\`\`bash
# Check TypeScript configuration
npx tsc --noEmit
\`\`\`

## Next Steps

1. ✅ Read the full [README.md](README.md)
2. ✅ Explore [ARCHITECTURE.md](ARCHITECTURE.md) to understand the design
3. ✅ Check [docs/API.md](docs/API.md) for API documentation
4. ✅ Modify code to connect to real healthcare APIs
5. ✅ Add new features and enhancements

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review code comments in each file
- Open an issue on GitHub

---

Happy coding! 🚀
