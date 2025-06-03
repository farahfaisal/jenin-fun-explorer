
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://arbmfohldajuimrwykzv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyYm1mb2hsZGFqdWltcnd5a3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTE0MTQsImV4cCI6MjA2NDQ4NzQxNH0.QjqzrYzmE6u_yZ50ilxnNd8QSxXwrMrJ6IJ6qI8RpgE'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
