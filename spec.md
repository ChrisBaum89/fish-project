The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format.
-- JSON is used and fetch is used

The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.
-- create Category and Fish JS objects to encapsulate the data from the API server

The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.
-- Category has-many Fish

The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, and Delete (CRUD). Your client-side JavaScript code must use fetch with the appropriate HTTP verb, and your Rails API should use RESTful conventions.
-- Post request made with the Contact Us
-- Read request made to get Fish information from backend
-- AJAX is used via fetch
    --- Read fish data from API via Categories
    --- POST messages from the Contact Us page
