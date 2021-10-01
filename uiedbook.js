/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  MIT;
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


/*

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})
*/





let media = (value,...properties)=>{
/* This is for creating css  
 @media styles using javascipt*/
const styS = "@media only screen and ("+value+") "+"{",
styE = "}";
let style ="  ",
aniSty = " ";
const proplen = properties.length;
let totalAnimation,
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
let aniStyleTag = document.querySelector('style');
if(aniStyleTag === null){
aniStyleTag = document.createElement("style");
}
aniStyleTag.media = "screen";
totalAnimation = aniStyleTag.innerHTML;
totalAnimation += styS+Animation+styE;
aniStyleTag.innerHTML = totalAnimation;
document.head.append(aniStyleTag);

}

/* 


the media function is used in the following format


media("min-width: 790px",
["#container",
{
    width: "100%",
    height: "100%",
    background-color: "#0000"
}]
)

["#header",
{
    width: "100%",
    height: "20%",
    background-color: "#fff"
}]
)


*/


let animate = (name,...properties)=>{
/*This is for creating css  
 animations  using javascipt*/
let styS = "@keyframes "+name+" "+"{",
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


/*

animate("popanimation",
["from",
{
    transform: "scale3D(2)" ,
    height: "10%",
    background-color: "#0000"
}]
)

["to",
{
    transform: "scale3D(1)" ,
    height: "100%",
    background-color: "#ff9800"
}]
)


*/






// in construction
// let build = (type,content,parent,ifCache) =>{
/*this for building css styles,
html makeup and javascript to the dom
if you don't want to do it on the html 
file
*/



// if(typeof parent !== "string"){
// [ifCache,parent] = [parent,ifCache];
// }
// if(type === "html"){
// if(typeof parent === 'undefined'){
// parent = "body";
// };
// document.querySelector(parent).insertAdjacentHTML("beforeend",content);
// }else{
// if(type === "css"){
// let aniStyleTag = document.querySelector('style');
// if(aniStyleTag === null){
// document.head.append(document.createElement("style"));
// aniStyleTag = document.querySelector('style');
// }
// aniStyleTag.media = "screen";
// aniStyleTag.insertAdjacentHTML("beforeend",content);
// }else{
// if(type === "javascript" || type === "js"){
// if(!ifCache || typeof ifCache === "undefined"){
// let scr = document.createElement("script");
// scr.insertAdjacentHTML("beforeend",content);
// document.body.append(scr);
// }else{
// window.onload = () =>{
// let scr = document.createElement("script");
// scr.insertAdjacentHTML("beforeend",content);
// document.body.append(scr);
// }}}}}}






const build = (...layouts) =>{
    // structure ----   {type: "div", id: "div", on: "click"}
    /*
    every layout should be an
     object with values necessary
      for for the described layout
    */
   
   let i = layouts.lenght;
   while (i > 0) {
    let elem = document.createElement(layouts[i].type)
    

    i--;
   }
}
    












// in construction
const xhr = function (type, url){
    // for sending requests
 let xhrRequest = new XMLHttpRequest();
 let result = null;
 xhrRequest.open(type, url, true);
 result =  xhrRequest.onload = function() {
      return response;
    }
  xhrRequest.send();
    return result;
}











const u = (...uied) =>{
    /*
    the u function is a powerful 
    selector function with added 
    attributes to manipulate dom 
    elements, it does it in a more
    save, fast and efficient. 
    */

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
if(!e) throw new Error('element "'+el+'" not found');



// the funny parts or extra methods that can be used 
// to manipulate dom  elements are below!

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
/*
 *** HOW TO USE ***

u("#container").style({
    width: "100%",
    height: "100%",
    color: "black"
})

*/

config(obj){
    // for manipulating objects
    if (obj) {
       for (const [k,v] of Object.entries(obj)) {
        e[k] = v;
    }
    }else{
         throw new Error(`the variable is not an object ${obj}`);
    }
},
/*
 *** HOW TO USE ***

u(object).config({
    name: "object",
    powerof: (pow, n){ return Math.pow(pow, n)}
})

*/

 appendTo(type,attribute,number = 1){
// for adding new elements more powerfully
if(typeof attribute === "undefined" || typeof type === "undefined"){
  throw new Error("type or attribute not given | not enough parameters to work with");
  }

let frag = new DocumentFragment();
if (!all) {
    for (let i = 0; i < number; i++) {
        const element = document.createElement(type);
        for (const [k, v] of Object.entries(attribute)) {
            element[k] = v;
            }
            frag.append(element)
    }    
    e.append(frag)
}else{
    for (let i = 0; i < number; i++) {
        const element = document.createElement(type);
        for (const [k, v] of Object.entries(attribute)) {
            element[k] = v;
            }
            frag.append(element)
    }

    e.forEach( (el) =>{ el.append(frag)})
}

return ;

//  const createdElement = document.createElement(type);
//  let addedAtrr = "";
//  for (const [k, v] of Object.entries(attribute)) {
//  createdElement[k] = v;
// addedAtrr += ' '+k+'="'+v+'"'
//  }
// if(!all){
// e.append(createdElement)
// for(let i = 0; i < number - 1; i++){
// createdElement.insertAdjacentHTML("afterend","<"+type+" "+addedAtrr+"></"+type+">")
// }
//   }else{
//   e.forEach(element =>{
//   element.append(createdElement)
//   for(let i = 0; i < number; i++){
//   createdElement.insertAdjacentHTML("afterend","<"+type+" "+addedAtrr+"></"+type+">")
//   }})
//   }
//   return createdElement;
  },
/*
 *** HOW TO USE ***

u("#container").appendTo("div"{
    className: "newdiv",
    id: "newdiv"
}, 5)

*/

  
  // advance event listener
  on(type,callback){
  function evft(e){
//   e.stopPropagation()
  e.preventDefault()
  return callback(e);
  }
 if(!all){
  return e.addEventListener(type,evft,false);
 }else{
  return e.forEach(element =>{
 element.addEventListener(type,evft,false);
 })
 }},

 /*
 *** HOW TO USE ***

u("#container").on("click", ()=>{
    console.log("clicked!")
})

*/

 // for adding attributes to the dom elements
 attr(attribute_object){
 if(typeof attribute_object !== "object") return;
     if(!all){
        for(const [prop, attr] of Object.entries(attribute_object)){
            if(prop==null){
             return e.getAttribute(prop);
             }else {
            e.setAttribute(prop, attr);
            }
             }
    }else{
        for(const [prop, attr] of Object.entries(attribute_object)){
            if(prop == null){
             return e.getAttribute(prop);
             }else {
            e.forEach(el => el.setAttribute(prop, attr));
            }
             }
    }
 },
 /*
 *** HOW TO USE ***

u("#container").attr({
    className: "container",
    id: "container"
})

*/

 // for removing attributes from dom elements
 removeAttr(attr){
 if(attr == null){return};
     if (!all) {
        e.removeAttribute(atr)         
     }else{
         e.forEach(el => el.removeAttribute(atr) )
     }
 },
  /*
 *** HOW TO USE ***

u("#container").removeAttr("className")

*/
 // for adding inner html contents to the dom elements
 html(code){
 if (!all) {
    e.innerHTML=code;     
 }else{
     e.forEach(el => el.innerHTML = code);
 }
 },
  /*
 *** HOW TO USE ***

u("#container").html("<div> hello am a div </div>")

*/
 // for adding text to the dom elements
 text(text){
 if (!all) {
    e.textContent=text;
}else{
     e.forEach(el => el.textContent = text );
 } 
},
 /*
 *** HOW TO USE ***

u("#container").html("hello am text")


*/
 // for adding class to the dom elements
 addClass(clas){
 if (!all) {
    e.classList.add(clas);
}else{
     e.forEach(el => el.classList.add(clas) );
 }
 }, 
 /*
 *** HOW TO USE ***

u("#container").addClass(".class")

*/

 // for removing class from the dom elements

 removeClass(clas){
 if (!all) {
    e.classList.remove(clas)
}else{
     e.forEach(el => el.classList.remove(clas));
 } 
},
 /*
 *** HOW TO USE ***

u("#container").removeClass(".class")

*/ 
 // for hiding the dom elements

 hide(){
    if(!all){
 e.style.display = "none";
    }else{
e.forEach(el => el.style.display = "none")
    }
 }, 
  /*
 *** HOW TO USE ***

u("#container").hide()

*/
 // for toggling the display of elements
toggleClass(){
    if(!all){
        if (e.style.display = "none") {
            e.style.display = "block";
        }else{
            e.style.display = "none";   
        }
           }else{
            if (e[0].style.display = "none") {
                e.forEach(el => el.style.display = "block")
            }else{
                e.forEach(el => el.style.display = "none")   
            }
   }     
},
 /*
 *** HOW TO USE ***

u("#container").toggleClass(".class")

*/
 // for displaying the dom elements

 show(){
 if(!all){
    e.style.display = "block";
       }else{
   e.forEach(el => el.style.display = "block")
  } 
},
 /*
 *** HOW TO USE ***

u("#container").show()

*/ 
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
 /*
 *** HOW TO USE ***

u("#container").box("100px","100%","#ff9800")

*/
 // for scrollingthe dom elements into view
 scrollTo(s=true){
 e.scrollIntoView(s);
 },
  /*
 *** HOW TO USE ***

u("#container").scrollTo()

*/
 // for adding elements to the dom elements
 add(nod){
 e.append(nod);
 }, 
  /*
 *** HOW TO USE ***
let span = document.createElement("span");
u("#container").add(span)

*/
 // for removing elements to the dom elements
 remove(ind){
 e.removeChild(e.childNodes[ind])
 },
  /*
 *** HOW TO USE ***

u("#container").remove(0)

*/

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
 }}}

 /*
 *** HOW TO USE ***

u("#container").fullscreen().toggle()
u("#container").fullscreen().exist()
u("#container").fullscreen().set()

*/

}}


