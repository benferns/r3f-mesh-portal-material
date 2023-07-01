import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { XRButton } from '@react-three/xr';
function App() {
  return (
    <>
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
  >
    {/* Can accept regular DOM children and has an optional callback with the XR button status (unsupported, exited, entered) */}
    {(status) => `WebXR ${status}`}
  </XRButton>
  
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Experience />      
    </Canvas>
    </>
  );
}

export default App;
