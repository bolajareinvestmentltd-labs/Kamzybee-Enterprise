-- Migration: create_verified_members
-- Creates table to store verified Rotary/Rotaract members

CREATE TABLE IF NOT EXISTS verified_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  ri_number text UNIQUE NOT NULL,
  club_name text NOT NULL,
  verification_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