const isEmptyObject = function( obj ) {
    // for checking for empty objects
        for (let name in obj ) {
            return false;
        }
        return true;
    }

      /*
 *** HOW TO USE ***
let obj = {};
isEmptyObject(obj);
// true

*/

function isArray(q){
for(let e in q){
e = e * 1;
if((e + 1) === 1){
return true;
}else{
return false;
}}}


/*
 *** HOW TO USE ***
 
 const array = [1,2,3,4,5]
 
isArray(array);
// true

const obj = {food: "bean", num: 44}

isArray(obj);
// false
*/


  const each = function( obj, callback ) {
    let length, i = 0;
    if ( typeof obj == "object") {
    length = obj.length;
    for ( ; i < length; i++ ) {
    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
    console.log(obj[i])
    break;
    }}} else {
    for ( i in obj ) {
    if ( callback.call( obj[ i ]) === false ) {
    break;
    }}} 
    return obj;
    }

/*
 *** HOW TO USE ***
each(obj, function);
*/





function intersect(target,opt,callback){
const {root, rootMargin,threshold} = opt,
options = {
  root: root,
  rootMargin: rootMargin,
  threshold: threshold
},
observer = new IntersectionObserver(callback, options),
child = document.querySelector(target);
observer.observe(child);
}


/*
*** HOW TO USE ***

function call(){
console.log("intersect(targert,opt,callback)")
}
intersect("span",{
root: null,
    rootMargin: "0px",
    threshold: 0.6
},call)


*/





	
const error = ( msg ) =>{
	throw new Error( msg );
};
/*
 *** HOW TO USE ***
error("there was an error!");
*/
const get = (...uied) =>{
    /*
    the get function is the u function but without any sweet methods
    it is used if you want to enjoy the easiness of the u function 
    but don't want to use it awesome methods
    */
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
/*
 *** HOW TO USE ***
let container = get("container");
*/

///////%%%%%%%%%%%%////////////
let cacheBox = [];
const cache = (fn) => {
    /*
    for caching functions that has high piorities
    before page load

    hey you can't manipulate the dom using it in some cases
    because the dom won't be available just yet
    */
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


const rad = (num) => {
    // for getting more purer random number
return Math.floor(Math.random() * Math.floor(num));
}
/*
 *** HOW TO USE ***
rad(5);
// you will get random values from 0 to 5
*/
const timer = (fuc,ti=1) =>{
    //for writting timed expression without a function wrapper
    let code="()=>{"+fuc+"}";
    setTimeout(eval(code),ti*1000);
}
/*
 *** HOW TO USE ***
timer(
    console.log("the code is running every 2 seconds")
, 2);
*/


const makeClass = (name,stylings) =>{
    //for making css classes
    let clas = document.createElement("style");
    let styling =""+name+"{"+stylings+"}";
    clas.innerHTML= styling;
    document.body.appendChild(clas);
}
/*
 *** HOW TO USE ***
class(".container","color: red;");
*/
const create = (type = 'div',id = '') =>{
    // it's self explanatory some how
    const element = document.createElement(type)
    element.setAttribute("id",id)
    document.body.appendChild(element)
    return element;
}
/*
 *** HOW TO USE ***
let div = create("div","newdiv");
*/

const download = function(type, source, name){
    // an easy to use download function that returns
    // the link element that should be clicked
const file = new Blob([source.buffer],{ type: type});
const fileURL = URL.createObjectURL(file);
const linkElement = document.createElement("a");
// add the file url
linkElement.setAttribute('href', fileURL);
// add the download attribute with name suggestion
linkElement.setAttribute('download', name)
return linkElement;
}

const debounce = (func, timeout = 600) =>{
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
        func()
    }, timeout);
}

