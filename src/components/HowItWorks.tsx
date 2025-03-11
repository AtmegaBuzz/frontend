const HowItWorks = () => {
  const steps = [
    {
      title: 'List Your Token',
      description: 'Submit your memecoin information similar to how you would on Dexscreener, including contract address, token details, and social links.',
      icon: '/images/Body.svg'
    },
    {
      title: 'Create Your Character',
      description: 'Choose from VTuber-style templates or upload your own meme images. Our system will animate them and bring your token to life!',
      icon: '/images/Gradient Shades.svg'
    },
    {
      title: 'Customize AI Personality',
      description: 'Define your character\'s voice, personality traits, and interaction style based on your meme\'s origin story and brand.',
      icon: '/images/light.svg'
    },
    {
      title: 'Go Live 24/7',
      description: 'Launch your memecoin\'s automated live stream that engages with viewers, hosts events, and builds community around the clock.',
      icon: '/images/Helmet.svg'
    }
  ]

  return (
    <section className="bg-blue-dark py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-white rounded-2xl p-10">
          <h2 className="text-center mb-10">How ShillTube Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-5 w-20 h-20 flex items-center justify-center"> 
                  <img src={step.icon} alt={step.title} className="max-w-full max-h-full" />
                </div>
                <h3 className="mb-4">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks