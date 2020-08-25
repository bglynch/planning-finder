function setCouncilLogo(council) {
    let mapping = {
        "dublin city council": "dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico",
        "dlr county council": "dlrcoco.ie/sites/all/themes/dlr/images/dlr-logo.png",
        "fingal county council": "fingal.ie/themes/custom/weatherlab/components/images/favicons/apple-icon-57x57.png",
        "south dublin county council": "sdcc.ie/favicon/favicon.ico"
    };
    return "https://www."+mapping[council.toLowerCase()];
}