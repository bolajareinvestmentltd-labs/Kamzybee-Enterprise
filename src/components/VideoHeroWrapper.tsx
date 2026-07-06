"use client"

import dynamic from 'next/dynamic'

const VideoHero = dynamic(() => import('@/components/VideoHero'), { ssr: false })

export default function VideoHeroWrapper() {
  return <VideoHero />
}
