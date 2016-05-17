'use strict'

//var Modal = require('react-modal');

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
        <ElementList data={this.state.data} />
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
      <a href="single-element.html" className={"element "+this.props.group}>
        <p className="symbol">{this.props.symbol}</p>
        <p className="atomic-number">{this.props.number}</p>
        <p className="name">{this.props.name}</p>
      </a>
    );
  }
});

// --- Modal

var App = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>
      </div>
    );
  }
});

// Render DOM

ReactDOM.render(
  <PeriodicTable url="http://localhost:8787/public/elements.json" pollInterval={5000} />,
  document.getElementById('react-content')
);
