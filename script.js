// variables used frequently
var commonList = JSON.parse(localStorage.getItem("usersTransactions"));
var loggedUser = localStorage.getItem("loggedUser");
var incomeContainerBox = document.getElementById("incomeDiv");

// if the user is not logged in then the user is automatically redirected to the login page
function checkIfUserLoggedIn() {
  if (!localStorage.getItem("loggedUser")) {
    window.location.href = "/login/index.html";
  }
}
checkIfUserLoggedIn();

// function to hide the addIncomeForm
const hideAddIncomeForm = () => {
  document.getElementById("addIncomeForm").className = "displayOnAlert";
};

// to signout current user
const signoutCurrentUser = () => {
  localStorage.removeItem("loggedUser");
  location.reload();
};

// runs evertime on page load to update the balance
const updateBalanceOnHomePage = () => {
  let balanceContainer = document.getElementById("balanceDiv");
  let incomeAmount = returnAmount("income");
  let expenceAmount = returnAmount("expence");
  let balanceAmount = Number(incomeAmount) - Number(expenceAmount);
  balanceAmount = returnInCurrencyFormat(String(balanceAmount));
  let incomeAmountContainer = document.createElement("div");
  incomeAmountContainer.innerHTML = "&#8377" + " " + balanceAmount;

  balanceContainer.appendChild(incomeAmountContainer);
};

//  returning striong in currency format
function returnInCurrencyFormat(amount) {
  // If length if less than 3
  let a = "";
  for (let i = 0; i < amount.length; i++) {
    if (amount[i] !== "0") {
      a = amount[i];
      break;
    }
  }
  amount = amount.slice(amount.indexOf(a), amount.length);
  console.log("dfsd", amount);
  let length = amount.length;
  if (length <= 3) return amount;

  let currencyString = "";
  let startCount = 0,
    currentCount = 0;

  // If length is even
  if (length % 2 == 0) {
    currencyString += amount[0];
    currencyString += ",";
    startCount = 1;
  }
  while (startCount < length - 2) {
    if (currentCount == 2) {
      currencyString += ",";
      currentCount = 0;
      continue;
    } else {
      currencyString += amount[startCount];
      currentCount++;
    }
    startCount++;
  }

  for (let i = startCount; i < length; i++) currencyString += amount[i];

  return currencyString;
}

// runs evertime on page load to update the income
const updateIncomeOnHomePage = () => {
  let incomeContainer = incomeContainerBox;
  let incomeAmount = returnAmount("income");
  let incomeAmountContainer = document.createElement("div");
  incomeAmount = returnInCurrencyFormat(incomeAmount);
  incomeAmountContainer.innerHTML = "&#8377" + " " + incomeAmount;
  incomeContainer.appendChild(incomeAmountContainer);
};

// runs evertime on page load to update the balance
const updateExpenseOnHomePage = () => {
  let incomeContainer = document.getElementById("expenceDiv");
  let incomeAmount = returnAmount("expense");
  let incomeAmountContainer = document.createElement("div");
  incomeAmount = returnInCurrencyFormat(incomeAmount);
  incomeAmountContainer.innerHTML = "&#8377" + " " + incomeAmount;
  incomeContainer.appendChild(incomeAmountContainer);
};

const addIncomeForm = () => {
  document.getElementById("addIncomeForm").className = "displayIncomeAlertNow";
};

// displays the dropdown in order add the income
const addIncomeButton = () => {
  let transactionText = document
    .getElementById("transactionIncomeDetails")
    .value.trim();
  let transactionAmount = document
    .getElementById("transactionIncomeAmount")
    .value.trim();
  let transactionArray = JSON.parse(localStorage.getItem("usersTransactions"));
  if (transactionText === "") {
    let messageContainer = document.getElementById("alertIncomeMessage");
    messageContainer.className = "displayAlertNow";
    messageContainer.innerText = "Details can't be empty !";
  } else if (transactionAmount.includes("-")) {
    let messageContainer = document.getElementById("alertIncomeMessage");
    messageContainer.className = "displayAlertNow";
    messageContainer.innerText = "Income can't be negative !";
  } else if (transactionAmount === "") {
    let messageContainer = document.getElementById("alertIncomeMessage");
    messageContainer.className = "displayAlertNow";
    messageContainer.innerText = "Can't proceed with empty value !";
  } else {
    var elementID;
    if (localStorage.getItem("usersTransactions") == "[]") {
      elementID = 1; // IF THE TODO LIST IS EMPTY THEN BY DEFAULT 1st ASSIGNED ID WILL BE 1
    } else {
      let lastObject = transactionArray[transactionArray.length - 1];
      elementID = Number(lastObject.ID) + 1; // IF THE LIST IS NOT EMPTY THEN +1 WILL BE ADDED TO THE LAST ID
    }
    console.log;
    let transactionObject = {
      content: transactionText,
      amount: transactionAmount,
      ID: elementID,
      type: "income",
      userID: loggedUser,
    };
    transactionArray.push(transactionObject);
    localStorage.setItem("usersTransactions", JSON.stringify(transactionArray));
    location.reload();
  }
};

