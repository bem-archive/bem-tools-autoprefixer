var PATH = require('path'),
    AP = require('autoprefixer'),
    BEM = require('bem'),
    QFS = require('q-io/fs');

module.exports = function(registry) {

    registry.decl('AutoprefixerNode', 'GeneratedFileNode', {

        __constructor : function(o) {
            this.input = o.input;
            this.output = o.output;

            this.__base(BEM.util.extend({ path : this.output }, o));
        },

        /**
         * @see https://github.com/ai/autoprefixer#browsers
         * @returns {Array}
         */
        getBrowsers : function() {
            return [];
        },

        make : function() {
            var browsers = this.getBrowsers(),
                input = PATH.resolve(this.root, this.input),
                output = this.getPath();

            return QFS.read(input)
                .then(function(css) {
                    var prefixer = browsers.length? AP.apply(AP, browsers) : AP;
                    return prefixer.process(css).css;
                })
                .then(function(processed) {
                    return QFS.write(output, processed);
                });
        }

    });

};
