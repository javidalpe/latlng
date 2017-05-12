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
import Latlng from './latlng';

...
<Latlng lat={this.state.lat} lng={this.state.lng} onChange={this.updatePoint} decimal=false/>
```


### Props
* **lat**: <float> initial latitude (decimal coordinates)
* **lng**: <float> initial longitude (decimal coordinates)
* **decimal**: <boool> if masked input uses decimal coordinates mask.
* **onChange**: <function(lat,lng)> the function that will recieve the new lat/lng
