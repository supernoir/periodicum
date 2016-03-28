'use strict'

var items = [
 { name: 'Hydrogen', symbol: 'H' },
 { name: 'Magnesium', symbol: 'Mg' },
 { name: 'Aurum', commonname: 'Gold', symbol: 'Au' },
 { name: 'Uranium', symbol: 'U' }
];

var RepeatModule = React.createClass({
 getDefaultProps: function() {
  return { items: [] }
 },
 render: function() {

  var listItems = this.props.items.map(function(item) {
   return (
    <div className="card">
        <div className="card-content">
            <p className="title is-1" key={item.symbol}>{item.symbol}</p>
            <p className="title is-3" key={item.name}>{item.name}</p>
            <p className="subtitle is-3" key={item.commonname}>{item.commonname}</p>
        </div>
    </div>
   );
  });

  return (
   <div className='elementModule' >
     {listItems}
   </div>
  );
 }
});

ReactDOM.render(<RepeatModule items={items} />,     
 document.getElementById('react-content'));