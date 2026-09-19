import { formGuard, readFormJson } from '@/lib/form-guard';
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { comments } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const commentSchema=z.object({name:z.string().trim().min(2).max(50),message:z.string().trim().min(20).max(800),website:z.string().max(0).optional()});
export async function GET(){try{const rows=await getDb().select({id:comments.id,name:comments.name,message:comments.message,createdAt:comments.createdAt}).from(comments).where(eq(comments.status,"approved")).orderBy(desc(comments.createdAt)).limit(30);return NextResponse.json({comments:rows})}catch(error){console.error("comments-read-failed",error);return NextResponse.json({error:"Yorumlar şu anda yüklenemiyor."},{status:503})}}
export async function POST(request:Request){try{const blocked=await formGuard(request,"comments");if(blocked)return blocked;const body=commentSchema.parse(await readFormJson(request));await getDb().insert(comments).values({name:body.name,message:body.message,page:"topluluk",status:"pending",createdAt:new Date()});return NextResponse.json({ok:true,message:"Yorum moderasyon sırasına alındı."},{status:201})}catch(error){if(error instanceof RangeError)return NextResponse.json({error:'Gönderim çok uzun.'},{status:413});if(error instanceof SyntaxError)return NextResponse.json({error:'Geçersiz gönderim.'},{status:400});if(error instanceof z.ZodError)return NextResponse.json({error:"Ad en az 2, yorum en az 20 karakter olmalıdır."},{status:400});console.error("comments-write-failed",error);return NextResponse.json({error:"Yorum kaydedilemedi."},{status:500})}}
