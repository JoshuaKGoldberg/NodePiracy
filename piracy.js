var express = require("express"),
    url = require("url"),
    app = express(),
    captains = {},
    captain, i;

app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public"));

app.get("/", function (request, response) {
    // E.g. { "name": "<yourname>" } from ?name=<yourname>
    var params = url.parse(request.url, true, true),
        query = params.query,
        name;

    // If a name isn"t provided, list the past captains
    if (!query.name) {
        if (captain) {
            response.send("Current captain: " + captain + "\n");
            for (i in captains) {
                response.send(i + ": \t " + captains[i] + "\n");
            }
        } else {
            response.send("No captains yet!\n");
        }
        response.end();
        return;
    }

    // If you"re already the captain, don"t do anything
    if (query.name === captain) {
        response.send(captain + ", you are already the captain!");
        response.end();
        return;
    }

    // Set the captain to the new person, and mark their history
    captain = query.name;
    response.send(captain + ", you are the captain now.");
    captains[captain] = (captains[captain] || 0) + 1;

    response.end();
});

app.listen(app.get("port"), function () {
    console.log("Server running at " + app.get("port"));
});
