
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const [image,setImage]=useState(null)
  const webCamRef=useRef(null)
  const [deviceId, setDeviceId]=useState({})
  const [devices, setDevices]=useState([])
  const handleDevices = useCallback((mediaDevices) => {
      setDevices(mediaDevices.filter(({kind})=> kind==="videoinput"))
  }
  ,[setDevices])
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])
  
  
  const takePicture = useCallback(() => {
      const imageSrc=webCamRef.current.getScreenshot()
      setImage(imageSrc)
  },[webCamRef])
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };
  return (
    <div className="App">
      <section className="section">
                <div className="sectionContainer ">
                        <div className="sectionContent">
                            {
                                devices.map((device,key)=>
                                
                                {
                                  console.log("device",device)
                                  return(
                                  (
                                    <div key={key} className='cameraItem'>
                                        <Webcam
                                        ref={webCamRef}
                                        screenshotFormat="image/jpeg"
                                        audio={false}
                                       videoConstraints = {videoConstraints}
                                        />
                                        {"device "+device.label || 'device '+key + 1}
                                    </div>
                                )
                                )}
                                )
                            }
                         <div 
                        onClick={takePicture}
                         className="cursor-pointer webCamCaptureBtn translate-x-[-50%] left-[50%] bottom-[10px] w-[40px] h-[40px] border-2 border-[black] rounded-full absolute ">
                        </div>
                        </div>
                        <img className='w-[350px] h-[200px] object-cover' src={image} alt="" />
                </div>
            </section>
    </div>
  );
}

export default App;
