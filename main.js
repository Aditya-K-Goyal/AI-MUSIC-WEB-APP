song_1 ="";
song_2 ="";
peterpan_song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWristY =0;
function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length >0){
        console.log(results);
        scoreLeftWristY = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " , leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristX = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " , rightWristY = " + rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    stroke("#ff2455");
    fill("#ff2455");
    peterpan_song = song_1.isPlaying();
    console.log(peterpan_song);
    if(scoreLeftWristY > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if(peterpan_song == false){
            song_1.play();
        }
        else{
            document.getElementById("song_name").innerHTML ="Song Name :Peter Pan Song";
        }
    }
}
function modelLoaded()
{
    console.log("PoseNet is on");
}