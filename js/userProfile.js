function userProfile() {
  //  extract the username from get variable
  //  for lack of better ideas
  //  scuffage 101
  var userProfileString = window.location.href
    .match(/(user=[\S]*(?=\?)*?)/g)[0]
    .split("=")[1];
  //  assign and send via ajax
  if (outbound.page == "userProfile") {
    outbound["userProfile"] = userProfileString;
    //
  }
  //
}
//
//
function makeProfile(data) {
  var rootElement = document.querySelector(".profile__column");
  //
  if (data.user) {
    if (data.page == "userProfile") {
      var layout = {
        profile: {
          class: "profile",
          children: {
            //
            profile__header: {
              //
              class: "profile__header",
              children: {
                //
                profile__img: {
                  //
                  class: "profile__img",
                  children: {
                    //
                    img: {
                      tag: "img",
                      src: "img/profile_placeholder.png",
                      alt: "Profile picture",
                    },
                    //
                  },
                  //
                },
                //
                profile__info: {
                  class: "profile__info",
                  children: {
                    //
                    profile__name: {
                      //
                      class: "profile__name",
                      children: {
                        //
                        text: {
                          tag: "a",
                          attributes: {
                            class: "text-primary",
                            href: "?user=" + data["userProfile"]["email"],
                            //
                          },
                          //
                          content: data["userProfile"]["email"],
                        },
                        //
                      },
                      //
                    },
                    //
                    profile__location: {
                      //
                      class: "profile__location",
                      children: {
                        //
                        text: {
                          tag: "span",
                          class: "text-muted",
                          content: data["userProfile"]["location"],
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
              },
              //
            },
            //
            profile__body: {
              //
              class: "profile__body",
              children: {
                //
                text: {
                  tag: "p",
                  class: "profile__text",
                  content: data["userProfile"]["info"],
                },
                //
              },
              //
            },
            //
            profile__footer: {
              //
              class: "profile__footer",
              children: {
                //
                text: {
                  tag: "span",
                  class: "profile__followers",
                  content: "Followers: " + data["userProfile"]["followers"],
                  //
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
    } else {
      var layout = {
        profile: {
          class: "profile",
          children: {
            //
            profile__header: {
              //
              class: "profile__header",
              children: {
                //
                profile__img: {
                  //
                  class: "profile__img",
                  children: {
                    //
                    img: {
                      tag: "img",
                      src: "img/profile_placeholder.png",
                      alt: "Profile picture",
                    },
                    //
                  },
                  //
                },
                //
                profile__info: {
                  class: "profile__info",
                  children: {
                    //
                    profile__name: {
                      //
                      class: "profile__name",
                      children: {
                        //
                        text: {
                          tag: "a",
                          attributes: {
                            class: "text-primary",
                            href: "?user=" + data["user"]["email"],
                            //
                          },
                          //
                          content: data["user"]["email"],
                        },
                        //
                      },
                      //
                    },
                    //
                    profile__location: {
                      //
                      class: "profile__location",
                      children: {
                        //
                        text: {
                          tag: "span",
                          class: "text-muted",
                          content: "undisclosed",
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
              },
              //
            },
            //
            profile__body: {
              //
              class: "profile__body",
              children: {
                //
                text: {
                  tag: "p",
                  class: "profile__text",
                  content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim fringilla mattis. Aenean interdum aliquam velit nec pretium. Aenean venenatis congue neque a dignissim. Curabitur id elit justo.",
                },
                //
              },
              //
            },
            //
            profile__footer: {
              //
              class: "profile__footer",
              children: {
                //
                text: {
                  tag: "span",
                  class: "profile__followers",
                  content: "Followers: " + data["user"]["followers"],
                  //
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
    }
    //
    //  loop
    //
    for (containers in layout) {
      //  profile
      var container = makeHTML(
        "div",
        { class: layout[containers]["class"] },
        rootElement
      );
      //  block level
      for (blocks in layout[containers]["children"]) {
        //  profile__header ~
        var block = makeHTML(
          "div",
          { class: layout[containers]["children"][blocks]["class"] },
          container
        );
        // mostly element level
        for (elements in layout[containers]["children"][blocks]["children"]) {
          //
          if (elements == "text") {
            //
            var element = makeHTML(
              layout[containers]["children"][blocks]["children"][elements][
                "tag"
              ],
              {
                class:
                  layout[containers]["children"][blocks]["children"][elements][
                    "class"
                  ],
              },
              block,
              layout[containers]["children"][blocks]["children"][elements][
                "content"
              ]
            );
            //
          } else {
            //
            var element = makeHTML(
              "div",
              {
                class:
                  layout[containers]["children"][blocks]["children"][elements][
                    "class"
                  ],
              },
              block
            );
          }
          //  mostly element level or textNodes / img
          for (contents in layout[containers]["children"][blocks]["children"][
            elements
          ]["children"]) {
            //
            if (contents == "img") {
              var content = makeHTML(
                layout[containers]["children"][blocks]["children"][elements][
                  "children"
                ][contents]["tag"],
                {
                  src: layout[containers]["children"][blocks]["children"][
                    elements
                  ]["children"][contents]["src"],
                  alt: layout[containers]["children"][blocks]["children"][
                    elements
                  ]["children"][contents]["alt"],
                },
                element
              );
              //
            } else {
              var content = makeHTML(
                "div",
                {
                  class:
                    layout[containers]["children"][blocks]["children"][
                      elements
                    ]["children"][contents]["class"],
                },
                element
              );
              //
            }
            //  textNodes mostly, link and so on
            for (subContents in layout[containers]["children"][blocks][
              "children"
            ][elements]["children"][contents]["children"]) {
              //  exception for those with attributes property
              if (
                layout[containers]["children"][blocks]["children"][elements][
                  "children"
                ][contents]["children"][subContents]["attributes"]
              ) {
                //
                var subContent = makeHTML(
                  layout[containers]["children"][blocks]["children"][elements][
                    "children"
                  ][contents]["children"][subContents]["tag"],
                  {
                    class:
                      layout[containers]["children"][blocks]["children"][
                        elements
                      ]["children"][contents]["children"][subContents][
                        "attributes"
                      ]["class"],
                    href: layout[containers]["children"][blocks]["children"][
                      elements
                    ]["children"][contents]["children"][subContents][
                      "attributes"
                    ]["href"],
                  },
                  content,
                  layout[containers]["children"][blocks]["children"][elements][
                    "children"
                  ][contents]["children"][subContents]["content"]
                );
                //
              } else {
                var subContent = makeHTML(
                  layout[containers]["children"][blocks]["children"][elements][
                    "children"
                  ][contents]["children"][subContents]["tag"],
                  {
                    class:
                      layout[containers]["children"][blocks]["children"][
                        elements
                      ]["children"][contents]["children"][subContents]["class"],
                  },
                  content,
                  layout[containers]["children"][blocks]["children"][elements][
                    "children"
                  ][contents]["children"][subContents]["content"]
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
      }
      //
    }
    //
  }
  //
}
