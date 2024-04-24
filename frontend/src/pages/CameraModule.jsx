import { Button, Modal } from "hyperverge-sde-ui-library";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeModalState, setProfileImage } from "../feature/utilsSlice";
const CameraModule = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(0);
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [openCamera, setOpenCamera] = useState(true);
  const defaultImg = localStorage.getItem("profilePic");
  console.log(typeof defaultImg, "defaultImg");
  const modalState = useSelector((state) => state.utils.openModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.log("An error occurred! " + err);
      }
    };

    initCamera();
  }, [width, modalState]);

  const handleCanPlay = () => {
    if (!streaming && videoRef.current) {
      setHeight(
        videoRef.current.videoHeight / (videoRef.current.videoWidth / width)
      );
      videoRef.current.setAttribute("width", width);
      videoRef.current.setAttribute("height", height); // Fix: Set height directly
      canvasRef.current.setAttribute("width", width);
      canvasRef.current.setAttribute("height", height);

      setStreaming(true);
    }
  };

  const handleStartButtonClick = (ev) => {
    takePicture();
    ev.preventDefault();
    // setOpenCamera(true);
  };

  const clearPhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Fix: Clear canvas
    setOpenCamera(true);
    // handleCanPlay();
  };

  const takePicture = () => {
    const context = canvasRef.current.getContext("2d");
    if (width && height) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);

      const dataURL = canvasRef.current.toDataURL("image/jpeg", 0.95);
      if (dataURL && dataURL !== "data:,") {
        const fileName = generateImageName();
        uploadImage(dataURL, fileName);
      } else {
        alert("Image not available");
      }
      setOpenCamera(false);
    } else {
      clearPhoto();
    }
  };

  const generateImageName = () => {
    // ... generate image name logic here ...
    return "generatedImageName.jpg";
  };

  const uploadImage = (dataURL, filename) => {
    // ... upload logic here ...
    dispatch(setProfileImage(dataURL));
    localStorage.setItem("profilePic", dataURL);
    console.log("Uploading image:", filename);
  };
  return (
    <Modal
      visible={modalState}
      onClose={() => dispatch(changeModalState())}
      className="z-[1000] p-10 md:p-0"
    >
      <div className="p-5 w-full    flex flex-col item-center gap-[5rem] ">
        <div className="w-full ">
          <h1 className="font-primary  text-textColor-primary font-semibold text-2xl">
            Capture new profile picture
          </h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-[2rem]">
          <video
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay
            playsInline
            muted
            
            className={`${openCamera ? "flex" : "hidden"} rounded-button`}
          />

          <canvas
            ref={canvasRef}
            h="0"
            className={`${
              openCamera ? "hidden" : "flex"
            } w-full md:w-[400px]  rounded-button`}
          />
          <div className=" flex flex-row justify-center gap-6">
            <Button onClick={handleStartButtonClick}>Take Picture</Button>
            <Button isSolid={true} onClick={clearPhoto}>
              Retake Picture
            </Button>
          </div>
        </div>
        {/* <img src={defaultImg} className="h-[100] w-[100]" /> */}
      </div>
    </Modal>
  );
};

export default CameraModule;