/*
 *** HOW TO USE ***
debounce(function , 1000);
*/

// the grandmother algorith for managing ids of
//anything, don't use it if you don't understand it's power
// it looks simple.
let callStack  = [];
const keep = function (id,time){
const callObj = typeof id === "object"? id : null;
let runtime = typeof time === "number"? time : 1;
if(typeof id === "string" && typeof runtime === "number"){
if(callStack.indexOf(id) > - 1){ 
return;
};


for(;runtime > 0; runtime--){
 callStack.push(id);
}}else{
if(callObj !== null){
for(let [k,v] of Object.entries(callOjb)){
if(callStack.indexOf(k) > - 1){
    callStack.splice(ind,1)
return;
}else{
for(;v > 0; v--){
callStack.push(k)
}}}}}}

const check = function (id){
let ind = callStack.indexOf(id)
if(ind > -1){
callStack.filter(key => !(id === key));
// callStack.splice(ind,1)
return true;
}else{
return false;    
}}


let log = (message)=>{
if(message){
console.log(message);
}else{
if(callStack.length > 0){
console.log(callStack);
return callStack;
}}};




let store = (name, value )=>{
    /// it's self explanatory some how
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



const onKeys = (keys,callback,object = document, lock = true)=>{
    // for handling even more complicated key events,
    // it's built with the grandmother algorimth or code
if(!keys || !callStack){
throw new Error("no keys or callbacks given");
}
const keymap = [...keys];
object.addEventListener("keydown", (e) => {
if (lock) {
    e.preventDefault()
}
keep(e.key,1);
},false);
object.addEventListener("keyup", (e) => {
let num = 0;
for(let i = 0; i < keymap.length; i++){
if(check(keymap[i])) {
    ++num;
    num = 0;
    callStack = [];
}else{
    break;
    return false;
}}

if(num === keymap.length){
    e.preventDefault();
    callback.call(e);
    num = 0;
    callStack = [];
}else{
    return false;
}},false)
};
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

onKeys(["arrowRight","control"],callback,container);

*/

const continuesKeys = (keys,callback, delay = 0, object = document,  lock = true)=>{
    // under construction!!!!!!!
    if(!keys || !callStack){
    throw new Error("no keys or callbacks given");
    }
    const keymap = [...keys];
    object.addEventListener("keydown", (e) => {
       keep(e.key,1);
       if (callStack.length === keymap.length) {
        checkKeys(e);
       }
    });
    
function checkKeys(e){
        let num = 0;
        for(let i = 0; i < keymap.length; i++){
        if(check(keymap[i])) {
        ++num;
        }else{
            num = 0;
            callStack = [];
            break;
        }}


        if(num === keymap.length){
            if (lock) {
                e.preventDefault();
            }
            console.log(delay);
            debounce(()=> callback.call(e),delay);
            num = 0;
            callStack = [];
    
        }else{
            return false;
      }
   }
};

/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

continuesKeys(["arrowRight","control"],callback,500,true,container);

*/



function swipe(item){
    let caller = {},
    startX = 0,
    startY = 0;

    if (typeof item === "object") {
        for ( const [k,v] of Object.entries(item)) {
            caller[k] = v;
        }
    }else{
        throw new Error("no call given for the swipe handler")
    }


    function handleTouchStart(e) { 
     startX = e.changedTouches[0].screenX;  
     startY = e.changedTouches[0].screenY;
     }

     function handleTouchEnd(e) {
        const diffX = e.changedTouches[0].screenX - startX;   
        const diffY = e.changedTouches[0].screenY - startY;   
        const ratioX = Math.abs(diffX / diffY);   
        const ratioY = Math.abs(diffY / diffX);   
        const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY); 
        
        
        if (absDiff < 10) {
        if (caller.touch) {
            callback.touch(caller.touch)
        }
        }    
        if (ratioX > ratioY) { 
            // left and right
         if (diffX >= 0) {
              if (caller.right) {
                callback.right(caller.right)
        }
           } else {      
              if (caller.left) {
                callback.left(caller.left)
        }
             }  

             // up and down

         } else {
           if (diffY >= 0) {     
             if (caller.down) {
                callback.down(caller.down)
        }
           } else {       
              if (caller.up) {
                     callback.up(caller.up)
        }
           }   
           } 
         
           }
    
    document.body.addEventListener("touchstart",handleTouchStart)
    document.body.addEventListener("touchend",handleTouchEnd)

      let callback = {
        touch(callback){
            return callback()
        },
        right(callback){
            return callback();
            },

    left(callback){
        return callback()
        },

        down(callback){
            return callback()
            },

    up(callback){
        return callback()
        }};
    }

    



 /*
 *** HOW TO USE ***

    function touch(){
     console.log("touching")
    }
    
    

    function up(){
     console.log("swipe up")
    }
    

    function down(){
     console.log("swipe down")
    }
    

    function right(){
     console.log("swipe right")
    }


    function left(){
     console.log("swipe left")
    }



    let obj = {down: down,
               touch: touch,
               up: up,
               right: right,
               left: left
           }

    swipe(obj)



 */







