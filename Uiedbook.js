/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  BSD;

YOU ARE THERE BY UNDER THE RULES
AND CONDUCT OF USE OF THE BSD
LINCENSE AS YOU PROCEED TO
USE THIS SOFTWARE
 */
(function(window){

 "use strict";
function u(){
let _s = {};
_s.css = (name,sel,properties)=>{

/*
 This module for creating
 css styles using
 javascipt
 */
 if(typeof sel === "object"){
 properties = sel
 sel = ""
 }
let styS = ""+name+sel+""+"{",
styE = "}",
style = "", 
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
_s.media = (value,...properties)=>{
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
    
let styS = "@media only screen and ("+value+") "+"{",
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
_s.animate = (name,...properties)=>{

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
// third module
_s.xprt = (design) =>{
/*
the acronym =>
$$$$$$$$$$$$$$$$$$
$ x for extra    $
$ p for prebuilt $
$ r for reusable $
$ t for template $
$$$$$$$$$$$$$$$$$$

this module should be used for
adding or  showing casing pre-
designed templaes that users
can choose from or customise
-----------------------------
actually it is an array like
["design nane",
["layout code"],
[styles or animations]]

simple but how does the layout
parser do this?
*/
let templates = [];
for(let i = 0; i < templates.length; i++){
if(templates[i][0] == design){
return templates[i];
}}};
/////// 4th module
_s.build = (type,content,parent,ifCache) =>{
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
_s.xhr = (url, type,ifJSON) =>{
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
_s.$ = (...uied) =>{

let eU = uied.length,
[el,ifAll,orNum] = uied,
all = false,e,elArr = document.querySelectorAll(el);
if(eU === 1 && typeof el === 'string' ){
e = document.querySelector(el);
}else{
if(eU === 2 && typeof ifAll === 'string'){
//all el is being grabbed from the dom
 all = true
}else{
if(typeof orNum === 'number'){
e = elArr[orNum];
}}};
// the funny part

return {
style: (obj) => {
  for (const [k, v] of Object.entries(obj)) {
  if(!all){
  e.style[k] = v;
  }else{
  elArr.forEach(element =>{
  element.style[k] = v;
  })
  }}},

 appendto: (type,attribute,number) =>{
 let createdElement = document.createElement(type),id,addedAtrr = "";
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
  elArr.forEach(element =>{
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
  return elArr.forEach(element =>{
 element.addEventListener(type,evft);
 })
 }},
 attr: (attribute_object)=>{
 if(typeof attribute_object !== "object") return;
 for(const [prop, attr] of object.entries(attribute_object)){
if(prop===null){
 return e.getAttribute(atr);
 }else {
e.setAttribute(prop, attr);
}
 }
 
 }, 
 removeAttr: (atr)=>{
 if(attr === null){return};
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
 }
 
 
  }
};


///////%%%%%%%%%%%%////////////
// 7th module
_s.isEmptyObject = function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	}
		
_s.each = function( obj, callback ) {
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
	
	
	
_s.globalEval = function( code, options, doc ) {
	new	DOMEval( code, { nonce: options && options.nonce }, doc );
	}
	
_s.error = ( msg ) =>{
		throw new Error( msg );
	},
_s.get = (...uied) =>{
let [el,ifAll,orNum] = uied,e,elArr = document.querySelectorAll(el);

if(uied.length === 1){
e = document.querySelector(el);
}else{
if(uied.length === 2){
e = elArr;
}else{
if(uied.length === 3){
e = elArr[orNum];
}}}
return e;
}

///////%%%%%%%%%%%%////////////
// 8th module

_s.cacheBox = [];
_s.cache = (fn) => {
/*if(document.querySelector('style') === null){
const sty = document.createElement("style")
document.head.append(sty)
}*/
_s.cacheBox.push(fn)
}
_s.startCache = ()=>{
window.addEventListener("load", ()=>{
_s.cacheBox.forEach((fn)=>{
fn();
})
})
}
///////%%%%%%%%%%%%////////////
// 9th module
_s.script = (code,ifCache) =>{
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

_s.rad = (fro,to) => {
let num = to - fro;
return Math.floor(Math.random() * Math.floor(num));
}


/* fullScreen api */

_s.fullScreen = (object) =>{
obj = typeof object !== "string"? document.body : document.querySelector(object);
return {
toggle: ()=>{
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    obj.requestFullscreen().catch(err => {
      alert(`Error! failure attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}
},
set: ()=>{
obj.requestFullscreen().catch(err => {
alert(`Error! failure attempting to enable
 full-screen mode: ${err.message}
  (${err.name})`);
});
},
exist: ()=>{
document.exitFullscreen();
}
}};

//timer
_s.timer = (fuc,ti=1) =>{
    let code="()=>{"+fuc+"}";
    setTimeout(eval(code),ti*1000);
}
//classmaker
_s.makeClass = (name,stylings) =>{
    let clas=document.createElement("style")
    let styling ="."+name+"{"+stylings+"}"
    clas.innerHTML= styling;
    document.body.appendChild(clas)
}
//make elem
_s.create = (type = 'div',id = '') =>{
    let element = document.createElement(type)
    element.setAttribute("id",id)
    document.body.appendChild(element)
    return element;
}
_s.download = function(type, source, name){

const file = new Blob([source.buffer],{ type: type});
const fileURL = URL.createObjectURL(file);

const linkElement = document.createElement("a");

// add the file url
linkElement.setAttribute('href', fileURL);

// add the download attribute with name suggestion
linkElement.setAttribute('download', name)
return linkElement;
}


_s.debounce = (func, delay) =>{
  function k() {
    setInterval(() => func.apply(this, arguments), delay)
  };
k();
};




_s.callStack  = [];
_s.keep = (id,runtime, multiple)=>{
let callOjb = typeof id === "object"? id : null;
multiple = typeof multiple === "undefined"? true: multiple;
if(typeof id === "string" && typeof runtime === "number" && multiple){
for(;runtime > 0; runtime--){
_s.callStack.push(id)
}
}else{
if(callOjb !== null){
for(let [k,v] of Object.entries(callOjb)){
for(;v> 0; v--){
_s.callStack.push(k)
}
}}else{
if(!multiple && bank.callStack.indexOf(id) > - 1){
return;
}else{
for(;runtime > 0; runtime--){
_s.callStack.push(id)
}
}
}} 
};
_s.log = (message)=>{
if(message){
console.log(message)
}else{
if(_s.callStack.length > 0){
console.log(_s.callStack)
return _s.callStack;
}}};

_s.check = (id) =>{
let ind = _s.callStack.indexOf(id)
if(ind > -1){
_s.callStack.splice(ind,1)
return true;
}else return false};


_s.store = (name, value )=>{
localStorage.setItem(name , JSON.stringify(value))
}
_s.retrieve = (name )=>{
localStorage.getItem(name);
}

_s.remove = (name) =>{
localStorage.removeItem(name);

};
_s.getKey = (index)=>{
window.localStorage.key(index);
};
_s.clear = ()=>{
localStorage.clear();
};




_s.onKeys = (keymap,callback)=>{
window.addEventListener("keydown", e =>{
e.preventDefault();
_s.keep(e.key,1,false);
});
window.addEventListener("keyup", e => {
let h = [];
for(let i = 0; i < keymap.length; i++){
if(_s.check(keymap[i])) {
h.push("i");
}else{
return;
}}
if(h.length === keymap.length) return callback();
})};



return _s;
}



//################################
/*
The i package of the uied library
it's canvas related operations 
like motion detection 
key map and all that useful
stuff in one single 
bundle
it's a game engine library
*/

function i(){
let _s = {};


_s.timeLine = (function(){
let builds = [],
duration = [],
frame = document.createElement("div"),
i = 0,
highTimeOut = 3600;
const put = (child,timing)=>{
builds.push(child);
if(timing === "undefined"){
timing = highTimeOut}
duration.push(timing);
};

const start = () =>{
frame.style.height = "100vh";
frame.style.width = "100vh";
frame.style.position = "fixed";
frame.style.zIndex = "101";
frame.style.backgroundColor = "black";
document.body.append(frame);

const Grabin = (i)=>{
setTimeout(()=>{
frame.append(builds[i]);
},
duration[i]);
};
const Grabout = (i)=>{
builds[i].parentNode.removeChild(builds[i]);
};
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


_s.canvas = (id,h,w) =>{
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
_s.appendCanvas = (id,h, w, parent)=>{
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
_s.entity = (x,y,w,h,imgs) =>{
    
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

if( this.y <= 0 || this.y+this.height >= game.gameFieldHeight() ) {
       this.direction *= -1;
   };
};


// Renderer Object
_s.renderer = (function () {
let _drawEntity = (context, player) =>{
context.drawImage(player.film, player.x, player.y, player.width, player.height);
}
function _render() {
let $ = document.querySelector("canvas").getContext("2d"),
i,
entity,
entities = game.entities();

for(i=0; i < entities.length; i++) {
   entity = entities[i];
   _drawEntity($, entity);
  };
 };
return {
render: _render
};

})();










return _s;
}





if(window){
/*initialising global window variables,
to work in a browser environment
*/
if(typeof(window.u) === 'undefined'){
    window.u = u();
  }
 
if(typeof(window.i) === 'undefined'){
window.i = i();
};
}else{
/*

time to export those packages
so that they are available 
in a node js environment*/

module.exports = {u,i};
}
})(window)




 // test playground of uied apis





/*

// Game Object
var game = (function () {
    var _gameFieldHeight = 200;
    var _entities = [];

    function _start() {
        _entities.push(new Player(100, 175));
        _entities.push(new Enemy(20, 25));
        _entities.push(new Enemy(80, 25));
        _entities.push(new Enemy(160, 25));

        window.requestAnimationFrame(this.update.bind(this));
    }

    function _update() {
        physics.update();

        var i;
        for( i=0; i<_entities.length; i++) {
            _entities[i].update();
        }

        renderer.render();

        window.requestAnimationFrame(this.update.bind(this));
    }

    return {
        start: _start,
        update: _update,
        entities: function () { return _entities; },
        gameFieldHeight: function () { return _gameFieldHeight; }
    };

})();

game.start();




*/




/*
if( this.y <= 0 || this.y+this.height >= game.gameFieldHeight() ) {
       this.direction *= -1;
   }
};


*/