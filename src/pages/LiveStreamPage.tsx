import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, MessageSquare, Share2, Users, ExternalLink, Info, Shield, Star } from 'lucide-react'

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  isAI: boolean
  isCurrentUser?: boolean
}

interface TokenCreator {
  username: string
  profilePic: string
  verified: boolean
  followers: number
  joined: string
}

interface Agent {
  id: string
  name: string
  image: string
  ipfsLink: string
  description: string
  traits: Record<string, string>
}

interface TokenInfo {
  id: string
  name: string
  symbol: string
  description: string
  characterName: string
  price: number
  marketCap: number
  holders: number
  contract: string
  chain: string
  website: string
  twitter: string
  telegram: string
  creator: TokenCreator
  agent: Agent
  launchDate: string
  allTimeHigh: number
  allTimeHighDate: string
}

const LiveStreamPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>()
  // const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [viewerCount, setViewerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showEvent, setShowEvent] = useState(false)
  const [showAgentModal, setShowAgentModal] = useState(false)
  // const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLive, setIsLive] = useState(true)
  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  // Simulate random viewer count fluctuations
  useEffect(() => {
    const initialCount = Math.floor(Math.random() * 200) + 50
    setViewerCount(initialCount)

    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
      setViewerCount(prevCount => Math.max(initialCount - 20, prevCount + change))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Initialize like count
  useEffect(() => {
    setLikeCount(Math.floor(Math.random() * 500) + 100)
  }, [])

  // Simulate token information loading
  useEffect(() => {
    const fetchTokenInfo = async () => {
      setIsLoading(true)

      // Mock data based on tokenId
      const mockTokenInfo: TokenInfo = {
        id: tokenId || 'unknown',
        name: tokenId === 'pepe-coin' ? 'Pepe Coin' : 'Unknown Token',
        symbol: tokenId === 'pepe-coin' ? 'PEPE' : 'UNKNOWN',
        description: 'The original meme cryptocurrency inspired by the Pepe the Frog meme.',
        characterName: 'Pepe the Frog',
        price: 0.0000123,
        marketCap: 123456789,
        holders: 54321,
        contract: '0x1234567890abcdef1234567890abcdef12345678',
        chain: 'Ethereum',
        website: 'https://pepecoin.io',
        twitter: '@PepeCoinOfficial',
        telegram: 't.me/pepecoin',
        launchDate: '2023-04-15',
        allTimeHigh: 0.0000189,
        allTimeHighDate: '2023-07-12',
        // Added token creator information
        creator: {
          username: 'CryptoMemeLord',
          profilePic: '/api/placeholder/80/80',
          verified: true,
          followers: 12500,
          joined: '2021-03-15'
        },
        // Added agent information with IPFS link
        agent: {
          id: 'pepe-agent-001',
          name: 'Pepe AI',
          image: '/api/placeholder/150/150',
          ipfsLink: 'ipfs://Qm123456789abcdefghijklmnopqrstuvwxyz123456',
          description: 'An AI-powered avatar representing Pepe Coin. Trained on meme culture and crypto knowledge to assist the community.',
          traits: {
            Personality: 'Humorous',
            Knowledge: 'Cryptocurrency',
            Specialty: 'Memes',
            Language: 'English',
            Training: 'Advanced'
          }
        }
      }

      setTimeout(() => {
        setTokenInfo(mockTokenInfo)
        setIsLoading(false)

        // Add initial system message
        const systemMessage: Message = {
          id: 'system-welcome',
          user: 'System',
          text: `Welcome to the ${mockTokenInfo.name} live stream! Chat with other viewers and interact with ${mockTokenInfo.characterName}.`,
          timestamp: new Date(),
          isAI: false
        }

        // Add initial AI greeting
        const initialMessage: Message = {
          id: 'initial',
          user: mockTokenInfo.characterName,
          text: `Hey everyone! It's ${mockTokenInfo.characterName} here, the face of ${mockTokenInfo.name}! Ask me anything about the token or just chat with me. I'm feeling ribbit-ing today! 🐸`,
          timestamp: new Date(),
          isAI: true
        }

        setMessages([systemMessage, initialMessage])
      }, 1500)
    }

    fetchTokenInfo()
  }, [tokenId])

  // Improved auto-scroll behavior that only scrolls when user is already at the bottom
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // Check if user is near bottom of chat
  const isNearBottom = () => {
    if (!chatContainerRef.current) return false
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    // Consider "near bottom" if within 100px of the bottom
    const scrollThreshold = 100
    return scrollHeight - scrollTop - clientHeight < scrollThreshold
  }
  
  // Handle scroll events to determine if auto-scroll should happen
  const handleScroll = () => {
    if (chatContainerRef.current) {
      setShouldAutoScroll(isNearBottom())
    }
  }
  
  // Auto-scroll to bottom of chat only when appropriate
  useEffect(() => {
    if (shouldAutoScroll && chatContainerRef.current) {
      // Only scroll the chat container itself, not the entire page
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, shouldAutoScroll])

  // Sample user names for random chat messages
  const userNames = [
    'CryptoWhale', 'MoonHodler', 'DiamondHands', 'TokenFarmer',
    'ChainMaster', 'DeFiKing', 'CoinCollector', 'BlockchainBro',
    'ShibaLover', 'EthTrader', 'NFTHunter', 'GasFeePayer'
  ]

  // Sample chat messages from other users
  const otherUserMessages = [
    "Just bought another bag! LFG! 🚀",
    "What's the tokenomics like?",
    "Holding since day one! 💎🙌",
    "When CEX listing?",
    "This community is awesome!",
    "Chart looking bullish today",
    "What's today's trading volume?",
    "Anyone know when the next AMA is?",
    "I love this project's roadmap",
    "New ATH soon?",
    "How many holders do we have now?"
  ]

  // Simulate random AI responses
  const aiResponses = [
    "Feeling bullish today! Our community is growing stronger every day! 🚀",
    "Have you checked our latest updates? Big things coming soon!",
    "To the moon! 🌕 That's where we're headed!",
    "HODL tight, friends! Diamond hands win in the long run! 💎🙌",
    "Our roadmap is packed with exciting developments. Stay tuned!",
    "Thanks for being part of this amazing journey!",
    "Remember when we were just starting? Look how far we've come!",
    "Community is everything. You're what makes this project special!",
    "Thinking about hosting a special giveaway soon... what do you think?",
    "Just saw some whale movement. Interesting times ahead! 🐋"
  ]

  // Simulate random activity in the chat
  useEffect(() => {
    if (!tokenInfo) return

    // AI character messages
    const aiInterval = setInterval(() => {
      const shouldPost = Math.random() > 0.6 // 40% chance of posting

      if (shouldPost) {
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          user: tokenInfo.characterName,
          text: randomResponse,
          timestamp: new Date(),
          isAI: true
        }

        setMessages(prev => [...prev, aiMessage])
      }
    }, 15000) // Every 15 seconds

    // Other users' messages
    const usersInterval = setInterval(() => {
      const shouldPost = Math.random() > 0.4 // 60% chance of posting

      if (shouldPost) {
        const randomUser = userNames[Math.floor(Math.random() * userNames.length)]
        const randomMessage = otherUserMessages[Math.floor(Math.random() * otherUserMessages.length)]

        const userMessage: Message = {
          id: `other-${Date.now()}`,
          user: randomUser,
          text: randomMessage,
          timestamp: new Date(),
          isAI: false
        }

        setMessages(prev => [...prev, userMessage])
      }
    }, 8000) // Every 8 seconds

    // Simulate periodic special events
    const eventInterval = setInterval(() => {
      const shouldShowEvent = Math.random() > 0.7 // 30% chance

      if (shouldShowEvent) {
        setShowEvent(true)

        // Hide event after 2 minutes
        setTimeout(() => {
          setShowEvent(false)
        }, 120000)
      }
    }, 300000) // Every 5 minutes

    return () => {
      clearInterval(aiInterval)
      clearInterval(usersInterval)
      clearInterval(eventInterval)
    }
  }, [tokenInfo])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !tokenInfo) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      user: 'You',
      text: newMessage,
      timestamp: new Date(),
      isAI: false,
      isCurrentUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate AI response after a short delay if message mentions the character or token
    const lowerCaseMessage = newMessage.toLowerCase()
    const aiShouldRespond = lowerCaseMessage.includes(tokenInfo.name.toLowerCase()) ||
      lowerCaseMessage.includes(tokenInfo.symbol.toLowerCase()) ||
      lowerCaseMessage.includes(tokenInfo.characterName.toLowerCase()) ||
      lowerCaseMessage.includes('?')

    if (aiShouldRespond) {
      setTimeout(() => {
        let aiResponse = ''

        // Generate contextual responses based on user input
        if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('worth')) {
          aiResponse = `${tokenInfo.name} is currently trading at $${tokenInfo.price.toFixed(8)}. We've seen some nice growth lately! 📈`
        }
        else if (lowerCaseMessage.includes('buy') || lowerCaseMessage.includes('purchase')) {
          aiResponse = `Want to buy some ${tokenInfo.symbol}? You can get it on major DEXes like Uniswap or PancakeSwap. Make sure you're using the correct contract address: ${tokenInfo.contract.slice(0, 6)}...${tokenInfo.contract.slice(-4)}`
        }
        else if (lowerCaseMessage.includes('roadmap') || lowerCaseMessage.includes('future')) {
          aiResponse = `Our roadmap includes exchange listings, partnerships, and new utilities. The team is working hard behind the scenes! Stay tuned for big announcements soon! 🚀`
        }
        else if (lowerCaseMessage.includes('team') || lowerCaseMessage.includes('developer')) {
          aiResponse = `Our team is a dedicated group of blockchain enthusiasts and meme lovers. While they prefer to remain anonymous, they're constantly working to improve the project!`
        }
        else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
          aiResponse = `Hey there! Great to see you in the stream. How's your day going? Enjoying the ${tokenInfo.symbol} journey?`
        }
        else if (lowerCaseMessage.includes('creator') || lowerCaseMessage.includes('who made')) {
          aiResponse = `${tokenInfo.name} was created by ${tokenInfo.creator.username}, who's been in the crypto space since ${tokenInfo.creator.joined.split('-')[0]}. They've built a great community around this project!`
        }
        else if (lowerCaseMessage.includes('agent') || lowerCaseMessage.includes('ai')) {
          aiResponse = `I'm ${tokenInfo.agent.name}, the official AI representative for ${tokenInfo.name}. I was trained to help the community and spread the word about our amazing project!`
        }
        else {
          // Default random response
          aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
        }

        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          user: tokenInfo.characterName,
          text: aiResponse,
          timestamp: new Date(),
          isAI: true
        }

        setMessages(prev => [...prev, aiMessage])
      }, 1500)
    }
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(prev => prev + 1)
      setHasLiked(true)
    } else {
      setLikeCount(prev => prev - 1)
      setHasLiked(false)
    }
  }

  const handleAgentClick = () => {
    setShowAgentModal(true)
  }

  const handleRedirectToIPFS = () => {
    if (tokenInfo?.agent.ipfsLink) {
      // In a real app, you would redirect to a gateway URL
      window.open(`https://gateway.ipfs.io/ipfs/${tokenInfo.agent.ipfsLink.replace('ipfs://', '')}`, '_blank')
    }
    setShowAgentModal(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20 bg-gray-900">
        <p className="text-white">Loading stream...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] min-h-screen pt-20 bg-gray-900">
      {/* Main stream area */}
      <div className="p-5 relative">
        {/* Stream player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-5">
          {/* "Video" placeholder */}
          <div className="w-full h-full flex flex-col items-center justify-center p-5 bg-[linear-gradient(45deg,#2b2b2b_25%,#222_25%,#222_50%,#2b2b2b_50%,#2b2b2b_75%,#222_75%,#222_100%)] bg-[length:10px_10px]">
            <div className="relative w-full h-[500px] group">
              {/* YouTube Embed */}
              {
                isLive ?
                  (
                    <iframe
                      id="youtube-live"
                      className="w-full h-full pointer-events-none"
                      src={`https://www.youtube.com/embed/live_stream?channel=UCetf834RebcJNy7nLmtQpnw&autoplay=1&controls=0`}
                      allow="autoplay; encrypted-media"
                      onCanPlay={() => setIsLive(false)}
                    />
                  )
                  : (
                    <h1>Error occurred</h1>
                  )
              }
            </div>
          </div>

          {/* Stream info bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            {/* Creator info - NEW */}
            <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-2 border border-white/10">
              <img 
                src={tokenInfo?.creator.profilePic} 
                alt={tokenInfo?.creator.username} 
                className="w-6 h-6 rounded-full object-cover" 
              />
              <span>{tokenInfo?.creator.username}</span>
              {tokenInfo?.creator.verified && (
                <Shield size={14} className="text-blue-500" />
              )}
            </div>
            
            {/* Viewer count */}
            <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-2 border border-white/10">
              <Users size={16} className="text-red-500" />
              <span>{viewerCount} viewers</span>
            </div>
          </div>

          {/* Stream actions */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button 
              className={`p-2 rounded-full border border-white/10 transition-colors duration-200 flex items-center gap-2 ${
                hasLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/40 hover:bg-primary backdrop-blur-sm text-white'
              }`}
              onClick={handleLike}
            >
              <Heart size={22} className={hasLiked ? 'animate-pulse' : ''} />
              <span>{likeCount}</span>
            </button>
            <button className="bg-black/40 hover:bg-primary backdrop-blur-sm p-2 rounded-full border border-white/10 transition-colors duration-200">
              <Share2 size={22} className="text-white" />
            </button>
          </div>

          {/* Special event overlay */}
          {showEvent && (
            <div className="absolute left-4 right-4 bottom-16 bg-primary text-white p-4 rounded-xl border-2 border-white shadow-lg animate-pulse">
              <h3 className="font-bold text-lg mb-1">🎁 SPECIAL EVENT! 🎁</h3>
              <p>Buy exactly 0.0069 ETH of {tokenInfo?.symbol} in the next 10 minutes and post your transaction hash to enter our exclusive giveaway!</p>
            </div>
          )}
        </div>

        {/* Token info card */}
        <div className="bg-gray-800 rounded-lg p-5 mb-5 text-white">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold flex items-center gap-2">
                {tokenInfo?.name} ({tokenInfo?.symbol})
                <span className="text-sm font-normal text-gray-400">
                  Launched {new Date(tokenInfo?.launchDate || '').toLocaleDateString()}
                </span>
              </h2>
              <p className="mb-5 text-gray-300">{tokenInfo?.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Price</div>
                  <div className="font-bold">${tokenInfo?.price.toFixed(8)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Market Cap</div>
                  <div className="font-bold">${tokenInfo?.marketCap.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Holders</div>
                  <div className="font-bold">{tokenInfo?.holders.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Network</div>
                  <div className="font-bold">{tokenInfo?.chain}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                <div>
                  <div className="text-gray-400 text-sm mb-1">All-Time High</div>
                  <div className="font-bold">${tokenInfo?.allTimeHigh.toFixed(8)}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">ATH Date</div>
                  <div className="font-bold">{new Date(tokenInfo?.allTimeHighDate || '').toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Creator</div>
                  <div className="font-bold">{tokenInfo?.creator.username}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Creator Followers</div>
                  <div className="font-bold">{tokenInfo?.creator.followers.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={tokenInfo?.website} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:bg-[#e42c7f] transition-colors duration-200">
                  Website
                </a>
                <a href={`https://twitter.com/${tokenInfo?.twitter}`} target="_blank" rel="noopener noreferrer" className="bg-[#1da1f2] text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:opacity-90 transition-opacity duration-200">
                  Twitter
                </a>
                <a href={`https://${tokenInfo?.telegram}`} target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:opacity-90 transition-opacity duration-200">
                  Telegram
                </a>
                <a href={`https://etherscan.io/token/${tokenInfo?.contract}`} target="_blank" rel="noopener noreferrer" className="bg-[#3498db] text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:opacity-90 transition-opacity duration-200">
                  Contract
                </a>
              </div>
            </div>

            {/* Agent card - NEW */}
            <div 
              className="bg-gray-700 rounded-lg p-4 w-full md:w-64 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-600 hover:border-primary" 
              onClick={handleAgentClick}
            >
              <div className="text-center">
                <img 
                  src={tokenInfo?.agent.image} 
                  alt={tokenInfo?.agent.name} 
                  className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-primary" 
                />
                <h3 className="mt-2 font-bold text-lg flex items-center justify-center gap-1">
                  {tokenInfo?.agent.name}
                  <Star size={16} className="text-yellow-400" />
                </h3>
                <p className="text-gray-300 text-sm mt-1">AI Representative</p>
                <div className="mt-3 text-xs text-gray-400 flex items-center justify-center">
                  <Info size={14} className="mr-1" /> Click to view details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat sidebar */}
      <div className="bg-gray-800 border-l border-gray-700 flex flex-col h-[calc(100vh-5rem)] sticky top-20">
        <div className="p-4 border-b border-gray-700 text-white font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} />
            <span>Live Chat</span>
          </div>
          <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            {viewerCount} active
          </div>
        </div>

        {/* Messages area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-auto p-4 flex flex-col gap-3 bg-gray-900"
          onScroll={handleScroll}
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col p-3 rounded-lg ${msg.user === 'System'
                ? 'bg-gray-800/50 border-l-4 border-gray-500 text-gray-400'
                : msg.isAI
                  ? 'bg-primary/20 border-l-4 border-primary'
                  : msg.isCurrentUser
                    ? 'bg-blue-900/30 border-l-4 border-blue-500'
                    : 'bg-gray-800/80 border-l-4 border-gray-600'
                }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${msg.user === 'System' ? 'text-gray-400' :
                  msg.isAI ? 'text-primary' :
                    msg.isCurrentUser ? 'text-blue-400' :
                      'text-gray-300'
                  }`}>
                  {msg.user}
                </span>
                <span className="text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="text-white">
                {msg.text}
              </div>
            </div>
          ))}
          {/* We're managing scrolling via the chatContainerRef directly now */}
        </div>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Join the conversation..."
              className="flex-1 p-2 rounded-lg border-none bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-[#e42c7f] text-white px-4 rounded-lg font-bold transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Agent Modal - NEW */}
      {showAgentModal && tokenInfo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl text-white font-bold">{tokenInfo.agent.name}</h2>
                <button 
                  onClick={() => setShowAgentModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <img 
                  src={tokenInfo.agent.image} 
                  alt={tokenInfo.agent.name} 
                  className="w-32 h-32 rounded-lg object-cover border-2 border-primary" 
                />
                <div>
                  <p className="text-gray-300 mb-4">{tokenInfo.agent.description}</p>
                  <button
                    onClick={handleRedirectToIPFS}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    View on IPFS
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-white font-bold mb-3">Agent Traits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(tokenInfo.agent.traits).map(([trait, value]) => (
                    <div key={trait} className="bg-gray-700 p-3 rounded-md">
                      <div className="text-gray-400 text-sm">{trait}</div>
                      <div className="text-white font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-6 pt-4">
                <h3 className="text-white font-bold mb-3">Token Association</h3>
                <p className="text-gray-300">
                  Official AI agent for {tokenInfo.name} ({tokenInfo.symbol})
                </p>
                <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                  <span>Created by</span>
                  <span className="flex items-center gap-1 text-white">
                    {tokenInfo.creator.username}
                    {tokenInfo.creator.verified && (
                      <Shield size={12} className="text-blue-500" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveStreamPage