title Untitled

client->server:HTTP POST /new_note (with the form data)
note right of server: server updates the database as per the form data
server->client:302 Redirect Response (with the redirect location /exampleapps/notes)
client->server:HTTP GET /exampleapps/notes
server->client:index.html, main.css and main.js
note left of client: main.js runs and makes AJAX request
client->server: HTTP GET /exampleapp/data.json
server->client: data.json
note left of client: The JS in main.js updates the HTML with the data from data.json
