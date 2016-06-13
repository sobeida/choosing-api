    $(document).ready(function () {
        $('#searchform').bind('submit', function () {
            api_key = "dk88st01cks0as9cv2iwr4hg";
            terms = $('#access').val();
            etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
                terms + "&limit=12&includes=Images:1&api_key=" + api_key;

            $('#result-container-right').empty();
            $('<p></p>').text('Searching for ' + terms).appendTo('#result-container-right');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function (data) {
                    if (data.ok) {
                        $('#result-container-right').empty();
                        if (data.count > 0) {
                            $.each(data.results, function (i, item) {
                                $("<img/>").attr("src", item.Images[0].url_75x75).appendTo("#result-container-right").wrap(
                                    "<a href='" + item.url + "'></a>"
                                );
                                if (i % 4 == 3) {
                                    $('<br/>').appendTo('#result-container-right');
                                }
                            });
                        } else {
                            $('<p>No results.</p>').appendTo('#result-container-right');
                        }
                    } else {
                        $('#result-container-right').empty();
                        alert(data.error);
                    }
                }
            });

            return false;
        })
    });
