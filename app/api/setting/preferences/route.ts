// pages/api/preferences.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase  from '../../../../supabase/supabase_client'

type Preference = {
  frequency: 'daily' | 'weekly' | 'monthly'
  timeOfDay: string
  daysOfWeek: string[]
  channel: 'sms' | 'whatsapp'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // In a real app, you get user id from session/auth token
  const userId = req.headers['x-user-id'] as string // example: pass user id header for demo

  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'POST') {
    const preference: Preference = req.body
    try {
      // Upsert preference (insert or update)
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({ user_id: userId, ...preference }, { onConflict: 'user_id' })

      if (error) throw error

      return res.status(200).json({ message: 'Preference saved', data })
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message })
    }
  } else if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error // ignore no rows found error

      return res.status(200).json({ preference: data || null })
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