/*
The next is system of the 
uiedbook library it's canvas 
related operations like motion 
detection key map and all that
useful stuff in one single 
bundle it's a game rendering engine library
called the RE engine
with minimal functionality
for 2D rendering */

/*
@ TODOs 

 1. a widget systmen for adding widgets to the gameplay
 2. a movable background image
 3. ......
*/
const buildCanvas = function (id, w = window.innerWidth , h = window.innerHeight) {
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
/*Re is an interface
 where game views (view) are
 sequenced on.*/
let games = [];

// the build function is for creating the game div
// and allowing the dev to build upon it
function build(viewID){
let frame = document.createElement("div");
if (viewID) {
frame.setAttribute("id", viewID);
};
u(frame).style({
    height: "100vh",
    width: "100vw",
    backgroundColor: "black"
})
return frame;
}

// the mount function notifies the flow function 
// that the game should be started
// and the callback can be used to run a function
// perculiar to this effect. 
function mount(template,callback){
    u("body").appendTo("div",{id: "RE_gameframe"});
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
    throw new Error("RE: re.mount() should be called and given a built game world")
return;
};

u(document.body).style({
margin: "0px",
padding: "0px",
boxSizing: "border-box",
border: "none"
})

u("#RE_gameframe").style({
width: "100vw",height: "100vh",
position: "fixed",
top: "0px", left: "0px", 
bottom: "0px",right: "0px",
zIndex: "0",
backgroundColor: "black",
overflow: "hidden",display: "flex",
flexDirection: "column",
justifyContent: "center",alignItems: "center",
margin: "0px", padding: "0px",
boxSizing: "border-box"});
let gameframe = get("#RE_gameframe");
flow(gameframe)
}
// this stops the game 
const cancel = ()=>{
  let fram =  get("#RE_gameframe");
    fram.innerHTML = "";
    renderer.toggleRendering();
    // fram.append(vsg())
}