updateIncomeOnHomePage();
updateExpenseOnHomePage();
updateBalanceOnHomePage();

// returns the sum of the current logged user's incomes oe expences
function returnAmount(amountType) {
  let transactionArray = commonList.filter((element) => {
    return element.userID === loggedUser;
  });

  let amountArray = [];
  if (amountType === "income") {
    for (let i of transactionArray) {
      if (i.type === "income") {
        amountArray.push(Number(i.amount));
      }
    }
    let incomeSum = 0;
    for (let i = 0; i < amountArray.length; i++) {
      incomeSum += amountArray[i];
    }
    return String(incomeSum);
  } else {
    for (let i of transactionArray) {
      if (i.type === "expense") {
        amountArray.push(Number(i.amount));
      }
    }
    let incomeSum = 0;
    for (let i = 0; i < amountArray.length; i++) {
      incomeSum += amountArray[i];
    }
    return String(incomeSum);
  }
}
// function to add a new expence
const addNewExpense = () => {
  let transactionArray = commonList;
  let transactionText = document.getElementById("trasactionText").value.trim();

  var transactionAmount = document
    .getElementById("trasactionNumber")
    .value.trim();

  transactionAmount =
    transactionAmount[0] === "-"
      ? transactionAmount.slice(1, transactionAmount.length)
      : transactionAmount;

  let incomeAmount = returnAmount("income");
  let expenceAmount = returnAmount("expence");
  let balanceAmount = Number(incomeAmount) - Number(expenceAmount);
  if (transactionText === "") {
    let messageContainer = document.getElementById("alertMessage");
    messageContainer.className = "displayAlertNow";
    messageContainer.innerText = "Details can't be empty";
  } else if (transactionAmount === "") {
    let messageContainer = document.getElementById("alertMessage");
    messageContainer.className = "displayAlertNow";
    messageContainer.innerText = "Can't proceed with empty value.";
  } else if (Number(transactionAmount) > balanceAmount) {
    let messageContainer = document.getElementById("alertMessage");
    messageContainer.className = "displayAlertNow";
    messageContainer.innerText =
      "Please enter an amount less than the current balance";
  } else {
    var elementID;
    if (localStorage.getItem("usersTransactions") == "[]") {
      elementID = 1; // IF THE TODO LIST IS EMPTY THEN BY DEFAULT 1st ASSIGNED ID WILL BE 1
    } else {
      let lastObject = transactionArray[transactionArray.length - 1];
      elementID = Number(lastObject.ID) + 1; // IF THE LIST IS NOT EMPTY THEN +1 WILL BE ADDED TO THE LAST ID
    }
    console.log;
    let transactionObject = {
      content: transactionText,
      amount: transactionAmount,
      ID: elementID,
      type: "expense",
      userID: loggedUser,
    };
    transactionArray.push(transactionObject);
    localStorage.setItem("usersTransactions", JSON.stringify(transactionArray));
    location.reload();
  }
};

// this function populates the transactionDetailsContainer with the tansactions , UI part for the same if left.
function populateToDoContainer() {
  let transactionArray = commonList.filter((element) => {
    return element.userID === loggedUser;
  });
  transactionArray = transactionArray.reverse();
  let transactionsContainer = document.getElementById(
    "transactionaDetailsContainer"
  );
  let transactionData = "";
  for (i = 0; i < transactionArray.length; ++i) {
    let amountType = transactionArray[i].type === "income" ? "+" : "-";
    let boxClass =
      transactionArray[i].type === "income"
        ? "individualTransactionBoxIncome"
        : "individualTransactionBoxExpence";
    transactionData += `
    <div>
      <div class="${boxClass}">
        <div  style="width:70% ">
           <div class="transactionsContent" >${
             transactionArray[i].content
           }</div>
        </div>
        <div style="width:30%;text-align:end; ">
           <div class="transactionsAmount">${amountType}${returnInCurrencyFormat(
      transactionArray[i].amount
    )}</div>
        </div>
       
 </div>

 </div>
      `;
  }
  transactionsContainer.innerHTML = transactionData;
}
populateToDoContainer();
// // for scrolling to bottom after every
// function scrollTransactionsHistory() {
//   var elem = document.getElementById('transactionaDetailsContainer');
//   elem.scrollTop = elem.scrollHeight;
// }
// scrollTransactionsHistory()

const saveFile = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }

  document.getElementById("downloadCSVFile").className =
    "displayForDownloadButton";
  document.getElementById("downloadTXTFile").className =
    "displayForDownloadButton";
};

