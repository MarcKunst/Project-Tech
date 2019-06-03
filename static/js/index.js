//responsive disclosure text input field
let locationInputField = document.getElementById('location_input_field');

function addTextInput (){
    locationInputField.classList.remove('hide');
    }

    let addLocation = document.getElementById('add_location');
    addLocation.addEventListener('click', addTextInput, false);

function removeTextInput (){
    locationInputField.classList.add('hide');
    }
    
    let removeLocation = document.getElementById('no_location');
    removeLocation.addEventListener('click', removeTextInput, false);

//check if movie inputfield is empty
let submitButton = document.getElementById('submit_button');

let movieInput = document.getElementById('movie_input_field').value;
if (movieInput == "" || movieInput.length == 0 || movieInput == null)
{
    submitButton.classList.remove('ready');
    console.log("class is uit");
} else {
    submitButton.classList.add('ready');
    console.log("class is aan");
}
