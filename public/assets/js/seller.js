$(document).ready(function () {
    $("#addBuyer").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        // [name=plan] will find an element with a "name" attribute equal to the string "plan"
        var newSeller = {
            seller_name: $("#sellerName")
                .val()
                .trim(),
            seller_phone: $("#sellerPhone")
                .val()
                .trim(),
            product_name: $("#productName")
                .val()
                .trim(),
            product_discription: $("#productDescription")
                .val()
                .trim(),
        };
        // Send the POST request.
        $.ajax("/seller", {
            type: "POST",
            data: JSON.stringify(newSeller),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            console.log("created new product");
            // Reload the page to get the updated list
            location.reload();
        });
    });
});