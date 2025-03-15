var addCart = $('.addCart');

$('#category-button').on('change', function () {
    window.location.href = '/category/' + $(this).find(':selected').attr('data-slug');
});

addCart.click(function () {
    var productID = $(this).attr('product-id');
    var quantity = 1;
    var combination = (($('#combination').val().length != 0) ? $('#combination').val() : null);

    $.ajax({
        type: 'POST',
        url: '/app/main/theme/requests/cart.php?method=add&productID=' + productID,
        data: {
            productID: productID,
            quantity: quantity,
            combination: combination
        },
        success: function (data) {
            if (data == 'LOGIN_ERROR') {
                Swal.fire({
                    title: lang.error,
                    text: lang.login_error,
                    icon: 'error',
                    confirmButtonText: lang.ok
                });
            } else if (data == 'PRODUCT_ERROR') {
                Swal.fire({
                    title: lang.error,
                    text: lang.product_error,
                    icon: 'error',
                    confirmButtonText: lang.ok
                });
            } else if (data == 'STOCK_ERROR') {
                Swal.fire({
                    title: lang.error,
                    text: lang.stock_error,
                    icon: 'error',
                    confirmButtonText: lang.ok
                });
            } else {
                Swal.fire({
                    title: lang.success,
                    text: lang.product_added_to_cart,
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: lang.go_to_cart,
                    cancelButtonText: lang.continue_shopping
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/cart';
                    }
                });
            }
        }
    });
});