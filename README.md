# bem-tools-autoprefixer

[bem-tools] extention to use [autoprefixer] during building process.

## Usage

Install with `npm`:

```
› npm install bem-tools-autoprefixer
```

Configure your project's `.bem/make.js` to use `bem-tools-autoprefixer`:

```javascript
// .bem/make.js

require('bem-tools-autoprefixer').extendMake(MAKE);

MAKE.decl('BundleNode', {

    getTechs : function() {
        return ['bemdecl.js', 'deps.js', 'css', 'prefix.css'];
    },

    'create-prefix.css-node' : function(tech, bundle, magic) {
        return this.createDefaultTechNode.call(this, 'css', bundle, magic);
    },

    'create-prefix.css-optimizer-node' : function(tech, sourceNode, bundle) {
        var borschikCss = this['create-css-optimizer-node'];
        return borschikCss.apply(this, arguments).map(function(source) {
            var node = this.createAutoprefixerNode(tech, source, bundle);
            return borschikCss.call(this, tech, node, bundle);
        }, this);
    }

});

```

## Settings

You can set browser you want to support in your project.

```javascript
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

See [autoprefixer browsers documentation](https://github.com/ai/autoprefixer#browsers) for more.

--

Autoprefixer parse CSS and add vendor prefixes to CSS rules using values from the [Can I Use][caniuse].

[bem-tools]: http://github.com/bem/bem-tools/
[autoprefixer]: http://github.com/ai/autoprefixer/
[caniuse]: http://caniuse.com/

