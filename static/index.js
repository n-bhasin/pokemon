$(document).ready(function(){

    var insertPokemon = $('#insertPokemon');
    console.log(insertPokemon);

    function buildListItem(name,height,weight,url, _id) {
        _id = _id || 'temporary-list-item-id';
        console.log(_id);
        insertPokemon.append(
            `<li id='li-${_id}'>${name}</li>` +
            `<li id='li-${_id}'>${height}</li>` +
            `<li id='li-${_id}'>${weight}</li>` +
            `<li id='li-${_id}'>
                <img src='${url}' alt-image='noimage' />
            </li>`
            );
        var button = document.createElement('button');
        button.id = _id;
        button.name = `deletePokemon`;
        button.value = `${name}`;
        button.class = `btn btn-danger`;
        //button.addEventListener('click');
        button.innerText = 'Delete';
        $(`#li-${_id}`).append(button);   
        console.log(insertPokemon);     
    }

    function deleteHandler(e) {
        /*
        To delete something...
        - [x] we need to make the API call
        - [ ] IF it succeeds, we need to remove the item from the DOM
            - otherwise...
            - we need to show an error message
        */
        var title = e.target.value;
        console.log(title);
        $.ajax({
            url: '/api/cassettes',
            type: 'DELETE',
            data: {_id: e.target.id, name: title},
        }).done(function (data, status, req) {
            console.log(data);
            $(data._id)
            var _id = data._id;
            $(`#${_id}`).parent().remove();
        }).fail(function (req, status, err) {
            alert(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })         
    }

    var data = $.get('/api/pokemon').done(function(data){
        // ToDo: refactor this to use buildListItem!
            for (poke of data.pokedex) {
 // Note !! Two different ways to create HTML elements
            // One: use jQuery, eg, the append method here:
            var _id = poke._id;
            insertPokemon.append(
                `<li id='li-${_id}'>Name: ${poke.name}
                    <br />Height: ${poke.height}
                    <br />Weight: ${poke.weight}
                    <br />Image:  <img src='${poke.url}' alt-image='noimage' />
                </li>`
                );

            // Two: use vanilla JS, eg, the document.createElement method here:
            var button = document.createElement('button');
            button.id = _id;
            button.name = `${poke.name}`;
            button.value = `${poke.name}`;
            button.class = "btn btn-primary"
            button.addEventListener('click', deleteHandler);
            button.innerText = 'X';

            // Then, here, I can use jQuery to append a vanilla JS html element.
            $(`#li-${_id}`).append(button);
        }
    }).fail(function (err){
        alert(`Uh oh! Something went wrong, got: ${err}`);
    })

    var submit = $('#submit').on('click', function(e){
        var name = $("#name").val();
        var height = $("#height").val();
        var weight = $("#weight").val();
        var url = $('#url').val();
        if(isNaN(height)){
            console.log('Invalid height');
        }
        if(isNaN(weight)){
            console.log('Invalid weight');
        }
        console.log(name, height,weight,url);
        
        $.ajax({
                url: '/api/pokemon',
                 type: 'POST',
                 data: {
                    name: name,
                    height: height,
                    weight: weight,
                    url: url
                 }
            }).done(function (data, status, req) {
                console.log(`Added: ${name.val()}  ${data}to the collection!`);
                buildListItem(name, height, weight, url);
                name.val('');
                height.val('');
                weight.val('');
                url.val('');
        }).fail(function (req, status, err) {
            alert(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        });
       
    })
})