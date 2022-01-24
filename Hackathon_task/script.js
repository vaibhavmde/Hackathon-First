//creating html using template literals
document.body.innerHTML=`
<div class="container">
<img src="https://www.freepnglogos.com/uploads/pokemon-logo-png-0.png" alt="logo" />
<div>
<input type="text" placeholder="Search Pokemon here....." id="search">
<button onclick="bySearch()" id="btn">Search</button>
</div>
</div>
<div class="content">
</div>
`;

var div=document.querySelector(".content");   //getting hold on content  

//if user want to search pokemon 
const bySearch=async()=>{          
  var value=document.querySelector("#search").value;//getting hold on value entered in search-box
  value=value.toLowerCase();                        //converting user value to lowercase
 try{                                              
  var info= await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`,{method:"GET"});//fetch using get
    info=await info.json();                       //converting data to json-type
 }catch(err){console.log(err);}
   display(info);                    //calling display function and passing info as parameter
}

const display=(info)=>{
  div.innerHTML="";
  const card=document.createElement("card");  //creating a card html element
  card.setAttribute("class","card");          
  const ability=info.abilities.map((e)=>e.ability.name); //ability to store ablities of pokemon
  const name=info.name[0].toUpperCase()+info.name.slice(1);//converting name to title caps
  const moves=info.moves.map((e)=>e.move.name).slice(0,5); //slicing first five moves of pokemon
  //putting everyting inside card
  card.innerHTML=`                                        
  <img src="${info.sprites.other.dream_world.front_default}" alt="None">
  <h4 id="h4">${name}</h4>
  <div class="card-body">
  <p>Ability<p>
  <section>${ability}</section>
  <p>Moves</p>
  <section>${moves}</section>
  <p>Weight<br>${info.weight}</p>
  </div>
  `;
  div.appendChild(card); //apending inside div
}

//getData fetch 50 pokemon
const getData=async()=>{         
  var pokemon=50;
  for(let i=1;i<=pokemon;i++){        
   try{
     var info= await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`,{method:"GET"});
     info=await info.json();
     createPokemon(info);
   }catch(err){console.log(err);}
  }
  console.log(info);
  
}
getData();

//creating pokemon
const createPokemon=(info)=>{
  const card=document.createElement("card");
  card.setAttribute("class","card");
  const ability=info.abilities.map((e)=>e.ability.name);
  const name=info.name[0].toUpperCase()+info.name.slice(1);
  const moves=info.moves.map((e)=>e.move.name).slice(0,5);
  card.innerHTML=`
  <img src="${info.sprites.other.dream_world.front_default}" alt="None">
  <h4 id="h4">${name}</h4>
  <div class="card-body">
  <p>Ability<p>
  <section>${ability}</section>
  <p>Moves</p>
  <section>${moves}</section>
  <p>Weight<br>${info.weight}</p>
  </div>
  `;
  div.appendChild(card);
}