const createCsvOrTextFile = (type) => {
  let transactionArray = commonList.filter((element) => {
    return element.userID === loggedUser;
  });
  transactionArray = transactionArray.reverse();
  if (type === "csv") {
    var csvContent = "content,amount,ID,type,userID\n";
    transactionArray.forEach((person) => {
      let row =
        person.content +
        "," +
        person.amount +
        "," +
        person.ID +
        "," +
        person.type +
        "," +
        person.userID +
        "\n";
      csvContent += row;
    });
  } else {
    var csvContent = "";
    transactionArray.forEach((person) => {
      let row =
        "content " +
        person.content +
        "\n" +
        "amount " +
        person.amount +
        "\n" +
        "ID " +
        person.ID +
        "\n" +
        "type " +
        person.type +
        "\n" +
        "userID " +
        person.userID +
        "\n";
      csvContent += row;
    });
  }
  var data = new Blob([csvContent], { type: `text/${type}` });
  let fileName = type === "csv" ? "test.csv" : "text.txt";
  saveFile(data, fileName);
};

// const createTXT = () => {
//   let transactionArray = commonList.filter((element) => {
//     return element.userID === loggedUser;
//   });
//   transactionArray = transactionArray.reverse();

//   var data = new Blob([csvContent], { type: "text/plain" });
//   saveFile(data, "test.csv");
// };

const displayDownloadOptions = (p) => {
  console.log(p);
  document.getElementById("downloadCSVFile").className =
    "displayCsvDownloadButtonNow";
  document.getElementById("downloadTXTFile").className =
    "displayTxtDownloadButtonNow";
  document.getElementById("csvAndTExtButtonsContainer").className="csvAndTextButtonsContainer"
};

const hideDownloadOptions = () => {
  document.getElementById("downloadCSVFile").className =
    "displayForDownloadButton";
  document.getElementById("downloadTXTFile").className =
    "displayForDownloadButton";
  
    document.getElementById("csvAndTExtButtonsContainer").className="displayForDownloadButton"
};
const currentFile = document.getElementById("fileInput");

// Add an event listener to the input element that listens for a "change" event
currentFile.addEventListener("change", () => {
  // Create a new FileReader object
  const fr = new FileReader();

  // When the FileReader object has finished loading the file, run the following code
  fr.onloadend = (e) => {
    // Split the contents of the file into an array of lines, then split each line into an array of values
    let r = fr.result.split("\n").map((e) => {
      return e.split(",");
    });

    console.log(r, "thi is the resuld");
    let arrOfObj = [];

    if (fr.result.includes("content,amount,ID,type,userID")) {
      let count = 1;
      while (count < r.length) {
        if (
          r[count][0] &&
          r[count][1] &&
          r[count][2] &&
          r[count][3] &&
          r[count][4]
        ) {
          let obj = {
            content: r[count][0],
            amount: r[count][1],
            ID: r[count][2],
            type: r[count][3],
            userID: r[count][4],
          };
          arrOfObj.push(obj);
        }
        count = count + 1;
      }
    } else {
      let count = 0;
      while (count < r.length - 1) {
        let obj = {
          content: r[count][0].slice(r[0][0].indexOf(" ") + 1),
          amount: r[count + 1][0].slice(r[count + 1][0].indexOf(" ") + 1),
          ID: r[count + 2][0].slice(r[count + 2][0].indexOf(" ") + 1),
          type: r[count + 3][0].slice(r[count + 3][0].indexOf(" ") + 1),
          userID: r[count + 4][0].slice(r[count + 4][0].indexOf(" ") + 1),
        };
        console.log(obj, "lodsjfoj");
        arrOfObj.push(obj);
        count = count + 5;
      }
    }

    let transactionArray = arrOfObj;
    localStorage.setItem("arrOfObj", JSON.stringify(arrOfObj));
    let transactionsContainer = document.getElementById(
      "transactionaDetailsContainer"
    );
    let transactionData = "";
    for (i = 0; i < transactionArray.length; ++i) {
      let amountType = transactionArray[i].type === "income" ? "+" : "-";
      let boxClass =
        transactionArray[i].type === "income"
          ? "individualTransactionBoxIncome"
          : "individualTransactionBoxExpence";
      transactionData += `
          <div>
            <div class="${boxClass}">
              <div  style="width:70% ">
                 <div class="transactionsContent" >${
                   transactionArray[i].content
                 }</div>
              </div>
              <div style="width:30%;text-align:end; ">
                 <div class="transactionsAmount">${amountType}${returnInCurrencyFormat(
        transactionArray[i].amount
      )}</div>
              </div>
             
       </div>
      
       </div>
            `;
    }
    transactionsContainer.innerHTML = transactionData;
  };
  document.getElementById("fileInputFieldContainer").className="fileInputContainerHidden"

  document.getElementById("csvAndTExtButtonsContainer").className="fileInputContainerHidden"
  // Read the contents of the selected file as text
  fr.readAsText(currentFile.files[0]);
});

const uploadFile=()=>{
  document.getElementById("fileInputFieldContainer").className="fileInputContainer"
}