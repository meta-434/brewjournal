to set up dev:
`docker pull postgres:17`
`docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres`

to update drizzle with db-related changes (such as schema updates) use `npx drizzle-kit push`
Alternatively, you can generate migrations using the drizzle-kit generate command and then apply them using the drizzle-kit migrate command:

Generate migrations:

`npx drizzle-kit generate`

Apply migrations:

`npx drizzle-kit migrate`



---- dev -----
PEGGED AT POSTGRES:17
`npm start` in coffee-db-back
