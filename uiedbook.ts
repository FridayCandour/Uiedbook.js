/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  Apache;



                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
 
 
YOU SHOULD GET A COPY OF THE APACHE LICENSE V 2.0 IF IT DOESN'T ALREADY COME WITH THIS MODULE 
*/

type Uied = {
  style(obj: Partial<HTMLElement["style"]>): void;
  config(obj: Partial<ObjectConstructor>): void;
  appendTo(type: string, attribute: Record<string, string>, number?: number): void;
  on(type: string, callback: (e: Event) => void): void;
  attr(attribute_object: Partial<HTMLElement>): string | null | (string | null)[] | undefined;
  removeAttr(attr: string): void;
  html(code: string): void;
  text(text: string): void;
  addClass(clas: string): void;
  removeClass(clas: string): void;
  hide(): void;
  toggleClass(): void;
  show(): void;
  box(w: number, h: number, c?: string): void;
  scrollTo(s?: boolean): void;
  add(nod: Element | HTMLElement | Node): void;
  remove(ind: number): void;
  fullScreen(): {
    toggle: () => void;
    set(): void;
    exist(): void;
  };
};

type BaseE = HTMLElement | NodeListOf<HTMLElement>;

/** the u function is a powerful selector function with added attributes to manipulate dom elements, it does it in a more fast and efficient manner. */
export const u = (el: string | BaseE, ifAll_OrNum?: boolean | number): Uied => {
  const e = get(el, ifAll_OrNum);
  if (!e) throw new Error('element "' + String(el) + '" not found');
  const all = !(e instanceof HTMLElement);

  // the funny parts or extra methods that can be used
  // to manipulate dom  elements are below!

  return {
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
    appendTo(type, attribute, number = 1) {
      const frag = new DocumentFragment();
      if (!all) {
        for (let i = 0; i < number; i++) {
          const element: HTMLElement = document.createElement(type);
          for (const k in attribute) {
            const v = attribute[k];
            element.setAttribute(k, v);
          }
          frag.append(element);
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
        }

        e.forEach(el => {
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
    on(type, callback) {
      function evft(e: Event) {
        return callback(e);
      }
      if (!all) {
        return e.addEventListener(type, evft, false);
      } else {
        return e.forEach(element => {
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
    attr(attribute_object) {
      if (typeof attribute_object !== "object") return;
      if (!all) {
        for (const prop in attribute_object) {
          const attr = attribute_object[prop as keyof typeof attribute_object];
          if (prop === null) {
            return e.getAttribute(prop);
          } else {
            e.setAttribute(prop, String(attr));
          }
        }
      } else {
        for (const prop in attribute_object) {
          const attr = attribute_object[prop as keyof typeof attribute_object];
          if (prop === null) {
            return Array.from(e).map(el => el.getAttribute(prop));
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

    box(w: number, h: number, c = "transparent") {
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
    add(nod: Element | HTMLElement | Node) {
      if (!all) {
        e.append(nod);
      } else {
        e.forEach(el => el.append(nod));
      }
    },
    /*
 *** HOW TO USE ***
let span = document.createElement("span");
u("#container").add(span)

*/
    // for removing elements to the dom elements
    remove(ind: number) {
      if (!all) {
        e.removeChild(e.childNodes[ind]);
      } else {
        e.forEach(el => el.removeChild(el.childNodes[ind]));
      }
    },
    /*
 *** HOW TO USE ***

u("#container").remove(0)

*/

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
            e.requestFullscreen().catch((err: Error) => {
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
          e.requestFullscreen().catch((err: Error) => {
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

export const css = (name: string, sel: string | Record<string, string>, properties?: Record<string, string>): void => {
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
export const media = (value: string, ...properties: [string, Record<string, string>][]): void => {
  const styS = "@media only screen and (" + value + ") " + "{",
    styE = "}";
  let style = "  ",
    aniSty = " ";
  const proplen = properties.length;
  let totalAnimation,
    Animation = "  ";
  const animationStep = (num: number) => {
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

export const animate = (name: string, ...properties: [string, Record<string, string>][]): void => {
  const styS = "@keyframes " + name + " " + "{",
    styE = "}",
    proplen = properties.length;

  let style = " ",
    aniSty = " ",
    Animation = "  ",
    totalAnimation = null;

  const animationStep = (num: number) => {
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

type lay = [a: string, b?: { [k: string]: string }, c?: HTMLElement | Node];
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
export const build = (...layouts: lay[]): DocumentFragment | HTMLElement | Element => {
  function createElement(
    type = "",
    op: { [k: string]: string } = {},
    chil?: (HTMLElement | Node)[] | HTMLElement | Node
  ) {
    const element = document.createElement(type);
    for (const k in op) {
      const v: string | number = op[k];
      element.setAttribute(k, v);
    }
    if (chil) {
      if (Array.isArray(chil)) {
        const frag = new DocumentFragment();
        // templating testing should be done here
        chil.forEach(ch => {
          frag.append(ch);
        });
        element.append(frag);
      } else {
        element.append(chil);
      }
    }
    // return the element after building the dom objects
    return element;
  }

  let i = 0;
  if (layouts.length > 1) {
    i = layouts.length;
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
      const element = createElement(layouts[0][0], layouts[0][1], layouts[0][2]);
      return element;
    }
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

export const buildTo = (child: Node, parent: string | HTMLElement): void => {
  if (typeof parent === "string") {
    document.querySelectorAll(parent).forEach(par => par.appendChild(child));
  } else {
    parent.append(child);
  }
};

const routes: Record<string, { templateId: string; controller: () => any }> = {};
export const route = function (path = "/", templateId: string, controller: () => any): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
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
const router = function (e: Event): void {
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

/** in construction */
export const xhr = function (type: string, url: string | URL): (this: XMLHttpRequest) => any {
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

/** for checking for empty objects */
export const isEmptyObject = function (obj: any): obj is Record<keyof any, never> {
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

export const intersect = (
  target: string,
  opt: IntersectionObserverInit,
  callback: IntersectionObserverCallback
): void => {
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
export const error = (msg: string): never => {
  throw new Error(msg);
};

/** the get function is the u function but without any sweet methods it is used if you want to enjoy the easiness of the u function but don't want to use it awesome methods */
export const get = <All extends boolean | number | undefined = undefined>(
  el: string | BaseE,
  ifAll_OrNum?: All
): null | (All extends undefined ? HTMLElement : NodeListOf<HTMLElement>) => {
  return (
    typeof el === "string"
      ? typeof ifAll_OrNum !== "undefined"
        ? typeof ifAll_OrNum === "number"
          ? document.querySelectorAll<HTMLElement>(el)[ifAll_OrNum]
          : document.querySelectorAll<HTMLElement>(el)
        : document.querySelector<HTMLElement>(el)
      : el
  ) as null | (All extends undefined ? HTMLElement : NodeListOf<HTMLElement>);
};

/** for getting more purer random number */
export const rad = (num: number): number => {
  return Math.floor(Math.random() * Math.floor(num));
};
/*
 *** HOW TO USE ***
rad(5);
// you will get random values from 0 to 5
*/

/** for making css classes */
export const makeClass = (name: string, stylings: string): void => {
  const clas = document.createElement("style");
  const styling = "" + name + "{" + stylings + "}";
  clas.innerHTML = styling;
  document.body.appendChild(clas);
};
/*
 *** HOW TO USE ***
class(".container","color: red;");
*/

/** it's self explanatory some how */
export const create = (type = "div", id = ""): HTMLElement => {
  const element = document.createElement(type);
  element.setAttribute("id", id);
  document.body.appendChild(element);
  return element;
};
/*
 *** HOW TO USE ***
let div = create("div","newdiv");
*/

/** an easy to use download function that returns the link element that should be clicked */
export const download = function (type: string, source: { buffer: Uint8Array }, name: string): HTMLAnchorElement {
  const file = new Blob([source.buffer], { type: type });
  const fileURL = URL.createObjectURL(file);
  const linkElement = document.createElement("a");
  // add the file url
  linkElement.setAttribute("href", fileURL);
  // add the download attribute with name suggestion
  linkElement.setAttribute("download", name);
  return linkElement;
};

export const debounce = (func: () => void, timeout = 600): void => {
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

const callStack: string[] = [];
/** the grandmother algorith for managing ids of anything, don't use it if you don't understand it's power it looks simple. */
export const keep = function (id: string | Record<string, number>, time: number): true | undefined {
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
      for (let k in callObj) {
        let v: number = callObj[k];
        if (callStack.indexOf(k) > -1) {
          callStack.splice(Number(id), 1);
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

export const check = function (id: string): boolean {
  const ind = callStack.indexOf(id);
  if (ind > -1) {
    callStack.filter(key => !(id === key));
    // callStack.splice(ind,1)
    return true;
  } else {
    return false;
  }
};

export const log = (message: any): string[] | undefined => {
  if (message) {
    console.log(message);
  } else {
    if (callStack.length > 0) {
      console.log(callStack);
      return callStack;
    }
  }
};

/** it's self explanatory some how */
export const store = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const retrieve = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const remove = (name: string): void => {
  localStorage.removeItem(name);
};
export const getKey = (index: number): string | null => {
  return window.localStorage.key(index);
};
export const clear = (): void => {
  localStorage.clear();
};

// rebuilt key event lister
const keyObject = function (keysArray: string[], callBack: (e: object) => void) {
  return {
    keysArray: keysArray,
    callBack: callBack
  };
};

type MyArray = {
  keysArray: string[];
  callBack: (e: object) => void;
};

const keysStack: MyArray[] = [];
const keepKeys = function (keys: string[], callback: (e: object) => void): void {
  const call = keyObject(keys, callback);
  keysStack.push(call);
};

const checkKeys = function (keys: string[], e: object, delay: number): void {
  function partOf(a: string[], b: string[]): boolean {
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
};

/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
export const onKeys = (keys: [], callback: (this: Event) => void, object = document, delay = 0, lock = false) => {
  // for handling even more complicated key events,
  if (!keys || !callback) {
    throw new Error("no keys or callbacks given");
  }
  let temporaryKeys: string[] = [];
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

/** under construction!!!!!!! */
export const continuesKeys = (
  keys: string[],
  callback: (this: Event) => void,
  delay = 0,
  object = document,
  lock = true
): void => {
  // for handling even more complicated key events,
  if (!keys || !callback) {
    throw new Error("no keys or callbacks given");
  }
  let temporaryKeys: string[] = [];
  object.addEventListener("keyup", () => {
    temporaryKeys = [];
  });
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
      checkKeys(temporaryKeys, e, delay);
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

continuesKeys(["arrowRight","control"],callback,500,true,container);

*/

export const swipe = (item: Record<string, () => any>): void => {
  const caller: Record<string, () => any> = {};
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

  function handleTouchStart(e: TouchEvent) {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }

  function handleTouchEnd(e: TouchEvent) {
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
    touch(callback: () => void) {
      return callback();
    },
    right(callback: () => void) {
      return callback();
    },

    left(callback: () => void) {
      return callback();
    },

    down(callback: () => void) {
      return callback();
    },

    up(callback: () => void) {
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
export const buildCanvas = function (id: string, w = window.innerWidth, h = window.innerHeight): HTMLCanvasElement {
  const canv = document.createElement("canvas"),
    context = canv.getContext("2d")!,
    backingStores: (string | number)[] = [
      "webkitBackingStorePixelRatio",
      "mozBackingStorePixelRatio",
      "msBackingStorePixelRatio",
      "oBackingStorePixelRatio",
      "backingStorePixelRatio"
    ],
    deviceRatio = window.devicePixelRatio,
    backingRatio = backingStores.reduce(function (prev, curr) {
      // eslint-disable-next-line no-prototype-builtins
      return context.hasOwnProperty(curr) ? (context[curr as keyof CanvasRenderingContext2D] as unknown as string) : 1;
    }),
    ratio = deviceRatio / Number(backingRatio);
  canv.id = typeof id === "undefined" ? "canvas" : id;
  canv.width = Math.round(w * ratio);
  canv.height = Math.round(h * ratio);
  canv.style.width = w + "px";
  canv.style.height = h + "px";
  canv.style.backgroundColor = "black";
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return canv;
};

export const appendCanvas = (id: string, h: number, w: number, parent: HTMLElement): HTMLCanvasElement => {
  /*same as above but with a 
parent to append directly */
  const cv = buildCanvas(id, h, w);
  let par: HTMLElement | undefined;
  if (typeof parent !== "string" && typeof parent !== "undefined") {
    par = parent;
  } else {
    if (typeof parent === "string") {
      par = document.querySelector(parent) ?? undefined;
    } else {
      if (typeof parent === "undefined") {
        par = document.body;
      }
    }
  }
  par!.style.boxSizing = "border-box";
  par!.append(cv);
  return cv;
};

/** this is the RE game time line algorimth */
export const re = (function () {
  /*Re is an interface
 where game views (view) are
 sequenced on.*/
  const games: any[] = [];

  // the build function is for creating the game div
  // and allowing the dev to build upon it
  function build(viewID: string) {
    const frame = document.createElement("div");
    if (viewID) {
      frame.setAttribute("id", viewID);
    }
    u(frame).style({
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
  function mount(template: any, callback: () => void) {
    u("body").appendTo("div", { id: "RE_gameframe" });
    if (games.length === 1) {
      return;
    } else {
      games.push(template);
    }
    if (!callback) return;
    return callback();
  }
  // the flow function ochastrate the game play
  function flow(fram: HTMLElement) {
    fram.append(games[0]);
  }
  // the start function starts the game
  // and manathe dom
  const start = () => {
    if (games.length < 1 || games.length > 1) {
      throw new Error("RE: re.mount() should be called and given a built game world");
    }

    u(document.body).style({
      margin: "0px",
      padding: "0px",
      boxSizing: "border-box",
      border: "none"
    });

    u("#RE_gameframe").style({
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
    const gameframe = get("#RE_gameframe")!;
    flow(gameframe);
  };
  // this stops the game
  const cancel = () => {
    const fram = get("#RE_gameframe")!;
    fram.innerHTML = "";
    renderer.toggleRendering();
    // fram.append(vsg())
  };

  const widget = function (this: any, name: string) {
    this.wig = document.createElement("div");
    this.wig.className = name;
    this.wig.id = name;
    document.body.append(this.wig);
    return this.wig;
  };

  const imagesArray: HTMLImageElement[] = [],
    audioArray: HTMLAudioElement[] = [];
  function loadImage(img: string | string[], id: string) {
    if (typeof img === "object" && !id) {
      for (let i = 0; i < img.length; i++) {
        const p = new Image();
        p.src = img[i][0];
        p.id = img[i][1];
        imagesArray.push(p);
      }
    } else {
      if (typeof img === "string" && id) {
        const i = new Image();
        i.src = img;
        i.id = id;
        imagesArray.push(i);
      } else {
        throw new Error("cannot load image(s)");
      }
    }
  }
  function loadAudio(aud: string | string[], id: string) {
    if (typeof aud === "object" && !id) {
      for (let i = 0; i < aud.length; i++) {
        const p = new Audio();
        p.src = aud[i][0];
        p.id = aud[i][1];
        audioArray.push(p);
      }
    } else {
      if (typeof aud === "string" && id) {
        const i = new Image();
        i.src = aud;
        i.id = id;
        imagesArray.push(i);
      } else {
        throw new Error("cannot load image(s)");
      }
    }
  }

  function getAud(id: string) {
    let p;
    for (let i = 0; i < audioArray.length; i++) {
      if (audioArray[i].id === id) {
        p = audioArray[i];
        break;
      }
    }
    if (p) {
      return p;
    } else {
      throw new Error('RE: audio id "' + id + '" not found');
    }
  }

  function getImg(id: string) {
    let p;
    for (let i = 0; i < imagesArray.length; i++) {
      if (imagesArray[i].id === id) {
        p = imagesArray[i];
        break;
      }
    }
    if (p) {
      return p;
    } else {
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

/** an entity is any object or thing that can be added to the game world */
export class Entity {
  /** width of entiity */
  width = 0;
  /** height of entity */
  height = 0;
  /** distance from the top of the canvas */
  top = 0;
  /** distance from the left of the canvas */
  left = 0;
  /** to check if the entity is displayed */
  visible = true;
  /** to delete an entity */
  delete = false;
  /** to make the entity observer sides or not */
  border = true;
  isHit = false;

  // spritWidth = 0;
  // spritHeight = 0;
  // frame = 0;
  // timer = 0;
  constructor(
    /** this.id = name || "none" //name of the entity for identification can be used out side here */
    public name: string,
    /** callback for paint the entity     can be used out side here */
    public painter: Function,
    /** this is a callback to add additional properties to the entity at runtime */
    public behaviors: Function
  ) {
    this.name ||= "none";
  }
  // this algorimth is for calling the paint function
  // to make it functional when seen at runtime
  update(context: CanvasRenderingContext2D, lastDeltalTime: number) {
    if (typeof this.painter.update !== "undefined" && this.visible) {
      this.painter.update(this, context, lastDeltalTime);
    } else {
      // throw new Error(`RE: entity with name of ${this.name} has no update function`);
    }
  }
  paint(context: CanvasRenderingContext2D, lastDeltalTime: number): void {
    if (typeof this.painter.paint !== "undefined" && this.visible) {
      this.painter.paint(this, context, lastDeltalTime);
    } else {
      throw new Error(`RE: entity with name of ${this.name} has no paint function`);
    }
  }
  observeBorder(w: number, h: number): void {
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
  run(context: CanvasRenderingContext2D, lastDeltalTime: number): void {
    // here the entity don't have to be visble
    if (typeof this.behaviors !== "undefined") {
      this.behaviors(this, context, lastDeltalTime);
    }
  }
}

export class ImgPainter {
  range = 0;
  constructor(public image: HTMLImageElement, public delay = 1) {}
  paint(entity: Entity, context: CanvasRenderingContext2D): void {
    this.range++;
    if (this.range % this.delay === 0) {
      context.drawImage(this.image, entity.left, entity.top, entity.width, entity.height);
    }
    if (this.range > 100) {
      this.range = 1;
    }
  }
}

// this is a powerful sprite algorith for
// rendering the exact sprite from a
// spritesheet in successful orders
export const spriteSheetPainter = function (
  this: this,
  img: HTMLImageElement,
  horizontal = 1,
  vertical = 1,
  delay = 1
) {
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
  this.changeSheet = function (img: HTMLImageElement, horizontal = 0, vertical = 0, delay = 1) {
    this.image = img;
    this.framesWidth = Math.round(this.image.width / horizontal);
    this.framesHeight = Math.round(this.image.height / vertical);
    this.horizontalPictures = horizontal;
    this.verticalPictures = vertical;
    this.delay = delay;
  };

  this.animateFrameOf = function (frameY = 0) {
    this.frameHeightCount = frameY;
    if (this.frameWidthCount <= this.horizontalPictures - 2) {
      this.frameWidthCount++;
    } else {
      this.frameWidthCount = 0;
    }
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
            this.isLastImage = true;
            this.frameWidthCount = 0;
            this.frameHeightCount++;
          }
        } else {
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
  paint(entity: { left: number; top: number; width: number; height: number }, context: CanvasRenderingContext2D) {
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
  }
};

export const speaker = function (text: string, language = "", volume = 1, rate = 1, pitch = 1) {
  // common languages (not supported by all browsers)
  // en - english,  it - italian, fr - french,  de - german, es - spanish
  // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean

  // build utterance and speak
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.volume = volume * 0.3 * 3;
  utterance.rate = rate;
  utterance.pitch = pitch;
  speechSynthesis.speak(utterance);
};

export const speakerStop = () => speechSynthesis && speechSynthesis.cancel();

/** play mp3 or wav audio from a local file or url  */
export const audio = function (this: { audio: HTMLAudioElement }, audio: HTMLAudioElement, loop = 0, volumeScale = 1) {
  this.audio = audio;
  this.audio.loop = loop !== 0;
  this.audio.volume = volumeScale * 0.3;
  return this.audio;
};
audio.prototype = {
  play(this: { audio: HTMLAudioElement }) {
    return this.audio.play();
  },
  pause(this: { audio: HTMLAudioElement }) {
    this.audio.pause();
  },
  toggle(this: { audio: HTMLAudioElement }) {
    if (this.audio.paused) {
      return this.audio.play();
    } else {
      this.audio.pause();
    }
  }
};

export const bgPainter = function (this: this, img: HTMLImageElement, speed = 10, up: boolean, left: boolean): void {
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
  paint(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d")!;
    context.drawImage(this.image, this.left, this.top, canvas.width, this.height);
    if (this.GoesLeft) {
      context.drawImage(this.image, this.left + this.width, this.top, canvas.width, canvas.height);
    } else {
      context.drawImage(this.image, this.left, this.top - this.height, canvas.width, this.height);
    }
  }
};

export const physics = (function () {
  function detectCollision(ent: Entity, name: Entity[], reduce = 0) {
    for (let j = 0; j < name.length; j++) {
      if (
        ent.left + reduce > name[j].left + name[j].width ||
        ent.left + ent.width < name[j].left + reduce ||
        ent.top > name[j].top + name[j].height ||
        ent.top + ent.height < name[j].top + reduce
      ) {
        // console.log("no collisions");
        // return false;
        continue;
      } else {
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
export const renderer = (function () {
  let canvas: HTMLCanvasElement,
    id: any, // for pausing or playing the game
    context: CanvasRenderingContext2D,
    // variables for the timing
    fps: number,
    // background varible
    lastdt = 0,
    nextdt = 0,
    pause = false,
    deltaTime;
  const bg: any[] = [],
    // entity storage array
    entitysArray: Entity[] = [];

  function bgPaint(img: HTMLImageElement, speed: number, up: boolean, left: boolean) {
    const bgImg = new bgPainter(img, speed, up, left);
    bg.push(bgImg);
    return bgImg;
  }

  function animatebg(canvas: HTMLCanvasElement) {
    if (bg === []) return false;
    bg.forEach(b => {
      b.paint(canvas);
      b.update();
    });
  }

  function _assemble(...players: Entity[]) {
    if (!players) throw new Error("RE: No players assembled");
    players.forEach(player => {
      entitysArray.push(player);
    });
    return entitysArray;
  }
  function copyCanvasTo(c: HTMLCanvasElement) {
    if (!c) {
      throw new Error("RE: the main game canvas cannot be copied to a null element");
    }
    const cx = c.getContext("2d")!;
    cx.drawImage(canvas, 0, 0, c.width, c.height);
    return c;
  }

  function toggleRendering() {
    if (pause) {
      window.requestAnimationFrame(animate);
      return (pause = false);
    } else {
      window.cancelAnimationFrame(id);
      return (pause = true);
    }
  }

  function animate(dt: number) {
    id = window.requestAnimationFrame(animate);
    deltaTime = dt - lastdt;
    lastdt = dt;
    nextdt += Math.round(deltaTime);
    if (nextdt > fps) {
      try {
        context.clearRect(0, 0, canvas.width, canvas.height);
        animatebg(canvas);
        entitysArray.forEach((ent, i) => {
          if (ent.delete) {
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
      } catch (error) {
        throw new Error(`RE: the canvas cannot be animated due to some errors > ${String(error)}`);
      }
    }
    nextdt = 0;
  }

  function _render(canv: HTMLCanvasElement, fpso = 0) {
    if (!canv) {
      throw new Error("RE: game needs to be rendered EXP: renderer.render(canvas)");
    }
    canvas = canv;
    context = canvas.getContext("2d")!;
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

export const uiedbook = {
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
  re,
  Entity,
  ImgPainter,
  spriteSheetPainter,
  audio,
  bgPainter,
  renderer,
  speaker,
  speakerStop,
  physics,
  route
};
// 40 apis contexts

if (typeof window !== "undefined") {
  (window as unknown as { uiedbook: typeof uiedbook }).uiedbook = uiedbook;
}
