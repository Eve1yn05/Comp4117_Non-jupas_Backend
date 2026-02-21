
The tech stack is generated based on Assignment 3 COMP3047 front and and back end plus the new knowledge learnt from COMP4117, feel free to select all of this to the copilot when vibe coding

1. The Tech Stack "Cheat Sheet" 
Frontend: Vue.js 3 (using the Composition API)
Backend: Node.js with Express.js framework
Database: MongoDB (specifically the Node.js MongoDB Driver, not Mongoose)  – no SQL database
Database Hosting: Azure Cosmos DB
Authentication: JWT (JSON Web Tokens) and bcrypt for password hashing
Styling:   Bootstrap 5
Cloud Services: Azure Storage Blob (@azure/storage-blob ^12.30.0) 
Cloud file storage Azure Communication Email (@azure/communication-email ^1.1.0) - Email service 
File Upload: express-fileupload (^1.5.2) - File upload handling Logging: Morgan (^1.10.1) - HTTP request logging 
Cookie Parser: cookie-parser (~1.4.4) - Cookie parsing middleware 
Environment Variables: dotenv (^17.2.3) - Environment variables 
Utilities: uuid (^13.0.0) - Unique ID generation 
Debugging: debug (~2.6.9) - Debugging utility 
Error Handling: http-errors (~1.6.3) - HTTP error handling
Dummy Data Generation: @faker-js/faker (^8.0.0+) - Generate realistic fake data for testing (School expects Mockaroo website but faker.js is used for automation and to avoid manual tedious input)
Password Hashing: bcrypt (^5.0.0+) - Secure password hashing for authentication
JSON Web Tokens: jsonwebtoken (^9.0.0+) - JWT authentication and token verification"
Serverless/Proxy: Azure Functions (Node.js Model V3).Feature: Acts as a production-grade proxy between your Static Web App (Frontend) and App Service (Backend).

AI & Documentation Stack
This is the "Brain" of your project. These tools help you design and document before you code.
Spec Kitty Workflow: Specification-driven development where you write MD files first.
MermaidJS: Used inside Markdown to create Flowcharts, Sequence Diagrams, and ERDs as code.
Pencil AI: For creating UI/UX Screen Prototypes directly in VS Code using prompts.
MCP Servers (Model Context Protocol):
Serena: For code intelligence and architecture analysis.
DeepWiki: For library/API documentation search.
MongoDB MCP: For AI-assisted database querying and schema analysis.
3. Testing & Quality Assurance (The "Reliability" Layer)
Your lab requires a "Three-Tier" testing strategy:
Backend Testing: Jest (for logic and API endpoints). ThunderClient
Frontend Testing: Vitest (for Vue component unit tests).
End-to-End (E2E): Playwright (to simulate a real user clicking through the browser).


