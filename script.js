function openProfileModal() {
    document.getElementById("profileModal").style.display = "flex";
}

function closeProfileModal() {
    document.getElementById("profileModal").style.display = "none";
}

function validateForm() {
    var playername = document.getElementById("playerName").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    
    if (playername == "" || password == "" || confirmPassword == "") {
        alert("Please fill all the details");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    alert("Your Account has been created. Thank you!");
    return true;
   
}

function validateForm1() {

  var playername = document.getElementById("playerName").value;
  var password = document.getElementById("password").value;

  if (playername === "" || password === "") {
    alert("Please enter both username and password.");
    return false; 
  }

  return true;
}