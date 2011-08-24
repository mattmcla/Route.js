/**
* Route.js Core
* @author Matthew Jon McLaughlin <mclaughlin.matt@gmail.com>
* @copyright 2011 Matthew Jon McLaughlin <mclaughlin.matt@gmail.com>
*
**/

(function(window, undefined){
    
    var
        Route = window.Route = window.Route||{};
    
    // Check Existence
    if ( typeof Route.init !== undefined  ) {
        throw new Error("Route.js Core has already been loaded.");
    }
    
    Route.init = function(){
        
    }
    
    Route.init();
})(window);
