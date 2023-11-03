


var url = "quizQnList.json"
              
                axios.get(url
                )
                .then(response =>  {
                    console.log(response.data)
                    
                    //gets array of questions from pool of array of qns
                    var q1=response.data.questionArrays
                    var randomQuiz = Math.floor(Math.random() * q1.length);
                    console.log(randomQuiz)
                   var questions=q1[randomQuiz]
                   console.log(questions)

                    // start quiz

                    const questionElement = document.getElementById("question");
                    const answerChoices = document.getElementById("answer-choices");
                    const nextBtn = document.getElementById("next-btn");

                    let currentQuestionIndex = 0;
                    var answerscore =0;

                    function startQuiz(){
                        currentQuestionIndex = 0;
                        nextBtn.innerHTML = "Next";
                        showQuestion();
                    }

                    function showQuestion(){
                        resetState();
                        let currentQuestion = questions[currentQuestionIndex];
                        let questionNo = currentQuestionIndex+1;
                        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

                        currentQuestion.answers.forEach(answer => {
                            const button = document.createElement("button");
                            button.setAttribute("value",answer.count)
                            button.innerHTML = answer.text;
                            button.classList.add("choice");
                            answerChoices.appendChild(button);
                            if(answer.correct){
                                button.dataset.correct = answer.correct;
                            }
                            button.addEventListener("click", selectAnswer);
                        });
                        

                    }

                    function resetState(){
                        nextBtn.style.display = "none";
                        while(answerChoices.firstChild){
                            answerChoices.removeChild(answerChoices.firstChild);
                        }
                    }

                    let selectedAnswer = null;
                    function selectAnswer(e){
                        const selectedBtn = e.target;
                        console.log(selectedBtn)
                        // const isCorrect = selectedBtn.dataset.correct === "true";

                        // console.log(selectedBtn);
                        if (selectedAnswer !== null) {
                            selectedAnswer.classList.remove("correct");
                        }
                        if (selectedAnswer === selectedBtn) {
                            selectedAnswer = null;
                        } else {
                            selectedBtn.classList.add("correct");
                            selectedAnswer = selectedBtn;
                        }

                        nextBtn.style.display = "block";
                    }

                    function getCuisine(number1){
                        var cuisine=""
                        if(number1<7){
                            cuisine="Malay"

                        }
                        else if(number1<11){
                            cuisine="Chinese"
                            
                        }
                        else if(number1<15){
                            cuisine="Japanese"
                            
                        }
                        else{
                            cuisine="Western"
                        }
                        return cuisine
                    }
                    function getResults(){
                       
                        resetState();
                        var cuisineName=getCuisine(answerscore);
                        questionElement.innerHTML = "RESULTS: we recommend "+ cuisineName +"<br> <a href='nearbyRecommendations.html'>Click here to view nearby recommendations</a>"
                        nextBtn.innerHTML = "Play Again";
                        nextBtn.style.display = "block";
                        console.log(cuisineName)
                        localStorage["cuisineName"] = cuisineName;



                    }

                    function handleNextButton(){
                        currentQuestionIndex++;
                        if(currentQuestionIndex < questions.length){
                            showQuestion();
                        }
                        else{
                            getResults();
                        }
                    }

                    nextBtn.addEventListener("click", ()=>{
                        if (currentQuestionIndex < questions.length){
                            console.log(selectedAnswer);
                            if (selectedAnswer != null) {
                                let answer = selectedAnswer.value;
                                answerscore+=Number(answer)
                                handleNextButton();
                            } else {
                                alert("Please select an option!")
                            }
                        
                        }
                        else{
                            startQuiz();
                        }
                    })

            



                    startQuiz();
                                    })







