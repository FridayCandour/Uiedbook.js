/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  Apache;

YOU ARE THERE BY UNDER THE RULES
AND CONDUCT OF USE OF THE Apache
LINCENSE AS YOU PROCEED TO
USE THIS SOFTWARE
*/
 "use strict";
let css = (name,sel,properties)=>{
/*This is for creating
 css styles using javascipt*/
 if(typeof sel === "object"){
 properties = sel;
 sel = "";
 }
const styS = ""+name+sel+""+"{";
const styE = "}";
let style = "",
 totalStyle = "";
for (const [k, v] of Object.entries(properties)) {
 style += ""+k+": "+v+";"
 }
let styleTag = document.querySelector('style')
if(styleTag === null){
styleTag = document.createElement("style")
}
totalStyle += styleTag.innerHTML;
totalStyle += styS+style+styE;
styleTag.innerHTML = totalStyle;
document.head.append(styleTag)
}


let media = (value,...properties)=>{
/* This is for creating css  
 @media styles using javascipt*/
const styS = "@media only screen and ("+value+") "+"{",
styE = "}";
let style =" ",
aniSty = " ";
const proplen = properties.length;
let totalAnimation,
Animation = "    ";
const animationStep = (num)=>{
for (const [k, v] of Object.entries(properties[num][1])) {
 style += ""+k+": "+v+";"
 }
 aniSty += ""+properties[num][0]+"{"+style+"}"
 return aniSty
}
for(let i = 0; i < proplen; i++){
Animation += animationStep(i)
}
let aniStyleTag = document.querySelector('style')
if(aniStyleTag === null){
aniStyleTag = document.createElement("style")
}
aniStyleTag.media = "screen";
totalAnimation = aniStyleTag.innerHTML
totalAnimation += styS+Animation+styE
aniStyleTag.innerHTML = totalAnimation
document.head.append(aniStyleTag)

}


let animate = (name,...properties)=>{
/*This is for creating css  
 animations  using javascipt*/
let styS = "/*inputted css animation by uiedbook api*/  @keyframes "+name+" "+"{",
styE = "}", style =" ",
aniSty = " ", 
proplen = properties.length,
totalAnimation,
Animation = "  ";
const animationStep = (num)=>{
for (const [k, v] of Object.entries(properties[num][1])) {
 style += ""+k+": "+v+";";
 }
 aniSty += ""+properties[num][0]+"{"+style+"}"
 return aniSty;
}
for(let i = 0; i < proplen; i++){
Animation += animationStep(i);
}
let aniStyleTag = document.querySelector('style')
if(aniStyleTag === null){
aniStyleTag = document.createElement("style")
}
aniStyleTag.media = "screen";
totalAnimation = aniStyleTag.innerHTML;
totalAnimation += styS+Animation+styE;
aniStyleTag.innerHTML = totalAnimation;
document.head.append(aniStyleTag);
}


let build = (type,content,parent,ifCache) =>{
/*this for building css styles,
html makeup and javascript to the dom*/
if(typeof parent !== "string"){
[ifCache,parent] = [parent,ifCache];
}
if(type === "html"){
if(typeof parent === 'undefined'){
parent = "body";
};
document.querySelector(parent).insertAdjacentHTML("beforeend",content);
}else{
if(type === "css"){
let aniStyleTag = document.querySelector('style');
if(aniStyleTag === null){
document.head.append(document.createElement("style"));
aniStyleTag = document.querySelector('style');
}
aniStyleTag.media = "screen";
aniStyleTag.insertAdjacentHTML("beforeend",content);
}else{
if(type === "javascript" || type === "js"){
if(!ifCache || typeof ifCache === "undefined"){
let scr = document.createElement("script");
scr.insertAdjacentHTML("beforeend",content);
document.body.append(scr);
}else{
window.onload = () =>{
let scr = document.createElement("script");
scr.insertAdjacentHTML("beforeend",content);
document.body.append(scr);
}}}}}}

let xhr = (type, url) =>{
 this.xhrRequest = new XMLHttpRequest();
 this.result = null;
 this.xhrRequest.open(type, url, true);
 this.result =  xhrRequest.onload = function() {
      return this.response;
    }
  this.xhrRequest.send();
    return this.result;
}

