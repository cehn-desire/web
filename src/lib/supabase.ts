import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 鏂囩珷鏁版嵁绫诲瀷
export interface ArticleRow {
  id: number
  slug: string
  title: string
  category: 'learning' | 'photography' | 'painting'
  date: string
  read_time: string
  excerpt: string
  content: string           // Markdown 姝ｆ枃
  tags: string[] | null
  cover_image: string | null
  created_at: string
}
