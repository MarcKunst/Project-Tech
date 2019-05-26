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