# tachyons-as-props
> Exposes Tachyons class names as properties

Can be used with solutions like `styled-jsx` (that allows you to write css-in-js as a string) to access all of tachyons as properties on a npm module.

## Install 
```bash
$ npm install --save tachyons-as-props
```

## Usage

The export is an object with the class names mapped as object properties, one thing to note is that all classnames are converted to camelCase and dashes are removed.

e.g 
- `near-black` becomes `nearBlack`
- `bg-washed-green` becomes `bgWashedGreen`

```js
import tachyons from 'tachyons-as-props'

const SomeReactComponent = () => (
  <div className="red-box">

  <style jsx>{`
    .red-box {
      ${tachyons.w3}
      ${tachyons.red}
      ${tachyons.h3}
    }
  `}</style>
  </div>
)
```

## Related & inspiration
- [tachyons](https://github.com/tachyons-css/tachyons) - Without tachyons this wouldnt exist
- [tachyons-components](https://github.com/jxnblk/tachyons-components)
- [tachyons-js](https://github.com/jongold/tachyons-js) - Perfect for react inline styling

## License 
MIT Sam Mason