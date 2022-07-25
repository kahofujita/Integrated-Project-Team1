
// document.querySelector('.plant-id-button').addEventListener ('click', function sendIdentification() {
//   const files = [...document.querySelector('input[type=file]').files];
//   const promises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           const res = event.target.result;
//           console.log(res);
//           resolve(res);
//         }
//         reader.readAsDataURL(file)
//     })

//   })

//   Promise.all(promises).then((base64files) => {
//     console.log(base64files)

//     const data = {
//       // api_key: "xFCXUGwXmsC3mUrFGjsu6CwofUABXyIiu9juLeAAVFbQhUv4Ml",
//       images: base64files,
//       modifiers: ["crops_fast", "similar_images"],
//       plant_language: "en",
//       plant_details: ["common_names",
//                       "url",
//                       "name_authority",
//                       "wiki_description",
//                       "taxonomy",
//                       "synonyms"],

//                     };

//     fetch('https://api.plant.id/v2/identify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);

//       let arr = data.suggestions;

//      document.querySelector('.result-message').innerHTML = `<p>We found it!</p>`;

//       for(let i = 0; i < arr.length ; i++ ){
//         // console.log(data.suggestions[i].plant_name);
//         document.querySelector('.scientific-name-title').innerHTML = "Scientific Name:";
//         document.querySelector('.plant-name').innerHTML += data.suggestions[i].plant_name + ",";

//         for(let q = 0; q < data.suggestions[i].plant_details.common_names.length; q++){
//       document.querySelector('.common-name-title').innerHTML = "Common Name:";
//       document.querySelector('.common-name').innerHTML += data.suggestions[i].plant_details.common_names[q]+ ",";
//       }

//       // for(let j = 0; j < data.suggestions[i].similar_images.length; j++){
//       // Just need the first picture
//       let image = data.suggestions[0].similar_images[0].url ;
//       document.querySelector('.plant-picture').innerHTML += `<img src="${image}" alt="" >`;

 

//       // }
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   })

//   const uploadingArea = document.querySelector('.uploading-picture-form');
//   uploadingArea.style.display = "none";
// document.querySelector('.moon-cactus-image').style.display = "none";
// });

document.querySelector('.plant-id-button').addEventListener ('click', () => {
 
  document.querySelector('.result-message').innerHTML = `<p>We found it!</p>`;
  document.querySelector('.scientific-name-title').innerHTML = "Scientific Name:";
        // document.querySelector('.plant-name').innerHTML += data.suggestions[i].plant_name + ",";
        document.querySelector('.plant-name').innerHTML += "Fruit Salad Plant, Swiss Chees Plant";
        document.querySelector('.common-name-title').innerHTML = "Common Name:";
      // document.querySelector('.common-name').innerHTML += data.suggestions[i].plant_details.common_names[q]+ ",";
      document.querySelector('.common-name').innerHTML += "Monstera delosioca";
        document.querySelector('.plant-picture').innerHTML += `<img src="images/plant_img/corn plant.png" alt="" >`;
        
        const uploadingArea = document.querySelector('.uploading-picture-form');
  uploadingArea.style.display = "none";
  document.querySelector('.moon-cactus-image').style.display = "none";
})





// Take a Photo

let camera_button = document.querySelector(".icon-camera-container");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', async function() {
  document.querySelector('.show-camera').style.display = "flex" ;
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;

});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	console.log(image_data_url);
    
});