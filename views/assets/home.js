$(document).ready(function () { //get/posts on document load
    $.ajax({
        type: 'GET', //getting user data from api
        url: 'api/user', 
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)

    contactList(); //runs function to show home page with contact list
    $("#gohome").click(contactList); //onclick functionality for home and add new buttons
    $("#addnew").click(newContact);

    // process the form
    $('#submit').click(() => {
            // get the form data
            // there are many ways to get this data using jQuery (you can use the class or id also)
            const user = { //grabbing data from inputs
                name: $('input[name=name]').val(),
                email: $('input[name=email]').val(),
                phone: $('input[name=phone]').val()
            }
            if (validation(user) == true){
                const requestData = JSON.stringify(user) //stringify the formData
            
                $.ajax({
                        type: 'POST',  //sending post route to user api
                        url: 'api/user', 
                        data: requestData, //stringified user data
                        dataType: 'json',
                        contentType: 'application/json',
                    })
                    .done(successHandler)
                    .fail(errorHandler)
                    getDetails(user); //display the detail page
                }   
            $.ajax({ //still send if validation is false to verify, but do not display getdetails page
                    type: 'POST',  //post route to user api
                    url: 'api/user', 
                    data: requestData,
                    dataType: 'json',
                    contentType: 'application/json',
                })
                .done(successHandler) 
                .fail(errorHandler)
                // getDetails(user);
                  
    })
            

    $("#submit").click(function(user){ //added function on submit click to send user to detail page
        getDetails(user);
        $("#specificdetail").show();
        $("#contactlist").hide();
        $("#newcontact").hide();
        $("#editpage").hide();
        // $('#detailoutput').html('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>')
    })   
})

function validation(user){ //validating user inputs using regex and js alerts
    var phoneregex = /^((?![0-1])[0-9]{10})$/g;
    if(phoneregex.test(user.phone) == false){
        alert("Phone number must be 10 numbers long and cannot start with 0 or 1");
        return false;
    }
    //email regex
    var emailregex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailregex.test(user.email) == false) {
        alert('Email is invalid');
        return false;
    }
    if (user.name.length == 0){
        alert('You must enter a name');
        return false;
    }
    return true;
}

function successHandler(users) {
    console.log(`Response has ${users.length} users`)
    var $table = $( "<table border='1'><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th></table>" );
    for ( let index = 0; index < users.length; index++ ) { //creation of table
        const user = users[index]
        const $line = $( "<tr></tr>" )
        $line.append( $( "<td></td>" ).html( user.id ) )
        $line.append( $( "<td></td>" ).html( user.name ) )
        $line.append( $( "<td></td>" ).html( user.email ) )
        $line.append( $( "<td></td>").html( user.phone ) )
        $line.append( $( "<td>")) //adding buttons into one td
        //details button
        const blueDetails = $( "<button id = 'blue'>/button>" ).text('Details');
        $line.append(blueDetails)
        //edit button
        const yellowEdit = $( "<button id = 'yellow'>/button>" ).text('Edit');
        $line.append(yellowEdit)
        //delete button
        const redDelete = $( "<button id = 'red'>/button>" ).text('Delete');
        $line.append(redDelete)
        $line.append( $( "</td>"))
        $table.append( $line )
            //delete button onclick functionality
            redDelete.click(() => {
                const confirmDelete = confirm("Are you sure?")
                if (confirmDelete) { //if true
                    deleteContact(user.id); //run deleteContact using that users id
                    contactList(); //return back to home page with contact list
                }
            })

            blueDetails.click(() => { //onclick functionality to show the detail page of a specific user
                getDetails(user);
            })

            yellowEdit.click(() => { //onclick functionality to take user to the edit page
                editPage(user);
            })


    }

    $('#output').empty()
    $table.appendTo( $('#output') ) //adding table to output div
    detailOutput(users); //adds data for newest created user to be displayed
    
}



function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}

function contactList(){ //showing the home page of contacts
    $("#contactlist").show();
    $("#newcontact").hide();
    // $("#detailoutput").hide();
    $("#editpage").hide();
    $("#specificdetail").hide();
}

