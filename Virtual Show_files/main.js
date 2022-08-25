var $ = jQuery.noConflict();

$(document).ready(function () {

    centerImage();
    $( window ).resize(function() {
centerImage();

    });

    function centerImage(){
    let myImg = document.querySelector("#img");
    let w = myImg.naturalWidth;
    let h = myImg.naturalHeight;

    let vw = $('.image-box figure').width();
    let vh = $(window).height();

 if (w > h) {
                         if (w < vw) {
                             if (h > vh) {
                                 addH()
                                    console.log(11)
                             }
                             else {
                                 addW()
                                    console.log(12)
                             }
                         }
                         else if (w > vw) {
                             if (h > vh) {
                                 addH()
                                    console.log(13)
                             }
                             else {
                                 addW()
                                    console.log(14)
                             }
                         }
                     }
                     else if (h > w) {
                         if (w < vw) {
                             if (h > vh) {
                                 addH()
                                    console.log(21)
                             }
                             else {
                                 addW()
                                    console.log(22)
                             }
                         }
                         else if (w > vw) {
                             if (h > vh) {
                                 addH()
                                    console.log(23)
                             }
                             else {
                                 addH()
                                    console.log(24)
                             }
                         }
                     }
                     else if (h = w) {
                         if (w < vw) {
                             if (h > vh) {
                                 addH()
                                    console.log(31)
                             }
                             else {
                                 addW()
                                    console.log(32)
                             }
                         }
                         else if (w > vw) {
                             if (h > vh) {
                                 addH()
                                    console.log(33)
                             }
                             else {
                                 addH()
                                     console.log(34)
                             }
                         }
                     }
}

function addH(){
    $('.image-box figure').addClass('height');
    $('.image-box figure').removeClass('width');
}
function addW(){
    $('.image-box figure').addClass('width');
    $('.image-box figure').removeClass('height');
}


     $('#close').on('click',function(){
            $('#popup').fadeOut(400);
                                       
                            let imgURL = document.getElementById("img"); 
                            imgURL.src = "";

    let imgURL2 = document.getElementById("img2"); 
                            imgURL2.src = "";
                            
                            let title = document.getElementById("h1"); 
                            title.innerHTML = '';

                            let subtitle = document.getElementById("h5"); 
                            subtitle.innerHTML = '';

                            let artist = document.getElementById("h3"); 
                            artist.innerHTML = '';

                            let location = document.getElementById("location"); 
                            location.innerHTML = '';

                            let article = document.getElementById("inner_box"); 
                            article.innerHTML = ''; 
                        
         $('.zoomImg').remove();
         
         
        /*   if ($('.desc_section').hasClass('open')) {
                                    $(this).removeClass('open')
                                    $(this).height('150px');

                                }*/
        })
    
    
    
 /*      $('.desc_section').on('click', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open')
                $(this).height('150px');

            } else {
                $(this).addClass('open');
                
                $(this).height($('#inner_box').height()+250);
            }
        })*/

});