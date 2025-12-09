/*
  # Recreate tables with proper authentication

  1. Changes
    - Drop existing tables
    - Recreate with user_id as uuid type
    - Set up proper RLS policies for Supabase Auth

  2. Security
    - Enable RLS on both tables
    - Recipes: Authenticated users can view public recipes
    - Recipes: Users can create, update, and delete their own recipes
    - Saved recipes: Users can only manage their own saved recipes
*/

-- Drop existing tables
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;

-- Create recipes table with uuid user_id
CREATE TABLE recipes (
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
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create saved_recipes table with uuid user_id
CREATE TABLE saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);

-- Enable RLS
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Recipes policies
CREATE POLICY "Authenticated users can view public recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Users can view their own recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create recipes"
  ON recipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes"
  ON recipes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes"
  ON recipes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved recipes policies
CREATE POLICY "Users can view their own saved recipes"
  ON saved_recipes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save recipes"
  ON saved_recipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved recipes"
  ON saved_recipes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX recipes_created_at_idx ON recipes(created_at DESC);
CREATE INDEX recipes_user_id_idx ON recipes(user_id);
CREATE INDEX saved_recipes_user_id_idx ON saved_recipes(user_id);
CREATE INDEX saved_recipes_recipe_id_idx ON saved_recipes(recipe_id);
