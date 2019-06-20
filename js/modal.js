// Get the modal
var add_expression_modal = document.getElementById('add_expression_modal');

// Get the button that opens the modal
var modal_open_button = document.getElementById("modal_open_button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modal_open_button.onclick = function() {
    add_expression_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    add_expression_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == add_expression_modal) {
        add_expression_modal.style.display = "none";
    }
}
