import { useState, useEffect } from 'react'

interface StatsType {
  listedTokens: number
  activeStreams: number
  totalViewers: number
  engagement: number
}

const TokenStats = () => {
  const [stats, setStats] = useState<StatsType>({
    listedTokens: 0,
    activeStreams: 0,
    totalViewers: 0,
    engagement: 0
  })

  const targetStats = {
    listedTokens: 247,
    activeStreams: 189,
    totalViewers: 12456,
    engagement: 87
  }

  useEffect(() => {
    // Animate the numbers counting up
    const duration = 2000 // 2 seconds
    const frameRate = 30 // frames per second
    const totalFrames = duration / 1000 * frameRate
    let frame = 0
    
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      
      if (frame <= totalFrames) {
        setStats({
          listedTokens: Math.floor(targetStats.listedTokens * progress),
          activeStreams: Math.floor(targetStats.activeStreams * progress),
          totalViewers: Math.floor(targetStats.totalViewers * progress),
          engagement: Math.floor(targetStats.engagement * progress)
        })
      } else {
        setStats(targetStats)
        clearInterval(interval)
      }
    }, 1000 / frameRate)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-blue-light py-20 relative overflow-hidden min-h-auto">
      <div className="container max-w-[1200px] relative z-10 mx-auto px-4">
        <h2 className="text-center mb-16">ShillTube in Numbers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-6xl font-bold mb-2 text-blue-dark">
              {stats.listedTokens}
            </div>
            <div className="text-xl">Listed Tokens</div>
          </div>
          
          <div>
            <div className="text-6xl font-bold mb-2 text-blue-dark">
              {stats.activeStreams}
            </div>
            <div className="text-xl">Active Streams</div>
          </div>
          
          <div>
            <div className="text-6xl font-bold mb-2 text-blue-dark">
              {stats.totalViewers.toLocaleString()}
            </div>
            <div className="text-xl">Daily Viewers</div>
          </div>
          
          <div>
            <div className="text-6xl font-bold mb-2 text-blue-dark">
              {stats.engagement}%
            </div>
            <div className="text-xl">Engagement Rate</div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute left-0 opacity-30 z-1">
        <img src="/images/head 04.svg" loading="eager" width="238.5" alt="" className="faq-img" />
        <img src="/images/head 26.svg" loading="eager" width="234" alt="" className="faq-img _1" />
        <img src="/images/head 29.svg" loading="lazy" width="234" alt="" className="faq-img _2" />
      </div>
      
      <div className="absolute right-0 opacity-30 z-1">
        <img src="/images/head 23.svg" loading="eager" width="238.5" alt="" className="faq-img" />
        <img src="/images/head 12.svg" loading="eager" width="234" alt="" className="faq-img _1" />
        <img src="/images/head 21.svg" loading="lazy" width="234" alt="" className="faq-img _2" />
      </div>
    </section>
  )
}

export default TokenStats