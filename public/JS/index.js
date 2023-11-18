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

//Get all the selected data and check any place is null or not

const submit_call = document.getElementById("submit");
submit_call.addEventListener("click", function(event){

  const trip = document.getElementsByName("tripway");
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const departureDate = document.getElementById("departure-date");
  const returnDate = document.getElementById("return-date");
  const travellers = document.getElementById("totaltravellers");
  const travelClass = document.getElementById("traveller-class");
  const fairtype = document.getElementsByName("fairtype");

  let trip_value = null;
  for(let i = 0; i < trip.length; i++) {
    if(trip[i].checked) {
      trip_value = trip[i].value;
      break;
    }
  }

  let from_value = from.options[from.selectedIndex].value;

  let to_value = to.options[to.selectedIndex].value;

  let departureDate_value = departureDate.value;
  
  let returnDate_value = returnDate.value;

  let travellers_value = travellers.options[travellers.selectedIndex].value; 

  let travelClass_value = travelClass.options[travelClass.selectedIndex].value;

  let fairtype_value = null;
  for(let i = 0; i < fairtype.length; i++) {
    if(fairtype[i].checked) {
      fairtype_value = fairtype[i].value;
      break;
    }
  }

  let today = new Date();
  let booking = new Date(departureDate_value);
  let ret_booking = new Date(returnDate_value);
  
  
  //Check if the date are correct or not
  if(booking <= today || ret_booking <= today){
    event.preventDefault();
    alert("You Have Enter a wrong Date...");
  }
  //Check all the credentials are correctly given or not
  else if(trip_value === null || from_value === "" || departureDate_value === "" || to_value === "" || travellers_value === "" || travelClass_value === "" || fairtype_value === null) {
    event.preventDefault();
    alert("Check the credentials...");
  }
  //If all the values are correct then land on new page and set the values in localStorage
  else{
    localStorage.setItem('tripValue', trip_value);
    localStorage.setItem('fromValue', from_value);
    localStorage.setItem('toValue', to_value);
    localStorage.setItem('departureDateValue', departureDate_value);
    localStorage.setItem('returnDateValue', returnDate_value);
    localStorage.setItem('travellersValue', travellers_value);
    localStorage.setItem('travelClassValue', travelClass_value);
    localStorage.setItem('fairtypeValue', fairtype_value);

    window.location.href = "search.html";
  }
});
