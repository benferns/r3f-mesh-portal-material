import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { XRButton } from '@react-three/xr';
function App() {
  return (
    <>
   
  
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Experience />      
    </Canvas>
    <XRButton
    /* The type of `XRSession` to create */
    mode={'AR'}
    /**
     * `XRSession` configuration options
     * @see https://immersive-web.github.io/webxr/#feature-dependencies
     */
    sessionInit={{ requiredFeatures: ['local'], optionalFeatures: ['local', 'dom-overlay'] }}
    /** Whether this button should only enter an `XRSession`. Default is `false` */
    enterOnly={false}
    /** Whether this button should only exit an `XRSession`. Default is `false` */
    exitOnly={false}
    style={{ position: 'absolute', left: '50%', bottom: '50px', transform: 'translate(-50%, 0)', padding: '1rem', paddingLeft: '2rem',paddingRight:'2rem', borderRadius: '0.4rem', backgroundColor: '#000000', color: '#FFFFFF' }}
  >
Launch AR  
  </XRButton>
    </>
  );
}

export default App;
