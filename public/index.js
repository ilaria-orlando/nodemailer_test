const form = document.querySelector(".contactForm");
let names = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");

const formEvent = form.addEventListener("submit", (Event) => {
    Event.preventDefault();

    let formData = {
        names: names.value,
        email: email.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    //make json object of data
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function (){
      console.log(xhr.responseText);
      if(xhr.responseText == "succes"){
        alert("Email sent");
        names.value = "";
        email.value = "";
        message.value = "";
      }
      else{
        alert("Something went wrong");
      }
    }

    //stringify json data
    xhr.send(JSON.stringify(formData))
    /*let mail = new FormData(form);

    sendMail(mail);*/
});

/*
const sendMail = (mail) => {
    fetch("/send", {
      method: "post",
      body: mail,
    }).then((response) => {
      return response.json();
    });
  };
  */