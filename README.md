# jQuery Flury - A Labeler Field - [wbotelhos.com/flury](http://wbotelhos.com/flury)

jQuery Flury is a plugin to transform a label on a field descriptor.

## Version

```
@version        0.2.0
@since          2012-12-09
@author         Washington Botelho
@documentation  wbotelhos.com/flury
@twitter        twitter.com/wbotelhos
```

## Required Files

+ jquery.flury.css
+ jquery.flury.js

## Options

```js
exclude: 'input[type="button"], input[type="checkbox"], input[type="image"],
          input[type="radio"], input[type="submit"]' // Fields to be excluded of the hook.
include: ':input'                                    // Fields to be hooked.
inline : true                                        // Applies the `absolute` style inline.
```

## Usage

```js
$('form').flury();
```

```html
<form>
  <label for="name">Name:</label>
  <input id="name" type="text" />
</form>
```

## Functions

```js
$('form').flury('set', { option: 'value' })
```

## Contributors

None

## Licence

The MIT License

Copyright (c) 2012 Washington Botelho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Donate

You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Flury). Thanks! (:
