#### fn.after ()

Inserts content or elements after the collection.

```js
$(element).after ( element ) // => collection
$(element).after ( htmlString ) // => collection
$(element).after ( content [, content] ) // => collection
```

#### fn.before ()

Inserts content or elements before the collection.

```js
$(element).before ( element ) // => collection
$(element).before ( htmlString ) // => collection
$(element).before ( content [, content] ) // => collection
```

#### fn.children ()

Without a selector specified, returns a collection of child elements.

With a selector, returns child elements that match the selector.

```js
$(element).children () // => collection
$(element).children ( selector ) // => collection
```

#### fn.clone ()

Returns a collection with cloned elements.

```js
$(element).clone () // => collection
```

#### fn.detach ()

Removes collection elements, optionally that match the selector, from the DOM.

```js
$(element).detach () // => collection
$(element).detach ( selector ) // => collection
```

#### fn.empty ()

Empties the elements interior markup.

```js
$(element).empty () // => collection
```

#### fn.filter ()

Returns the collection that results from applying the filter selector/method.

```js
$(element).filter ( selector ) // => collection
$(element).filter ( function ( index, element ) {} ) // => collection
```

#### fn.first ()

Returns a collection containing only the first element.

```js
$(element).first () // => collection
```

#### fn.get ()

Returns the element at the index, or returns all elements.

```js
$(element).get ( index ) // => domNode
$(element).get () // => domNode[]
```

#### fn.has ()

Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.

```js
$(element).has ( selector ) // => collection
$(element).has ( element ) // => collection
```

#### fn.hasClass ()

Returns the boolean result of checking if any element in the collection has the `className` attribute.

```js
$(element).hasClass ( className ) // => boolean
```

#### fn.height ()

Returns or sets the height of the element.

```js
$(element).height () // => Integer
$(element).height ( number ) // => collection
```

#### fn.index ()

Returns the index of the element in its parent if an element or selector isn't provided. Returns index within element or selector if it is.

```js
$(element).index () // => Integer
$(element).index ( element ) // => Integer
```

#### fn.innerHeight ()

Returns the height of the element + padding.

```js
$(element).innerHeight () // => Integer
```

#### fn.innerWidth ()

Returns the width of the element + padding.

```js
$(element).innerWidth () // => Integer
```

#### fn.insertAfter ()

Inserts collection after specified element.

```js
$(element).insertAfter ( element ) // => collection
```

#### fn.insertBefore ()

Inserts collection before specified element.

```js
$(element).insertBefore ( element ) // => collection
```
#### fn.last ()

Returns a collection containing only the last element.

```js
$(element).last () // => collection
```

#### fn.map ()

Returns a new collection, mapping each element with `callback ( index, element )`.

```js
$(selector).map ( callback ) // => collection
```

#### fn.not ()

Filters collection by false match on collection/selector.

```js
$(element).not ( selector ) // => collection
$(element).not ( collection ) // => collection
```

#### fn.off ()

Removes event listener from collection elements.

Accepts space-separated `eventName` for removing multiple events listeners.

Removes all event listeners if called without arguments.

```js
$(element).off ( eventName, eventHandler ) // => collection
$(element).off ( eventName ) // => collection
$(element).off ( eventsMap ) // => collection
$(element).off () // => collection
```

#### fn.offset ()

Get the coordinates of the first element in a collection relative to the document.

```js
$(element).offset () // => Object
```

#### fn.offsetParent ()

Get the first element's ancestor that's positioned.

```js
$(element).offsetParent () // => collection
```

#### fn.on ()

Adds event listener to collection elements.

Accepts space-separated `eventName` for listening to multiple events.

Event is delegated if delegate is supplied.

```js
$(element).on ( eventsMap ) // => collection
$(element).on ( eventName, eventHandler ) // => collection
$(element).on ( eventName, delegate, eventHandler ) // => collection
```

#### fn.outerHeight ()

Returns the outer height of the element. Includes margins if `includeMargings` is set to true.

```js
$(element).outerHeight () // => Integer
$(element).outerHeight ( includeMargins ) // => Integer
```

#### fn.outerWidth ()

Returns the outer width of the element. Includes margins if `includeMargings` is set to true.

```js
$(element).outerWidth () // => Integer
$(element).outerWidth ( includeMargins ) // => Integer
```

#### fn.parent ()

Returns collection of elements who are parent of elements.

```js
$(element).parent () // => collection
$(element).parent ( selector ) // => collection
```

#### fn.parents ()

Returns collection of elements who are parents of elements. Optionally filtering by selector.

```js
$(element).parents () // => collection
$(element).parents ( selector ) // => collection
```

#### fn.parentsUntil ()

Returns collection of elements who are parents of elements, until a provided selector matches. Optionally filtering by selector.

```js
$(element).parentsUntil ( selector ) // => collection
$(element).parentsUntil ( selector, filterSelector ) // => collection
```

#### fn.position ()

Get the coordinates of the first element in a collection relative to its `offsetParent`.

```js
$(element).position () // => object
```

#### fn.prepend ()

Prepends content or elements to the each element in collection.

```js
$(element).prepend ( element ) // => collection
$(element).prepend ( htmlString ) // => collection
$(element).prepend ( content [, content] ) // => collection
```

#### fn.prependTo ()

Prepends elements in a collection to the target element(s).

```js
$(element).prependTo ( element ) // => collection
```

#### fn.prev ()

Returns the previous adjacent elements.

```js
$(element).prev () // => collection
$(element).prev ( selector ) // => collection
```

#### fn.prevAll ()

Returns all the previous elements.

```js
$(element).prevAll () // => collection
$(element).prevAll ( selector ) // => collection
```

#### fn.prevUntil ()

Returns all the previous elements, until the provided selector matches.

```js
$(element).prevUntil ( selector ) // => collection
$(element).prevUntil ( selector, filterSelector ) // => collection
```
#### fn.replaceWith ()

Replace collection elements with the provided new content.

```js
$(element).replaceWith ( content ) // => collection
```

#### fn.serialize ()

When called on a form, serializes and returns form data.

```js
$(form).serialize () // => String
```

#### fn.siblings ()

Returns a collection of sibling elements.

```js
$(element).siblings () // => collection
$(element).siblings ( selector ) // => collection
```

#### fn.slice ()

Returns a new collection with elements taken from start to end.

```js
$(selector).slice ( start, end ) // => collection
```

#### fn.toggle ()

Hide or show the elements.

```js
$(element).toggle () // => collection
```

#### fn.trigger ()

Triggers supplied event on elements in collection. Data can be passed along as the second parameter.

```js
$(element).trigger ( eventName ) // => collection
$(element).trigger ( eventObj ) // => collection
$(element).trigger ( eventName, data ) // => collection
$(element).trigger ( eventObj, data ) // => collection
```

#### fn.unwrap ()

Removes the wrapper from all elements.

```js
$(element).unwrap () // => collection
```

#### fn.val ()

Returns an inputs value. If value is supplied, sets all inputs in collection's value to the value argument.

```js
$(input).val () // => value
$(input).val ( value ) // => collection
```

#### fn.width ()

Returns or sets the width of the element.

```js
$(element).width () // => number
$(element).width ( number ) // => collection
```

#### fn.wrap ()

Wraps a structure around each element.

```js
$(element).wrap ( structure ) // => collection
```

#### fn.wrapAll ()

Wraps a structure around all elements.

```js
$(element).wrapAll ( structure ) // => collection
```

#### fn.wrapInner ()

Wraps a structure around all children.

```js
$(element).wrapInner ( structure ) // => collection
```
