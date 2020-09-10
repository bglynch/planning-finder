const DateTimeConfig = {
    oneWeek: 7 * 24 * 60 * 60 * 1000,
    months: [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ]
}

const countyCouncils = {
    'Dublin City Council': {
        display: 'Dublin City Council',
        logo: 'https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/dcc_20x20.png',
        url: 'https://www.dublincity.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=XXXXX'
    },
    'South Dublin County Council': {
        display: 'South Dublin Council',
        logo: 'https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/sdcc_20x20.png',
        url: 'http://www.sdublincoco.ie/Planning/Details?regref=XXXXX'
    },
    'Fingal County Council': {
        display: 'Fingal County Council',
        logo: 'https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/fingal_20x20.png',
        url: 'http://planning.fingalcoco.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=XXXXX'
    },
    'Dun Laoghaire Rathdown County Council': {
        display: 'DLR County Council',
        logo: 'https://bglynch-planningfinder.s3-eu-west-1.amazonaws.com/static/assets/dlr_20x20.png',
        url: 'https://planning.agileapplications.ie/dunlaoghaire/search-applications/results?criteria=%7B%22query%22:%22XXXXX%22%7D&page=1'
    },

}

const planningDecision = {
    pending: {
        name: 'pending',
        color: 'orange',
        regex: /pending/,
    },
    granted: {
        name: 'granted',
        color: 'green',
        regex: /(grant|split)/,
    },
    refused: {
        name: 'refused',
        color: 'red',
        regex: /refuse/
    },
    invalid: {
        name: 'invalid',
        color: 'brown',
        regex: /invalid/,
    },
    withdrawn: {
        name: 'withdrawn',
        color: 'blue',
        regex: /withdraw/
    },
    information: {
        name: 'information',
        color: 'purple',
        regex: /additional/,
    }
}

const mapConfig = {
    setup: {
        htmlId: 'map',
        maxZoom: 20,
        minZoom: 10,
        southWestBound: [53.1, -6.7], // south west dublin
        northEastBound: [53.7, -5.8], // north east dublin
    },
    mapTiles: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        zoomSnap: 0.25,
    },
    userLocation: {
        lat: 53.31,
        lng: -6.25
    }
}

const bookmarkConfig = {
    svg: {
        filled: 'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z',
        empty: 'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'
    },
    url: {
        add: '/bookmark/',
        remove: '/bookmark/remove/'
    },
    bookmarks: []
}

const listConfig = {
    svg: {
        flyTo: 'M22,16v-2l-8.5-5V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5V9L2,14v2l8.5-2.5V19L8,20.5L8,22l4-1l4,1l0-1.5L13.5,19 v-5.5L22,16z',
        link01: 'M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z',
        link02: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z',
    }
}