## BrewJournal
### Or a tale of rudderless solo projects

#### Frontend (coffee-db-front)
##### Tech:
- Vite / React
- tailwindcss
- React Router / React Router DOM
- nothing else at this point in time. I hope to keep it this way.

##### To Run: (wow that's simple, we all say)
- `cd coffee-db-front`
- `npm install`
- `npm run dev`

#### Backend (coffee-db-back)
##### Tech:
- Node.js
- Express
- DrizzleORM for talking to...
- PostgreSQL
- because I fear working with raw database queries and I like something to generate migration files for me based on a user-defined schema.

##### To Run:
- `cd coffee-db-back`
- `npm install`
- `npm run start`

##### To seed/ make DB actually work:
- have a postgres instance
- copy `.env.example`, rename to `.env` and add your secrets
- `npm run migrate:gen`
- `npm run migrate:up`
- `npm run migrate:seed`


### Backend Tips/Tricks
#### to set up dev:
!!! PEGGED AT POSTGRES:17 !!!
- `docker pull postgres:17`
- `docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres`
