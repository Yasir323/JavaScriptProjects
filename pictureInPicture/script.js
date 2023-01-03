const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play\
async function selectMediaStream() {
  try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia();
      videoElement.srcObject = mediaStream;
      videoElement.onloadedmetadata = () => {
        videoElement.onplay();
      }
  } catch (error) {

  };
};

button.addEventListener('click', async () => {
  // Disable the button
  button.disabled = true;
  // Start pip
  await videoElement.requestPictureInPicture();
  // Reset the button
  button.disbaled = false;
});

// On load
selectMediaStream();
