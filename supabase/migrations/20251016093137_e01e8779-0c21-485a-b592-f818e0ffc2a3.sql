-- Clean up duplicate profiles for the same user_id
-- Keep only the most recent profile for each user
DELETE FROM profiles a
USING profiles b
WHERE a.user_id = b.user_id
  AND a.created_at < b.created_at;