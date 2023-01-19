export const ErrorMessage = (error) => {
  if (error.response) {
    console.log(
      `The request was made but the server responded with failed status code! (${error.response.status})`
    );
  } else {
    console.log(`Your request was made but no response was received!`);
  }
};

export const AJAX = async function (url, id = undefined) {
  try {
    const fetchPro = axios.get(url, id);
    const data = await fetchPro;
    return data;
  } catch (err) {
    throw err;
  }
};
export const kToC = (kelvin) => {
  const cel = kelvin - 273.15;
  return `${cel.toFixed(0)}°C`;
};

export const renderErrorAcitivtyMsg = function (element) {
  const markup = `
  <div class="spinner">
      <span class="activity">Failed to get the activity at the moment...</span>    
        <p class="errorText">refreshing...</p>
        <i class="fa-solid fa-spinner"></i>
     </div>
  `;
  element.innerHTML = markup;
};
export const renderErrorTimeMsg = function (element) {
  const markup = `
    <div class="spinner">     
    <p class="errorText">Cannot get time data at the moment.</p>
    <p class="errorText">refreshing...</p>
      <i class="fa-solid fa-spinner"></i>
    </div>
  `;
  element.innerHTML = markup;
};

export const renderErrorImgMsg = function (element) {
  const markup = `
  <div class="spinner">  
    <p class="alt_description">Failed to get the image at the moment...</p>  
    <p class="errorText">refreshing...</p>    
    <i class="fa-solid fa-spinner"></i>
    </div> 
                `;
  element.innerHTML = markup;
};
export const renderSpinner = function (element) {
  const markup = `
  <div class="spinner">    
    <i class="fa-solid fa-spinner"></i>
    </div> 
                `;
  element.innerHTML = markup;
};
export const renderErrorMsgJokes = function (element) {
  const markup = `
  <div class="spinner">  
  <p class="errorText">Cannot get joke data at the moment.</p>
  <p class="errorText">refreshing...</p>
    <i class="fa-solid fa-spinner"></i>
    </div> 
                `;
  element.innerHTML = markup;
};
