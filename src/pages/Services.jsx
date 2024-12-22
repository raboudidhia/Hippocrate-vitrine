
import NosTarifs from "../components/NosTarifs";
import CarouselSection from "../components/CarouselSection";
import NosSalles from "../components/NosSalles";
import { Buvette } from "../components/Buvette";

export const Services = () => {
  return (
    <div>
      <CarouselSection />
      <NosTarifs />
      <NosSalles />
      <Buvette />
    </div>
  )
}
export default Services;