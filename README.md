# Original Trombones

## Overview
A static ecommerce landing page built with Bootstrap 4 and jQuery.

## Highlights

### Pop-up checkout modal
When you click the "Order Now" button, you get a pop-up modal where you can either modify the quantity ordered or directly check out.
![popup-1](./demo/popup_1.gif)

The pop-up leverages a Bootstrap feature, with each `<button>` element having a `data-toggle="modal"` attribute and another `data-target` attribute set to the `id` of the pop-up. The modal wrapper also needs to have the `modal` class in order to be recognised as such by Bootstrap.

The quantity and order totals are updated using jQuery (all the JavaScript code sits in the `custom.js` file). Event listeners were placed on all quantity-related buttons such that, once one of them is clicked, the `updateOrder` function is triggered.
```js
/*value = +/-1, depending on the button clicked
productElem = the element that contains the quantity input element for a given product
*/
function updateOrder(value,productElem) {

  //calculate the new quantity after a quantity button is clicked
  let productInputElem = $(productElem).find("input");
  let newQuantity = parseInt(productInputElem.val()) + value;

  /*the condition is set to avoid negative amounts
  in case the decrement button is clicked and the
  product quantity is already 0*/
  if (newQuantity >= 0) {
    
    //update the input value
    productInputElem.val(newQuantity);

    //get the price of the item using a PRICES global constant
    let productName = productElem.slice(1,productElem.length-6);
    let price = PRICES[productName];

    //update the subtotal
    let subtotalElem = $(productElem).find(".subtotal");
    if (newQuantity == 0) {
      subtotalElem.html("");
    } else {
      subtotalElem.html(numFormat(price*newQuantity));
    }

    /*
    recalculate the total by looking at product prices
    and values in the quantity inputs
    */
    let total = 0;
    $("[type='number']").each((index,element)=>{

      let productElemId = $(element).closest(".form-group").attr("id");
      let productPrice = PRICES[productElemId.slice(0,productElemId.length-6)];
      total += parseInt($(element).val() * productPrice);
    });

    /*render the new total. the numFormat function formats an
    integer to the £ [XX,]XXX format*/
    $("#total").html(numFormat(total));
  }
}
```

### Responsive across all devices
![responsive-1](./demo/responsive_1.gif)

Achieved using Bootstrap's grid system, where you can set different column widths as well as row orders via class names. A good example can be found for the "Tenor Trombone" grouping in the pop-up checkout modal:
```html
<div id="tenor-group" class="form-group row">
  <!--
    The name of product.
    Screen width...
      ≥ 576px <=> class names...
        col-sm-5 = takes 5/12 of a row
        order-sm-0 = appears 1st in order.
      < 576px <=> class names...
        col-8 = takes 8/12 of a row
        order-0 = still appears 1st in order.
  -->
  <label for="tenor-number" class="col-sm-5 col-8 order-sm-0 order-0 mb-0 flex-row-center">
    Tenor Trombone
  </label>

  <!--
    Quantity with increment & decrement buttons.
    Screen width...
      ≥ 576px <=> class names...
        col-sm-4 = takes 4/12 of a row
        order-sm-1 = appears after product name
      < 576px <=> class names...
        [no col-x] = takes entire row
        order-2 = appears last in the grouping 
  -->
  <div class="col-sm-4 order-sm-1 order-2 input-group mt-sm-0 mt-2">
    <div class="input-group-prepend">
      <button type="button" class="btn btn-primary quantity-button d-flex flex-row justify-content-center align-items-center font-weight-bold p-0">-</button>
    </div>
    <input class="form-control text-center font-weight-bold" id="tenor-number" name="tenor-number" min="0" value="0" type="number" disabled>
    <div class="input-group-append">
      <button type="button" class="btn btn-primary quantity-button d-flex flex-row justify-content-center align-items-center font-weight-bold p-0">+</button>
    </div>
  </div>

  <!--
    Quantity with increment & decrement buttons.
    Screen width...
      ≥ 576px <=> class names...
        col-sm-3 = takes 3/12 of a row
        order-sm-2 = appears last in the row, after quantity element
      < 576px <=> class names...
        order-1 = appears after product name but before quantity element
        col-4 = takes 4/12 of a row
  -->
  <div class="subtotal col-sm-3 col-4 d-flex flex-row justify-content-end align-items-center order-sm-2 order-1"
  value="0"></div>

</div>
```
This is the visual result:
![responsive-2](./demo/responsive_2.gif)

