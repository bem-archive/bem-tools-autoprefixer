module.exports = function(registry) {
    ['autoprefixer', 'bundle'].forEach(function(node) {
        require('./' + node)(registry);
    });
};
