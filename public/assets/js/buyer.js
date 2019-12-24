$(document).ready(function () {
    $(document).on("click", "#submitBuyer", function (event) {
        var productId = $(this).data("id");
        $(document).on("click", "#addingBuyer", function (event) {
            console.log("button Clicked")
            // Make sure to preventDefault on a submit event.
            event.preventDefault();
            // [name=plan] will find an element with a "name" attribute equal to the string "plan"
            var newBuyer = {
                buyer_name: $("#inputName")
                    .val()
                    .trim(),
                buyer_phone: $("#inputPhone")
                    .val()
                    .trim(),
                highest_bid: $("#inputBid")
                    .val()
                    .trim(),
                // moment_bid: 
            };
            console.log(newBuyer);
            // //Send the POST request.
            // $.ajax("/buyers_api", {
            //     type: "POST",
            //     data: JSON.stringify(newBuyer),
            //     dataType: "json",
            //     contentType: "application/json"
            // }).then(function () {
            //     console.log("created new buyer");
            //     // Reload the page to get the updated list
            //     location.reload();
            // });
            $.ajax("/products_api/" + productId, {
                type: "PUT",
                data: JSON.stringify(newBuyer),
                dataType: "json",
                contentType: "application/json"
            }).then(function () {
                console.log("created new buyer");
                // Reload the page to get the updated list
                location.reload();
            });
        });
    });


});