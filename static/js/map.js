/*jshint esversion: 6*/
/* global 
    $,jQuery, L,noUiSlider,
	marker_lat,marker_lng,planningData,councilData, userLoggedIn, bookmarks,
	selectCouncil, filterPlanningGeoJSON,createBookmarkedListItem,createListItem,
    addSlightVarianceToLatLng 
*/
// create the map object
let map = L.map(mapConfig.setup.htmlId, {
    maxZoom: mapConfig.setup.maxZoom,
    minZoom: mapConfig.setup.minZoom,
    maxBounds: [mapConfig.setup.southWestBound, mapConfig.setup.northEastBound]
}).setView([marker_lat, marker_lng], 15);

// variables
let minDate = Math.round((new Date()).getTime());
let maxDate = Math.round((new Date()).getTime());

// filters
let filters = {
    applicationType: [],
    dateRange: []
};

// set map tiles
L.tileLayer(mapConfig.mapTiles.url, {
    attribution: mapConfig.mapTiles.attribution,
    id: mapConfig.mapTiles.id,
    tileSize: mapConfig.mapTiles.tileSize,
    zoomOffset: mapConfig.mapTiles.zoomOffset,
    zoomSnap: mapConfig.mapTiles.zoomSnap,
}).addTo(map);
// add a scale to the map
L.control.scale().addTo(map);

// set home marker for User
L.marker([marker_lat, marker_lng]).addTo(map)
    .bindPopup('I am in Dublin.<br> Looking for plannings.')
    .openPopup();


