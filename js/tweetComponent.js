console.log("tweetComponent.js loaded");
//
function makeTweets(data) {
  var tweetsColumn = document.querySelector(
    "div.tweets__column .tweets__content"
  );
  //
  if (tweetsColumn) {
    //
    //  on first run
    //
    while (tweetsColumn.firstChild) {
      tweetsColumn.removeChild(tweetsColumn.firstChild);
      //
    }
    //
    if (data.id) {
      if (tweetsColumn.querySelector(".noTweets")) {
        tweetsColumn.querySelector(".noTweets").remove();
        //
      }
      //
      //  Add new tweet UI
      //
      if (data.page !== "userProfile") {
        addTweetUI(tweetsColumn);
      }
      //  Recent tweets divider
      let section = makeHTML(
        "h2",
        { class: "recentTweets__heading text-primary" },
        tweetsColumn
      );
      section.append(document.createTextNode("Recent tweets"));
      //
      //  Markup structure as object
      //
      if (data.tweets) {
        //
        //  reverse the damned, cursed object of objects of objects n*+1
        //
        for (tweet in data["tweets"]) {
          tweetStructure = {
            tweet__container: {
              tweet__header: {
                tweet__author: data["tweets"][tweet]["userid"],
                tweet__time: data["tweets"][tweet]["datetime"],
                //
              },
              //
              tweet__body: {
                tweet__content: data["tweets"][tweet]["tweet"],
                //
              },
              tweet__footer: {
                tweet__buttonContainer: "",
                //
              },
              //
            },
            //
          };
          //
          for (el in tweetStructure) {
            //  tweet__container
            var container = makeHTML("div", { class: el }, tweetsColumn);
            //
            //
            //
            for (blocks in tweetStructure[el]) {
              //  tweet blocks, ie tweet__header
              var block = makeHTML("div", { class: blocks }, container);
              //
              //
              //
              for (elements in tweetStructure[el][blocks]) {
                //  tweet elements, ie tweet__author
                var element = makeHTML("div", { class: elements }, block);
                //
                //
                //
                if (elements.match(/author/)) {
                  //  tweet elements content, ie h3 and it's text content
                  var element = makeHTML(
                    "a",
                    {
                      href:
                        "?user=" +
                        encodeURI(tweetStructure[el][blocks][elements]),
                    },
                    element,
                    tweetStructure[el][blocks][elements]
                  );
                  //
                }
                //
                if (elements.match(/time/)) {
                  var element = makeHTML(
                    "span",
                    { class: "text-muted" },
                    element,
                    tweetStructure[el][blocks][elements]
                  );
                  //
                }
                //
                if (elements.match(/content/)) {
                  var element = makeHTML(
                    "p",
                    {},
                    element,
                    tweetStructure[el][blocks][elements]
                  );
                  //
                }
                if (elements.match(/button/i)) {
                  var element = makeHTML(
                    "button",
                    {
                      "data-relation": data["tweets"][tweet]["isFollowing"],
                    },
                    element
                  );
                  //
                  if (element.dataset.relation != "self") {
                    if (element.dataset.relation == 1) {
                      var textNode = "Unfollow";
                      //
                    } else {
                      var textNode = "Follow";
                      //
                    }
                    //
                    element.append(document.createTextNode(textNode));
                  } else {
                    element.remove();
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
        }
        //
      }
    }
    //
  }
  //
  function addTweetUI(appendWhere) {
    //  tweet__container
    let container = makeHTML(
      "form",
      {
        class: "tweet__newContainer",
      },
      appendWhere
    );
    console.log("addTweetUI called!");
    //
    let block = makeHTML(
      "div",
      {
        class: "tweet__newHeader",
      },
      container
    );
    block.append(document.createTextNode("What's on your mind?"));
    //
    let content = makeHTML(
      "textarea",
      {
        wrap: "soft",
      },
      container
    );
    //
    let footer = makeHTML(
      "div",
      {
        class: "tweet__newFooter",
      },
      container
    );
    //
    let button = makeHTML(
      "button",
      {
        type: "submit",
      },
      footer
    );
    button.append(document.createTextNode("Tweet"));
    button.addEventListener("click", function (event) {
      event.preventDefault();
      //
      outbound["form"] = "newEntry";
      outbound["tweet"] = document.querySelector(
        ".tweet__newContainer textarea"
      ).value;
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
          console.log("Backend response: \n");
          console.log(inbound);
          //
          renderContent(inbound);
          //
          if (inbound["error"]) {
            document
              .querySelector(".tweet__newFooter")
              .insertAdjacentHTML(
                "afterbegin",
                inbound["error"]["addTweet"]["textarea"]
              );
            //
          }
          //
          if (inbound["success"]) {
            document
              .querySelector(".tweet__newFooter")
              .insertAdjacentHTML(
                "afterbegin",
                inbound["success"]["addTweet"]["textarea"]
              );
            //
          }
          //
        },
        //
      });
      //
    });
    //
    return container;
    //
  }
  //
}
//
function unfollowHandler(parent, event) {
  //
  toUnfollow =
    parent.querySelector(".tweet__author").firstElementChild.innerHTML;
  //
  outbound["unfollow"] = toUnfollow;
  //
  console.log("Sending:");
  console.log(outbound["unfollow"]);
  //
  $.ajax({
    url: "actions.php",
    method: "POST",
    dataType: "json",
    data: outbound,
    success: function (inbound) {
      //
      console.log("Server responds:");
      console.log(inbound);
      //
      renderContent(inbound);
    },
    //
  });
  //
}
//
function followHandler(parent, event) {
  //  for profileComponent
  if (parent.querySelector(".recommended__data .recommended__profile")) {
    toFollow = parent.querySelector(
      ".recommended__data .recommended__profile"
    ).innerHTML;
    //  for tweetComponent
  } else {
    toFollow = parent.querySelector(".tweet__author a").innerHTML;
  }
  //
  outbound["follow"] = toFollow;
  console.log("Sending:");
  //
  $.ajax({
    url: "actions.php",
    method: "POST",
    dataType: "json",
    data: outbound,
    success: function (inbound) {
      //
      console.log("Server responds:");
      console.log(inbound);
      //
      renderContent(inbound);
    },
    //
  });
  //
}
//