let u = (...uied) =>{
const eU = uied.length, 
[el,ifAll_OrNum] = uied;
let all = false,e;
if(eU === 1 && typeof el === 'string' ){
e = document.querySelector(el);
}else{
if(eU === 1 && typeof el !== 'string' ){
e = el;
}else{
if(eU === 2 && typeof ifAll_OrNum !== 'number'){
//all el is being grabbed from the dom
 all = true
 e = document.querySelectorAll(el);
}else{
if(typeof ifAll_OrNum === 'number'){
e = document.querySelectorAll(el)[ifAll_OrNum];
}}    
}
};
// the funny parts
if(!e) throw new Error('element "'+el+'" not found');
return {
    // for styling
style(obj){
  for (const [k, v] of Object.entries(obj)) {
  if(!all){
  e.style[k] = v;
  }else{
  e.forEach(element =>{
  element.style[k] = v;
  });
}}
},
config(obj){
    if (obj) {
       for (const [k,v] of Object.entries(obj)) {
        e[k] = v;
    }
    }else{
        return;
    }
},
// for adding new elements more powerfully
 appendto(type,attribute,number = 1){
 if(typeof attribute === "undefined" || typeof type === "undefined"){
  throw new Error("type or attribute not given | not enough parameters to work with");
  return;
  }
 const createdElement = document.createElement(type);
 let addedAtrr = "";
 for (const [k, v] of Object.entries(attribute)) {
 createdElement[k] = v;
addedAtrr += ' '+k+'="'+v+'"'
 }
if(!all){
e.append(createdElement)
for(let i = 0; i < number - 1; i++){
createdElement.insertAdjacentHTML("afterend","<"+type+" "+addedAtrr+"></"+type+">")
}
  }else{
  e.forEach(element =>{
  element.append(createdElement)
  for(let i = 0; i < number; i++){
  createdElement.insertAdjacentHTML("afterend","<"+type+" "+addedAtrr+"></"+type+">")
  }})
  }
  return createdElement;
  },
  // simple event listener
  on(type,callback){
  function evft(e){
  e.stopPropagation()
  e.preventDefault()
  return callback(e);
  }
 if(!all){
  return e.addEventListener(type,evft);
 }else{
  return e.forEach(element =>{
 element.addEventListener(type,evft);
 })
 }},
 // for adding attributes to the dom elements
 attr(attribute_object){
 if(typeof attribute_object !== "object") return;
     if(!all){
        for(const [prop, attr] of object.entries(attribute_object)){
            if(prop==null){
             return e.getAttribute(prop);
             }else {
            e.setAttribute(prop, attr);
            }
             }
    }else{
        for(const [prop, attr] of object.entries(attribute_object)){
            if(prop==null){
             return e.getAttribute(prop);
             }else {
            e.forEach(el => el.setAttribute(prop, attr));
            }
             }
    }
 },
 // for removing attributes to the dom elements
 removeAttr(atr){
 if(attr == null){return};
     if (!all) {
        e.removeAttribute(atr)         
     }else{
         e.forEach(el => el.removeAttribute(atr) )
     }
 },
 // for adding inner html contents to the dom elements
 html(code){
 if (!all) {
    e.innerHTML=code;     
 }else{
     e.forEach(el => el.innerHTML = code);
 }
 },
 // for adding text to the dom elements
 text(text){
 if (!all) {
    e.textContent=text;
}else{
     e.forEach(el => el.textContent = text );
 } 
},
 // for adding class to the dom elements
 addClass(clas){
 if (!all) {
    e.classList.add(clas);
}else{
     e.forEach(el => el.classList.add(clas) );
 }
 }, 
 // for removing class from the dom elements

 removeClass(clas){
 if (!all) {
    e.classList.remove(clas)
}else{
     e.forEach(el => el.classList.remove(clas));
 } 
}, 
 // for hiding the dom elements

 hide(){
    if(!all){
 e.style.display = "none";
    }else{
e.forEach(el => el.style.display = "none")
    }
 }, 
 // for displaying the dom elements

 show(){
 if(!all){
    e.style.display = "block";
       }else{
   e.forEach(el => el.style.display = "block")
       } 
}, 
 // for resizing the dom elements

 box(w,h,c="transparent"){
 if(!all){
    e.style.width = w;
    e.style.height = h;
    e.style.backgroundColor = c;
           }else{
   e.forEach(el =>{
    el.style.width = w;
    el.style.height = h;
    el.style.backgroundColor = c;
    
   })
} 
}, 
 // for scrollingthe dom elements into view
 scrollTo(s=true){
 e.scrollIntoView(s)
 },
 // for adding elements to the dom elements
 add(nod){
 e.appendChild(nod)
 }, 
 // for removing elements to the dom elements
 remove(ind){
 e.removeChild(e.childNodes[ind])
 },

 // for making the dom elements fulscreen
 fullScreen(){
 return {
 toggle: ()=>{
  
 if (!document.fullscreenElement) {
 e.requestFullscreen().catch(err => {
 alert(`Error! failure attempting to enable full-screen mode: ${err.message} (${err.name})`);
 });
 } else {
 document.exitFullscreen();
 }
 },
 set(){
 e.requestFullscreen().catch(err => {
 alert(`Error! failure attempting to enable
 full-screen mode: ${err.message}
 (${err.name})`);
 });
 },
 exist(){
 document.exitFullscreen();
 }}}}
}


