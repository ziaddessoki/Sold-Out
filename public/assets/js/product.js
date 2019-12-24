$(document).ready(function () {

    // using form in seller page to fill out the products table and seller table
    $("#addProduct").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        // [name=plan] will find an element with a "name" attribute equal to the string "plan"
        var newProduct = {
            product_name: $("#addProduct [name=productName]")
                .val()
                .trim(),
            product_description: $("#addProduct [name=productDescription]")
                .val()
                .trim(),
            product_image: $("#addProduct [name=productImage]")
                .val()
                .trim(),
            highest_bid: $("#addProduct [name=minBid]")
                .val()
                .trim(),
            seller_name: $("#addProduct [name=sellerName]")
                .val()
                .trim(),
            seller_phone: $("#addProduct [name=sellerPhone]")
                .val()
                .trim()
            // posted_since: $("#addProduct [name=sellerPhone]")
            // .val()
            // .trim()
        };
        // Send the POST request.
        $.ajax("/products_api", {
            type: "POST",
            data: JSON.stringify(newProduct),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            location.reload();
        });
        // var newSeller = {
        //     seller_name: $("#addProduct [name=sellerName]")
        //         .val()
        //         .trim(),
        //     seller_phone: $("#addProduct [name=sellerPhone]")
        //         .val()
        //         .trim()
        // };
        // $.ajax("/seller_api", {
        //     type: "POST",
        //     data: JSON.stringify(newSeller),
        //     dataType: "json",
        //     contentType: "application/json"
        // }).then(function () {
        //     console.log("created new seller");
        //     // Reload the page to get the updated list
        //     location.reload();
        // });
    });

    $.ajax("/products_api", {
        type: "GET"

    }).then(function (data) {
        console.log(data)
        var product = data.product;
        var len = product.length;
        var products_elem = $("#products");
        for (var i = 0; i < len; i++) {
            // Split timestamp into [ Y, M, D, h, m, s ]
            var t = product[i].posted_since.split(/[- :]/);
            // Apply each element to the Date function
            // var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
            console.log(t);
            products_elem.append(
                "<div class='col-sm-3'>" +
                "<div  class='card' style='width: 18rem; height:100%'>" +
                "<img src=" +
                product[i].product_image +
                " class='card-img-top' alt='...'>" +
                "<div class='card-body'>" +
                "<h5 class='card-title'>" +
                "Product Name: " + "</h5>" +
                product[i].product_name +
                "<p class='card-text'>" +
                "Product Description: " +
                product[i].product_description + "</p>" +
                "<h5 class='card-title'>" + "Current Bid $" +
                product[i].highest_bid + "</h5>" +
                "<p>Posted at: " + product[i].posted_since + "</p>" +
                "<p>Last Bid at: " + product[i].moment_bid + "</p>" +
                "<a type='button' id='submitBuyer' class='btn btn-primary text-white' data-toggle='modal' data-target='#exampleModal'" +
                "data-id=" + product[i].product_id + ">" + "BID" + "</a>" +
                // "</div>" +
                "</div>" +
                "</div>"
            );
        }
    });
    $("#addProduct").val("");
});