import React from 'react';
import MaskedInput from 'react-maskedinput';
import { decimalLatToDegree, decimalLngToDegree,
    degreeLatToDecimal,degreeLngToDecimal,
    validateLat, validateLng } from './utils';
import PropTypes from 'prop-types';

class Latlng extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loadingLocation: false};
        this.onMaskChanged = this.onMaskChanged.bind(this);
        this.onLatInputChanged = this.onLatInputChanged.bind(this);
        this.onLngInputChanged = this.onLngInputChanged.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
            this.setState({loadingLocation: true});
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    showPosition(position) {
        this.props.onChange(position.coords.latitude, position.coords.longitude);
        this.setState({loadingLocation: false});
    }

    onMaskChanged(e) {
        var value = e.target.value;

        if (value.indexOf('_') != -1) return;

        if (this.props.decimal) {

            var lat = value.substr(0,9);
            var lng = value.substr(10,20);

            if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) return;

            lat = parseFloat(lat);
            lng = parseFloat(lng);

            if (!validateLat(lat) || !validateLng(lng)) return;

        } else {
            var lat = degreeLatToDecimal(value.substr(0,13));
            var lng = degreeLngToDecimal(value.substr(14,29));

            if (isNaN(lat) || isNaN(lng)) return;
        }
        this.props.onChange(lat,lng);
    }

    onLatInputChanged(e) {
        var value = e.target.value;

        if (value[value.length -1] == '.' || value[value.length -1] == ',') {
            value = value + "0";
        }

        if (isNaN(parseFloat(value))) return;

        var number = parseFloat(value);

        if (!validateLat(number)) return;

        this.props.onChange(number,this.props.lng);
    }

    onLngInputChanged(e) {
        var value = e.target.value;

        if (value[value.length -1] == '.' || value[value.length -1] == ',') {
            value = value + "0";
        }

        if (isNaN(parseFloat(value))) return;

        var number = parseFloat(value);

        if (!validateLng(number)) return;

        this.props.onChange(this.props.lat, number);
    }

    render() {

        if (this.props.decimal) {
            var lat = this.props.lat;
            var lng = this.props.lng;

            if (lat.toString().length > 9) {
                lat = lat.toString().substr(0,9)
            } else {
                if (lat%1 == 0) {
                    lat = lat.toFixed(1);
                }

                lat = (lat + "000000").slice(0,9);
            }

            if (lng.toString().length > 10) {
                lng = lng.toString().substr(0,10)
            } else {
                if (lng%1 == 0) {
                    lng = lng.toFixed(1);
                }

                lng = (lng + "0000000").slice(0,10);
            }

            var value = lat + " " + lng;
            var mask = "wwww11111 wwwww11111";
            var formatCharacters = {
                'w': {
                    validate(char) { return /[\.\-0-9]/.test(char ) },
                    transform(char) { return char.toUpperCase() }
                },
            };
            var input = <div><MaskedInput onChange={this.onMaskChanged} value={value} mask={mask} formatCharacters={formatCharacters} style={styles.input}/></div>;

        } else {
            var value = decimalLatToDegree(this.props.lat) + " " +decimalLngToDegree(this.props.lng);
            var mask = "11º 11.111' N 111º 11.111' W";
            var formatCharacters = {
                'W': {
                    validate(char) { return /[wWeE]/.test(char ) },
                    transform(char) { return char.toUpperCase() }
                },
                'N': {
                    validate(char) { return /[sSnN]/.test(char ) },
                    transform(char) { return char.toUpperCase() }
                }
            };
            var input = <MaskedInput onChange={this.onMaskChanged} value={value} mask={mask} formatCharacters={formatCharacters} style={styles.input}/>;
        }

        if (window.location.protocol === "https:" && this.props.geolocation) {
            if (this.state.loadingLocation) {
                var iconClass = this.props.iconLocatingClass;
            } else {
                var iconClass = this.props.iconLocateClass;
            }
            var location = <div onClick={this.getLocation} style={styles.compass}><i className={iconClass}></i></div>;
        } else { //Get location not permitted on insecure pages
            var location = null;
        }

	    let containerStyle = styles.container;
        const style = {...containerStyle, ...this.props.style};
	    return (
            <div className="hbox" style={style}>
                {location}
                <div style={styles.bounds}>{input}</div>
            </div>
        );

    }
}

var styles = {
    compass: {
        borderRight: "1px solid lightgrey",
        padding: 8,
        cursor: "pointer"
    },
    bounds: {
        padding: 8,
    },
    input: {
        border: "none"
    },
    container: {
        alignItems: "center",
        backgroundColor: "white",
    }
};

Latlng.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
	decimal: PropTypes.bool,
	onChange: PropTypes.func,
    geolocation: PropTypes.bool,
    iconClass: PropTypes.string,
	iconLocateClass: PropTypes.string,
	iconLocatingClass: PropTypes.string,
    style: PropTypes.object
};

// Specifies the default values for props:
Latlng.defaultProps = {
	lat: 0,
	lng: 0,
	decimal: false,
	onChange: () => null,
	geolocation: true,
	iconLocateClass: "fa fa-location-arrow fa-fw",
	iconLocatingClass: "fa fa-spinner fa-spin fa-fw",
	style: {}
};

export default Latlng;
