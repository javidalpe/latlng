export function decimalLatToDegree(l) {
	var array = decimalToDegree(l);
	var str;
	if (l > 0)
		str = array[0] + "º " + array[1] + "' N";
	else
		str = array[0] + "º " + array[1] + "' S";

	if (array[0] < 10)
		str = '0' + str;

	return str;
}

export function decimalLngToDegree(l) {
	var array = decimalToDegree(l);
	var str;
	if (l > 0)
		str = array[0] + "º " + array[1] + "' E";
	else
		str = array[0] + "º " + array[1] + "' W";

	if (array[0] < 10)
		str = '00' + str;
	else if (array[0] < 100)
		str = '0' + str;

	return str;
}

function decimalToDegree(decimal) {
	var d = parseInt(decimal);
	var md = Math.abs(decimal - d) * 60;
	var m = parseFloat(md).toFixed(3);
	if (m < 10) {
		m = "0" + m;
	}
	return [Math.abs(d), m];
}

export function degreeLatToDecimal(degree) {
	var i = degree.indexOf('º');
	var deg = degree.substring(0, i);
	var fdeg = parseFloat(deg);
	var i2 = degree.indexOf('\'');
	var dec = degree.substring(i + 2, i2);
	var fdec = parseFloat(dec) / 60;
	var decimal = fdeg + fdec;

	var s = degree.substring(i2 + 2, i2 + 3);
	if (s == 'S' || s == 's')
		decimal = decimal * (-1);

	return decimal;
}

export function degreeLngToDecimal(degree) {
	var i = degree.indexOf('º');
	var deg = degree.substring(0, i);
	var fdeg = parseFloat(deg);
	var i2 = degree.indexOf('\'');
	var dec = degree.substring(i + 2, i2);
	var fdec = parseFloat(dec) / 60;
	var decimal = fdeg + fdec;

	var s = degree.substring(i2 + 2, i2 + 3);
	if (s == 'W' || s == 'w')
		decimal = decimal * (-1);

	return decimal;
}

function inrange(min,number,max){
    if ( !isNaN(number) && (number >= min) && (number <= max) ){
        return true;
    } else {
        return false;
    };
}

export function validateLat(numberLat) {
    return inrange(-90, numberLat, 90);
}

export function validateLng(numberLng) {
    return inrange(-180, numberLng, 180);
}
