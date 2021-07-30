/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  BSD;

YOU ARE THERE BY UNDER THE RULES
AND CONDUCT OF USE OF THE BSD
LINCENSE AS YOU PROCEED TO
USE THIS SOFTWARE
 */

 "use strict";

let css = (name,sel,properties)=>{

/*
 This module for creating
 css styles using
 javascipt
 */
 if(typeof sel === "object"){
 properties = sel
 sel = ""
 }
const styS = ""+name+sel+""+"{";
const styE = "}";
let style = "",
 totalStyle = "/*inputted css style by uiedbook api*/";

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
//console.log(styleTag.innerHTML)
}
/////////////%%%%%%%%%////////////
// second s module
let media = (value,...properties)=>{
/*
 This module for creating
 css  media styles 
 using javascipt
 */


/*    @media only screen and ( max-height: 700px) {
      .app {
        margin-bottom: 10px;
      }
    }*/
    
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

/*
 This module for creating
 css  animations  using
 javascipt
 */
 
let styS = "/*inputted css animation by uiedbook api*/  @keyframes "+name+" "+"{",
styE = "}", style =" ",
aniSty = " ", 
proplen = properties.length,
totalAnimation,
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
///////%%%%%%%%%%%%////////////
// forth module
let build = (type,content,parent,ifCache) =>{
/*
this for building css styles,
html makeup and javascript to
the dom
*/
if(typeof parent !== "string"){
[ifCache,parent] = [parent,ifCache]
}

if(type === "html"){
if(typeof parent === 'undefined'){
parent = "body";
};
document.querySelector(parent).insertAdjacentHTML("beforeend",content)
}else{
if(type === "css"){
let aniStyleTag = document.querySelector('style')
if(aniStyleTag === null){
document.head.append(document.createElement("style"))
aniStyleTag = document.querySelector('style')
}
aniStyleTag.media = "screen";
aniStyleTag.insertAdjacentHTML("beforeend",content)
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
}}
}}}};
///////%%%%%%%%%%%%////////////
// 5th module
let xhr = (url, type,ifJSON) =>{
ifJSON === "undefined" ? ifJSON = false : ifJSON
const xhr = new XMLHttpRequest();
let result = null;
 xhr.open(type, url, true);
result =  xhr.onload = function() {
        let data;
        if(ifJSON){
         data = JSON.parse(this.response);
        }else{
         data = this.response;
        }
        
        console.log(data )
        return data;
    }
    xhr.send();
   
  
  /*
  
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.github.com/users/anuradha9712');
  request.send();
  request.onload = ()=>{
  console.log(JSON.parse(request.response));
  }
  
  */
//console.log(result)
}
///////%%%%%%%%%%%%////////////
// 6th module
let u = (...uied) =>{

const eU = uied.length, 
[el,ifAll_OrNum] = uied;
let all = false,e;
if(eU === 1 && typeof el === 'string' ){
e = document.querySelector(el);
}else{
if(eU === 2 && typeof ifAll_OrNum !== 'number'){
//all el is being grabbed from the dom
 all = true
 e = document.querySelectorAll(el);
}else{
if(typeof ifAll_OrNum === 'number'){
e = document.querySelectorAll(el)[ifAll_OrNum];
}}};
// the funny part

return {
style: (obj) => {
  for (const [k, v] of Object.entries(obj)) {
  if(!all){
  e.style[k] = v;
  }else{
  e.forEach(element =>{
  element.style[k] = v;
  })
  }}},

 appendto: (type,attribute,number) =>{
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
 
  }
  
  })
 
  }},
  on: (type,callback) =>{
  function evft(e){
  e.stopPropagation()
  e.preventDefault()
  return callback()
  }
 if(!all){
 /*console.log(e,evft)*/
  return e.addEventListener(type,evft);
 }else{
  return e.forEach(element =>{
 element.addEventListener(type,evft);
 })
 }},
 attr: (attribute_object)=>{
 if(typeof attribute_object !== "object") return;
 for(const [prop, attr] of object.entries(attribute_object)){
if(prop==null){
 return e.getAttribute(prop);
 }else {
e.setAttribute(prop, attr);
}
 }
 
 }, 
 removeAttr: (atr)=>{
 if(attr == null){return};
 e.removeAttribute(atr)
 },
 html: (code)=>{
 e.innerHTML=code;
 },
 text: (text)=>{
 e.textContent=text;
 },
 addClass: (clas)=>{
 e.classList.add(clas)
 }, 
 removeClass: (clas)=>{
 e.classList.remove(clas)
 }, 
 hide: ()=>{
 e.style.display = "none";
 }, 
 show: ()=>{
 e.styledisplay = "block";
 }, 
 box: (w,h,c="transparent")=>{
 e.style.width = w;
 e.style.height = h;
 e.style.backgroundColor = c;
 }, 
 scrollTo: (s=true)=>{
 e.scrollIntoView(s)
 },
 add: (nod)=>{
 e.appendChild(nod)
 }, 
 remove: (ind)=>{
 e.removeChild(e.childNodes[ind])
 },


 fullScreen: () =>{
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
 set: ()=>{
 e.requestFullscreen().catch(err => {
 alert(`Error! failure attempting to enable
 full-screen mode: ${err.message}
 (${err.name})`);
 });
 },
 exist: ()=>{
 document.exitFullscreen();
 }
 }}
 
 
 
 
  }
};