const widget = function (name,chil){
    this.wig = document.createElement("div");
    this.wig.className = name;
    this.wig.id = name;
    document.body.append(this.wig)
    return this.wig;
}

 let imagesArray = [],
 audioArray = [];
function loadImage(img,id) {
    if (typeof img === 'object' && !id) {
        for (let i = 0; i < img.length; i++) {
            let p = new Image();
            p.src = img[i][0];
            p.id = img[i][1];
            // p.onload = ()=>{ 
                imagesArray.push(p)
            // }
        }
    }else{
        if (img && id) {
        let i = new Image();
        i.src = img;
        i.id = id;
        // i.onload = ()=>{ 
        imagesArray.push(i)
    // };

        }else{
            throw new Error("cannot load image(s)");
        }
    }
}
function loadAudio(img,id) {
    if (typeof img === 'object' && !id) {
        for (let i = 0; i < img.length; i++) {
            let p = new Audio();
            p.src = img[i][0];
            p.id = img[i][1];
            // p.onload = ()=>{ 
                audioArray.push(p)
            // }
        }
    }else{
        if (img && id) {
        let i = new Image();
        i.src = img;
        i.id = id;
        // i.onload = ()=>{ 
        imagesArray.push(i)
    // };

        }else{
            throw new Error("cannot load image(s)");
        }
    }
}
    
