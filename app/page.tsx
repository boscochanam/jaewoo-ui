"use client"
import { useEffect, useState } from 'react'
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { Card } from '@/components/ui/card'

export default function JobClipsPage() {
  const [jobClips, setJobClips] = useState([])

  useEffect(() => {
    fetch('/api/job-clips')
      .then(res => res.json())
      .then(data => setJobClips(data.job_clips || []))
      .catch(console.error)
  }, [])

  return (
    <Card className="p-4">
      <h1 className="text-xl font-bold mb-4">Crankshaft Job Clips</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Video URL</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Uploaded At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobClips.map((clip: any) => (
            <TableRow key={clip.id}>
              <TableCell>{clip.id}</TableCell>
              <TableCell>
                <a href={clip.minio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Clip
                </a>
              </TableCell>
              <TableCell className={clip.result === 'pass' ? 'text-green-600' : 'text-red-600'}>
                {clip.result.toUpperCase()}
              </TableCell>
              <TableCell>{new Date(clip.uploaded_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
