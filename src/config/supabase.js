import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mpiceuaccsbahdlgyjke.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1waWNldWFjY3NiYWhkbGd5amtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NDMwNjYsImV4cCI6MjA3OTQxOTA2Nn0.wU9JYcMw9VXghO6aMyzfZfH7hX1NjYL1r9vJXNnYBC0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);