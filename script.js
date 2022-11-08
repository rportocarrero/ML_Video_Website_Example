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

// Store model
var model = undefined;

cocoSsd.load().then(function(loadedModel){
    model = loadedModel
    // show model is ready to use
    demosSection.classList.remove('invisible');
})

var children = []

function predictWebcam(){
    // classify frame in stream
    model.detect(video).then(function(predictions){
        // remove hilighting
        for (let i=0; i< children.length; i++){
            liveView.removeChild(children[1]);
        }
        children.splice(0);

        //loop through predictions
        for(let n = 0; n < predictions.length; n++){
            if(predictions[n].score > 0.66){
                const p = document.createElement('p');
                p.innerText = predictions[n].class + ' - with '
                    + Math.round(parseFloat(predictions[n].score) * 100)
                    + '% confidence.';
                p.style = 'margin-left' + predictions[n].bbox[0] + 'px; margin-top: '
                    + (predictions[n].bbox[1] - 10) + 'px; width: '
                    + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
                
                    const highlighter = document.createElement('div');
                    highlighter.setAttribute('class', 'hilighter');
                    highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px: top: '
                        + predictions[n].bbox[1] + 'px; width: '
                        + preditcions[n].bbox[2] + 'px; height: '
                        + predictions[n].bbox[3] + 'px;';

                    liveView.appendChild(highlighter);
                    liveView.appendChild(p);
                    children.push(highlighter);
                    children.push(p);
            }
    }
    
    //keep prediction
    window.requestAnimationFrame(preductWebcam)
});
}