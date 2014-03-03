# brocolli-browserify

Use `require('modules')` in the browser with
[browersify](https://https://github.com/substack/node-browserify)
and [broccoli](https://github.com/joliss/broccoli)

## Install

```
npm install --save-dev broccoli-browserify
```


## Example

```js
var browserify = require('broccoli-browserify');
tree = browserify(tree, options);
```


## API

### browserify(tree, options)

Options:
 
* `entries` : Array of files to be used as entry points
* `browserify` : Options passed to the browserify constructor see: https://github.com/substack/node-browserify#var-b--browserifyfiles-or-opts
* bundle: Options passed to browserify bundle method see: https://github.com/substack/node-browserify#bbundleopts-cb

## License

MIT © Gareth Andrew
