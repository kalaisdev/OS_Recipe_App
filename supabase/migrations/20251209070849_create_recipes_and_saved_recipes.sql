/*
  # Create recipe management schema

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key) - Unique identifier for each recipe
      - `title` (text, required) - Recipe title
      - `description` (text, required) - Recipe description
      - `image` (text, required) - URL to recipe image
      - `ingredients` (jsonb, required) - Array of ingredients
      - `steps` (jsonb, required) - Array of cooking steps
      - `cook_time` (integer, required) - Cooking time in minutes
      - `difficulty` (text, required) - Difficulty level (Easy, Medium, Hard)
      - `author` (text, required) - Recipe author name
      - `is_public` (boolean, default true) - Whether recipe is publicly visible
      - `user_id` (text, nullable) - ID of user who created recipe (for future auth)
      - `created_at` (timestamptz, default now()) - Creation timestamp
    
    - `saved_recipes`
      - `id` (uuid, primary key) - Unique identifier
      - `recipe_id` (uuid, foreign key) - References recipes table
      - `user_id` (text, required) - ID of user who saved the recipe
      - `created_at` (timestamptz, default now()) - When recipe was saved
      - Unique constraint on (recipe_id, user_id) to prevent duplicates

  2. Security
    - Enable RLS on both tables
    - Recipes: Allow public read access for public recipes
    - Recipes: Allow insert/update/delete for recipe owners
    - Saved recipes: Allow users to manage their own saved recipes
*/

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  ingredients jsonb NOT NULL DEFAULT '[]'::jsonb,
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  cook_time integer NOT NULL,
  difficulty text NOT NULL,
  author text NOT NULL,
  is_public boolean DEFAULT true,
  user_id text,
  created_at timestamptz DEFAULT now()
);

-- Create saved_recipes table
CREATE TABLE IF NOT EXISTS saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);

-- Enable RLS
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Recipes policies
CREATE POLICY "Anyone can view public recipes"
  ON recipes FOR SELECT
  USING (is_public = true);

CREATE POLICY "Anyone can insert recipes"
  ON recipes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own recipes"
  ON recipes FOR UPDATE
  USING (user_id IS NULL OR user_id = current_setting('request.user_id', true))
  WITH CHECK (user_id IS NULL OR user_id = current_setting('request.user_id', true));

CREATE POLICY "Users can delete their own recipes"
  ON recipes FOR DELETE
  USING (user_id IS NULL OR user_id = current_setting('request.user_id', true));

-- Saved recipes policies
CREATE POLICY "Users can view their own saved recipes"
  ON saved_recipes FOR SELECT
  USING (user_id = current_setting('request.user_id', true));

CREATE POLICY "Users can save recipes"
  ON saved_recipes FOR INSERT
  WITH CHECK (user_id = current_setting('request.user_id', true));

CREATE POLICY "Users can unsave their recipes"
  ON saved_recipes FOR DELETE
  USING (user_id = current_setting('request.user_id', true));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS recipes_created_at_idx ON recipes(created_at DESC);
CREATE INDEX IF NOT EXISTS recipes_user_id_idx ON recipes(user_id);
CREATE INDEX IF NOT EXISTS saved_recipes_user_id_idx ON saved_recipes(user_id);
CREATE INDEX IF NOT EXISTS saved_recipes_recipe_id_idx ON saved_recipes(recipe_id);
