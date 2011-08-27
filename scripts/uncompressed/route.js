/**
* Route.js Core
* @author Matthew Jon McLaughlin <mclaughlin.matt@gmail.com>
* @copyright 2011 Matthew Jon McLaughlin <mclaughlin.matt@gmail.com>
*
**/

(function(window, undefined){
    
    var
        History = window.History||undefined,
        Route = window.Route = window.Route||{};
    
    // Check Existence
    if ( typeof Route.init !== 'undefined'  ) {
        throw new Error("Route.js Core has already been loaded.");
    }

    
    // Initialize Route
    Route.init = function(){
        // Check History Requirement
        if( typeof History === 'undefined' || !History.enabled ){
            throw new Error("Route.js requires History.js Core");
        }
        
        /**
        * Route.routes
        * Url to resource object map
        **/
        Route.routes = Route.routes||{};

        /**
        * Route.rootUrl
        * Root url for the application
        **/
        Route.rootUrl = History.getRootUrl();

       /**
       * Route.run()
       * Starts the router listening to statechanges in the location bar
       * and routes the existing url
       **/
       Route.run = function( routes ){
            // Set Routes
            Route.routes = routes||{};
            
            // Route initial url
            Route.dispatch()
            
            // Listen for statechanges
            History.Adapter.bind(window,'statechange',function() {
                Route.dispatch();
            });
       };
       
       Route.dispatch = function(){
            var
                State = History.getState(),
                url = State.url,
                relativeUrl = url.replace(Route.rootUrl, ''),
                relativeUrl = relativeUrl ? '/'+relativeUrl : '/';
            Route.routes[relativeUrl]();
       }

       /**
       * Attach History pushState to onClick events
       **/
       Route.attachStateChangeEvents = function(){
            links = document.getElementsByTagName('a');
            for(var i=0;i<links.length;i++){
                links[i].onclick = function(){
                    var 
                        title = this.title,
                        url = this.href;

                    History.pushState(undefined, title, url);
                    return false;
                }
            }
       };
    }
    
    Route.init();
})(window);
