
import React from 'react';
import Ops from './Ops.jsx';


import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Filter from './Filter.jsx';


//First render the props.opportunities view,
// if the user clicks the filter submit button on Filter.jsx, render the filter view.
class OpsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'opportunities'
    }
  }

   changeView(option) {

    if (this.state.view !== option) {
      this.setState({
        view: option
      });
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="opportunity">
        <Container>
          <Row>
            <Col xs="8">
              {this.props.opportunities.map(op => { return <Ops volunteerForOpp={this.props.volunteerForOpp} key={op._id} opportunity={op} /> })}

              <Pagination aria-label="Opportunities navigation">
                {this.props.numOfPages.map(function (page) {
                  return (
                    <PaginationItem onClick={() => this.props.passDownOpps(page + 1)}>
                      <PaginationLink>
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }.bind(this))}
              </Pagination>
            </Col>
            <Col xs="4">
              {/* <Filter opps={this.props.opportunities} filtedOpps={this.props.filtedOpps}/> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default OpsList;






