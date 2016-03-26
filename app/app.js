'use strict'

var myJSON = [
    {"name":"Aurum","symbol":"Au"},
    {"name":"Hydrogen","symbol":"H"}
    ];




var TheElement = React.createClass({
  render: function() {
    return (
      <div className="TheElement">
        <div className="card">
            <div className="card-content">
                <div className="content">
                { this.props.allElements.map(function(item) {
                    return <div>{item}</div>
                    })
                }
                </div>
            </div>
        </div>
      </div>
    );
  }
});

var allElements = ["Aurum","Magnesium","Hydrogen"];

ReactDOM.render(
  <TheElement allElements={ allElements }/>,
  document.getElementById('ElementComponent')
);