const isEmptyObject = function( obj ) {
    // for checking for empty objects
		for (let name in obj ) {
			return false;
		}
		return true;
	}

  const each = function( obj, callback ) {
	let length, i = 0;
	if ( typeof obj === "object") {
	length = obj.length;
	for ( ; i < length; i++ ) {
	if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
	break;
	}}} else {
	for ( i in obj ) {
	if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
	break;
	}}}	
	return obj;
	}
	
const error = ( msg ) =>{
		throw new Error( msg );
	};

const get = (...uied) =>{
const [el, ifAll_OrNum ] = uied;
let e;
if(uied.length === 1){
e = document.querySelector(el);
}else{
if(uied.length === 2 && typeof ifAll_OrNum !== "number"){
e = document.querySelectorAll(el);
}else{
if(typeof ifAll_OrNum === "number"){
e = document.querySelectorAll(el)[ifAll_OrNum];
}}};
return e;
}

///////%%%%%%%%%%%%////////////
let cacheBox = [];
const cache = (fn) => {
cacheBox.push(fn)
}
const startCache = (bol)=>{
if(bol){
window.addEventListener("load", ()=>{
(function(){
cacheBox.forEach((fn)=>{
fn();
})
})()
})
}else{
window.addEventListener("loadeddata", (function(){
cacheBox.forEach((fn)=>{
       fn();
      })
})()
)
}    
return true;
}


const rad = (fro,to) => {
let num = to - fro;
return Math.floor(Math.random() * Math.floor(num));
}

const timer = (fuc,ti=1) =>{
    let code="()=>{"+fuc+"}";
    setTimeout(eval(code),ti*1000);
}
const makeClass = (name,stylings) =>{
    let clas = document.createElement("style");
    let styling ="."+name+"{"+stylings+"}";
    clas.innerHTML= styling;
    document.body.appendChild(clas);
}
const create = (type = 'div',id = '') =>{
    const element = document.createElement(type)
    element.setAttribute("id",id)
    document.body.appendChild(element)
    return element;
}
const download = function(type, source, name){
const file = new Blob([source.buffer],{ type: type});
const fileURL = URL.createObjectURL(file);
const linkElement = document.createElement("a");
// add the file url
linkElement.setAttribute('href', fileURL);
// add the download attribute with name suggestion
linkElement.setAttribute('download', name)
return linkElement;
}

const debounce = (func, delay) =>{
    setInterval(() => func.apply(this, arguments), delay)
}

let callStack  = [];
const keep = function (id,time){
if(callStack.indexOf(id) > - 1) return;
const callObj = typeof id === "object"? id : null;
let runtime = typeof time === "number"? time : 1;
if(typeof id === "string" && typeof runtime === "number"){
for(;runtime > 0; runtime--){
 callStack.push(id)
}}else{
if(callObj !== null){
for(let [k,v] of Object.entries(callOjb)){
for(;v > 0; v--){
callStack.push(k)
}}}}}

const check = function (id){
let ind = callStack.indexOf(id)
if(ind > -1){
callStack.splice(ind,1)
return true;
}else{
return false;    
}}


const log = (message)=>{
if(message){
console.log(message)
}else{
if(callStack.length > 0){
return callStack;
}}};


