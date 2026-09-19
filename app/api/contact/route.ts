import { formGuard, readFormJson } from '@/lib/form-guard';
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { messages } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema=z.object({name:z.string().trim().min(2).max(80),email:z.string().trim().email().max(160),subject:z.enum(["Hesaplama hatası","İçerik düzeltmesi","Gizlilik talebi","Diğer"]),message:z.string().trim().min(20).max(2000),website:z.string().max(0).optional()});
export async function POST(request:Request){try{const blocked=await formGuard(request,"contact");if(blocked)return blocked;const body=schema.parse(await readFormJson(request));await getDb().insert(messages).values({name:body.name,email:body.email,subject:body.subject,message:body.message,createdAt:new Date()});return NextResponse.json({ok:true},{status:201})}catch(error){if(error instanceof RangeError)return NextResponse.json({error:'Gönderim çok uzun.'},{status:413});if(error instanceof SyntaxError)return NextResponse.json({error:'Geçersiz gönderim.'},{status:400});if(error instanceof z.ZodError)return NextResponse.json({error:"Geçersiz form alanı."},{status:400});console.error("contact-write-failed",error);return NextResponse.json({error:"Mesaj kaydedilemedi."},{status:500})}}
