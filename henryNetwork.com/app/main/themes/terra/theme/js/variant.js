$(".variant").on("change", function() {
    var productID = $("#productID").val();
    var variants = [];
    var subtotal = $("#subtotal");
    var buyPrice = $("#buyPrice").val();
    var totalPrice = $("#totalPrice");
    var stockText = $("#stock-text");
    var combination = $("#combination");

    if (variants.length > 0) {
        variants = [];
    }

    $(".variant").each(function(index, element) {

        variants.push({
            variant: $(element).data("value"),
            option: $(element).val()
        });
    });

    $.ajax({
        url: "/app/main/theme/requests/variant.php?productID=" + productID,
        type: "POST",
        data: {
            variants: variants,
        },
        success: function (data) {
            if (data) {
                var response = JSON.parse(data);
                var price = response.price;
                var raw_price = response.raw_price;

                buyPrice = price;
                subtotal.text(price);
                totalPrice.text(price);
                totalPrice.attr("value", price);
                stockText.text(response.stock_text);
                combination.val(response.combination);
            }
        }
    });
});