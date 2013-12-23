exports.getTechs = function() {
    var techs = {
        'bemjson.js' : 'bem/lib/tech/v2'
    };

    ['bemdecl.js', 'deps.js', 'css'].forEach(function(t) {
        techs[t] = 'v2/' + t;
    });

    return techs;
};
