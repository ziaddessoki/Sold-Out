$(document).ready(function () {
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
            product_id: $("#inputPhone")
                .val()
                .trim()
        };
        
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
        $.ajax("/buyer_api", {
            type: "POST",
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