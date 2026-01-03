# API Documentation

## Overview

This document describes all API endpoints available in the Healthcare Data System.

## Base URL

Development: \`http://localhost:3000/api\`

---

## Endpoints

### 1. Fetch Data

**Endpoint**: \`GET /api/fetch\`

**Description**: Fetches healthcare data from external API with retry logic.

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| endpoint | string | No | /data | External API endpoint path |

**Example Request**:
\`\`\`bash
curl http://localhost:3000/api/fetch?endpoint=/patients
\`\`\`

**Success Response** (200):
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "patientId": "P001",
      "recordType": "blood_pressure",
      "value": 120,
      "timestamp": "2026-01-02T10:00:00.000Z"
    }
  ],
  "timestamp": "2026-01-02T10:05:00.000Z"
}
\`\`\`

**Error Response** (500):
\`\`\`json
{
  "success": false,
  "error": "Failed to fetch data"
}
\`\`\`

---

### 2. Process Data

**Endpoint**: \`POST /api/process\`

**Description**: Cleans, transforms, and analyzes healthcare data.

**Request Body**:
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "patientId": "P001",
      "recordType": "blood_pressure",
      "value": 120,
      "timestamp": "2026-01-02T10:00:00.000Z"
    }
  ]
}
\`\`\`

**Example Request**:
\`\`\`bash
curl -X POST http://localhost:3000/api/process \\
  -H "Content-Type: application/json" \\
  -d '{"data": [...]}'
\`\`\`

**Success Response** (200):
\`\`\`json
{
  "success": true,
  "processedData": [...],
  "analysis": {
    "totalRecords": 10,
    "averageValue": 125.5,
    "recordsByType": {
      "blood_pressure": 5,
      "heart_rate": 5
    },
    "timestamp": "2026-01-02T10:10:00.000Z"
  },
  "timestamp": "2026-01-02T10:10:00.000Z"
}
\`\`\`

**Error Response** (400):
\`\`\`json
{
  "success": false,
  "error": "Invalid data format. Expected array of records."
}
\`\`\`

---

### 3. Submit Results

**Endpoint**: \`POST /api/submit\`

**Description**: Submits analysis results to external endpoint with retry logic.

**Request Body**:
\`\`\`json
{
  "analysis": {
    "totalRecords": 10,
    "averageValue": 125.5,
    "recordsByType": {
      "blood_pressure": 5,
      "heart_rate": 5
    },
    "timestamp": "2026-01-02T10:10:00.000Z"
  },
  "recordCount": 10,
  "status": "completed",
  "processedAt": "2026-01-02T10:10:00.000Z"
}
\`\`\`

**Example Request**:
\`\`\`bash
curl -X POST http://localhost:3000/api/submit \\
  -H "Content-Type: application/json" \\
  -d '{"analysis": {...}, "recordCount": 10, "status": "completed", "processedAt": "..."}'
\`\`\`

**Success Response** (200):
\`\`\`json
{
  "success": true,
  "response": {
    "message": "Results received",
    "id": "sub_123456"
  },
  "timestamp": "2026-01-02T10:15:00.000Z"
}
\`\`\`

**Error Response** (400):
\`\`\`json
{
  "success": false,
  "error": "Invalid payload. Required: analysis, status"
}
\`\`\`

---

## Error Handling

All endpoints follow consistent error response format:

\`\`\`json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
\`\`\`

**HTTP Status Codes**:
- \`200\`: Success
- \`400\`: Bad Request (invalid input)
- \`500\`: Internal Server Error

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding rate limiting for production use.

---

## Authentication

Currently no authentication required. For production:
- Add JWT token authentication
- Use API key authentication
- Implement OAuth 2.0

---

## Testing with cURL

### Test Complete Flow:

\`\`\`bash
# 1. Fetch data
curl http://localhost:3000/api/fetch > data.json

# 2. Process data
curl -X POST http://localhost:3000/api/process \\
  -H "Content-Type: application/json" \\
  -d @data.json > processed.json

# 3. Submit results (manually create payload)
curl -X POST http://localhost:3000/api/submit \\
  -H "Content-Type: application/json" \\
  -d '{"analysis": {...}, "recordCount": 10, "status": "completed", "processedAt": "2026-01-02T10:00:00.000Z"}'
\`\`\`
