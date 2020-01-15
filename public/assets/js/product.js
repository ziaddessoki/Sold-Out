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
                .trim(),
            bid_length: $("#addProduct [name=bidLength]")
                .val()
                .trim()
        };
      
        $.ajax("/products_api", {
            type: "POST",
            data: JSON.stringify(newProduct),
            dataType: "json",
            contentType: "application/json"
        }).then(function (data) {
            
            console.log('Send SMS')
            $.ajax("/send_sms", {
                type: "POST",
                data: newProduct.seller_phone,
                dataType: "json",
                contentType: "application/json"
            }).then(function (data) {
                console.log(data)
              
                
            })
            // location.reload();

        });
        $("#addProduct [name=productName] ").val("");
        $("#addProduct [name=productDescription]").val("");
        $("#addProduct [name=productImage]").val("");
        $("#addProduct [name=minBid]").val("");
        $("#addProduct [name=sellerName]").val("");
        $("#addProduct [name=sellerPhone]").val("");
        $("#addProduct [name=bidLength]").val("");
      
    
    })

    

    $.ajax("/products_api", {
        type: "GET"

    }).then(function (data) {
        // console.log(data)
        var product = data.product;
        var len = product.length;
        var products_elem = $("#products");
        for (var i = 0; i < len; i++) {
            // Split timestamp into [ Y, M, D, h, m, s ]
            // var t = product[i].posted_since.split(/[- :]/);
            // Apply each element to the Date function
            // var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

            // // counter   


            // console.log(t);

            // var card = "<div class='col-sm-3'>" +
            var card = "<div  class='card' style='width: 18rem; height:100%'>"
            if (!product[i].product_image) {
                card += "<img src='https://www.plumbingworld.co.nz/Assets/no_img_medium.gif' height='200px' width='150px' class='card-img-top' alt='...'>"
            } else {
                card += "<img src=" + product[i].product_image + " class='card-img-top' alt='...'>"
            }
            card += "<div class='card-body'   id='"+ product[i].product_id +"'  >" +
                "<h5 class='card-title'>Product Name:" + product[i].product_name + "</h5>" +
                "<p class='card-text'>Product Description: " + product[i].product_description + "</p>" +
                "<h5 class='card-title'>" + "Current Bid $" + product[i].highest_bid + "</h5>"

            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const posted = new Date(product[i].posted_since);
            var postedTime = posted.toLocaleDateString('en-US', options);

            card += "<p>Posted at: " + postedTime + "</p>"

            const bided = new Date(product[i].moment_bid);
            var bidTime = bided.toLocaleDateString('en-US', options);

            card += "<p>Last Bid at: " + bidTime + "</p>"

            card += "<p>Time left to Bid: <h5 class=" + product[i].product_id + "></h5></p>"

            card += "<button type='button'  class='btn btn-primary' id='submitBuyer' data-toggle='modal' data-target='#exampleModal'" + "data-id=" + product[i].product_id + " " + "data-bid=" + product[i].highest_bid + ">" + "BID" + "</button>" +
                // card += '<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Bid History</a>' +
                //     '<div class="dropdown-menu">' +
                //     '<h>'+product[i].buyer_name+product[i].highest_bid+'</h>' +
                //     '<h class="dropdown-item" >Another action</h>' +
                //     '<h class="dropdown-item" >Something else here</h>' +
                //     '</div>' +
                // "</div>" +
                "</div>"
                ;
            setCountDown(product[i].moment_bid, product[i].product_id, product[i].bid_length)
        console.log(product[i].bid_length)
            products_elem.append(card)
        }
    });
    $("#addProduct").val("");

function setCountDown(x, y, q) {
    setInterval(function () {
        var countDownDate = new Date(x).getTime() + 1000 * 60 * q;
        // console.log("var countdownDate is " + countDownDate)
        // Update the count down every 1 second

        // Get today's date and time
        var now = new Date().getTime();
        // console.log("var countdownDate after set interval function is " + countDownDate)

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var co = $("." + y);
        var z = hours + ":" + minutes + ":" + seconds
        
        $(co).html(z);
        // If the count down is over, write some text 
        if (distance < 1000 *30) {
            var cardId = $("#" + y);
            $(cardId).addClass("backgroundRed")
            var cardBtn = $('[data-id='+ y +']')
            $(cardBtn).removeClass('btn-primary').addClass('btn-danger');
        }


        
        if (distance < 0) {
            // clearInterval(x);
            $(co).text("EXPIRED");
            setTimeout(function() {
                distanceExpires(y);
            }, 4000)
        }
    }, 1000);
}

function distanceExpires(y){
    var id=y;
    
    // Send the DELETE request.
    $.ajax("/test_products_api/" + id, {
        type: "DELETE",
        //   data: JSON.stringify(newProduct),
        //     dataType: "json",
        //     contentType: "application/json"
      }).then(function() {
        console.log("deleted product", id);
        // Reload the page to get the updated list
        location.reload();
      });
}

})
