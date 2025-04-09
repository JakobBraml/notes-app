import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ergqzdxpfwcmamcyaveg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZ3F6ZHhwZndjbWFtY3lhdmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMzY4NTYsImV4cCI6MjA1OTcxMjg1Nn0.qNXuQc7LyvAo4qM2BWgXrhYOzzx9YmP6qNK_SV_lGLQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
