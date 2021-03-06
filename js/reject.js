// When DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    
    loadPreloadScreen();
    loadCalendar();

    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)agreePolicy\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(cookieValue);

    if (cookieValue != "true") {
        $('.toast').toast('show');
    }
    else {
        $('.toast').hide();

    }
    document.getElementById("acceptButton").addEventListener('click', function ()
    {
        acceptedPolicy();
    }); 


});


function loadCalendar() {
    // Render Calendar
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid', 'timeGrid', 'list', 'bootstrap', 'googleCalendar'],
        // timeZone: 'UTC',
        themeSystem: 'bootstrap',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek, timeGridDay, listMonth'
        },
        weekNumbers: false,
        eventLimit: true, // allow "more" link when too many events
        googleCalendarApiKey: 'AIzaSyASTJKj1bu8Msd-za4_AcQJbp7vehxxH0U',
        eventSources: [
            { 
                googleCalendarId: 'b04idpn1us2ftqgbucqkm7ncoc@group.calendar.google.com',
                className: 'a2c-calendar'
            },
            {
                googleCalendarId: 'f4eljsahtds01ruu8gir5a826c@group.calendar.google.com',
                className: 'past-dates'
            }
        ]
    });

    calendar.render();
}

// Keeps track if user agrees to cookie policy
function acceptedPolicy() {
    $(".toast").toast('hide');

    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)agreePolicy\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(cookieValue);
    if (cookieValue != "true") {
        document.cookie = "agreePolicy=true"
    }
}

// Keeps track if user already visited the website
function loadedScreenAlready() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)loadedAlready\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(cookieValue);
    if (cookieValue != "true") {
        document.cookie = "loadedAlready=true"
    }
}

// Makes the typewriting animation
// Based on https://stackoverflow.com/a/22266737/9512643
function animateTyping() {

    var str =  "Remember, Rejection is just a mindset";
    var i = 0, text; 

    (function type() {
        if (i == str.length) 
        {
            removePreloadScreen();
            return;
        }

        text = str.slice(0, ++i);
        
        document.getElementById('typewriter').innerHTML = text;

        setTimeout(type, 100);
    }());

    

}

// Takes care of loading Preload Screen
function loadPreloadScreen () {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)loadedAlready\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(cookieValue);

    // Only loads the preload screen if it's the first time visiting the website
    if (cookieValue != "true") {
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
        </div>`;

        document.body.insertAdjacentHTML('afterbegin', template);
        
        animateTyping();
    }
}

function removePreloadScreen() {
    // Removes Preload Screen
    const preload = document.querySelector(".preload");
    preload.classList.add("preload-finish");

    loadedScreenAlready(); // Sets session storage "loadedAlready" to true
}