# BrewJournal
## A coffee brewing journal for the coffee enthusiast
### Features
- Recipe creation with step-by-step instructions and specific timing for each step
- Reviewable repository of coffees, roasters, grinders, and brewers
- Brew log to record each brew, with the ability to rate and review each recipe

### Technologies
- React
- TypeScript
- TailwindCSS
- PostCSS
- Supabase

### Installation
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_URL
```
4. Run `npm run dev` or `vite` to start the development server
5. Visit `localhost:5173` in your browser

### Roadmap
- [✅] Add user authentication
- [✅] Add recipe creation
- [✅] Add brew log
- [ ] Add instruction timings
- [ ] Add grinder, brewer, and roaster reviews
- [ ] Rework DB to support linking Recipes to Grinders, Brewers, and Roasters, etc.
- [ ] Add user profile page
