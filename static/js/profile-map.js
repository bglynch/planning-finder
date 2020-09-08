/*jshint esversion: 6*/
/* global 
    $,jQuery, L,
	marker_lat,marker_lng,planningData,councilData,
	createBookmarkedListItemProfilePage, selectCouncil, 
    addSlightVarianceToLatLng 
*/
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
const councilList = ['Dublin City Council', 'Dun Laoghaire Rathdown County Council', 'Fingal County Council', 'South Dublin County Council', 'DLR County Council'];
let minDate = Math.round((new Date()).getTime());

// set map tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    zoomSnap: 0.25,
}).addTo(map);

let markers_list = [];

// set makers for User
L.marker([marker_lat, marker_lng]).addTo(map)
    .bindPopup('To choose a new location, click "Edit Location"')
    .openPopup();


let planningGeoJSON = L.geoJSON(planningData, {
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
                feature.properties['colour'] = 'blue';
            }
            if (granted_planning.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'granted';
                feature.properties['colour'] = 'green';
            }
            if (information.test(feature.properties['Decision'].toLowerCase())) {
                feature.properties['PlanningStatus'] = 'information';
                feature.properties['colour'] = 'purple';
            }
        }
        let divhtml = createBookmarkedListItemProfilePage(feature);


        if (councilList.includes(feature.properties.PlanningAuthority)) {
            $('#list-view').append(divhtml);
        }

        return {
            fillOpacity: 0.8,
            fillColor: feature.properties['colour'],
            color: feature.properties['colour'],
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

        if (councilList.includes(geoJSONPoint.properties.PlanningAuthority)) {
            let marker = L.circle(addSlightVarianceToLatLng(latlng));
            markers_list.push(marker);
            return marker;
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
                    fillOpacity: (councilList.includes(feature.properties.ENGLISH)) ? 0 : 0.7,
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


// Bookmarks
let bookmark = {
    'empty': 'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z',
    'filled':'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z'
};
// Function to GET csrftoken from Cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// Function to set Request Header with `CSRFTOKEN`
function setRequestHeader(){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}
function bookmarkApplication(url, data) {
    setRequestHeader();
    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: url,
        data: {'data':data},
        // success: function () {
        //     alert('success');
        // },
        // error: function () {
        //     alert('error');
        // }
    });
}

document.addEventListener('click', function (event) {
    // add or remove active class
    let element = event.target;
    let child = event.target.firstElementChild;
    let parent = event.target.parentElement;

    if (element.classList.contains('click-active')) {
        let applicationId = element.dataset.appNumber;
        if (element.classList.contains('active')) {
            element.classList.remove("active");
            child.setAttribute('d', bookmark.empty);
            bookmarkApplication('/bookmark/remove/',applicationId);
            $(`#$${element.dataset.appNumber.replace(/\//g, "")}`).fadeOut();
            map.removeLayer(markers_list.find(e => e.feature.properties.ApplicationNumber == element.dataset.appNumber));
        } else {
            element.classList.add("active");
            child.setAttribute('d', bookmark.filled);
            bookmarkApplication('/bookmark/',applicationId);
        }
    }
    if (parent.classList.contains('click-active')) {
        let applicationId = parent.dataset.appNumber;
        if (parent.classList.contains('active')) {
            parent.classList.remove("active");
            element.setAttribute('d', bookmark.empty);
            bookmarkApplication('/bookmark/remove/',applicationId);
            $(`#${parent.dataset.appNumber.replace(/\//g, "")}`).fadeOut();
            map.removeLayer(markers_list.find(e => e.feature.properties.ApplicationNumber == parent.dataset.appNumber));

        } else {
            parent.classList.add("active");
            element.setAttribute('d', bookmark.filled);
            bookmarkApplication('/bookmark/',applicationId);
        }}
});