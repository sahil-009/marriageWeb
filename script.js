// Add 'visible' class to sections on scroll
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
});

// Add 'visible' class to header on page load
window.addEventListener('load', () => {
    document.querySelector('.head').classList.add('visible');
});

// Toggle menu for mobile view
const menuBar = document.getElementById('menu-bar');
const navbar = document.querySelector('.navbar');

menuBar.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBar.classList.toggle('active');
});

// Detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

// Load the COCO-SSD model
let model;
async function loadModel() {
    model = await cocoSsd.load();
    console.log("COCO-SSD model loaded!");
}

// Elements for starting and stopping AR
const startARButton = document.getElementById('start-ar');
const stopARButton = document.getElementById('stop-ar');
const cameraStream = document.getElementById('camera-stream');
const cameraView = document.getElementById('camera-view');
const overlayCanvas = document.getElementById('overlay');
const overlayContext = overlayCanvas.getContext('2d');

// Objects storage
let placedObjects = [];  // Store placed objects and their positions

// Start AR
startARButton.addEventListener('click', async () => {
    try {
        // Check if device is mobile or not, and set camera facing accordingly
        const constraints = {
            video: {
                facingMode: isMobileDevice() ? { exact: "environment" } : "user", // Use back camera on mobile, front camera on desktop
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        // Access the camera
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraStream.srcObject = stream;
        cameraStream.play();
        cameraView.style.display = 'block';
        stopARButton.style.display = 'inline-block';
        startARButton.style.display = 'none';

        overlayCanvas.width = cameraStream.videoWidth;
        overlayCanvas.height = cameraStream.videoHeight;

        renderObjects();
    } catch (error) {
        console.error("Error starting AR:", error);
    }
});

// Stop AR
stopARButton.addEventListener('click', () => {
    if (cameraStream.srcObject) {
        const tracks = cameraStream.srcObject.getTracks();
        tracks.forEach(track => track.stop());
    }
    cameraView.style.display = 'none';
    startARButton.style.display = 'inline-block';
    stopARButton.style.display = 'none';

    // Clear objects and canvas
    placedObjects = [];
    overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
});

// Function to add object
function addObject(type) {
    const emptySpace = findEmptySpace(); // Use dummy AI to locate
    if (!emptySpace) {
        alert("No space available for placing the object.");
        return;
    }

    const img = new Image();
    img.src = `ASSET/${type}.png`;
    img.onload = () => {
        overlayContext.drawImage(img, emptySpace.x, emptySpace.y, 100, 100); // Adjust size as needed
        placedObjects.push({ type, x: emptySpace.x, y: emptySpace.y });
    };
}

// Function to remove the last object
function removeObject() {
    if (placedObjects.length === 0) {
        alert("No objects to remove.");
        return;
    }

    const lastObject = placedObjects.pop();
    overlayContext.clearRect(lastObject.x, lastObject.y, 100, 100); // Adjust size as needed
}

// Dummy AI: Locate empty space
function findEmptySpace() {
    const gridSize = 100; // Adjust grid size
    for (let y = 0; y < overlayCanvas.height; y += gridSize) {
        for (let x = 0; x < overlayCanvas.width; x += gridSize) {
            const occupied = placedObjects.some(obj =>
                x < obj.x + 100 && x + 100 > obj.x && y < obj.y + 100 && y + 100 > obj.y
            );
            if (!occupied) {
                return { x, y };
            }
        }
    }
    return null; // No space available
}

// Function to render objects
function renderObjects() {
    overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    placedObjects.forEach(obj => {
        const img = new Image();
        img.src = `ASSET/${obj.type}.png`;
        img.onload = () => {
            overlayContext.drawImage(img, obj.x, obj.y, 100, 100); // Adjust size as needed
        };
    });
    requestAnimationFrame(renderObjects);
}

// Helper function to return the correct image for each decoration type
function getDecorationImage(type) {
    switch (type) {
        case 0: // Balloon
            return 'ASSET/balloon.png'; // Ensure you have these images
        case 1: // Table
            return 'ASSET/table.png';   // Ensure you have these images
        case 2: // Curtain
            return 'ASSET/curtain.png'; // Ensure you have these images
        case 3: // Decoration
            return 'ASSET/decoration.png'; // Ensure you have these images
        case 4: // Chair
            return 'ASSET/chair.png';    // Ensure you have these images
        default:
            return '';
    }
}

// Load the model on page load
window.addEventListener('load', () => {
    loadModel();
});

// Add/remove objects via a sliding panel (buttons for object types)
const addObjectButtons = document.querySelectorAll('.add-object-btn');
addObjectButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const type = event.target.getAttribute('data-type');
        addObject(type);
    });
});
