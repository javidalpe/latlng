## Latitude/Longitude masked input
A reactjs masked input for latitude/longitude coordinates.

Accepts degree or decimal coordinates.

[Demo](https://javidalpe.github.io/latlng/)

### Installation
```
npm install react-input-latlng --save
```

### Usage

```
import Latlng from 'react-input-latlng';

...
<Latlng lat={this.state.lat} lng={this.state.lng} onChange={(lat, lng) => this.updatePoint(lat, lng)}/>
```


### Props
* **lat : number|string**: initial latitude (decimal coordinates)
* **lng : number|string**: initial longitude (decimal coordinates)
* **decimal : bool**: uses decimal coordinates mask.
* **onChange : (lat: number, lng: number)**: A callback which will be called any time the mask's value changes.
* **geolocation : bool**: true if user can use html5 geolocation api to get the device gps location
* **iconLocateClass : string**: class name used when the geolocation icon is displayed
* **iconLocatingClass : string**: class name used when the geolocation loading icon is displayed
* **style : object**: style for the input container
