import React from 'react'
var Redux = require('redux')
import { render } from 'react-dom'
import './stylesheets/index.scss'
var d3 = require('d3')
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
const { Component } = React
const { combineReducers, createStore } = Redux

const forceLayout = () => {

      var width = 300,
          height = 150,
          circleWidth = 10,
          tooltip = d3.select('body')
          .append('div')
          .style('background', 'white')
          .style('font-size', '10px')
          .style('line-height', '100%')
          .style('position', 'absolute')
          .style('padding', '5px')
          .style('border-radius', '3px')
          .style('opacity', '0')
          .style('z-index', '2')

      var nodes = [
          {
              "title": "Email",
              "code": "\uf0e0",
              "link": "mailto:contact@stevebanton.com"
          },
          {
              "title": "Github",
              "code": "\uf09b",
              "link": "http://github.com"
          },
          {
              "title": "Facebook",
              "code": "\uf230",
              "link": "http://facebook.com"
          },
          {
              "title": "Twitter",
              "code": "\uf099",
              "link": "http://twitter.com"
          }
      ];

      var links = [
          {
              "target": 0,
              "source": 1
          },
          {
              "target": 1,
              "source": 2
          },
          {
              "target": 2,
              "source": 3
          },
        {
              "target": 3,
              "source": 0
          }
      ]

      var myChart = d3.select("#chart3")
          .append('svg')
          .attr('width', width)
          .attr('height', height)


      //start simulation
      var simulation = d3.forceSimulation()
          .nodes(nodes)
          .force("link", d3.forceLink(links).distance(90))
          .force("collide", d3.forceCollide(20))
          .force('charge', d3.forceManyBody().strength(-100))
          .force("center", d3.forceCenter(width / 2, height / 2))
          .alpha(0.1)

      //add links
      var link = myChart.selectAll('line')
          .data(links).enter()
          .append('line')
          .attr('stroke-dasharray', '2, 2')
          .attr('stroke', 'white')
          .attr('opacity', '0.3')

      //add notes
      var node = myChart
          .selectAll('circle')
          .data(nodes).enter()
          .append('g')
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      //Add icon
      node.append('a')
        .attr('href', function(d) {return d.link})
        .attr('target', '_blank')
        .append('text')
        .attr('class', 'icons')
        .attr('font-family', 'FontAwesome')
        .attr('font-size', '30px')
        .attr('transform', 'translate(-20,20)')
        .text(function(d) { return d.code });

        //Add tooltip
      node.on('mouseover', function(d, i) {
              d3.select('text')
                  .classed('highlight', true)

              tooltip.transition()
                  .style('opacity', '1')
              tooltip.html(d['title'])
                  .style('left', d3.event.pageX + 8 + 'px')
                  .style('top', d3.event.pageY - 30 + 'px')

          })
          .on("mousemove", function() {
              return tooltip.style("top", (d3.event.pageY - 30) + "px").style("left", (d3.event.pageX + 8) + "px");
          })
          .on('mouseout', function(d, i) {
              d3.select(this).select('image')
                  .classed('highlight', false)

               tooltip.transition().style('opacity', '0')
          })


      //animate as simulation progresses
      simulation.on('tick', function(e) {
          node.attr('transform', function(d, i) {
              return 'translate(' + d.x + ', ' + d.y + ')';
          })

          link
              .attr('x1', function(d) {
                  return d.source.x
              })
              .attr('y1', function(d) {
                  return d.source.y
              })
              .attr('x2', function(d) {
                  return d.target.x
              })
              .attr('y2', function(d) {
                  return d.target.y
              })

      })



  //dragging
      function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
      }

      function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
      }

      function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
      }



  }



//==============================//
//Loading of Intital State
//Default data used if nothing in localStorage
//==============================//

//localStorage.clear()

const defaultData = {
  current: 'home', //second field: editing on or off
}

const initialState = (localStorage['sb_recipe_state']) ? JSON.parse(localStorage['sb_recipe_state']) : defaultData;


//==============================//
//Actions List
//==============================//

const C = {
  SCREEN_DISPLAYED: 'SCREEN_DISPLAYED',
}

//==============================//
//Reducers
//==============================//

const current = (state=['home'], action) => {

  if (action.type === C.SCREEN_DISPLAYED) {
    return action.payload
  } else {
    return state
  }

}


//Combine all reducers to appReducer

const appReducer = combineReducers({
  current
})


