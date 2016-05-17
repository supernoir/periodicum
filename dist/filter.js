'use strict'

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
    );
  }
});

ReactDOM.render(
  <Filter />,
  document.getElementById('filterComponent')
);
