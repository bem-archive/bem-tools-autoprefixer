module.exports = function(registry) {

registry.decl('BundleNode', {

    createAutoprefixerNode : function(tech, sourceNode, bundleNode, magicNode) {
        var files = sourceNode.getFiles? sourceNode.getFiles() : [sourceNode.path];

        // TODO: ugly splice
        var input = files.splice(0, 1).pop(),
            node = this.useFileOrBuild(
                registry.getNodeClass('AutoprefixerNode').create({
                    root : this.root,
                    input : input,
                    output : this.getBundlePath(tech)
                }));

        if(!node) {
            return;
        }

        var arch = this.ctx.arch;
        arch
            .setNode(node)
            .addChildren(node, sourceNode);

        bundleNode && arch.addParents(node, bundleNode);
        magicNode && arch.addChildren(node, magicNode);

        return node;
    }

});

};
