// this function stopsa the redirection to the register page if the user is logged in.
function stopRedirectIfLoggedIn() {
  if (localStorage.getItem("loggedUser")) {
    window.location.href = "http://127.0.0.1:5500/index.html";
  }
}
stopRedirectIfLoggedIn()

function encryptLoggedUser(userEmail) {
  let encrytptedString = "iuehHBhuGUYBHJbJHGJHBK.comlll.." + userEmail + "0000sdfohGGHVBJKjHNKBkhjBJHBkJBKjIKJ98OJN9"
  // return encrytptedString.slice(encrytptedString.indexOf("lll..")+5,encrytptedString.indexOf("0000"))
  return encrytptedString
}


// this function works just after the submit button clicked.
function save() {

  var emailData = document.getElementById("emailInput").value.trim();
  var passwordData = document.getElementById("passwordInput").value.trim();
  var usersDataList = localStorage.getItem("usersDataList") ? JSON.parse(localStorage.getItem("usersDataList")) : []
  const userMatch = usersDataList.some(user => (user.email === emailData) && (user.password === passwordData));
  let encryptedUserData = encryptLoggedUser(emailData)

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
  else if (!userMatch && usersDataList.some(user => (user.email === emailData))) {
    let messageContainer= document.getElementById("alertMessage")
    messageContainer.className="displayAlertNow"
    messageContainer.innerText="Account or password is incorrect !"
  }
  else if (userMatch) {
    localStorage.setItem("loggedUser", encryptedUserData)
    if (localStorage.getItem("usersTransactions") == null) { 
      localStorage.setItem("usersTransactions", "[]");
    }
    window.location.href = "http://127.0.0.1:5500/index.html";
  }
  else {
   
    alert("Please Register First")
    window.location.href = "/register/index.html";
  }
}

 