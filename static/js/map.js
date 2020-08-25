const latlng = L.latLng(marker_lat, marker_lng);

// create the map object
let map = L.map('map', {
    maxZoom: 20,
    minZoom: 10,
    maxBounds: [
        //south west
        [53.1, -6.7],
        //north east
        [53.7, -5.8]
        ], 
}).setView([marker_lat, marker_lng], 15);

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
        } 
        else {
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
