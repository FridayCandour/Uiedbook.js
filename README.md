# Uiedbook.js

![Ueidbook library](https://blogger.googleusercontent.com/img/a/AVvXsEh6wuvmMyMZYC7kwZ3tGMwjHfJFM9NWzbNGkR_MMqb0SNKnByrzESfdjeXc719frz7TZyErD0JqcqL-joDXuAVNYvjDdgrA9l1ClWRUL9PzYdesm9ijbLXcqeYNLmor3ZNCvqhpvC_cVVg-bVr-blZAgwh6dIoSefWghchGVoz1sVYF5pLKKOHOGqVu=w320-h182?raw=true "uiedbook libray")

# uiedbook

Uiedbook is a javascript library for building web apps and games.

It has been given birth to in order for
Developers to quickly create, maintain and publish
Their products in less time.

uiedbook shines on it's modern design and
Is holding reasonable standards needed in the future.

## size 

| Size               | uiedbook    |
| ------------------ | ----------- |
| Unminified         | **36.5 KB** |
| Minified           | **16 KB**   |
| Minified & Gzipped | **6 KB**    |

### custom builds are available too!

## support features

| Features                 | uiedbook |
| ------------------------ | -------  |
| Supports Older Browsers  | ✔        |
| Supports Modern Browsers | ✔        |
| Actively Maintained      | ✔        |
| Namespaced Events        | ✔        |
| Typed Codebase           | ✔        |
| TypeScript Types         | ✔        |
| first class node support | ✔        |

## installing to your project

you can get uiedbook from [CloudFlare](https://cdnjs.cloudflare.com/ajax/libs/uiedbook/1.0.56/uiedbook.min.js) or [jsDelivr](https://cdn.jsdelivr.net/npm/uiedbook@1.0.56/uiedbook.min.js) and use it like this:

```html
<script src="https://cdn.jsdelivr.net/npm/uiedbook@1.0.56/uiedbook.min.js" type="module"></script>
<script>
  u("#container").style({
    color: "aqua",
    backgroundColor: "#ff9800"
  });
</script>
```

uiedbook can be downloaded manually from [npm](http://npmjs.com) as the [`uiedbook`](https://www.npmjs.com/package/uiedbook) package:

```sh
npm install --save uiedbook

or

npm i uiedbook
```

That you can then use like this:

```js
import u from "uiedbook";

 u(document.body).appendTo("div",
 {
   id: "new-div"
  }, 5);
  // 5 is the number created
```

# uiedbook Documentation

Uiedbook JavaScript library 1.0.57 documentation

### APIs in Uiedbook are called contexts

And in this brand new version there are 40 contexts covering wide use cases for software development, a notable feature of uiedbook is it's abilty to extend all the contexts and have access to change property behaviors the way you want.

### u(selector) context

This is one of the selectors contexts available for uiedbook. once the DOM is ready, it is configured by default to only get the first element matching the given selector only. to get all the available nodes matching the selector, a second argument "all", is introduce, as far as the second argument is not a number and given, it will get all the nodes matching the selector. If it's a numer, it will get the node at the index of the number only. 20 useful methods are bundled to the u() context.

The selector value of the u() context is not limited only to DOM selectors values like "div" or "body",
objects, functions and variables holding refernce to html elements can be used as the selector and will be manipulated based the attached methods only pertaining to the type of the selector, making the u() context highly useful for many use cases.

#### extending the u() context -- u().method

The main prototype for collections, allowing you to extend Cash with plugins by adding methods to make changes the selected elements.

```js
u().myMethod = function () {};
// for tested speed u() is not a class based context and the selected element(s) is defined as e;
//  so:
u("selector").myMethod = function () {
  console.log(e);
  // e is the selected element(s)
};

// and you can use inbuilt methods already in the U() context upon your new method
```

## How to select with the u context

As an improvement to this new version of the library, the u context doesn't grab all the matching elements with the specified selector as default.

```js
u("selector").methods();
```

Will grab and modify only the first match in the Dom

```js
u("selector", "all").methods();
```

Will grab all of them and modify all of them depending on the method you set to operat on it.

so :

```js
u("selector", "all").style({
  color: "#ff9800",
  font: "courier"
});
```

Will grab all the matching elements and apply inline styles to them all.

```js
u("selector", "").style({ color: "#ff9800" });
```

Would still do the same thing, Uiedbook is not strict on the all keyword as a second as far it's not a number argument.

```js
u("selector", 5).style({ color: "#ff9800" });
```

Would grab the 5 element in the DOM matching the selector, indexing starts at 1 tho.

### methods for the u() context

1. the primary style method

it's camel case styling values like backgroundColor instead of background-color, and styles inline, other contexts are available for doing crazy css styling

```js
u("selector").style({ font: "courier", border: "5px", backgroundColor: "dimgrey" });
```

This is used to select and add inline styles to Dom elements, it returns the selected elements.

1.  the appendTo method acts beautifully different if you have used something like it in other libraries, here it's used only to create new html elements of a set of numbers you specify and properties for all of them.
    any element created with the appendTo method will be appended to the selected eelement, and returned.

```js
u("selector").appendTo("div", { cassName: "container", id: "app" }, 1);
```

for creating and appending elements at the speed of light with properties and the you want, it returns either an element if it's one or an array of nodes wen it's more than one.

1.  `u("selector").scrollTo(true)`

For scrolling DOM elements into view

1.  `u("selector").add(element)`

For appending nodes to DOM elements

1. `u("selector").remove()`
   Removes collection elements, optionally that match the selector, from the DOM and removes all their event listeners.
   or `u("selector").remove(index)`

For removing nodes from DOM elements at a specified index

1.  `u("selector").fullScreen().set()`

For making DOM elements fullscreen

1.  `u("selector").fullScreen().toggle()`

For toggling fullscreen on DOM elements

1.  `u("selector").fullScreen().exit()`

For exiting fullscreen off DOM elements

1.  `u(object).config({properties to change})`

For changing or adding new properties to all javascript objects

1.  `u("selector").each(function)`
    For a custom call back function to working selected DOM elements, it calls the call back function with the selected DOM elements as it's argument

## other u() context methods includes

1. `u("selector").toggleClass("class")`

For toggling CSS class.

1.  `u("selector").on("click", eventHandler)`

For adding events listeners to DOM elements

1. `u("selector").off("click", eventHandler)`

For removing events listeners from DOM elements

1.  ` u("selector").attr({className: "container", id: "app"})`

for adding attributes to DOM elements

1.  `u("selector"). removeAttr("class")`

For removing attributes from DOM elements

1.  `u("selector").html("<p>am a paragraph</p>")`

For inserting html contents to DOM elements

1.  `u("selector").text("Uiedbook is easy to use")`

For inserting text contents to DOM elements

1.  `u("selector").addClass("class")`

For adding CSS classes to DOM elements

1.  `u("selector").removeClass("class")`

For removing CSS classes to DOM elements

1.  `u("selector").hide()`
    For hiding DOM elements

1.  `u("selector").show()`

For displaying hidden DOM elements

# styling, @media, and animating in uiedbook

## CSS() context

Uiedbook css context is used for writting css styling right in your JavaScript, it create a creates a style element in your html if you haven't had given one and it add your styles to Dom which paint the target elements immediately,
It accept only normal css style names like border-radius and not camel case,

It's just normal css that get parsed to the Dom, so use don't use Camel case.

#### format of the css context

`css(element, style object )`

Where element is the I'd, class or any valid css combinations like #body∷before or body:focus also works.

#### Use case

```js
css("#container", { height: "100%", height: "100%", "background-color": "#ff9800", "border-radius": "12px" });
```

You should put the background-color and the likes in between " " as

`"background-color": "#ff9800",`

Because background-color means subtraction operation in JavaScript.

## media() context

The media context is used for handling responsive design in your JavaScript so you can easily manage your applications the view of your applications across all device in your JavaScript,

It parse your stylings and append them to the Dom, it creates a style element if you don't have any one already and it also don't accept camel case styles like the css context.

#### format of the media() context

media(media value, array of elements styles)

Where media value is the css device value you are watching for and the other is an array of elements styles

#### Use case

```js
media(
  "min-width: 790px",

  ["#container", { width: "100%", height: "100%", "background-color": "#0000" }],

  ["#header", { width: "100%", height: "20%", "background-color": "#fff" }]
);
```

## animate() context

The animate() context is using for writing css animations right in your JavaScript especially if you're going to use changing values that JavaScript can just handle for you on the fly making you abstract very creative animations.

It only accept normal css styling and not camel case so don't do borderRadius just yet instead use "boder-radius".

#### format of the animate() context

animate(name,array of styling )

where name is the name of the animation and the other are array of style for each cycle of the animation

#### Use case

```js
animate(
  "popanimation",

  ["from", { transform: "scale3D(2)", height: "10%", "background-color": "#0000" }],

  ["to", { transform: "scale3D(1)", height: "100%", "background-color": "#ff9800" }]
);
```

# building responsive layouts with uiedbook

## build() and buildTo contexts

The build() and buildTo contexts are using for writing layout elements right in your JavaScript.

#### format of the animate() context

The build() context accept 3 values

1. the type of element to create like "div"
1. an object containing properties of the element
1. one child or an array of children

The buildTo context is used to append the built element to a parent especially if they are more than one child element or parent or both

#### Use case

```js
  const p = build(
  "div",
  {
    title: "title",
    innerText: "am a title",
    onclick: function () {
      console.log("i'm a paragragh");
    }
  };

buildTo(p, "body");
```

### isEmptyObject

for checking if an object is empty or not

```js
let objA = { a: "kd" };
let objB = {};
console.log(isEmptyObject(objA));
// false
console.log(isEmptyObject(objB));
// true
```

### intersect

learn more about intersect in javascript before using this simple API context,
the first argument is the selector or id of the DOM element to watch,
while the second options is the set of options needed for the intersection, and the third argument is the callback function to be called if the intersection occures.

```js
function call() {
  console.log("the element is on watch)");
}
intersect(
  "span",
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
  },
  call
);
```

## The get context

The get() is a stand alone context to get elements form the DOM just like the u() context does it, the get context doesn't grab all the matching elements with the specified selector as default.

```js
get("selector");
```

Will grab and modify only the first match in the Dom

```js
get("selector", "all");
```

Will grab and return all of them

```js
get("selector", "").innerText = "i was grabbed from the DOM";
```

Would still do the same thing, Uiedbook is not strict on the all keyword as a second as far it's not a number argument.

```js
get("selector", 5);
```

Would grab the 5 element in the DOM matching the selector, indexing starts at 1 tho.

## rad()

for get purer random values

```js
rad(5);
// you will get random values from 0 to 5
```

## create()

for creating elements

```js
let div = create("div", { id: "newdiv" });
```

## download()

```js
const videoLink = download("mp4", videoSouce, "download me!!");
```

## debounce()

debounce function for calling callbacks at a determined number of times

```js
debounce(function , 1000);
```

## onKeys()

for calling an event once as it occurs

```js
let container = get("#container");

let callback = () => {
  console.log("arrow right and the control keys was clicked together");
};

onKeys(["arrowRight", "control"], callback, container);
```

## continuesKeys()

for writting events that keeps calling as far the event lasts

```js
let container = get("#container");

let callback = () => {
  console.log("arrow right and the control keys was clicked together");
};

continuesKeys(["arrowRight", "control"], callback, 500, true, container);
```

## swipe()

for writting swipe events on touch device

```js
function touch() {
  console.log("touching");
}

function up() {
  console.log("swipe up");
}

function down() {
  console.log("swipe down");
}

function right() {
  console.log("swipe right");
}

function left() {
  console.log("swipe left");
}

let obj = { down: down, touch: touch, up: up, right: right, left: left };

swipe(obj);
// letting take care of the rest
```

## The route()

The route() context is an unopinionated context for managing views of a an app, you define a path using the route() context and a link element is returned having the defined path, so you can append it to where it's needed, even if you didn't use the link element the callback you attached will be calle when ever that url is visited in the application.

```js
const home = route("/", "home", function () {
  get("div").innerText = " welcome to the home page";
  console.log("we are at the home page");
});

get("element").append(home);

const about = route("/about", "about", function () {
  get("div").innerText = " welcome to the about page";
  console.log("we are at the about page");
});

get("element").append(about);

// the attached callback is called whenever the URL is visited
```

### parseHTML ()

Returns a collection from an HTML string.

```js
parseHTML(htmlString); // => collection
```

### unique ()

Returns a new array with duplicates removed.

```js
unique(array); // => array
```

# The uiedbook game engine

The followings are awesome uiedbook game engine context for 2D.

documentation for the engine will be given soon, support the project :)
buildCanvas, appendCanvas, re, Entity, ImgPainter, spriteSheetPainter, audio, bgPainter, renderer, speaker, speakerStop, physics.

## Contributing uiedbook

If you found a problem, or have a feature request, please open an [issue](https://github.com/FridayCandour/uiedbook/issues) about it.

If you want to make a pull request you should:

1. Clone the repository: `git clone https://github.com/FridayCandour/uiedbook.git`.
2. Enter the cloned repository: `cd uiedbook`
3. Install the dependencies: `npm install`.
4. Automatically recompile Cash whenever a change is made: `npm build`.
5. Remember to update the readme, if necessary.

Uiedbook.js has been given birth to in order for Developers to quickly create, maintain and publish Their products in less time.

## Thanks

- **[@suppen](https://github.com/suppen), [@trgwii](https://github.com/trgwii)** and all the contributors who helped making Uiedbook.
- **[Sauce Labs](https://saucelabs.com)** - The cross-browser testing platform we use for testing our builds in all the supported environments.

## License

MIT © Friday Candour
