

// If a && b are truthy - calc percentage. Else return '-'
export const calcPerc = function (a, b) {
  if(a && b) {
  return Math.round((a / b) * 100) + '%';
  } else {
    return '-';
  }
}

// If the data is truthy or equals 0 - return the data. Else return '-'
export const checkTruthy = function (data) {
  if (data || data === 0) {
    return data  
  } else {
    return '-';
  }
};

// Function for clearing the # from the window object, used with the modal "hidden.bs.modal" event
export const clearHash = () => {
  let uri = window.location.toString();
  if (uri.indexOf("#") > 0) {
    let clean_uri = uri.substring(0, uri.indexOf("#"));
    window.history.replaceState({}, document.title, clean_uri);
  }
};

export const imgNotFound = function (image) {
  if (image) return image;
  else return 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
}