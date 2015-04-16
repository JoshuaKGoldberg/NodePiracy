var http = require("http"),
    url = require("url"),
    captains = {},
    captain, i;

http.createServer(function (request, result) {
    // E.g. { "name": "<yourname>" } from ?name=<yourname>
    var params = url.parse(request.url, true, true),
        query = params.query,
        name;

    result.writeHead(200, {
        "Content-Type": "text/plain"
    });

    // If a name isn't provided, list the past captains
    if (!query.name) {
        if (captain) {
            result.write("Current captain: " + captain + "\n");
            for (i in captains) {
                result.write(i + ": \t " + captains[i] + "\n");
            }
        } else {
            result.write("No captains yet!\n");
        }
        result.end();
        return;
    }

    // If you're already the captain, don't do anything
    if (query.name === captain) {
        result.write(captain + ", you are already the captain!");
        result.end();
        return;
    }

    // Set the captain to the new person, and mark their history
    captain = query.name;
    result.write(captain + ", you are the captain now.");
    captains[captain] = (captains[captain] || 0) + 1;

    result.end();
}).listen(1337, "127.0.0.1");

console.log("Server running at http://127.0.0.1:1337/");
