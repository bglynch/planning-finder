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
        regex:/pending/,
    },
    granted: {
        name: 'granted',
        color: 'green',
        regex:/(grant|split)/,
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