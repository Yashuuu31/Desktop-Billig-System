// Add Row Code
$(document).on('click', '.AddBtn', function(){
    let addEvent = $(".FormRow:first").clone();
    $('input',addEvent).val('');
    addEvent.insertAfter($(this).parents('.FormRow'))
    $('td.SrNo').each(function (index, element) {
        $(element).text(index + 1);
    });
});


// Min Row Code
$(document).on('click', '.MinBtn', function(){
    let minEvent = $(this).parents(".FormRow");

    if($('#dynamicTable tr').length > 5){
        minEvent.remove();
        setTimeout(() => {
            $('td.SrNo').each(function (index, element) {
                $(element).text(index + 1);
            });
        }, 0.01);
    }
    Total();
});

// Total Calculation
$(document).on('input', '.ItemName, .ItemPrice, .ItemQty', function () {
    let ItemName = $(this).closest('tr.FormRow').find('.ItemName').val();
    let ItemPrice = 0;
    let ItemQty = 0;
    let ItemAmount = 0;
    
    ItemPrice = parseInt($(this).closest('tr.FormRow').find('.ItemPrice').val());
    ItemQty = parseInt($(this).closest('tr.FormRow').find('.ItemQty').val());

    if(!isNaN(ItemPrice) && !isNaN(ItemQty)){
        ItemAmount = ItemPrice * ItemQty;
    }

    $(this).closest('tr.FormRow').find('.ItemAmount').val(ItemAmount);
});

$(document).on('input', function(){
    Total();
  
})


function Total(){
    let Total = 0;
    let Discount = parseInt($('#Discount').val());
    let GrandToral = 0;

    $('.ItemAmount').each(function(element){
        Total += parseInt($(this).val());
    })

    if(!isNaN(Discount)){
        GrandToral = Total - Discount;
    }else{
        GrandToral = Total;
    }

    $('#Total').val(Total);
    $('#GrandTotal').val(GrandToral)
}

$(document).on('click', '#MakeBill', function(){
    let Item = {
        'item' : [],
        'total' : 0,
        'discount' : 0,
        'grandTotal' : 0,
        'CustormerName' : $('#CustormerName').val(),        
        'CustormerMobile' : $('#CustormerMobile').val(),        
    };
    
    $('.ItemName').each(function(index){
        let temp = {
            'Name' :  $(this).closest('tr.FormRow').find('.ItemName').val(),
            'Price' :  $(this).closest('tr.FormRow').find('.ItemPrice').val(),
            'Qty' :  $(this).closest('tr.FormRow').find('.ItemQty').val(),
            'Amount' : $(this).closest('tr.FormRow').find('.ItemAmount').val()
        };
        Item.item.push(temp);
    });

    Item.total = $('#Total').val();
    Item.discount = $('#Discount').val();
    Item.grandTotal = $('#GrandTotal').val();

    localStorage.setItem('bill', JSON.stringify(Item));
    console.log(Item);
});

// Clear Data Function
$(document).on('click', '#ClearData', function(){
    let result = confirm("Are You Sure Clear Data ?");
    if(result){
        location.reload();
    }
})