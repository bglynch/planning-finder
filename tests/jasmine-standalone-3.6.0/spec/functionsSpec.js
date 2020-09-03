// tests for functions in main.js
describe('setCouncilLogo function', function () {
    it('shold return logo when council is lowercase', function () {
        expect(setCouncilLogo('Dublin City Council')).toEqual("https://www.dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico");
    });
    it('shold return logo when council is titlecase', function () {
        expect(setCouncilLogo('dublin city council')).toEqual("https://www.dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico");
    });
})

describe('selectCouncil(geoJSONPoint) function', function () {
    let geo = {
        "type": "Feature",
        "properties": {
            "ApplicationNumber": "WEB1419\/20",
            "ApplicationStatus": "Decision Notice Issued",
            "Decision": "APPLICATION DECLARED INVALID",
            "DevelopmentDescription": "The proposed development involves the division of a pair of semi detached houses into two detached houses, increasing the height of the ridge in No 55 so as to convert the existing attic store of 24sq.m to an area of 51sq.m. containing 2 bedrooms and a bathroom, and increasing the ridge height in no. 56 to equal the ridge in no. 55 thereby bringing the new attic space in both houses to habitable standard. In addition to provide in no. 56 a new basement and extensions at ground and first floor level and attic level. Accesses to off street car parking will remain unchanged in both dwellings. The floor area of no. 56 will increase from 140.52 sq. m. to 446.43 sq.m.",
            "LinkAppDetails": null,
            "PlanningAuthority": "Dublin City Council",
            "ReceivedDate": 1593993600000
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-6.2572787286242, 53.309703845246403]
        }
    }

    it('given geojson feature, shold return link to planning application', function () {
        expect(selectCouncil(geo) ).toEqual("https://www.dublincity.ie/swiftlg/apas/run/WPHAPPDETAIL.DisplayUrl?theApnID=WEB1419\/20");
    });
})

describe('addSlightVarianceToLatLng(latlng) function', function () {
    let latlng = {
            "lat": -6.2572787286242,
            "lng": 53.309703845246403
        }
    
    let returned_latlng = addSlightVarianceToLatLng({
        "lat": -6.2572787286242,
        "lng": 53.309703845246403
    })
    it('point should not be on same location as origional point', function () {
        expect(returned_latlng.lat).not.toEqual(latlng.lat);
    });
    it('point should not be on same location as origional point', function () {
        expect(returned_latlng.lng).not.toEqual(latlng.lng);
    });

    let origional = turf.point([latlng.lat, latlng.lng]);
    let modified = turf.point([returned_latlng.lat, returned_latlng.lng]);
    let options = {units: 'metres'};
    let distance = turf.distance(origional, modified, options);
    it('distance from origional point to modified location shold be less than 10 metres', function () {
        expect(distance).toBeLessThan(10);
    });

})

describe('setDecision(decision) function', function () {

    it('given null, should return application is Pending', function () {
        expect(setDecision(null)).toEqual("Pending");
    });

    it('given untrimmed lowercase string, should return trimmed title case', function () {
        expect(setDecision(" grant permission ")).toEqual("Grant Permission");
    });
})