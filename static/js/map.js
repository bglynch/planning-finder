const latlng = L.latLng(marker_lat, marker_lng);

// create the map object
let map = L.map('map').setView([marker_lat, marker_lng], 15);

// variables
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const TODAY = Math.floor(Date.now())
const EIGHT_WEEKS_AGO = TODAY - (8 * ONE_WEEK)
const applicationTypes = ['pending', 'granted', 'refused', 'invalid', 'withdrawn', 'information']
let minDate = Math.round((new Date()).getTime());
let maxDate = Math.round((new Date()).getTime());;

// filters
let filters = {
    applicationType: [],
    dateRange: []
}

// get the data
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    minZoom: 7,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    zoomSnap: 0.25,
}).addTo(map);

// add a scale to the map
let scale = L.control.scale().addTo(map);

// set makers for User
L.marker([marker_lat, marker_lng]).addTo(map)
    .bindPopup('I am in Dublin.<br> Looking for plannings.')
    .openPopup();


planningGeoJSON = L.geoJSON(planningData, {
    style: function (feature) {
        feature.properties['colour'] = 'white';
        let refuse_planning = /refuse/;
        let invalid_planning = /invalid/;
        let withdrawn_planning = /withdraw/;
        let granted_planning = /(grant|split)/;
        let information = /additional/;

        if (feature.properties['Decision'] == null) {
            feature.properties['PlanningStatus'] = 'pending';
            feature.properties['colour'] = 'orange';
        } else {
            if (refuse_planning.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'refused';
                feature.properties['colour'] = 'red';
            }
            if (invalid_planning.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'invalid';
                feature.properties['colour'] = 'brown';
            }
            if (withdrawn_planning.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'withdrawn';
                feature.properties['colour'] = 'blue'
            };
            if (granted_planning.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'granted';
                feature.properties['colour'] = 'green';
            }
            if (information.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'information';
                feature.properties['colour'] = 'purple';
            }
        }

        divhtml = createListItem(feature)
        $('#list-view').append(divhtml);

        return {
            fillOpacity: .8,
            fillColor: feature.properties['colour'],
            color: feature.properties['colour'],
            opacity: 1,
            radius: 10
        };
    },

    // create list items
    pointToLayer: function (geoJSONPoint, latlng) {
        geoJSONPoint.properties['ApplicationUrl'] = selectCouncil(geoJSONPoint)

        // bug in API that "ReceivedDate": null  e.g: SD20B/0127
        if (geoJSONPoint.properties['ReceivedDate'] == null) {
            geoJSONPoint.properties['ReceivedDate'] = geoJSONPoint.properties['ETL_DATE']
            //TO_DO add notification to user that date is not accurate
        }
        if (geoJSONPoint.properties['ReceivedDate'] < minDate) minDate = geoJSONPoint.properties['ReceivedDate']

        return L.circle(addSlightVarianceToLatLng(latlng))
    },

    onEachFeature: function (feature, layer) {
        // create pop up when click on marker
        layer.bindPopup("<b>Application Description</b><br>" + feature.properties["DevelopmentDescription"]);
        // auto scroll to planning application on the list view
        layer.on('click', function () {
            let id = $('#' + feature.properties['ApplicationNumber'].replace(/\//g, ""))
            $(id).scrollintoview({ duration: 100, complete: id.css("background-color", "lightgrey") });
        });
    }
}
).addTo(map);

councilGeoJSON = L.geoJSON(councilData, {
    interactive: false,
    style: function (feature) {

        let councils = /(DUBLIN CITY|FINGAL|SOUTH|DUN LAOGHAIRE)/;
        let fill = (councils.test(feature.properties.ENGLISH)) ? 0 : .5

        return {
            fillOpacity: fill,
            weight: 1,
            color: 'black'
        };
    }
}).addTo(map)

councilGeoJSON.bringToBack()


// change marker size on zoom
map.on('zoomend', function () {
    let radius = Math.abs(map.getZoom() - 21);
    if (map.getZoom() < 21) { planningGeoJSON.eachLayer(function (layer) { layer.setRadius(radius) }) }
});

map.fitBounds(planningGeoJSON.getBounds(), { padding: [20, 20] });

// filtering planning application
$(document).ready(function () {
    applicationTypes.forEach(function (appType) {
        $('#' + appType).click(function () {
            if (filters.applicationType.includes(appType)) {
                filters.applicationType = filters.applicationType.filter(e => e != appType)
            } else {
                filters.applicationType.push(appType)
            }
            planningGeoJSON.eachLayer(function (layer) { filterPlanningGeoJSON(layer) });

            $(this).toggleClass("active");
        });
    })
});

// date slider
let slider = document.getElementById('dateSlider');
let months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

filters.dateRange = [minDate, maxDate]
noUiSlider.create(slider, {
    start: [minDate, maxDate],
    step: ONE_WEEK,
    tooltips: true,
    connect: true,
    format: {
        to: function (value) {
            var date = new Date(value);
            var month = date.getMonth();
            let year = date.getFullYear();
            var formattedTime = months[date.getMonth()] + '/' + year;
            return formattedTime;
        },
        from: Number
    },
    range: {
        'min': minDate,
        'max': maxDate
    }
}).on('slide', function (e) {
    let minFilterDate = document.getElementsByClassName('noUi-handle-lower')[0].getAttribute('aria-valuenow')
    let maxFilterDate = document.getElementsByClassName('noUi-handle-upper')[0].getAttribute('aria-valuenow')
    filters.dateRange = [minFilterDate, maxFilterDate]

    planningGeoJSON.eachLayer(function (layer) {
        filterPlanningGeoJSON(layer)
    })
});


let typeContainer = document.getElementById('collapseExample');
let dateContainer = document.getElementById('dateSliderMain');
document.addEventListener('click', function (event) {
    if (typeContainer !== event.target && !typeContainer.contains(event.target)) {
        typeContainer.classList.remove('show')
    }
    if (dateContainer !== event.target && !dateContainer.contains(event.target)) {
        dateContainer.classList.remove('show')
    }
});



function filterPlanningGeoJSON(layer) {
    let appId = $('#' + layer.feature.properties['ApplicationNumber'].replace(/\//g, ""));
    let appDate = layer.feature.properties['ReceivedDate']
    let appStatus = layer.feature.properties['PlanningStatus']
    let numberOfTrue = 0;
    if (appDate > filters.dateRange[0] && appDate < filters.dateRange[1]) {
        numberOfTrue += 1;
    }
    if (filters.applicationType.includes(appStatus) || filters.applicationType.length == 0) {
        numberOfTrue += 1;
    }
    if (numberOfTrue == 2) {
        appId.show();
        layer.addTo(map)
    }
    else {
        appId.hide();
        map.removeLayer(layer)
    }
}

function selectCouncil(geoJSONPoint) {
    let applicationUrl = null
    if (geoJSONPoint.properties['LinkAppDetails'] != null) {
        applicationUrl = geoJSONPoint.properties['LinkAppDetails']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "Dublin City Council") {
        applicationUrl = "http://www.dublincity.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=" + geoJSONPoint.properties['ApplicationNumber']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "Fingal County Council") {
        applicationUrl = "http://planning.fingalcoco.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=" + geoJSONPoint.properties['ApplicationNumber']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "South Dublin County Council") {
        applicationUrl = "http://www.sdublincoco.ie/Planning/Details?regref=" + geoJSONPoint.properties['ApplicationNumber']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "Dun Laoghaire Rathdown County Council") {
        applicationUrl = "http://planning.dlrcoco.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=" + geoJSONPoint.properties['ApplicationNumber']
    } else {
        applicationUrl = null
    }

    return applicationUrl;
}

function createListItem1(geoJSONPoint) {
    divhtml = `
        <div id="${geoJSONPoint.properties['ApplicationNumber'].replace(/\//g, "")}" class="list-group-item" >
            <div class="col-12">
                <img src="https://www.gstatic.com/flights/airline_logos/70px/FR.png" alt="" class="float-left mr-2" height="50" width="50">
                <div class="h5" >${geoJSONPoint.properties['ApplicationNumber']}</div>
                <div class="font-weight-lighter h6 text-secondary" >${geoJSONPoint.properties['PlanningAuthority']}</div>
            </div>
            <div class="col-12">ReceivedDate: ${new Date(geoJSONPoint.properties['ReceivedDate']).toLocaleDateString("en-GB")} </div>
            <div class="col-12">Status: ${geoJSONPoint.properties['ApplicationStatus']} </div>
            <div class="col-12">Decision: ${geoJSONPoint.properties['Decision']} </div>
            <div class="col-12">
                <img src="https://www.gstatic.com/flights/airline_logos/70px/FR.png" alt="" class="float-left mr-2" height="20" width="20">
                <div class="font-weight-lighter h6 text-secondary" >${geoJSONPoint.properties['PlanningAuthority']}</div>
                <a target="_blank" class="float-right btn btn-primary" href="${geoJSONPoint.properties['ApplicationUrl']}">View Application</a>
            </div>
        </div>`
    return divhtml
}

function createListItem(geoJSONPoint) {
    divhtml = `
        <div id="${geoJSONPoint.properties['ApplicationNumber'].replace(/\//g, "").trim()}" class="list-group-item">
            <div class="col-12 main-font-big">
                ${geoJSONPoint.properties['ApplicationNumber']}
                <svg class="bi bi-geo-alt ml-1" width="20px" height="20px" viewBox="0 0 20 20" fill="#007bff" style="cursor: pointer;" onclick="flyToPlace(${geoJSONPoint.geometry.coordinates[1]}, ${geoJSONPoint.geometry.coordinates[0]})">
                    <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10zm0-7a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                </svg>
            </div>

            <div class="col-12 main-font-normal"><span class="main-font-small" style="padding-right: 7px;">Application Date:</span> ${new Date(geoJSONPoint.properties['ReceivedDate']).toLocaleDateString("en-GB")}</div>
            <div class="col-12 main-font-normal"><span class="main-font-small" style="padding-right: 63px;">Status:</span>${geoJSONPoint.properties['ApplicationStatus']}</div>
            <div class="float-right main-font-normal position-absolute" style="top: 20px;font-weight: 500;right: 26px;">${setDecision(geoJSONPoint.properties['Decision'])}
                <svg height="20" width="20">
                    <circle cx="10" cy="10" r="4" stroke="${geoJSONPoint.properties['colour']}" stroke-width="1" fill="${geoJSONPoint.properties['colour']}" fill-opacity="0.8" />
                </svg>
            </div>

            <div class="col-12 mt-3">
                <img src="${setCouncilLogo(geoJSONPoint.properties['PlanningAuthority'])}" alt="" class="float-left mr-2 mt-2" height="20" width="20">
                <div class="float-left main-font-small mt-2">${geoJSONPoint.properties['PlanningAuthority']}</div>
                <a target="_blank" class="btn btn-primary float-right main-font-normal mr-n3" href="${geoJSONPoint.properties['ApplicationUrl']}" style="color: #fbf8f3;font-size: 12px;font-weight: 500;letter-spacing: 1px;">View Application</a>
            </div>
        </div>
        `
    return divhtml
}

function setCouncilLogo(council) {
    let mapping = {
        "dublin city council": "https://www.dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico",
        "dun laoghaire rathdown county council": "https://www.dlrcoco.ie/sites/all/themes/dlr/images/dlr-logo.png",
        "fingal county council": "https://www.fingal.ie/themes/custom/weatherlab/components/images/favicons/apple-icon-57x57.png",
        "south dublin county council": "https://www.sdcc.ie/favicon/favicon.ico"
    };
    return mapping[council.toLowerCase()];
}

function setDecision(decision) {
    if (decision == null) { return "Pending" }
    decision = decision
        .trim()
        .toLowerCase()
        .split(' ')
        .map(function (word) { return word.replace(word[0], word[0].toUpperCase()); })
        .join(' ');

    return decision
}

function addSlightVarianceToLatLng(latlng) {
    // this is added to prevent map dots being placed on top of eachother
    const lngVariance = 0.00009;
    const latVariance = 0.00006;

    latlng.lat = latlng.lat - latVariance / 2 + Math.random() * latVariance;
    latlng.lng = latlng.lng - lngVariance / 2 + Math.random() * lngVariance;

    return latlng
}

function flyToPlace(lat, lon) {
    map.flyTo([lat, lon], 20, { duration: 1 })
}