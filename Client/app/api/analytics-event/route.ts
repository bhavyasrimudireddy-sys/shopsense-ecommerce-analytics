import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest){
  const body=await req.json();
  const backend=process.env.BACKEND_URL;
  if(!backend) return NextResponse.json({stored:false, mode:'browser-only'}, {status:202});
  try{
    const res=await fetch(`${backend}/api/analytics/events`, {method:'POST', headers:{'Content-Type':'application/json','x-api-secret':process.env.API_SECRET || ''}, body:JSON.stringify(body)});
    return NextResponse.json({stored:res.ok}, {status:res.ok?200:202});
  }catch{
    return NextResponse.json({stored:false, mode:'browser-only'}, {status:202});
  }
}
