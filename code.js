function addToBar() {
    var newDistance = document.forms["distanceForm"]["distance"].value;
    var numbers = /^[0-9.]+$/;

    if (newDistance.match(numbers)) {
        // 42.195 km = 1 marathon
        var currentWidth = document.getElementById("progress").style.width;
        currentWidth = currentWidth.substring(0, currentWidth.length - 1);

        var distanceToAdd = (newDistance/42.195)*100;
        distanceToAdd = Math.round(distanceToAdd * 10) / 10;
        var newDistance = parseFloat(currentWidth) + parseFloat(distanceToAdd);

        document.getElementById("progress").style.width = newDistance.toString() + "%";

        localStorage.setItem("monthValue", newDistance);

    }
    else {
        alert("error")
    }
}
//https://www.w3schools.com/howto/howto_google_charts.asp
//https://stackoverflow.com/questions/63410507/how-to-connect-two-options-and-toggle-switch-buttons