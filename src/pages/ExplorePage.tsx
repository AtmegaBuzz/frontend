import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, TrendingUp, Tv, Flame, Zap, Gamepad2 } from 'lucide-react'
// Import character images
// import char1 from '@/assets/char1.jpeg'
// import char2 from '@/assets/char2.jpeg'
// import char3 from '@/assets/char3.jpeg'
// import char4 from '@/assets/char4.jpeg'
// import f1 from '@/assets/1f.png'
// import f2 from '@/assets/2f.png'
// import f3 from '@/assets/3f.png'
// import f4 from '@/assets/f4.png'
import { TokensData } from '@/interfaces'
import { getTokens } from '@/apis/token'


function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// interface StreamInfo {
//   id: string
//   tokenName: string
//   characterName: string
//   thumbnail: string
//   viewerCount: number
//   isLive: boolean
//   category: string
//   trending?: boolean
// }

const ExplorePage = () => {
  const [streams, setStreams] = useState<TokensData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // const mockStreams = [
    //   {
    //     id: 'pepe-coin',
    //     tokenName: '$PEPE COIN',
    //     characterName: 'Pepe The Based Frog',
    //     thumbnail: char1,
    //     viewerCount: 1256,
    //     isLive: true,
    //     category: 'meme',
    //     trending: true
    //   },
    //   {
    //     id: 'doge-coin',
    //     tokenName: '$PIXEL WAR', // Changed from '$DOGE KING'
    //     characterName: 'Pixel Warrior', // Changed from 'Much Wow Doge'
    //     thumbnail: char2,
    //     viewerCount: 989,
    //     isLive: true,
    //     category: 'meme',
    //     trending: true
    //   },
    //   {
    //     id: 'shiba-inu',
    //     tokenName: '$SHIB ARMY',
    //     characterName: 'Shiba Commander',
    //     thumbnail: f1,
    //     viewerCount: 845,
    //     isLive: true,
    //     category: 'meme'
    //   },
    //   {
    //     id: 'wojak-coin',
    //     tokenName: '$WOJAK',
    //     characterName: 'Feel Guy Alpha',
    //     thumbnail: f2,
    //     viewerCount: 712,
    //     isLive: false,
    //     category: 'meme'
    //   },
    //   {
    //     id: 'memecoin-1',
    //     tokenName: '$MOON SHOT',
    //     characterName: 'Moon Boy',
    //     thumbnail: char3,
    //     viewerCount: 598,
    //     isLive: true,
    //     category: 'defi'
    //   },
    //   {
    //     id: 'memecoin-2',
    //     tokenName: '$CHAD INU',
    //     characterName: 'Gigachad',
    //     thumbnail: f3,
    //     viewerCount: 487,
    //     isLive: true,
    //     category: 'defi'
    //   },
    //   {
    //     id: 'memecoin-3',
    //     tokenName: '$DOGE KING', // Changed from '$PIXEL WAR'
    //     characterName: 'Much Wow Doge', // Changed from 'Pixel Warrior'
    //     thumbnail: char4,
    //     viewerCount: 376,
    //     isLive: false,
    //     category: 'gaming'
    //   },
    //   {
    //     id: 'memecoin-4',
    //     tokenName: '$GAME KING',
    //     characterName: 'Gaming Legend',
    //     thumbnail: f4,
    //     viewerCount: 665,
    //     isLive: true,
    //     category: 'gaming',
    //     trending: true
    //   }
    // ]

    const fetchStreams = async () => {
      const { message, statusCode } = await getTokens("", "", 1, 9);

      if (statusCode !== 200) {
        setStreams([]);
      } else {
        setStreams(message as TokensData[]);
      }

    }



    fetchStreams();
    setIsLoading(false);
  }, [])

  const filteredStreams = streams;

  // const filteredStreams = filter === 'all' 
  //   ? streams 
  //   : filter === 'live' 
  //     ? streams.filter(stream => stream.isLive)
  //     : filter === 'trending'
  //       ? streams.filter(stream => stream.trending)
  //       : streams.filter(stream => stream.category === filter)

  const getFilterIcon = (filterName: string) => {
    switch (filterName) {
      case 'all': return <Sparkles size={18} />;
      case 'live': return <Tv size={18} />;
      case 'trending': return <TrendingUp size={18} />;
      case 'meme': return <Flame size={18} />;
      case 'defi': return <Zap size={18} />;
      case 'gaming': return <Gamepad2 size={18} />;
      default: return <Sparkles size={18} />;
    }
  }

  return (
    <section className="pt-24 pb-20 min-h-screen relative bg-gradient-to-b from-purple-light/10 to-blue-dark/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src="/images/pattern-bg.png" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main heading */}
        <div className="bg-[#FCFCE6] border-4 border-black rounded-xl p-4 mb-8 shadow-[-4px_4px_0_0_#1f2024] relative">
          <h1 className="text-3xl md:text-4xl font-bold text-center font-right-grotesk">
            Explore Live Memecoins
          </h1>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-8 relative">
          {[
            { name: 'all', label: 'All' },
            { name: 'live', label: 'Live Now' },
            { name: 'trending', label: 'Trending' },
            { name: 'meme', label: 'Meme' },
            { name: 'defi', label: 'DeFi' },
            { name: 'gaming', label: 'Gaming' }
          ].map(filterOption => (
            <button
              key={filterOption.name}
              onClick={() => setFilter(filterOption.name)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border-2 
                transition-all duration-200 font-bold text-sm
                ${filter === filterOption.name
                  ? 'bg-primary text-white border-black'
                  : 'bg-white/90 text-black border-gray-300 hover:border-black'
                }
              `}
            >
              {getFilterIcon(filterOption.name)}
              {filterOption.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-xl border-4 border-black">
            <div className="animate-pulse">
              <p className="text-2xl font-bold">Loading awesome streams...</p>
              <p>Get ready for some meme magic!</p>
            </div>
          </div>
        ) : filteredStreams.length === 0 ? (
          <div className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-xl border-4 border-black">
            <p className="text-2xl font-bold mb-2">No streams found matching your filter.</p>
            <p>Try another category or check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStreams.map((stream) => (
              <Link to={`/stream/${stream.id}`} key={stream.id} className="no-underline block group">
                <div className="bg-white rounded-xl border-6 border-black overflow-hidden transition-all duration-300 
                  shadow-[-6px_6px_0_0_#000] hover:shadow-[-10px_10px_0_0_#000] 
                  hover:-translate-y-2 hover:-translate-x-2 group-hover:bg-[#FCFCE6]">
                  <div className="relative">
                    <img
                      src={stream.tokenImageUrl}
                      alt={stream.tokenName}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* {stream.isLive && ( */}
                    <div className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-md text-white text-xs font-bold border-2 border-black shadow-lg flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      LIVE
                    </div>
                    {/* )} */}
                    {/* {stream.trending && (
                      <div className="absolute top-3 left-3 ml-16 bg-primary px-2 py-1 rounded-md text-white text-xs font-bold border-2 border-black shadow-sm flex items-center gap-1">
                        <TrendingUp size={12} />
                        TRENDING
                      </div>
                    )} */}
                    <div className="absolute top-3 right-3 bg-black px-2 py-1 rounded-md text-white text-xs font-bold border-2 border-white backdrop-blur-sm">
                      {randint(1,10).toLocaleString()} viewers
                    </div>
                  </div>
                  <div className="p-4 border-t-4 border-black bg-[#FCFCE6] group-hover:bg-white transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-1 font-right-grotesk group-hover:text-primary transition-colors duration-200">
                      ${stream.tokenName}
                    </h3>
                    <p data-title={stream.tokenDescription} className="text-gray-600 flex items-center gap-2 font-medium">
                      {/* <span className={`w-2 h-2 rounded-full ${stream.isLive ? 'bg-red-500' : 'bg-gray-300'}`}></span> */}
                      <span className={`w-2 h-2 rounded-full bg-red-500`}></span>
                      {stream.tokenDescription.slice(0,31)}...
                    </p>
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