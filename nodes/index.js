exports.extendMake = function setupMake(registry) {
    ['autoprefixer', 'bundle'].forEach(function(node) {
        require('./' + node)(registry);
    });
};