///////%%%%%%%%%%%%////////////
// 7th module
let isEmptyObject = function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	}
		
let each = function( obj, callback ) {
	var length, i = 0;
	
	if ( typeof obj === "object") {
	length = obj.length;
	for ( ; i < length; i++ ) {
	if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
	break;
	}
	}
	} else {
	for ( i in obj ) {
	if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
	break;
	}
	}
	}
	
	return obj;
	}
	
	
	
	
let error = ( msg ) =>{
		throw new Error( msg );
	};
let get = (...uied) =>{
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
// 8th module

let cacheBox = [];
let cache = (fn) => {
/*if(document.querySelector('style') === null){
const sty = document.createElement("style")
document.head.append(sty)
}*/
cacheBox.push(fn)
}
let startCache = ()=>{
window.addEventListener("load", ()=>{
cacheBox.forEach((fn)=>{
fn();
})
})
}
///////%%%%%%%%%%%%////////////
// 9th module
let script = (code,ifCache) =>{
/*
for putting javascript code
in script tags into the
document to support
inline html scripting
*/
if(!ifCache){
let scr = document.createElement("script");
scr.insertAdjacentHTML("beforeend",code);
document.body.append(scr);
}else{
window.onload = () =>{
let scr = document.createElement("script");
scr.insertAdjacentHTML("beforeend",code);
document.body.append(scr);
}
}
};

let rad = (fro,to) => {
let num = to - fro;
return Math.floor(Math.random() * Math.floor(num));
}






//timer
let timer = (fuc,ti=1) =>{
    let code="()=>{"+fuc+"}";
    setTimeout(eval(code),ti*1000);
}
//classmaker
let makeClass = (name,stylings) =>{
    let clas=document.createElement("style")
    let styling ="."+name+"{"+stylings+"}"
    clas.innerHTML= styling;
    document.body.appendChild(clas)
}
//make elem
let create = (type = 'div',id = '') =>{
    const element = document.createElement(type)
    element.setAttribute("id",id)
    document.body.appendChild(element)
    return element;
}
let download = function(type, source, name){

const file = new Blob([source.buffer],{ type: type});
const fileURL = URL.createObjectURL(file);

const linkElement = document.createElement("a");

// add the file url
linkElement.setAttribute('href', fileURL);

// add the download attribute with name suggestion
linkElement.setAttribute('download', name)
return linkElement;
}


let debounce = (func, delay) =>{
    setInterval(() => func.apply(this, arguments), delay)
}




let callStack  = [];
let keep = (id,runtime, multiple)=>{
let callOjb = typeof id === "object"? id : null;
multiple = typeof multiple === "undefined"? true: multiple;
if(typeof id === "string" && typeof runtime === "number" && multiple){
for(;runtime > 0; runtime--){
 callStack.push(id)
}
}else{
if(callOjb !== null){
for(let [k,v] of Object.entries(callOjb)){
for(;v> 0; v--){
callStack.push(k)
}
}}else{
if(!multiple && callStack.indexOf(id) > - 1){
return;
}else{
for(;runtime > 0; runtime--){
callStack.push(id)
}
}
}} 
};
let log = (message)=>{
if(message){
console.log(message)
}else{
if(callStack.length > 0){
console.log(callStack)
return callStack;
}}};

let check = (id) =>{
let ind = callStack.indexOf(id)
if(ind > -1){
callStack.splice(ind,1)
return true;
}else return false};


let store = (name, value )=>{
localStorage.setItem(name , JSON.stringify(value))
}
let retrieve = (name )=>{
localStorage.getItem(name);
}

let remove = (name) =>{
localStorage.removeItem(name);

}
let getKey = (index)=>{
window.localStorage.key(index);
}
let clear = ()=>{
localStorage.clear();
}




let onKeys = (keymap,callback)=>{
window.addEventListener("keydown", e =>{
e.preventDefault()
keep(e.key,1,false);
});
window.addEventListener("keyup", e => {
let h = [];
for(let i = 0; i < keymap.length; i++){
if(check(keymap[i])) {
h.push("i");
}else{
return;
}}
if(h.length === keymap.length) return callback();
})};

//################################
/*
The next package of the uied library
it's canvas related operations 
like motion detection 
key map and all that useful
stuff in one single 
bundle
it's a game engine library
*/



let timeLine = (function(){

/*
the timeLine is an interface
where everything the are
sequenced on (frames or game views), 
every new layer has its own
lifespan and if not given will
will be killed when it reaches the
highTimeOut value 
*/
const builds = [],
duration = [],
frame = document.createElement("div"), 
highTimeOut = 3600;
let i = 0;
const put = (child,timing)=>{
builds.push(child)
if(timing === "undefined"){
timing = highTimeOut}
duration.push(timing)
}

const start = () =>{
frame.style.height = "100vh";
frame.style.width = "100vh";
frame.style.position = "fixed";
frame.style.zIndex = "101";
frame.style.backgroundColor = "black";
document.body.append(frame)

const Grabin = (i)=>{
setTimeout(()=>{
frame.append(builds[i])
},
duration[i])
}
const Grabout = (i)=>{
builds[i].parentNode.removeChild(builds[i]);
}
while(i < builds.length){

Grabin(i);
Grabout(i);
/*if(frame.childElementCount > 1){
  builds[i].parentNode.removeChild(builds[i-1]);
}*/

i++; 
if(i > builds.length){i = 0};
}}

const stop = ()=>{
frame.style.transform = "scale(0)";
frame.style.zIndex = "-1";
document.body.remove(frame)
}
return {put: put,
        start: start,
        stop: stop};
})()


let canvas = (id,h,w) =>{
/*
this is used for creating
pixel stable game views across
all screen width with little or no
pixelation problem try and see the magic 
*/

let canv = document.createElement("canvas"),
context = canv.getContext('2d');
 canv.id = id;
  const backingStores = [
    'webkitBackingStorePixelRatio',
    'mozBackingStorePixelRatio',
    'msBackingStorePixelRatio',
    'oBackingStorePixelRatio',
    'backingStorePixelRatio'
  ]
  
  let deviceRatio = window.devicePixelRatio;

let backingRatio = backingStores.reduce(function(prev, curr) {
    return (context.hasOwnProperty(curr) ? context[curr] : 1);
  });
 let  ratio = deviceRatio / backingRatio;
  canv.width = Math.round(w * ratio);
  canv.height = Math.round(h * ratio);
  canv.style.width = w +'px';
  canv.style.height = h +'px';
  canv.style.backgroundColor = 'black'
  context.setTransform(ratio, 0, 0, ratio, 0, 0);


return canv;
}
let appendCanvas = (id,h, w, parent)=>{
/*
same as above but with a 
parent to append directly 
*/

let par = document.querySelector(parent);
if(typeof parent === "undefined") par = document.body;
par.style.margin = "0px";
par.style.padding = "0px";
par.style.boxSizing = "border-box";
par.style.position = "fixed";
let cv = _s.canvas(id,h,w);
par.append(cv);
return cv;
}
let entity = (x,y,w,h,imgs) =>{
    /*
 game sprits  
    
    */
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.direction = -1;
    let i = 0;
if(typeof imgs !== "object"){
imgs = "";
}else{
this.film = ()=>{
i++; if(i > imgs.length){i = 0};
 let sprit = imgs[i];
return sprit;
};
};

/*if( this.y <= 0 || this.y+this.height >= game.gameFieldHeight() ) {
       this.direction *= -1;
   };*/
};


// Renderer Object
let renderer = (function () {
/*
game rendering algorithm, under development 
stay safe! 
*/
let _drawEntity = (context, player) =>{
context.drawImage(player.film, player.x, player.y, player.width, player.height);
}
function _render() {
const $ = document.querySelector("canvas").getContext("2d");
let i;
//let entity, entities = game.entities();

for(i=0; i < entities.length; i++) {
   entity = entities[i];
   _drawEntity($, entity);
  };
 };
return {
render: _render
};

})();

let physics = (function (){

/*
here I will calculate the position and
detection system for the engine 

*/


})

// Game Object
let game = (function () {
    
    let _entities = [];

    function _assemble() {
        _entities.push(new Player(100, 175));
        _entities.push(new Enemy(20, 25));
        _.push(new Enemy(80, 25));
        _entities.push(new Enemy(160, 25));

        window.requestAnimationFrame(this.update.bind(this));
    }

    function _update() {
      //physics.update(); not yet done 

        var i;
        for( i=0; i<_entities.length; i++) {
            _entities[i].update();
        }

        renderer.render();

        window.requestAnimationFrame(this.update.bind(this));
    }

    return {
        assemble: _assemble,
        update: _update,
        entities: function () { return _entities; }
    };

})();

	if(window.export){
	window.export = {u,onKeys,getKey,remove,retrieve,
	store,log,check,keep,debounce,download,
	create,makeClass,timer,rad,script,cache,
	get,error,each,isEmptyObject,xhr,build
	,animate,media,css};
	}