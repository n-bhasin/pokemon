$(document).ready(function(){


    var submit = $('#submit').on('click', function(e){
        var name = $("#name");
        var height = $("#height");
        var weight = $("#weight");
        var url = $('#url');
        if(isNaN(height)){
            console.log('Invalid height');
        }
        if(isNaN(weight)){
            console.log('Invalid weight');
        }
        console.log(name, height, weight, url);
        $.post(
            '/api/cassettes', 
            {
                add_cassette: input.val(),
                description: description.val()

            }
        ).done(function (data, status, req) {
            console.log(`Added: ${input.val()} to the collection!`);
            buildListItem(input.val(), description.val());
            input.val('');
        }
        ).fail(function (req, status, err) {
            alert(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })
    })
})