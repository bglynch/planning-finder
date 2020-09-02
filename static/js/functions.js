function setCouncilLogo(council) {
    let mapping = {
        "dublin city council": "dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico",
        "dlr county council": "dlrcoco.ie/sites/all/themes/dlr/images/dlr-logo.png",
        "fingal county council": "fingal.ie/themes/custom/weatherlab/components/images/favicons/apple-icon-57x57.png",
        "south dublin county council": "sdcc.ie/favicon/favicon.ico"
    };
    return "https://www."+mapping[council.toLowerCase()];
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
    // this is added to prevent map icons being placed on top of eachother
    const lngVariance = 0.00009;
    const latVariance = 0.00006;

    latlng.lat = latlng.lat - latVariance / 2 + Math.random() * latVariance;
    latlng.lng = latlng.lng - lngVariance / 2 + Math.random() * lngVariance;

    return latlng
}

function selectCouncil(geoJSONPoint) {
    let applicationUrl = null
    if (geoJSONPoint.properties['PlanningAuthority'] == "Dublin City Council") {
        applicationUrl = "https://www.dublincity.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=" + geoJSONPoint.properties['ApplicationNumber']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "Fingal County Council") {
        applicationUrl = "http://planning.fingalcoco.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=" + geoJSONPoint.properties['ApplicationNumber']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "South Dublin County Council") {
        applicationUrl = "http://www.sdublincoco.ie/Planning/Details?regref=" + geoJSONPoint.properties['ApplicationNumber']
    } else if (geoJSONPoint.properties['PlanningAuthority'] == "Dun Laoghaire Rathdown County Council") {
        geoJSONPoint.properties['PlanningAuthority'] = "DLR County Council"
        applicationUrl = "https://planning.agileapplications.ie/dunlaoghaire/search-applications/results?criteria=%7B%22query%22:%22"+geoJSONPoint.properties['ApplicationNumber']+"%22%7D&page=1"
    } else {
        applicationUrl = null
    }

    return applicationUrl;
}

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

function createListItem(geoJSONPoint) {
    divhtml = `
        <div id="${geoJSONPoint.properties['ApplicationNumber'].replace(/\//g, "").trim()}" class="list-group-item">
            <div class="col-12 main-font-big">
                ${geoJSONPoint.properties['ApplicationNumber']}
                <svg class="fly-to ml-1" onclick="flyToPlace(${geoJSONPoint.geometry.coordinates[1]}, ${geoJSONPoint.geometry.coordinates[0]})">
                    <path d="M22,16v-2l-8.5-5V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5V9L2,14v2l8.5-2.5V19L8,20.5L8,22l4-1l4,1l0-1.5L13.5,19 v-5.5L22,16z"/>
                </svg>
                <svg viewBox="0 0 16 16" class="bi bi-bookmark click-active" xmlns="http://www.w3.org/2000/svg" data-app-number="${geoJSONPoint.properties['ApplicationNumber'].trim()}">
                    <path  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                </svg>
            </div>
            <div class="planning-status main-font-normal">${setDecision(geoJSONPoint.properties['Decision'])}
                <svg height="20" width="20">
                    <circle cx="10" cy="10" r="4" stroke="${geoJSONPoint.properties['colour']}" stroke-width="1" fill="${geoJSONPoint.properties['colour']}" fill-opacity="0.8" />
                </svg>
            </div>
            <div class="col-12 main-font-normal"><span class="main-font-small" style="padding-right: 7px;">Application Date:</span> ${new Date(geoJSONPoint.properties['ReceivedDate']).toLocaleDateString("en-GB")}</div>
            <div class="col-12 main-font-normal"><span class="main-font-small" style="padding-right: 63px;">Status:</span>${geoJSONPoint.properties['ApplicationStatus']}</div>
            <div class="col-12 mt-2 mt-sm-3">
                <img src="${setCouncilLogo(geoJSONPoint.properties['PlanningAuthority'])}" alt="" class="float-left mr-2 mt-2" height="20" width="20">
                <div class="float-left main-font-small mt-2">${geoJSONPoint.properties['PlanningAuthority']}</div>
                <a target="_blank" rel="noopener" class="btn btn-primary float-right main-font-normal mr-n3" href="${geoJSONPoint.properties['ApplicationUrl']}" style="color: #fbf8f3;font-size: 12px;font-weight: 500;letter-spacing: 1px;">View Application</a>
            </div>
        </div>
        `
    return divhtml
}

function createBookmarkedListItem(geoJSONPoint) {
    divhtml = `
        <div id="${geoJSONPoint.properties['ApplicationNumber'].replace(/\//g, "").trim()}" class="list-group-item">
            <div class="col-12 main-font-big">
                ${geoJSONPoint.properties['ApplicationNumber']}
                <svg class="fly-to ml-1" onclick="flyToPlace(${geoJSONPoint.geometry.coordinates[1]}, ${geoJSONPoint.geometry.coordinates[0]})">
                    <path d="M22,16v-2l-8.5-5V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5V9L2,14v2l8.5-2.5V19L8,20.5L8,22l4-1l4,1l0-1.5L13.5,19 v-5.5L22,16z"/>
                </svg>
                <svg viewBox="0 0 16 16" class="bi bi-bookmark click-active active" xmlns="http://www.w3.org/2000/svg" data-app-number="${geoJSONPoint.properties['ApplicationNumber'].trim()}">
                    <path  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z"></path>
                </svg>
            </div>
            <div class="planning-status main-font-normal">${setDecision(geoJSONPoint.properties['Decision'])}
                <svg height="20" width="20">
                    <circle cx="10" cy="10" r="4" stroke="${geoJSONPoint.properties['colour']}" stroke-width="1" fill="${geoJSONPoint.properties['colour']}" fill-opacity="0.8" />
                </svg>
            </div>
            <div class="col-12 main-font-normal"><span class="main-font-small" style="padding-right: 7px;">Application Date:</span> ${new Date(geoJSONPoint.properties['ReceivedDate']).toLocaleDateString("en-GB")}</div>
            <div class="col-12 main-font-normal"><span class="main-font-small" style="padding-right: 63px;">Status:</span>${geoJSONPoint.properties['ApplicationStatus']}</div>
            <div class="col-12 mt-2 mt-sm-3">
                <img src="${setCouncilLogo(geoJSONPoint.properties['PlanningAuthority'])}" alt="" class="float-left mr-2 mt-2" height="20" width="20">
                <div class="float-left main-font-small mt-2">${geoJSONPoint.properties['PlanningAuthority']}</div>
                <a target="_blank" rel="noopener" class="btn btn-primary float-right main-font-normal mr-n3" href="${geoJSONPoint.properties['ApplicationUrl']}" style="color: #fbf8f3;font-size: 12px;font-weight: 500;letter-spacing: 1px;">View Application</a>
            </div>
        </div>
        `
    return divhtml
}

function flyToPlace(lat, lon) {
    map.flyTo([lat, lon], 20, { duration: 1 })
}