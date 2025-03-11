import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface StreamInfo {
  id: string
  tokenName: string
  characterName: string
  thumbnail: string
  viewerCount: number
  isLive: boolean
  category: string
  trending?: boolean
}

const ExplorePage = () => {
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // In a real implementation, you would fetch actual stream data
    const mockStreams = [
      {
        id: 'pepe-coin',
        tokenName: 'PEPE',
        characterName: 'Pepe the Frog',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 256,
        isLive: true,
        category: 'meme',
        trending: true
      },
      {
        id: 'doge-coin',
        tokenName: 'DOGE',
        characterName: 'Doge',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 189,
        isLive: true,
        category: 'meme',
        trending: true
      },
      {
        id: 'shiba-inu',
        tokenName: 'SHIB',
        characterName: 'Shiba Inu',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 145,
        isLive: true,
        category: 'meme'
      },
      {
        id: 'wojak-coin',
        tokenName: 'WOJAK',
        characterName: 'Wojak',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 112,
        isLive: false,
        category: 'meme'
      },
      {
        id: 'memecoin-1',
        tokenName: 'MEME1',
        characterName: 'Meme Character 1',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 98,
        isLive: true,
        category: 'defi'
      },
      {
        id: 'memecoin-2',
        tokenName: 'MEME2',
        characterName: 'Meme Character 2',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 87,
        isLive: true,
        category: 'defi'
      },
      {
        id: 'memecoin-3',
        tokenName: 'MEME3',
        characterName: 'Meme Character 3',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 76,
        isLive: false,
        category: 'gaming'
      },
      {
        id: 'memecoin-4',
        tokenName: 'MEME4',
        characterName: 'Meme Character 4',
        thumbnail: '/images/single-bot@2x.png',
        viewerCount: 65,
        isLive: true,
        category: 'gaming',
        trending: true
      }
    ]
    
    setStreams(mockStreams)
    setIsLoading(false)
  }, [])

  const filteredStreams = filter === 'all' 
    ? streams 
    : filter === 'live' 
      ? streams.filter(stream => stream.isLive)
      : filter === 'trending'
        ? streams.filter(stream => stream.trending)
        : streams.filter(stream => stream.category === filter)

  return (
    <section className="pt-24 pb-20">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h1 className="text-center mb-10">Explore Live Memecoins</h1>
        
        <div className="flex justify-center gap-2 flex-wrap mb-8">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full border-none cursor-pointer font-${filter === 'all' ? 'bold' : 'normal'} ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('live')} 
            className={`px-4 py-2 rounded-full border-none cursor-pointer font-${filter === 'live' ? 'bold' : 'normal'} ${filter === 'live' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Live Now
          </button>
          <button 
            onClick={() => setFilter('trending')} 
            className={`px-4 py-2 rounded-full border-none cursor-pointer font-${filter === 'trending' ? 'bold' : 'normal'} ${filter === 'trending' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Trending
          </button>
          <button 
            onClick={() => setFilter('meme')} 
            className={`px-4 py-2 rounded-full border-none cursor-pointer font-${filter === 'meme' ? 'bold' : 'normal'} ${filter === 'meme' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Meme
          </button>
          <button 
            onClick={() => setFilter('defi')} 
            className={`px-4 py-2 rounded-full border-none cursor-pointer font-${filter === 'defi' ? 'bold' : 'normal'} ${filter === 'defi' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            DeFi
          </button>
          <button 
            onClick={() => setFilter('gaming')} 
            className={`px-4 py-2 rounded-full border-none cursor-pointer font-${filter === 'gaming' ? 'bold' : 'normal'} ${filter === 'gaming' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Gaming
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center">
            <p>Loading streams...</p>
          </div>
        ) : filteredStreams.length === 0 ? (
          <div className="text-center">
            <p>No streams found matching your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStreams.map((stream) => (
              <Link to={`/stream/${stream.id}`} key={stream.id} className="no-underline">
                <div className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg border-4 border-black">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.tokenName} 
                      className="w-full h-[180px] object-cover rounded-t-lg" 
                    />
                    {stream.isLive && (
                      <div className="absolute top-2.5 right-2.5 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        LIVE
                      </div>
                    )}
                    {stream.trending && (
                      <div className="absolute top-2.5 left-2.5 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                        TRENDING
                      </div>
                    )}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {stream.viewerCount} viewers
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-lg">{stream.tokenName}</h3>
                    <p className="m-0 text-gray-600">{stream.characterName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ExplorePage