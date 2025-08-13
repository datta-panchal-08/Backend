import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./FaceDetector.css";

export default function FaceDetector() {
  const videoRef = useRef(null);

  // Load models on mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startCamera();
    };
    loadModels();
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  // Detect faces automatically when video starts playing
  const detectFaces = () => {
    const video = videoRef.current;
    const size = { width: video.videoWidth, height: video.videoHeight };

    const canvas = faceapi.createCanvasFromMedia(video);
    canvas.style.width = video.offsetWidth + "px";
    canvas.style.height = video.offsetHeight + "px";

    // ✅ Overlay ke liye parent div me append karo, neeche add mat karo
    video.parentNode.appendChild(canvas);

    faceapi.matchDimensions(canvas, size);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const resized = faceapi.resizeResults(detections, size);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);
    }, 200);
  };


  return (
    <div className="mood-element">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="user-video-feed"
      />
      <button onClick={detectFaces}>Detect Mood</button>
    </div>
  );
}
