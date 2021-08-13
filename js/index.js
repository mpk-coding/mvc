window.onload = function () {
  console.log("Document loaded, running index.js");
  //
  defaultOutbound();
  //
  console.log("Sending:");
  console.log(outbound);
  //
  $.ajax({
    type: "POST",
    data: outbound,
    dataType: "json",
    url: "actions.php",
    success: function (inbound) {
      if (inbound != null) {
        console.log("Backend response: \n");
        console.log(inbound);
        //
        renderContent(inbound);
        //
      }
      //
    },
    //
  });
  //
  initModal();
  //
  //  handlers
  //
  //  ==============
  //
  //  click handlers
  //.
  this.addEventListener("click", function (event) {
    //
    //  modal
    //
    modalContainer = document.querySelector(".modal__container");
    //
    if (modalContainer.contains(event.target)) {
      document
        .querySelectorAll(".modal button[type='submit']")
        .forEach(function (currentValue) {
          if (event.target == currentValue) {
            modalHandler(event);
          }
          //
        });
      //
    }
    //
    tweetContainers = document.getElementsByClassName("tweet__container");
    //
    for (el of tweetContainers) {
      let button = el.querySelector(".tweet__buttonContainer button");
      if (el.querySelector(".tweet__buttonContainer button") == event.target) {
        //
        if (button.dataset.relation == 1) {
          unfollowHandler(el, event);
          //
        } else {
          followHandler(el, event);
          //
        }
        //
        break;
      }
      //
    }
    //
    profileContainers = document.getElementsByClassName(
      "recommended__container"
    );
    //
    for (el of profileContainers) {
      if (
        el.querySelector(
          ".recommended__action .recommended__followBtn.followBtn"
        ) == event.target
      ) {
        followHandler(el, event);
        //
        break;
        //
      }
      //
    }
    //
  });
  //
};
//
function renderContent(data) {
  modalBackendValidation(data);
  changeUserAccountAction(data);
  defaultOutbound();
  //
  makeMainLayout(data);
  makeProfile(data);
  makeTweets(data);
  makeProfiles(data);
  //
}
//
//  Make HTML
//
function makeHTML(tag, attributes = {}, append = "", content = "") {
  var DOMString = document.createElement(tag);
  //
  //  go through all passed attributes
  //
  if (attributes) {
    for (const [attribute, value] of Object.entries(attributes)) {
      //
      //  if an array of values is passed
      //
      if (typeof value === "object") {
        string = "";
        for (const [index, singularValue] of Object.entries(value)) {
          string += singularValue + " ";
          DOMString.setAttribute(attribute, string);
          //
        }
        //
      } else {
        DOMString.setAttribute(attribute, value);
      }
      //
    }
    //
    //  add text if passed
    //
    if (content) {
      DOMString.append(document.createTextNode(content));
    }
    //
  }
  //
  //  append to specified element if passed
  //
  if (append != "") {
    append.append(DOMString);
    //
    return DOMString;
  } else {
    return DOMString;
    //
  }
  //
}
//
function defaultOutbound() {
  outbound = {
    page: document.querySelector("main.page").dataset.page,
    //
  };
  //
  if (outbound.page == "userProfile") {
    userProfile();
    //
  }
}
//
function makeMainLayout(data) {
  var rootElement = document.querySelector("main.page");
  //
  while (rootElement.firstChild) {
    rootElement.firstChild.remove();
    //
  }
  //  when logged in
  if (data.id) {
    rootElement.classList.remove("h-100");
    //
    var layout = {
      //
      row: {
        //
        class: "row",
        children: {
          //
          profile__column: {
            //
            class: ["col-3", "profile__column"],
            //
          },
          //
          tweets__column: {
            //
            class: ["col-6", "tweets__column"],
            children: {
              //
              tweets__header: {
                //
                class: "tweets__header",

                //
              },
              //
              tweets__content: {
                //
                class: "tweets__content",
              },
              //
            },
            //
          },
          //
          recommended__column: {
            //
            class: ["col-3", "recommended__column"],
            children: {
              //
              recommended__header: {
                //
                class: "recommended__header",
                children: {
                  //
                  "text-primary": {
                    //
                    tag: "h2",
                    class: "text-primary",
                    text: "Recommended",
                    //
                  },
                  //
                },
              },
              //
              recommended__column: {
                //
                class: "recommended__content",
              },
              //
            },
            //
          },
          //
        },
        //
      },
      //
    };
    for (containers in layout) {
      //  row
      var container = makeHTML(
        "div",
        {
          class: layout[containers]["class"],
        },
        rootElement
      );
      //
      for (columns in layout[containers]["children"]) {
        //  __column
        var column = makeHTML(
          "div",
          {
            class: layout[containers]["children"][columns]["class"],
          },
          container
        );
        // __header, __content etc
        for (blocks in layout[containers]["children"][columns]["children"]) {
          var block = makeHTML(
            "div",
            {
              class:
                layout[containers]["children"][columns]["children"][blocks][
                  "class"
                ],
            },
            column
          );
          //  component
          for (elements in layout[containers]["children"][columns]["children"][
            blocks
          ]["children"]) {
            //
            var element = makeHTML(
              layout[containers]["children"][columns]["children"][blocks][
                "children"
              ][elements]["tag"],
              {
                class:
                  layout[containers]["children"][columns]["children"][blocks][
                    "children"
                  ][elements]["class"],
              },
              block,
              layout[containers]["children"][columns]["children"][blocks][
                "children"
              ][elements]["text"]
            );
          }
          //
        }
        //
      }
      //
    }
    //  when logged out
  } else {
    rootElement.classList.add("h-100");
    //
    var layout = {
      //
      row: {
        //
        class: [
          "d-flex",
          "w-100",
          "h-100",
          "justify-content-center",
          "align-items-center",
        ],
        //
        children: {
          //
          message: {
            //
            class: "text-primary",
            //
          },
          //
        },
        //
      },
      //
    };
    //
    for (containers in layout) {
      var container = makeHTML(
        "div",
        {
          class: layout[containers]["class"],
        },
        rootElement
      );
      //
      for (blocks in layout[containers]["children"]) {
        var block = makeHTML(
          "h2",
          { class: layout[containers]["children"][blocks]["class"] },
          container,
          "LOG IN"
        );
        //
      }
      //
    }
    //
  }
  //
}
//
