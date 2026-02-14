# Setup Instructions

## First Time Setup
1. Install Node.js v22+
2. `npm install`
3. Create `.env` file with:
   - `MONGODB_URI=<your-connection-string>`
   - `JWT_SECRET=<generate-with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
4. `npm install bcrypt jsonwebtoken @faker-js/faker`

## Seed Database with Dummy Data
```bash
node [seedData.js](http://_vscodecontentref_/0)