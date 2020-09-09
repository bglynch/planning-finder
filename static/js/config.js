const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const councilList = [
    'Dublin City Council',
    'Dun Laoghaire Rathdown County Council',
    'Fingal County Council',
    'South Dublin County Council',
    'DLR County Council'
];
const months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

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
    }
}