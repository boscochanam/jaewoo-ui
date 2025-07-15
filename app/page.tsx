"use client"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import ReactPlayer from 'react-player'

export default function JobClipsPage() {
  const [jobClips, setJobClips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/job-clips')
      .then(res => res.json())
      .then(data => {
        setJobClips(data.job_clips || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const getResultBadge = (result) => {
    const variant = result?.toLowerCase() === 'pass' ? 'default' : 'destructive'
    return (
      <Badge variant={variant}>
        {result?.toUpperCase() || 'UNKNOWN'}
      </Badge>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Job Clips</h1>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="text-left p-4 font-medium text-gray-700">ID</th>
                  <th className="text-left p-4 font-medium text-gray-700">Video</th>
                  <th className="text-left p-4 font-medium text-gray-700">Result</th>
                  <th className="text-left p-4 font-medium text-gray-700">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {jobClips.map((clip, index) => (
                  <tr 
                    key={clip.id} 
                    className={`border-b hover:bg-gray-50/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'
                    }`}
                  >
                    <td className="p-4 font-mono text-sm text-gray-600">
                      {clip.id}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(clip.minio_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button> */}
                        <div className="w-48 h-24 bg-black rounded overflow-hidden">
                          <ReactPlayer
                            src={clip.minio_url}
                            width="100%"
                            height="100%"
                            controls
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getResultBadge(clip.result)}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {formatDate(clip.uploaded_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {jobClips.length === 0 && !loading && (
            <div className="py-12 text-center text-gray-500">
              No clips found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}