function addToBar() {
    var distanceToAdd = document.forms["distanceForm"]["distance"].value;

    updateMonthly(distanceToAdd, "add");


    // when you need to removeAll data
    //window.localStorage.clear();
    
    // refresh the page to show changes
    location.reload(); 
}




function removeFromBar() {
    var distanceToRemove = document.forms["removeDistanceForm"]["removeDistance"].value;

    updateMonthly(distanceToRemove, "remove");


    // when you need to removeAll data
    //window.localStorage.clear();
    
    // refresh the page to show changes
    location.reload(); 
}









function updateMonthly(distanceToChange, from) {
    var numbers = /^[0-9.]+$/;
    var d = new Date();
    var n = d.getMonth();
    var m = d.getDate() - 1; // -1 since we get a number from 1-31, not 0-30
    var allowUpdate = true

    // this code is for updating our current month (for index.html)
    if (distanceToChange.match(numbers)) {
        // reset "current month's" data if new month
        if (m == 1) {
            localStorage.setItem("monthlyDistance", 0);
        }

        var currentDistance = localStorage.getItem("monthlyDistance");
        if (isNaN(currentDistance)) {
            currentDistance = 0
        }

        if (from == "add") {
            var newDistance = parseFloat(parseFloat(currentDistance) + parseFloat(distanceToChange)).toFixed(2);}
        if (from == "remove") {
            var newDistance = parseFloat(parseFloat(currentDistance) - parseFloat(distanceToChange)).toFixed(2);}
        
        if (newDistance < 0) {
            alert("cannot be below 0")
            allowUpdate = false
        }
        else {
            localStorage.setItem("monthlyDistance", newDistance);
        }
    }
    else {
        alert("error")
    }

    
    // this code is for updating all the other months' info (for monthly.html)
    //  - if new year, reset this data
    if (allowUpdate) {
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
    }




    // update daily:
    var allowUpdateDaily = true
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
    if (currentDateDistance == null || currentDateDistance == "NaN") {
        currentDateDistance = "0"
    }
    alert(currentDateDistance)
    alert(distanceToChange)
    if (from == "add") {
        var newDistance = parseFloat(parseFloat(currentDateDistance) + parseFloat(distanceToChange)).toFixed(2);
    }
    if (from == "remove") {
        var newDistance = parseFloat(parseFloat(currentDateDistance) - parseFloat(distanceToChange)).toFixed(2);
    }
    if (newDistance < 0) {
        alert("cannot be below 0")
        allowUpdateDaily = false
    }
    
    

    if (allowUpdateDaily) {
        // update our current date
        localStorage.setItem(codes[m], newDistance.toString())
    }

    return;
}