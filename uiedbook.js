"use strict";
/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  Apache;



                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 
YOU SHOULD GET A COPY OF THE APACHE LICENSE V 2.0 IF IT DOESN'T ALREADY COME WITH THIS MODULE
*/
exports.__esModule = true;
exports.uiedbook = exports.renderer = exports.physics = exports.bgPainter = exports.audio = exports.speakerStop = exports.speaker = exports.spriteSheetPainter = exports.imgPainter = exports.entity = exports.re = exports.appendCanvas = exports.buildCanvas = exports.swipe = exports.continuesKeys = exports.onKeys = exports.clear = exports.getKey = exports.remove = exports.retrieve = exports.store = exports.log = exports.check = exports.keep = exports.debounce = exports.download = exports.create = exports.makeClass = exports.rad = exports.get = exports.error = exports.intersect = exports.isEmptyObject = exports.xhr = exports.route = exports.buildTo = exports.build = exports.animate = exports.media = exports.css = exports.u = void 0;
/** the u function is a powerful selector function with added attributes to manipulate dom elements, it does it in a more fast and efficient manner. */
var u = function () {
    var uied = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        uied[_i] = arguments[_i];
    }
    var eU = uied.length, el = uied[0], ifAll_OrNum = uied[1];
    var all = false;
    var e;
    if (eU === 1 && typeof el === "string") {
        e = document.querySelector(el);
    }
    else {
        if (eU === 1 && typeof el !== "string") {
            e = el;
        }
        else {
            if (eU === 2 && typeof ifAll_OrNum !== "number") {
                //all el is being grabbed from the dom
                all = true;
                e = document.querySelectorAll(el);
            }
            else {
                if (typeof ifAll_OrNum === "number") {
                    e = document.querySelectorAll(el)[ifAll_OrNum];
                }
            }
        }
    }
    if (!e)
        throw new Error('element "' + el + '" not found');
    // the funny parts or extra methods that can be used
    // to manipulate dom  elements are below!
    return {
        // for styling
        style: function (obj) {
            var _loop_1 = function (k) {
                var v = obj[k];
                if (!all) {
                    e.style[k] = v;
                }
                else {
                    e.forEach(function (element) {
                        element.style[k] = v;
                    });
                }
            };
            for (var k in obj) {
                _loop_1(k);
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").style({
        width: "100%",
        height: "100%",
        color: "black"
    })
    
    */
        /**  for manipulating objects
         *
         *
         * *** HOW TO USE ***
  
        *u(object).config({
         name: "object",
         powerof: (pow, n){ return Math.pow(pow, n)}
         })
  
        */
        config: function (obj) {
            if (obj) {
                for (var k in obj) {
                    var v = obj[k];
                    e[k] = v;
                }
            }
            else {
                throw new Error("the variable is not an object " + obj);
            }
        },
        /*
     *** HOW TO USE ***
    
    u(object).config({
        name: "object",
        powerof: (pow, n){ return Math.pow(pow, n)}
    })
    
    */
        appendTo: function (type, attribute, number) {
            if (number === void 0) { number = 1; }
            // for adding new elements more powerfully
            if (typeof attribute === "undefined" || typeof type === "undefined") {
                throw new Error("type or attribute not given | not enough parameters to work with");
            }
            var frag = new DocumentFragment();
            if (!all) {
                for (var i = 0; i < number; i++) {
                    var element = document.createElement(type);
                    for (var k in attribute) {
                        var v = attribute[k];
                        element.setAttribute(k, v);
                    }
                    frag.append(element);
                }
                e.append(frag);
            }
            else {
                for (var i = 0; i < number; i++) {
                    var element = document.createElement(type);
                    for (var k in attribute) {
                        var v = attribute[k];
                        element.setAttribute(k, v);
                    }
                    frag.append(element);
                }
                e.forEach(function (el) {
                    el.append(frag);
                });
            }
            return;
        },
        /*
         *** HOW TO USE ***
        
        u("#container").appendTo("div"{
            className: "newdiv",
            id: "newdiv"
        }, 5)
        
        */
        // advance event listener
        on: function (type, callback) {
            function evft(e) {
                //   e.stopPropagation()
                e.preventDefault();
                return callback(e);
            }
            if (!all) {
                return e.addEventListener(type, evft, false);
            }
            else {
                return e.forEach(function (element) {
                    element.addEventListener(type, evft, false);
                });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").on("click", ()=>{
        console.log("clicked!")
    })
    
    */
        // for adding attributes to the dom elements
        attr: function (attribute_object) {
            if (typeof attribute_object !== "object")
                return;
            if (!all) {
                for (var prop in attribute_object) {
                    var attr = attribute_object[prop];
                    if (prop === null) {
                        return e.getAttribute(prop);
                    }
                    else {
                        e.setAttribute(prop, attr);
                    }
                }
            }
            else {
                var _loop_2 = function (prop) {
                    var attr = attribute_object[prop];
                    if (prop === null) {
                        return { value: e.getAttribute(prop) };
                    }
                    else {
                        e.forEach(function (el) { return el.setAttribute(prop, attr); });
                    }
                };
                for (var prop in attribute_object) {
                    var state_1 = _loop_2(prop);
                    if (typeof state_1 === "object")
                        return state_1.value;
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
        removeAttr: function (attr) {
            if (attr === null) {
                return;
            }
            if (!all) {
                e.removeAttribute(attr);
            }
            else {
                e.forEach(function (el) { return el.removeAttribute(attr); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").removeAttr("className")
    
    */
        // for adding inner html contents to the dom elements
        html: function (code) {
            if (!all) {
                e.innerHTML = code;
            }
            else {
                e.forEach(function (el) { return (el.innerHTML = code); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").html("<div> hello am a div </div>")
    
    */
        // for adding text to the dom elements
        text: function (text) {
            if (!all) {
                e.textContent = text;
            }
            else {
                e.forEach(function (el) { return (el.textContent = text); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").html("hello am text")
    
    
    */
        // for adding class to the dom elements
        addClass: function (clas) {
            if (!all) {
                e.classList.add(clas);
            }
            else {
                e.forEach(function (el) { return el.classList.add(clas); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").addClass(".class")
    
    */
        // for removing class from the dom elements
        removeClass: function (clas) {
            if (!all) {
                e.classList.remove(clas);
            }
            else {
                e.forEach(function (el) { return el.classList.remove(clas); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").removeClass(".class")
    
    */
        // for hiding the dom elements
        hide: function () {
            if (!all) {
                e.style.display = "none";
            }
            else {
                e.forEach(function (el) { return (el.style.display = "none"); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").hide()
    
    */
        // for toggling the display of elements
        toggleClass: function () {
            if (!all) {
                if (e.style.display === "none") {
                    e.style.display = "block";
                }
                else {
                    e.style.display = "none";
                }
            }
            else {
                if (e[0].style.display === "none") {
                    e.forEach(function (el) { return (el.style.display = "block"); });
                }
                else {
                    e.forEach(function (el) { return (el.style.display = "none"); });
                }
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").toggleClass(".class")
    
    */
        // for displaying the dom elements
        show: function () {
            if (!all) {
                e.style.display = "block";
            }
            else {
                e.forEach(function (el) { return (el.style.display = "block"); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").show()
    
    */
        // for resizing the dom elements
        box: function (w, h, c) {
            if (c === void 0) { c = "transparent"; }
            if (!all) {
                e.style.width = w;
                e.style.height = h;
                e.style.backgroundColor = c;
            }
            else {
                e.forEach(function (el) {
                    el.style.width = w;
                    el.style.height = h;
                    el.style.backgroundColor = c;
                });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").box("100px","100%","#ff9800")
    
    */
        // for scrollingthe dom elements into view
        scrollTo: function (s) {
            if (s === void 0) { s = true; }
            e.scrollIntoView(s);
        },
        /*
     *** HOW TO USE ***
    
    u("#container").scrollTo()
    
    */
        // for adding elements to the dom elements
        add: function (nod) {
            e.append(nod);
        },
        /*
     *** HOW TO USE ***
    let span = document.createElement("span");
    u("#container").add(span)
    
    */
        // for removing elements to the dom elements
        remove: function (ind) {
            e.removeChild(e.childNodes[ind]);
        },
        /*
     *** HOW TO USE ***
    
    u("#container").remove(0)
    
    */
        // for making the dom elements fulscreen
        fullScreen: function () {
            return {
                toggle: function () {
                    if (!document.fullscreenElement) {
                        e.requestFullscreen()["catch"](function (err) {
                            alert("Error! failure attempting to enable full-screen mode: " + err.message + " (" + err.name + ")");
                        });
                    }
                    else {
                        document.exitFullscreen();
                    }
                },
                set: function () {
                    e.requestFullscreen()["catch"](function (err) {
                        alert("Error! failure attempting to enable\n full-screen mode: " + err.message + "\n (" + err.name + ")");
                    });
                },
                exist: function () {
                    document.exitFullscreen();
                }
            };
        }
        /*
     *** HOW TO USE ***
    
    u("#container").fullscreen().toggle()
    u("#container").fullscreen().exist()
    u("#container").fullscreen().set()
    
    */
    };
};
exports.u = u;
/** This is for creating css styles using javascipt
 *
 * HOW TO USE
 *
 * css("#container",
{
  *
    height: "100%",
    *
    height: "100%",
    *
    background-color: "#ff9800"
    *
})
*/
var css = function (name, sel, properties) {
    if (typeof sel === "object") {
        properties = sel;
        sel = "";
    }
    var styS = "" + name + sel + "" + "{";
    var styE = "}";
    var style = "", totalStyle = "";
    if (properties) {
        for (var k in properties) {
            var v = properties[k];
            style += "" + k + ": " + v + ";";
        }
    }
    var styleTag = document.querySelector("style");
    if (styleTag === null) {
        styleTag = document.createElement("style");
    }
    totalStyle += styleTag.innerHTML;
    totalStyle += styS + style + styE;
    styleTag.innerHTML = totalStyle;
    document.head.append(styleTag);
};
exports.css = css;
/** This is for creating css @media styles using javascipt
 *
 * examples.
 *
 * media("min-width: 790px",
 * *
["#container",
{
  *
    width: "100%",
    *
    height: "100%",
    *
    background-color: "#0000"
    *
}]
)

["#header",
{
    width: "100%",
    *
    height: "20%",
    *
    background-color: "#fff"
    *
}]
*
)
 *
*/
var media = function (value) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    var styS = "@media only screen and (" + value + ") " + "{", styE = "}";
    var style = "  ", aniSty = " ";
    var proplen = properties.length;
    var totalAnimation, Animation = "  ";
    var animationStep = function (num) {
        for (var k in properties[num][1]) {
            var v = properties[num][1][k];
            style += "" + k + ": " + v + ";";
        }
        aniSty += "" + properties[num][0] + "{" + style + "}";
        return aniSty;
    };
    for (var i = 0; i < proplen; i++) {
        Animation += animationStep(i);
    }
    var aniStyleTag = document.querySelector("style");
    if (aniStyleTag === null) {
        aniStyleTag = document.createElement("style");
    }
    aniStyleTag.media = "screen";
    totalAnimation = aniStyleTag.innerHTML;
    totalAnimation += styS + Animation + styE;
    aniStyleTag.innerHTML = totalAnimation;
    document.head.append(aniStyleTag);
};
exports.media = media;
/** This is for creating css animations using javascipt
 *
 * example.
 *
 *
 * animate("popanimation",
 *  *
["from",
{
   *
    transform: "scale3D(2)" ,
     *
    height: "10%",
     *
    background-color: "#0000"
     *
}]
 *
)
 *
 *
["to",
{
   *
    transform: "scale3D(1)" ,
     *
    height: "100%",
     *
    background-color: "#ff9800"
     *
}]
)

 *
 *
 *
*/
var animate = function (name) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    var styS = "@keyframes " + name + " " + "{", styE = "}", proplen = properties.length;
    var style = " ", aniSty = " ", Animation = "  ", totalAnimation = null;
    var animationStep = function (num) {
        for (var k in properties[num][1]) {
            var v = properties[num][1][k];
            style += "" + k + ": " + v + ";";
        }
        aniSty += "" + properties[num][0] + "{" + style + "}";
        return aniSty;
    };
    for (var i = 0; i < proplen; i++) {
        Animation += animationStep(i);
    }
    var aniStyleTag = document.querySelector("style");
    if (aniStyleTag === null) {
        aniStyleTag = document.createElement("style");
    }
    aniStyleTag.media = "screen";
    totalAnimation = aniStyleTag.innerHTML;
    totalAnimation += styS + Animation + styE;
    aniStyleTag.innerHTML = totalAnimation;
    document.head.append(aniStyleTag);
};
exports.animate = animate;
/**
 * The build is a context used as a template engine for building layouts
 *
 * example.
 *
 * const p = build(
 * *
  "div",
  {
    *
    title: "title",
    *
    innerText: "am a title",
    *
    onclick: function () {
      *
      console.log("i was clicked");
      *
    }
    *
  },
  *
  build("span", { innerText: "am a span", title: "title" })
  *
);
 */
var build = function () {
    var layouts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        layouts[_i] = arguments[_i];
    }
    function createElement(type, op, chil) {
        if (type === void 0) { type = ""; }
        if (op === void 0) { op = {}; }
        var element = document.createElement(type);
        for (var k in op) {
            var v = op[k];
            element.setAttribute(k, v);
        }
        if (chil) {
            if (Array.isArray(chil)) {
                var frag_1 = new DocumentFragment();
                // templating testing should be done here
                chil.forEach(function (ch) {
                    frag_1.append(ch);
                });
                element.append(frag_1);
            }
            else {
                element.append(chil);
            }
        }
        // return the element after building the dom objects
        return element;
    }
    var i = 0;
    if (layouts.length > 1) {
        i = layouts.length;
        var frag = new DocumentFragment();
        while (i > 0) {
            // templating testing should be done here
            var ele = createElement(layouts[i][0], layouts[i][1], layouts[i][2]);
            frag.append(ele);
            i--;
        }
        return frag;
    }
    else {
        if (typeof layouts[0] === "string") {
            // templating testing should be done here
            var element = createElement(layouts[0][0], layouts[0][1], layouts[0][2]);
            return element;
        }
    }
    return new DocumentFragment();
};
exports.build = build;
/**
 * this context used for rendering built layout to a parent or the document body
 *
 * example
 *
 * const p =   build("span", { innerText: "am a span", title: "title" });
 *
buildTo(p, "body");
*/
var buildTo = function (child, parent) {
    if (typeof parent === "string") {
        document.querySelectorAll(parent).forEach(function (par) { return par.appendChild(child); });
    }
    else {
        parent.append(child);
    }
};
exports.buildTo = buildTo;
var routes = {};
var route = function (path, templateId, controller) {
    if (path === void 0) { path = "/"; }
    var link = document.createElement("a");
    link.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
    routes[path] = { templateId: templateId, controller: controller };
    return link;
};
exports.route = route;
/** A basic router for uiedbook
 * example.
 *
 * route("/", "home", function () {
*
get("div").innerText = " welcome to the home page";
*
  console.log("we are at the home page");
*
});
*
*
const about = route("/about", "about", function () {
*
*   get("div").innerText = " welcome to the about page";
*
*   get("a").href = about;
*
  console.log("we are at the about page");
  *
});
 *
 *
 *
*/
var router = function (e) {
    e.preventDefault();
    var url = window.location.hash.slice(1) || "/";
    var route = routes[url];
    if (route) {
        route.controller();
    }
    // path = path ? path : "";
    //   if (this.mode === "history") {
    //     history.pushState(null, null, this.root + this.clearSlashes(path));
    //   } else {
    //     window.location.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
    //   }
};
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
/** in construction */
var xhr = function (type, url) {
    // for sending requests
    var xhrRequest = new XMLHttpRequest();
    var result = null;
    xhrRequest.open(type, url, true);
    result = xhrRequest.onload = function () {
        return xhrRequest.response;
    };
    xhrRequest.send();
    return result;
};
exports.xhr = xhr;
/** for checking for empty objects */
var isEmptyObject = function (obj) {
    for (var name_1 in obj) {
        return false;
    }
    return true;
};
exports.isEmptyObject = isEmptyObject;
/*
 *** HOW TO USE ***
let objA = { a: "kd" };
let objB = {};
console.log(isEmptyObject(objA));
// false
console.log(isEmptyObject(objB));
// true

*/
var intersect = function (target, opt, callback) {
    var root = opt.root, rootMargin = opt.rootMargin, threshold = opt.threshold, options = {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold
    }, observer = new IntersectionObserver(callback, options), child = document.querySelector(target);
    if (child) {
        observer.observe(child);
    }
};
exports.intersect = intersect;
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
/** `error("there was an error!");` */
var error = function (msg) {
    throw new Error(msg);
};
exports.error = error;
/** the get function is the u function but without any sweet methods it is used if you want to enjoy the easiness of the u function but don't want to use it awesome methods */
var get = function () {
    var uied = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        uied[_i] = arguments[_i];
    }
    var el = uied[0], ifAll_OrNum = uied[1];
    var e;
    if (uied.length === 1) {
        e = document.querySelector(el);
    }
    else {
        if (uied.length === 2 && typeof ifAll_OrNum !== "number") {
            e = document.querySelectorAll(el);
        }
        else {
            if (typeof ifAll_OrNum === "number") {
                e = document.querySelectorAll(el)[ifAll_OrNum];
            }
        }
    }
    return e;
};
exports.get = get;
/*
 *** HOW TO USE ***
let container = get("container");
*/
/** for getting more purer random number */
var rad = function (num) {
    return Math.floor(Math.random() * Math.floor(num));
};
exports.rad = rad;
/*
 *** HOW TO USE ***
rad(5);
// you will get random values from 0 to 5
*/
/** for making css classes */
var makeClass = function (name, stylings) {
    var clas = document.createElement("style");
    var styling = "" + name + "{" + stylings + "}";
    clas.innerHTML = styling;
    document.body.appendChild(clas);
};
exports.makeClass = makeClass;
/*
 *** HOW TO USE ***
class(".container","color: red;");
*/
/** it's self explanatory some how */
var create = function (type, id) {
    if (type === void 0) { type = "div"; }
    if (id === void 0) { id = ""; }
    var element = document.createElement(type);
    element.setAttribute("id", id);
    document.body.appendChild(element);
    return element;
};
exports.create = create;
/*
 *** HOW TO USE ***
let div = create("div","newdiv");
*/
/** an easy to use download function that returns the link element that should be clicked */
var download = function (type, source, name) {
    var file = new Blob([source.buffer], { type: type });
    var fileURL = URL.createObjectURL(file);
    var linkElement = document.createElement("a");
    // add the file url
    linkElement.setAttribute("href", fileURL);
    // add the download attribute with name suggestion
    linkElement.setAttribute("download", name);
    return linkElement;
};
exports.download = download;
var debounce = function (func, timeout) {
    if (timeout === void 0) { timeout = 600; }
    var timer = null;
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        func();
    }, timeout);
};
exports.debounce = debounce;
/*
 *** HOW TO USE ***
debounce(function , 1000);
*/
var callStack = [];
/** the grandmother algorith for managing ids of anything, don't use it if you don't understand it's power it looks simple. */
var keep = function (id, time) {
    var callObj = typeof id === "object" ? id : null;
    var runtime = typeof time === "number" ? time : 1;
    if (typeof id === "string" && typeof runtime === "number") {
        if (callStack.indexOf(id) > -1) {
            return;
        }
        for (; runtime > 0; runtime--) {
            callStack.push(id);
        }
    }
    else {
        if (callObj !== null) {
            // eslint-disable-next-line prefer-const
            for (var k in callObj) {
                var v = callObj[k];
                if (callStack.indexOf(k) > -1) {
                    callStack.splice(Number(id), 1);
                    return true;
                }
                else {
                    for (; v > 0; v--) {
                        callStack.push(k);
                    }
                }
            }
        }
    }
};
exports.keep = keep;
var check = function (id) {
    var ind = callStack.indexOf(id);
    if (ind > -1) {
        callStack.filter(function (key) { return !(id === key); });
        // callStack.splice(ind,1)
        return true;
    }
    else {
        return false;
    }
};
exports.check = check;
var log = function (message) {
    if (message) {
        console.log(message);
    }
    else {
        if (callStack.length > 0) {
            console.log(callStack);
            return callStack;
        }
    }
};
exports.log = log;
/** it's self explanatory some how */
var store = function (name, value) {
    localStorage.setItem(name, JSON.stringify(value));
};
exports.store = store;
var retrieve = function (name) {
    return localStorage.getItem(name);
};
exports.retrieve = retrieve;
var remove = function (name) {
    localStorage.removeItem(name);
};
exports.remove = remove;
var getKey = function (index) {
    return window.localStorage.key(index);
};
exports.getKey = getKey;
var clear = function () {
    localStorage.clear();
};
exports.clear = clear;
// rebuilt key event lister
var keyObject = function (keysArray, callBack) {
    return {
        keysArray: keysArray,
        callBack: callBack
    };
};
var keysStack = [];
var keepKeys = function (keys, callback) {
    var call = keyObject(keys, callback);
    keysStack.push(call);
};
var checkKeys = function (keys, e, delay) {
    function partOf(a, b) {
        var matches = 0;
        for (var i = 0; i < a.length; i++) {
            if (b.indexOf(a[i]) === -1) {
                matches++;
            }
        }
        return matches === a.length;
    }
    var _loop_3 = function (i) {
        if (!partOf(keysStack[i].keysArray, keys)) {
            (0, exports.debounce)(function () { return keysStack[i].callBack(e); }, delay);
        }
    };
    for (var i = 0; i < keysStack.length; i++) {
        _loop_3(i);
    }
};
/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
var onKeys = function (keys, callback, object, delay, lock) {
    if (object === void 0) { object = document; }
    if (delay === void 0) { delay = 0; }
    if (lock === void 0) { lock = false; }
    // for handling even more complicated key events,
    if (!keys || !callback) {
        throw new Error("no keys or callbacks given");
    }
    var temporaryKeys = [];
    keepKeys(keys, callback);
    object.addEventListener("keydown", function (e) {
        if (lock) {
            e.preventDefault();
        }
        if (temporaryKeys.indexOf(e.key) !== 0) {
            temporaryKeys.push(e.key);
        }
    }, false);
    object.addEventListener("keyup", function (e) {
        checkKeys(temporaryKeys, e, delay);
        temporaryKeys = [];
    }, false);
};
exports.onKeys = onKeys;
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

onKeys(["arrowRight","control"],callback,container);

*/
/** under construction!!!!!!! */
var continuesKeys = function (keys, callback, delay, object, lock) {
    if (delay === void 0) { delay = 0; }
    if (object === void 0) { object = document; }
    if (lock === void 0) { lock = true; }
    // for handling even more complicated key events,
    if (!keys || !callback) {
        throw new Error("no keys or callbacks given");
    }
    var temporaryKeys = [];
    keepKeys(keys, callback);
    object.addEventListener("keydown", function (e) {
        if (lock) {
            e.preventDefault();
        }
        if (temporaryKeys.indexOf(e.key) !== 0) {
            temporaryKeys.push(e.key);
        }
        checkKeys(temporaryKeys, e, delay);
        temporaryKeys = [];
    }, false);
};
exports.continuesKeys = continuesKeys;
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

continuesKeys(["arrowRight","control"],callback,500,true,container);

*/
var swipe = function (item) {
    var caller = {};
    var startX = 0, startY = 0;
    if (typeof item === "object") {
        for (var k in item) {
            var v = item[k];
            caller[k] = v;
        }
    }
    else {
        throw new Error("no call given for the swipe handler");
    }
    function handleTouchStart(e) {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }
    function handleTouchEnd(e) {
        var diffX = e.changedTouches[0].screenX - startX;
        var diffY = e.changedTouches[0].screenY - startY;
        var ratioX = Math.abs(diffX / diffY);
        var ratioY = Math.abs(diffY / diffX);
        var absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);
        if (absDiff < 10) {
            if (caller.touch) {
                callback.touch(caller.touch);
            }
        }
        if (ratioX > ratioY) {
            // left and right
            if (diffX >= 0) {
                if (caller.right) {
                    callback.right(caller.right);
                }
            }
            else {
                if (caller.left) {
                    callback.left(caller.left);
                }
            }
            // up and down
        }
        else {
            if (diffY >= 0) {
                if (caller.down) {
                    callback.down(caller.down);
                }
            }
            else {
                if (caller.up) {
                    callback.up(caller.up);
                }
            }
        }
    }
    document.body.addEventListener("touchstart", handleTouchStart);
    document.body.addEventListener("touchend", handleTouchEnd);
    var callback = {
        touch: function (callback) {
            return callback();
        },
        right: function (callback) {
            return callback();
        },
        left: function (callback) {
            return callback();
        },
        down: function (callback) {
            return callback();
        },
        up: function (callback) {
            return callback();
        }
    };
};
exports.swipe = swipe;
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
/** this is used for creating pixel stable game views across all screen width with no pixelation problem try and see the magic */
var buildCanvas = function (id, w, h) {
    if (w === void 0) { w = window.innerWidth; }
    if (h === void 0) { h = window.innerHeight; }
    var canv = document.createElement("canvas"), context = canv.getContext("2d"), backingStores = [
        "webkitBackingStorePixelRatio",
        "mozBackingStorePixelRatio",
        "msBackingStorePixelRatio",
        "oBackingStorePixelRatio",
        "backingStorePixelRatio"
    ], deviceRatio = window.devicePixelRatio, backingRatio = backingStores.reduce(function (prev, curr) {
        // eslint-disable-next-line no-prototype-builtins
        return context.hasOwnProperty(curr) ? context[curr] : 1;
    }), ratio = deviceRatio / Number(backingRatio);
    canv.id = typeof id === "undefined" ? "canvas" : id;
    canv.width = Math.round(w * ratio);
    canv.height = Math.round(h * ratio);
    canv.style.width = w + "px";
    canv.style.height = h + "px";
    canv.style.backgroundColor = "black";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return canv;
};
exports.buildCanvas = buildCanvas;
var appendCanvas = function (id, h, w, parent) {
    var _a;
    /*same as above but with a
  parent to append directly */
    var cv = (0, exports.buildCanvas)(id, h, w);
    var par;
    if (typeof parent !== "string" && typeof parent !== "undefined") {
        par = parent;
    }
    else {
        if (typeof parent === "string") {
            par = (_a = document.querySelector(parent)) !== null && _a !== void 0 ? _a : undefined;
        }
        else {
            if (typeof parent === "undefined") {
                par = document.body;
            }
        }
    }
    par.style.boxSizing = "border-box";
    par.append(cv);
    return cv;
};
exports.appendCanvas = appendCanvas;
/** this is the RE game time line algorimth */
exports.re = (function () {
    /*Re is an interface
   where game views (view) are
   sequenced on.*/
    var games = [];
    // the build function is for creating the game div
    // and allowing the dev to build upon it
    function build(viewID) {
        var frame = document.createElement("div");
        if (viewID) {
            frame.setAttribute("id", viewID);
        }
        (0, exports.u)(frame).style({
            height: "100vh",
            width: "100vw",
            backgroundColor: "black"
        });
        return frame;
    }
    // the mount function notifies the flow function
    // that the game should be started
    // and the callback can be used to run a function
    // perculiar to this effect.
    function mount(template, callback) {
        (0, exports.u)("body").appendTo("div", { id: "RE_gameframe" });
        if (games.length === 1) {
            return;
        }
        else {
            games.push(template);
        }
        if (!callback)
            return;
        return callback();
    }
    // the flow function ochastrate the game play
    function flow(fram) {
        fram.append(games[0]);
    }
    // the start function starts the game
    // and manathe dom
    var start = function () {
        if (games.length < 1 || games.length > 1) {
            throw new Error("RE: re.mount() should be called and given a built game world");
        }
        (0, exports.u)(document.body).style({
            margin: "0px",
            padding: "0px",
            boxSizing: "border-box",
            border: "none"
        });
        (0, exports.u)("#RE_gameframe").style({
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0px",
            left: "0px",
            bottom: "0px",
            right: "0px",
            zIndex: "0",
            backgroundColor: "black",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px",
            padding: "0px",
            boxSizing: "border-box"
        });
        var gameframe = (0, exports.get)("#RE_gameframe");
        flow(gameframe);
    };
    // this stops the game
    var cancel = function () {
        var fram = (0, exports.get)("#RE_gameframe");
        fram.innerHTML = "";
        exports.renderer.toggleRendering();
        // fram.append(vsg())
    };
    var widget = function (name) {
        this.wig = document.createElement("div");
        this.wig.className = name;
        this.wig.id = name;
        document.body.append(this.wig);
        return this.wig;
    };
    var imagesArray = [], audioArray = [];
    function loadImage(img, id) {
        if (typeof img === "object" && !id) {
            for (var i = 0; i < img.length; i++) {
                var p = new Image();
                p.src = img[i][0];
                p.id = img[i][1];
                imagesArray.push(p);
            }
        }
        else {
            if (typeof img === "string" && id) {
                var i = new Image();
                i.src = img;
                i.id = id;
                imagesArray.push(i);
            }
            else {
                throw new Error("cannot load image(s)");
            }
        }
    }
    function loadAudio(aud, id) {
        if (typeof aud === "object" && !id) {
            for (var i = 0; i < aud.length; i++) {
                var p = new Audio();
                p.src = aud[i][0];
                p.id = aud[i][1];
                audioArray.push(p);
            }
        }
        else {
            if (typeof aud === "string" && id) {
                var i = new Image();
                i.src = aud;
                i.id = id;
                imagesArray.push(i);
            }
            else {
                throw new Error("cannot load image(s)");
            }
        }
    }
    function getAud(id) {
        var p;
        for (var i = 0; i < audioArray.length; i++) {
            if (audioArray[i].id === id) {
                p = audioArray[i];
                break;
            }
        }
        if (p) {
            return p;
        }
        else {
            throw new Error('RE: audio id "' + id + '" not found');
        }
    }
    function getImg(id) {
        var p;
        for (var i = 0; i < imagesArray.length; i++) {
            if (imagesArray[i].id === id) {
                p = imagesArray[i];
                break;
            }
        }
        if (p) {
            return p;
        }
        else {
            throw new Error('RE: image of id "' + id + '" not found');
        }
    }
    return {
        build: build,
        makeWidget: widget,
        mount: mount,
        start: start,
        loadImage: loadImage,
        loadAudio: loadAudio,
        getImg: getImg,
        getAud: getAud,
        cancel: cancel
    };
})();
// END OF THE main RE ENGINE////////////////////////
/*
other TODOs stuff will be built here
*/
var entity = function (name, painter, behaviors) {
    /*an entity is any object or thing
   that can be added to the game world*/
    //this.id = name || "none" //name of the entity for identification can be used out side here******
    this.name = name || "none";
    this.painter = painter || {}; // callback for paint the entity     can be used out side here******
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
    this["delete"] = false; //  to delete an entity                        can be used out side here******
    this.border = true; //   to make the entity observer sides or not   can be used out side here******
    this.isHit = false;
};
exports.entity = entity;
exports.entity.prototype = {
    // this algorimth is for calling the paint function
    // to make it functional when seen at runtime
    update: function (context, lastDeltalTime) {
        if (typeof this.painter.update !== "undefined" && this.visible) {
            this.painter.update(this, context, lastDeltalTime);
        }
        else {
            // throw new Error(`RE: entity with name of ${this.name} has no update function`);
        }
    },
    paint: function (context, lastDeltalTime) {
        if (typeof this.painter.paint !== "undefined" && this.visible) {
            this.painter.paint(this, context, lastDeltalTime);
        }
        else {
            throw new Error("RE: entity with name of " + this.name + " has no paint function");
        }
    },
    observeBorder: function (w, h) {
        if (this.top <= 0) {
            this.top *= 0;
        }
        else {
            if (h && this.top + this.height >= h) {
                this.top = h - this.height;
            }
        }
        if (this.left <= 0) {
            this.left *= 0;
        }
        else {
            if (w && this.left + this.width >= w) {
                this.left = w - this.width;
            }
        }
    },
    run: function (context, lastDeltalTime) {
        // here the entity don't have to be visble
        if (typeof this.behaviors !== "undefined") {
            this.behaviors(this, context, lastDeltalTime);
        }
    }
};
var imgPainter = function (img, delay) {
    if (delay === void 0) { delay = 1; }
    this.image = img;
    this.delay = delay;
    this.range = 0;
};
exports.imgPainter = imgPainter;
exports.imgPainter.prototype = {
    // paint only no update
    paint: function (entity, context) {
        this.range++;
        if (this.range % this.delay === 0) {
            context.drawImage(this.image, entity.left, entity.top, entity.width, entity.height);
        }
        if (this.range > 100) {
            this.range = 1;
        }
    }
};
// this is a powerful sprite algorith for
// rendering the exact sprite from a
// spritesheet in successful orders
var spriteSheetPainter = function (img, horizontal, vertical, delay) {
    if (horizontal === void 0) { horizontal = 1; }
    if (vertical === void 0) { vertical = 1; }
    if (delay === void 0) { delay = 1; }
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
    this.changeSheet = function (img, horizontal, vertical, delay) {
        if (horizontal === void 0) { horizontal = 0; }
        if (vertical === void 0) { vertical = 0; }
        if (delay === void 0) { delay = 1; }
        this.image = img;
        this.framesWidth = Math.round(this.image.width / horizontal);
        this.framesHeight = Math.round(this.image.height / vertical);
        this.horizontalPictures = horizontal;
        this.verticalPictures = vertical;
        this.delay = delay;
    };
    this.animateFrameOf = function (frameY) {
        if (frameY === void 0) { frameY = 0; }
        this.frameHeightCount = frameY;
        if (this.frameWidthCount <= this.horizontalPictures - 2) {
            this.frameWidthCount++;
        }
        else {
            this.frameWidthCount = 0;
        }
    };
};
exports.spriteSheetPainter = spriteSheetPainter;
exports.spriteSheetPainter.prototype = {
    update: function () {
        this.range++;
        if (this.range % this.delay === 0 && this.animate) {
            if (this.animateAllFrames) {
                if (this.frameHeightCount < this.verticalPictures - 1) {
                    if (this.frameWidthCount <= this.horizontalPictures - 2) {
                        this.frameWidthCount++;
                    }
                    else {
                        this.isLastImage = true;
                        this.frameWidthCount = 0;
                        this.frameHeightCount++;
                    }
                }
                else {
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
    paint: function (entity, context) {
        context.drawImage(this.image, this.framesWidth * this.frameWidthCount, this.framesHeight * this.frameHeightCount, this.framesWidth, this.framesHeight, entity.left, entity.top, entity.width, entity.height);
    }
};
var speaker = function (text, language, volume, rate, pitch) {
    // common languages (not supported by all browsers)
    // en - english,  it - italian, fr - french,  de - german, es - spanish
    // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean
    if (language === void 0) { language = ""; }
    if (volume === void 0) { volume = 1; }
    if (rate === void 0) { rate = 1; }
    if (pitch === void 0) { pitch = 1; }
    // build utterance and speak
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.volume = volume * 0.3 * 3;
    utterance.rate = rate;
    utterance.pitch = pitch;
    speechSynthesis.speak(utterance);
};
exports.speaker = speaker;
var speakerStop = function () { return speechSynthesis && speechSynthesis.cancel(); };
exports.speakerStop = speakerStop;
/** play mp3 or wav audio from a local file or url  */
var audio = function (audio, loop, volumeScale) {
    if (loop === void 0) { loop = 0; }
    if (volumeScale === void 0) { volumeScale = 1; }
    this.audio = audio;
    this.audio.loop = loop;
    this.audio.volume = volumeScale * 0.3;
    return this.audio;
};
exports.audio = audio;
exports.audio.prototype = {
    play: function () {
        this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    },
    toggle: function () {
        if (this.audio.pause) {
            this.audio.play();
        }
        else {
            this.audio.pause();
        }
    }
};
var bgPainter = function (img, speed, up, left) {
    if (speed === void 0) { speed = 10; }
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
exports.bgPainter = bgPainter;
exports.bgPainter.prototype = {
    update: function () {
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
    paint: function (canvas) {
        var context = canvas.getContext("2d");
        context.drawImage(this.image, this.left, this.top, canvas.width, this.height);
        if (this.GoesLeft) {
            context.drawImage(this.image, this.left + this.width, this.top, canvas.width, canvas.height);
        }
        else {
            context.drawImage(this.image, this.left, this.top - this.height, canvas.width, this.height);
        }
    }
};
exports.physics = (function () {
    function detectCollision(ent, name, reduce) {
        if (reduce === void 0) { reduce = 0; }
        for (var j = 0; j < name.length; j++) {
            if (ent.left + reduce > name[j].left + name[j].width ||
                ent.left + ent.width < name[j].left + reduce ||
                ent.top > name[j].top + name[j].height ||
                ent.top + ent.height < name[j].top + reduce) {
                // console.log("no collisions");
                // return false;
                continue;
            }
            else {
                // console.log(`${ent.name} has collided with name of ${name[j].name}`);
                // return true;
                name[j].isHit = true;
            }
        }
    }
    return {
        detectCollision: detectCollision
    };
})();
/** game rendering algorithm */
exports.renderer = (function () {
    var canvas, id, // for pausing or playing the game
    context, 
    // variables for the timing
    fps, 
    // background varible
    lastdt = 0, nextdt = 0, pause = false, deltaTime;
    var bg = [], 
    // entity storage array
    entitysArray = [];
    function bgPaint(img, speed, up, left) {
        var bgImg = new exports.bgPainter(img, speed, up, left);
        bg.push(bgImg);
        return bgImg;
    }
    function animatebg(canvas) {
        if (bg === [])
            return false;
        bg.forEach(function (b) {
            b.paint(canvas);
            b.update();
        });
    }
    function _assemble() {
        var players = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            players[_i] = arguments[_i];
        }
        if (!players)
            throw new Error("RE: No players assembled");
        players.forEach(function (player) {
            entitysArray.push(player);
        });
        return entitysArray;
    }
    function copyCanvasTo(c, opacity, border) {
        var cx = c.getContext("2d");
        cx.drawImage(canvas, 0, 0, c.width, c.height);
        c.style.opacity = opacity;
        c.style.borderRadius = border;
        return c;
    }
    function toggleRendering() {
        if (pause) {
            window.requestAnimationFrame(animate);
            return (pause = false);
        }
        else {
            window.cancelAnimationFrame(id);
            return (pause = true);
        }
    }
    function animate(dt) {
        id = window.requestAnimationFrame(animate);
        deltaTime = dt - lastdt;
        lastdt = dt;
        nextdt += Math.round(deltaTime);
        if (nextdt > fps) {
            try {
                context.clearRect(0, 0, canvas.width, canvas.height);
                animatebg(canvas);
                entitysArray.forEach(function (ent, i) {
                    if (ent["delete"]) {
                        entitysArray.splice(i, 1);
                        --i;
                    }
                    if (ent.border) {
                        ent.observeBorder(canvas.width, canvas.height);
                    }
                    //   console.log(entitysArray);
                    ent.update(context, dt);
                    ent.run(context, dt);
                    ent.paint(context, dt);
                });
            }
            catch (error) {
                throw new Error("RE: the canvas cannot be animated due to some errors > " + error);
            }
        }
        nextdt = 0;
    }
    function _render(canv, fpso) {
        if (fpso === void 0) { fpso = 0; }
        if (!canv) {
            throw new Error("RE: game needs to be rendered EXP: renderer.render(canvas)");
        }
        canvas = canv;
        context = canvas.getContext("2d");
        fps = fpso;
        animate(0);
    }
    return {
        render: _render,
        assemble: _assemble,
        toggleRendering: toggleRendering,
        backgroundImage: bgPaint,
        copyCanvasTo: copyCanvasTo
    };
})();
exports.uiedbook = {
    css: exports.css,
    media: exports.media,
    animate: exports.animate,
    build: exports.build,
    buildTo: exports.buildTo,
    xhr: exports.xhr,
    u: exports.u,
    isEmptyObject: exports.isEmptyObject,
    intersect: exports.intersect,
    error: exports.error,
    get: exports.get,
    rad: exports.rad,
    makeClass: exports.makeClass,
    create: exports.create,
    download: exports.download,
    debounce: exports.debounce,
    keep: exports.keep,
    check: exports.check,
    log: exports.log,
    store: exports.store,
    retrieve: exports.retrieve,
    remove: exports.remove,
    getKey: exports.getKey,
    clear: exports.clear,
    onKeys: exports.onKeys,
    continuesKeys: exports.continuesKeys,
    swipe: exports.swipe,
    buildCanvas: exports.buildCanvas,
    appendCanvas: exports.appendCanvas,
    re: exports.re,
    entity: exports.entity,
    imgPainter: exports.imgPainter,
    spriteSheetPainter: exports.spriteSheetPainter,
    audio: exports.audio,
    bgPainter: exports.bgPainter,
    renderer: exports.renderer,
    speaker: exports.speaker,
    speakerStop: exports.speakerStop,
    physics: exports.physics,
    route: exports.route
};
// 40 apis contexts
if (typeof window !== "undefined") {
    window.uiedbook = exports.uiedbook;
}
