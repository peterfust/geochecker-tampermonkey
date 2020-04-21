// ==UserScript==
// @name         geockeckerBruteforce
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://geocheck.org/geo_inputchkcoord.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /*
    * Make sure to adjust the parameters below and to clear the localStorage 'currentCoords' entry before each run!
    */

    // Select which item of the latitude and longitude should be incremented
    var incrementItemLat = "dec" // one of 'deg', 'min' or 'dec'
    var incrementItemLon = "dec" // one of 'deg', 'min' or 'dec'

    // Value which is incremented
    var incrementLat = 1;
    var incrementLon = 1;

    // Upper limit of incrementation (i.e. where script will stop to increment)
    const maxValueLat = 69;
    const maxValueLon = 679;


    var currentCoords = {};
    const initialCoords = {
        "latitude": {
            "northSouth": "N",
            "latdeg": 47,
            "latmin": 27,
            "latdec": 60
        },
        "longitude": {
            "eastWest": "E",
            "londeg": 8,
            "lonmin": 33,
            "londec": 670
        }
    };

    String.prototype.padFunction = function(padStr, len) {
        var str = this;
        while (str.length < len)
            str = padStr + str;
        return str;
    };

    function doCheck() {

        // Fill in form with current coords
        if (currentCoords.latitude.northSouth == "N") {
            document.getElementsByName("lat")[0].checked = true;
        } else {
            document.getElementsByName("lat")[1].checked = true;
        }
        if (currentCoords.longitude.eastWest == "W") {
            document.getElementsByName("lon")[0].checked = true;
        } else {
            document.getElementsByName("lon")[1].checked = true;
        }
        document.getElementsByName("latdeg")[0].value = currentCoords.latitude.latdeg;
        document.getElementsByName("latmin")[0].value = currentCoords.latitude.latmin.toString().padFunction("0",3);
        document.getElementsByName("latdec")[0].value = currentCoords.latitude.latdec.toString().padFunction("0",3);
        document.getElementsByName("londeg")[0].value = currentCoords.longitude.londeg;
        document.getElementsByName("lonmin")[0].value = currentCoords.longitude.lonmin.toString().padFunction("0",3);
        document.getElementsByName("londec")[0].value = currentCoords.longitude.londec.toString().padFunction("0",3);

        // Calculate new coords for next usage
        switch(incrementItemLon) {
            case "deg":
                if (currentCoords.longitude.londeg != maxValueLon) {
                    currentCoords.longitude.londeg = currentCoords.longitude.londeg + incrementLon;
                 } else {
                    switch(incrementItemLat) {
                        case "deg":
                            if (currentCoords.latitude.latdeg != maxValueLat) {
                                currentCoords.latitude.latdeg = currentCoords.latitude.latdeg + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                        case "min":
                            if (currentCoords.latitude.latmin != maxValueLat) {
                                currentCoords.latitude.latmin = currentCoords.latitude.latmin + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                        case "dec":
                            if (currentCoords.latitude.latdec != maxValueLat) {
                                currentCoords.latitude.latdec = currentCoords.latitude.latdec + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                    }
                }
                break;
            case "min":
                if (currentCoords.longitude.lonmin != maxValueLon) {
                    currentCoords.longitude.lonmin = currentCoords.longitude.lonmin + incrementLon;
                } else {
                    switch(incrementItemLat) {
                        case "deg":
                            if (currentCoords.latitude.latdeg != maxValueLat) {
                                currentCoords.latitude.latdeg = currentCoords.latitude.latdeg + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                        case "min":
                            if (currentCoords.latitude.latmin != maxValueLat) {
                                currentCoords.latitude.latmin = currentCoords.latitude.latmin + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                        case "dec":
                            if (currentCoords.latitude.latdec != maxValueLat) {
                                currentCoords.latitude.latdec = currentCoords.latitude.latdec + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                    }
                }
                break;
            case "dec":
                if (currentCoords.longitude.londec != maxValueLon) {
                    currentCoords.longitude.londec = currentCoords.longitude.londec + incrementLon;
                } else {
                    switch(incrementItemLat) {
                        case "deg":
                            if (currentCoords.latitude.latdeg != maxValueLat) {
                                currentCoords.latitude.latdeg = currentCoords.latitude.latdeg + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                        case "min":
                            if (currentCoords.latitude.latmin != maxValueLat) {
                                currentCoords.latitude.latmin = currentCoords.latitude.latmin + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                        case "dec":
                            if (currentCoords.latitude.latdec != maxValueLat) {
                                currentCoords.latitude.latdec = currentCoords.latitude.latdec + incrementLat;
                                currentCoords.longitude = initialCoords.longitude;
                            }
                            break;
                    }
                }
                break;
        }

        // Store new coords
        localStorage.setItem('currentCoords', JSON.stringify(currentCoords));

        // Submit form
        document.getElementsByName("geoform")[0].submit();
    }

    function getCoords() {
        currentCoords = JSON.parse(localStorage.getItem('currentCoords'));
        if (!currentCoords) {
            currentCoords = initialCoords;
        }
    }
    getCoords();
    doCheck();
})();
