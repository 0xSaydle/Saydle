// app/api/scheduler/route.ts
import { NextResponse } from 'next/server';
import { runScheduledSender } from '../../../lib/sendAffirmations'; // Adjust path if needed

export async function GET() {
  try {
    await runScheduledSender();
    console.log('Scheduled sender finished.');
    return NextResponse.json({ message: 'Scheduler ran successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error running scheduled sender:', error);
    return NextResponse.json({ message: 'Error running scheduler', error: error.message }, { status: 500 });
  }
}