function newContact(){ //showing the addcontact form
    $("#newcontact").show();
    $("#contactlist").hide();
    // $("#detailoutput").hide();
    $("#editpage").hide();
    $("#specificdetail").hide();
}

function detailPage(user){ //showing the individual detailpage
    $('#specificusercontent').empty();
    user=JSON.parse(user)//parse the user to json
    //adding to #specificusercontent html for styling and uniformity
    $('#specificusercontent').html('<label for="name">Name: </label><strong>'+user.name+'</strong><br><label for="email">Email: </label><strong>'+user.email+'</strong><br><label for="phone">Phone: </label><strong>'+user.phone+'</strong>')

    const yellowEdit = $("<button id = 'editdetail'></button>").text('Edit');
    yellowEdit.click(() => { //goes to the edit page
        editPage(user) 
    });
    $('#specificusercontent').append(yellowEdit) //appending the button
    const redDelete = $("<button id = 'deletedetail'></button>").text('Delete');
    redDelete.click(() => {
        const confirmDelete = confirm("Are you sure?")
        if (confirmDelete) {
            deleteContact(user.id);
            contactList();
        }
    })
    $('#specificusercontent').append(redDelete)


    $("#specificdetail").show(); //showing the detail page, hiding everything else
    $("#contactlist").hide();
    $("#newcontact").hide();
    $("#editpage").hide();
    $("#detailoutput").hide();
}

function editPage(user){ //showing the edit page
    $("#detailoutput").hide();
    $("#contactlist").hide();
    $("#newcontact").hide();
    $("#editpage").show();
    $("#specificdetail").hide();

    $('input[name=nameedit]:text').val(`${user.name}`); //grabbing user.___ for placeholder in input
    $('input[name=emailedit]:text').val(`${user.email}`);
    $('input[name=phoneedit]:text').val(`${user.phone}`);
    //submit button for the edit
    const editSubmit = $("<button id = 'submit'></button>").text('Submit');
    $('#editbutton').html(editSubmit);
    editSubmit.click(() => { //onclick functionality for edit
        let contactChanged = { //getting the input values and storing them
            id: user.id,
            name: $('input[name=nameedit]').val(),
            email: $('input[name=emailedit]').val(),
            phone: $('input[name=phoneedit]').val(),
        }
        if (validation(contactChanged) == true){
                // getDetails(user); //of validated
            alert("Success") //show success popup
            editUser(contactChanged); //change the user
            contactList(); //redirect back to index page
        }
        else{
            editPage(user); //if not validated go back to edit page
        }


     //running edit user function with user submitted info
    });
}


// //data to be displayed after user is redirected after adding new contact
// function detailOutput(users){
//     $('#detailcontent').html('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>')
//     const yellowEdit = $("<button id = 'editdetail'></button>").text('Edit');
//     yellowEdit.click(() => { 
//         editPage(users[user.length-1]) 
//     });
//     $('#detailoutputbuttons').html(yellowEdit)
//     const redDelete = $("<button id = 'deletedetail'></button>").text('Delete');
//     redDelete.click(() => {
//         const confirmDelete = confirm("Are you sure?")
//         if (confirmDelete) {
//             users.pop();
//             contactList();
//         }
//     })
//     $('#detailoutputbuttons').html(redDelete)
//     // $('<label for="name">Name: </label><strong>'+users[users.length-1].name+'</strong><br><label for="email">Email: </label><strong>'+users[users.length-1].email+'</strong><br><label for="phone">Phone: </label><strong>'+users[users.length-1].phone+'</strong>').appendTo('#detailsform')
// }

//api to delete contact by id
function deleteContact(id){ //running the delete
    $.ajax({
        type: 'DELETE',
        url: `api/user/${id}`,
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)
}

function getDetails(user){ //ajax api request to get details for one user
    $.ajax({
        type: 'POST',
        url: 'api/user/specificuser',
        data: JSON.stringify(user),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(detailPage)
    .fail(errorHandler)
}

function editUser(contactChanged) { //using put to update user with contactChanged information
    $.ajax({
        type: 'PUT',
        url: `api/user/${contactChanged.id}`,
        data: JSON.stringify(contactChanged),
        contentType: 'application/json',
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)
}
