/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  Apache;



                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 
YOU SHOULD GET A COPY OF THE APACHE LICENSE V 2.0 IF IT DOESN'T ALREADY COME WITH THIS MODULE 
*/

"use strict";
const css = (name, sel, properties) => {
  /*This is for creating
 css styles using javascipt*/
  if (typeof sel === "object") {
    properties = sel;
    sel = "";
  }
  const styS = "" + name + sel + "" + "{";
  const styE = "}";
  let style = "",
    totalStyle = "";
  for (const [k, v] of Object.entries(properties)) {
    style += "" + k + ": " + v + ";";
  }
  let styleTag = document.querySelector("style");
  if (styleTag === null) {
    styleTag = document.createElement("style");
  }
  totalStyle += styleTag.innerHTML;
  totalStyle += styS + style + styE;
  styleTag.innerHTML = totalStyle;
  document.head.append(styleTag);
};

/*

css("#container",
{
    height: "100%",
    height: "100%",
    background-color: "#ff9800"
})
*/

const media = (value, ...properties) => {
  /* This is for creating css  
 @media styles using javascipt*/
  const styS = "@media only screen and (" + value + ") " + "{",
    styE = "}";
  let style = "  ",
    aniSty = " ";
  const proplen = properties.length;
  let totalAnimation,
    Animation = "  ";
  const animationStep = num => {
    for (const [k, v] of Object.entries(properties[num][1])) {
      style += "" + k + ": " + v + ";";
    }
    aniSty += "" + properties[num][0] + "{" + style + "}";
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) {
    Animation += animationStep(i);
  }
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) {
    aniStyleTag = document.createElement("style");
  }
  aniStyleTag.media = "screen";
  totalAnimation = aniStyleTag.innerHTML;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
};

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

const animate = (name, ...properties) => {
  /*This is for creating css  
 animations  using javascipt*/
  const styS = "@keyframes " + name + " " + "{",
    styE = "}",
    proplen = properties.length;

  let style = " ",
    aniSty = " ",
    Animation = "  ",
    totalAnimation = null;

  const animationStep = num => {
    for (const [k, v] of Object.entries(properties[num][1])) {
      style += "" + k + ": " + v + ";";
    }
    aniSty += "" + properties[num][0] + "{" + style + "}";
    return aniSty;
  };
  for (let i = 0; i < proplen; i++) {
    Animation += animationStep(i);
  }
  let aniStyleTag = document.querySelector("style");
  if (aniStyleTag === null) {
    aniStyleTag = document.createElement("style");
  }
  aniStyleTag.media = "screen";
  totalAnimation = aniStyleTag.innerHTML;
  totalAnimation += styS + Animation + styE;
  aniStyleTag.innerHTML = totalAnimation;
  document.head.append(aniStyleTag);
};

/*
*** HOW TO USE ***
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
const build = (...layouts) => {
  let i = 1;
  function createElement(type = "", op = {}, chil) {
    const element = document.createElement(type);
    for (const [k, v] of Object.entries(op)) {
      element[k] = v;
    }
    if (chil) {
      if (Array.isArray(chil)) {
        const frag = new DocumentFragment();
        // templating testing should be done here
        for (let i = 0; i < chil.length; i++) {
          frag.append(chil[i]);
        }
        element.append(frag);
      } else {
        element.append(chil);
      }
    }
    // return the element after building the dom objects
    return element;
  }

  if (typeof layouts[0] === "object") {
    i = layouts.lenght;
    const frag = new DocumentFragment();
    while (i > 0) {
      // templating testing should be done here
      const ele = createElement(layouts[i][0], layouts[i][1], layouts[i][2]);
      frag.append(ele);
      i--;
    }
    return frag;
  } else {
    if (typeof layouts[0] === "string") {
      // templating testing should be done here
      const element = createElement(layouts[0], layouts[1], layouts[2]);
      return element;
    }
  }
};

const buildTo = function (child, parent) {
  if (typeof parent === "string") {
    document.querySelectorAll(parent).forEach(function (par) {
      if (Array.isArray(child)) {
        child.forEach(function (ch) {
          par.append(ch);
        });
      }
    });
  } else {
    if (Array.isArray(child)) {
      child.forEach(function (ch) {
        parent.append(ch);
      });
    }
  }
};
// /*
// const p = build(
//   "div",
//   {
//     title: "title",
//     innerText: "am a title",
//     onclick: function () {
//       console.log("i was clicked");
//     }
//   },
//   build("span", { innerText: "am a span", title: "title" })
// );
// div.class#id

// buildTo(p, "body");

// */

