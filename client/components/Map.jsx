import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
class Map extends Component {
  render() {
    const OpportunityMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: this.props.op.location.lat, lng: this.props.op.location.lng }}
        defaultZoom={13}
      >
        <MarkerWithLabel
          position={{ lat: this.props.op.location.lat, lng: this.props.op.location.lng }}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{ backgroundColor: "white", fontSize: "14px", padding: "0px" }}
        >
          <div></div>
        </MarkerWithLabel>
      </GoogleMap>
    ));
    return (
      <div>
        <OpportunityMap
          containerElement={<div style={{ height: `180px`, width: '318px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
};
export default Map;