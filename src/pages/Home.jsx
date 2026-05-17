import HeroScrollSequence from '../components/HeroScrollSequence'
import StrangerThingsPopup from '../components/StrangerThingsPopup'

export default function Home() {
  return (
    <div className="bg-black min-h-screen selection:bg-red-900 selection:text-white text-white">
      <HeroScrollSequence />
      <StrangerThingsPopup />
    </div>
  )
}
