//For Hamburger menu style

let count = 0;
function onClickMenu() {
    document.getElementById("menu").classList.toggle("icon");
    count++;
    if(count%2 == 0){
      document.getElementById("show-none").style.display = "none";
    }
    else{
      document.getElementById("show-none").style.display = "flex";
    }
}

//Receiving all the values that are stored in localStorage 
let trip_value = localStorage.getItem('tripValue');
let from_value = localStorage.getItem('fromValue');
let to_value = localStorage.getItem('toValue');
let departureDate_value = localStorage.getItem('departureDateValue');
let returnDate_value = localStorage.getItem('returnDateValue');
let travellers_value = localStorage.getItem('travellersValue');
let travelClass_value = localStorage.getItem('travelClassValue');
let fairtype_value = localStorage.getItem('fairtypeValue');

let noOfSearchResult = 10;

//Creating li and store the from data in it
function createFromListItem() {
  let fromlist = document.getElementById("fromList");
  let fromItems = document.createElement("li");
  fromItems.innerHTML = from_value;
  fromlist.appendChild(fromItems);
}
//Creating li and store the to data in it
function createToListItem() {
    let tolist = document.getElementById("toList");
    let toItems = document.createElement("li");
    toItems.innerHTML = to_value;
    tolist.appendChild(toItems);
}

let date = new Date(departureDate_value);
let dates = [];

// get 5 different random dates
function getRandomDates() {
    for(let i = 0; i < noOfSearchResult; i++){
        let random = Math.floor(Math.random() * (0.2 * noOfSearchResult));
        date.setDate(date.getDate() + random);
        let randomDates = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
        dates.push(randomDates);
    } 
    dates.sort((a, b) => a-b);
}

getRandomDates();
    
function createDateListItem(i){
    let datelist = document.getElementById("dateList");
    let dateItems = document.createElement("li");
    dateItems.innerHTML = dates[i];
    datelist.appendChild(dateItems);
}

//
let TakeOffLand = [];
function getRandomTime() {
    for(let i = 0; i < noOfSearchResult; i++){
        let takeoffhours = Math.floor(Math.random() * 24);
        let takeoffminutes = Math.floor(Math.random() * 60);
        if (takeoffhours < 10) takeoffhours = '0' + takeoffhours;
        if (takeoffminutes < 10) takeoffminutes = '0' + takeoffminutes;
        let takeoff_time = takeoffhours + ":" + takeoffminutes;

        let timestring = takeoff_time;
        let time = new Date();
        let timeparts = timestring.split(':');
        let landedhours = parseInt(timeparts[0]);
        let landedminutes = parseInt(timeparts[1]);
        let randomMinute = Math.floor(Math.random() * 60);

        time.setHours(landedhours + 4);
        time.setMinutes(landedminutes + randomMinute);

        let hour = time.getHours();
        let minute = time.getMinutes();
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        let landed_time = hour + ':' + minute;

        
        let takeoffLanding = takeoff_time + " -- " + landed_time;

        TakeOffLand.push(takeoffLanding);
    }
}

getRandomTime();

function flightTimeListItem (i){
    let datelist = document.getElementById("timeOfflight");
    let dateItems = document.createElement("li");
    dateItems.innerHTML = TakeOffLand[i];
    datelist.appendChild(dateItems);
}

//Fair Type calculation

let basefare = 10000;
let newfare = 5000;
let fares = [];

function calculatefare(){
    if(travelClass_value === "Economy"){
        newfare = basefare;
        newfare = newfare * 1.18;
        newfare = newfare * travellers_value;
    }
    else if(travelClass_value === "Primium Economy"){
        newfare = basefare * 1.56;
        newfare = newfare *1.18;
        newfare = newfare * travellers_value;
    }
    else if(travelClass_value === "Business"){
        newfare = basefare * 2.11;
        newfare = newfare *1.18;
        newfare = newfare * travellers_value;
    }
    else if(travelClass_value === "First Class" ){
        newfare = basefare * 3.2;
        newfare = newfare *1.18;
        newfare = newfare * travellers_value;
    }

    if(fairtype_value === "Regular Fees"){
        newfare = newfare;
    }
    else if(fairtype_value === "Armed Forces Fees"){
        newfare = newfare * 0.75;
    }
    else if(fairtype_value === "Student Fees"){
        newfare = newfare * 0.70;
    }
    else if(fairtype_value === "Senior Citizen Fees"){
        newfare = newfare * 0.65;
    }
    else if(fairtype_value === "Doctor & Nurses Fees"){
        newfare = newfare * 0.80;
    }
    
    for(let  i = 0; i < noOfSearchResult; i++){
        let different_price = Math.floor(Math.random() * 1500);
        let booking_price = newfare + different_price;
        fares.push(booking_price);
    }
}
calculatefare();


function fareListItem (i){
    let datelist = document.getElementById("fareCharge");
    let dateItems = document.createElement("li");
    dateItems.innerHTML = "₹ " + fares[i];
    datelist.appendChild(dateItems);
}

//Calling it for how many result i want to show
for(let i = 0; i<noOfSearchResult; i++){
createFromListItem();
createToListItem();
createDateListItem(i);
flightTimeListItem(i);
fareListItem(i);
}


// height depending upon the no of search result
let height = 80 + (noOfSearchResult * 20) + ((noOfSearchResult-1) * 20);
document.getElementById("allFlights").style.height = height+"px";
document.querySelectorAll(".details").forEach(allBox => {
  allBox.style.height = height + "px";
});
if(noOfSearchResult > 10){
  let headerHeight = 100 + 80 + height;
  document.querySelector("header").style.height = headerHeight + "px";
}
