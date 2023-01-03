const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const API_KEY = config.apiKey;
let count = 5;
const tags = 'street-photography';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&collections=${tags}&count=${count}`;

// Check if an image has loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 10;
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  };
};

// Create elements for links and photos and add to DOM
function displayPhotos(photos) {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach(photo => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listener, check when each image finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    let photos = [];
    photos = await response.json();
    displayPhotos(photos);
  } catch (error) {

  }
};

// Check to see if scrolling near bottom of page, load more images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  };
})

// On load
getPhotos();
