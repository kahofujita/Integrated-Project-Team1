


// Import the functions you need from the SDKs you need
import { db, auth, onAuthStateChanged, collection, query, where, getDocs } from './firebase/firebase-config.js';

export function init () {
  console.log(" initializing about.js module:" + new Date());

//collection Ref
const colRef = collection(db, 'plant_ourinfo');
const userRef = collection(db, 'user_info');


// const userId = sessionStorage.getItem('userID');

// //queries
// const userQuery = query(userRef, where('user_info_id', '==', userId));

//get collection data
let plantOurinfo = [];
getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs);

    snapshot.docs.forEach((doc) => {
      plantOurinfo.push({ ...doc.data(), id: doc.id });
    })
    console.log(plantOurinfo);
  })
  .catch(err => {
    console.log(err.message);
  })

//compare the month and date to avoid show new suggestion in same month
let lastSuggestion;

// if (!localStorage.getItem('lastSuggestion'))
//   lastSuggestion = {}
// else
//   lastSuggestion = JSON.parse(localStorage.getItem('lastSuggestion'))



//handling the very first time of application run (edge case)
lastSuggestion = !localStorage.getItem('lastSuggestion')
  ? {}
  : JSON.parse(localStorage.getItem('lastSuggestion'));




const suggestionHandler = () => {
  let now = new Date();
  let dateToCompare = String(now.getMonth()) + String(now.getFullYear())
  let result = document.querySelector('#suggestionLink');
  
  if (lastSuggestion.date) {
    result.innerHTML = `Our <span style="color: orange;">last</span> suggestion is: ${lastSuggestion.plant}`;

    let link = window.location.protocol + "//" + window.location.host + `/plant-detail.html?name=${lastSuggestion.plant.replace(/ /g, "%20")}`;
    result.href = link;
  } else {

    lastSuggestion.date = dateToCompare;
    const index = Math.floor(Math.random() * plantOurinfo.length);
    console.log(index);
  
    result.href = "http://plant-datails.html?name=${plant.plant_name}";
    lastSuggestion.plant = `${plantOurinfo[index].plant_name}`;

    let link = window.location.protocol + "//" + window.location.host + `/plant-detail.html?name=${lastSuggestion.plant.replace(/ /g, "%20")}`;
    result.href = link;
  

    console.log(lastSuggestion)

    localStorage.setItem('lastSuggestion', JSON.stringify(lastSuggestion))
     result.innerHTML = `Our <span style="color: cyan;">new</span> suggestion is: ${lastSuggestion.plant}.`;
    //  suggestionLink.innerHTML = ` the details are here:${link}`;

  }
  return
}

// document.querySelector('#suggestion-btn').addEventListener('click', suggestionHandler);
suggestionHandler();



}

