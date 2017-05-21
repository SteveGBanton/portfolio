import { PropTypes, Component } from 'react'

const resorts = [
  "Winter Park Ski Resort ",
  "Whitewater ",
  "Whitefish Mountain Resort ",
  "Whistler ",
  "Vail Ski Resort ",
  "Telluride Ski Resort ",
  "Taos Ski Resort ",
  "Steamboat Ski Resort ",
  "Squaw Valley ",
  "Solitude Mountain Resort ",
  "Snowbird ",
  "Revelstoke ",
  "Park City Mountain Resort ",
  "Mammoth ",
  "Loveland Ski Area ",
  "Kirkwood ",
  "Keystone Resort ",
  "Jackson Hole ",
  "Grand Targhee ",
  "Fernie Alpine Resort ",
  "Deer Valley Resort ",
  "Copper Mountain ",
  "Breckenridge Ski Resort ",
  "Big Sky Resort ",
  "Beaver Creek Resort ",
  "Aspen Snowmass ",
  "Aspen Mountain - Ajax ",
  "Aspen Highlands ",
  "Alyeska Resort ",
  "Alta Ski Area "
]

class Autocomplete extends Component {

get value() {
  return this.refs.inputResort.value
}

set value(inputValue) {
  this.refs.inputResort.value = inputValue
}

render() {
  return (
    <div>
      <input ref='inputResort' type='text' list='na-resorts' />
      <datalist id='na-resorts'>
        {this.props.options.map(
          (opt, i) =>
          <option key={i}>{opt}</option>
        )}
      </datalist>
    </div>
  )

}

}

export const AddDayForm = ({resort, date, powder, backcountry, onNewDay }) => {

let _resort, _date, _powder, _backcountry

  const todaysDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    return yyyy+'-'+mm+'-'+dd
  }

  const submit = (e) => {
     e.preventDefault()
     onNewDay({
       resort: _resort.value,
       date: _date.value,
       powder: _powder.checked,
       backcountry: _backcountry.checked
     })
     _resort.value = ''
     _date.value = ''
     _powder.checked = false
     _backcountry.checked = false
   }


    return (
      <form onSubmit={submit} className="add-day">
        <label htmlFor='resort'>Resort Name</label>
        <Autocomplete options={resorts}
        ref={input => _resort = input}/>
        <label htmlFor='date'>Date</label>
        <input id='date' type='date' required
            defaultValue={todaysDate()}
            ref={input => _date = input}/>

        <div>
          <input id='powder' type='checkbox'
          ref={input => _powder = input}/>
          <label htmlFor='powder'>Powder Day</label>
        </div>
        <div>
          <input id='backcountry' type='checkbox'
          ref={input => _backcountry = input}/>
          <label htmlFor='backcountry'>Backcountry Day</label>
        </div>
        <button>Add Day</button>

      </form>
    )

}


AddDayForm.defaultProps = {
  resort: "None",
  powder: false,
  backcountry:  false,
  date: '2017-02-12'
}

AddDayForm.propTypes = {
  resort: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  powder: PropTypes.bool.isRequired,
  backcountry:  PropTypes.bool.isRequired
}
