import { useEffect, useState, useRef } from 'react'

import './App.css'

export default function App() {
  const [numScreens, setNumScreens] = useState(0)

  const initStreams = () => {
      requestScreens()
  }

  const requestScreens = async () => {
    const { mediaDevices } = navigator
    const stream = await mediaDevices.getDisplayMedia()

    const mediaStream = new MediaStream(stream)

    mediaStream.oninactive = (e) => {
      document.getElementById(e.target.id).remove()
      setNumScreens(document.getElementsByTagName('video').length)
    } 

    updateEl(mediaStream)
    setNumScreens(numScreens + 1)
  }

  const updateEl = (mediaStream) => {
    const videoEl = document.createElement('video')

    videoEl.setAttribute('id', mediaStream.id)
    videoEl.setAttribute('autoplay', true)
    videoEl.style.height = '100vh'
    videoEl.srcObject = mediaStream
    
    document.getElementById('screens').appendChild(videoEl)
  }

  return (
    <div id="screens" className='screens'>
      <button onClick={() => initStreams()}>{!numScreens ? `Share screen` : `Add screen`}</button>
    </div>
  )
}
