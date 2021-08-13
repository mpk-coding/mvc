function initModal() {
  console.log("Running initModal");
  if ($(".modal").length) {
    registerModal = new bootstrap.Modal(
      document.getElementById("registerModal"),
      {}
      //
    );
    //
    loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {});
    //
  }
  //  clears input fields when modal hides
  clearModalInputs();
}
//
function clearModalInputs() {
  $([registerModal._element, loginModal._element]).on(
    "hide.bs.modal",
    function () {
      $(this).find("input").val("");
      $(this).find(".form--success, .form--error").remove();
    }
    //
  );
  //
  clearModalErrorMessages();
}
//
function modalHandler(event) {
  event.preventDefault();
  //
  formType = event.target.getAttribute("value");
  //
  form = document.querySelector(`.modal[id*='${formType}']`);
  //
  inputs = form.querySelectorAll("input");
  //
  for (i = 0; i < inputs.length; i++) {
    //  assign a boolean value to a checkbox
    if (inputs[i].name.match(/checkbox/i)) {
      outbound[inputs[i].name] = inputs[i].checked;
    } else {
      //  assign the rest as follows
      outbound[inputs[i].name] = inputs[i].value;
    }
    //
  }
  //
  outbound["form"] = formType;
  //
  console.log("What frontend sends to the server: \n");
  console.log(outbound);
  //
  //  ajax
  //
  $.ajax({
    type: "POST",
    data: outbound,
    dataType: "json",
    url: "actions.php",
    success: function (inbound) {
      console.log(inbound);
      //
      renderContent(inbound);
    },
    //
  });
  //
}
//
function modalBackendValidation(data) {
  //
  clearModalErrorMessages();
  //
  if (data["error"]) {
    for (var el in data["error"]) {
      if (el != "addTweet") {
        form = document.querySelector("[id*='" + el + "'");
        //
        for (var subEl in data["error"][el]) {
          if (subEl != "server") {
            //
            parent = form.querySelector("[data-form-input='" + subEl + "'");
            //
            parent.insertAdjacentHTML("beforeend", data["error"][el][subEl]);
          } else {
            form
              .querySelector(".modal-body")
              .insertAdjacentHTML("beforeend", data["error"][el][subEl]);
          }
          //
        }
        //
      }
      //
    }
    //
  }
  //
  if (data["success"]) {
    if (!data["success"]["addTweet"]) {
      registerModal.hide();
      loginModal.show();
      //
      loginModal._element
        .querySelector(".modal-body")
        .insertAdjacentHTML(
          "beforeend",
          data["success"]["register"]["account"]
        );
    }
    //
  }
  //
}
//
function clearModalErrorMessages() {
  form = document.querySelectorAll(".modal");
  //
  form.forEach(function (element) {
    if (element.querySelectorAll("p.form--error")) {
      elementChild = element.querySelectorAll("p.form--error");
      //
      elementChild.forEach(function (errorMessage) {
        errorMessage.remove();
      });
    }
    if (element.querySelector(".form--success")) {
      element.querySelector(".form--success").remove();
    }
    //
  });
  //
}
//
//
//
loginButton = makeHTML("button", {
  class: ["btn", "btn-outline-primary", "text-nowrap"],
  type: "submit",
  "data-bs-toggle": "modal",
  "data-bs-target": "#loginModal",
});
loginButton.append(document.createTextNode("Login / Register"));
//
logoutButton = makeHTML("button", {
  class: ["btn", "btn-outline-primary", "text-nowrap"],
  "data-role": "logout",
});
logoutButton.append(document.createTextNode("Logout"));
//
//  Logout function
//
logoutButton.addEventListener("click", function (event) {
  outbound["logout"] = 1;
  console.log(outbound);
  //
  $.ajax({
    type: "POST",
    data: outbound,
    dataType: "json",
    url: "actions.php",
    success: function (inbound) {
      //
      console.log("Backend response: \n");
      console.log(inbound);
      //
      renderContent(inbound);
    },
    //
  });
  //
});
//
function changeUserAccountAction(data) {
  //
  //  Change the buttons if logged in
  //
  if (data != undefined && data["id"]) {
    if (document.querySelector("button[data-bs-target='#loginModal']")) {
      document
        .querySelector("button[data-bs-target='#loginModal']")
        .replaceWith(logoutButton);
      //
    }
    loginModal.hide();
    //
  }
  //
  if (!data["id"]) {
    logoutButton.replaceWith(loginButton);
    //
  }
  //
}
