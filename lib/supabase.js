// lib/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgszodlotmkwedmjhurv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnc3pvZGxvdG1rd2VkbWpodXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1NDgzNjMsImV4cCI6MjA0MDEyNDM2M30.0fWfUikxbFB9u1RFOJXVL4sukybttOZVeC2peKLgJo8';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
