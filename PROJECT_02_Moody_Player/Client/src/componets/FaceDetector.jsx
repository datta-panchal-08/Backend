import React, { useRef, useEffect } from "react";
import axios from 'axios';
import * as faceapi from "face-api.js";
import "./FaceDetector.css";
import { useState } from "react";

export default function FaceDetector({setSongs}) {
  const videoRef = useRef(null);
  const [currentMood,setCurrentMood] = useState(null);
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

  // Detect mood only once when button is clicked
  const detectMoodOnce = async () => {
    const video = videoRef.current;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
      let mood = undefined;
    if (detections.length > 0) {
      const detection = detections[0]; // Sirf pehle face ka mood
      const expressions = detection.expressions;
      let mood = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      console.log("Mood detected:", mood);
      setCurrentMood(mood);
      axios.get(`http://localhost:3000/songs?mood=${mood}`)
      .then((res)=>{
         setSongs(res?.data?.songs);         
      });
    } else {
      console.log("No face detected",mood);
      setCurrentMood(mood);
    }
  };

  return (
    <div className="mood-element">
      <div className="content">
        <video ref={videoRef} autoPlay muted className="user-video-feed" />
        {
          currentMood !== undefined ? <h3>currentMood : {currentMood}</h3> : <small>no face detected</small> 
        }
      </div>
      <button onClick={detectMoodOnce}>Detect Mood</button>
    </div>
  );
}
