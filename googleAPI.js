var loc = '35.731252, 139.730291'; //Tokyo
getGoogleAPI(loc);
function getGoogleAPI(loc) {
    var targetDate = new Date() // Current date/time of user computer
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
    console.log(timestamp);
    var apikey = 'AIzaSyBSu1-MrU8NnBMPWaNk7QocNqBLdsgPtiU'
    var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey

    var xhr = new XMLHttpRequest() // create new XMLHttpRequest2 object
    xhr.open('GET', apicall) // open GET request
    xhr.onload = function () {
        if (xhr.status === 200) { // if Ajax request successful
            var output = JSON.parse(xhr.responseText) // convert returned JSON string to JSON object
            console.log(output); // log API return status for debugging purposes
            if (output.status == 'OK') { // if API reports everything was returned successfully
                var offsets = output.dstOffset * 1000 + output.rawOffset * 1000 // get DST and time zone offsets in milliseconds
                console.log(offsets);
                var localdate = new Date(timestamp * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
                console.log(localdate);
                console.log(localdate.toLocaleString()) // Display current Tokyo date and time
            }
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status)
        }
    }
    xhr.send() // send request
}