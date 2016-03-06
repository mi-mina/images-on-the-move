var theBody = document.getElementsByTagName("body")[0];
var theImg = document.createElement("img");
var patterns = ["circles", "triangles", "hexagones", "flowers"];
var pattern_ix = 0;
var pattern_img, pattern_bg, pos_ix, pos_iy;
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
  // console.log("borrando imagenes");
  if(images[0]){ //I check if some images are already in images[]
    for(var i = 0; i < n_img ; i++){ //Important! Do not use i < images.length,
    //because we are removing elements and the value changes in each iteration
    images[0].parentNode.removeChild(images[0]); //Do not use images[i],
    //because when we remove the first element, the last index i won't exist.
    }
  }
}

function load_images(){
  // console.log("cargando imagenes");
  //Changing the background and the images
  pattern_img = patterns[pattern_ix] + ".png";
  pattern_bg = patterns[pattern_ix] + "-bg.png";
  theBody.style.backgroundImage= "url(img/" + pattern_bg + ")";
  theImg.src = "img/" + pattern_img;

  //Start position
  pos_ix = window.innerWidth/2 - theImg.width/2;
  pos_iy = window.innerHeight/2 - theImg.height/2;

  //Background style
  theBody.style.backgroundPosition= pos_ix + "px "+ pos_iy + "px";
  theBody.style.backgroundRepeat = "no-repeat";

  //Image style
  theImg.style.position="absolute";
  theImg.style.opacity=1;
  theImg.style.left=pos_ix + "px";
  theImg.style.top=pos_iy + "px";

  //Create images
  for (var i = 0; i < n_img; i++) {
    theBody.appendChild(theImg.cloneNode(true));
    }
  }

  function on_load(){
    // console.log("on load");
    create_options();
    clearInterval(the_timer);
    clear_images();
    load_images();
  }

function move () {
  // console.log("move");
  var speeds = [];
    for(var i = 0; i < n_img; i++){
      speeds.push((Math.random()*2)+1);
    }
  var x_pos = [];
    for(var i = 0; i < n_img; i++){
      x_pos.push(pos_ix);
    }
  var y_pos = [];
    for(var i = 0; i < n_img; i++){
      y_pos.push(pos_iy);
    }

  function display(){
    // console.log("display");
    for(var i = 0; i < images.length; i++){
      if(i % 2 == 0 && i % 4 == 2){
        x_pos[i] = x_pos[i] + speeds[i];
      }else if(i % 4 == 0){
        x_pos[i] = x_pos[i] - speeds[i];
      }else if((i-1) % 2 == 0 && (i-1) % 4 == 2){
        y_pos[i] = y_pos[i] + speeds[i];
      }else{
        y_pos[i] = y_pos[i] - speeds[i];
      }
      images[i].style.left=x_pos[i]+"px";
      images[i].style.top=y_pos[i]+"px";
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
  // console.log("pattern changed");
}

select.addEventListener("change", change_pattern, false);
