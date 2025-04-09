// Hide the lightbox when the page loads

let currentIndex = 0;
let currentSection = 'Entrance';
const images = {
  'Entrance': [
    './images/Hotel Royal Park/Entrance/IMG-633339548.jpg',
    './images/Hotel Royal Park/Entrance/IMG-633339550.jpg',
    './images/Hotel Royal Park/Entrance/IMG-633699059.jpg',
  ],
  'Rooms': [
    'images/Hotel Royal Park/Deluxe Room/1.jpg',
    'images/Hotel Royal Park/Deluxe Room/3.jpg',
    'images/Hotel Royal Park/Deluxe Room/4.jpg',
    'images/Hotel Royal Park/Family Room/1.jpg',
    'images/Hotel Royal Park/Family Room/2.jpg',
    'images/Hotel Royal Park/Super Deluxe/2.jpg',
    'images/Hotel Royal Park/Super Deluxe/3.jpg',
    'images/Hotel Royal Park/Super Deluxe/4.jpg',
  ],
  'Outdoors': [
    './images/Hotel Royal Park/Outdoors/outdoor1-park.jpg',
    './images/Hotel Royal Park/Outdoors/outdoor2-park.jpg',
    // Add more images as needed
  ]
};

function openLightbox(section, index) {
  currentSection = section;
  currentIndex = index;
  document.getElementById('lightbox').style.display = 'flex';
  updateLightboxImage();
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = images[currentSection].length - 1;
  } else if (currentIndex >= images[currentSection].length) {
    currentIndex = 0;
  }
  updateLightboxImage();
}

function updateLightboxImage() {
  document.getElementById('lightboxImage').src = images[currentSection][currentIndex];
}


// Function to filter hotels based on search input
function filterHotels() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const hotelList = document.getElementById('hotelList');
  const hotels = hotelList.getElementsByClassName('hotel-item');

  let matchFound = false;

  for (let i = 0; i < hotels.length; i++) {
    const hotelName = hotels[i].getElementsByTagName('h2')[0].innerText.toLowerCase();
    const cityName = hotels[i].getElementsByTagName('p')[0].innerText.toLowerCase();
    if (hotelName.includes(filter) || cityName.includes(filter)) {
      hotels[i].style.display = '';
      matchFound = true;
    } else {
      hotels[i].style.display = 'none';
    }
  }

  // Show "View All" button only if there's a match and there are more than 6 hotels
  const viewAllBtn = document.getElementById('viewAllBtn');
  viewAllBtn.style.display = (matchFound && hotels.length > 6) ? 'block' : 'none';
}

// Function to toggle visibility of additional hotels
function toggleViewAll() {
  const hotelList = document.getElementById('hotelList');
  const hotels = hotelList.getElementsByClassName('hotel-item');
  const viewAllBtn = document.getElementById('viewAllBtn');
  const isViewingAll = viewAllBtn.innerText === 'View Less';

  for (let i = 6; i < hotels.length; i++) {
    hotels[i].style.display = isViewingAll ? 'none' : '';
  }

  // Update button text
  viewAllBtn.innerText = isViewingAll ? 'View All' : 'View Less';
}

// Initially hide hotels beyond the first 6 (two rows)
window.onload = function() {
  const hotelList = document.getElementById('hotelList');
  const hotels = hotelList.getElementsByClassName('hotel-item');

  for (let i = 6; i < hotels.length; i++) {
    hotels[i].style.display = 'none';
  }

  // Set the initial state of the "View All" button
  const viewAllBtn = document.getElementById('viewAllBtn');
  viewAllBtn.style.display = hotels.length > 6 ? 'block' : 'none';
  viewAllBtn.innerText = 'View All';
}

