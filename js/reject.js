// Stores all the data for the letters
// Note: Dates are stored in the YYYY, MM, DD format, but javascript is weird so the MM is 0 to 11 where 0 is January
var rejection_letters = [
    {
    	title: "UChicago Deferral Letter - December 2019",
     	description: "This was my own deferral letter.",
     	url: "img/uchicagodef12-18-19.png", 
     	schoolName: "University of Chicago",
     	date: new Date(2019, 11, 18)
    }, 
    {
    	title: "UC Hicago Rejection Letter - March 2010",
    	description: 'Obtained from a <a href="https://realityfail.wordpress.com/">blog</a> filled with rejections.',
    	url: "https://realityfail.files.wordpress.com/2011/03/personalized-rejection-letter.jpg?w=407&h=330&zoom=2",
    	schoolName: "University of Chicago",
    	date: new Date(2010, 2)
    }, 
    {
    	title: "MIT Rejection - 2018",
    	description: 'Quora <a href="https://www.quora.com/What-does-your-college-acceptance-or-rejection-letter-looks-like">link</a>.',
    	url: "https://qph.fs.quoracdn.net/main-qimg-c1cec19b1f4def8a7eb7bfae000d2877",
    	schoolName: "Massachusetts Institute of Technology",
    	date: new Date(2018, 0)
    },
    {
    	title: "Cornell Rejection - 2018",
    	description: 'Quora <a href="https://www.quora.com/What-does-your-college-acceptance-or-rejection-letter-looks-like">link</a>.',
    	url: "https://qph.fs.quoracdn.net/main-qimg-80d4f0256c66251b12a7e8c31a7e8433",
    	schoolName: "Cornell University",
    	date: new Date(2018, 0)
    },
    {
    	title: "University of Michigan Rejection - 2018",
    	description: 'Quora <a href="https://www.quora.com/What-does-your-college-acceptance-or-rejection-letter-looks-like">link</a>.',
    	url: "https://qph.fs.quoracdn.net/main-qimg-21054efc7c7bdf2b2d8126ed1fd3f02c",
    	schoolName: "University of Michigan",
    	date: new Date(2018, 0)
    },
    {
    	title: "Harvard Rejection - 2014",
    	description: 'Quora <a href="https://www.quora.com/What-does-your-college-acceptance-or-rejection-letter-looks-like">link</a>.',
    	url: "https://qph.fs.quoracdn.net/main-qimg-0314976bbca2b021962600631bb1a8b3",
    	schoolName: "Harvard University",
    	date: new Date(2014, 0)
    }
];

// When DOM is loaded
document.addEventListener('DOMContentLoaded', function () {

    preloadScreen();

    sortByName();

	document.getElementById("DateItem").addEventListener('click', function ()
	{
		sortByDate();
        $('.pop').on('click', modalPopUp);

	});
	document.getElementById("CollegeNameItem").addEventListener('click', function ()
	{
		sortByName();
        $('.pop').on('click', modalPopUp);

	}); 
    
    document.getElementById("acceptButton").addEventListener('click', function ()
    {
        acceptedPolicy();
    }); 

    $('.pop').on('click', modalPopUp);

    console.log(sessionStorage.getItem('agreePolicy'));

    if (sessionStorage.getItem('agreePolicy') != "true") {
        $('.toast').toast('show');
    }
});

// Shows an enlarged version of image
// Based on https://stackoverflow.com/a/29605535/9512643
function modalPopUp() {   
    $('.imagepreview').attr('src', $(this).find('img').attr('src'));
    $('#imagemodal').modal('show');
}

function sortByDate() {
    // Clears cards element
    const myNode = document.getElementById("cards");
    myNode.textContent = '';

	console.log("Sorting by Date...");
	rejection_letters.sort(function(a, b) {
		if (a.date < b.date)
			return -1;
		else if (a.date > b.date)
			return 1;
		else
			return 0;
	});
	console.log(rejection_letters);	

    rejection_letters.forEach(createHTML);

}

function sortByName() {
    // Clears cards element
    const myNode = document.getElementById("cards");
    myNode.textContent = '';

    // Sorts list of letters based on college name
	console.log("Sorting by Name...");
	rejection_letters.sort(function(a, b) {
		return a.schoolName.localeCompare(b.schoolName);
	});
	console.log(rejection_letters);



    // Determines where ad will be places randomly
    var rando = getRandomInt(4, rejection_letters.length);
    
    for (i = 0; i < rejection_letters.length; i++) {
        if (i == rando)
            createAd();
        createHTML(rejection_letters[i]);
    }
}

// Adds cards to DOM
function createHTML(item) {

    // Template of what how a letter should be displayed in the DOM
    const template = `
        <div class="col-md-4">
            <div class="card mb-4 box-shadow" >
                <a href="#" class="pop">
                    <img class="card-img-top" src="${item.url}">
                </a>
                <div class="card-body">
                    <h4 class="card-title">${item.title}</h4>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
        </div>
    `;

    // Adds cards to DOM
    var cardDiv = document.getElementById('cards');

    cardDiv.insertAdjacentHTML('beforeend', template);
}

// Adds ads to DOM
function createAd() {
    var adTemplate = `<div class="col-md-4">
            <!-- -->
            <div class="card mb-4 box-shadow">
                
                <div class="card-body">
                    <input type="hidden" name="IL_IN_ARTICLE">
                    <h4 class="card-title">Ad</h4>
                    <p class="card-text">Here's an ad.</p>
                </div>
            </div>
        </div>`

    // Adds cards to DOM
    var cardDiv = document.getElementById('cards');

    cardDiv.insertAdjacentHTML('beforeend', adTemplate);

}

// Returns a random number between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Keeps track if user agrees to cookie policy
function acceptedPolicy() {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('agreePolicy', 'true');
        console.log("Session Storage is being used.");
    } 
    else {
        console.log("Your browser is too old or doesn't support session storage.")
    }
}

// Keeps track if user already visited the website
function loadedScreenAlready() {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem('loadedAlready', 'true');
        console.log("Session Storage is being used.");
    } 
    else {
        console.log("Your browser is too old or doesn't support session storage.")
    }
}

// Makes the typewriting animation
// Based on https://stackoverflow.com/a/22266737/9512643
function animateTyping() {

    var str =  "Remember, Rejection is only a mindset";
    var i = 0, text; 

    (function type() {
        if (i == str.length) 
        {

            // Removes Preload Screen
            const preload = document.querySelector(".preload");
            preload.classList.add("preload-finish");

            //loadedScreenAlready(); // Sets session storage "loadedAlready" to true
            return;
        }

        text = str.slice(0, ++i);
        
        document.getElementById('typewriter').innerHTML = text;

        setTimeout(type, 100);
    }());

    

}

// Removes preload screen when animation done
function preloadScreen () {
    // Only loads the preload screen if it's the first time visiting the website
    if (sessionStorage.getItem('loadedAlready') != "true") {
        const template = `
        <!-- Preload Screen -->
        <!-- Based on https://codepen.io/petervandenheuvel/pen/ywBxxY -->
        <div class="preload">
            <div class="container-fluid">
                <div class="d-flex flex-row justify-content-center text-center">
                    <h1> Prepare to be Rejected</h1>
                </div>
                <div class="d-flex flex-row justify-content-center text-center">
                    <h2>
                    <span id="typewriter"></span><span class="cursor">&nbsp</span>
                    </h2>
                </div>
            </div>
        </div>`

        document.body.insertAdjacentHTML('afterbegin', template);
        
        animateTyping();

        console.log("End");
    }
}