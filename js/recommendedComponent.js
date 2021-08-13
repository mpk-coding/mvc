console.log("profilesComponent loaded");
//
function makeProfiles(data) {
  //
  let parentElement = document.querySelector(
    "div.recommended__column .recommended__content"
  );
  //
  if (parentElement) {
    //
    //  on first run
    //
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
      //
    }
    //
    if (data.recommended) {
      //
      for (const index in data.recommended) {
        var recommendedProfileStructure = {
          recommended__container: {
            recommended__data: {
              recommended__profile: data.recommended[index].email,
              recommended__followers: data.recommended[index].followers,
              //
            },
            recommended__action: {
              recommended__followBtn: "Follow",
              //
            },
            //
          },
          //
        };
        //
        for (containers in recommendedProfileStructure) {
          let container = makeHTML("div", { class: containers }, parentElement);
          //
          for (blocks in recommendedProfileStructure[containers]) {
            block = makeHTML("div", { class: blocks }, container);
            //
            for (elements in recommendedProfileStructure[containers][blocks]) {
              //
              if (elements.match(/profile/i)) {
                element = makeHTML(
                  "a",
                  {
                    class: [elements, "text-primary"],
                    href:
                      "?user=" +
                      encodeURI(
                        recommendedProfileStructure[containers][blocks][
                          elements
                        ]
                      ),
                  },
                  block,
                  recommendedProfileStructure[containers][blocks][elements]
                );
                //
              }
              //
              if (elements.match(/followers/i)) {
                element = makeHTML(
                  "h4",
                  { class: [elements, "text-muted"] },
                  block,
                  "Followers: " +
                    recommendedProfileStructure[containers][blocks][elements]
                );
                //
              }
              //
              if (elements.match(/followBtn/i)) {
                element = makeHTML(
                  "button",
                  { class: [elements, "followBtn"] },
                  block,
                  recommendedProfileStructure[containers][blocks][elements]
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
//
