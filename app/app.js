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
      return (
        <div className="container">
          <Filter />
          <ElementList data={this.state.data} openSingleElement={this.openSingleElement} />
        </div>
      );
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
        <div className="row zero">
          <a className="element empty">
            <p className="label">Group&#8594;</p>
            <p className="label">Period&#8595;</p>
          </a>
          <a className="element empty">
            <p className="label">1</p>
            <p className="label">IA</p>
          </a>
          <a className="element empty">
            <p className="label">2</p>
            <p className="label">IIA</p>
          </a>
          <a className="element empty">
            <p className="label">3</p>
            <p className="label">IIIB</p>
          </a>
          <a className="element empty">
            <p className="label">4</p>
            <p className="label">IVB</p>
          </a>
          <a className="element empty">
            <p className="label">5</p>
            <p className="label">VB</p>
          </a>
          <a className="element empty">
            <p className="label">6</p>
            <p className="label">VIB</p>
          </a>
          <a className="element empty">
            <p className="label">7</p>
            <p className="label">VIIB</p>
          </a>
          <a className="element empty">
            <p className="label">8</p>
            <p className="label">&#x2500;</p>
          </a>
          <a className="element empty">
            <p className="label">9</p>
            <p className="label">VIIIB</p>
          </a>
          <a className="element empty">
            <p className="label">10</p>
            <p className="label">&#x2500;</p>
          </a>
          <a className="element empty">
            <p className="label">11</p>
            <p className="label">IB</p>
          </a>
          <a className="element empty">
            <p className="label">12</p>
            <p className="label">IIB</p>
          </a>
          <a className="element empty">
            <p className="label">13</p>
            <p className="label">IIIA</p>
          </a>
          <a className="element empty">
            <p className="label">14</p>
            <p className="label">IVA</p>
          </a>
          <a className="element empty">
            <p className="label">15</p>
            <p className="label">VA</p>
          </a>
          <a className="element empty">
            <p className="label">16</p>
            <p className="label">VIA</p>
          </a>
          <a className="element empty">
            <p className="label">17</p>
            <p className="label">VIIA</p>
          </a>
          <a className="element empty">
            <p className="label">18</p>
            <p className="label">VIIIA</p>
          </a>
        </div>
        <div className="row one">
          <a className="element empty period">1</a>
          {elementNodes.slice(0,1)}
          {empty_fields.slice(0,16)}
          {elementNodes.slice(1,2)}
        </div>
        <div className="row two">
          <a className="element empty period">2</a>
          {elementNodes.slice(2,4)}
          {empty_fields.slice(0,10)}
          {elementNodes.slice(4,10)}
        </div>
        <div className="row three">
          <a className="element empty period">3</a>
          {elementNodes.slice(10,12)}
          {empty_fields.slice(0,10)}
          {elementNodes.slice(12,18)}
        </div>
        <div className="row four">
          <a className="element empty period">4</a>
          {elementNodes.slice(18,36)}
        </div>
        <div className="row five">
          <a className="element empty period">5</a>
          {elementNodes.slice(36,54)}
        </div>
        <div className="row six">
          <a className="element empty period">6</a>
          {elementNodes.slice(54,57)}
          {elementNodes.slice(57,72)}
        </div>
        <div className="row seven">
          <a className="element empty period">7</a>
          {elementNodes.slice(72,75)}
          {elementNodes.slice(75,90)}
        </div>
        <div className="spacer"></div>
        <div className="row lanthanide">
          {empty_fields.slice(0,3)}
          {elementNodes.slice(90,105)}
          {empty_fields.slice(0,1)}
        </div>
        <div className="row actinide">
          {empty_fields.slice(0,3)}
          {elementNodes.slice(105)}
          {empty_fields.slice(0,1)}
        </div>
      </div>
    );
  }
});

var Element = React.createClass({
  render: function() {
    return (
      <a className={"element "+this.props.group} onClick={this.props.openSingleElement}>
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


// Filter

var Filter = React.createClass({
  allElementsClass: function(){
    $('.element').removeClass('mute-element');
    $('.noble-gas').removeClass("noble-gas-highlighted");
    $('.alkali-metal').removeClass("alkali-metal-highlighted");
  },
  nobleGasClass: function(){
    $('.element').addClass('mute-element');
    $('.noble-gas').toggleClass("noble-gas-highlighted");
  },
  alkaliMetalClass: function(){
    $('.element').addClass('mute-element');
    $('.alkali-metal').toggleClass("alkali-metal-highlighted");
  },
  render: function() {
    return (
      <div className="filter">
        <div id="filterComponent">
          <form className="filter-form">
            <label id="radio-element">
              <input type="radio" id="input-radio" name="all-elements" value="all" onClick={this.allElementsClass} />
              <span id="filter-label-all">All Elements</span>
            </label>
            <hr id="hr-primary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="noble-gas" value="all" onClick={this.nobleGasClass} />
              <span id="filter-label">Noble Gases</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="alkali-metal" value="all" onClick={this.alkaliMetalClass} />
              <span id="filter-label">Alkali Metals</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Alkaline Earth Metals</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Transition Metals</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Post-Transition Metals</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Polyatomic Non-Metals</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Diatomic Non-Metals</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Metalloids</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Actinides</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
              <input type="radio" id="input-radio" name="filter-select" value="all" />
              <span id="filter-label">Lanthanides</span>
            </label>
          </form>
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
