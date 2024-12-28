import React, { useCallback, useEffect, useState } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { WebcamStream } from './components/WebcamStream';
import { StressGauge } from './components/StressGauge';
import { analyzeFacialFeatures, calculateStressLevel } from './utils/stressDetection';
import { useStressStore } from './store/useStressStore';
import { Brain } from 'lucide-react';

function App() {
  const [model, setModel] = useState<any>(null);
  const { currentStress, setCurrentStress, addToHistory } = useStressStore();
  
  useEffect(() => {
    async function loadModel() {
      const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      setModel(model);
    }
    loadModel();
  }, []);

  const handleStream = useCallback(async (stream: MediaStream) => {
    if (!model) return;

    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const detectFace = async () => {
      const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
        predictIrises: true
      });

      if (predictions.length > 0) {
        const features = analyzeFacialFeatures(predictions[0]);
        const stress = calculateStressLevel(features);
        setCurrentStress(stress);
        addToHistory(stress);
      }

      requestAnimationFrame(detectFace);
    };

    detectFace();
  }, [model, setCurrentStress, addToHistory]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Stress Detection AI</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <WebcamStream onStream={handleStream} />
            <StressGauge stressLevel={currentStress} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            {currentStress && (
              <div className="space-y-4">
                {currentStress.level === 'high' && (
                  <>
                    <p className="text-red-600 font-medium">Your stress level is high. Consider:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Take deep breaths for 2 minutes</li>
                      <li>Step away from your workspace</li>
                      <li>Do some light stretching</li>
                    </ul>
                  </>
                )}
                {currentStress.level === 'medium' && (
                  <>
                    <p className="text-yellow-600 font-medium">Your stress level is moderate. Try:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Take a short break</li>
                      <li>Drink some water</li>
                      <li>Do a quick mindfulness exercise</li>
                    </ul>
                  </>
                )}
                {currentStress.level === 'low' && (
                  <>
                    <p className="text-green-600 font-medium">Your stress level is low. Keep it up!</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Maintain your current routine</li>
                      <li>Stay hydrated</li>
                      <li>Take regular breaks</li>
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
