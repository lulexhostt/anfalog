// lib/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ngjbcfvuqorstbwjqhvl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5namJjZnZ1cW9yc3Rid2pxaHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMzE0OTksImV4cCI6MjAzNjcwNzQ5OX0.j-Y6039mdG50HnnIxCe2kLTMASWyknoT2IYgsIypcZM';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
