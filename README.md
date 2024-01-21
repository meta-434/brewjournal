# BrewJournal Monorepo

Until this project leaves inital development, DB names, usernames, and passwords will remain hard-coded -- as such there is 
no need for setting environment variables or creating .env files.

to get BrewJournal running in docker, it's as simple as cloning this repository, then 

```
cd brewjournal
docker compose up
```

if you'd like to run locally instead of on docker, clone the repo, and ensure you have a local postgreSQL instance running.
Either initialize the database with the name and credentials to match the hard-coded ones in ```node/knexfile.js``` or change the values in ```knexfile.js``` to suit your local database.

```
cd brewjournal
cd node && npm i && npm run dev
cd ../react && npm i && npm dev

```

Development requires two node instances - if running in a terminal, you will need a new tab / window.

Note: Ensure your ports are correct as per the mapping in the ```docker-compose.yaml``` file. Back end runs on ```localhost:3000```, frontend runs on ```localhost:5173```, and normally, 