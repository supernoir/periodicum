'use strict'

var PeriodicTable = React.createClass({
  getInitialState: function() {
    return {data: []};
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
  render: function() {
    return (
      <div className="periodicTable">
        <ElementList data={this.state.data} />
      </div>
    );
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
    return (
      <div className="elementList">
        {elementNodes}
      </div>
    );
  }
});

var Element = React.createClass({
  render: function() {
    return (
      <a class="element" id={this.props.group}>
        <p class="symbol">{this.props.symbol}</p>
        <p class="atomic-number">{this.props.number}</p>
        <p class="name">{this.props.name}</p>
      </a>
    );
  }
});

ReactDOM.render(
  <PeriodicTable url="http://localhost:8787/public/elements.json" pollInterval={5000} />,
  document.getElementById('react-content')
);
