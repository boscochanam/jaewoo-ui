import { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const filename = '/home/bflcv/Documents/jaewoo-2.0/app.db';
    console.log(`Connecting to database at ${filename}`);
    const db = await open({ filename: filename, driver: sqlite3.Database })
    const jobClips = await db.all('SELECT id, minio_url, result, uploaded_at FROM crankshaft_job_clips ORDER BY uploaded_at DESC')
    await db.close()

    res.status(200).json({ job_clips: jobClips })
}