function getAud(id) {
    let p;
    for (let i = 0; i < audioArray.length; i++) {
        if (audioArray[i].id === id) {       
        p = audioArray[i];
        break;
    }
    }
    if (p) {
     return p;   
    }else{
        throw new Error('RE: audio id "'+id+'" not found');
    }
}

 
function getImg(id){
    let p;
    for (let i = 0; i < imagesArray.length; i++) {
        if (imagesArray[i].id === id) {       
        // console.log(imagesArray[i]);
        p = imagesArray[i];
        break;
    }
    }
    if (p) {
     return p;   
    }else{
        throw new Error('RE: image of id "'+id+'" not found');
        return false;
    }
}


return {
        build: build,
        makeWidget: widget, 
        mount: mount,
        start: start,
        loadImage: loadImage,
        loadAudio: loadAudio,
        getImg:  getImg,
        getAud: getAud, 
        cancel: cancel};
})() 
// END OF THE main RE ENGINE////////////////////////

/*
other TODOs stuff will be built here
*/
const entity = function (name,painter,behaviors) {
 /*an entity is any object or thing
 that can be added to the game world*/

    //this.id = name || "none" //name of the entity for identification can be used out side here******
    this.name = name || "none"
    this.painter = painter || {}// callback for paint the entity     can be used out side here******
    this.width = 0; // width of entiity                              can be used out side here******
    this.height = 0; // height of entity                             can be used out side here******
    // this.spritWidth = 0;                                              
    // this.spritHeight = 0;
    this.top = 0; // distance from the top of the canvas              can be used out side here******
    this.left = 0; // distance from the left of the canvas            can be used out side here******
    // this.velocityX = 0; // velocity on the x axis
    // this.velocityY = 0; // velocity on the y axis
    this.visible = true; // to check if the entity is displayed        can be used out side here****** 
    this.behaviors = behaviors; // this is a callback to add additional properties to the entity at runtime
    // this.frame = 0;                                  
    // this.timer = 0;
    this.delete = false;//  to delete an entity                        can be used out side here******
    this.border = true;//   to make the entity observer sides or not   can be used out side here******
    this.isHit = false;
};

entity.prototype = { 
    // this algorimth is for calling the paint function
    // to make it functional when seen at runtime
update(context,lastDeltalTime){
  if(typeof this.painter.update !== "undefined" && this.visible){
   this.painter.update(this,context,lastDeltalTime);
  }
  else{
    // throw new Error(`RE: entity with name of ${this.name} has no update function`);
  }
},
paint(context,lastDeltalTime){
if(typeof this.painter.paint !== "undefined" && this.visible){
    this.painter.paint(this,context,lastDeltalTime);
}else{
    throw new Error(`RE: entity with name of ${this.name} has no paint function`);
}},
observeBorder(w,h){
    if(this.top <= 0) {
        this.top *= 0;
    }else{
        if ((h && this.top + this.height >= h)) {
        this.top = (h - this.height);
        }
    };
 if(this.left <= 0) {
    this.left *= 0;
 }else{
     if ((w && this.left + this.width >= w)) {
        this.left = w - this.width;
     }
 };
},
run(context,lastDeltalTime){
    // here the entity don't have to be visble
    if(typeof this.behaviors !== "undefined"){
       this.behaviors(this,context,lastDeltalTime);
   }
}
}