const store = (name, value )=>{
localStorage.setItem(name , JSON.stringify(value))
}
const retrieve = (name )=>{
localStorage.getItem(name);
}
const remove = (name) =>{
localStorage.removeItem(name);
}
const getKey = (index)=>{
window.localStorage.key(index);
}
const clear = ()=>{
localStorage.clear();
}


const onKeys = (keymap,callback)=>{
 if(typeof keymap !== "object") throw new Error("no keys given");
window.addEventListener("keydown", (e) => {
e.preventDefault();
keep(e.key,1);
});
window.addEventListener("keyup", (e) => {
// don't forget to us capital first lettrs for the control key and others
let h = [];
for(let i = 0; i < keymap.length; i++){
if(check(keymap[i])) {
h.push("");
}else{return;
}}
if(h.length === keymap.length){
    return callback(e);
}else{
 callStack = [];
}})
};



/*
The next is system of the 
uiedbook library it's canvas 
related operations like motion 
detection key map and all that
useful stuff in one single 
bundle it's a game engine library
with minimal functionality
for 2D rendering */

/*
@ TODOs 

 1. a widget systmen for adding widgets to the gameplay
 2. a audio system for playing sounds at some event at a timed input
 3. ......


*/
const buildCanvas = function (id,h = window.innerHeight, w = window.innerWidth) {
/*this is used for creating
pixel stable game views across
all screen width with no pixelation 
problem try and see the magic */
  let canv = document.createElement("canvas"),
  context = canv.getContext('2d'),
  backingStores = [
    'webkitBackingStorePixelRatio',
    'mozBackingStorePixelRatio',
    'msBackingStorePixelRatio',
    'oBackingStorePixelRatio',
    'backingStorePixelRatio'
    ],
deviceRatio = window.devicePixelRatio,
backingRatio = backingStores.reduce(function(prev, curr) {
    return (context.hasOwnProperty(curr) ? context[curr] : 1);
  }),
  ratio = deviceRatio / backingRatio;
  canv.id = typeof id === "undefined"? "canvas": id;
  canv.width = Math.round(w * ratio);
  canv.height = Math.round(h * ratio);
  canv.style.width = w +'px';
  canv.style.height = h +'px';
  canv.style.backgroundColor = 'black'
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return canv;
}

const appendCanvas = (id,h, w, parent)=>{
/*same as above but with a 
parent to append directly */
let cv = buildCanvas(id,h,w),par;
if(typeof parent !== "string" && typeof parent !== "undefined"){
    par = parent;
}else{
if(typeof parent === "string"){
par = document.querySelector(parent);    
}else{
if ( typeof parent === "undefined") {
 par = document.body
}}}
par.style.boxSizing = "border-box";
par.append(cv);
return cv;
}

/*this is the RE game time line algorimth*/
const re = (function(){
/*the timeLine is an interface
 where game views (view) are
 sequenced on.*/
let games = [];

// the build function is for creating the game div
// and allowing the dev to build upon it
function build(viewID){
let frame = document.createElement("div")
if (viewID) {
frame.setAttribute("id", viewID)
}
u(frame).style({
    height: "100vh",
    width: "100vw",
    backgroundColor: "black"
})
return frame;
}

// the mount function notifies the flow function 
// that the game should be started 
function mount(template,callback){
if (games.length === 1) {
    return
}else{
 games.push(template);    
}
 if (!callback) return;
    return callback();
}
// the flow function ochastrate the game play
function flow(fram){
    fram.append(games[0])
}
// the start function starts the game
// and manathe dom
const start = () =>{
if(games.length < 1 || games.length > 1){
    throw new Error("RE: mount() should be called and given a canvas")
return;
};

let gameframe = u("body").appendto("div",{id: "RE_gameframe"});
u("#RE_gameframe").style({
width: "100vw",height: "100vh",
position: "fixed",
top: "0px", left: "0px", 
bottom: "0px",right: "0px",
zIndex: "10000000001",
backgroundColor: "black",
overflow: "hidden",display: "flex",
flexDirection: "column",
justifyContent: "center",alignItems: "center"});
flow(gameframe)
}
// this stops the game 
const cancel = ()=>{
  let fram =  get("#RE_gameframe");
    fram.innerHTML = "";
    fram.append(vsg())
}

return {build: build,
        mount: mount,
        start: start,
        cancel: cancel};
})() // END OF THE RE ENGINE////////////////////////

