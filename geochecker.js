// ==UserScript==
// @name         geockecker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://geocheck.org/geo_inputchkcoord.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    /*
    * Make sure to:
    *   - fill in the parameters below
    *   - flush the server side cache before each brute force attack :)
    */
    var incrementItemLat = "dec" // one of 'deg', 'min' or 'dec'
    var incrementItemLon = "dec" // one of 'deg', 'min' or 'dec'
    var incrementLat = 1;
    var incrementLon = 1;
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

        // Update coords on server before submitting the form
        fetch('https://geochecker.herokuapp.com/coords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(currentCoords),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            document.getElementsByName("geoform")[0].submit();
        })
            .catch((error) => {
            console.error('Error:', error);
        });
    };
    function getCoords() {
        fetch('https://geochecker.herokuapp.com/coords')
            .then((response) => {
            return response.json();
        })
            .then((respData) => {
            // create coords on server if not existing
            if( Object.entries(respData).length === 0) {
                fetch('https://geochecker.herokuapp.com/coords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: JSON.stringify(initialCoords),
                })
                    .then((response) => response.json())
                    .then((data) => {
                    console.log('Success:', data);
                    currentCoords = data;
                    doCheck();
                })
                    .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                currentCoords = respData;
                switch(incrementItemLon) {
                    case "deg":
                        if (currentCoords.longitude.londeg != maxValueLon) {
                            currentCoords.longitude.londeg = currentCoords.longitude.londeg + incrementLon;
                            doCheck();
                        } else {
                            switch(incrementItemLat) {
                                case "deg":
                                    if (currentCoords.latitude.latdeg != maxValueLat) {
                                        currentCoords.latitude.latdeg = currentCoords.latitude.latdeg + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                                case "min":
                                    if (currentCoords.latitude.latmin != maxValueLat) {
                                        currentCoords.latitude.latmin = currentCoords.latitude.latmin + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                                case "dec":
                                    if (currentCoords.latitude.latdec != maxValueLat) {
                                        currentCoords.latitude.latdec = currentCoords.latitude.latdec + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                            }
                        }
                        break;
                    case "min":
                        if (currentCoords.longitude.lonmin != maxValueLon) {
                            currentCoords.longitude.lonmin = currentCoords.longitude.lonmin + incrementLon;
                            doCheck();
                        } else {
                            switch(incrementItemLat) {
                                case "deg":
                                    if (currentCoords.latitude.latdeg != maxValueLat) {
                                        currentCoords.latitude.latdeg = currentCoords.latitude.latdeg + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                                case "min":
                                    if (currentCoords.latitude.latmin != maxValueLat) {
                                        currentCoords.latitude.latmin = currentCoords.latitude.latmin + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                                case "dec":
                                    if (currentCoords.latitude.latdec != maxValueLat) {
                                        currentCoords.latitude.latdec = currentCoords.latitude.latdec + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                            }
                        }
                        break;
                    case "dec":
                        if (currentCoords.longitude.londec != maxValueLon) {
                            currentCoords.longitude.londec = currentCoords.longitude.londec + incrementLon;
                            doCheck();
                        } else {
                            switch(incrementItemLat) {
                                case "deg":
                                    if (currentCoords.latitude.latdeg != maxValueLat) {
                                        currentCoords.latitude.latdeg = currentCoords.latitude.latdeg + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                                case "min":
                                    if (currentCoords.latitude.latmin != maxValueLat) {
                                        currentCoords.latitude.latmin = currentCoords.latitude.latmin + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                                case "dec":
                                    if (currentCoords.latitude.latdec != maxValueLat) {
                                        currentCoords.latitude.latdec = currentCoords.latitude.latdec + incrementLat;
                                        currentCoords.longitude = initialCoords.longitude;
                                        doCheck();
                                    }
                                    break;
                            }
                        }
                        break;
                }
            }
        });
    }
    getCoords();
})();
