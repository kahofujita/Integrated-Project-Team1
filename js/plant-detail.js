
import {db, auth} from './firebase/firebase-config.js'
import {collection, addDoc, doc, getDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";


export function init () {
    console.log(" initializing about.js module:" + new Date());

const userId = sessionStorage.getItem('userID')
console.log(userId)

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let plantName = urlParams.get("name");

const imgNameWapper = document.querySelector('.plant-image-name-wrapper')
const frequentList = document.querySelector('.frequency-list')
const detailSec = document.querySelector('.detail-section')
const indoorSec = document.querySelector('.indoor-section')
const outdoorSec = document.querySelector('.outdoor-section')
const description = document.querySelector('.description')
const detailSection = document.querySelector('.detail-section')
const indoorSection = document.querySelector('.indoor-section')
const outdoorSection = document.querySelector('.outdoor-section')

// Create a media condition that targets viewports at least 800px wide
const mediaQuery = window.matchMedia('(min-width: 800px)')


// Display Plant Image
const img = document.createElement('img')
img.src = `./images/plant_img/${plantName}.png`
img.alt = plantName
imgNameWapper.appendChild(img)

// Diplay Plant Name
const plantNamediv = document.createElement('div')
plantNamediv.classList.add('plant-name')
imgNameWapper.appendChild(plantNamediv)
plantNamediv.innerHTML = plantName

// Border line under detail section
detailSection.classList.add('border-line')


const getPlantinfo = async () => {



    // Query "plant_ourinfo" for INDOOR location =================
    const indoorQuery = query(collection(db, "plant_ourinfo"), where("plant_name", "==", plantName), where("location", "==", 'indoor'))
    const indoorQuerySnapshot = await getDocs(indoorQuery);
    indoorQuerySnapshot.forEach( async(doc_indoor) => {


        // Get Plant Details
        const detailInfo = doc_indoor.data().details
        console.log(detailInfo)

        // Get Indoor Infor from firebase
        const indoorSunFrequent = doc_indoor.data().sunlight_frequency
        const indoorWaterFrequent = doc_indoor.data().water_frequency_string
        const indoorSoilFrequent = doc_indoor.data().soil_frequency_string
        const indoorSunTempRequirement = doc_indoor.data().sunlight_requirement
        const indoorWaterRequirement = doc_indoor.data().water_requirement
        const indoorSoilRequirement = doc_indoor.data().soil_requirement
        
        console.log(indoorSunFrequent)
        console.log(indoorWaterFrequent)
        console.log(indoorSoilFrequent)


        // INDOOR section ==================================

        indoorSec.addEventListener('click', () => {

            // Display only Indoor Frequency
            if (document.querySelector(".indoor")) {
                document.querySelector(".indoor").remove()
            }
            const indoorDiv = document.createElement('div')
            indoorDiv.classList.add('indoor')
            frequentList.appendChild(indoorDiv)
            indoorDiv.innerHTML = `<div class="frequent-wrapper"><div>Sunlight</div><div>${indoorSunFrequent}</div></div><div class="frequent-wrapper"><div>Water</div><div>${indoorWaterFrequent}</div></div><div class="frequent-wrapper"><div>Fertilizer</div><div>${indoorSoilFrequent}</div></div>`

            // Remove Outdoor Frequency
            if (document.querySelector(".outdoor")) {
                document.querySelector(".outdoor").remove()
            }


            // Display Indoor Requirement Table

            indoorSection.setAttribute('style', 'font-weight:700;')
            outdoorSection.setAttribute('style', 'unset;')
            detailSection.setAttribute('style', 'unset;')
            outdoorSection.classList.remove('border-line')
            detailSection.classList.remove('border-line')
            
        
            description.innerHTML = ""


                    // If media query matches
                    description.innerHTML = `<div class="desktop-view"><table><tr><th>Sunlight & Temperature</th><th>Water</th><th>Fertilizer & Soil</th></tr><tr><td>${indoorSunTempRequirement}</td><td>${indoorWaterRequirement}</td><td>${indoorSoilRequirement}</td></tr></table></div>`

  
                    description.innerHTML += `<div class="mobile-view"><table><tr><th>Sunlight & Temperature</th></tr><tr><td>${indoorSunTempRequirement}</td></tr></table><table><tr><th>Water</th></tr><tr><td>${indoorWaterRequirement}</td></tr></table><table><tr><th>Fertilizer & Soil</th></tr><tr><td>${indoorSoilRequirement}</td></tr></table></div>`

                    // Add underline
                    indoorSection.classList.add('border-line')
        
        })




        // Query "plant_ourinfo" for OUTDOOR location ==============
        const outdoorQuery = query(collection(db, "plant_ourinfo"), where("plant_name", "==", plantName), where("location", "==", 'outdoor'))
        const outdoorQuerySnapshot = await getDocs(outdoorQuery);
        outdoorQuerySnapshot.forEach((doc_outdoor) => {

            // Get Outdoor Info from firebase
            const outdoorSunFrequent = doc_outdoor.data().sunlight_frequency
            const outdoorWaterFrequent = doc_outdoor.data().water_frequency_string
            const outdoorSoilFrequent = doc_outdoor.data().soil_frequency_string
            const outdoorSunTempRequirement = doc_outdoor.data().sunlight_requirement
            const outdoorWaterRequirement = doc_outdoor.data().water_requirement
            const outdoorSoilRequirement = doc_outdoor.data().soil_requirement

            console.log(outdoorSunFrequent)
            console.log(outdoorWaterFrequent)
            console.log(outdoorSoilFrequent)


            // DETAIL section  ============================

            // When Going back to Detail Section
            detailSec.addEventListener('click', () => {

                // Remove Indoor Frequency
                if (document.querySelector(".indoor")) {
                    document.querySelector(".indoor").remove()
                }
                const indoorDiv = document.createElement('div')
                indoorDiv.classList.add('indoor')
                frequentList.appendChild(indoorDiv)
                indoorDiv.innerHTML = `<div class="indoor-frequent">Indoor</div><div class="frequent"><div class="frequent-wrapper"><div>Sunlight</div><div>${indoorSunFrequent}</div></div><div class="frequent-wrapper"><div>Water</div><div>${indoorWaterFrequent}</div></div><div class="frequent-wrapper"><div>Fertilizer</div><div>${indoorSoilFrequent}</div></div></div>`
    
                // Remove Outdoor Frequency
                if (document.querySelector(".outdoor")) {
                    document.querySelector(".outdoor").remove()
                }
                const outdoorDiv = document.createElement('div')
                outdoorDiv.classList.add('outdoor')
                frequentList.appendChild(outdoorDiv)
                outdoorDiv.innerHTML = `<div class="outdoor-frequent">Outdoor</div><div class="frequent"><div class="frequent-wrapper"><div>Sunlight</div><div>${outdoorSunFrequent}</div></div><div class="frequent-wrapper"><div>Water</div><div>${outdoorWaterFrequent}</div></div><div class="frequent-wrapper"><div>Fertilizer</div><div>${outdoorSoilFrequent}</div></div></div>`
    
                // Details
                detailSection.setAttribute('style', 'font-weight:700;')
                indoorSection.setAttribute('style', 'unset;')
                outdoorSection.setAttribute('style', 'unset;')
                outdoorSection.classList.remove('border-line')
                indoorSection.classList.remove('border-line')
                description.innerHTML = ""
                description.innerHTML = detailInfo


                        // Add underline
                        detailSection.classList.add('border-line')

            })

            // Indoor Frequency 
            const indoorDiv = document.createElement('div')
            indoorDiv.classList.add('indoor')
            frequentList.appendChild(indoorDiv)
            indoorDiv.innerHTML = `<div class="indoor-frequent">Indoor</div><div class="frequent"><div class="frequent-wrapper"><div>Sunlight</div><div>${indoorSunFrequent}</div></div><div class="frequent-wrapper"><div>Water</div><div>${indoorWaterFrequent}</div></div><div class="frequent-wrapper"><div>Fertilizer</div><div>${indoorSoilFrequent}</div></div></div>`

            // Outdoor Frequency
            const outdoorDiv = document.createElement('div')
            outdoorDiv.classList.add('outdoor')
            frequentList.appendChild(outdoorDiv)
            outdoorDiv.innerHTML = `<div class="outdoor-frequent">Outdoor</div><div class="frequent"><div class="frequent-wrapper"><div>Sunlight</div><div>${outdoorSunFrequent}</div></div><div class="frequent-wrapper"><div>Water</div><div>${outdoorWaterFrequent}</div></div><div class="frequent-wrapper"><div>Fertilizer</div><div>${outdoorSoilFrequent}</div></div></div>`

            // Detail description
            detailSection.setAttribute('style', 'font-weight:700;')
            outdoorSection.setAttribute('style', 'unset;')
            indoorSection.setAttribute('style', 'unset;')
            outdoorSection.classList.remove('border-line')
            indoorSection.classList.remove('border-line')
            description.innerHTML = detailInfo






            // OUTDOOR section ===========================

            outdoorSec.addEventListener('click', () => {

                // Remove Indoor Frequency
                if (document.querySelector(".indoor")) {
                    document.querySelector(".indoor").remove()
                }
    
                // Display only Outdoor Frequency
                if (document.querySelector(".outdoor")) {
                    document.querySelector(".outdoor").remove()
                }
                const outdoorDiv = document.createElement('div')
                outdoorDiv.classList.add('outdoor')
                frequentList.appendChild(outdoorDiv)
                outdoorDiv.innerHTML = `<div class="frequent-wrapper"><div>Sunlight</div><div>${outdoorSunFrequent}</div></div><div class="frequent-wrapper"><div>Water</div><div>${outdoorWaterFrequent}</div></div><div class="frequent-wrapper"><div>Fertilizer</div><div>${outdoorSoilFrequent}</div></div>`
                
                // Display Outdoor Requirement Table
                outdoorSection.setAttribute('style', 'font-weight:700;')
                indoorSection.setAttribute('style', 'unset;')
                detailSection.setAttribute('style', 'unset;')
                detailSection.classList.remove('border-line')
                indoorSection.classList.remove('border-line')
                description.innerHTML = ""

                        // If media query matches
                        description.innerHTML = `<div class="desktop-view"><table><tr><th>Sunlight & Temperature</th><th>Water</th><th>Fertilizer & Soil</th></tr><tr><td>${outdoorSunTempRequirement}</td><td>${outdoorWaterRequirement}</td><td>${outdoorSoilRequirement}</td></tr></table></div>`

                        description.innerHTML += `<div class="mobile-view"><table><tr><th>Sunlight & Temperature</th></tr><tr><td>${outdoorSunTempRequirement}</td></tr></table><table><tr><th>Water</th></tr><tr><td>${outdoorWaterRequirement}</td></tr></table><table><tr><th>Fertilizer & Soil</th></tr><tr><td>${outdoorSoilRequirement}</td></tr></table></div>`


                        // Add underline
                        outdoorSection.classList.add('border-line')


    
            })

        })




    })

    }
    
    getPlantinfo()

}