/*
other TODOs stuff will be built here
*/
const entity = function (name,painter,behaviors) {
 /*an entity is any object or thing
 that can be added to the game world*/
    this.id = name || "no name"// name of the entity for identification
    this.painter = painter // callback for paint the entity 
    this.width = 0; // width of entiity
    this.height = 0; // height of entity
    this.spritWidth = 0;
    this.spritHeight = 0;
    this.top = 0; // distance from the top of the canvas
    this.left = 0; // distance from the left of the canvas
    this.velocityX = 0; // velocity on the x axis
    this.velocityY = 0; // velocity on the y axis
    this.visible = true; // to check if the entity is displayed should be turned off when not 
    this.animating = false; /* to check if the entity is currently being animated should be 
    toggled as entity state is change to help add functionality to the behavior callback at runtime*/
    this.behaviors = behaviors || []; // this is a callback to add additional properties to the entity at runtime
    this.frame = 0;
    this.timer = 0;
    this.delete = false;
};

entity.prototype = { 
    // this algorimth is for calling the paint function
    // to make it functional when seen at runtime
update(context,dt){
  if(typeof this.painter.update !== "undefined" && this.visible){
   this.painter.update(this,context,dt);
  }else{
    throw new Error("RE: entity with name of ${this.name} has no update function");
  }},
paint(context,dt){
 if(typeof this.painter.paint !== "undefined" && this.visible){
    this.painter.paint(this,context,dt);
}else{
    throw new Error("RE: entity with name of ${this.name} has no paint function");
}},
run(context,dt){
    // here the entity don't have to be visble
    if(typeof this.behaviors !== "undefined"){
       this.behaviors(this,context,dt);
   }else{
    throw new Error("RE: entity with name of ${this.name} has no behavior function as it's 3rd parameter");
}
   return {
        id: this.id,
        painter:this.painter,
        width:this.width,
        height:this.height,
        spritWidth:this.spritWidth,
        spritHeight:this.spritHeight,
        top:this.top,
        left:this.left,
        velocityY:this.velocityY,
        velocityX:this.velocityX,
        visible:this.visible,
        animating:this.animating,
        behaviors:this.behaviors,
        frame:this.frame,
        timer:this.timer,
        delete:this.delete
   }
}}

const imgPainter = function (url) {
    this.image = new Image();
    this.image.src = url;
 };

imgPainter.prototype  = {
    update(){},
    paint(entity,context,dt) {
        if(this.image.complete){
            context.drawImage(this.image, entity.left,entity.top,entity.width,entity.height);
        }
    }
}

// this is a powerful sprite algorith for 
// rendering the exact sprite from a 
// spritesheet in successful orders
const spriteSheetPainter = function (url,horizontal,vertical,delay) {
    this.image = new Image();
    this.image.src = url;
    this.framesWidth = this.image.width / horizontal;
    this.framesHeight = this.image.height / vertical;       
    this.horizontalPictures = horizontal;
    this.verticalPictures = vertical;
    this.frameHeightCount = 0;
    this.frameWidthCount = 0; 
    this.delay = delay || 5;
    this.range = 0;
    let that = this; 
    // i don't know if this can be accessed below 
    //so i try to avoid errors ahead of compile time
    this.updateHonrizontalFrame = function (){
            if (that.frameWidthCount <= that.horizontalPictures) {
                that.frameWidthCount++
            }else{
                that.framesWidthCount = 0;
            }
            return that.frameWidthCount;
    }
 };

spriteSheetPainter.prototype  = {
 update() {
     // the this.delay property can be used 
     //to delay the animation on canvas
    this.range++;
    if (this.range % this.delay === 0) {
        if (this.frameHeightCount < this.verticalPictures) {
            this.frameWidthCount = this.updateHonrizontalFrame();
            if (this.frameWidthCount === this.horizontalPictures) {
               this.frameHeightCount++;
            }
        }else{
            this.frameHeightCount = 0;
        }
  }
},
    paint(entity,context) {
    this.image.onload = () => {
    context.drawImage(this.image, this.framesWidth * this.frameWidthCount,this.framesHeight * this.frameHeightCount,this.framesWidth,this.framesHeight,entity.left,entity.top,entity.width,entity.height);
      }
    }
 }

 const audio = function (url,id) {
    this.id = id;
    this.audio = new Audio();
    this.audio.src = url;
 }
