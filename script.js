const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton')

// check if webcam access is supported
function getUserMediaSupported(){
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// if webcam supported add event listener
if(getUserMediaSupported()){
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Placeholder function for next step
function enableCam(event){

}

// enable live view
function enableCam(event){
    // only continue if model has finished loading
    if(!model){
        return;
    }

    // Hide button once clicked
    event.target.classList.add('removed');

    //getUsermediaParameters
    const constraints ={
        video: true
    };

    // activate webcam stream
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        video.srcObject = stream;
        video.addEventListener('loadedata', predictWebcam);
    });
}


//placehodler function
function predictWebcam(){

}

//pretend model has loaded
var model = true;
demosSection.classList.remove('invisible');
