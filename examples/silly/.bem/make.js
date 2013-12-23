/* global MAKE:false */

require('../../../').extendMake(MAKE);

var path = require('path');

MAKE.decl('Arch', {
    blocksLevelsRegexp : /^blocks$/,
    bundlesLevelsRegexp : /^bundles$/
});

MAKE.decl('BundleNode', {
    getLevels : function() {
        return [
            path.resolve(this.root, 'blocks')
        ];
    },

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