audio.prototype  = {
    play() {
        if(this.audio.complete){
            this.audio.play();
        }
    },
    pause() {
            this.audio.pause();
    }
}

const physics = function (){
/*here I will calculate the position and
detection system for the engine*/
let entities = game.entities();
function _detectBorders(zanvas){
const w = zanvas.width, h = zanvas.height;
entities.forEach((ent) =>{
if(ent.top <= 0 || (h && ent.top + ent.height >= h)) {
       ent.top *= 1;
   };
if(ent.left <= 0 || (w && ent.left + ent.width >= w)) {
      ent.left *= 1;
};
})
}

function getDetailsOf(player){
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].id === player.id) {
            console.log(player.run());
            break;
        }      
    }
}
return {
config: configuration,
detectBorders: _detectBorders,
getDetailsOf: getDetailsOf
}}

 let bgPainter = function (url,canv) {  
    this.image = new Image();
    this.image.src = url;
    this.framesWidth = this.image.width / horizontal;
    this.framesHeight = this.image.height / vertical;       
    this.h = horizontal;
    this.v = vertical;
    this.frameHeightCount = 0;
    this.frameWidthCount = 0; 
    this.range = 0;
 };
bgPainter.prototype  = {
    paint(sprite,context) {
context.drawImage(this.image, this.framesWidth * this.frameWidthCount,this.framesHeight * this.frameHeightCount,this.framesWidth,this.framesHeight,sprite.left,sprite.top,sprite.width,sprite.height);         
    },
    shiftRight() {
     this.range++;
     if (this.range % 20 === 0) {
     this.frameWidthCount++;            
     }
    },
    shiftLeft() {
     this.range++;
     if (this.range % 20 === 0) {
     this.frameWidthCount--;            
     this.frameHeightCount++;
     }},
     shiftUp() {
     this.range++;
     if (this.range % 20 === 0) {
     this.frameHeightCount++;
     }
    },
    shiftDown() {
     this.range++;
     if (this.range % 20 === 0) {
     this.frameHeightCount;
     }
}
}

// Renderer Object fot rendering the game scenes
const renderer = (function () {
//game rendering algorithm
let renderingConfig = {
    saveCanvas: [],
    dt: 0},_entities = [],
    usedt = renderingConfig.dt === 0 ? false : true,
    lastdt = 0,nextdt = 0,
    entitysArray = [];

function _assemble(...players) {
    if(!players) throw new Error("RE: No players assembled");
    if(!usedt){
    players.forEach(player =>{
        entitysArray.push(player)
    });
    return entitysArray;
    }else{
    players.forEach(player => {
        _entities.push(player)})
    return _entities;
    }
}


function animate(dt){
let context = renderingConfig.saveCanvas[0].getContext("2d");
  context.clearRect(0,0,renderingConfig.saveCanvas[0].width,renderingConfig.saveCanvas[0].height)  
    if (usedt) {
      let deltaTime = dt - lastdt;
      lastdt = dt;
      nextdt += deltaTime;
    if (nextdt > renderingConfig.dt) {
    if(_entities.length === 0) throw new Error("RE: No players assembled");
    for (let i = 0; i < _entities.length; i++) {
    entitysArray.push(_entities[i]);
    }
     nextdt = 0;
    }
    }
    entitysArray.forEach(w => {
         w.update(context,dt);
         w.run(context,dt);
         w.paint(context,dt)
     });

    entitysArray = entitysArray.filter(ent => !ent.delete)
    window.requestAnimationFrame(animate);
}
function _render(canvas,defautDeltaTime) {
if (!canvas) { throw new Error("RE: game needs to be rendered EXP: renderer.render(canvas)")}
   renderingConfig.saveCanvas.push(canvas);
   renderingConfig.dt = defautDeltaTime;
   animate(0);
 };

return {
render: _render,
assemble: _assemble,
entities: function () {return _entities} 
}})();

if (typeof module === "object" && typeof exports === "object") {
    module.exports = {u ,onKeys ,
    getKey ,remove ,retrieve ,store ,
    log ,check ,keep ,debounce ,
    download ,create ,makeClass ,timer ,
    rad ,cache ,get ,
    error ,each ,isEmptyObject ,xhr ,
    build ,animate ,media ,css ,
    buildCanvas ,appendCanvas ,entity ,re ,
    physics ,renderer }; 
    // 33 apis exposed
}