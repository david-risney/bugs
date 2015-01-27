(function () {
    "use strict";

    // Turns the query of the current document's URI into a name value object. E.g.:
    //      http://example.com/?a=b&c=d
    //  =>  { a: "b", c: "d" }
    function getQueryNameValuePairs() {
        // First split on the '&' which delimits the name/value pairs.
        return document.location.search.substr(1).split("&").map(function (nameValue) {
            var split = nameValue.split("=").map(decodeURIComponent); // Map the name/value pair strings into name/value objects.
            return {
                name: split[0],
                value: split[1] || ""
            };
        }).reduce(function (total, next) { // Take every name/value pair object and add it to an empty object as a property.
            total[next.name] = next.value;
            return total;
        }, {});
    }

    function navigateTo(uri) {
        document.addEventListener("DOMContentLoaded", function () {
            var navigateButton = document.createElement("button");
            navigateButton.textContent = "Navigate";
            navigateButton.addEventListener("click", function () {
                document.location.href = uri;
            });
            document.getElementsByTagName("body")[0].appendChild(navigateButton);
        });
//        document.location.href = uri;
    }

    var query = getQueryNameValuePairs();
    var action = query["action"];

    switch (action) {
    case "cancel":
        window.close();
        break;

    case "redirect":
        navigateTo(query["uri"]);
        break;

    default:
        break;
    }
})();
