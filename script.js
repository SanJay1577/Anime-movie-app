//Setting the url for accessing the api key. 
let url = "https://api.jikan.moe/v3/search/anime?q=";

//Creating the dom elements for the website.

let headContainer = document.createElement("div");
 headContainer.setAttribute("id", "head-container");
 document.body.append(headContainer);
 headContainer.innerHTML=`<h1 id ="heading">Anime Movie Finder</h1>
                          <input type="search" id ="input-search" class = "center-space" placeholder="Search here eg.Iron-Man">
                          <button id ="btn" class ="center-button">Search</button>
                          <button id ="back-btn">Back to search</button>`;

     // Targeting the created dom elements.                     
     let button = document.getElementById("btn");  
     let input =  document.getElementById("input-search");  
     let backbtn = document.getElementById("back-btn");  
     let heading = document.getElementById("heading");

     backbtn.style.display="none"; //Make the go to back screen button none.

//creating the event for the web app tp get the data when the button is clicked. 
button.addEventListener("click", function(event){

  //setting the initial style of the web app.

 button.style.display="none";
 input.style.display="none";
 heading.style.display="none";
 backbtn.style.display="block";

 //setting the input element to access the right target from the api. 

let movieName = input.value;
let apiUrl = url+movieName;

//console.log(apiUrl);

//fetching the data using async and await method

const fetchData = async function (){
   try {

           const response = await fetch(apiUrl)
   
           const content = await response.json();

  //Creating a function to load the api data and display it to document

     function loadData(){  
          let cardContainer = document.createElement("div");
          cardContainer.setAttribute("id", "movie-container"); 
        
          //Mapping the objects in the array of given api data

             let cardFunction = content.results.map(movie =>{
                        return  `
                         <div id ="movie-card">
                              <div class ="card-img">
                                <img src=${movie.image_url}>
                               </div>

                              <div class = "card-text">  
                               <h3>${movie.title}</h3> 
                                </div>

                              <div class = "card-stats">
                                <p class ="stat">Start of the series: ${movie.start_date}</p> 
                                 <p class ="stat">End of the series: ${movie.end_date}</p> 
                                 <p class ="stat">Type : ${movie.type}</p> 
                                <h3 class ="stat foot">IMDB : ${movie.score}</h3>
                              </div>

                            </div>`
                     
        }).join("");

      //appending the created elements to the body.
               cardContainer.innerHTML = cardFunction;
               document.body.append(cardContainer);

       //logic for getting back to the search page

        backbtn.addEventListener("click", (e)=>{
          cardContainer.innerHTML="";
          button.style.display="block";
          input.style.display="block";
          heading.style.display="block";
          backbtn.style.display="none";
        })
       
           
    };

     loadData(); //calling the function.


   } catch (err) {  //to catch the error
       console.log(err);

       //creating elements to show the no data in the webapp.
       let carddefault = document.createElement("div");
       carddefault.innerHTML=`<h1 id="default-heading">No Movies Found on "${movieName}"</h1>`
       document.body.appendChild(carddefault);

       backbtn.addEventListener("click", (e)=>{
        carddefault.innerHTML="";
        button.style.display="block";
        input.style.display="block";
        heading.style.display="block";
        backbtn.style.display="none";
      })
     
      
   }


}
fetchData(); //calling the data.


});



