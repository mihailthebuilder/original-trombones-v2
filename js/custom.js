const PRICES = {
  'tenor': 500,
  'bass': 800,
  'valve': 1200
};

//returns a number in £ XX,XXX format
function numFormat(num) {
  let output = "£ ";
  if (num/1000 >= 1) {
    output = output + Math.floor(num/1000).toString()+",";
  }
  output = output + num.toString().slice(-3);

  return output;
}

//updates the order modal
//value is the (+/-)1, product is used to find the
//modal elements that need to be updated
function updateOrder(value,productElem) {

  let productInputElem = $(productElem).find("input");
  let newQuantity = parseInt(productInputElem.val()) + value;

  if (newQuantity >= 0) {
    
    //update the input value
    productInputElem.val(newQuantity);

      
    let productName = productElem.slice(1,productElem.length-6);
    let price = PRICES[productName];

    //update the subtotal
    let subtotalElem = $(productElem).find(".subtotal");

    if (newQuantity == 0) {
      subtotalElem.html("");
    } else {
      subtotalElem.html(numFormat(price*newQuantity));
    }

    //recalculate the total
    let total = 0;

    $("[type='number']").each((index,element)=>{

      let productElemId = $(element).closest(".form-group").attr("id");
      let productPrice = PRICES[productElemId.slice(0,productElemId.length-6)];
      total += parseInt($(element).val() * productPrice);
    });

    $("#total").html(numFormat(total));
  }
}

//only activate when document has been loaded

$(() => {

  //when newsletter form submitted, replace element with confirmation
  $("#newsletter-form").submit((event)=> {
    event.preventDefault();
    $("#unsubscribed").fadeOut(350,()=>{$("#subscribed>div>p").fadeIn(350)});
  });

  //when +/- buttons are clicked
  $(".quantity-button").click((event)=>{

    let targetProduct = $(event.target).closest(".form-group").attr("id");

    //check whether button is a +1 or a -1
    let value = $(event.target).html() == "-"? -1 : 1;
    updateOrder(value,"#"+targetProduct);
  })

  //when order now buttons are clicked
  $("button[data-toggle='modal'").click((event) => {

    let targetProduct = "#"+$(event.target).attr("value")+"-group";
    updateOrder(1,targetProduct);
  });

});