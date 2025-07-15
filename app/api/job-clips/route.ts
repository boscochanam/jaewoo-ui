import { NextResponse } from 'next/server'
// @ts-ignore: missing type declarations for sqlite3
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

export async function GET() {
  // Adjust path levels to correctly locate app.db in project root
  const dbPath = path.resolve(process.cwd(), '..', '..', 'app.db')
  console.log(`Connecting to database at ${dbPath}`)

  const db = await open({ filename: dbPath, driver: sqlite3.Database })
  const jobClips = await db.all(
    'SELECT id, minio_url, result, uploaded_at FROM video_records ORDER BY uploaded_at DESC'
  )
  await db.close()

  return NextResponse.json({ job_clips: jobClips })
}
