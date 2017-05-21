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
          .force("y", d3.forceY(height / 2))
          .force("x", d3.forceX(width / 2))


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
    <div id='home' className='display'>

      <h1>Home</h1>

    </div>
  )
}

const About = ({  }) => {

		return (
			<div id='about' className='display'>

        <h1>Hi, Im Steve Banton.

        I build full stack javascript applications for desktop and mobile.</h1>

        <h2>Technologies I work with:</h2>

        <div>Front-End</div>
        <div>Data Visualization</div>
        <div>Back-End</div>




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

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie aliquam velit id fermentum. Duis elit odio, fringilla vel porta non, ultricies id nunc. Morbi tristique dolor magna, vitae dictum massa rutrum non. Etiam rhoncus dictum nibh, id porta nunc varius tristique. Etiam arcu arcu, dictum ac cursus sed, sollicitudin in elit. Nam pretium aliquam arcu. Nunc semper dui iaculis blandit aliquet. Mauris faucibus, ligula sit amet maximus gravida, elit justo imperdiet augue, quis egestas velit velit id sem. Sed id semper libero. Nunc semper id metus vitae pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mi ipsum, tempor non accumsan id, tristique non neque.</p>

<p>Donec felis risus, condimentum sit amet risus ut, commodo lacinia mauris. Integer ut sollicitudin metus, in accumsan nisi. Praesent id odio ultricies, placerat ipsum a, aliquet velit. Vivamus ultricies pretium velit, a tempor nulla interdum eget. Nulla sapien urna, accumsan ac molestie sit amet, scelerisque non sapien. Curabitur nisl nisl, sodales tempus accumsan eget, rutrum luctus erat. Aenean vel libero ultrices, laoreet ante vel, tempor dolor. Aliquam bibendum quam leo, eu porttitor nisi bibendum sit amet. Nulla condimentum sem ac nisi euismod tempus. Sed lacus tortor, eleifend et ultricies at, mollis et ligula. Sed suscipit, risus at semper maximus, odio mi varius tellus, non laoreet justo leo ut erat. Donec imperdiet hendrerit urna sed sagittis. Curabitur bibendum consectetur enim, sit amet luctus neque venenatis quis. Integer ac magna consectetur, efficitur sem vitae, tempor enim. Quisque metus lacus, mattis quis diam eu, ultrices mollis tellus. Sed dictum nec nisi vitae convallis.</p>

<p>Vestibulum egestas rhoncus facilisis. Morbi quis ipsum sed nunc luctus tincidunt. Duis vel purus sapien. Maecenas ultrices sit amet eros quis vestibulum. Sed euismod enim in ipsum hendrerit tristique. Suspendisse feugiat consectetur enim, ac suscipit risus blandit ac. Cras aliquet dictum elit, sit amet porta erat condimentum vel. Pellentesque nulla nisl, sollicitudin ut urna vitae, rhoncus vulputate dui. Mauris et gravida mi. Duis lacinia facilisis neque in vestibulum.</p>

<p>Nunc rutrum at justo a dapibus. Phasellus consectetur libero sit amet elit varius faucibus. Mauris vel ultricies enim. Praesent in laoreet quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vitae leo pellentesque, porttitor quam sed, condimentum turpis. Maecenas efficitur velit sit amet ex vehicula elementum. Mauris consequat maximus risus vitae tempus. Vivamus vitae diam elit. Donec efficitur egestas molestie. Nunc lobortis eget leo a commodo. Nullam sem nunc, aliquet ac mattis maximus, suscipit quis massa. Vestibulum mollis dictum justo vitae mollis. Nunc mollis ornare tortor, id volutpat est aliquam vitae. Praesent pretium sapien quis lectus pellentesque efficitur. Maecenas semper lorem et ipsum semper fringilla.</p>

<p>Mauris a velit eget lectus bibendum mollis. Nulla maximus molestie nunc eget cursus. Morbi semper, dolor ut ultrices dapibus, purus mi vehicula leo, vitae semper urna sem eget quam. Suspendisse nec pharetra augue, imperdiet vulputate quam. Nunc tristique condimentum facilisis. Nunc turpis lacus, pretium nec convallis ut, auctor sed enim. Sed id hendrerit risus.</p>

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
