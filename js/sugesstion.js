


// Import the functions you need from the SDKs you need
import { db, auth, onAuthStateChanged, collection, query, where, getDocs } from './firebase/firebase-config.js';

//collection Ref
const colRef = collection(db, 'plant_ourinfo');
const userRef = collection(db, 'user_info');


// const userId = sessionStorage.getItem('userID');

// //queries
// const userQuery = query(userRef, where('user_info_id', '==', userId));
export async function init() {
//get collection data
let plantOurinfo = [];
await getDocs(colRef)
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



//handling the very first time of application run (edge case)
lastSuggestion = !localStorage.getItem('lastSuggestion')
  ? {}
  : JSON.parse(localStorage.getItem('lastSuggestion'));




const suggestionHandler = () => {

  let now = new Date();
  let dateToCompare = String(now.getMonth()) + String(now.getFullYear())
  let result = document.querySelector('.suggestion-link');

  if (lastSuggestion.date) {
    result.innerHTML = `${lastSuggestion.plant}`;
 
    // let link = window.location.protocol + "//" + window.location.host + `/plant-detail.html?name=${lastSuggestion.plant.replace(/ /g, "%20")}`;
    // result.href = link;
    let link = `?name=${lastSuggestion.plant.replace(/ /g, "%20")}#plant-detail`
    result.href = link;

    const imgNameWapper = document.querySelector('.plant-image-wrapper')
    // Display Plant Image
    const img = document.createElement('img')
    img.src = `./images/plant_img/${lastSuggestion.plant}.png`
    img.alt = lastSuggestion.plant
    imgNameWapper.appendChild(img)

  } else {

    lastSuggestion.date = dateToCompare;
    const index = Math.floor(Math.random() * plantOurinfo.length);
    console.log(index);



    lastSuggestion.plant = `${plantOurinfo[index].plant_name}`;

    // let link = window.location.protocol + "//" + window.location.host + `/plant-detail.html?name=${lastSuggestion.plant.replace(/ /g, "%20")}`;
    // result.href = link;
    let link = `?name=${lastSuggestion.plant.replace(/ /g, "%20")}#plant-detail`
    result.href = link;

    localStorage.setItem('lastSuggestion', JSON.stringify(lastSuggestion))
    result.innerHTML = `${lastSuggestion.plant}.`;
    const imgNameWapper = document.querySelector('.plant-image-wrapper')
    // Display Plant Image
    const img = document.createElement('img')
    img.src = `./images/plant_img/${lastSuggestion.plant}.png`
    img.alt = lastSuggestion.plant
    imgNameWapper.appendChild(img)

  }
  return
 
}

suggestionHandler();

}

