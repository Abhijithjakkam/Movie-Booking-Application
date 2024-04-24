const camera = (function () {
  let width = 1080;
  let height = 720;

  const video = document.createElement("video");
  video.id = "video";
  video.width = width;
  video.height = height; // Fix: Use height property for video
  video.autoplay = true;
  document.body.append(video);
  //   parentVideo.appendChild(video);
  //   const parentVideo = document.getElementById("camera");
  //   parentVideo.appendChild(video);

  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = width;
  canvas.height = height; // Fix: Use height property for canvas
  document.body.appendChild(canvas);

  return {
    video: null,
    context: null,
    canvas: null,

    startCamera: function (w = 1080, h = 720) {
      //   const camera = document.getElementById(camera);
      //   console.log(document.getElementById("root"));
      //   document.getElementById("camera").appendChild(video);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        width = w;
        height = h;

        this.video = document.getElementById("video");
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        (function (video) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
              video.srcObject = stream;
              video.play();
            });
        })(this.video);
      }
    },

    takeSnapshot: function () {
      this.context.drawImage(this.video, 0, 0, width, height);
    },
  };
})();

export default camera;
