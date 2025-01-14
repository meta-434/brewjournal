/*
  # Initial Schema for Recipe Sharing Website
  0. Create Enum Types
    - `brewmethod_type` (aeropress, french_press, manual_pour_over, auto_drip, espresso, cold_brew, other)

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `username` (text, unique)
      - `avatar_url` (text)
      - `created_at` (timestamp)

    - `recipes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `instructions` (text array)
      - `instruction_times` (integer array)
      - `instruction_durations` (integer array)
      - `brew_volume` (integer)
      - `unit` (text)
      - `image_url` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `coffees`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, foreign key)
      - 'image_url' (text)
      - `name` (text)
      - `roaster` (text)
      - `rating` (integer)
      - `country_of_origin` (text)
      - `roast_level` (text)
      - `grind_size` (text)
      - `grinder` (uuid, foreign key)
      - `amount` (decimal)
      - `unit` (text)

    - `grinders`
        - `id` (uuid, primary key)
        - `name` (text)
        - `manufacturer_id` (text)
        - `model` (text)
        - `image_url` (text)
        - `msrp` (decimal)
        - `currency` (text)
        - `shop_url` (text)
        - `grindtest_urls` (text array)

    - `brewmethods`
        - `id` (uuid, primary key)
        - `name` (text)
        - `type` (brewmethod_type)

    - `ratings`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, foreign key)
      - `coffee_id` (uuid, foreign key)
      - `grinder_id` (uuid, foreign key)
      - `brewmethod_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `rating` (integer) - 1 to 5
      - `comment` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/
-- Create enum types
CREATE TYPE brewmethod_type AS ENUM (
  'aeropress',
  'french_press',
  'manual_pour_over',
  'auto_drip',
  'espresso',
  'cold_brew',
  'other'
);
-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create recipes table
-- -- - `recipes`
--   - `id` (uuid, primary key)
--   - `title` (text)
--   - `description` (text)
--   - `instructions` (text array)
--   - `instruction_times` (integer array)
--   - `instruction_durations` (integer array)
--   - `brew_volume` (integer)
--   - `unit` (text)
--   - `image_url` (text)
--   - `user_id` (uuid, foreign key)
--   - `created_at` (timestamp)
--   - `updated_at` (timestamp)
CREATE TABLE recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructions text array NOT NULL,
  instructions_times integer array NOT NULL,
  instructions_durations integer array NOT NULL,
  brew_volume integer NOT NULL,
  unit text NOT NULL,
  image_url text,
  coffee_id uuid REFERENCES coffees(id) NOT NULL,
  grinder_id uuid REFERENCES grinders(id) NOT NULL,
  brewmethod_id uuid REFERENCES brewmethods(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recipes are viewable by everyone"
  ON recipes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own recipes"
  ON recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipes"
  ON recipes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes"
  ON recipes FOR DELETE
  USING (auth.uid() = user_id);

-- Create ingredients table
CREATE TABLE ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  amount decimal NOT NULL,
  unit text NOT NULL
);

ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ingredients are viewable by everyone"
  ON ingredients FOR SELECT
  USING (true);

CREATE POLICY "Users can insert ingredients to own recipes"
  ON ingredients FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM recipes WHERE id = recipe_id
    )
  );

CREATE POLICY "Users can update ingredients of own recipes"
  ON ingredients FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM recipes WHERE id = recipe_id
    )
  );

CREATE POLICY "Users can delete ingredients of own recipes"
  ON ingredients FOR DELETE
  USING (
    auth.uid() IN (
      SELECT user_id FROM recipes WHERE id = recipe_id
    )
  );

-- Create ratings table
CREATE TABLE ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ratings are viewable by everyone"
  ON ratings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert ratings"
  ON ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON ratings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ratings"
  ON ratings FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update recipe updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
