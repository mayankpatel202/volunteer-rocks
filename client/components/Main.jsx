import React from 'react';

const Main = (props) => (
  <React.Fragment>
    <header className="masthead text-white text-center">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <h3 className="mb-5">Search for volunteer opportunities in your area now!</h3>
          </div>
          <div className="col-lg-6 mx-auto">
            <form>
              <div className="form-row">
                <div className="col-12 col-md-9 mb-2 mb-md-0">
                  <input type="text" className="form-control form-control-sm" placeholder="Enter your zip code..." onChange={props.zipcode.bind(this)} />
                </div>
                <div className="col-12 col-md-3">
                  <button type="submit" className="btn btn-block btn-sm btn-primary" onClick={(e) => props.getOpp(e, props.zipcodeState)}>Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
    <section className="showcase">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-6 order-lg-2 text-white showcase-img image1"></div>
          <div className="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>Easily Search for Volunteer Opportunities</h2>
            <p className="lead mb-0">Start searching by entering your zip code. You'll be able to find the perfect volunteering opportunity in your area.</p>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-6 text-white showcase-img image2" ></div>
          < div className="col-lg-6 my-auto showcase-text" >
            <h2>Sign Up Today</h2>
            <p className="lead mb-0">You'll have access to our awesome filters!  Just click on your user icon once you're signed in to view a map of opportunities in your area.</p>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-6 order-lg-2 text-white showcase-img image3"></div>
          <div className="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>Tell your friends!</h2>
            <p className="lead mb-0">Let your friends know about us! Volunteering is a great way to spend time with friends or family.</p>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
);

export default Main;