const startbutton=document.getElementById('start-btn')
const nextbutton=document.getElementById('next-btn')
const questionContainer_element=document.getElementById('question-container')
const question_element=document.getElementById('question')
const answer_element=document.getElementById('answer-buttons')
let audio_on=document.querySelector('#audio1')
let audio_off=document.querySelector('#audio2')
let shuffledQuestion,currentQuestionIndex;
let count=0;
startbutton.addEventListener('click',startgame)
nextbutton.addEventListener('click',()=>{
    currentQuestionIndex++
    stopaudio();
    setNextQuestion()
})
function startgame(){
    startbutton.classList.add('hide');
    nextbutton.classList.add('hide');
    questionContainer_element.classList.remove('hide')
  shuffledQuestion=questions.sort(()=>Math.random() - .5)
  count=0
  currentQuestionIndex=0
  
   
  setNextQuestion()

}
function  setNextQuestion(){
    resetstate()
    if(currentQuestionIndex<shuffledQuestion.length){
  showQuestion( shuffledQuestion[ currentQuestionIndex])
    }
  else{
    endgame();
  }
}
// is show only question 
function showQuestion(question){
    question_element.innerText=question.question;
    question.answers.forEach(answer=> {
        const button=document.createElement('button');
        button.innerText=answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
     button.addEventListener('click',selectanswer)
     answer_element.appendChild(button)

    })
}
// it reset the window 
function resetstate(){
    clear_status_class(document.body)
    nextbutton.classList.add('hide')
    while(answer_element.firstChild){
        answer_element.removeChild(answer_element.firstChild)
    }
}
// it provide option 
function selectanswer(e){
const selected_button=e.target;
const correct=selected_button.dataset.correct
if(correct){
    count++;
    audio_on.play();
}
else{
    audio_off.play()
}
set_status_class(document.body,correct)

Array.from(answer_element.children).forEach(element => {
    set_status_class(element,element.dataset.correct)
})
// last element mai next ka option remove kar de .
if(shuffledQuestion.length-1 > currentQuestionIndex){
  
    nextbutton.classList.remove('hide')
}
else{
   
  //  openNewpage();
   nextbutton.innerText='Finish'
  nextbutton.classList.remove('hide')
  
  
}


//
 }
// it set status.
function set_status_class(element,correct){
    clear_status_class(element)
    if(correct){
       
        element.classList.add('correct')
       
    }
    else{
       
        element.classList.add('wrong')
       
    }
}

function clear_status_class(element){
   
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
function restartgame(){
    startbutton.removeEventListener('click',restartgame);
    nextbutton.innerText='Next';
    nextbutton.classList.add('hide');
    questionContainer_element.classList.remove('hide')
    shuffledQuestion=questions.sort(()=>Math.random() - .5)
    count=0
    currentQuestionIndex=0
    setNextQuestion()
  

}
function endgame(){
    printcount();
    const endTestButton = document.createElement('button');
    endTestButton.innerText = 'End Test';
    endTestButton.addEventListener('click', redirectToHomePage);
    question_element.appendChild(endTestButton);
}
function printcount(){
    const result_per=(count/questions.length)*100;
    const message_res=`you have ${count} out of ${questions.length}. (${result_per}%correct) `;
    const resulltElement=document.createElement('div')
    resulltElement.innerText=message_res
    question_element.innerText='';
    question_element.appendChild(resulltElement);
   
// questionContainer_element.appendChild(resulltElement);
}
// function openNewpage(){
//     const resultPercentage = (count / questions.length) * 100;
//     const resultMessage = `You scored ${count} out of ${questions.length}. (${resultPercentage}% correct)`;
  
//     const newPageContent = `
//       <html>
//         <head>
        
//           <title>Quiz Score</title>
//           <link rel="stylesheet" href="style.css" >
//         </head>
//         <body>
        
//           <h3 style="">Quiz Score</h3>
//           <div>${resultMessage}</div>
//         </body>
//       </html>
//     `;
  
//     const newWindow = window.open('', '_blank');
//     newWindow.document.open();
//     newWindow.document.write(newPageContent);
//     startbutton.addEventListener('click',startgame)
//     newWindow.document.close();
// }
function stopaudio(){
    audio_on.pause();
    audio_on.currentTime=0;
    audio_off.pause();
    audio_off.currentTime=0;

}
function redirectToHomePage() {
    window.location.href = 'index.html'; // Replace 'index.html' with the URL of your original page
  }
const questions=[
    {
        question:'Who is the present Prime Minister of India ?',
        answers:[
          {  text:'Nirav Modi',correct:false},
          {text:'Lalit Modi',correct:false},
          {text:'Narendra Modi',correct:true},
          {text:'Krishna Modi',correct:false}
        ]
    },
    {
        question:'Who painted the Mona Lisa ? ',
        answers:[
            
                {text:'Leonardo da Vinci' ,correct:false},
                {text:'Rahul kumawat',correct:true},
                {text:'Kishan Modi',correct:false},
                {text:'Booby deol',correct:false}
        ]
    },
    {
        question:'Who is the best You tuber ?',
        answers:[
{text:'Dhruv Rathee',correct:false},
{text:'BBVinnes',correct:false},
{text:'R2h ',correct:true},
{text:'Carry',correct:false}
        ]
    },{
        question:'Which country is famous for the Taj Mahal ?',
        answers:[
            {text:"India", correct: true},
            {text:"Egypt", correct: false},
            {text:"China", correct: false},
            {text:"Italy", correct: false}
        ]

    }
]