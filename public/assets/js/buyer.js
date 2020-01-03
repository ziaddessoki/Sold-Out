$(document).ready(function () {
    $(document).on("click", "#submitBuyer", function (event) {
        var productId = $(this).data("id");
        console.log(productId);
        var productBid = $(this).data("bid");

        // var newBuyer;
        // console.log(newBuyer);

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
            };

             var aa =$(".alert3")
             var bb =$(".alert1")
             var cc =$(".alert2")
            if (productBid> newBuyer.highest_bid){
              
                aa.text("Your Bid must be higher than existing!!")

            }else if(newBuyer.buyer_name==""){
                bb.text("Enter Name")
                console.log("name")

            }else if(newBuyer.buyer_phone==""){
                cc.text("Enter Phone")

            }
            else{
                $("#addingBuyer").attr('data-dismiss',"modal");

                $.ajax("/products_api/" + productId, {
                    type: "PUT",
                    data: JSON.stringify(newBuyer),
                    dataType: "json",
                    contentType: "application/json"
                }).then(function () {
                    console.log("created new buyer");
                 
                    location.reload();
                });
                location.reload();
            };

            
            
            console.log(newBuyer);


            // location.reload();
        });
        
        
       
    });


});