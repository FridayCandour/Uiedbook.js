/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  Apache;



                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 
YOU SHOULD GET A COPY OF THE APACHE LICENSE V 2.0 IF IT DOESN'T ALREADY COME WITH THIS MODULE
*/
const typer = {
  sequential: true,
  log: false,
  config(errorsOrLogs) {
    this.sequential = errorsOrLogs;
  }
};
function lit(type, label) {
  if (!typer.log) {
    console.log("Typer:-: Done checking");
    typer.log = true;
  }
  label = typeof label === "number" ? `line ${label}` : label;
  return function (value) {
    if (Array.isArray(type) && Array.isArray(value)) {
      // typing for arrays
      value = value.sort();
      type = type.sort();
      for (let i = 0; i < type.length; i++) {
        if (typeof value[i] === type[i] || value[i] === type[i]) {
          continue;
        } else {
          if (typer.sequential) {
            console.warn(`WARNING:-: type ${value} is not assignable to type ${type} at ${label}`);
            break;
          } else {
            throw new Error(`ERROR:-: type ${value} is not assignable to type ${type} at ${label}`);
          }
        }
      }
      return value;
    } else {
      // checking for objects
      for (const k in type) {
        console.log(typeof value[k], typeof type[k], value[k] === type[k]);
        if (typeof type[k] === "object" && !Array.isArray(type[k])) {
          lit(type[k], label + "internal")(value[k]);
        } else {
          if (typeof value[k] === type[k] || value[k] === type[k]) {
            continue;
          } else {
            if (typer.sequential) {
              console.warn(`WARNING:-: the object types for type and value are not assignable at ${label}`);
              break;
            } else {
              throw new Error(`ERROR:-: the object types for type and value are not assignable at ${label}`);
            }
          }
        }
      }
      return value;
    }
  };
}
// single values not objects
const t = function (...args) {
  if (!typer.log) {
    console.log("Typer:-: Done checking");
    typer.log = true;
  }
  let label;
  args.forEach((item, ind) => {
    [...item].forEach(txt => {
      if (txt === ".") {
        label = item;
        args.splice(ind, 1);
      }
    });
  });
  const type = args.length === 1 ? args.pop() : args;
  return function (value) {
    if (!Array.isArray(type)) {
      // for single types
      if (value === type || typeof value === type) {
        return value;
      } else {
        if (typer.sequential) {
          console.warn(`WARNING:-: type ${typeof value} is not assignable to type ${type} at ${label}`);
        } else {
          throw new Error(`TYPER:-: type ${typeof value} is not assignable to type ${type} at ${label}`);
        }
      }
    } else {
      // for union types
      for (let i = 0; i < type.length; i++) {
        const typ = type[i];
        if (typeof value === typ || value === typ) {
          return value;
        } else {
          if (i === type.length - 1) {
            if (typer.sequential) {
              console.warn(
                `warning type ${typeof value} is not assignable to types ${type[0]}, ${type[1]}...  at ${label}`
              );
            } else {
              throw new Error(
                `TYPER:-: type ${typeof value} is not assignable to types ${type[0]}, ${type[1]}...  at ${label}`
              );
            }
          }
        }
      }
    }
  };
};
/** the u function is a powerful selector function with added attributes to manipulate dom elements, it does it in a more fast and efficient manner. */
const u = (el, ifAll_OrNum) => {
  let all = false,
    e;
  if (!ifAll_OrNum && typeof el === "string") {
    e = document.querySelector(el);
  } else {
    if (!ifAll_OrNum && typeof el !== "string") {
      e = el;
    } else {
      if (ifAll_OrNum && typeof ifAll_OrNum !== "number" && typeof el !== "object") {
        //all el is being grabbed from the dom
        all = true;
        e = Array.from(document.querySelectorAll(el));
      } else {
        if (typeof ifAll_OrNum === "number" && typeof el === "string") {
          e = document.querySelectorAll(el)[ifAll_OrNum];
        } else {
          if (typeof el === "object" && typeof ifAll_OrNum === "string") {
            e = el;
            all = true;
          }
        }
      }
    }
  }
  if (typeof e === "undefined") throw new Error('element "' + String(el) + '" not found');
  // the funny parts or extra methods that can be used
  // to manipulate dom  elements are below!
  return {
    each(fn) {
      if (all) {
        e.forEach((el, ind) => {
          fn.call(el, ind);
        });
      } else {
        fn.call(e, 0);
      }
    },
    // for styling
    style(obj) {
      for (const k in obj) {
        const v = obj[k];
        if (!v) {
          continue;
        }
        if (!all) {
          e.style[k] = v;
        } else {
          e.forEach(_e => (_e.style[k] = v));
        }
      }
      return e;
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
    config(obj) {
      if (obj instanceof Object) {
        Object.assign(e, obj);
      } else {
        throw new Error(`the variable is not an object ${String(obj)}`);
      }
    },
    /*
     *** HOW TO USE ***
    
    u(object).config({
        name: "object",
        powerof: (pow, n){ return Math.pow(pow, n)}
    })
    
    */
    /** for adding new elements more powerfully */
    appendTo(type, attribute = {}, number = 1) {
      // for adding new elements more powerfully
      if (typeof attribute === "undefined" || typeof type === "undefined") {
        throw new Error("type or attribute not given | not enough parameters to work with");
      }
      const frag = new DocumentFragment();
      let returned = null;
      const allElements = [];
      if (!all) {
        for (let i = 0; i < number; i++) {
          const element = document.createElement(type);
          for (const k in attribute) {
            const v = attribute[k];
            element.setAttribute(k, v);
          }
          returned = frag.childNodes[0];
          frag.append(element);
          allElements.push(element);
        }
        e.append(frag);
      } else {
        for (let i = 0; i < number; i++) {
          const element = document.createElement(type);
          for (const k in attribute) {
            const v = attribute[k];
            element.setAttribute(k, v);
          }
          frag.append(element);
          allElements.push(element);
        }
        e.forEach(el => {
          el.append(frag);
        });
      }
      if (allElements.length === 1) {
        returned = allElements[0];
      } else {
        returned = allElements;
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
    replaceWidth(content) {
      if (!all) {
        const par = e.parentElement;
        par.remove(e);
        par.append(content);
      } else {
        e.forEach(el => {
          const par = el.parentElement;
          par.remove(el);
          par.append(content);
        });
      }
    },
    on(type, callback) {
      if (!all) {
        e.addEventListener(type, callback, true);
      } else {
        e.forEach(element => {
          element.addEventListener(type, callback, true);
        });
      }
    },
    off(type, callback) {
      if (!all) {
        e.removeEventListener(type, callback, true);
      } else {
        e.forEach(element => {
          element.removeEventListener(type, callback, true);
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
        for (const prop in attribute_object) {
          const attr = attribute_object[prop];
          if (prop === null) {
            return e.getAttribute(prop);
          } else {
            e.setAttribute(prop, String(attr));
          }
        }
      } else {
        for (const prop in attribute_object) {
          const attr = attribute_object[prop];
          if (prop === null) {
            Array.from(e).map(el => el.getAttribute(prop));
          } else {
            e.forEach(el => el.setAttribute(prop, String(attr)));
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
    /*
     *** HOW TO USE ***
    
    u("#container").show()
    
    */
    // for resizing the dom elements
    box(w, h, c = "transparent") {
      if (!all) {
        e.style.width = String(w);
        e.style.height = String(h);
        e.style.backgroundColor = c;
      } else {
        e.forEach(el => {
          el.style.width = String(w);
          el.style.height = String(h);
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
      if (!all) {
        e.scrollIntoView(s);
      } else {
        e.forEach(el => el.scrollIntoView(s));
      }
    },
    /*
     *** HOW TO USE ***
    
    u("#container").scrollTo()
    
    */
    // for adding elements to the dom elements
    add(nod) {
      if (!all) {
        e.append(nod);
      } else {
        e.forEach(el => {
          el.append(nod);
        });
      }
    },
    /*
     *** HOW TO USE ***
    let span = document.createElement("span");
    u("#container").add(span)
    
    */
    // for removing elements to the dom elements
    remove() {
      e.childNodes.forEach(child => {
        child.parentElement.remove(child);
      });
    },
    removeChildAtIndex(ind) {
      if (!all) {
        e.removeChild(e.childNodes[ind]);
      } else {
        e.forEach(el => {
          el.removeChild(e.childNodes[ind]);
        });
      }
    },
    /*
     *** HOW TO USE ***
    
    u("#container").remove(0)
    
    */
    /*
     *** HOW TO USE ***
    
    u("#container").remove(0)
    
    */
    scaleOut() {
      if (!all) {
        e.style.transform = "scale(1)";
        e.style.transform = "translate(-50%, -50%)";
        e.style.top = "50%";
        e.style.left = "50%";
        e.style.transformOrigin = "center";
      } else {
        e.forEach(el => {
          el.style.transform = "scale(1)";
          el.style.transform = "translate(-50%, -50%)";
          el.style.top = "50%";
          el.style.left = "50%";
          el.style.transformOrigin = "center";
        });
      }
    },
    scaleIn() {
      if (!all) {
        e.style.transform = "scale(0)";
        // e.style.transform = "translate(50%, 50%)";
      } else {
        e.forEach(el => {
          el.style.transform = "scale(0)";
          // el.style.transform = "translate(50%, 50%)";
        });
      }
    },
    /*
     *** HOW TO USE ***
    
    u("#container").fullscreen().toggle()
    u("#container").fullscreen().exist()
    u("#container").fullscreen().set()
    
    */
    fullScreen() {
      return {
        toggle: () => {
          if (!document.fullscreenElement && !all) {
            e.requestFullscreen().catch(err => {
              alert(`Error! failure attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
          } else {
            void document.exitFullscreen();
          }
        },
        set() {
          if (all) {
            return;
          }
          e.requestFullscreen().catch(err => {
            alert(`Error! failure attempting to enable
 full-screen mode: ${err.message}
 (${err.name})`);
          });
        },
        exist() {
          void document.exitFullscreen();
        }
      };
    }
    /*
     *** HOW TO USE ***
    
    u("#container").fullscreen().toggle()
    u("#container").fullscreen().exist()
    u("#container").fullscreen().set()
    
    */
    /*
     *** HOW TO USE ***
    
    u("#container").fullscreen().toggle()
    u("#container").fullscreen().exist()
    u("#container").fullscreen().set()
    
    */
  };
};
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
const css = (name, sel, properties) => {
  if (typeof sel === "object") {
    properties = sel;
    sel = "";
  }
  const styS = "" + name + sel + "" + "{";
  const styE = "}";
  let style = "",
    totalStyle = "";
  if (properties) {
    for (const k in properties) {
      const v = properties[k];
      style += "" + k + ": " + v + ";";
    }
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
const media = (value, ...properties) => {
  const styS = "@media only screen and (" + value + ") " + "{",
    styE = "}";
  let style = "  ",
    aniSty = " ";
  const proplen = properties.length;
  let totalAnimation,
    Animation = "  ";
  const animationStep = num => {
    for (const k in properties[num][1]) {
      const v = properties[num][1][k];
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
const animate = (name, ...properties) => {
  const styS = "@keyframes " + name + " " + "{",
    styE = "}",
    proplen = properties.length;
  let style = " ",
    aniSty = " ",
    Animation = "  ",
    totalAnimation = null;
  const animationStep = num => {
    for (const k in properties[num][1]) {
      const v = properties[num][1][k];
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

/** for checking for empty objects */
// needed below
const isEmptyObject = obj => Boolean(typeof obj === "object" && obj && Object.keys(obj).length === 0);
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
const build = (...layouts) => {
  function createElement(node) {
    let type = typeof node[0] === "string" ? node[0] : "";
    const op = typeof node[1] === "object" ? node[1] : {};
    let children = "";
    if (type == "" && op === {}) {
      type = "div";
      children = node;
    } else {
      children = node.slice(2);
    }
    if (type === "") {
      type = "div";
    }
    const element = document.createElement(type);
    if (!isEmptyObject(op)) {
      for (const [k, v] of Object.entries(op)) {
        element[k] = v;
      }
    }
    if (children[0]) {
      // console.log(children);
      if (Array.isArray(children)) {
        const frag = new DocumentFragment();
        // templating testing should be done here
        children.forEach(ch => {
          frag.append(ch);
        });
        element.append(frag);
      } else {
        element.append(children);
      }
    }
    console.log(element);
    // return the element after building the dom objects
    return element;
  }
  const element = createElement(layouts);
  if (element) {
    return element;
  }
  return new DocumentFragment();
};
/**
 * this context used for rendering built layout to a parent or the document body
 *
 * example
 *
 * const p =   build("span", { innerText: "am a span", title: "title" });
 *
buildTo(p, "body");
*/
const buildTo = (child, parent) => {
  if (typeof parent === "string") {
    parent = document.querySelectorAll(parent);
    parent.forEach(par => {
      if (Array.isArray(child)) {
        child.forEach(ch => {
          par.append(ch);
        });
      } else {
        parent.forEach(par => par.append(child));
      }
    });
  } else {
    if (Array.isArray(child)) {
      child.forEach(ch => {
        parent.append(ch);
      });
    }
  }
};

// const song = ({ id }) => {
//   return build("div", {id: "div"},
//     build("p", { id: id }, "i am ready to sing my song for you oh lord my creator am happy that ypu saved my life")
//   );
// };
// console.log(song());
// buildTo(song({ id: "friday" }), "body");
// console.log(
//   build("span", {
//     id: "dxsn"
//   })
// );

const routes = {};
const route = function (path = "/", templateId, controller) {
  const link = document.createElement("a");
  link.href = globalThis.location.href.replace(/#(.*)$/, "") + "#" + path;
  routes[path] = { templateId: templateId, controller: controller };
  return link;
};
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
const router = function (e) {
  e.preventDefault();
  const url = globalThis.location.hash.slice(1) || "/";
  const route = routes[url];
  if (route) {
    route.controller();
  }
  // path = path ? path : "";
  //   if (this.mode === "history") {
  //     history.pushState(null, null, this.root + this.clearSlashes(path));
  //   } else {
  //     globalThis.location.href = globalThis.location.href.replace(/#(.*)$/, "") + "#" + path;
  //   }
};
globalThis.addEventListener("hashchange", router);
globalThis.addEventListener("load", router);
/** in construction */
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

/*
 *** HOW TO USE ***
let objA = { a: "kd" };
let objB = {};
console.log(isEmptyObject(objA));
// false
console.log(isEmptyObject(objB));
// true

*/
const intersect = (target, opt, callback) => {
  const { root, rootMargin, threshold } = opt,
    options = {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold
    },
    observer = new IntersectionObserver(callback, options),
    child = document.querySelector(target);
  if (child) {
    observer.observe(child);
  }
};
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
const error = msg => {
  throw new Error(msg);
};
/** the get function is the u function but without any sweet methods it is used if you want to enjoy the easiness of the u function but don't want to use it awesome methods */
const get = (el, ifAll_OrNum) => {
  return typeof el === "string"
    ? typeof ifAll_OrNum !== "undefined"
      ? typeof ifAll_OrNum === "number"
        ? document.querySelectorAll(el)[ifAll_OrNum]
        : document.querySelectorAll(el)
      : document.querySelector(el)
    : el;
};
/** for getting more purer random number */
const rad = num => {
  return Math.floor(Math.random() * Math.floor(num));
};
/*
 *** HOW TO USE ***
rad(5);
// you will get random values from 0 to 5
*/
/** it's self explanatory some how */
const create = (type = "div", id = "") => {
  const element = document.createElement(type);
  element.setAttribute("id", id);
  document.body.appendChild(element);
  return element;
};
/*
 *** HOW TO USE ***
let div = create("div",{id:"newdiv"});
*/
/** an easy to use download function that returns the link element that should be clicked */
const download = function (type, source, name) {
  const file = new Blob([source.buffer], { type: type });
  const fileURL = URL.createObjectURL(file);
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", fileURL);
  linkElement.setAttribute("download", name);
  return linkElement;
};
const debounce = (func, timeout = 600) => {
  let timer = null;
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    func();
  }, timeout);
};
/*
 *** HOW TO USE ***
debounce(function , 1000);
*/
const log = (...message) => {
  if (message) {
    console.log(...message);
  }
};
/** it's self explanatory some how */
const store = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
const retrieve = name => {
  return localStorage.getItem(name);
};
const remove = name => {
  localStorage.removeItem(name);
};
const getKey = index => {
  return globalThis.localStorage.key(index);
};
const clear = () => {
  localStorage.clear();
};
// rebuilt key event lister
const keyObject = function (keysArray, callBack) {
  return {
    keysArray: keysArray,
    callBack: callBack
  };
};
const keysStack = [];
const keepKeys = function (keys, callback) {
  const call = keyObject(keys, callback);
  keysStack.push(call);
};
const checkKeys = function (keys, e, delay) {
  function partOf(a, b) {
    let matches = 0;
    for (let i = 0; i < a.length; i++) {
      if (b.indexOf(a[i]) === -1) {
        matches++;
      }
    }
    return matches === a.length;
  }
  for (let i = 0; i < keysStack.length; i++) {
    if (!partOf(keysStack[i].keysArray, keys)) {
      debounce(() => keysStack[i].callBack(e), delay);
    }
  }
  return keysStack.length;
};
/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
const onKeys = (keys, callback, object = document, delay = 0, lock = false) => {
  // for handling even more complicated key events,
  if (!keys || !callback) {
    throw new Error("no keys or callbacks given");
  }
  let temporaryKeys = [];
  keepKeys(keys, callback);
  object.addEventListener(
    "keydown",
    e => {
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
    e => {
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
const continuesKeys = (keys, callback, delay = 0, object = document, lock = true) => {
  // for handling even more complicated key events,
  if (!keys || !callback) {
    throw new Error("no keys or callbacks given");
  }
  keepKeys(keys, callback);
  const temporaryKeys = [];
  object.addEventListener(
    "keyup",
    e => {
      for (let i = 0; i < temporaryKeys.length; i++) {
        if (temporaryKeys[i] === e.key) {
          temporaryKeys.splice(i, 1);
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
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

continuesKeys(["arrowRight","control"],callback,500,true,container);

*/
const swipe = item => {
  const caller = {};
  let startX = 0,
    startY = 0;
  if (typeof item === "object") {
    for (const k in item) {
      const v = item[k];
      caller[k] = v;
    }
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
};
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
called the uiedbook engine
with minimal functionality
for 2D rendering */
/** this is used for creating pixel stable game views across all screen width with no pixelation problem try and see the magic */
const buildCanvas = function (id, w = globalThis.innerWidth, h = globalThis.innerHeight) {
  const canv = document.createElement("canvas"),
    context = canv.getContext("2d"),
    backingStores = [
      "webkitBackingStorePixelRatio",
      "mozBackingStorePixelRatio",
      "msBackingStorePixelRatio",
      "oBackingStorePixelRatio",
      "backingStorePixelRatio"
    ],
    deviceRatio = globalThis.devicePixelRatio,
    backingRatio = backingStores.reduce(function (prev, curr) {
      // eslint-disable-next-line no-prototype-builtins
      return context?.hasOwnProperty(curr) ? context[curr] : 1;
    }),
    ratio = deviceRatio / Number(backingRatio);
  canv.id = typeof id === "undefined" ? "canvas" : id;
  canv.width = Math.round(w * ratio);
  canv.height = Math.round(h * ratio);
  canv.style.width = String(w) + "px";
  canv.style.height = String(h) + "px";
  canv.style.backgroundColor = "black";
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  return canv;
};
/** an entity is any object or thing that can be added to the game world */
class Entity {
  constructor(
    /** this.id = name || "none" //name of the entity for identification can be used out side here */
    name,
    id,
    /** callback for paint the entity     can be used out side here */
    painter,
    /** this is a callback to add additional properties to the entity at runtime */
    behaviors
  ) {
    this.name = name;
    this.id = id;
    this.painter = painter;
    this.behaviors = behaviors;
    /** width of entiity */
    this.width = 0;
    /** height of entity */
    this.height = 0;
    /** distance from the top of the canvas */
    this.top = 0;
    /** distance from the left of the canvas */
    this.left = 0;
    /** to check if the entity is displayed */
    this.visible = true;
    /** to delete an entity */
    this.delete = false;
    /** to make the entity observer sides or not */
    this.border = true;
    this.isHit = false;
    this.callBacks = null;
    this.observeEntity = function (ent) {
      if (
        this.left > ent.left + ent.width ||
        this.left + this.width < ent.left ||
        this.top > ent.top + ent.height ||
        this.top + this.height < ent.top
      ) {
        return false;
      } else {
        return true;
      }
    };
    this.name ||= "none";
  }
  // this algorimth is for calling the paint function
  // to make it functional when seen at runtime
  config(top, left, bottom, right) {
    if (!top || !left || !bottom || !right) {
      throw new Error(`uiedbook: entity.config(top, left, bottom, right) on ${this.name} is invalid`);
    }
    this.left = left;
    this.top = top;
    this.height = bottom;
    this.width = right;
  }
  exec(context, lastDeltalTime) {
    if (this.painter.update && this.visible) {
      this.painter.update(this, context, lastDeltalTime);
    }
    if (this.painter.paint && this.visible) {
      this.painter.paint(this, context, lastDeltalTime);
    } else {
      throw new Error(`uiedbook: entity with name of ${this.name} has no paint function`);
    }
    if (this.behaviors) {
      this.behaviors(this, context, lastDeltalTime);
    }
    if (Array.isArray(this.callBacks)) {
      this.callBacks.forEach(fuc => fuc.call(this, context, lastDeltalTime));
    }
  }
  callBack(...functions) {
    this.callBacks = [...functions];
  }
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
  }
}
const speaker = function (text, language = "", volume = 1, rate = 1, pitch = 1) {
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
const speakerStop = () => speechSynthesis && speechSynthesis.cancel();
/** play mp3 or wav audio from a local file or url  */
const audio = function (audio, loop = false, volumeScale = 1) {
  this.audio = audio;
  this.audio.loop = loop;
  this.audio.volume = volumeScale;
};
audio.prototype = {
  play() {
    return this.audio.play();
  },
  pause() {
    this.audio.pause();
  },
  toggle() {
    if (this.audio.paused) {
      return this.audio.play();
    } else {
      this.audio.pause();
    }
  }
};
class imgPainter {
  constructor(img, delay = 1) {
    this.image = img;
    this.delay = delay;
    this.range = 0;
    this.rotate = false;
    this.observeChange = false;
  }
  update(entity) {
    this.range++;
    if (this.range % this.delay === 0) {
      if (
        lit(this.observeChange, 422)({ left: entity.left, top: entity.top, width: entity.width, height: entity.height })
      )
        return;
      this.observeChange = { left: entity.left, top: entity.top, width: entity.width, height: entity.height };
    }
    if (this.range > 100) {
      this.range = 1;
    }
  }
  paint(entity, context) {
    context.drawImage(this.image, entity.left, entity.top, entity.width, entity.height);
  }
}
// this is a powerful sprite algorithm for
// rendering the exact sprite from a
// spritesheet in successful orders
class spriteSheetPainter {
  constructor(img, horizontal = 1, vertical = 1, delay = 1) {
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
    this.bugCorrecter = 5;
  }
  changeSheet(img, horizontal = 0, vertical = 0, delay = 1) {
    this.image = img;
    this.framesWidth = Math.round(this.image.width / horizontal);
    this.framesHeight = Math.round(this.image.height / vertical);
    this.horizontalPictures = horizontal;
    this.verticalPictures = vertical;
    this.delay = delay;
    this.animateAllFrames = horizontal === 1 && vertical === 1 ? false : true;
  }
  animateFrameOf(frameY = 0) {
    this.frameY = frameY;
  }
  update() {
    this.range++;
    if (this.range % this.delay === 0 && this.animate) {
      if (this.animateAllFrames) {
        // animating all frames from the fisrt image to last in an infinite loop
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
        if (this.frameWidthCount < this.horizontalPictures - 1) {
          this.frameWidthCount++;
        } else {
          this.frameWidthCount = 0;
        }
      }
    }
    if (this.range > 100) {
      this.range = 1;
    }
    if (this.bugCorrecter > 0) {
      console.log(this.bugCorrecter);
      this.bugCorrecter--;
      this.changeSheet(this.image, this.horizontalPictures, this.verticalPictures);
    }
  }
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
}
/** This is the game engine algorithm*/
const game = (function () {
  /* the start function starts the game
    and prepares the dom, it called by the assemble
    function below
    */
  let canvas,
    id,
    gameId,
    context,
    /** the difference between these two is that one is used for calculating and the other is for the game rendering */
    fps,
    fpso = 0,
    lastdt = 0,
    pause = false,
    deltaTime,
    useBg = false,
    gameStart = true;
  const bg = [],
    entitysArray = [],
    /**A canvas for the game */
    screen = buildCanvas("uiedbook_game_canvas"),
    painter = screen.getContext("2d");
  /**the div which the game canvas is mounted on */
  const gameframe = build("div", { id: "gameframe" });
  const intro = canv => {
    const ctx = canv.getContext("2d"),
      img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, canv.width, canv.height);
    img.src = "game-logo.png";
  };
  /**This prepares the dom and call the _render function which calls the animate function which starts the game
   * it is first called by the game.assemble(entities) function
   */
  const start = (fps = 0) => {
    const canvas = buildCanvas("gamecanvas");
    document.body.append(gameframe);
    u(document.body).style({
      margin: "0px",
      padding: "0px",
      boxSizing: "border-box",
      border: "none",
      backgroundColor: "black",
      overflow: "hidden"
    });
    u(gameframe).style({
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
    // done styling let's have some coffee
    gameframe.append(canvas);
    intro(canvas);
    setTimeout(() => {
      _render(canvas, fps);
      toggleRendering();
    }, 2000);
    // just  the game
  };
  const deleteAllEntities = function () {
    if (entitysArray[0]) {
      for (let i = 0; i < entitysArray.length; i++) {
        entitysArray[i].delete = true;
      }
    }
  };
  /**this destroy the game world and pause game rendering */
  const end = () => {
    deleteAllEntities();
    toggleRendering();
    gameframe.parentElement.remove(gameframe);
  };
  /**
   *
   * @param {*img or aud } type
   * @param {*id for the image for retrieval } id
   * @param {*url of the image} url
   * @returns {*html image or audio element } node
   */
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
  function imageFinder(array) {
    const images = array;
    return {
      find(id) {
        const p = images.find(ent => ent.id === id);
        if (p) {
          return p;
        } else {
          throw new Error(`uiedbook: image of id  ${id}  not found`);
        }
      }
    };
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
    return imageFinder(imagesArray);
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
    return audioArray;
  }
  /**function to get sounds by id */
  function getAud(id) {
    const p = audioArray.find(ent => ent.id === id);
    if (p) {
      return p;
    } else {
      throw new Error('uiedbook: audio of id "' + id + '" not found');
    }
  }
  /**function to get images by id */
  function getImg(id) {
    const p = imagesArray.find(ent => ent.id === id);
    if (p) {
      return p;
    } else {
      throw new Error(`uiedbook: image of id  ${id}  not found`);
    }
  }
  /**
   *
   * @param {*image element} img
   * @param {*number background speed} speed
   * @param {*boolean to move backgroung up or down} up
   * @param {*boolean to move background right or left} left
   */
  function bgPaint(img, speed, up, left) {
    const bgImg = new bgPainter(img, speed, up, left, 0, 0, 0);
    bg.push(bgImg);
    useBg = true;
  }
  /**This save the entities to the rendering list and starts the game*/
  function _assemble(...players) {
    if (!players) throw new Error("uiedbook: No players assembled");
    players.forEach(player => {
      entitysArray.push(player);
    });
    if (gameStart) {
      start();
      gameStart = false;
    }
    return entitysArray;
  }
  /**This is called to detect collisions between entities and set their isHit flag to true, and let you do the rest */
  function detectCollision(ent, entityArray, reduce = 0, freeMan) {
    if (typeof entityArray === "string") {
      entityArray = getAllEntities(entityArray);
    }
    for (let j = 0; j < entityArray.length; j++) {
      if (entityArray[j].name === ent.name) {
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
            continue;
          }
        }
      }
    }
    return entityArray;
  }
  /** This get a copy of the canvas during the animation */
  function copyCanvas() {
    const c = buildCanvas("c");
    const cx = c.getContext("2d");
    cx.drawImage(screen, 0, 0, c.width, c.height);
    return c;
  }
  /** this pauses the game rendering */
  function toggleRendering() {
    if (pause) {
      globalThis.requestAnimationFrame(animate);
      pause = false;
    } else {
      globalThis.cancelAnimationFrame(id);
      pause = true;
    }
  }
  /**this get you a copy of the current fps just like i promised */
  function currentFPS() {
    return fpso;
  }
  let seconds = 1000;
  /**this calculate the fps and decides if the game should be rendered  */
  function calcFPS(dt) {
    deltaTime = Math.round(dt - lastdt);
    lastdt = dt;
    seconds = seconds - deltaTime;
    fpso++;
    if (seconds < 1) {
      console.log(`current fps is  ${fpso}`);
      fpso = 0;
      seconds = 1000;
    }
    if (deltaTime > fps) {
      return true;
    } else {
      return false;
    }
  }
  /**Here is the evil game loop */
  function animate(dt) {
    id = globalThis.requestAnimationFrame(animate);
    if (calcFPS(dt)) {
      try {
        /**here and drawing all the backgrounds first
         * you can have move than one that move at
         * different speeds or layered upon each other
         * just to make this engine more powerful
         */
        if (useBg) {
          bg.forEach(b => {
            b.paint(painter, screen.width, screen.height);
            b.update();
          });
        }
        /**Here we are painting and updating all entities */
        entitysArray.forEach((ent, i) => {
          if (ent.delete) {
            entitysArray.splice(i, 1);
            --i;
          }
          ent.exec(painter, dt);
          if (ent.border) {
            ent.observeBorder(screen.width, screen.height);
          }
          if (ent.border) {
            ent.observeBorder(screen.width, screen.height);
          }
        });
        /**drawing to the on-screen canvas */
        context.drawImage(screen, 0, 0, canvas.width, canvas.height);
        /**clearing the off-screen canvas */
        painter.clearRect(0, 0, screen.width, screen.height);
      } catch (error) {
        /**this part can make you  cry*/
        throw new Error(`uiedbook: The canvas cannot be animated due to some errors | ${error}`);
      }
    }
  }
  /**hey this is where th game setup and loop begins*/
  function _render(canv, fpso) {
    canvas = canv;
    context = canv.getContext("2d");
    // matching the off to on screen canvases
    screen.height = canvas.height;
    screen.width = canvas.width;
    fps = fpso;
    id = globalThis.requestAnimationFrame(animate);
  }
  /**with this you can get all the entities or the ones with a specific name or id */
  function getAllEntities(name) {
    if (name === "all" || !name) {
      return entitysArray;
    } else {
      const these = [];
      for (let i = 0; i < entitysArray.length; i++) {
        if (entitysArray[i].name === name || entitysArray[i].id === name) {
          these.push(entitysArray[i]);
        }
      }
      return these;
    }
  }
  const stop = () => {
    globalThis.cancelIdleCallback(gameId);
  };
  const run = (...fuc) => {
    fuc.forEach(f => f());
    gameId = globalThis.requestIdleCallback(run);
  };
  // here am giving you access, make proper use
  return {
    assemble: _assemble,
    loadImage: loadImage,
    loadAudio: loadAudio,
    getImg: getImg,
    getAud: getAud,
    backgroundImage: bgPaint,
    detectCollision: detectCollision,
    copyCanvas: copyCanvas,
    currentFPS: currentFPS,
    getAllEntities: getAllEntities,
    getCanvas: function () {
      return screen;
    },
    toggleRendering: toggleRendering,
    end: end,
    deleteAllEntities: deleteAllEntities,
    run: run,
    stop: stop,
    pause: () => {
      if (!pause) {
        globalThis.cancelAnimationFrame(id);
        pause = true;
      }
    },
    play: () => {
      if (pause) {
        globalThis.requestAnimationFrame(animate);
        pause = false;
      }
    }
  };
})();
class bgPainter {
  constructor(img, speed = 10, up, left, t, l, delay = 0) {
    this.image = img;
    this.speed = speed;
    this.range = 0;
    this.width = this.image.width;
    this.height = this.image.height;
    this.GoesUp = up;
    this.GoesLeft = left;
    this.top = t || 0;
    this.left = l || 0;
    this.delay = delay;
    this.shouldPaint = false;
  }
  update() {
    this.range++;
    if (this.delay % this.range === 0) {
      this.shouldPaint = true;
      if (this.GoesLeft) {
        if (this.left <= -this.width) {
          this.left = 0;
        }
        this.left -= this.speed;
      }
      if (this.GoesUp) {
        if (this.top >= this.height) {
          this.top = 0;
        }
        this.top += this.speed;
      }
    }
  }
  paint(context, w, h) {
    if (this.shouldPaint === true) {
      if (this.GoesLeft) {
        context.drawImage(this.image, this.left, this.top, w, h);
        context.drawImage(this.image, this.left + this.width, this.top, this.width, h);
      } else {
        context.drawImage(this.image, this.left, this.top, w, h);
        context.drawImage(this.image, this.left, this.top - this.height, w, this.height);
      }
      this.shouldPaint = false;
    }
  }
}
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
  create,
  download,
  debounce,
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
  game,
  Entity,
  imgPainter,
  spriteSheetPainter,
  audio,
  speaker,
  speakerStop,
  route,
  t,
  lit
};
// 42 apis contexts
if (typeof globalThis !== "undefined") {
  globalThis.uiedbook = uiedbook;
}
