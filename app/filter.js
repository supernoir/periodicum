'use strict'

var Filter = React.createClass({
        
    unmuteClass: function(){
        $('.element').addClass('mute-me');
                
    },
  render: function() {
    return (
<form className="filter-form">
            <div id="radio-element">
                <input type="radio" id="input-radio" name="filter-select" value="all" />
                <span id="filter-label-all">All Elements</span>
            </div>
            <hr id="hr-primary" />
            <label id="radio-element">
                <input type="radio" id="input-radio" name="filter-select" value="all" onClick={this.unmuteClass} />
                <span id="filter-label">Noble Gases</span>
            </label>
            <hr id="hr-secondary" />
            <label id="radio-element">
                <input type="radio" id="input-radio" name="filter-select" value="all" />
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
