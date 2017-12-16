$(document).ready(function () {
    $.ajax({
        type: 'GET', 
        url: 'api/user', 
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)

    contactList();
    $("#gohome").click(contactList);
    $("#addnew").click(newContact);

    // process the form
    $('#submit').click(() => {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        const formData = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            phone: $('input[name=phone]').val()
        }

        const requestData = JSON.stringify(formData)
        
        $.ajax({
                type: 'POST', 
                url: 'api/user', 
                data: requestData,
                dataType: 'json',
                contentType: 'application/json',
            })
            .done(successHandler)
            .fail(errorHandler)
    })
        $("#submit").click(function(users){
            $("#detailoutput").show();
            $("#contactlist").hide();
            $("#newcontact").hide();
            // $('#detailoutput').html('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>')

        })
})


function successHandler(users) {
    console.log(`Response has ${users.length} users`)
    var $table = $( "<table border='1'><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th></table>" );
    for ( let index = 0; index < users.length; index++ ) {
        const user = users[index]
        const $line = $( "<tr></tr>" )
        $line.append( $( "<td></td>" ).html( user.id ) )
        $line.append( $( "<td></td>" ).html( user.name ) )
        $line.append( $( "<td></td>" ).html( user.email ) )
        $line.append( $( "<td></td>").html( user.phone ) )
        $table.append( $line )
    }

    $('#output').empty()
    $table.appendTo( $('#output') )
    detailOutput(users);
    
}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}

function contactList(){
    $("#contactlist").show();
    $("#newcontact").hide();
    $("#detailoutput").hide();
}

function newContact(){
    $("#newcontact").show();
    $("#contactlist").hide();
    $("#detailoutput").hide();
}

function detailPage(){
    $("#detailoutput").show();
    $("#contactlist").hide();
    $("#newcontact").hide();
}

function detailOutput(users){
    $('#detailoutput').html('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>')

}