//==============================//
//Creating Store & Subscribe to log state to localStorage
//==============================//

const store = createStore(appReducer, initialState)

store.subscribe(() => {
  const state = JSON.stringify(store.getState())
})

//==============================//
//Action Creators
//==============================//

const changeDisplay = (displayed) => {

  return {
      type: C.SCREEN_DISPLAYED,
      payload: displayed
  }
}

//==============================//
//REACT COMPONENTS
//==============================//

const Home = ({  }) => {

  return (
    <div id='about' className='display'>

      <h1>Hi, Im <span id='highlight'>Steve Banton</span>.

      I build JavaScript applications for desktop and mobile.</h1>

      <h2>Technologies I work with:</h2>

      <div id='techtable'>
        <div className='header'>
          <div className='header-text'>Front-End:</div>
          <div className='skill'>React.js / Redux</div>
          <div className='skill'>React Native<span id='sub-note'><br/>iOS / Android Development</span></div>
          <div className='skill'>D3.js</div>
          <div className='skill'>jQuery</div>
          <div className='skill'>CSS / SCSS</div>
          <div className='skill'>HTML</div>
        </div>
        <div className='header'>
          <div className='header-text'>Back-End:</div>
          <div className='skill'>Node.js</div>
          <div className='skill'>Express.js</div>
          <div className='skill'>MongoDB</div>
        </div>

        <div className='header'>
          <div className='header-text'>More:</div>
          <div className='skill'>NPM</div>
          <div className='skill'>Git</div>
          <div className='skill'>Webpack</div>
          <div className='skill'>Babel</div>
        </div>
      </div>
    </div>
  )
}


const Services = ({  }) => {

		return (
			<div id='services' className='display'>

        <h1>Services</h1>

      </div>
		)
}


const Work = ({  }) => {

		return (
			<div id='work' className='display'>

        <h1>Work</h1>

        
      </div>
		)
}


const Contact = ({  }) => {

  return (
    <div id='contact' className='display'>

      <h1>Contact</h1>

<p>Have a web project</p>


    </div>
  )

}

//Major Windows, Called From Parent

const Menu = () => {

		return (
			<div id="menu">

        <img className='header-image' src='steve.png' width='150' />

        <p className='label-text'>Steve Banton</p>
        <p className='label-text'>Full Stack Web & Mobile Developer</p>

        <p className='spacer'></p>

        <p className='menuitem' onClick={() => {

        store.dispatch(
          changeDisplay('home')
          )

        }}>$ Home</p>

        <p className='menuitem' onClick={() => {

        store.dispatch(
          changeDisplay('work')
          )

        }}>$ Work</p>

        <p className='menuitem' onClick={() => {

        store.dispatch(
          changeDisplay('contact')
          )

        }}>$ Contact Me<span id='blink'> _</span></p>
        <br />

        <div id="chart3"></div>



        <p className='created-with'>Created with [<br/>&nbsp;&nbsp;'React', <br/>&nbsp;&nbsp;'Redux', <br/>&nbsp;&nbsp;'D3', <br/>&nbsp;&nbsp;'<i className="fa fa-coffee"></i>', <br/>&nbsp;&nbsp;'<i className="fa fa-heart"></i> for Terminal'<br/>]</p>



        </div>
		)
}

const View = ({ current }) => {

 let details = {}

 let title = '',
     ingredients = [],
     directions = '',
     indexNumber = ''

		return (
			<div id="view">

        {(current === 'home') ? <Home /> : (current === 'about') ? <About /> : (current === 'services') ? <Services /> :(current === 'work') ? <Work /> : (current === 'contact') ? <Contact /> : <Home />}

      </div>
		)
}


//Parent container, contains state methods

class App extends Component {

//constructor

  componentWillMount () {

  }

  componentDidMount () {
    store.subscribe(this.storeChange)
  }

  constructor (props) {
    super(props)
    this.state = {
      current: initialState.current,
    }
    this.storeChange = this.storeChange.bind(this)
  }

//methods

 storeChange () {
   this.setState({
     current: store.getState().current
   })
   //console.log(store.getState())
   //console.log(JSON.stringify(this.state))
 }

 render() {
    return (
      <div className="app">
        <Menu />
        <View current={this.state.current} />
      </div>
    )
  }
}

//Parent render
render(
	<App />
,
	document.getElementById('react-container')
)

forceLayout()