const imgPainter = function (img,delay = 1) {
    this.image = img;
    this.delay = delay;
    this.range = 0;
 };
imgPainter.prototype  = { 
    // paint only no update
    paint(entity,context) {
        this.range++;
    if (this.range % this.delay === 0) {
        context.drawImage(this.image, entity.left,entity.top,entity.width,entity.height);
    }
    if (this.range > 100) {
        this.range = 1;
    }
  }
}

// this is a powerful sprite algorith for 
// rendering the exact sprite from a 
// spritesheet in successful orders
const spriteSheetPainter = function (img, horizontal = 1,vertical = 1,delay = 1) {
    this.image = img;
    this.framesWidth = Math.round(this.image.width / horizontal);
    this.framesHeight = Math.round(this.image.height / vertical);       
    this.horizontalPictures = horizontal;
    this.verticalPictures = vertical;
    this.frameHeightCount = 0;
    this.frameWidthCount = 0; 
    this.range = 0;
    this.delay = delay;
    this.isLastImage = false;
    this.animateAllFrames = true;
    this.animate = true;
    this.changeSheet = function (img, horizontal = 0, vertical = 0, delay = 1){
        this.image = img;
        this.framesWidth = Math.round(this.image.width / horizontal);
        this.framesHeight = Math.round(this.image.height / vertical);       
        this.horizontalPictures = horizontal;
        this.verticalPictures = vertical;
        this.delay = delay;
    };

    this.animateFrameOf = function (frameY = 0) {
        this.frameHeightCount = frameY;
        if (this.frameWidthCount <= (this.horizontalPictures - 2)){
            this.frameWidthCount++;
        }else{
            this.frameWidthCount = 0;
        } 
    }
}


spriteSheetPainter.prototype  = {
 update() {
    this.range++;
    if (this.range % this.delay === 0 && this.animate) {
          if (this.animateAllFrames) {
        if (this.frameHeightCount < (this.verticalPictures - 1)) {
            if (this.frameWidthCount <= (this.horizontalPictures - 2)){
               this.frameWidthCount++;
            }else{
                this.isLastImage = true;
                this.frameWidthCount = 0;
                this.frameHeightCount++;
            }
        }else{
            this.frameHeightCount = 0;
        }
        if (this.frameHeightCount === this.verticalPictures) {
            this.frameHeightCount++;
        }
    }
  }
if (this.range > 100) {
    this.range = 1;
}




},
 paint(entity,context) {
    context.drawImage(this.image, this.framesWidth * this.frameWidthCount,this.framesHeight * this.frameHeightCount,this.framesWidth,this.framesHeight,entity.left,entity.top,entity.width,entity.height);        
    }
}





 const audio = function (audio) {
    this.audio = audio;
 }
audio.prototype  = {
    play() {
        this.audio.play();    
    },
    pause() {
            this.audio.pause();
    },
    toggle(){
    if (this.audio.pause) {
        this.audio.play()
    }else{
        this.audio.pause()
    }
  },
  continuesPlay(){
      // sorry 
  }
}


const bgPainter = function ( img, speed = 10 , up, left) {  
    this.image = img;
    this.range = 0;
    this.speed = speed; 
    this.top = 0;
    this.left = 0;
    this.width = this.image.width;
    this.height = this.image.height;
    this.GoesUp = up;
    this.GoesLeft = left;
 };
bgPainter.prototype  = {
    update(){
     if (this.GoesLeft) {
        if (this.left <= -this.width) {
            this.left = 0;
        }
    this.left = this.left - this.speed;
     }

     if (this.GoesUp) {
        if (this.top >= this.height) {
            this.top = 0;
        }
    this.top += this.speed;
     }
    },
paint(canvas) {
        const context = canvas.getContext("2d");
        context.drawImage(this.image, this.left, this.top, canvas.width, this.height);   
        if (this.GoesLeft) {
            context.drawImage(this.image, this.left + this.width, this.top, canvas.width, canvas.height);    
        }else{
            context.drawImage(this.image, this.left, this.top  - this.height, canvas.width, this.height);
        }
        
    }
}










