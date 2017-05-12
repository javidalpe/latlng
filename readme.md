## Latitude/Longitude masket input
A simple masked input for latitude/longitude coordinates.

Accepts degree or decimal coordinates.

### Installation
```
npm install latlng --save
```

### Usage
Give Lnglng a onChange callback:
```
import Latlng from 'react-input-latlng';

...
<Latlng lat={this.state.lat} lng={this.state.lng} onChange={this.updatePoint} decimal=false/>
```


### Props
* **lat : number|string**: initial latitude (decimal coordinates)
* **lng : number|string**: initial longitude (decimal coordinates)
* **decimal : bool**: if masked input uses decimal coordinates mask.
* **onChange : (lat: number, lng: number)**: A callback which will be called any time the mask's value changes.
