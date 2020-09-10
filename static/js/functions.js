/*jshint esversion: 6*/
/* global 
    $,jQuery, filters, map, countyCouncils, listConfig, bookmarkConfig
*/

function setDecision(decision) {
    if (decision == null) { return "Pending"; }
    decision = decision
        .trim()
        .toLowerCase()
        .split(" ")
        .map(function (word) { return word.replace(word[0], word[0].toUpperCase()); })
        .join(" ");

    return decision;
}

function addSlightVarianceToLatLng(latlng) {
    // this is added to prevent map icons being placed on top of eachother
    const lngVariance = 0.00009;
    const latVariance = 0.00006;

    latlng.lat = latlng.lat - latVariance / 2 + Math.random() * latVariance;
    latlng.lng = latlng.lng - lngVariance / 2 + Math.random() * lngVariance;

    return latlng;
}

function selectCouncil(geoJSONPoint) {
    let applicationUrl = null;
    if (Object.keys(countyCouncils).includes(geoJSONPoint.properties.PlanningAuthority)) {
        applicationUrl = countyCouncils[geoJSONPoint.properties.PlanningAuthority].url.replace("XXXXX", geoJSONPoint.properties.ApplicationNumber);
    } else {
        applicationUrl = null;
    }

    return applicationUrl;
}


function filterPlanningGeoJSON(layer) {
    let appId = $("#" + layer.feature.properties.ApplicationNumber.replace(/\//g, ""));
    let appDate = layer.feature.properties.ReceivedDate;
    let appStatus = layer.feature.properties.PlanningStatus;
    let numberOfTrue = 0;
    if (appDate > filters.dateRange[0] && appDate < filters.dateRange[1]) {
        numberOfTrue += 1;
    }
    if (filters.applicationType.includes(appStatus) || filters.applicationType.length == 0) {
        numberOfTrue += 1;
    }
    if (numberOfTrue == 2) {
        appId.show();
        layer.addTo(map);
    }
    else {
        appId.hide();
        map.removeLayer(layer);
    }
}

function createListItem(geoJSONPoint, userLoggedIn) {
    let council = geoJSONPoint.properties.PlanningAuthority;
    let isProfilePage = RegExp('profile').test(document.URL);
    let html;
    let flyToIcon = `
        <svg class="fly-to ml-1" onclick="flyToPlace(${geoJSONPoint.geometry.coordinates[1]}, ${geoJSONPoint.geometry.coordinates[0]})">
            <path d="${listConfig.svg.flyTo}"/>
        </svg>`;

    let planningDec = `
        <div class="planning-status main-font-normal">${setDecision(geoJSONPoint.properties.Decision)}
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="4" stroke="${geoJSONPoint.properties.colour}" stroke-width="1" fill="${geoJSONPoint.properties.colour}" fill-opacity="0.8" />
            </svg>
        </div>`;

    let planningDate = `
        <div class="col-12 main-font-normal">
            <span class="main-font-small" style="padding-right: 7px;">
                Application Date:
            </span> ${new Date(geoJSONPoint.properties.ReceivedDate).toLocaleDateString("en-GB")}
        </div>`;

    let planningStatus = `
        <div class="col-12 main-font-normal">
            <span class="main-font-small" style="padding-right: 63px;">Status:</span>${geoJSONPoint.properties.ApplicationStatus}
        </div>`;

    let countyCouncil = `
        <img src="${countyCouncils[council].logo}" alt="" class="float-left mr-2 mt-2" height="20" width="20">
        <div class="float-left main-font-small mt-2">${countyCouncils[council].display}</div>`;

    let viewApplicationButton = `
        <a target="_blank" rel="noopener" class="btn btn-primary float-right main-font-normal" href="${geoJSONPoint.properties.ApplicationUrl}" style="color: #fbf8f3;font-size: 12px;font-weight: 500;letter-spacing: 1px;">
            View Planning
        </a>`;

    // user not logged in => dont show bookmark icons
    if (!userLoggedIn) {
        html = `
            <div id="${geoJSONPoint.properties.ApplicationNumber.replace(/\//g, "").trim()}" class="list-group-item">
                <div class="col-12 main-font-big">
                    ${geoJSONPoint.properties.ApplicationNumber}
                    ${flyToIcon}
                </div>
                ${planningDec}
                ${planningDate}
                ${planningStatus}
                <div class="col-12 mt-2 mt-sm-3">
                    ${countyCouncil}
                    ${viewApplicationButton}
                </div>
            </div>`;

        return html;
    }
    // user logged in on profile page
    else if (isProfilePage) {
        let bookmarkIcon = `
            <svg viewBox="0 0 16 16" class="bi bi-bookmark click-active active" data-app-number="${geoJSONPoint.properties.ApplicationNumber.trim()}">
                <path  d="${bookmarkConfig.svg.filled}"></path>
            </svg>`;
        html = `
            <div id="${geoJSONPoint.properties.ApplicationNumber.replace(/\//g, "").trim()}" class="list-group-item">
                <div class="col-12 main-font-big">
                    ${geoJSONPoint.properties.ApplicationNumber}
                    ${flyToIcon}
                    ${bookmarkIcon}
                </div>
                ${planningDec}
                ${planningDate}
                <div class="col-12 mt-2 mt-sm-3">
                    ${countyCouncil}
                    ${viewApplicationButton}
                </div>
            </div>`;

        return html;
    }
    // user logged in on home page
    else {
        let isBookmarked = bookmarkConfig.bookmarks.includes(geoJSONPoint.properties.ApplicationNumber.trim()) ? true : false;
        let classes = isBookmarked ? "bi bi-bookmark click-active active" : "bi bi-bookmark click-active";
        let bookmarkIcon = `
            <svg viewBox="0 0 16 16" class="${classes}" data-app-number="${geoJSONPoint.properties.ApplicationNumber.trim()}">
                <path  d="${isBookmarked ? bookmarkConfig.svg.filled : bookmarkConfig.svg.empty}"></path>
            </svg>`;

        html = `
            <div id="${geoJSONPoint.properties.ApplicationNumber.replace(/\//g, "").trim()}" class="list-group-item">
                <div class="col-12 main-font-big">
                    ${geoJSONPoint.properties.ApplicationNumber}
                    ${flyToIcon}
                    ${bookmarkIcon}
                </div>
                ${planningDec}
                ${planningDate}
                ${planningStatus}
                <div class="col-12 mt-2 mt-sm-3">
                    ${countyCouncil}
                    ${viewApplicationButton}
                </div>
            </div>`;

        return html;
    }
}

function flyToPlace(lat, lon) {
    map.flyTo([lat, lon], 20, { duration: 1 });
}

// AJAX Functions
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

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// Function to set Request Header with `CSRFTOKEN`
function setRequestHeader(csrftoken) {
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}

function bookmarkApplication(url, data, csrftoken) {
    setRequestHeader(csrftoken);
    $.ajax({
        dataType: 'json',
        type: 'POST',
        url: url,
        data: { 'data': data },
    });
}