const getBackgroundPicture = async function () {
  try {
    const data = await AJAX(`${UNSPLASH_URL_BACKGROUND_PICKTURE}$`);
    let markup = "";
    data.forEach((img) => {
      //   unsplashImageEl.src = img.urls.regular;
      markup = `
      <div class="backgroundImg">
        <a href="${img.links.html}" id="imageLink">
          <img src="${img.urls.regular} "alt="random image" id="unsplashImage" />
        </a>
      </div>`;
    });
    document.body.insertAdjacentHTML("afterbegin", markup);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
const getPictures = async function () {
  try {
    const { data } = await AJAX(`${UNSPLASH_URL}${UNSPLASH_ID}`);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
// getPictures();
