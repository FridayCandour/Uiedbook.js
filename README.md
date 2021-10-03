# Uiedbook.js
![Ueidbook library](https://blogger.googleusercontent.com/img/a/AVvXsEh6wuvmMyMZYC7kwZ3tGMwjHfJFM9NWzbNGkR_MMqb0SNKnByrzESfdjeXc719frz7TZyErD0JqcqL-joDXuAVNYvjDdgrA9l1ClWRUL9PzYdesm9ijbLXcqeYNLmor3ZNCvqhpvC_cVVg-bVr-blZAgwh6dIoSefWghchGVoz1sVYF5pLKKOHOGqVu=w320-h182?raw=true "uiedbook libray")
Uiedbook is a highly engineered 
JavaScript library built out of necessity 
And establishes standard usage while still
Bringing to the table all the good part of 
JavaScript development techniques and 
debugging functionalities, which most users
New and old appreciate and recommend, it's built 
For every hardworking developer believe in the 
Power of its core provisions and scalability. 



Uiedbook.js has been given birth to in order for 
Developers to quickly create, maintain and publish 
Their products in less time. 

It's a perfect replacement for jquery in all aspects 
And much more, it's shines on it's modern design and 
Is holding reasonable standards needed in the future. 

# installing to your project

you can download the library manually to your 
project folder or you can use npm on the terminal


```
npm i uiedbook
```

# linking to your project

on your html add the following or edit per the directory
you placed Uiedbook 

```
<script src="Uiedbook/Uiedbook.js" type="module"></script>
```

# Quick documentation 
Uiedbook JavaScript  library 1.0.0 documentation

Uiedbook is a modern JavaScript  library for building websites and applications with ease.

APIs in Uiedbook are called contexts
And in this brand new version there are 40 contexts and there includes:


# CSS() context

Uiedbook css context is used for writting css styling right in your JavaScript, it create a creates a style element in your html if you haven't had given one and it add your styles to Dom which paint the target elements immediately,
It accept only normal css style names like border-radius and not camel case,

It's just normal css that get parsed to the Dom, so use don't use Camel case.

# format of the css context

css(element, style  object )

Where element is the I'd, class or any valid css combinations like #body∷before or body:focus also works.

# Use case

css("#container",
{ height: "100%", height: "100%", "background-color": "#ff9800",
"border-radius": "12px"
})

You should put the background-color and the likes in between " " as

"background-color": "#ff9800",

Because background-color means subtraction operation in JavaScript.




# media() context

The media context is used for handling responsive design in your JavaScript  so you can easily manage your applications the view of your applications across all device in your JavaScript,

It parse your stylings and append them to the Dom, it creates a style element if you don't have any one already and it also don't accept camel case styles like the css context.

# format of the media() context

media(media value, array of elements styles)

Where media value is the css device value you are watching for and the other is an array of elements styles

# Use case

media("min-width: 790px",

["#container",
{ width: "100%",
height: "100%",
"background-color": "#0000"
}],

["#header",
{ width: "100%",
height: "20%",
"background-color": "#fff"
}]

)

# animate() context

The animate() context is using for writing css animations right in your JavaScript  especially if you're going to use changing values that JavaScript  can just handle for you on the fly making you abstract very creative animations.

It only accept normal css styling and not camel case so don't do borderRadius just yet instead use "boder-radius".

# format of the animate() context

animate(name,array of styling )

where name is the name of the animation and the other are array of style for each cycle of the animation

# Use case

animate("popanimation",

["from",
{ transform: "scale3D(2)"
, height: "10%",
"background-color": "#0000"
}] ,

["to",
{ transform: "scale3D(1)" ,
height: "100%",
"background-color": "#ff9800"
}]
)

# each() context

The each context is used for manipulating objects or arrays like the forEach array method but it also works on objects as well and is very fast

# format for using the each() context

each(array or object , callback function);

The callback is used to directly manipulate the components of the given input.

# use case

let obj = [1,2,3];

function callback(number){
number * 5;
}
each(obj, callback );




Uiedbook has a very efficient Dom transversal and manipulator inbuilt context called the u context and it is bundled with several very useful methods.

The u context methods includes a bunch of useful methods which includes

# How to select with the u context.

As an improvement to modern library, the u context doesn't grab all the matching elements with the specified selector as default.

u("selector").methods()
Will grab and modify only the first match in the Dom but

u("selector", "all").methods()
Will grab all of them and modify all of them depending on the method you set to operat on it.

so :

u("selector", "all"). style({
color: "#ff9800",
font: "courier"
})
Will grab all the matching elements and apply online styles to them all quickly.

u("selector","").style ({color: "#ff9800"})
Would still do the same thing, Uiedbook is not strict on the all keyword as a second argument.

1.  u("selector"). style({font: "courier"})

This is used to select and add inline styles to Dom elements.

2.  u("selector").appendTo("div", {cassName: "container", id: "app"}, 1)

for creating and appending elements at the speed of light with properties and the you want.

3. u("selector").toggleClass("class")

For toggling CSS class.

4.  u("selector").on("click", eventHandler)

For adding events to Dom elements

5.  u("selector").attr({className: "container",
id: "app"})

6. u("selector"). removeAttr("class")

7. u("selector").html("<p>am a paragraph</p>")

8.  u("selector").text("Uiedbook is easy to use")

9. u("selector").addClass("class")

10. u("selector").removeClass("class")

11. u("selector").hide()

12. u("selector").show()

13. u("selector").scrollTo()

14. u("selector").add(element)

15. u("selector"). remove(index)

16. u("selector").fullScreen().set()

17. u("selector").fullScreen().toggle()

18. u("selector").fullScreen().exit()

19. u(object).config({properties to change})

20. u("selector").each()
The u context has only 20 methods for the current version of Uiedbook, imp

isEmptyObject(object)

Create("div", properties)

Uiedbook.js has been given birth to in order for Developers to quickly create, maintain and publish Their products in less time.



It's a perfect replacement for jquery in all aspects And much more, it's shines on it's modern design and Is holding reasonable standards needed in the future.
