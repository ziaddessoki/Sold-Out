// $(document).ready(function () {
//     $("#addBuyer").on("submit", function (event) {
//         // Make sure to preventDefault on a submit event.
//         event.preventDefault();
//         // [name=plan] will find an element with a "name" attribute equal to the string "plan"
//         var newSeller = {
//             seller_name: $("addProduct [name=sellerName]")
//                 .val()
//                 .trim(),
//             seller_phone: $("addProduct [name=sellerPhone]")
//                 .val()
//                 .trim(),
//         };
//         // Send the POST request.
//         $.ajax("/seller_api", {
//             type: "POST",
//             data: JSON.stringify(newSeller),
//             dataType: "json",
//             contentType: "application/json"
//         }).then(function () {
//             console.log("created new seller");
//             // Reload the page to get the updated list
//             location.reload();
//         });
//     });
// });