function addToBar() {
    var distanceToAdd = document.forms["distanceForm"]["distance"].value;
    var numbers = /^[0-9.]+$/;


    if (distanceToAdd.match(numbers)) {
        // 42.195 km = 1 marathon
        var currentDistance = localStorage.getItem("monthlyDistance");
        if (isNaN(currentDistance)) {
            currentDistance = 0
        }

        var newDistance = parseFloat(parseFloat(currentDistance) + parseFloat(distanceToAdd)).toFixed(2);
        
        localStorage.setItem("monthlyDistance", newDistance);
    }
    else {
        alert("error")
    }


    // update the months information
    //  - if new year, reset this data
    var d = new Date();
    var n = d.getMonth();
    var m = d.getDate() - 1; // -1 since we get a number from 1-31, not 0-30

    if (n == 0 && m == 1) {
        for (let i = 0; i < 12; i++) {
            localStorage.setItem(i, "0")
        }
    }


    var currentMonth = localStorage.getItem(n);
    if (currentMonth == null) {
        currentMonth = "0"
    }

    // update our current month
    localStorage.setItem(n, newDistance.toString());


    // update daily info
    //  - if new month, reset this data
    if (m == 1) {
        for (let i = 0; i < 31; i++) {
            localStorage.setItem(codes[i], "0");
        }
    }

    // array of data codes from 1-31
    var codes = ["a", "b", "c", "d", "e", 
                 "f", "g", "h", "i", "j", 
                 "k", "l", "m", "n", "o", 
                 "p", "q", "r", "s", "t", 
                 "u", "v", "w", "x", "y", 
                 "z", "!", "@", "#", "$",
                 "%"]

    
    var currentDateDistance = localStorage.getItem(codes[m]);
    if (currentDateDistance == null) {
        currentDateDistance = "0"
    }
    else {
        currentDateDistance = parseFloat(parseFloat(currentDateDistance) + parseFloat(distanceToAdd)).toFixed(2);
    }

    // update our current date
    localStorage.setItem(codes[m], currentDateDistance)



    // when you need to removeAll data
    //window.localStorage.clear();
    
    
    // refresh the page to show changes
    location.reload(); 
}
//https://www.w3schools.com/howto/howto_google_charts.asp
//https://stackoverflow.com/questions/63410507/how-to-connect-two-options-and-toggle-switch-buttons