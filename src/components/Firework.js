import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // Required to load the full engine
import FireworkConfig from "./firework_config/Firework_config";

const Firework = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine); // Load all tsparticles functionality
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={FireworkConfig} // Use 'options' instead of 'params'
    />
  );
};

export default Firework;
