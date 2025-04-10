document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    const roomTitle = document.getElementById('room-title');
    const roomPrice = document.getElementById('room-price');
    const roomDescription = document.getElementById('room-description');
    const imageGallery = document.getElementById('image-gallery');
    const thumbnails = document.getElementById('thumbnails');

    // For navigating smooth to the particular section.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });



    // Navigation slider
    function toggleMenu() {
        const menu = document.getElementById('nav-menu');
        const cancelButton = document.getElementById('cancel-button');
        menu.classList.toggle('translate-x-full');
        cancelButton.classList.toggle('hidden');
        document.body.classList.toggle('no-scroll'); // Toggle no-scroll class on body
    }
    
    document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
    document.getElementById('cancel-button').addEventListener('click', toggleMenu);
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('nav-menu');
            const cancelButton = document.getElementById('cancel-button');
            menu.classList.add('translate-x-full');
            cancelButton.classList.add('hidden');
            document.body.classList.remove('no-scroll'); // Remove no-scroll class when link is clicked
        });
    });
    

    const roomData = {
        deluxe: {
            title: 'Deluxe Room',
            price: '₹1299/-',
            description: 'The way we travel and move has changed in the last few years. We no longer want the typical photo that all our contacts post on Instagram...',
            facilities: [
                { icon: './Hotel Icon and Image/Icon/Wifi.svg', name: 'Wi-Fi' },
                { icon: './Hotel Icon and Image/Icon/TV.svg', name: 'TV' },
                { icon: './Hotel Icon and Image/Icon/call.svg', name: 'Room Service' },
                { icon: './Hotel Icon and Image/Icon/Office area.svg', name: 'Work Area' },
            ],
            roomImage: [
                'images/Hotel Royal Park/Deluxe Room/1.jpg',
                'images/Hotel Royal Park/Deluxe Room/2.jpg',
                'images/Hotel Royal Park/Deluxe Room/3.jpg',
                'images/Hotel Royal Park/Deluxe Room/4.jpg'
            ]
        },
        suite: {
            title: 'Super Deluxe Room',
            price: '₹1999/-',
            description: 'The way we travel and move has changed in the last few years. We no longer want the typical photo that all our contacts post on Instagram...',
            facilities: [
                { icon: './Hotel Icon and Image/Icon/Wifi.svg', name: 'Wi-Fi' },
                { icon: './Hotel Icon and Image/Icon/TV.svg', name: 'TV' },
                { icon: './Hotel Icon and Image/Icon/call.svg', name: 'Room Service' },
                { icon: './Hotel Icon and Image/Icon/Office area.svg', name: 'Work Area' },
            ],
            roomImage: [
                'images/Hotel Royal Park/Super Deluxe/1.jpg',
                'images/Hotel Royal Park/Super Deluxe/3.jpg',
                'images/Hotel Royal Park/Super Deluxe/4.jpg',
                'images/Hotel Royal Park/Super Deluxe/2.jpg',
            ]
        },
        family: {
            title: 'Family Room',
            price: '₹2900/-',
            description: 'The way we travel and move has changed in the last few years. We no longer want the typical photo that all our contacts post on Instagram...',
            facilities: [
                { icon: './Hotel Icon and Image/Icon/Wifi.svg', name: 'Wi-Fi' },
                { icon: './Hotel Icon and Image/Icon/TV.svg', name: 'TV' },
                { icon: './Hotel Icon and Image/Icon/call.svg', name: 'Room Service' },
                { icon: './Hotel Icon and Image/Icon/Office area.svg', name: 'Work Area' },
            ],
            roomImage: [
                'images/Hotel Royal Park/Family Room/1.jpg',
                'images/Hotel Royal Park/Family Room/2.jpg',
                'images/Hotel Royal Park/Family Room/3.jpg',
                'images/Hotel Royal Park/Family Room/4.jpg',
            ]
        },
        // studio: {
        //     title: 'Suite Room',
        //     price: '₹3500/-',
        //     description: 'The way we travel and move has changed in the last few years. We no longer want the typical photo that all our contacts post on Instagram...',
        //     facilities: [
        //         { icon: './Hotel Icon and Image/Icon/Wifi.svg', name: 'Wi-Fi' },
        //         { icon: './Hotel Icon and Image/Icon/TV.svg', name: 'TV' },
        //         { icon: './Hotel Icon and Image/Icon/call.svg', name: 'Room Service' },
        //         { icon: './Hotel Icon and Image/Icon/Office area.svg', name: 'Work Area' },
        //     ],
        //     roomImage: [
        //         'images/Hotel Royal Park/Suite Room/1.jpg',
        //         'images/Hotel Royal Park/Suite Room/2.jpg',
        //         'images/Hotel Royal Park/Suite Room/3.jpg',
        //         'images/Hotel Royal Park/Suite Room/4.jpg',
        //     ]
        // }
    };

    let currentImageIndex = 0;
    let slideInterval;

    function updateRoom(roomType) {
        const data = roomData[roomType];
        roomTitle.textContent = data.title;
        roomPrice.textContent = data.price;
        roomDescription.textContent = data.description;

        imageGallery.innerHTML = '';
        thumbnails.innerHTML = '';

        const mainImage = document.createElement('img');
        mainImage.src = data.roomImage[currentImageIndex];
        mainImage.alt = data.title;
        mainImage.classList.add('w-full', 'h-full', 'object-cover', 'transition-opacity', 'duration-1000');
        mainImage.style.opacity = 0;
        imageGallery.appendChild(mainImage);

        setTimeout(() => {
            mainImage.style.opacity = 1;
        }, 100);

        data.roomImage.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imgSrc;
            thumbnail.alt = `${data.title} thumbnail ${index + 1}`;
            thumbnail.classList.add('w-[100px]', 'h-[50px]', 'cursor-pointer', 'rounded-[10px]', 'transition-opacity', 'duration-300');
            thumbnail.style.opacity = index === currentImageIndex ? 0.5 : 1;
            thumbnail.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentImageIndex = index;
                mainImage.src = imgSrc;
                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.style.opacity = 1;
                }, 100);
                updateThumbnails(index);
                startAutoSlide(data);
            });
            thumbnails.appendChild(thumbnail);
        });
        clearInterval(slideInterval);
        startAutoSlide(data);
    }

    function startAutoSlide(data) {
        slideInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % data.roomImage.length;
            const mainImage = imageGallery.querySelector('img');
            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.src = data.roomImage[currentImageIndex];
                mainImage.style.opacity = 1;

                updateThumbnails(currentImageIndex);

            }, 100);
        }, 3000);
    }

    function updateThumbnails(activeIndex) {
        const thumbnailsList = document.querySelectorAll('#thumbnails img');
        thumbnailsList.forEach((thumb, idx) => {
            thumb.style.opacity = idx === activeIndex ? 0.5 : 1;
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const roomType = button.id;
            currentImageIndex = 0;
            updateRoom(roomType);
        });
    });

    const defaultRoomType = 'deluxe';
    document.getElementById(defaultRoomType).click();

});
