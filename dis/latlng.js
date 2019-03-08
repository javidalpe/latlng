'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMaskedinput = require('react-maskedinput');

var _reactMaskedinput2 = _interopRequireDefault(_reactMaskedinput);

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Latlng = function (_React$Component) {
    _inherits(Latlng, _React$Component);

    function Latlng(props) {
        _classCallCheck(this, Latlng);

        var _this = _possibleConstructorReturn(this, (Latlng.__proto__ || Object.getPrototypeOf(Latlng)).call(this, props));

        _this.state = { loadingLocation: false };
        _this.onMaskChanged = _this.onMaskChanged.bind(_this);
        _this.onLatInputChanged = _this.onLatInputChanged.bind(_this);
        _this.onLngInputChanged = _this.onLngInputChanged.bind(_this);
        _this.getLocation = _this.getLocation.bind(_this);
        return _this;
    }

    _createClass(Latlng, [{
        key: 'getLocation',
        value: function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
                this.setState({ loadingLocation: true });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    }, {
        key: 'showPosition',
        value: function showPosition(position) {
            this.props.onChange(position.coords.latitude, position.coords.longitude);
            this.setState({ loadingLocation: false });
        }
    }, {
        key: 'onMaskChanged',
        value: function onMaskChanged(e) {
            var value = e.target.value;

            if (value.indexOf('_') != -1) return;

            if (this.props.decimal) {

                var lat = value.substr(0, 9);
                var lng = value.substr(10, 20);

                if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) return;

                lat = parseFloat(lat);
                lng = parseFloat(lng);

                if (!(0, _utils.validateLat)(lat) || !(0, _utils.validateLng)(lng)) return;
            } else {
                var lat = (0, _utils.degreeLatToDecimal)(value.substr(0, 13));
                var lng = (0, _utils.degreeLngToDecimal)(value.substr(14, 29));

                if (isNaN(lat) || isNaN(lng)) return;
            }
            this.props.onChange(lat, lng);
        }
    }, {
        key: 'onLatInputChanged',
        value: function onLatInputChanged(e) {
            var value = e.target.value;

            if (value[value.length - 1] == '.' || value[value.length - 1] == ',') {
                value = value + "0";
            }

            if (isNaN(parseFloat(value))) return;

            var number = parseFloat(value);

            if (!(0, _utils.validateLat)(number)) return;

            this.props.onChange(number, this.props.lng);
        }
    }, {
        key: 'onLngInputChanged',
        value: function onLngInputChanged(e) {
            var value = e.target.value;

            if (value[value.length - 1] == '.' || value[value.length - 1] == ',') {
                value = value + "0";
            }

            if (isNaN(parseFloat(value))) return;

            var number = parseFloat(value);

            if (!(0, _utils.validateLng)(number)) return;

            this.props.onChange(this.props.lat, number);
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.props.decimal) {
                var lat = this.props.lat;
                var lng = this.props.lng;

                if (lat.toString().length > 9) {
                    lat = lat.toString().substr(0, 9);
                } else {
                    if (lat % 1 == 0) {
                        lat = lat.toFixed(1);
                    }

                    lat = (lat + "000000").slice(0, 9);
                }

                if (lng.toString().length > 10) {
                    lng = lng.toString().substr(0, 10);
                } else {
                    if (lng % 1 == 0) {
                        lng = lng.toFixed(1);
                    }

                    lng = (lng + "0000000").slice(0, 10);
                }

                var value = lat + " " + lng;
                var mask = "wwww11111 wwwww11111";
                var formatCharacters = {
                    'w': {
                        validate: function validate(char) {
                            return (/[\.\-0-9]/.test(char)
                            );
                        },
                        transform: function transform(char) {
                            return char.toUpperCase();
                        }
                    }
                };
                var input = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactMaskedinput2.default, { onChange: this.onMaskChanged, value: value, mask: mask, formatCharacters: formatCharacters, style: styles.input })
                );
            } else {
                var value = (0, _utils.decimalLatToDegree)(this.props.lat) + " " + (0, _utils.decimalLngToDegree)(this.props.lng);
                var mask = "11º 11.111' N 111º 11.111' W";
                var formatCharacters = {
                    'W': {
                        validate: function validate(char) {
                            return (/[wWeE]/.test(char)
                            );
                        },
                        transform: function transform(char) {
                            return char.toUpperCase();
                        }
                    },
                    'N': {
                        validate: function validate(char) {
                            return (/[sSnN]/.test(char)
                            );
                        },
                        transform: function transform(char) {
                            return char.toUpperCase();
                        }
                    }
                };
                var input = _react2.default.createElement(_reactMaskedinput2.default, { onChange: this.onMaskChanged, value: value, mask: mask, formatCharacters: formatCharacters, style: styles.input });
            }

            if (window.location.protocol === "https:" && this.props.geolocation) {
                if (this.state.loadingLocation) {
                    var iconClass = this.props.iconLocatingClass;
                } else {
                    var iconClass = this.props.iconLocateClass;
                }
                var location = _react2.default.createElement(
                    'div',
                    { onClick: this.getLocation, style: styles.compass },
                    _react2.default.createElement('i', { className: iconClass })
                );
            } else {
                //Get location not permitted on insecure pages
                var location = null;
            }

            var containerStyle = styles.container;
            var style = _extends({}, containerStyle, this.props.style);
            return _react2.default.createElement(
                'div',
                { className: 'hbox', style: style },
                location,
                _react2.default.createElement(
                    'div',
                    { style: styles.bounds },
                    input
                )
            );
        }
    }]);

    return Latlng;
}(_react2.default.Component);

var styles = {
    compass: {
        borderRight: "1px solid lightgrey",
        padding: 8,
        cursor: "pointer"
    },
    bounds: {
        padding: 8
    },
    input: {
        border: "none"
    },
    container: {
        alignItems: "center",
        backgroundColor: "white"
    }
};

Latlng.propTypes = {
    lat: _propTypes2.default.number,
    lng: _propTypes2.default.number,
    decimal: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    geolocation: _propTypes2.default.bool,
    iconClass: _propTypes2.default.string,
    iconLocateClass: _propTypes2.default.string,
    iconLocatingClass: _propTypes2.default.string,
    style: _propTypes2.default.object
};

// Specifies the default values for props:
Latlng.defaultProps = {
    lat: 0,
    lng: 0,
    decimal: false,
    onChange: function onChange() {
        return null;
    },
    geolocation: true,
    iconLocateClass: "fa fa-location-arrow fa-fw",
    iconLocatingClass: "fa fa-spinner fa-spin fa-fw",
    style: {}
};

exports.default = Latlng;