import React from 'react'

interface SocialAgentConfig {
  enabled: boolean
  name: string
  bio: string
  model: string
  aiKey: string
  voice: string
}

interface AgentConfigurationPopupProps {
  selectedAgent: 'twitter' | 'discord' | 'instagram'
  socialAgents: {
    twitter: SocialAgentConfig
    discord: SocialAgentConfig
    instagram: SocialAgentConfig
  }
  closeAgentPopup: () => void
  handleAgentChange: (field: string, value: string | boolean) => void
  saveAgentConfig: () => void
  tokenName: string
}

const AgentConfigurationPopup: React.FC<AgentConfigurationPopupProps> = ({
  selectedAgent,
  socialAgents,
  closeAgentPopup,
  handleAgentChange,
  saveAgentConfig,
  tokenName
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backdropFilter: 'blur(5px)'}}>
      <div 
        className="fixed inset-0 bg-black opacity-50" 
        onClick={closeAgentPopup}
      ></div>
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 border-4 border-black">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-xl font-bold flex items-center">
            {selectedAgent === 'twitter' && (
              <svg className="w-6 h-6 mr-2 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            )}
            {selectedAgent === 'discord' && (
              <svg className="w-6 h-6 mr-2 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            )}
            {selectedAgent === 'instagram' && (
              <svg className="w-6 h-6 mr-2 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.235.585 1.8 1.15.566.566.902 1.132 1.152 1.8.247.636.416 1.363.465 2.427.047 1.024.06 1.379.06 3.808s-.013 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.151 1.8c-.566.566-1.132.902-1.8 1.152-.636.247-1.363.416-2.427.465-1.024.047-1.379.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.8-1.151 4.902 4.902 0 01-1.151-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427.25-.668.585-1.235 1.15-1.8.566-.566 1.132-.902 1.8-1.152.636-.247 1.363-.416 2.427-.465C9.531 2.013 9.886 2 12.315 2zm0 1.8c-2.338 0-2.626.01-3.637.052-.874.04-1.36.19-1.678.311-.424.162-.729.358-1.05.68-.32.32-.517.626-.68 1.05-.12.317-.27.804-.31 1.677-.043 1.013-.052 1.3-.052 3.637s.01 2.626.052 3.637c.04.874.19 1.36.31 1.678.163.424.359.729.68 1.05.32.32.626.517 1.05.68.318.12.804.27 1.677.31 1.012.043 1.3.052 3.637.052s2.626-.01 3.637-.052c.874-.04 1.36-.19 1.678-.31.424-.162.729-.358 1.05-.68.32-.32.517-.626.68-1.05.12-.317.27-.804.31-1.677.043-1.013.052-1.3.052-3.637s-.01-2.626-.052-3.637c-.04-.874-.19-1.36-.31-1.678a2.805 2.805 0 00-.68-1.05c-.32-.32-.626-.517-1.05-.68-.318-.12-.804-.27-1.677-.31-1.013-.043-1.3-.052-3.637-.052z" />
                <path d="M12.315 5.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zM12.315 12.262a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm4.245-7.597a.983.983 0 100 1.966.983.983 0 000-1.966z" />
              </svg>
            )}
            Configure {selectedAgent.charAt(0).toUpperCase() + selectedAgent.slice(1)} AI Agent
          </h3>
          <button 
            type="button" 
            onClick={closeAgentPopup}
            className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Load Character Section */}
            <div className="mb-6 border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-bold mb-2 text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Load Character
              </h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-500 mb-1">Drag and drop a character JSON file here</p>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm font-medium">Saved Backups</span>
                <button className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors text-gray-700">
                  Save New
                </button>
              </div>
            </div>
            
            {/* AI Model Settings */}
            <div className="mb-6">
              <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI Model Settings
              </h4>
              
              {/* AI Model Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">AI Model</label>
                <select 
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  value={socialAgents[selectedAgent].model}
                  onChange={(e) => handleAgentChange('model', e.target.value)}
                >
                  <optgroup label="OpenAI">
                    <option value="GPT-4 Turbo">GPT-4 Turbo</option>
                    <option value="GPT-4">GPT-4</option>
                    <option value="GPT-3.5 Turbo">GPT-3.5 Turbo</option>
                  </optgroup>
                  <optgroup label="Anthropic">
                    <option value="Claude 3 Opus">Claude 3 Opus</option>
                    <option value="Claude 3 Sonnet">Claude 3 Sonnet</option>
                    <option value="Claude 2">Claude 2</option>
                  </optgroup>
                  <optgroup label="Google">
                    <option value="Gemini Pro">Gemini Pro</option>
                    <option value="PaLM 2">PaLM 2</option>
                  </optgroup>
                  <optgroup label="Meta">
                    <option value="Llama 2">Llama 2</option>
                  </optgroup>
                </select>
              </div>
              
              {/* OpenRouter API Key */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">API Key (Optional)</label>
                <input 
                  type="password" 
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  value={socialAgents[selectedAgent].aiKey}
                  onChange={(e) => handleAgentChange('aiKey', e.target.value)}
                  placeholder="Enter your API key"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use ShillTube's shared API credits.</p>
              </div>
              
              {/* Voice Model */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Voice Model</label>
                <div className="flex flex-wrap gap-2">
                  {['Male', 'Female', 'Robot', 'Child', 'Custom'].map(voice => (
                    <button
                      key={voice}
                      type="button"
                      onClick={() => handleAgentChange('voice', voice)}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${
                        socialAgents[selectedAgent].voice === voice
                          ? 'bg-blue-500 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {voice}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            {/* Character Details */}
            <div className="mb-6">
              <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Character Details
              </h4>
              
              {/* Character Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Character Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  value={socialAgents[selectedAgent].name}
                  onChange={(e) => handleAgentChange('name', e.target.value)}
                  placeholder={`${tokenName || selectedAgent.charAt(0).toUpperCase() + selectedAgent.slice(1)} Bot`}
                />
              </div>
              
              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea 
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all min-h-[100px]"
                  value={socialAgents[selectedAgent].bio}
                  onChange={(e) => handleAgentChange('bio', e.target.value)}
                  placeholder={`The official ${selectedAgent} AI assistant for ${tokenName || 'our memecoin'}. I share updates, engage with the community, and answer questions about our project.`}
                />
              </div>
              
              {/* Available Clients */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Available Clients</label>
                <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {['Discord', 'Direct', 'Twitter', 'Telegram', 'Farcaster'].map(client => (
                    <label key={client} className="flex items-center bg-white px-3 py-2 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50">
                      <input 
                        type="checkbox" 
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked={client.toLowerCase() === selectedAgent}
                      />
                      <span className="text-sm">{client}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Model Provider */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Model Provider</label>
                <select 
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  defaultValue="openai"
                >
                  <option value="" disabled>Select a provider</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google</option>
                  <option value="meta">Meta</option>
                  <option value="mistral">Mistral</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="p-6 bg-gray-50 rounded-b-xl border-t-2 border-gray-200 flex justify-between">
          <button 
            type="button" 
            onClick={closeAgentPopup}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={saveAgentConfig}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              selectedAgent === 'twitter' 
                ? 'bg-[#1DA1F2] hover:bg-[#1a91da]' 
                : selectedAgent === 'discord'
                  ? 'bg-[#5865F2] hover:bg-[#4752c4]'
                  : 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FFDC80] hover:opacity-90'
            }`}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgentConfigurationPopup