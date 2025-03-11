import { useEffect, useState } from 'react'

interface YourStuffPageProps {
  isWalletConnected: boolean
}

interface RobotoNFT {
  id: number
  name: string
  image: string
}

const YourStuffPage = ({ isWalletConnected }: YourStuffPageProps) => {
  const [userRobotos, setUserRobotos] = useState<RobotoNFT[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserRobotos = async () => {
      setIsLoading(true)
      
      // In a real implementation, you would fetch the user's Robotos from the contract
      // For demonstration, we'll use mock data
      if (isWalletConnected) {
        // Mock data - in a real app, you would fetch this from the blockchain
        const mockRobotos = [
          { id: 1, name: 'Roboto #1234', image: '/images/single-bot@2x.png' },
          { id: 2, name: 'Roboto #2345', image: '/images/single-bot@2x.png' },
          { id: 3, name: 'Roboto #3456', image: '/images/single-bot@2x.png' },
          { id: 4, name: 'Roboto #4567', image: '/images/single-bot@2x.png' },
        ]
        setUserRobotos(mockRobotos)
      } else {
        setUserRobotos([])
      }
      
      setIsLoading(false)
    }

    fetchUserRobotos()
  }, [isWalletConnected])

  return (
    <section className="mint-section" style={{ minHeight: '100vh' }}>
      <div className="yourstuff-container">
        <h2>Your Robotos</h2>
        
        {!isWalletConnected ? (
          <div>
            <p>Please connect your wallet to view your Robotos</p>
          </div>
        ) : isLoading ? (
          <div>
            <p>Loading your Robotos...</p>
          </div>
        ) : userRobotos.length === 0 ? (
          <div>
            <p>You don't own any Robotos yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', width: '100%' }}>
            {userRobotos.map((roboto) => (
              <div key={roboto.id} className="your-roboto-card">
                <div className="your-roboto-image">
                  <img src={roboto.image} alt={roboto.name} className="your-roboto-card-image" />
                </div>
                <h3 className="your-roboto-name">{roboto.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default YourStuffPage