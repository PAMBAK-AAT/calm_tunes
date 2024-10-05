
            /// Initialize the variables
let songIndex = 0
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('hamdBar');
let gif = document.getElementById('gif');
let hamdItems = Array.from(document.getElementsByClassName('hamdItem'));
let masterSongName = document.getElementById('masterSongName');

let hamd = [
    {hamdName: "Likha hai Eik Zaifaa thii ..." , filePath: "1.mp3" , coverPath: "nature5.jpg"},
    {hamdName: "Wo Jab Mushkurate toh sab mushkurate..." , filePath: "Nabipaak.mp3" , coverPath: "nature6.jpg"},
    {hamdName: "Maine Tujhe jaana hai Faqat teri ata se ." , filePath: "AllamaIqbaal.mp3" , coverPath: "nightNature2.jpg"},
    {hamdName: "Zakham Jo dil ne khaye hain ..." , filePath: "ZakhmaDil.mp3" , coverPath: "nature7.jpg"},
    {hamdName: "Har Eik Janib Udasii hai ..." , filePath: "Udasiihai.mp3" , coverPath: "nightNature.jpg"},
]

hamdItems.forEach((ele,i)=>{
    console.log(ele,i);
    ele.getElementsByTagName("img")[0].src = hamd[i].coverPath;
    ele.getElementsByClassName("songName")[0].innerText = hamd[i].hamdName;
})
/// Handle play , pause / click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
})

            /// Listen to events

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');

    // Update our seekBar
    // here we calculate the percentage of hamd that is run out and we set it's value in progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value)*(audioElement.duration)/100;
    // Because ((audioElement.currentTime/audioElement.duration)*100) = %;
    // so , audioElement.currentTime = %*audioElement.duration / 100;
})

/// Now we add event listener on the button that displays on the screen

const makeAllPlays = ()=>{// This function makes play to our all classes of "hamdItemPlay" 
    Array.from(document.getElementsByClassName("hamdItemPlay")).forEach( (element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}
Array.from(document.getElementsByClassName("hamdItemPlay")).forEach( (element)=>{
    element.addEventListener('click',(ele)=>{
        // console.log(ele.target);
        makeAllPlays();
        songIndex = parseInt(ele.target.id);
        ele.target.classList.remove("fa-play-circle");
        ele.target.classList.add("fa-pause-circle");
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = hamd[songIndex].hamdName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById("next").addEventListener('click' , ()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    // audioElement.src = `${songIndex+1}.mp3`;
    audioElement.src = hamd[songIndex].filePath;
    masterSongName.innerText = hamd[songIndex].hamdName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById("previous").addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = hamd[songIndex].hamdName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

})

