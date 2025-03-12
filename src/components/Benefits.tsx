const Benefits = () => {
  const features = [
    {
      title: 'Enhanced Visibility',
      description: 'Get premium listing options with customizable project information and a dedicated space in the ShillTube ecosystem.',
      icon: '🔍'
    },
    {
      title: 'Automated Social Media',
      description: 'One-click creation of dedicated social accounts with automated content generation and cross-platform management.',
      icon: '📱'
    },
    {
      title: 'AI-Powered Characters',
      description: 'Transform static meme images into dynamic video clips with customizable expressions and personality traits.',
      icon: '🤖'
    },
    {
      title: '24/7 Live Entertainment',
      description: 'Continuous AI-driven streaming with real-time interaction and natural voice generation via 11Labs integration.',
      icon: '🎬'
    },
    {
      title: 'Interactive Community',
      description: 'Engage your audience with live lucky draws, market event-triggered activities, and automated reward distribution.',
      icon: '🎁'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track engagement metrics, viewer demographics, and participation rates to optimize your community strategy.',
      icon: '📊'
    }
  ]

  return (
    <section className="bg-yellow py-12 sm:py-16 md:py-20">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16">
          Why Choose ShillTube?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="h-full flex flex-col items-start text-left bg-white border-4 border-black rounded-lg 
                transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[-8px_8px_0_0_#1f2024]
                p-4 sm:p-6 md:p-8"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 md:mb-5 transition-transform duration-300 hover:scale-110 cursor-default">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 self-start">
                {feature.title}
              </h3>
              <p className="flex-1 text-sm sm:text-base text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits