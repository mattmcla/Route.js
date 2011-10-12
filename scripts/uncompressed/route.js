/**
 * Route.js Core
 * 
 * @author Matthew Jon McLaughlin <mclaughlin.matt@gmail.com>
 * @copyright 2011 Matthew Jon McLaughlin <mclaughlin.matt@gmail.com>
 * 
 */

(function(window, undefined) {

	var 
        History = window.History || undefined, 
        Route = window.Route = window.Route	|| {};

	// Check Existence
	if (typeof Route.init !== 'undefined') {
		throw new Error("Route.js Core has already been loaded.");
	}

	// Initialize Route
	Route.init = function() {
		// Check History Requirement
		if (typeof History === 'undefined' || !History.enabled) {
			throw new Error("Route.js requires History.js Core");
		}

		/**
		 * Route.routes 
		 * 
		 * Url to resource object map
		 */
		Route.routes = Route.routes || {};

		/**
		 * Route.rootUrl 
		 * 
		 * Root url for the application
		 */
		Route.rootUrl = History.getRootUrl();

		/**
		 * Route.addRoutes(routes) 
		 * 
		 * Adds routes to the route table. Will overwrite
		 * existing routes.
		 * 
		 * @param {Object} routes - Map of urls and their resources
		 * @return {true}
		 */
		Route.addRoutes = function(routes) {
			var routeTable = Route.routes;
            
            for (url in routes) {
                // Validate is function
                if(typeof routes[url] !== 'function') {
                    throw new Error('Route.addRoutes: ');
                }
                
                // Add Route to route table
				routeTable[url] = routes[url];
			}
            return true;
		};

        /**
        * Route.addRoute(url, action)
        *
        * Add a single route to the route table. Will overwirte existing 
        * route of the same key
        *
        * @param {string} url - url template
        * @param {function} action - method to call
        *
        * @return {true}
        **/
        Route.addRoute = function(url, action) {
            if(typeof action !== 'function') {
                throw new Error('Route.addRoute: param action must be a function');
            }

            Route.routes[url] = action;
            return true;
        };

        /**
        * Route.removeRoute(url)
        *
        * Remove a route from the route table.
        *
        * @param {string} url - url to remove
        * 
        * @returns
        **/
        Route.removeRoute = function(url) {
            delete Route.routes[url];
        }

		/**
		 * Route.dispatch() 
		 * 
		 * Evaluates the resource mapped to the current url
		 */
		Route.dispatch = function() {
			var 
				State = History.getState(), 
				url = State.url, 
				relativeUrl = url.replace(Route.rootUrl, ''), 
				matchUrl = relativeUrl ? '/'+relativeUrl	: '/';
		    
            if(typeof Route.routes[matchUrl] !== 'function'){
                Route.errorHandlers.invalidRoute();
            } else {
                Route.routes[matchUrl]();
            }
		};
        
        /**
        * Route.errorHandlers
        *
        * Object containing error handling routes. This should be overwritten
        * by the developer.
        * @return
        **/
        Route.errorHandlers = {
            invalidRoute: function(){
                var body = window.document.getElementsByTagName('body');
                body[0].innerHTML = '<h1>Invalid Route</h1>';
            }
        };

		/**
		 * Attach History pushState to onClick events
         * 
         * @todo I feel like there's a better way to do this, it's worth a
         * revisit.
		 */
		Route.attachStateChangeEvents = function() {
			links = window.document.getElementsByTagName('a');
			for ( var i = 0; i < links.length; i++) {
				links[i].onclick = function() {
					var title = this.title, url = this.href;
					History.pushState(undefined, title, url);
					return false;
				};
			}
		};

        // Listen for statechanges
        History.Adapter.bind(window, 'statechange', function() {
            Route.dispatch();
        });
	};

	Route.init();
})(window);
