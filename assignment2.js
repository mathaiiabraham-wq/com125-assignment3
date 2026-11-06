/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case
   

      Filename: js05.js
*/

window.addEventListener("load", createLightBox);

function createLightBox(){
   let lightBox = document.getElementById("lightbox");

   let lbTitle = document.createElement("h1");
   let lbCounter = document.createElement("div");
   let lbPrev = document.createElement("div");
   let lbNext = document.createElement("div");
   let lbPlay = document.createElement("div");
   let lbImages = document.createElement("div");

   lightBox.appendChild(lbTitle);
   lbTitle.id = "lbTitle";
   lbTitle.textContent = lightboxTitle;

   lightBox.appendChild(lbCounter);
   lbCounter.id = "lbCounter";
   let currentImg = 1;
   lbCounter.textContent = currentImg + " / " + imgCount;

   lightBox.appendChild(lbPrev);
   lbPrev.id = "lbPrev";
   lbPrev.innerHTML = "◀";
   lbPrev.onclick = showPrev;

   lightBox.appendChild(lbNext);
   lbNext.id = "lbNext";
   lbNext.innerHTML = "▶";
   lbNext.onclick = showNext;

   lightBox.appendChild(lbPlay);
   lbPlay.id = "lbPlay";
   lbPlay.innerHTML = "⏯";
   let timeID;
   lbPlay.onclick = function() {
      if (timeID) {
         window.clearInterval(timeID);
         timeID = undefined;
      }
      else {
         showNext();
         timeID = window.setInterval(showNext, 1500);
      }
   }

   lightBox.appendChild(lbImages);
   lbImages.id = "lbImages";

   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      lbImages.appendChild(image);
   }

   function showNext() { 
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   function showPrev() {
      lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
      (currentImg > 1) ? currentImg-- : currentImg = imgCount;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   let favorites = [];
   const maxFavorites = 5;

   // open zoom window and put buttons under pic
   function createOverlay() {
      let overlay = window.open("", "win", "width=850,height=600");
      overlay.document.head.innerHTML = "<title>Full size photo</title><link rel='stylesheet' href='styles.css'>";
      overlay.document.body.innerHTML = "";
      overlay.document.body.style.backgroundColor = "#1a1a1a";
      overlay.document.body.style.textAlign = "center";
      overlay.document.body.style.paddingTop = "15px";

      let newBox = document.createElement("img");
      newBox.src = this.src;
      newBox.style.height = "470px";
      newBox.style.border = "3px solid white";
      overlay.document.body.appendChild(newBox);

      let br = document.createElement("br");
      overlay.document.body.appendChild(br);

      let addToFav = document.createElement("button");
      addToFav.textContent = "Add to Favorites";
      addToFav.onclick = () => addToFavorites(this.src);
      overlay.document.body.appendChild(addToFav);

      let closeBtn = document.createElement("button");
      closeBtn.textContent = "Close Window";
      closeBtn.onclick = function() {
         overlay.close();
      };
      overlay.document.body.appendChild(closeBtn);
   }

   // check if we got 5 pics already before adding
   function addToFavorites(src) {
      if (favorites.length >= maxFavorites) {
         alert("You can only add up to " + maxFavorites + " favorites. Please remove a favorite first.");
         return;
      }
      if (favorites.includes(src)) {
         alert("The image is already in your favorites");
         return;
      }
      favorites.push(src);
      updateFavorites();
   }

   // show fav pics at bottom and show remove button when click
   function updateFavorites() {
      let favoritesDiv = document.getElementById("favorites");
      favoritesDiv.innerHTML = "";
      for (let i = 0; i < favorites.length; i++) {
         let img = document.createElement("img");
         img.src = favorites[i];
         favoritesDiv.appendChild(img);

         let removeButton = document.createElement("button");
         removeButton.textContent = "Remove";
         removeButton.style.display = "none";
         removeButton.onclick = () => removeFavorites(i);
         favoritesDiv.appendChild(removeButton);

         img.onclick = function() {
            removeButton.style.display = "inline-block";
         };
      }
   }  

   function removeFavorites(index) {
      favorites.splice(index, 1);
      updateFavorites();
   }
}