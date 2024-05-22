$(function(){

    $('#responsiveButton').on("click", function(){
        $( this ).toggleClass("active")
        $('#itemsResponsive').slideToggle("slow")
        
    })

});