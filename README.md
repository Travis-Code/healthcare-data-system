# Healthcare Data System

A complete healthcare data integration system built with **Next.js**, **TypeScript**, and **React**. This project demonstrates a full data pipeline: **Fetch → Process → Analyze → Submit**.

## 🎯 Project Overview

This system handles healthcare data through a comprehensive pipeline:

1. **Fetch**: Retrieve data from external healthcare APIs
2. **Process**: Clean, validate, and transform the data
3. **Analyze**: Generate statistical insights and analysis
4. **Submit**: POST results to external endpoints

## 🚀 Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Component-based UI
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client for API requests

## 📁 Project Structure

\`\`\`
HealthcareDataSystem/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (Backend)
│   │   ├── fetch/route.ts       # Fetch data from external API
│   │   ├── process/route.ts     # Process and analyze data
│   │   └── submit/route.ts      # Submit results via POST
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page (Frontend)
│   └── globals.css              # Global styles
├── components/                   # React Components
│   ├── ActionPanel.tsx          # Control panel for pipeline steps
│   ├── DataCard.tsx             # Reusable card component
│   ├── DataTable.tsx            # Display healthcare records
│   └── StatsDisplay.tsx         # Show analysis results
├── lib/                          # Business Logic
│   ├── config.ts                # Configuration management
│   ├── types.ts                 # TypeScript type definitions
│   ├── dataFetcher.ts           # Fetch data from APIs
│   ├── dataProcessor.ts         # Clean and transform data
│   ├── dataAnalyzer.ts          # Analyze and generate insights
│   └── dataSubmitter.ts         # Submit results via POST
├── .env.local                    # Environment variables (local)
├── .env.example                  # Environment template
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript configuration
\`\`\`

## 📚 Learning Guide: Step-by-Step

### Step 1: Project Setup

#### What is Next.js?
Next.js is a React framework that provides:
- **Server-side rendering** for better performance
- **API routes** for backend functionality
- **File-based routing** for easy navigation
- **TypeScript support** out of the box

#### Why TypeScript?
- Catches errors during development
- Provides autocomplete and IntelliSense
- Makes code more maintainable
- Documents code through types

\`\`\`bash
# Initialize project
npx create-next-app@latest . --typescript --tailwind --app

# Install dependencies
npm install axios dotenv
\`\`\`

### Step 2: Type Definitions

**File: \`lib/types.ts\`**

TypeScript interfaces define the shape of our data:

\`\`\`typescript
interface HealthcareRecord {
  id: string;              // Unique identifier
  patientId: string;       // Patient reference
  recordType: string;      // Type of record (lab, vitals, etc.)
  value: number | string;  // The actual value
  timestamp: string;       // When recorded
}
\`\`\`

This ensures type safety throughout the application.

### Step 3: Data Fetcher

**File: \`lib/dataFetcher.ts\`**

#### Key Concepts:
- **Axios**: HTTP client for making API requests
- **Retry Logic**: Automatic retries with exponential backoff
- **Error Handling**: Graceful failure management

\`\`\`typescript
// Fetch with retry logic
async fetchWithRetry(endpoint, params, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await this.fetchData(endpoint, params);
    } catch (error) {
      if (i < attempts - 1) {
        // Exponential backoff: wait longer each time
        await this.delay(1000 * Math.pow(2, i));
      }
    }
  }
}
\`\`\`

### Step 4: Data Processor

**File: \`lib/dataProcessor.ts\`**

#### Processing Pipeline:
1. **Clean**: Remove duplicates and invalid records
2. **Transform**: Normalize formats (dates, numbers)
3. **Validate**: Ensure required fields exist

\`\`\`typescript
// Remove duplicates
const uniqueData = rawData.filter((record, index, self) =>
  index === self.findIndex((r) => r.id === record.id)
);
\`\`\`

### Step 5: Data Analyzer

**File: \`lib/dataAnalyzer.ts\`**

#### Analysis Features:
- Count total records
- Calculate averages
- Group by type
- Generate statistics

\`\`\`typescript
// Calculate statistics
const stats = {
  total: data.length,
  byType: groupByType(data),
  averageValue: calculateAverage(data)
};
\`\`\`

### Step 6: API Routes

**Next.js API Routes** run on the server, keeping API keys secure.

#### GET /api/fetch
- Fetches data from external API
- Keeps API keys server-side
- Returns data to frontend

#### POST /api/process
- Processes raw data
- Performs analysis
- Returns cleaned data and insights

#### POST /api/submit
- Submits results to external endpoint
- Includes retry logic
- Returns confirmation

### Step 7: React Components

#### ActionPanel Component
- Three buttons for each pipeline step
- Loading state management
- Status messages

#### DataTable Component
- Displays records in table format
- Pagination support
- Responsive design

#### StatsDisplay Component
- Shows analysis results
- Visual data presentation
- Real-time updates

### Step 8: Main Page

**File: \`app/page.tsx\`**

#### React Hooks Used:
- **useState**: Manage component state
- **useEffect**: Side effects (could be added for auto-fetch)

#### State Management:
\`\`\`typescript
const [rawData, setRawData] = useState([]);         // Original data
const [processedData, setProcessedData] = useState([]); // Cleaned data
const [analysis, setAnalysis] = useState(null);     // Analysis results
const [isLoading, setIsLoading] = useState(false);  // Loading state
const [status, setStatus] = useState('');           // Status messages
\`\`\`

## 🔧 Configuration

### Environment Variables

Create \`.env.local\` file:

\`\`\`env
# External API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
API_KEY=your_secret_api_key
POST_ENDPOINT=https://your-api.com/results

# Optional Settings
TIMEOUT=30000
RETRY_ATTEMPTS=3
\`\`\`

**Important**: 
- \`NEXT_PUBLIC_*\` variables are exposed to the browser
- Regular variables (like \`API_KEY\`) are server-side only
- Never commit \`.env.local\` to Git

## 🎮 How to Run

### Development Mode

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

### Production Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🔄 Data Flow Explained

### 1. User clicks "Fetch Data"
\`\`\`
Frontend (page.tsx) 
  → API Route (/api/fetch) 
  → DataFetcher (lib/dataFetcher.ts)
  → External API
  → Response back to frontend
\`\`\`

### 2. User clicks "Process & Analyze"
\`\`\`
Frontend with raw data
  → API Route (/api/process)
  → DataProcessor (clean & transform)
  → DataAnalyzer (generate insights)
  → Response with processed data + analysis
\`\`\`

### 3. User clicks "Submit Results"
\`\`\`
Frontend with analysis
  → API Route (/api/submit)
  → DataSubmitter (POST to external endpoint)
  → External API receives results
  → Confirmation back to frontend
\`\`\`

## 🧪 Testing the System

Since external APIs might not be available, you can test with mock data:

1. Modify \`/api/fetch/route.ts\` to return mock data:
\`\`\`typescript
// Temporary mock data for testing
const mockData = [
  {
    id: '1',
    patientId: 'P001',
    recordType: 'blood_pressure',
    value: 120,
    timestamp: new Date().toISOString()
  },
  // ... more records
];

return NextResponse.json({
  success: true,
  data: mockData,
  timestamp: new Date().toISOString(),
});
\`\`\`

## 🎓 Key Concepts to Learn

### TypeScript
- **Interfaces**: Define data structures
- **Generics**: Reusable type-safe functions
- **Type inference**: Let TypeScript figure out types

### React
- **Components**: Reusable UI pieces
- **Props**: Pass data to components
- **State**: Component memory
- **Hooks**: useState, useEffect, etc.

### Next.js
- **App Router**: File-based routing
- **API Routes**: Backend endpoints
- **Server Components**: Default in App Router
- **Client Components**: Use 'use client' directive

### Async/Await
- **Promises**: Handle asynchronous operations
- **Try/Catch**: Error handling
- **Async functions**: Return promises

## 🚨 Common Issues & Solutions

### Issue: API_KEY not found
**Solution**: Copy \`.env.example\` to \`.env.local\` and set your API key

### Issue: CORS errors
**Solution**: Use Next.js API routes as proxy (already implemented)

### Issue: TypeScript errors
**Solution**: Check type definitions in \`lib/types.ts\`

### Issue: Module not found
**Solution**: Run \`npm install\` to install dependencies

## 📖 Next Steps

1. **Add Authentication**: Implement user login
2. **Database**: Store data in PostgreSQL/MongoDB
3. **Testing**: Add Jest and React Testing Library
4. **Error Boundary**: Better error handling in React
5. **Loading States**: Add skeleton screens
6. **Real-time Updates**: Use WebSockets or Server-Sent Events
7. **Data Visualization**: Add charts with Chart.js or Recharts
8. **Export Features**: Download data as CSV/PDF

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve documentation
- Fix bugs
- Suggest enhancements

## 📝 License

MIT License - Feel free to use this project for learning!

## 🌟 Credits

Built as a learning project to demonstrate:
- Next.js App Router
- TypeScript best practices
- React component architecture
- API integration patterns
- Healthcare data processing

---

**Happy Learning! 🎉**