const physics = (function () {
function detectCollision(ent,name, reduce = 0){
    for (let j = 0; j < name.length; j++) { 
        if (ent.left + reduce > name[j].left + name[j].width || ent.left + ent.width < name[j].left + reduce || ent.top > name[j].top + name[j].height || ent.top + ent.height < name[j].top + reduce) {
            // console.log("no collisions");
            // return false;
            continue;
         }else{
            // console.log(`${ent.name} has collided with name of ${name[j].name}`);
            // return true;
            name[j].isHit = true;
         }
    }
}
        
return {
    detectCollision: detectCollision,
}
}
)()




const renderer = (function () {
    //game rendering algorithm
    let canvas,
    id, // for pauding os playing the game
    context,
    // variables for the timing
    fps,
    // background varible
    bg = [],
    pause = false,
    // entity storage array
        lastdt = 0,
        nextdt = 0,
        deltaTime,
        entitysArray = [];    


        function bgPaint( img, speed , up, left){
              let bgImg =   new bgPainter( img, speed , up, left);
                  bg.push(bgImg);
                  return bgImg;
                }

                function animatebg(canvas){
                    if (bg === []) return false;
                    bg.forEach((b)=>{
                   b.paint(canvas);
                   b.update();
                 })
                }
                          
            function _assemble(...players) {
                if(!players) throw new Error("RE: No players assembled");
                players.forEach(player =>{
                    entitysArray.push(player);
                });
                return entitysArray;
            }
    function copyCanvasTo(c,opacity,border){
        const cx = c.getContext("2d");
        cx.drawImage(canvas,0,0,c.width,c.height);
        c.style.opacity = opacity;
        c.style.borderRadius = border;
        return c;
    }

    function toggleRendering(){
        if (pause) {
            window.requestAnimationFrame(animate);
            return pause = false;
        }else{
            window.cancelAnimationFrame(id)
            return pause = true;
        }
    }

let wew;
    function animate(dt){
        id = window.requestAnimationFrame(animate);   
        deltaTime = dt - lastdt;
          lastdt = dt;
          nextdt += Math.round(deltaTime);
        if (nextdt > fps) {
            try {
                context.clearRect(0,0,canvas.width,canvas.height);  
                animatebg(canvas)        
                  entitysArray.forEach((ent, i) => {
                    if (ent.delete) {
                        entitysArray.splice(i,1);
                        --i;
                    }
                    
                  if (ent.border) {
                      ent.observeBorder(canvas.width,canvas.height);
                  }
                //   console.log(entitysArray);
                      ent.update(context,dt);
                      ent.run(context,dt);
                      ent.paint(context,dt);
                   });
            } catch (error) {
                throw new Error(`RE: the canvas cannot be animated due to some errors > ${error}`)
            }
        }
        nextdt = 0;                
    }


    function _render(canv,fpso = 0) {
        if (!canv) { throw new Error("RE: game needs to be rendered EXP: renderer.render(canvas)")}
       canvas = canv;
       context = canvas.getContext("2d");
       fps = fpso;
       animate(0)
     };
   
return {
render: _render,
assemble: _assemble,
toggleRendering: toggleRendering,
backgroundImage: bgPaint,
copyCanvasTo: copyCanvasTo, 
}})();


if (typeof module !== "undefined") {
const uiedbook = module.exports = { 
    css, media, animate,
    build, xhr, u,  
    isEmptyObject, isArray,
    each, intersect, error,
    get, cache, rad, timer,
    makeClass, create,
    download, debounce,
    keep, check, log,
    store, retrieve,
    remove, getKey,
    clear, onKeys,
    continuesKeys, swipe,
    buildCanvas, appendCanvas,
    re, entity, imgPainter,
    spriteSheetPainter, audio,
    bgPainter, renderer}; 
    // 39 apis contexts
}