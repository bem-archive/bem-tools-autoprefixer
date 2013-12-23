# bem-tools-autoprefixer

[bem-tools] extention to use [autoprefixer] during building process.

## Usage

1. Install with `npm`:

```
› npm install bem-tools-autoprefixer
```

2. Configure your project's `.bem/make.js` to use `bem-tools-autoprefixer`:

```javascript
// .bem/make.js

require('bem-tools-autoprefixer')(MAKE);

MAKE.decl('BundleNode', {

    getTechs : function() {
        return ['bemdecl.js', 'deps.js', 'css'];
    },

    'create-css-node' : function(tech, bundleNode, magicNode) {
        var sourceNode = this.__base.apply(this, arguments);
        return this.createAutoprefixerNode(tech, sourceNode, bundleNode, magicNode);
    }

});

```

## Settings

You can set browser you want to support in your project.

```
// make.js

MAKE.decl('AutoprefixerNode', {

    getBrowsers : function() {
        return [
            'last 2 versions',
            'firefox >= 20',
            'android 4'
        ];
    }

});
```

See [autoprefixer browsers documentation][1] for more.

--

Autoprefixer parse CSS and add vendor prefixes to CSS rules using values from the [Can I Use][caniuse].

[1]: https://github.com/ai/autoprefixer#browsers
[bem-tools]: http://github.com/bem/bem-tools/
[autoprefixer]: http://github.com/ai/autoprefixer/
[caniuse] http://caniuse.com/

