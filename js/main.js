// Toggle Class Spin On Icon Of Settings
// Toggle Class Open On Main Settings
let settings = document.querySelector(".settings");
let icon = document.querySelector(".settings .toggle-icon i");
icon.onclick = function () {
	// Toggle Icon
	this.classList.toggle("fa-spin");
	// Toggle Of Main Settings
	settings.classList.toggle("open");
};

// Switch Colors List Of Settings
let colorsList = document.querySelectorAll(".settings .options-box ul li");
// Loop On Colors List
colorsList.forEach((color) => {
	// Click On Element To Change Color Of Page
	color.addEventListener("click", (e) => {
		// Set Color To Root Of Page
		document.documentElement.style.setProperty(
			"--main-color",
			e.target.dataset.color
		);
		// Set Colors To Local Storage
		localStorage.setItem("color", e.target.dataset.color);
		// Handle Active State
		handleActive(colorsList, e);
	});
});
// Set Colors To Page From Local Storage
if (localStorage.getItem("color")) {
	document.documentElement.style.setProperty(
		"--main-color",
		localStorage.getItem("color")
	);
	// Loop On Colors List
	colorsList.forEach((element) => {
		// Remove Class Active From All Colors List Item
		element.classList.remove("active");
		// Add Class Active On element From Local Storage
		if (localStorage.getItem("color") === element.dataset.color) {
			element.classList.add("active");
		}
	});
}

// Switch Change Background Automatic Of Landing
let changeBackSpan = document.querySelectorAll(".buttons span");
// Variable For Background Interval
let backgroundInterval;
// Variable For Background Option
let backgroundOption = true;
// Loop On Spans
changeBackSpan.forEach((span) => {
	// Click On Span
	span.addEventListener("click", (e) => {
		// Handle Active State
		handleActive(changeBackSpan, e);
		//Check For Change Background Or Not
		if (e.target.classList.contains("yes")) {
			backgroundOption = true;
			changeBackAuto();
		} else {
			clearInterval(backgroundInterval);
		}
		// Set Value Of Background Option To Local Storage
		localStorage.setItem("backgroundOption", e.target.dataset.background);
	});
});
// Set Background Option From Local Srotage
if (localStorage.getItem("backgroundOption")) {
	localStorage.getItem("backgroundOption") === "yes"
		? (backgroundOption = true)
		: (backgroundOption = false);
	// Loop On Span
	changeBackSpan.forEach((span) => {
		// Remove Class Active From All Span
		span.classList.remove("active");
		// Add Class Active On Target
		if (localStorage.getItem("backgroundOption") === span.dataset.background) {
			span.classList.add("active");
		}
	});
}

// Switch Display Option Bullets Or Not
let bulletSpan = document.querySelectorAll(".buttons-bullets span");
// Select Div Container Of Bullets
let bullets = document.querySelector(".nav-bullets");
// Loop On All Span
bulletSpan.forEach(span => {
	span.addEventListener("click", (e) => {
		if (e.target.classList.contains("yes")) {
			// Remove Class Hide From Main Div Bullets
			bullets.classList.remove("hide");
		} else {
			bullets.classList.add("hide");
		}
		// Set Display Option Bullets To Local Storage 
		localStorage.setItem("option-bullets", e.target.dataset.display) 
		// Handle Class Active State 
		handleActive(bulletSpan, e);
	})
})
// Set Display Option Bullets From Local Srotage
let bulletLocalItem = localStorage.getItem("option-bullets")
if (bulletLocalItem) {
	if (bulletLocalItem === 'yes') {
		bullets.classList.remove("hide");
	} else {
		bullets.classList.add("hide");
	};
	// Loop On Span
	bulletSpan.forEach((span) => {
		// Remove Class Active From All Span
		span.classList.remove("active");
		// Add Class Active On Target
		if (bulletLocalItem === span.dataset.display) {
			span.classList.add("active");
		}
	});
}
// Reset Options Of Settings
document.querySelector(".reset-options").onclick = function() {
	localStorage.clear();
	// Reload Window
	window.location.reload();
}

// Select Landing Element
let landing = document.querySelector(".landing");
// Select Indicators Element
let indicators = document.querySelector(".indicators");

// Array Of Imgs
let imgsArray = [
	"landing-1.jpg",
	"landing-2.jpg",
	"landing-3.jpg",
	"landing-4.jpg",
	"landing-5.jpg",
	"landing-6.jpg",
];

// Change Background Automatic Of Landing
let count = 0;
function changeBackAuto() {
	if (backgroundOption === true) {
		backgroundInterval = setInterval(() => {
			// let randomNumber = Math.floor(Math.random() * imgsArray.length);
			// landing.style.backgroundImage = `url('imgs/${imgsArray[randomNumber]}')`;

			// Add Class Active On Indicator Span
			document.querySelectorAll(".indicators span").forEach((ele, index) => {
				// Remove Class Active From All Sapn
				ele.classList.remove("active");
				if (count === index) {
					// Add Class Active On Target
					ele.classList.add("active");
				}
			});
			// Change Background
			landing.style.backgroundImage = `url('imgs/${imgsArray[count]}')`;
			count++;

			if (count === imgsArray.length) {
				count = 0;
			}
		}, 5000);
	}
}
changeBackAuto();

