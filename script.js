function startGame(){

    let name = document.getElementById("studentName").value.trim();

    if(name==""){
        alert("لطفاً نام خود را وارد کنید.");
        return;
    }

    localStorage.setItem("student",name);

    window.location.href="questions.html";

}

const questions = [

{
question:"1- وظیفه رگ‌های گیاه چیست؟",
answers:[
"انتقال آب و مواد غذایی",
"تولید بذر",
"ساخت گل",
"جذب نور خورشید"
],
correct:0
},

{
question:"2- آب و مواد معدنی از کدام قسمت گیاه جذب می‌شود؟",
answers:[
"گل",
"ریشه",
"برگ",
"میوه"
],
correct:1
},

{
question:"3- گیاه برای ساخت غذای خود به چه چیزی نیاز دارد؟",
answers:[
"نور خورشید",
"شن",
"سنگ",
"باد"
],
correct:0
},

{
question:"4- کدام قسمت گیاه معمولاً وظیفه نگهداری دانه را دارد؟",
answers:[
"ریشه",
"ساقه",
"میوه",
"برگ"
],
correct:2
},

{
question:"5- کدام قسمت گیاه بیشتر عمل غذاسازی را انجام می‌دهد؟",
answers:[
"ریشه",
"برگ",
"گل",
"ساقه"
],
correct:1
},

{
type:"dropdown",
question:"6- جای خالی را کامل کنید.",
sentence:"گیاه آب و مواد معدنی را از طریق ________ جذب می‌کند.",
options:[
"ریشه",
"گل",
"برگ",
"میوه"
],
correct:"ریشه"
}

];


let currentQuestion=0;
let score=0;
let timeLeft = 300;   // ۵ دقیقه
let timer = null;

let rainInterval = null;
let rainTimeouts = [];
function loadQuestion(){

document.getElementById("questionNumber").innerHTML=
"سؤال "+(currentQuestion+1)+" از "+questions.length;
document.getElementById("currentQuestion").innerHTML=currentQuestion+1;

document.getElementById("totalQuestions").innerHTML=questions.length;
document.getElementById("question").innerHTML=
questions[currentQuestion].question;
// اگر سؤال کشویی بود
if(questions[currentQuestion].type=="dropdown"){

    showDropdownQuestion();

    return;

}
let buttons=document.getElementsByClassName("answer");

for(let i=0;i<4;i++){

buttons[i].innerHTML=questions[currentQuestion].answers[i];

buttons[i].style.background="#2196F3";

buttons[i].onclick=function(){

checkAnswer(i);


}

}

}

function checkAnswer(answer){

let buttons=document.getElementsByClassName("answer");

for(let i=0;i<4;i++){
buttons[i].disabled=true;
}

if(answer==questions[currentQuestion].correct){

buttons[answer].style.background="green";
score++;
document.getElementById("correctAnswers").innerHTML=score;
new Audio("success.mp3").play();

flowerRain();

}else{

buttons[answer].style.background="red";
buttons[questions[currentQuestion].correct].style.background="green";

new Audio("wrong.mp3").play();

}

document.getElementById("nextBtn").style.display="block";

}




function finishGame(){

localStorage.setItem("score",score);

window.location.href="result.html";

}
function showResult(){

let student = localStorage.getItem("student");
let score = Number(localStorage.getItem("score"));

let percent = (score / questions.length) * 100;

document.getElementById("studentName").innerHTML =
"👨‍🎓 دانش‌آموز: " + student;

document.getElementById("score").innerHTML =
"درصد پاسخ‌های صحیح: " + percent + "%";

// از اینجا پیام تشویقی شروع می‌شود
if(percent >= 75){

document.getElementById("message").innerHTML =
"🌟 خیلی خوب! آفرین، عملکرد فوق‌العاده‌ای داشتی.";

}else if(percent >= 50){

document.getElementById("message").innerHTML =
"👏 خوب! تلاش خوبی کردی، با کمی تمرین بهتر هم می‌شوی.";

}else if(percent >= 25){

document.getElementById("message").innerHTML =
"🙂 قابل قبول. با تمرین بیشتر می‌توانی نتیجه بهتری بگیری.";

}else{

document.getElementById("message").innerHTML =
"💪 نیاز به تلاش بیشتر داری. مطمئنم با تمرین موفق می‌شوی.";

}

}
function flowerRain(){

    const items=["🌸","🌼","🌺","🍀","⭐"];

    let count=0;

    clearInterval(rainInterval);

    rainInterval = setInterval(function(){

        let flower=document.createElement("div");

        flower.className="flower";

        flower.innerHTML=items[Math.floor(Math.random()*items.length)];

        flower.style.left=Math.random()*100+"vw";

        flower.style.fontSize=(20+Math.random()*30)+"px";

        flower.style.animationDuration=(2+Math.random()*2)+"s";

        document.body.appendChild(flower);

        setTimeout(function(){
            flower.remove();
        },5000);

        count++;

        if(count>=200){   // قبلاً 80 بود
            clearInterval(rainInterval);
        }

    },50);   // قبلاً 300 بود
}


function stopFlowerRain(){

    clearInterval(rainInterval);

    rainTimeouts.forEach(t => clearTimeout(t));
    rainTimeouts = [];

    document.querySelectorAll(".flower").forEach(f => f.remove());
}
function nextQuestion(){

    stopFlowerRain();

    let buttons=document.getElementsByClassName("answer");

    for(let i=0;i<4;i++){
        buttons[i].style.background="#2196F3";
        buttons[i].disabled=false;
    }

    document.getElementById("nextBtn").style.display="none";

    currentQuestion++;

    if(currentQuestion < questions.length){
        loadQuestion();
    }else{
        finishGame();
    }
}

function startTimer(){

    if(timer) return;

    timer = setInterval(function(){

        let min = Math.floor(timeLeft/60);
        let sec = timeLeft%60;

        document.getElementById("timer").innerHTML =
        `${min}:${sec.toString().padStart(2,'0')}`;

        if(timeLeft <= 0){
            clearInterval(timer);
            finishGame();
        }

        timeLeft--;

    },1000);

}
function showDropdownQuestion(){

    document.querySelector(".answers").style.display="none";

    document.getElementById("question").innerHTML=`

    <h2>${questions[currentQuestion].question}</h2>

    <br>

    <div style="font-size:28px;line-height:60px">

    گیاه آب و مواد معدنی را از طریق

    <select id="dropAnswer" style="font-size:24px;padding:8px">

        <option value="">انتخاب کنید</option>

        ${questions[currentQuestion].options.map(function(item){

            return `<option>${item}</option>`;

        }).join("")}

    </select>

    جذب می‌کند.

    </div>

    <br><br>

    <button onclick="checkDropdownAnswer()">

    ثبت پاسخ

    </button>

    `;

}
function checkDropdownAnswer(){

    let value=document.getElementById("dropAnswer").value;

    if(value==""){

        alert("ابتدا یک گزینه انتخاب کنید.");

        return;

    }

    if(value==questions[currentQuestion].correct){

        score++;

        document.getElementById("correctAnswers").innerHTML=score;

        flowerRain();

        new Audio("success.mp3").play();

    }else{

        new Audio("wrong.mp3").play();

        alert("پاسخ صحیح: "+questions[currentQuestion].correct);

    }

    document.getElementById("nextBtn").style.display="block";

}      
