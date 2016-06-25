    $(document).ready(function () {
        $('#searchform').submit(function (event) {
            event.preventDefault();
            var api_key = "dk88st01cks0as9cv2iwr4hg";
            var terms = $('#access').val();
            var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + terms + "&limit=12&includes=Images:1&api_key=" + api_key;

            $('#result-container').empty();
            $('<p></p>').text('Searching for ' + terms).appendTo('#result-container');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function (data) {

                    if (data.ok) {
                        $('.result-container ul').empty();

                        if (data.count > 0) {
                            $.each(data.results, function (key, value) {

                                console.log(value);

                                var htmlOutput = "";

                                htmlOutput += '<li>';
                                htmlOutput += '<div class="card-image">';
                                htmlOutput += '<h2 class="card-title">' + value.title + '</h2>';
                                htmlOutput += '<p class="card-details card-description">' + value.description + '</p>';
                                htmlOutput += '<p class="card-details">' + value.currency_code + ' ' + value.price + '</p>';
                                htmlOutput += '<p class="card-details item-image"><a href="http://www.mrchocolate.com/"><img  width="100%" src="' + value.Images[0].url_fullxfull + '"></a></p>';
                                htmlOutput += '</div>';
                                htmlOutput += ' </li>';

                                $('.result-container ul').append(htmlOutput);
                            });
                        } else {
                            $('<p>No results.</p>').appendTo('#result-container');
                        }
                    } else {
                        $('#result-container').empty();
                        alert(data.error);
                    }
                }
            });

            return false;
        })
    });
