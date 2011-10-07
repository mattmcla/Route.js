Route.JS
********

A url to resource routing module powered by History.js.

Status
------

Currently this is a major work in progress and not recomended for use. However, I'm totally open to feed back!

Change Log
----------

*v0.01*
 - Add single, or batch of routes to the route table.
 - Remove single route from route table.
 - Simple routes are dispatched to mapped functions.
 - Requested routes that do not exist result in an error page (which you can override)
 - route.js ensures only one instance of itself exists and is attached to the global scope (window)