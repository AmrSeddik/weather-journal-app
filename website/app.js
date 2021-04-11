/* Global Variables */

// Create a new date instance dynamically with JS

let d = new Date();

let newDate = (d.getMonth() + 1) + ’.’ + d.getDate() + ’.’ + d.getFullYear();

let APIkey = “2893 fc230557829f66ea35635e7c3e34”

const button = document.getElementById(“generate”)

button.addEventListener(“click”, clickBTN)

function clickBTN(){
  let zipcode = document.getElementById("zip").value
  const feelings = document.getElementById("feel").value
  if (!zipcode) {
    alert("You didnot enter a zip code")
  } else {
    const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${APIkey}$units=metric`
    display(fullURL).then(function(data) {
        postFunction("/postdata", {
          data: newDate,
          temp: data.main.temp,
          feel: feelings,
        })
      })
      .then(async function() {
        const req = await fetch('/getdata');
        try {
          const item = await req.json();
          document.getElementById('data').innerHTML = "data is:" + item.date;
          document.getElementById('temp').innerHTML = "tempreture is:" + item.temp;
          document.getElementById('content').innerHTML = "I felling to day:" + item.feelings;
        } catch (error) {
          console.log(error);
        }
      })
  }
}

async function display(fullURL){
const request=await fetch(fullURL);
try {
    const data=await request.json();
    console.log(data);
    return data
} catch (error) {
    console.log(error);
}
}

async function postFunction(url="/postdata",data={}){
    const response=await fetch(url,{
        method:"POST",
        Credentials:"same-origin",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });

    try {
        const newDate=await response.json();
        return newDate;
    } catch (error) {
        console.log("error")
    }
}
