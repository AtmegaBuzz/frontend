import React from 'react'

interface SocialAgentConfig {
  enabled: boolean
  name: string
  bio: string
  model: string
  aiKey: string
  voice: string
}

interface SocialAgentCardProps {
  agentType: 'twitter' | 'discord' | 'instagram'
  config: SocialAgentConfig
  onToggle: (agentType: 'twitter' | 'discord' | 'instagram', enabled: boolean) => void
  onConfigureClick: (agentType: 'twitter' | 'discord' | 'instagram') => void
}

const SocialAgentCard: React.FC<SocialAgentCardProps> = ({
  agentType,
  config,
  onToggle,
  onConfigureClick
}) => {
  // Get color scheme based on agent type
  const getAgentColor = (type: 'twitter' | 'discord' | 'instagram') => {
    switch (type) {
      case 'twitter':
        return {
          bgColor: 'bg-[#1DA1F2]',
          hoverColor: 'hover:bg-[#1a91da]',
          iconColor: 'text-[#1DA1F2]',
          borderColor: 'border-[#1DA1F2]',
          gradientFrom: 'from-[#1DA1F2]/10'
        }
      case 'discord':
        return {
          bgColor: 'bg-[#5865F2]',
          hoverColor: 'hover:bg-[#4752c4]',
          iconColor: 'text-[#5865F2]',
          borderColor: 'border-[#5865F2]',
          gradientFrom: 'from-[#5865F2]/10'
        }
      case 'instagram':
        return {
          bgColor: 'bg-[#E4405F]',
          hoverColor: 'hover:bg-[#d03251]',
          iconColor: 'text-[#E4405F]',
          borderColor: 'border-[#E4405F]',
          gradientFrom: 'from-[#E4405F]/10'
        }
    }
  }

  // Function to get the agent title
  const getAgentTitle = (type: 'twitter' | 'discord' | 'instagram') => {
    const baseTitle = type.charAt(0).toUpperCase() + type.slice(1)
    return config.name ? `${baseTitle}: ${config.name}` : `${baseTitle} Agent`
  }

  const colors = getAgentColor(agentType)

  return (
    <div 
      className={`border-4 rounded-xl p-4 overflow-hidden relative transition-all duration-300 hover:shadow-lg ${
        config.enabled 
          ? `${colors.borderColor} bg-gradient-to-b ${colors.gradientFrom} to-white` 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {agentType === 'twitter' && (
            <svg className={`w-6 h-6 mr-2 ${colors.iconColor}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          )}
          {agentType === 'discord' && (
            <svg className={`w-6 h-6 mr-2 ${colors.iconColor}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          )}
          {agentType === 'instagram' && (
            <svg className={`w-6 h-6 mr-2 ${colors.iconColor}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.235.585 1.8 1.15.566.566.902 1.132 1.152 1.8.247.636.416 1.363.465 2.427.047 1.024.06 1.379.06 3.808s-.013 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.151 1.8c-.566.566-1.132.902-1.8 1.152-.636.247-1.363.416-2.427.465-1.024.047-1.379.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.8-1.151 4.902 4.902 0 01-1.151-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427.25-.668.585-1.235 1.15-1.8.566-.566 1.132-.902 1.8-1.152.636-.247 1.363-.416 2.427-.465C9.531 2.013 9.886 2 12.315 2zm0 1.8c-2.338 0-2.626.01-3.637.052-.874.04-1.36.19-1.678.311-.424.162-.729.358-1.05.68-.32.32-.517.626-.68 1.05-.12.317-.27.804-.31 1.677-.043 1.013-.052 1.3-.052 3.637s.01 2.626.052 3.637c.04.874.19 1.36.31 1.678.163.424.359.729.68 1.05.32.32.626.517 1.05.68.318.12.804.27 1.677.31 1.012.043 1.3.052 3.637.052s2.626-.01 3.637-.052c.874-.04 1.36-.19 1.678-.31.424-.162.729-.358 1.05-.68.32-.32.517-.626.68-1.05.12-.317.27-.804.31-1.677.043-1.013.052-1.3.052-3.637s-.01-2.626-.052-3.637c-.04-.874-.19-1.36-.31-1.678a2.805 2.805 0 00-.68-1.05c-.32-.32-.626-.517-1.05-.68-.318-.12-.804-.27-1.677-.31-1.013-.043-1.3-.052-3.637-.052z" />
              <path d="M12.315 5.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zM12.315 12.262a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm4.245-7.597a.983.983 0 100 1.966.983.983 0 000-1.966z" />
            </svg>
          )}
          <span className="font-bold">{getAgentTitle(agentType)}</span>
        </div>
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.enabled}
              onChange={(e) => onToggle(agentType, e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${
              agentType === 'twitter'
                ? 'peer-focus:ring-blue-300 peer-checked:bg-[#1DA1F2]'
                : agentType === 'discord'
                  ? 'peer-focus:ring-indigo-300 peer-checked:bg-[#5865F2]'
                  : 'peer-focus:ring-pink-300 peer-checked:bg-[#E4405F]'
            } rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
          </label>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">
        {agentType === 'twitter' && 'AI-powered Twitter agent that can post updates, engage with the community, and build your social media presence.'}
        {agentType === 'discord' && 'AI-powered Discord bot that can manage your server, answer questions, and engage with your community.'}
        {agentType === 'instagram' && 'AI-powered Instagram agent that can create posts, stories, and engage with your audience through visuals.'}
      </p>

      <button 
        type="button" 
        onClick={() => onConfigureClick(agentType)}
        className={`w-full p-2 rounded-lg text-sm font-bold text-white ${
          agentType === 'twitter'
            ? 'bg-[#1DA1F2] hover:bg-[#1a91da]'
            : agentType === 'discord'
              ? 'bg-[#5865F2] hover:bg-[#4752c4]'
              : 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FFDC80] hover:opacity-90'
        } transition-colors`}
      >
        {config.enabled ? 'Edit Configuration' : 'Configure Agent'}
      </button>
    </div>
  )
}

export default SocialAgentCard