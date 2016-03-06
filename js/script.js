var theImg = document.createElement("img");
var contenedor = document.getElementById("contenedor");
var patterns = ["circles", "triangles", "hexagones", "flowers"];
var pattern_ix = 0;
var pattern_img, pattern_bg, x_pos, y_pos;
var images = document.getElementsByTagName("img");
var n_img = 4;
var the_timer; //Has to be a global var

function create_options(){
  var select = document.getElementById("select");

  for(var i in patterns){
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(patterns[i]));
    option.setAttribute("value", patterns[i]);
    if(i==0){
      option.setAttribute("selected", "");
    }
    select.appendChild(option);
  }
}

function clear_images () {
  console.log("borrando imagenes");
  if(images[0]){ //I check if some images are already in images[]
    for(var i = 0; i < n_img ; i++){ //Important! Do not use i < images.length,
    //because we are removing elements and the value changes in each iteration
    images[0].parentNode.removeChild(images[0]); //Do not use images[i],
    //because when we remove the first element, the last index i won't exist.
    }
  }
}

function load_images(){
  console.log("cargando imagenes");
  //Changing the background and the images
  pattern_img = patterns[pattern_ix] + ".png";
  pattern_bg = patterns[pattern_ix] + "-bg.png";
  contenedor.style.backgroundImage= "url(img/" + pattern_bg + ")";
  theImg.src = "img/" + pattern_img;

  //Start position
  x_pos = 0;
  y_pos = 0;

  //Background style
  contenedor.style.backgroundPosition= x_pos + "px "+ y_pos + "px";
  contenedor.style.backgroundRepeat = "no-repeat";

  //Image style
  theImg.style.position="absolute";
  theImg.style.opacity=1;
  theImg.style.left=x_pos + "px";
  console.log(theImg.style.left);
  console.log(x_pos);
  theImg.style.top=y_pos + "px";

  //Create images
  for (var i = 0; i < n_img; i++) {
    contenedor.appendChild(theImg.cloneNode(true));
    }
  }

  function on_load(){
    console.log("on load");
    create_options();
    clearInterval(the_timer);
    clear_images();
    load_images();
  }

function move () {
  console.log("move");
  var speeds = [];
    for(var i = 0; i < n_img; i++){
      speeds.push((Math.random()*2)+1);
    }
  var x_speeds = [];
    for(var i = 0; i < n_img; i++){
      x_speeds.push(x_pos);
    }
  var y_speeds = [];
    for(var i = 0; i < n_img; i++){
      y_speeds.push(y_pos);
    }

  function display(){
    console.log("display");
    for(var i = 0; i < images.length; i++){
      if(i % 2 == 0 && i % 4 == 2){
        x_speeds[i] = x_speeds[i] + speeds[i];
      }else if(i % 4 == 0){
        x_speeds[i] = x_speeds[i] - speeds[i];
      }else if((i-1) % 2 == 0 && (i-1) % 4 == 2){
        y_speeds[i] = y_speeds[i] + speeds[i];
      }else{
        y_speeds[i] = y_speeds[i] - speeds[i];
      }
      images[i].style.left=x_speeds[i]+"px";
      images[i].style.top=y_speeds[i]+"px";
    }
  }
  the_timer = setInterval(display, 50);
}
//EVENTS
var select = document.getElementById("select");

function change_pattern(){
  var pattern_choosen = document.getElementById("select").value;
  pattern_ix = patterns.indexOf(pattern_choosen);
  clearInterval(the_timer);
  clear_images();
  load_images();
  console.log("pattern changed");
}

select.addEventListener("change", change_pattern, false);
