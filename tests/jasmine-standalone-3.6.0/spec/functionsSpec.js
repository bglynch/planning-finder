// tests for functions in main.js
describe('setCouncilLogo function', function() {
    it('shold return logo when council is lowercase', function() {
        expect(setCouncilLogo('Dublin City Council')).toEqual("https://www.dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico");
    });
    it('shold return logo when council is titlecase', function() {
        expect(setCouncilLogo('dublin city council')).toEqual("https://www.dublincity.ie/sites/all/themes/dublin_city_theme/favicon.ico");
    });


})