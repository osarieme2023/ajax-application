(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const loader = document.querySelector("#loader");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //functions

  function toggleLoader(show) {
    if (show) {
      loader.classList.remove("hidden");
    } else {
      loader.classList.add("hidden");
    }
  }


  function loadInfoBoxes() {
    toggleLoader(true);
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json()) 
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;
  
          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;
  
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
        toggleLoader(false);
      })
      .catch(error => {
        console.error("Error loading InfoBoxes:", error);
        toggleLoader(false); 
      });
  }
  loadInfoBoxes();

  function loadMaterialInfo() {
    toggleLoader(true);
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
        console.log(materialListData);

        materialListData.forEach(material => {

          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
        toggleLoader(false);
      })
      .catch(error => {
        console.error("Error loading Material Info:", error);
        toggleLoader(false);
      });
  }
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();
