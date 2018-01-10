//*
let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == "" || attempt.value == ""){setHiddenFields()};
    if(!validateInput(input.value)){
      return false;
    }else{
      attempt.value++;
    };

    var testResult = getResults(input.value);
    if (testResult){
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    }else if(!testResult && attempt.value>=10){
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    }else{
      setMessage("Incorrect, try again.");
    };
    }

//implement new functions here

function setHiddenFields(){
  attempt.value=0;
  answer.value = Math.floor(Math.random()*10000);
  answer.value = answer.value.toString();
  while (answer.value.length<4){
    answer.value="0"+answer.value;
  }
};

function setMessage(message){
  document.getElementById('message').innerHTML = message;
};

function validateInput(length){
  if (length.length==4){return true}
  else{
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
};

function getResults(result){
  var newDiv = '<div class="row"><span class="col-md-6">' + result + '</span><div class="col-md-6">';
  var win = 0;
  for (var i=0; i <= 3; i++){
    if(result.charAt(i)==answer.value.charAt(i)){
      newDiv=newDiv+'<span class="glyphicon glyphicon-ok"></span>';
      win++;
    }else if(result.charAt(i)==answer.value.charAt(0) ||
             result.charAt(i)==answer.value.charAt(1) ||
             result.charAt(i)==answer.value.charAt(2) ||
             result.charAt(i)==answer.value.charAt(3) ){
      newDiv=newDiv+'<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      newDiv=newDiv+'<span class="glyphicon glyphicon-remove"></span>';
    }
  };
  newDiv+='</div></div>';
  document.getElementById("results").innerHTML += newDiv;
  if (win==4){return true}else{return false};
};

function showAnswer (success){
  let code = document.getElementById('code');
  if (success){
    code.className += " success";
  }else {
    code.className += " failure";
  }
  code.innerHTML = answer.value;
};

function showReplay (){
  document.getElementById("guessing-div").style = "display:none";
  document.getElementById("replay-div").style = "display:block";
};
