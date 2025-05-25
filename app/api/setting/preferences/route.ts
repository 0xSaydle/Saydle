// pages/api/preferences.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin }  from '../../../../supabase/supabase_client'
import { auth } from "../../../../auth" 


type Preference = {
  frequency: 'daily' | 'weekly' | 'monthly'
  time_of_day: string
  days_of_week: string[]
  delivery_method: 'sms' | 'whatsapp'
}

export async function POST(req: NextRequest) {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = session?.user.id;

  const preference: Preference = await req.json();
  try {
      // Upsert preference (insert or update)
      const { data, error } = await supabaseAdmin
        .from('user_preferences')
        .upsert({ user_id: userId, ...preference }, { onConflict: 'user_id' })

      if (error) throw error

      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
  }


export async function GET() {
  try {
    const session = await auth();
  
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user.id;
    
    const { data, error } = await supabaseAdmin
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

      if (error && error.code !== 'PGRST116') throw error // ignore no rows found error

      return NextResponse.json({ preference: data || null })
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, {status: 500})
    }
}
