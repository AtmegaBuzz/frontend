import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CharacterCreationPageProps {
  isWalletConnected: boolean
  connectWallet: () => Promise<void>
}

type CharacterType = 'vtuber' | 'custom'
type VoiceType = 'male' | 'female' | 'robot' | 'custom'
type PersonalityType = 'friendly' | 'sarcastic' | 'energetic' | 'calm' | 'informative' | 'custom'

const CharacterCreationPage = ({ isWalletConnected, connectWallet }: CharacterCreationPageProps) => {
  const navigate = useNavigate()
  
  const [characterType, setCharacterType] = useState<CharacterType>('vtuber')
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1)
  const [customImage, setCustomImage] = useState<File | null>(null)
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null)
  
  const [characterName, setCharacterName] = useState('')
  const [voiceType, setVoiceType] = useState<VoiceType>('male')
  const [personalityType, setPersonalityType] = useState<PersonalityType>('friendly')
  const [customPersonality, setCustomPersonality] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCustomImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isWalletConnected) {
      await connectWallet()
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/dashboard')
    }, 1500)
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const templates = [
    { id: 1, image: '/images/single-bot@2x.png', name: 'Blue Robot' },
    { id: 2, image: '/images/single-bot@2x.png', name: 'Green Robot' },
    { id: 3, image: '/images/single-bot@2x.png', name: 'Pink Robot' },
    { id: 4, image: '/images/single-bot@2x.png', name: 'Yellow Robot' },
    { id: 5, image: '/images/single-bot@2x.png', name: 'Purple Robot' },
    { id: 6, image: '/images/single-bot@2x.png', name: 'Orange Robot' }
  ]

  return (
    <section className="bg-yellow bg-pattern pt-24 pb-20">
      <div className="container max-w-[800px] mx-auto px-4">
        <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-10 text-left">
          <h1 className="text-center mb-10">Create Your AI Character</h1>
          
          {!isWalletConnected ? (
            <div className="text-center">
              <p>Please connect your wallet to create your AI character.</p>
              <button onClick={connectWallet} className="primary-button mt-5">
                Connect Wallet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div>
                  <h3>Choose Character Type</h3>
                  <p>Select how you want to create your character.</p>
                  
                  <div className="flex gap-5 mb-8">
                    <div 
                      onClick={() => setCharacterType('vtuber')}
                      className={`flex-1 p-5 border-3 rounded-xl text-center cursor-pointer ${characterType === 'vtuber' ? 'border-primary' : 'border-gray-300'}`}
                    >
                      <img 
                        src="/images/single-bot@2x.png" 
                        alt="VTuber Template" 
                        className="w-24 h-24 mb-2 mx-auto" 
                      />
                      <h4>VTuber Template</h4>
                      <p className="text-sm">Choose from our pre-designed VTuber characters</p>
                    </div>
                    
                    <div 
                      onClick={() => setCharacterType('custom')}
                      className={`flex-1 p-5 border-3 rounded-xl text-center cursor-pointer ${characterType === 'custom' ? 'border-primary' : 'border-gray-300'}`}
                    >
                      <img 
                        src="/images/single-bot@2x.png" 
                        alt="Custom Image" 
                        className="w-24 h-24 mb-2 mx-auto" 
                      />
                      <h4>Custom Meme Image</h4>
                      <p className="text-sm">Upload your own meme image to be animated</p>
                    </div>
                  </div>
                  
                  {characterType === 'vtuber' && (
                    <div>
                      <h3>Select Template</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {templates.map(template => (
                          <div 
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`border-2 rounded-lg p-2 text-center cursor-pointer ${selectedTemplate === template.id ? 'border-primary' : 'border-gray-300'}`}
                          >
                            <img 
                              src={template.image} 
                              alt={template.name} 
                              className="w-full mb-2" 
                            />
                            <p className="m-0">{template.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {characterType === 'custom' && (
                    <div>
                      <h3>Upload Your Meme Image</h3>
                      <p>For best results, use a clear image with a single character and minimal background.</p>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center mb-5">
                        {customImagePreview ? (
                          <div>
                            <img 
                              src={customImagePreview} 
                              alt="Preview" 
                              className="max-w-[200px] max-h-[200px] mb-2 mx-auto" 
                            />
                            <p>{customImage?.name}</p>
                          </div>
                        ) : (
                          <div>
                            <p>Drag & drop your image here, or click to browse</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                              id="image-upload"
                            />
                            <label htmlFor="image-upload">
                              <button 
                                type="button" 
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="primary-button mt-2"
                              >
                                Upload Image
                              </button>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-8">
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="primary-button"
                      disabled={characterType === 'vtuber' ? !selectedTemplate : !customImage}
                    >
                      Next: Personality
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div>
                  <h3>Character Personality</h3>
                  <p>Define your character's name, voice, and personality traits.</p>
                  
                  <div className="mb-5">
                    <label htmlFor="characterName" className="block mb-2 font-bold">
                      Character Name*
                    </label>
                    <input
                      type="text"
                      id="characterName"
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                      required
                      className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                      placeholder="e.g. Pepe the Frog"
                    />
                  </div>
                  
                  <div className="mb-5">
                    <label className="block mb-2 font-bold">
                      Voice Type*
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['male', 'female', 'robot', 'custom'] as VoiceType[]).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setVoiceType(type)}
                          className={`py-2 px-5 rounded-full border-none cursor-pointer ${voiceType === type ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label className="block mb-2 font-bold">
                      Personality Type*
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['friendly', 'sarcastic', 'energetic', 'calm', 'informative', 'custom'] as PersonalityType[]).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPersonalityType(type)}
                          className={`py-2 px-5 rounded-full border-none cursor-pointer ${personalityType === type ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {personalityType === 'custom' && (
                    <div className="mb-5">
                      <label htmlFor="customPersonality" className="block mb-2 font-bold">
                        Custom Personality Description*
                      </label>
                      <textarea
                        id="customPersonality"
                        value={customPersonality}
                        onChange={(e) => setCustomPersonality(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-gray-300 text-base min-h-[100px] resize-y"
                        placeholder="Describe your character's personality traits, interests, and speaking style..."
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="primary-button bg-gray-300"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="primary-button"
                      disabled={isSubmitting || !characterName || (personalityType === 'custom' && !customPersonality)}
                    >
                      {isSubmitting ? 'Creating Character...' : 'Create AI Character'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default CharacterCreationPage