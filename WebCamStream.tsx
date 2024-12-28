import React, { useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

interface Props {
  onStream: (stream: MediaStream) => void;
}

export function WebcamStream({ onStream }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        onStream(stream);
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }

    setupCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onStream]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      {!videoRef.current?.srcObject && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="w-8 h-8 text-gray-400 animate-pulse" />
        </div>
      )}
    </div>
  );
}
