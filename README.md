# Stress-Detection-Ai
# AI Stress Detection App

Real-time stress level detection using facial recognition and TensorFlow.js.

## Features

- 🎥 Real-time webcam facial analysis
- 🧠 AI-powered stress detection
- 📊 Live stress level visualization
- 💡 Personalized recommendations
- 📱 Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- TensorFlow.js
- Face Landmarks Detection
- Tailwind CSS
- Zustand for state management

## Prerequisites

- Node.js 18 or higher
- Modern web browser with webcam support
- Webcam/camera device

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd stress-detection-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How It Works

The application uses TensorFlow.js and the Face Landmarks Detection model to analyze facial features in real-time through your webcam. It processes various facial indicators such as:

- Eye openness
- Mouth tension
- Brow furrow

These metrics are combined to calculate a stress level score, which is then categorized as low, medium, or high. Based on your stress level, the app provides real-time recommendations for stress management.

## Privacy

- All processing is done locally in your browser
- No video data is stored or transmitted
- No personal information is collected

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.
