import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  isAI: boolean
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
}

const LiveStreamPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [viewerCount, setViewerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showEvent, setShowEvent] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
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
        telegram: 't.me/pepecoin'
      }
      
      setTimeout(() => {
        setTokenInfo(mockTokenInfo)
        setIsLoading(false)
        
        // Add initial AI greeting
        const initialMessage: Message = {
          id: 'initial',
          user: mockTokenInfo.characterName,
          text: `Hey everyone! It's ${mockTokenInfo.characterName} here, the face of ${mockTokenInfo.name}! Ask me anything about the token or just chat with me. I'm feeling ribbit-ing today! 🐸`,
          timestamp: new Date(),
          isAI: true
        }
        
        setMessages([initialMessage])
      }, 1500)
    }
    
    fetchTokenInfo()
  }, [tokenId])
  
  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
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
  
  // Simulate random AI activity
  useEffect(() => {
    if (!tokenInfo) return
    
    const interval = setInterval(() => {
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
      clearInterval(interval)
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
      isAI: false
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let aiResponse = ''
      
      // Generate contextual responses based on user input
      const lowerCaseMessage = newMessage.toLowerCase()
      
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
            <img 
              src="/images/single-bot@2x.png" 
              alt={tokenInfo?.characterName} 
              className="max-w-[300px] max-h-[300px] animate-float mb-5" 
            />
            <h2 className="text-white mb-2">
              {tokenInfo?.characterName} is LIVE!
            </h2>
            <p className="text-gray-400">
              Interactive AI stream powered by ShillTube
            </p>
          </div>
          
          {/* Viewer count */}
          <div className="absolute top-2.5 right-2.5 bg-black/70 text-white px-2.5 py-1 rounded text-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            LIVE: {viewerCount} viewers
          </div>
          
          {/* Special event overlay */}
          {showEvent && (
            <div className="absolute bottom-5 left-5 right-5 bg-primary/90 text-white p-4 rounded-lg text-center animate-pulse">
              <h3 className="mb-2">🎁 SPECIAL EVENT! 🎁</h3>
              <p>Buy exactly 0.0069 ETH of {tokenInfo?.symbol} in the next 10 minutes and post your transaction hash to enter our exclusive giveaway!</p>
            </div>
          )}
        </div>
        
        {/* Token info */}
        <div className="bg-gray-800 rounded-lg p-5 mb-5 text-white">
          <h2 className="mb-4">{tokenInfo?.name} ({tokenInfo?.symbol})</h2>
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
          
          <div className="flex flex-wrap gap-2">
            <a href={tokenInfo?.website} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-4 py-2 rounded-full no-underline text-sm font-bold">
              Website
            </a>
            <a href={`https://twitter.com/${tokenInfo?.twitter}`} target="_blank" rel="noopener noreferrer" className="bg-[#1da1f2] text-white px-4 py-2 rounded-full no-underline text-sm font-bold">
              Twitter
            </a>
            <a href={`https://${tokenInfo?.telegram}`} target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white px-4 py-2 rounded-full no-underline text-sm font-bold">
              Telegram
            </a>
            <a href={`https://etherscan.io/token/${tokenInfo?.contract}`} target="_blank" rel="noopener noreferrer" className="bg-[#3498db] text-white px-4 py-2 rounded-full no-underline text-sm font-bold">
              Contract
            </a>
          </div>
        </div>
      </div>
      
      {/* Chat sidebar */}
      <div className="bg-gray-800 border-l border-gray-700 flex flex-col h-[calc(100vh-80px)] sticky top-20">
        <div className="p-4 border-b border-gray-700 text-white font-bold">
          Live Chat
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-auto p-4 flex flex-col gap-2">
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col p-2 rounded-lg ${msg.isAI ? 'bg-primary/10' : 'bg-gray-700/50'}`}>
              <div className="flex items-center mb-1">
                <span className={`font-bold ${msg.isAI ? 'text-primary' : 'text-white'} mr-2`}>
                  {msg.user}
                </span>
                <span className="text-xs text-gray-400">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <div className="text-white">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Chat with the character..."
            className="flex-1 p-2 rounded-full border-none bg-gray-700 text-white"
          />
          <button 
            type="submit"
            className="bg-primary text-white border-none rounded-full px-4 cursor-pointer font-bold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default LiveStreamPage