/*
here is the awesome uiedbook router
*/
const routes = {};
const route = function (path = "/", templateId, controller) {
  const link = document.createElement("a");
  link.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
  routes[path] = { templateId: templateId, controller: controller };
  return link;
};
const router = function (e) {
  e.preventDefault();
  const url = window.location.hash.slice(1) || "/";
  const route = routes[url];
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

/*
HOW TO USE


route("/", "home", function () {
  get("div").innerText = " welcome to the home page";
  console.log("we are at the home page");
});

const about = route("/about", "about", function () {
  get("div").innerText = " welcome to the about page";
  get("a").href = about;
  console.log("we are at the about page");
});


*/

// in construction
const xhr = function (type, url) {
  // for sending requests
  const xhrRequest = new XMLHttpRequest();
  let result = null;
  xhrRequest.open(type, url, true);
  result = xhrRequest.onload = function () {
    return xhrRequest.response;
  };
  xhrRequest.send();
  return result;
};

const u = (...uied) => {
  /*
    the u function is a powerful 
    selector function with added 
    attributes to manipulate dom 
    elements, it does it in a more
    save, fast and efficient. 
    */

  const eU = uied.length,
    [el, ifAll_OrNum] = uied;
  let all = false,
    e;
  if (eU === 1 && typeof el === "string") {
    e = document.querySelector(el);
  } else {
    if (eU === 1 && typeof el !== "string") {
      e = el;
    } else {
      if (eU === 2 && typeof ifAll_OrNum !== "number") {
        //all el is being grabbed from the dom
        all = true;
        e = document.querySelectorAll(el);
      } else {
        if (typeof ifAll_OrNum === "number") {
          e = document.querySelectorAll(el)[ifAll_OrNum];
        }
      }
    }
  }
  if (!e) throw new Error('element "' + el + '" not found');

  // the funny parts or extra methods that can be used
  // to manipulate dom  elements are below!

  return {
    // for styling
    style(obj) {
      for (const [k, v] of Object.entries(obj)) {
        if (!all) {
          e.style[k] = v;
        } else {
          e.forEach(element => {
            element.style[k] = v;
          });
        }
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

    config(obj) {
      // for manipulating objects
      if (obj) {
        for (const [k, v] of Object.entries(obj)) {
          e[k] = v;
        }
      } else {
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

    appendTo(type, attribute = {}, number = 1) {
      // for adding new elements more powerfully
      if (typeof attribute === "undefined" || typeof type === "undefined") {
        throw new Error("type or attribute not given | not enough parameters to work with");
      }
      const frag = new DocumentFragment();
      let returned = null;
      let al = [];
      if (!all) {
        for (let i = 0; i < number; i++) {
          const element = document.createElement(type);
          for (const [k, v] of Object.entries(attribute)) {
            element[k] = v;
          }
          returned = frag.childNodes[0];
          frag.append(element);
          al.push(element);
        }
        e.append(frag);
      } else {
        for (let i = 0; i < number; i++) {
          const element = document.createElement(type);
          for (const [k, v] of Object.entries(attribute)) {
            element[k] = v;
          }
          frag.append(element);
          al.push(element);
        }

        e.forEach(el => {
          el.append(frag);
        });
      }
      if (al.length === 1) {
        returned = al[0];
      } else {
        returned = al;
      }

      return returned;
    },
    /*
 *** HOW TO USE ***

u("#container").appendTo("div"{
    className: "newdiv",
    id: "newdiv"
}, 5)

*/

    off(type, callback) {
      if (!all) {
        return e.removeEventListener(type, callback, true);
      } else {
        return e.forEach(element => {
          element.removeEventListener(type, callback, true);
        });
      }
    },

    on(type, callback) {
      if (!all) {
        return e.addEventListener(type, callback, true);
      } else {
        return e.forEach(element => {
          element.addEventListener(type, callback, true);
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
    attr(attribute_object) {
      if (typeof attribute_object !== "object") return;
      if (!all) {
        for (const [prop, attr] of Object.entries(attribute_object)) {
          if (prop === null) {
            return e.getAttribute(prop);
          } else {
            e.setAttribute(prop, attr);
          }
        }
      } else {
        for (const [prop, attr] of Object.entries(attribute_object)) {
          if (prop === null) {
            return e.getAttribute(prop);
          } else {
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
    removeAttr(attr) {
      if (attr === null) {
        return;
      }
      if (!all) {
        e.removeAttribute(attr);
      } else {
        e.forEach(el => el.removeAttribute(attr));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").removeAttr("className")

*/
    // for adding inner html contents to the dom elements
    html(code) {
      if (!all) {
        e.innerHTML = code;
      } else {
        e.forEach(el => (el.innerHTML = code));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").html("<div> hello am a div </div>")

*/
    // for adding text to the dom elements
    text(text) {
      if (!all) {
        e.textContent = text;
      } else {
        e.forEach(el => (el.textContent = text));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").html("hello am text")


*/
    // for adding class to the dom elements
    addClass(clas) {
      if (!all) {
        e.classList.add(clas);
      } else {
        e.forEach(el => el.classList.add(clas));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").addClass(".class")

*/

    // for removing class from the dom elements

    removeClass(clas) {
      if (!all) {
        e.classList.remove(clas);
      } else {
        e.forEach(el => el.classList.remove(clas));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").removeClass(".class")

*/
    // for hiding the dom elements

    hide() {
      if (!all) {
        e.style.display = "none";
      } else {
        e.forEach(el => (el.style.display = "none"));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").hide()

*/
    // for toggling the display of elements
    toggleClass() {
      if (!all) {
        if (e.style.display === "none") {
          e.style.display = "block";
        } else {
          e.style.display = "none";
        }
      } else {
        if (e[0].style.display === "none") {
          e.forEach(el => (el.style.display = "block"));
        } else {
          e.forEach(el => (el.style.display = "none"));
        }
      }
    },
    /*
 *** HOW TO USE ***

u("#container").toggleClass(".class")

*/
    // for displaying the dom elements

    show() {
      if (!all) {
        e.style.display = "block";
      } else {
        e.forEach(el => (el.style.display = "block"));
      }
    },
    scaleOut() {
      if (!all) {
        e.style.transform = "scale(1)";
      } else {
        e.forEach(el => (el.style.transform = "scale(1)"));
      }
    },
    scaleIn() {
      if (!all) {
        e.style.transform = "scale(0)";
      } else {
        e.forEach(el => (el.style.transform = "scale(0)"));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").show()

*/
    // for resizing the dom elements

    box(w, h, c = "transparent") {
      if (!all) {
        e.style.width = w;
        e.style.height = h;
        e.style.backgroundColor = c;
      } else {
        e.forEach(el => {
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
    scrollTo(s = true) {
      e.scrollIntoView(s);
    },
    /*
 *** HOW TO USE ***

u("#container").scrollTo()

*/
    // for adding elements to the dom elements
    add(nod) {
      e.append(nod);
    },
    /*
 *** HOW TO USE ***
let span = document.createElement("span");
u("#container").add(span)

*/
    // for removing elements to the dom elements
    remove(ind) {
      e.removeChild(e.childNodes[ind]);
    },
    /*
 *** HOW TO USE ***

u("#container").remove(0)

*/

    // for making the dom elements fulscreen
    fullScreen() {
      return {
        toggle: () => {
          if (!document.fullscreenElement) {
            e.requestFullscreen().catch(err => {
              alert(`Error! failure attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
          } else {
            document.exitFullscreen();
          }
        },
        set() {
          e.requestFullscreen().catch(err => {
            alert(`Error! failure attempting to enable
 full-screen mode: ${err.message}
 (${err.name})`);
          });
        },
        exist() {
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

const isEmptyObject = function (obj) {
  // for checking for empty objects
  for (const name in obj) {
    return false;
  }
  return true;
};

/*
 *** HOW TO USE ***
let objA = { a: "kd" };
let objB = {};
console.log(isEmptyObject(objA));
// false
console.log(isEmptyObject(objB));
// true

*/

function intersect(target, opt, callback) {
  const { root, rootMargin, threshold } = opt,
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

const error = msg => {
  throw new Error(msg);
};
/*
 *** HOW TO USE ***
error("there was an error!");
*/
const get = (...uied) => {
  /*
    the get function is the u function but without any sweet methods
    it is used if you want to enjoy the easiness of the u function 
    but don't want to use it awesome methods
    */
  const [el, ifAll_OrNum] = uied;
  let e;
  if (uied.length === 1) {
    e = document.querySelector(el);
  } else {
    if (uied.length === 2 && typeof ifAll_OrNum !== "number") {
      e = document.querySelectorAll(el);
    } else {
      if (typeof ifAll_OrNum === "number") {
        e = document.querySelectorAll(el)[ifAll_OrNum];
      }
    }
  }
  return e;
};
/*
 *** HOW TO USE ***
let container = get("container");
*/

const rad = (num, lowestValue = 0, highestValue = num) => {
  // for getting more purer random number
  function getRAndomNumber() {
    let randomNumber = Math.floor(Math.random() * Math.floor(num));
    return randomNumber;
  }
  let randomNumber = getRAndomNumber();
  if (randomNumber <= lowestValue || randomNumber >= highestValue) {
    randomNumber = getRAndomNumber();
  }
  return randomNumber;
};
/*
 *** HOW TO USE ***
rad(5);
// you will get random values from 0 to 5
*/

const makeClass = (name, stylings) => {
  //for making css classes
  const clas = document.createElement("style");
  const styling = "" + name + "{" + stylings + "}";
  clas.innerHTML = styling;
  document.body.appendChild(clas);
};
/*
 *** HOW TO USE ***
class(".container","color: red;");
*/
const create = (type = "div", id = "") => {
  // it's self explanatory some how
  const element = document.createElement(type);
  element.setAttribute("id", id);
  document.body.appendChild(element);
  return element;
};
/*
 *** HOW TO USE ***
let div = create("div","newdiv");
*/

const download = function (type, source, name) {
  // an easy to use download function that returns
  // the link element that should be clicked
  const file = new Blob([source.buffer], { type: type });
  const fileURL = URL.createObjectURL(file);
  const linkElement = document.createElement("a");
  // add the file url
  linkElement.setAttribute("href", fileURL);
  // add the download attribute with name suggestion
  linkElement.setAttribute("download", name);
  return linkElement;
};

const debounce = (func, timeout = 600) => {
  let timer = null;
  clearTimeout(timer);
  timer = setTimeout(() => {
    func();
  }, timeout);
};

/*
 *** HOW TO USE ***
debounce(function , 1000);
*/

// the grandmother algorith for managing ids of
//anything, don't use it if you don't understand it's power
// it looks simple.
let callStack = [];
const keep = function (id, time) {
  const callObj = typeof id === "object" ? id : null;
  let runtime = typeof time === "number" ? time : 1;
  if (typeof id === "string" && typeof runtime === "number") {
    if (callStack.indexOf(id) > -1) {
      return;
    }

    for (; runtime > 0; runtime--) {
      callStack.push(id);
    }
  } else {
    if (callObj !== null) {
      // eslint-disable-next-line prefer-const
      for (let [k, v] of Object.entries(callObj)) {
        if (callStack.indexOf(k) > -1) {
          callStack.splice(id, 1);
          return true;
        } else {
          for (; v > 0; v--) {
            callStack.push(k);
          }
        }
      }
    }
  }
};

const check = function (id) {
  const ind = callStack.indexOf(id);
  if (ind > -1) {
    // callStack.filter(key => !(id === key));
    callStack.splice(ind, 1);
    return true;
  } else {
    return false;
  }
};

const log = message => {
  if (message) {
    console.log(message);
  } else {
    if (callStack.length > 0) {
      console.log(callStack);
      return callStack;
    }
  }
};

const store = (name, value) => {
  /// it's self explanatory some how
  localStorage.setItem(name, JSON.stringify(value));
};
const retrieve = name => {
  localStorage.getItem(name);
};

const remove = name => {
  localStorage.removeItem(name);
};
const getKey = index => {
  window.localStorage.key(index);
};
const clear = () => {
  localStorage.clear();
};

// const onKeys = (keys, callback, object = document, lock = true) => {
//   // for handling even more complicated key events,
//   // it's built with the grandmother algorimth or code
//   if (!keys || !callStack) {
//     throw new Error("no keys or callbacks given");
//   }
//   const keymap = [...keys];
//   object.addEventListener(
//     "keydown",
//     e => {
//       if (lock) {
//         e.preventDefault();
//       }
//       keep(e.key, 1);
//     },
//     false
//   );
//   object.addEventListener(
//     "keyup",
//     e => {
//       let num = 0;
//       for (let i = 0; i < keymap.length; i++) {
//         if (check(keymap[i])) {
//           ++num;
//           num = 0;
//           callStack = [];
//         } else {
//           break;
//         }
//       }

//       if (num === keymap.length) {
//         e.preventDefault();
//         callback.call(e);
//         num = 0;
//         callStack = [];
//       } else {
//         return false;
//       }
//     },
//     false
//   );
// };
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

onKeys(["arrowRight","control"],callback,container);

*/

// const continuesKeys = (keys, callback, delay = 0, object = document, lock = true) => {
// under construction!!!!!!!
//   if (!keys || !callStack) {
//     throw new Error("no keys or callbacks given");
//   }
//   const keymap = [...keys];
//   object.addEventListener("keydown", e => {
//     keep(e.key, 1);
//     if (callStack.length === keymap.length) {
//       checkKeys(e);
//     }
//   });

//   function checkKeys(e) {
//     let num = 0;
//     for (let i = 0; i < keymap.length; i++) {
//       if (check(keymap[i])) {
//         ++num;
//       } else {
//         num = 0;
//         callStack = [];
//         break;
//       }
//     }

//     if (num === keymap.length) {
//       if (lock) {
//         e.preventDefault();
//       }
//       debounce(() => callback.call(e), delay);
//       num = 0;
//       callStack = [];
//     } else {
//       return false;
//     }
//   }
// };

/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

continuesKeys(["arrowRight","control"],callback,500,true,container);

*/

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
      debounce(function () {
        return keysStack[i].callBack(e);
      }, delay);
    }
  };
  for (var i = 0; i < keysStack.length; i++) {
    _loop_3(i);
  }
  return keys;
};

/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
var onKeys = function (keys, callback, object, delay, lock) {
  if (object === void 0) {
    object = document;
  }
  if (delay === void 0) {
    delay = 0;
  }
  if (lock === void 0) {
    lock = false;
  }
  // for handling even more complicated key events,
  if (!keys || !callback) {
    throw new Error("no keys or callbacks given");
  }
  var temporaryKeys = [];
  keepKeys(keys, callback);
  object.addEventListener(
    "keydown",
    function (e) {
      if (lock) {
        e.preventDefault();
      }
      if (temporaryKeys.indexOf(e.key) !== 0) {
        temporaryKeys.push(e.key);
      }
    },
    false
  );
  object.addEventListener(
    "keyup",
    function (e) {
      checkKeys(temporaryKeys, e, delay);
      temporaryKeys = [];
    },
    false
  );
};
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
  if (delay === void 0) {
    delay = 0;
  }
  if (object === void 0) {
    object = document;
  }
  if (lock === void 0) {
    lock = false;
  }
  // for handling even more complicated key events,
  if (!keys || !callback) {
    throw new Error("no keys or callbacks given");
  }
  keepKeys(keys, callback);
  var temporaryKeys = [];
  object.addEventListener(
    "keyup",
    e => {
      for (let i = 0; i < temporaryKeys.length; i++) {
        if (temporaryKeys[i] === e.key) {
          temporaryKeys.splice(i, 1);
          --i;
          checkKeys(temporaryKeys, e, delay);
        }
      }
    },
    true
  );

  object.addEventListener(
    "keydown",
    function (e) {
      if (lock) {
        e.preventDefault();
      }
      if (temporaryKeys.indexOf(e.key) < 0) {
        temporaryKeys.push(e.key);
      }
      checkKeys(temporaryKeys, e, delay);
    },
    true
  );
};

function swipe(item) {
  let caller;
  let startX = 0,
    startY = 0;
  if (typeof item === "object") {
    caller = item;
  } else {
    throw new Error("no call given for the swipe handler");
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
        callback.touch(caller.touch);
      }
    }
    if (ratioX > ratioY) {
      // left and right
      if (diffX >= 0) {
        if (caller.right) {
          callback.right(caller.right);
        }
      } else {
        if (caller.left) {
          callback.left(caller.left);
        }
      }

      // up and down
    } else {
      if (diffY >= 0) {
        if (caller.down) {
          callback.down(caller.down);
        }
      } else {
        if (caller.up) {
          callback.up(caller.up);
        }
      }
    }
  }

  document.body.addEventListener("touchstart", handleTouchStart);
  document.body.addEventListener("touchend", handleTouchEnd);

  const callback = {
    touch(callback) {
      return callback();
    },
    right(callback) {
      return callback();
    },

    left(callback) {
      return callback();
    },

    down(callback) {
      return callback();
    },

    up(callback) {
      return callback();
    }
  };
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
const buildCanvas = function (id, w = window.innerWidth, h = window.innerHeight) {
  /*this is used for creating
pixel stable game views across
all screen width with no pixelation 
problem try and see the magic */
  const canv = document.createElement("canvas"),
    context = canv.getContext("2d"),
    backingStores = [
      "webkitBackingStorePixelRatio",
      "mozBackingStorePixelRatio",
      "msBackingStorePixelRatio",
      "oBackingStorePixelRatio",
      "backingStorePixelRatio"
    ],
    deviceRatio = window.devicePixelRatio,
    backingRatio = backingStores.reduce(function (prev, curr) {
      // eslint-disable-next-line no-prototype-builtins
      return context.hasOwnProperty(curr) ? context[curr] : 1;
    }),
    ratio = deviceRatio / backingRatio;
  canv.id = typeof id === "undefined" ? "canvas" : id;
  canv.width = Math.round(w * ratio);
  canv.height = Math.round(h * ratio);
  canv.style.width = w + "px";
  canv.style.height = h + "px";
  canv.style.backgroundColor = "black";
  canv.style.overflow = "hidden";
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  canv.imageSmoothingQuality = "high";
  return canv;
};

const appendCanvas = (id, h, w, parent) => {
  /*same as above but with a 
parent to append directly */
  const cv = buildCanvas(id, h, w);
  let par;
  if (typeof parent !== "string" && typeof parent !== "undefined") {
    par = parent;
  } else {
    if (typeof parent === "string") {
      par = document.querySelector(parent);
    } else {
      if (typeof parent === "undefined") {
        par = document.body;
      }
    }
  }
  par.style.boxSizing = "border-box";
  par.append(cv);
  return cv;
};

/*this is the RE game time line algorimth*/
const game = (function () {
  /*Re is an interface
 where game views (view) are
 sequenced on.*/
  const games = [];

  // the build function is for creating the game div
  // and allowing the dev to build upon it
  function build(viewID, callback) {
    const frame = document.createElement("div");
    if (viewID) {
      frame.setAttribute("id", viewID);
    }
    u(frame).style({
      height: "100vh",
      width: "100vw",
      backgroundColor: "black"
    });
    mount(frame, callback);
    return frame;
  }

  // the mount function notifies the flow function
  // that the game should be started
  // and the callback can be used to run a function
  // perculiar to this effect.
  function mount(template, callback) {
    u("body").appendTo("div", { id: "gameframe" });
    if (games.length === 1) {
      return;
    } else {
      games.push(template);
    }
    if (!callback) return;
    return callback.call(template);
  }
  // the flow function ochastrate the game play
  function flow(fram) {
    fram.append(games[0]);
  }
  // the start function starts the game
  // and manathe dom
  const start = (canvas, fps) => {
    if (games.length < 1 || games.length > 1) {
      throw new Error("uiedbook: game.mount() should be called and given a built game world");
    }

    u(document.body).style({
      margin: "0px",
      padding: "0px",
      boxSizing: "border-box",
      border: "none",
      backgroundColor: "black",
      overflow: "hidden"
    });

    u("#gameframe").style({
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
    const gameframe = get("#gameframe");
    flow(gameframe);
    renderer.render(canvas, fps);
  };
  // this stops the game
  const end = () => {
    const fram = get("#gameframe");
    fram.innerHTML = "";
    renderer.toggleRendering();
    // fram.append(vsg())
  };

  const widget = function (name) {
    this.wig = document.createElement("div");
    this.wig.className = name;
    this.wig.id = name;
    document.body.append(this.wig);
    return this.wig;
  };

  /*
  async function contentLoader(type, id, url) {
    if (type === "img") {
      let img;
      const loaded = await new Promise((res, rej) => {
        const p = new Image();
        try {
        p.src = url;
        p.id = id;
        p.addEventListener("load", res.call(p), { once: true });
        img =  p;
        } catch (error) {
          rej(error)
        }
      })
      return img;
    } else {
      if (type === "aud") {
        let aud;
          const loaded = await new Promise((res, rej) => {
        try {
        const p = new Audio();
        p.src = url;
        p.id = id;
          p.addEventListener("load", res.call(p), { once: true });
          aud =  p;
        } catch (error) {
          rej(error)
        }
      })
      return aud;
      }
    }
  }

  const imagesArray = [],
    audioArray = [];
  async function loadImage(img, id) {
    if (Array.isArray(img) && !id) {
      for (let i = 0; i < img.length; i++) {
        if (!img[i][0] || !img[i][1]) {
          throw new Error(`uiedbook: image url or id not specified correctly for the ${i} image`);
        }
        const p = await contentLoader("img", img[i][1], img[i][0]);
        imagesArray.push(p);
      }
    } else {
      if (img && id) {
        const i = await contentLoader("img", img, id);
        imagesArray.push(i);
      } else {
        throw new Error(`uiedbook: image url or id not specified`);
      }
    }
  }
  async function loadAudio(img, id) {
    if (Array.isArray(img) && !id) {
      for (let i = 0; i < img.length; i++) {
         if (!img[i][0] || !img[i][1]) {
          throw new Error(`uiedbook: audio url or id not specified correctly for the ${i} audio`);
        }
        const p = await contentLoader("aud", img[i][1], img[i][0]);
        audioArray.push(p);
      }
    } else {
      if (img && id) {
        const i = await contentLoader("aud", img, id);
        audioArray.push(i);
      } else {
        throw new Error(`uiedbook: audio url or id not specified`);
      }
    }
  }

  */

  ///*
  function contentLoader(type, id, url) {
    if (type === "img") {
      const p = new Image();
      p.src = url;
      p.id = id;
      return p;
    } else {
      if (type === "aud") {
        const p = new Audio();
        p.src = url;
        p.id = id;
        return p;
      }
    }
  }

  const imagesArray = [],
    audioArray = [];
  function loadImage(img, id) {
    if (Array.isArray(img) && !id) {
      for (let i = 0; i < img.length; i++) {
        if (!img[i][0] || !img[i][1]) {
          throw new Error(`uiedbook: image url or id not specified correctly for the ${i} image`);
        }
        const p = contentLoader("img", img[i][1], img[i][0]);
        imagesArray.push(p);
      }
    } else {
      if (img && id) {
        const i = contentLoader("img", img, id);
        imagesArray.push(i);
      } else {
        throw new Error(`uiedbook: image url or id not specified`);
      }
    }
  }
  function loadAudio(img, id) {
    if (Array.isArray(img) && !id) {
      for (let i = 0; i < img.length; i++) {
        if (!img[i][0] || !img[i][1]) {
          throw new Error(`uiedbook: audio url or id not specified correctly for the ${i} audio`);
        }
        const p = contentLoader("aud", img[i][1], img[i][0]);
        audioArray.push(p);
      }
    } else {
      if (img && id) {
        const i = contentLoader("aud", img, id);
        audioArray.push(i);
      } else {
        throw new Error(`uiedbook: audio url or id not specified`);
      }
    }
  }
  //*/

  function getAud(id) {
    const p = audioArray.find(ent => ent.id === id);
    if (p) {
      // console.log(p);
      return p;
    } else {
      throw new Error('uiedbook: audio of id "' + id + '" not found');
    }
  }

  function getImg(id) {
    const p = imagesArray.find(ent => ent.id === id);
    if (p) {
      // console.log(p);
      return p;
    } else {
      throw new Error('uiedbook: image of id "' + id + '" not found');
    }
  }

  return {
    build: build,
    makeWidget: widget,
    start: start,
    loadImage: loadImage,
    loadAudio: loadAudio,
    getImg: getImg,
    getAud: getAud,
    end: end
  };
})();
// END OF THE main RE ENGINE////////////////////////

/*
other TODOs stuff will be built here
*/
const entity = function (name, painter, behaviors) {
  /*an entity is any object or thing
 that can be added to the game world*/
  if (!painter || !behaviors) {
    throw new Error("cannot create entity without a paiter and behavior objects");
  }
  //this.id = name || "none" //name of the entity for identification can be used out side here******
  this.name = name || "none";
  this.painter = painter; // callback for paint the entity     can be used out side here******
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
  this.delete = false; //  to delete an entity                        can be used out side here******
  this.border = true; //   to make the entity observer sides or not   can be used out side here******
  this.isHit = false;
};

entity.prototype = {
  // this algorimth is for calling the paint function
  // to make it functional when seen at runtime
  update(context, lastDeltalTime) {
    if (typeof this.painter.update !== "undefined" && this.visible) {
      this.painter.update(this, context, lastDeltalTime);
    } else {
      // throw new Error(`RE: entity with name of ${this.name} has no update function`);
    }
  },
  paint(context, lastDeltalTime) {
    if (typeof this.painter.paint !== "undefined" && this.visible) {
      this.painter.paint(this, context, lastDeltalTime);
    } else {
      throw new Error(`RE: entity with name of ${this.name} has no paint function`);
    }
  },
  observeBorder(w, h) {
    if (this.top <= 0) {
      this.top *= 0;
    } else {
      if (h && this.top + this.height >= h) {
        this.top = h - this.height;
      }
    }
    if (this.left <= 0) {
      this.left *= 0;
    } else {
      if (w && this.left + this.width >= w) {
        this.left = w - this.width;
      }
    }
  },
  run(context, lastDeltalTime) {
    // here the entity don't have to be visble
    if (typeof this.behaviors !== "undefined") {
      this.behaviors(this, context, lastDeltalTime);
    }
  }
};

const imgPainter = function (img, delay = 1) {
  this.image = img;
  this.delay = delay;
  this.range = 0;
  this.rotate = false;
};
imgPainter.prototype = {
  // paint only no update
  paint(entity, context) {
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
const spriteSheetPainter = function (img, horizontal = 1, vertical = 1, delay = 1) {
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
  this.animateAllFrames = horizontal === 1 && vertical === 1 ? false : true;
  this.animate = true;
  this.rotate = false;
  this.changeSheet = function (img, horizontal = 0, vertical = 0, delay = 1) {
    this.image = img;
    this.framesWidth = Math.round(this.image.width / horizontal);
    this.framesHeight = Math.round(this.image.height / vertical);
    this.horizontalPictures = horizontal;
    this.verticalPictures = vertical;
    this.delay = delay;
    this.animateAllFrames = horizontal === 1 && vertical === 1 ? false : true;
  };

  this.animateFrameOf = function (frameY = 0) {
    this.frameY = frameY;
  };
};

spriteSheetPainter.prototype = {
  update() {
    this.range++;
    if (this.range % this.delay === 0 && this.animate) {
      if (this.animateAllFrames) {
        if (this.frameHeightCount < this.verticalPictures - 1) {
          if (this.frameWidthCount <= this.horizontalPictures - 2) {
            this.frameWidthCount++;
          } else {
            this.frameWidthCount = 0;
            this.frameHeightCount++;
          }
        } else {
          this.isLastImage = true;
          this.frameHeightCount = 0;
        }
        if (this.frameHeightCount === this.verticalPictures - 1) {
          this.isLastImage = false;
        }
      }

      if (this.frameY) {
        this.frameHeightCount = this.frameY;
        if (this.frameWidthCount <= this.horizontalPictures - 2) {
          this.frameWidthCount++;
        } else {
          this.frameWidthCount = 0;
        }
      }
    }
    if (this.range > 100) {
      this.range = 1;
    }
  },
  paint(entity, context) {
    context.save();
    if (this.rotate) {
      context.translate(entity.left, entity.top);
      context.rotate((this.rotate * Math.PI) / 180);
      context.translate(-entity.left, -entity.top);
    }
    context.drawImage(
      this.image,
      this.framesWidth * this.frameWidthCount,
      this.framesHeight * this.frameHeightCount,
      this.framesWidth,
      this.framesHeight,
      entity.left,
      entity.top,
      entity.width,
      entity.height
    );
    context.restore();
  }
};

const speaker = function (text, language = "en", volume = 1, rate = 1, pitch = 1) {
  // common languages (not supported by all browsers)
  // en - english,  it - italian, fr - french,  de - german, es - spanish
  // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean

  // build utterance and speak
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.volume = volume;
  utterance.rate = rate;
  utterance.pitch = pitch;
  speechSynthesis.speak(utterance);
};

const speakerStop = () => {
  return speechSynthesis && speechSynthesis.cancel();
};

// play mp3 or wav audio from a local file or url
const audio = function (audio, volumeScale = 1, loop = 0) {
  this.audio = audio;
  this.audio.loop = loop;
  this.audio.volume = volumeScale;
};
audio.prototype = {
  play() {
    this.audio.play();
  },
  pause() {
    this.audio.pause();
  },
  toggle() {
    if (this.audio.pause) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
};

const bgPainter = function (img, speed = 10, up, left) {
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
bgPainter.prototype = {
  update() {
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
    } else {
      context.drawImage(this.image, this.left, this.top - this.height, canvas.width, this.height);
    }
  }
};

const physics = (function () {
  function detectCollision(ent, entityArray, reduce = 0, skipMe, freeMan) {
    for (let j = 0; j < entityArray.length; j++) {
      if (skipMe && entityArray[j].name === ent.name) {
        continue;
      } else {
        if (
          ent.left - reduce > entityArray[j].left + entityArray[j].width ||
          ent.left + ent.width < entityArray[j].left - reduce ||
          ent.top + reduce > entityArray[j].top + entityArray[j].height ||
          ent.top + ent.height < entityArray[j].top - reduce
        ) {
          continue;
        } else {
          entityArray[j].isHit = true;
          ent.isHit = true;
          if (entityArray[j].name !== freeMan) {
            entityArray.splice(j, 1);
            --j;
          }
          // console.log(entityArray[j].name,j);
        }
      }
    }
    return entityArray;
  }

  return {
    detectCollision: detectCollision
  };
})();

const renderer = (function () {
  //game rendering algorithm
  let canvas,
    id, // for pausing or playing the game
    context,
    fps,
    // variables for the timing
    fpso = 0,
    lastdt = 0,
    pause = false,
    deltaTime,
    started = false,
    useBg = false;
  const bg = [],
    entitysArray = [], // entity storage array
    screen = buildCanvas("uiedbook_game_canvas"),
    painter = screen.getContext("2d"),
    pool = [];

  function keepEntity(ent) {
    if (!ent) return;
    pool.push(ent);
  }

  function getFreeEntity(id) {
    let freeNigga;
    if (pool.length !== 0) {
      for (let i = 0; i < pool.length; i++) {
        if (pool[i].name === id) {
          freeNigga = pool[i];
          pool.splice(i, 1);
          i--;
          break;
        }
      }
    }
    return freeNigga;
  }

  function bgPaint(img, speed, up, left) {
    const bgImg = new bgPainter(img, speed, up, left);
    bg.push(bgImg);
    useBg = true;
    return bgImg;
  }

  function _assemble(...players) {
    if (!players) throw new Error("RE: No players assembled");
    players.forEach(player => {
      entitysArray.push(player);
    });
    return entitysArray;
  }
  function getAll() {
    return entitysArray;
  }
  function copyCanvasTo(c, opacity, border) {
    const cx = c.getContext("2d");
    cx.drawImage(screen, 0, 0, c.width, c.height);
    c.style.opacity = opacity;
    c.style.borderRadius = border;
    return c;
  }

  function toggleRendering() {
    if (!started) {
      throw new Error("renderer.render() has not been called");
    }
    if (pause) {
      window.requestAnimationFrame(animate);
      pause = false;
    } else {
      window.cancelAnimationFrame(id);
      pause = true;
    }
  }

  function currentFPS() {
    console.log(fpso);
    return fpso;
  }

  let seconds = 1000;
  function calcFPS(dt) {
    deltaTime = Math.round(dt - lastdt);
    lastdt = dt;
    seconds = seconds - deltaTime;
    fpso++;
    if (seconds < 1) {
      console.log(fpso);
      fpso = 0;
      seconds = 1000;
    }

    if (deltaTime > fps) {
      return true;
    } else {
      return false;
    }
  }

  function animate(dt) {
    id = window.requestAnimationFrame(animate);
    if (calcFPS(dt)) {
      try {
        // if (useBg){
        //  bg.forEach(b => {
        //   b.paint(screen);
        //   b.update();
        // });
        // painter.drawImage(game.getImg("space7"), 0, 0, screen.width, screen.height)
        // }
        // screen.width = screen.height = 0;
        // screen.width = canvas.width
        //  screen.height = canvas.height;
        entitysArray.forEach((ent, i) => {
          if (ent.delete) {
            keepEntity(ent);
            entitysArray.splice(i, 1);
            --i;
          }
          if (ent.border) {
            ent.observeBorder(screen.width, screen.height);
          }
          ent.update(painter);
          ent.run(painter);
          ent.paint(painter);
        });

        // drawing the on-screen canvas
        context.clearRect(0, 0, screen.width, screen.height);
        context.drawImage(screen, 0, 0, canvas.width, canvas.height);
        painter.clearRect(0, 0, screen.width, screen.height);
      } catch (error) {
        throw new Error(`the canvas cannot be animated due to some errors | ${error}`);
      }
    }
  }

  function _render(canv, fpso = 0) {
    if (!canv) {
      throw new Error("game needs to be rendered EXP: renderer.render(canvas)");
    }
    canvas = canv;
    context = canv.getContext("2d");
    screen.height = canvas.height;
    screen.width = canvas.width;
    fps = fpso;
    started = true;
    id = window.requestAnimationFrame(animate);
  }

  return {
    render: _render,
    assemble: _assemble,
    toggleRendering: toggleRendering,
    backgroundImage: bgPaint,
    copyCanvasTo: copyCanvasTo,
    keepEntity: keepEntity,
    getFreeEntity: getFreeEntity,
    currentFPS: currentFPS,
    getAll: getAll
  };
})();

const uiedbook = {
  css,
  media,
  animate,
  build,
  buildTo,
  xhr,
  u,
  isEmptyObject,
  intersect,
  error,
  get,
  rad,
  makeClass,
  create,
  download,
  debounce,
  keep,
  check,
  log,
  store,
  retrieve,
  remove,
  getKey,
  clear,
  onKeys,
  continuesKeys,
  swipe,
  buildCanvas,
  appendCanvas,
  game,
  entity,
  imgPainter,
  spriteSheetPainter,
  audio,
  bgPainter,
  renderer,
  speaker,
  speakerStop,
  physics,
  route
};
// 38 apis contexts

if (typeof module !== "undefined") {
  module["exports"] = uiedbook;
} else window.uiedbook = uiedbook;
