$(document).ready(function () {
    $(document).on("click","#addingBuyer", function (event) {
        console.log("button CLICKED")
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
            // highest_bid: $("#inputBid")
            //     .val()
            //     .trim(),
            // product_id: $("#inputProductId")
            //     .val()
            //     .trim(),
        };
        // Send the POST request.
        $.ajax("/buyers", {
            type: "POST",
            data: JSON.stringify(newBuyer),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            console.log("created new product");
            // Reload the page to get the updated list
            location.reload();
        });
    });
});