let planningGeoJSON = L.geoJSON(planningData, {
    style: function (feature) {
        feature.properties['colour'] = 'white';

        // Set planning status and color for planning application
        if (feature.properties['Decision'] == null) {
            feature.properties['PlanningStatus'] = planningDecision.pending.name;
            feature.properties['colour'] = planningDecision.pending.color;
        }
        else {
            Object.keys(planningDecision).filter(key => key !== planningDecision.pending.name).forEach(key => {
                if (planningDecision[key].regex.test(feature.properties['Decision'].toLowerCase())) {
                    feature.properties['PlanningStatus'] = planningDecision[key].name;
                    feature.properties['colour'] = planningDecision[key].color;
                }
            })
        }

        // Create list html for planning application
        let divhtml = createListItem(feature, userLoggedIn);;

        // if planning application in allowed council boundaries, add html to list view
        if (Object.keys(countyCouncils).includes(feature.properties.PlanningAuthority)) {
            $('#list-view').append(divhtml);
        }

        // set properties for map marker
        return {
            fillOpacity: 0.8,
            fillColor: feature.properties.colour,
            color: feature.properties.colour,
            opacity: 1,
            radius: 10
        };
    },

    // create list items
    pointToLayer: function (geoJSONPoint, latlng) {
        geoJSONPoint.properties['ApplicationUrl'] = selectCouncil(geoJSONPoint);

        // bug in API that "ReceivedDate": null  e.g: SD20B/0127
        if (geoJSONPoint.properties['ReceivedDate'] == null) {
            geoJSONPoint.properties['ReceivedDate'] = geoJSONPoint.properties['ETL_DATE'];
            //TO_DO add notification to user that date is not accurate
        }
        if (geoJSONPoint.properties['ReceivedDate'] < minDate) minDate = geoJSONPoint.properties['ReceivedDate'];

        if (Object.keys(countyCouncils).includes(geoJSONPoint.properties.PlanningAuthority)) {
            return L.circle(addSlightVarianceToLatLng(latlng));
        }
    },

    onEachFeature: function (feature, layer) {
        // create pop up when click on marker
        layer.bindPopup("<b>Application Description</b><br>" + feature.properties["DevelopmentDescription"]);
        // auto scroll to planning application on the list view
        layer.on('click', function () {
            let id = $('#' + feature.properties['ApplicationNumber'].replace(/\//g, ""));
            $(id).scrollintoview({ duration: 100, complete: id.css("background-color", "lightgrey") });
        });
    }
}
).addTo(map);

fetch(councilData, { mode: 'cors' })
    .then(function (response) {
        return response.ok ? response.json() : Promise.reject(response.status);
    })
    .then(function (response) {
        L.geoJSON(response, {
            interactive: false,
            style: function (feature) {
                return {
                    fillOpacity: (Object.keys(countyCouncils).includes(feature.properties.ENGLISH)) ? 0 : 0.7,
                    weight: 1,
                    color: 'black'
                };
            }
        }).addTo(map);
    })
    .catch(function (error) { console.log('Request failed', error); });


// change marker size on zoom
map.on('zoomend', function () {
    let radius = Math.abs(map.getZoom() - 21);
    if (map.getZoom() < 21) { planningGeoJSON.eachLayer(function (layer) { layer.setRadius(radius); }); }
});

map.fitBounds(planningGeoJSON.getBounds(), { padding: [20, 20] });

// filtering: planning application decision
$(document).ready(function () {
    Object.keys(planningDecision).forEach(function (appType) {
        $('#' + appType).click(function () {
            if (filters.applicationType.includes(appType)) {
                filters.applicationType = filters.applicationType.filter(e => e != appType);
            } else {
                filters.applicationType.push(appType);
            }
            planningGeoJSON.eachLayer(function (layer) { filterPlanningGeoJSON(layer); });

            $(this).toggleClass("active");
        });
    });
});

// filtering: date slider
let slider = document.getElementById('dateSlider');

filters.dateRange = [minDate, maxDate];
noUiSlider.create(slider, {
    start: [minDate, maxDate],
    step: ONE_WEEK,
    tooltips: true,
    connect: true,
    format: {
        to: function (value) {
            var date = new Date(value);
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
    let minFilterDate = document.getElementsByClassName('noUi-handle-lower')[0].getAttribute('aria-valuenow');
    let maxFilterDate = document.getElementsByClassName('noUi-handle-upper')[0].getAttribute('aria-valuenow');
    filters.dateRange = [minFilterDate, maxFilterDate];

    planningGeoJSON.eachLayer(function (layer) {
        filterPlanningGeoJSON(layer);
    });
});

// hide filter box if users clicks outside the element
let typeContainer = document.getElementById('collapseExample');
let dateContainer = document.getElementById('dateSliderMain');
document.addEventListener('click', function (event) {
    if (typeContainer !== event.target && !typeContainer.contains(event.target)) {
        typeContainer.classList.remove('show');
    }
    if (dateContainer !== event.target && !dateContainer.contains(event.target)) {
        dateContainer.classList.remove('show');
    }
});

// Bookmarks
let csrftoken = getCookie('csrftoken');

document.addEventListener('click', function (event) {
    // add or remove active class
    let element = event.target;
    let child = event.target.firstElementChild;
    let parent = event.target.parentElement;

    if (element.classList.contains('click-active')) {
        let applicationId = element.dataset.appNumber;
        if (element.classList.contains('active')) {
            element.classList.remove("active");
            child.setAttribute('d', bookmarkConfig.svg.empty);
            bookmarkApplication(bookmarkConfig.url.remove, applicationId, csrftoken);
        } else {
            element.classList.add("active");
            child.setAttribute('d', bookmarkConfig.svg.filled);
            bookmarkApplication(bookmarkConfig.url.add, applicationId, csrftoken);
        }
    }
    if (parent.classList.contains('click-active')) {
        let applicationId = parent.dataset.appNumber;
        if (parent.classList.contains('active')) {
            parent.classList.remove("active");
            element.setAttribute('d', bookmarkConfig.svg.filled);
            bookmarkApplication(bookmarkConfig.url.remove, applicationId, csrftoken);
        } else {
            parent.classList.add("active");
            element.setAttribute('d', bookmarkConfig.svg.empty);
            bookmarkApplication(bookmarkConfig.url.add, applicationId, csrftoken);
        }
    }
});
