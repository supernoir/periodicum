'use strict'

var PeriodicTable = React.createClass({
  getInitialState: function() {
    return {data: [], element: [], visible: 'index'};
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
  openSingleElement: function(index) {
    this.setState({visible: 'element', element: this.state.data[index]});
  },
  closeSingleElement: function() {
    this.setState({visible: 'index'});
  },
  render: function() {
    if (this.state.visible === 'index') {
      return <ElementList data={this.state.data} openSingleElement={this.openSingleElement} />
    } else {
      return <SingleElement closeSingleElement={this.closeSingleElement} name={this.state.element.name}
              symbol={this.state.element.symbol} group={this.state.element.group}
              number={this.state.element.number} molar={this.state.element.molar}
              text={this.state.element.text} img={this.state.element.img}
              imgTitle={this.state.element.img_title} />
    }
  }
});

var ElementList = React.createClass({
  render: function() {
    var self = this;
    var elementNodes = this.props.data.map(function(element, index) {
      return (
        <Element group={element.group} symbol={element.symbol} number={element.number}
                 name={element.name} openSingleElement={self.props.openSingleElement.bind(self, index)}>
        </Element>
      );
    });

    var empty_field = <a className="element empty"></a>;
    var empty_fields = [];
    for (var i = 0; i < 20; i++) {
      empty_fields.push(empty_field);
    }

    return (
      <div className="periodic-table">
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
      <a className="element" id={this.props.group} onClick={this.props.openSingleElement}>
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
            <img src={this.props.img} className="element-image" />
            <p className="element-image-label">{this.props.imgTitle}</p>
          </div>
          <div className="element-header-content">
            <h1>{this.props.name}</h1>
            <table className="element-table">
              <tbody>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Symbol</td>
                  <td className="element-table-cell">{this.props.symbol}</td>
                </tr>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Group</td>
                  <td className="element-table-cell">{this.props.group}</td>
                </tr>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Number</td>
                  <td className="element-table-cell">{this.props.number}</td>
                </tr>
                <tr className="element-table-row">
                  <td className="element-table-cell-label">Molar</td>
                  <td className="element-table-cell">{this.props.molar}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="element-body">
          <p>{this.props.text}</p>
        </div>
        <div className="element-footer">
          <p>
            <a href="#" className="element-tag">{this.props.group}</a>
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
