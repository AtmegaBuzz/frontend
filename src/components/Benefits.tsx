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
    <section className="bg-yellow py-20">
      <div className="container max-w-[1200px] mx-auto px-4">
        <h2 className="text-center mb-16">Why Choose ShillTube?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="h-full p-8 flex flex-col items-start text-left border-4 rounded-lg bg-white border-black">
              <div className="text-5xl mb-5">{feature.icon}</div>
              <h3 className="mb-4 self-start">{feature.title}</h3>
              <p className="flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits