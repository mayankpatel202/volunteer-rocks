import React from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import axios from 'axios';
import { GAPI_KEY } from '../../config.js'

import Filter from './Filter.jsx';
import OpsList from './OpsList.jsx';
import Main from './Main.jsx';
import NavBar from './NavBar.jsx';
import LoadAllMarkers from './LoadAllMarkers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      opportunities: [],
      filtedOpps: [],
      oppsToPassDown: [],
      howManyPages: [0],
      isLoggedIn: false,
      isOrganization: false,
      user: {},
      zipcode: ''
    }
    this.logOut = this.logOut.bind(this);
    this.getOpps = this.getOpps.bind(this);
    this.changeView = this.changeView.bind(this);
    this.setOpsListView = this.setOpsListView.bind(this);
    this.myOppotunities = this.myOppotunities.bind(this);
    this.volunteerForOpp = this.volunteerForOpp.bind(this);
    this.isLoggedInToggleForTesting = this.isLoggedInToggleForTesting.bind(this);
    this.orginizationLoggedIn = this.orginizationLoggedIn.bind(this);
    this.passDownOpps = this.passDownOpps.bind(this);
  }

  componentDidMount() {
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${GAPI_KEY}&libraries=places`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

    axios.get('/main')
      .then((response) => {
        if ('googleId' in response.data) {
          console.log("volunteer logged in", response.data)
          this.setState({
            user: response.data,
            isLoggedIn: true
          });
        } else {
          console.log("organization logged in", response.data)
          this.setState({
            user: response.data.name,
            isOrganization: true
          });
        }
      })
      .catch((err) => {
        console.log("Error in main page GET request ", err);
      })
  }

  passDownOpps(pageNumber) {
    let allOpps = this.state.opportunities;
    let numOfPages = Math.ceil(allOpps.length / 5);
    numOfPages = [...Array(numOfPages).keys()];
    let numberToEnd = pageNumber * 5;
    let numberToStart = numberToEnd - 5;
    let portionOfOpps = allOpps.slice(numberToStart, numberToEnd);

    this.setState({
      oppsToPassDown: portionOfOpps,
      howManyPages: numOfPages
    });
  };

  orginizationLoggedIn(org) {
    this.setState({
      user: org,
      isOrganization: true
    });
  }

  isLoggedInToggleForTesting() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      isOrganization: !this.state.isOrganization
    });
  }

  changeView(option) {
    if (this.state.view !== option) {
      this.setState({
        view: option
      });
    }
  }

  zip(e) {
    this.setState({
      zipcode: e.target.value
    });
  }

  volunteerForOpp(opportunity) {
    axios.post('/enroll', { opportunity: opportunity })
      .then((response) => {
        let responseData = response.data;
        if (responseData === 'login') {
          alert('Please login before enrolling');
        } else if (responseData === 'enrolled') {
          alert('Successfully enrolled in opportunity');
        } else if (responseData === 'already') {
          alert('You have already enrolled in this opportunity');
        } else if (view === 'loadAllMarkers') {
          return <LoadAllMarkers opportunities={this.state.opportunities} />
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getOpps(e, zipcode) {
    e.preventDefault();
    axios.post('/opportunities', { zipcode: zipcode })
      .then((response) => {
<<<<<<< HEAD
        console.log(response.data);
        this.setState({
          view: 'opportunities',
          opportunities: response.data,
        });

        this.passDownOpps(1);
=======
          console.log("response from opportunity ",response.data);
          this.setState({
            view: 'opportunities',
            opportunities: response.data,
          });
>>>>>>> merging
      })
      .catch((err) => {
        throw (err)
      });
  }

  postNewOrganizationForm(form) {
    axios.post('/organization', {

    })
      .then((response) => {
        alert('New Organization Saved');
      })
      .catch((err) => {
        throw (err);
      });
  }

  logOut() {
    axios.get('/logout')
      .then(response => {
        this.setState({
          view: 'main',
          opportunities: [],
          oppsToPassDown: [],
          isLoggedIn: false,
          isOrganization: false,
          user: {},
          zipcode: ''
        });
      });
  }

  setOpsListView(option, ops) {
    this.setState({
      view: option,
      filtedOpps: ops
    })
  }

  myOppotunities() {
    axios.get('/myOps')
      .then(response => {
        this.setState({
          view: 'myOpportunities',
          filtedOpps: response.data
        });
      });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'main') {
      return <Main getOpp={this.getOpps} zipcodeState={this.state.zipcode} zipcode={this.zip.bind(this)} />
    } else if (view === 'opportunities') {
      return <OpsList numOfPages={this.state.howManyPages} passDownOpps={this.passDownOpps} volunteerForOpp={this.volunteerForOpp} opportunities={this.state.oppsToPassDown} setOpsListView={this.setOpsListView} />
    } else if (view === 'loadAllMarkers') {
      return <LoadAllMarkers opportunities={this.state.opportunities} />
    } else if (view === 'filtedOpps') {
      return <OpsList volunteerForOpp={this.volunteerForOpp} opportunities={this.state.filtedOpps} setOpsListView={this.setOpsListView} />
    } else if (view === 'myOpportunities') {
      return <OpsList opportunities={this.state.filtedOpps} setOpsListView={this.setOpsListView} />
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <NavBar
            changeView={this.changeView}
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            isLoggedInToggleForTesting={this.isLoggedInToggleForTesting}
            isOrganization={this.state.isOrganization}
            logOut={this.logOut}
            orginizationLoggedIn={this.orginizationLoggedIn}
            myOppotunities={this.myOppotunities}
          />
          {this.renderView()}
        </div>
      </ Provider>
    );
  }
};

export default App;