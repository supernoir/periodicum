'use strict'

var PeriodicTable = React.createClass({
  getInitialState: function() {
    return {data: [], visible: 'index'};
  },
  loadElementsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadElementsFromServer();
    setInterval(this.loadElementsFromServer, this.props.pollInterval);
  },
  openSingleElement: function() {
    this.setState({visible: 'element'});
  },
  closeSingleElement: function() {
    this.setState({visible: 'index'});
  },
  render: function() {
    if (this.state.visible === 'index') {
      return <ElementList data={this.state.data} openSingleElement={this.openSingleElement}/>
    } else {
      return <SingleElement closeSingleElement={this.closeSingleElement}/>
    }
  }
});

var ElementList = React.createClass({
  render: function() {
    var elementNodes = this.props.data.map(function(element) {
      return (
        <Element group={element.group} symbol={element.symbol} number={element.number} name={element.name}>
        </Element>
      );
    });

    var empty_field = <a className="element empty"></a>;
    var empty_fields = [];
    for (var i = 0; i < 20; i++) {
      empty_fields.push(empty_field);
    }

    return (
      <div className="periodic-table" onClick={this.props.openSingleElement}>
        <div className="row one">
          {elementNodes.slice(0,1)}
          {empty_fields.slice(0,16)}
          {elementNodes.slice(1,2)}
        </div>
        <div className="row two">
          {elementNodes.slice(2,4)}
          {empty_fields.slice(0,10)}
          {elementNodes.slice(4,10)}
        </div>
        <div className="row three">
          {elementNodes.slice(10,12)}
          {empty_fields.slice(0,10)}
          {elementNodes.slice(12,18)}
        </div>
        <div className="row four">
          {elementNodes.slice(18,36)}
        </div>
        <div className="row five">
          {elementNodes.slice(36,54)}
        </div>
        <div className="row six">
          {elementNodes.slice(54,57)}
          {elementNodes.slice(57,72)}
        </div>
        <div className="row seven">
          {elementNodes.slice(72,75)}
          {elementNodes.slice(75,90)}
        </div>
        <div className="spacer"></div>
        <div className="row lanthanide">
          {elementNodes.slice(90,105)}
        </div>
        <div className="row actinide">
          {elementNodes.slice(105)}
        </div>
      </div>
    );
  }
});

var Element = React.createClass({
  render: function() {
    return (
      <a className="element" id={this.props.group}>
        <p className="symbol">{this.props.symbol}</p>
        <p className="atomic-number">{this.props.number}</p>
        <p className="name">{this.props.name}</p>
      </a>
    );
  }
});

var SingleElement = React.createClass({
  render: function() {
    return (
      <div className="single-element element-content">
        <a onClick={this.props.closeSingleElement} className="close"><i className="fa fa-times" aria-hidden="true"></i>
</a>
        <div className="element-header">
          <div className="element-header-image">
            <img src="img/xenon.jpg" className="element-image" />
          </div>
          <div className="element-header-content">
            <h1>Xenon</h1>
            <table className="element-table">
              <tbody>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Symbol</td>
                  <td className="element-table-cell">Xe</td>
                </tr>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Group</td>
                  <td className="element-table-cell">Noble Gas</td>
                </tr>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Number</td>
                  <td className="element-table-cell">54</td>
                </tr>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Molar</td>
                  <td className="element-table-cell">131.293</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="element-body">
          <p>Xenon is a chemical element with symbol Xe and atomic number 54. It is a colorless, dense, odorless noble gas, that occurs in the Earth's atmosphere in trace amounts. Although generally unreactive, xenon can undergo a few chemical reactions such as the formation of xenon hexafluoroplatinate, the first noble gas compound to be synthesized. Xenon is used in flash lamps and arc lamps, and as a general anesthetic. Xenon is also being used to search for hypothetical weakly interacting massive particles and as the propellant for ion thrusters in spacecraft. Naturally occurring xenon consists of eight stable isotopes.</p>
        </div>
        <div className="element-footer">
          <p>
            <a href="#" className="element-tag">Noble Gas</a>
            <a href="#" className="element-tag">Flourescent</a>
          </p>
        </div>
      </div>
    );
  }
});


// Render DOM

ReactDOM.render(
  <PeriodicTable url="http://localhost:8787/public/elements.json" pollInterval={5000} />,
  document.getElementById('react-content')
);