// Create Span Indicators
for (let i = 0; i < imgsArray.length; i++) {
	// Create Span
	let span = document.createElement("span");
	// Append Span To Indicators Element
	indicators.appendChild(span);
	// Select Span Indicators
	let spantest = document.querySelectorAll(".indicators span");
	let spanArr = Array.from(spantest);
	// Add Class Active On First Span
	spanArr[0].className = "active";
	// Click On Span To Change Background And Add Class Active On Span
	spanArr.forEach((ele, index) => {
		ele.onclick = function (e) {
			// Change Background
			landing.style.backgroundImage = `url('imgs/${imgsArray[index]}')`;
			// Handle Active State
			handleActive(spanArr, e);
			// Reset Count Loop Of Change Background
			count = index;
		};
	});
}

// Start Our Skills
// Select Skills Section
let skills = document.querySelector(".skills");

window.onscroll = function () {
	// Skills Offset Top
	let skillsOffsetTop = skills.offsetTop;
	// Skills Outer Height
	let skillsOuterHeight = skills.offsetHeight;
	// Window Height
	let windowHeight = window.innerHeight;
	// Scroll Top Of Window
	let scrollTop = window.pageYOffset;
	// Check Scroll Reach To Skills Section
	if (scrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
		// Select All Progress
		let allSkills = document.querySelectorAll(
			".skill-box .skill-progress span"
		);
		// Loop On All Progress And Add property Width To It
		allSkills.forEach((span) => {
			span.style.width = span.dataset.progress;
		});
	}
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery .images-box img");
// Loop On Images
ourGallery.forEach((img) => {
	img.addEventListener("click", (e) => {
		// Create Overlay
		let overlay = document.createElement("div");
		// Add Class On Overlay
		overlay.className = "popup-overlay";
		// Add Overlay To Body
		document.body.appendChild(overlay);

		// Create Popup Box
		let popupBox = document.createElement("div");
		popupBox.className = "popup-box";
		// Create Popup Heading
		if (img.alt !== null) {
			// Create Popup Heading
			let popupHeading = document.createElement("h3");
			// Create Text Of Heading
			let popupHeadingText = document.createTextNode(img.alt);
			// Append Text To Popup Heading
			popupHeading.appendChild(popupHeadingText);
			// Append popup Heading To Popup Box
			popupBox.appendChild(popupHeading);
		}
		// Create Popup Image
		let imgPopup = document.createElement("img");
		// Add Source Image
		imgPopup.src = img.src;
		// Add Image To Popup Box
		popupBox.appendChild(imgPopup);
		// Add Popup Box To Body
		document.body.appendChild(popupBox);
		// Create Close Span
		let closeButton = document.createElement("span");
		closeButton.className = "close";
		// Cteate Text Of Close Butoon
		closeButton.innerHTML = "X";
		// Append Close Button To Popup Box
		popupBox.appendChild(closeButton);
	});
});

// Close Popup When Click On Close Button 
document.onclick = (e) => {
	if (e.target.classList.contains("close")) {
		// Remove Popup Box
		e.target.parentElement.remove();
		// Remove popup Overlay
		document.querySelector(".popup-overlay").remove();
	}
}

// Select All Nav Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links Of Header
let allLinks = document.querySelectorAll(".links a");
// Function For Scroll Smooth To Sections Of Page
function scrollToSection(arrOfElements) {
	arrOfElements.forEach((ele) => {
		ele.addEventListener("click", (e) => {
			e.preventDefault();
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: 'smooth',
			})
		})
	})
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// Function For Handle Active State
function handleActive(arrList, ev) {
	// Remove Class Active From All childern
	arrList.forEach((ele) => {
		ele.classList.remove("active");
	});
	// Add Class Active On Target
	ev.target.classList.add("active");
}

// Toggle Of Navbar Header
let toggleButton = document.querySelector(".header .toggle");
let links = document.querySelector(".links");
toggleButton.onclick = function (e) {
	// Stop Propagation
	e.stopPropagation();
	// Toggle Class Show On Links
	links.classList.toggle("show");
	// Toggle Class before-active On Button
	this.classList.toggle("before-active");
}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", function (e) {
	if (e.target !== toggleButton && e.target !== links) {
		// Check If Menu Open
		if (links.classList.contains("show")) {
			// Toggle Class Show On Links
			links.classList.toggle("show");
			// Toggle Class before-active On Button
			toggleButton.classList.toggle("before-active");
		}
	}
} ) 

// Stop Propagation On Menu
links.onclick = function(e) {
	e.stopPropagation();
} 