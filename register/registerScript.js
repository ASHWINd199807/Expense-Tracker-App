// this function stopsa the redirection to the register page if the user is logged in.
function stopRedirectIfLoggedIn() {
    if (localStorage.getItem("loggedUser")) {
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
}
stopRedirectIfLoggedIn()
// this function works just after the submit button clicked

function save() {
    var usersDataList = localStorage.getItem("usersDataList") ? JSON.parse(localStorage.getItem("usersDataList")) : []
    var emailData = document.getElementById("emailInput").value
    var passwordData = document.getElementById("passwordInput").value
    let userExists = usersDataList.some((element) => { return element.email === emailData })
    if (document.getElementById("emailInput").value.trim() === "") { 
      let messageContainer= document.getElementById("alertMessage")
      messageContainer.className="displayAlertNow"
      messageContainer.innerText="Email can't be empty"
    }
    else if (document.getElementById("passwordInput").value.trim() === "") {
      let messageContainer= document.getElementById("alertMessage")
      messageContainer.className="displayAlertNow"
      messageContainer.innerText="Password can't be empty"
    }


    else if (userExists) {
        
        alert("User Exists , Please login !")

        window.location.href = "/login/index.html";
        //   rediret , with populated fields
    }
    else {
        
        let userData = { email: emailData, password: passwordData }
        usersDataList.push(userData)
        localStorage.setItem("usersDataList", JSON.stringify(usersDataList))
        window.location.href = "/login/index.html";
        document.getElementById("emailInput").value = ""
        document.getElementById("passwordInput").value = ""
    }
}

 