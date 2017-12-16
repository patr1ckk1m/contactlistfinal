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
            $("#editpage").hide();
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
        $line.append( $( "<td>"))
        //details button
        //edit button
        $line.append( $( "<button id = 'yellow'>Edit</button>"))
        //delete button
        const redDelete = $( "<button id = 'red'>/button>" ).text('DELETE');
        $line.append(redDelete)
        $line.append( $( "</td>"))
        $table.append( $line )
        
            redDelete.click(() => {
                const confirmDelete = confirm("Are you sure?")
                if (confirmDelete) {
                    deleteContact(user.id);
                    contactList();
                }
            })


    }

    $('#output').empty()
    $table.appendTo( $('#output') ) //adding table to output div
    detailOutput(users); //adds data for newest created user to be displayed
    
}



function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}

function contactList(){
    $("#contactlist").show();
    $("#newcontact").hide();
    $("#detailoutput").hide();
    $("#editpage").hide();
}

function newContact(){
    $("#newcontact").show();
    $("#contactlist").hide();
    $("#detailoutput").hide();
    $("#editpage").hide();
}

function detailPage(){
    $("#detailoutput").show();
    $("#contactlist").hide();
    $("#newcontact").hide();
    $("#editpage").hide();
}

function editPage(){
    $("#detailoutput").hide();
    $("#contactlist").hide();
    $("#newcontact").hide();
    $("#editpage").show();

    $('input[name=nameedit]:text').val(`${user.name}`);
    $('input[name=emailedit]:text').val(`${user.email}`);
    $('input[name=phoneedit]:text').val(`${user.phone}`);
}


//data to be displayed after user is redirected after adding new contact
function detailOutput(users){
    $('#detailcontent').html('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>')
    // $('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>').appendTo('#detailsform')
}

function deleteContact(id){
    $.ajax({
        type: 'DELETE',
        url: `api/user/${id}`,
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)
}
