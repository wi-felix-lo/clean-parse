'use strict';

function init(Parse) {
    
    Parse.initialize('ddRg099YkFSdbBTmdeidrpMZNRGhBe6ITmY52Ibj', '5Cli35VXzvqEQ6xZCN8d4UZQvzrz7OuqPQuMvkue');

    Parse.Cloud = {
        define: function(key, cloudFunction) {

            if (!Parse.Cloud.functions) Parse.Cloud.functions = {};

            Parse.Cloud.functions[key] = cloudFunction;
        },
        run: function(key, params, response) {

            console.log('Pending to run ' + key);
            process.nextTick(function() {

                console.log('Start running ' + key);
                Parse.Cloud.functions[key]({
                    params: params
                }, response);
                console.log('Finish running ' + key);
            });
            console.log('Pended to run ' + key);
        }
    };
    
    return Parse;
}

module.exports = init(require('parse').Parse);
