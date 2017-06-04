import React from 'react'
var Redux = require('redux')
import { render } from 'react-dom'
import './stylesheets/index.scss'
var d3 = require('d3')
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
const { Component } = React
const { combineReducers, createStore } = Redux


//==============================//
//Loading of Intital State
//Default data used if nothing in localStorage
//==============================//

//localStorage.clear()

const defaultData = {
  current: 'home', //second field: editing on or off
  tags: [['react', 'on'],['redux','on'],['d3', 'on'],['jquery', 'on'],['node','on'],['express','on'],['wordpress', 'on']],
  projects: [
    {
      title: "BoldPointStudio.com",
      image: "./images/portfolio/boldpoint.jpg",
      description: "Responsive single page website for Boldpoint Studio, a design and marketing firm based in Toronto. Website built from scratch using only jQuery.",
      tags: ['jquery'],
      link: "http://www.boldpointstudio.com",
      github: ""
    },
    {
      title: "Recipe Box",
      image: "./images/portfolio/recipe.jpg",
      description: "An editable recipe box created with React, Redux and Material Design. Add and edit recipes, with functionality to quickly add and delete ingredients one by one.",
      tags: ['react','redux'],
      link: "http://stevebanton.com/recipe-box",
      github: "https://github.com/SteveGBanton/recipe-box"
    },
    {
      title: "Animated Link Graph: All Countries Sharing A Border",
      image: "./images/portfolio/force-directed.jpg",
      description: "A D3.js force directed graph of states that share a land or water border. WARNING: Slow on most mobile devices.",
      tags: ['d3'],
      link: "http://stevebanton.com/force-graph-countries",
      github: "https://github.com/SteveGBanton/force-graph-countries"
    },
    {
      title: "Instant Markdown Previewer",
      image: "./images/portfolio/markdown.jpg",
      description: "An instant markdown previewer built in React.js. When you type markdown, the formatted version is instantly printed to the screen.",
      tags: ['react'],
      link: "http://stevebanton.com/markdown-previewer",
      github: "https://github.com/SteveGBanton/markdown-previewer"
    },
    {
      title: "Responsive Simon Game",
      image: "./images/portfolio/simon.jpg",
      description: "A Simon game built using jQuery and the AudioContext API for button tones.",
      tags: ['jquery'],
      link: "http://stevebanton.com/simon-responsive",
      github: "https://github.com/SteveGBanton/simon-responsive"
    },
    {
      title: "Wikipedia Search Page",
      image: "./images/portfolio/wikipedia.jpg",
      description: "A Wikipedia search page that uses the Wikipedia API to call search results before leaving the site.",
      tags: ['jquery'],
      link: "https://codepen.io/stevesacct/pen/OWdaGe",
      github: ""
    },
    {
      title: "Heatmap Graph: Global Land Surface Temperatures",
      image: "./images/portfolio/heatmap.jpg",
      description: "An reuasable, animated D3.js heatmap graph of monthly land surface temperature data graphed from 1753 - 2015, with data tooltip on hover.",
      tags: ['d3'],
      link: "http://stevebanton.com/heatmaps-global-temps",
      github: "https://github.com/SteveGBanton/heatmaps-global-temps"
    },
    {
      title: "Dynamic Bar Graph: US GDP By Quarter",
      image: "./images/portfolio/bar-graph.jpg",
      description: "An reuasable, animated D3.js bar graph of the US GDP by quarter since 1947, with data tooltip on hover.",
      tags: ['d3'],
      link: "http://stevebanton.com/bar-graph-us-gdp",
      github: "https://github.com/SteveGBanton/bar-graph-us-gdp"
    },
    {
      title: "Pomodoro Clock",
      image: "./images/portfolio/pomodoro.jpg",
      description: "A simple pomodoro clock that allows you to add minutes on the fly.",
      tags: ['jquery'],
      link: "https://codepen.io/stevesacct/pen/jBqyOz",
      github: ""
    },
    {
      title: "Dynamic Scatterplot Graph: Doping in Pro Cycling",
      image: "./images/portfolio/scatter.jpg",
      description: "An reuasable, animated D3.js scatterplot graph of doping in pro cycling, with tooltip on hover.",
      tags: ['d3'],
      link: "http://stevebanton.com/scatterplot-cycling",
      github: "https://github.com/SteveGBanton/scatterplot-cycling"
    },
    {
      title: "Reusable Vector Map: Meteorite Landings Mapped",
      image: "./images/portfolio/world-map.jpg",
      description: "A visualization of all meteorites that have every been recorded, mapped to their landing location. Zoomable map & tooltip on hover shows extra data about each meteorite.",
      tags: ['d3'],
      link: "http://stevebanton.com/world-plot",
      github: "https://github.com/SteveGBanton/world-plot"
    },
    {
      title: "Timestamp Service",
      image: "./images/portfolio/timestamp.jpg",
      description: "A simple timestamp service that returns a time in unix and standard format when either are supplied.",
      tags: ['node', 'express'],
      link: "https://simple-timestamp-service.herokuapp.com/",
      github: "https://github.com/SteveGBanton/timestamp-service"
    },
    {
      title: "AlbionLandscaping.Net",
      image: "./images/portfolio/albion.jpg",
      description: "A website for a local landscaping business in the Toronto area, built using Wordpress.",
      tags: ['wordpress'],
      link: "http://AlbionLandscaping.Net",
      github: ""
    }
  ],
  menuDisplayed: false
}

const initialState = defaultData;


//==============================//
//Constants / Actions List
//==============================//

const C = {
  SCREEN_DISPLAYED: 'SCREEN_DISPLAYED',
  TAG_ON: 'TAG_ON',
  TAG_OFF: 'TAG_OFF',
  MENU_DISPLAYED: 'MENU_DISPLAYED',
  ADD_PROJECT: 'ADD_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT'
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

const menuDisplayed = (state=[false], action) => {

  if (action.type === C.MENU_DISPLAYED) {
    return action.payload
  } else if (action.type === C.SCREEN_DISPLAYED) {
    return false
  } else {
    return state
  }
}

const tags = (state=[], action) => {
  if (action.type === C.TAG_ON) {
    return action.payload
  } else if (action.type === C.TAG_OFF) {
    return action.payload
  } else {
    return state
  }
}

//Not currently functioning - all projects added to defaultData
const projects = (state=[false], action) => {

  if (action.type === C.ADD_PROJECT) {
    return state
  } else if (action.type === C.REMOVE_PROJECT) {
    return state
  } else {
    return state
  }
}

//Combine all reducers to appReducer

const appReducer = combineReducers({
  current,
  tags,
  menuDisplayed,
  projects
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

const changeMenuDisplay = (toggle) => {

  return {
      type: C.MENU_DISPLAYED,
      payload: toggle
  }
}

const tagToggle = (tag, allTags) => {

  if (tag[1]=='off') {

    let newTags = allTags;
    newTags[allTags.findIndex((item, index) => {
      return item[0] == tag[0]
    })] = [tag[0],'on']

    return {
      type: C.TAG_ON,
      payload: newTags
    }
  } else {

    let newTags = allTags;
    newTags[allTags.findIndex((item, index) => {
      return item[0] == tag[0]
    })] = [tag[0],'off']

    return {
      type: C.TAG_OFF,
      payload: newTags
    }
  }
}

const removeTag = (tag) => {

  return {
    type: C.TAG_OFF,
    payload: tag
  }
}

const tagsOn = (tag, allTags) => {

  let newTags = allTags;

  for (let i = 0;i<allTags.length;i++) {
    newTags[i][1] = 'on';
  }

  return {
    type: C.TAG_ON,
    payload: newTags
  }

}

const tagsOff = (tag, allTags) => {

  let newTags = allTags;

  for (let i = 0;i<allTags.length;i++) {
    newTags[i][1] = 'off';
  }

  return {
    type: C.TAG_OFF,
    payload: newTags
  }

}


//==============================//
//REACT COMPONENTS
//==============================//

const Home = ({  }) => {

  return (
    <div id='about' className='display'>

      <h1>Hi, Im <span className='highlight'>Steve Banton</span>.

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

const Work = ({ tags, projects }) => {

const onTags = (stateTags) => {

  return stateTags.map((item, index) => {
    return item[1] == 'on' ? item[0] : null;
  });

}

const tagIntersection = (stateTags, projectTags) => {

  let intersectVerify = false;

  for (let i = 0; i < stateTags.length ; i++) {

    for (let j = 0;j < projectTags.length ; j++) {

      if (stateTags[i] == projectTags[j]) {
        intersectVerify = true;
      } else {

      }
    }
  }
  return intersectVerify;

}

		return (
			<div id='work' className='display'>

      <span className="tag-labels">Filter:</span>
      <span className="tag-on" onClick={() => {

        for (let i = 0; i < tags.length; i++) {

          store.dispatch(
            tagsOn(tags[i], tags)
          );

        }

      }}>All</span>
      <span className="tag-on" onClick={() => {

        for (let i = 0; i < tags.length; i++) {

          store.dispatch(
            tagsOff(tags[i], tags)
          );

        }


      }}>Clear</span>

        <div id="tag-container">


          {tags.map((item, index, allTags) => {
            return <Tag tag={item} key={index} allTags={allTags}/>
          })}
        </div>
        <div id='project-container'>
        {
          projects.map((item, index) => {
          if (tagIntersection(onTags(tags), item.tags)) {
            return <Project project={item} key={index}/>;
          } else {
            return
          }
        })

        }

        </div>

      </div>
		)
}

const Tag = ({ tag, allTags }) => {

		return (
			<span className={tag[1] == 'on' ? 'tag-on' : 'tag-off'}
            onClick={() => {

      store.dispatch(
        tagToggle(tag, allTags)
      );

      }}>

      {tag[0]}

      </span>
		)
}

const Project = ({ project }) => {

const cssStyle = () => {
  return {background: 'url('+ project.image +') no-repeat ',
          backgroundSize: '100%',
          backgroundPosition: 'center center'
          }
}
		return (
			<div className='project' style={cssStyle()}>

        <div className='shadow'>
            <div className='project-title'>{project['title']}</div>
            <div>{project['description']}</div>
            <div>Libraries: {project['tags'].map((item) => {
              return item + " "
            })}</div>
            <div><a href={project.link} target='_blank'><u>Click here to view project.</u></a>
            {(project['github']) ? <a href={project['github']} target='_blank'>
            <i className='fa fa-github github-link' aria-hidden='true'></i></a>:null}</div>
        </div>


      </div>
		)
}

const Contact = ({  }) => {

  return (
    <div id='contact' className='display'>

      <h1>Contact</h1>

<p>Have a web project or a job opportunity?</p>

<p>Please get in touch via email at steve.g.banton(-at-)gmail.com.</p>


    </div>
  )
}

//Major Windows, Called From Parent

const Menu = ( { menu } ) => {

    const fadeOn = () => {

      document.getElementById('view').className = "faded"

    }

    const fadeOff = () => {

      document.getElementById('view').className = " "

    }

		return (

      <div id="menu-container">
        {menu == true ? fadeOn() : ''}

        <div id="menu-controller">

        {menu==true?<i className="fa fa-times menu-button" aria-hidden="true" onClick={() => {

        store.dispatch(
          changeMenuDisplay(!(store.getState().menuDisplayed))
        );
        fadeOff()

        }}></i>:<i className="fa fa-bars menu-button" aria-hidden="true" onClick={() => {

        store.dispatch(
          changeMenuDisplay(!(store.getState().menuDisplayed))
        );
        fadeOff()

        }}></i>}
        </div>

  			<div id={menu == true ? "menu-on" : "menu"}>

          <img className='header-image' src='./images/steve.png' width='150' />

          <p className='label-text'><span className='highlight'>Steve Banton</span></p>
          <p className='label-text'>Full Stack Web & Mobile Developer</p>

          <p className='spacer'></p>

          <p className='menuitem' onClick={() => {

          store.dispatch(
            changeDisplay('home')
          );
          fadeOff()

          }}>$ Home</p>

          <p className='menuitem' onClick={() => {

          store.dispatch(
            changeDisplay('work')
          );
          fadeOff()

          }}>$ Work</p>

          <p className='menuitem' onClick={() => {

          store.dispatch(
            changeDisplay('contact')
          );
          fadeOff()

          }}>$ Contact Me<span id='blink'> _</span></p>
          <br />

          <div id="chart3"></div>



          <p className='created-with'>Created with [<br/>&nbsp;&nbsp;'React', <br/>&nbsp;&nbsp;'Redux', <br/>&nbsp;&nbsp;'D3', <br/>&nbsp;&nbsp;'<i className="fa fa-coffee"></i>', <br/>&nbsp;&nbsp;'<i className="fa fa-heart"></i> for Terminal'<br/>]</p>



        </div>
      </div>
		)
}

const View = ({ current, tags, projects }) => {

 let details = {}

 let title = '',
     ingredients = [],
     directions = '',
     indexNumber = ''

		return (
			<div id="view">

        {(current === 'home') ? <Home /> : (current === 'about') ? <About /> : (current === 'services') ? <Services /> :(current === 'work') ? <Work tags={tags} projects={projects} /> : (current === 'contact') ? <Contact /> : <Home />}

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
      tags: initialState.tags,
      menuDisplayed: initialState.menuDisplayed,
      projects: initialState.projects
    }
    this.storeChange = this.storeChange.bind(this)
  }

//methods

 storeChange () {
   this.setState({
     current: store.getState().current,
     tags: store.getState().tags,
     menuDisplayed: store.getState().menuDisplayed,
     projects: store.getState().projects
   })
   //console.log(store.getState())
   //console.log(JSON.stringify(this.state))
 }

 render() {
    return (
      <div className="app">
        <Menu menu={this.state.menuDisplayed}/>
        <View current={this.state.current} tags={this.state.tags} projects={this.state.projects}/>
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
              "link": "https://github.com/SteveGBanton"
          },
          {
              "title": "Facebook",
              "code": "\uf230",
              "link": "https://www.facebook.com/steve.banton"
          },
          {
              "title": "Twitter",
              "code": "\uf099",
              "link": "https://twitter.com/SteveGBanton"
          },
          {
              "title": "LinkedIn",
              "code": "\uf08c",
              "link": "https://www.linkedin.com/in/steve-banton-72971a71/"
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
              "target": 4,
              "source": 0
          },
          {
              "target": 3,
              "source": 0
          }
          ,
          {
              "target": 4,
              "source": 1
          }
      ]

      var myChart = d3.select("#chart3")
          .append('svg')
          .attr('width', width)
          .attr('height', height)


      //start simulation
      var simulation = d3.forceSimulation()
          .nodes(nodes)
          .force("link", d3.forceLink(links).distance(50))
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
//D3.js Force Directed Graph
//Display of social networks
//==============================//


forceLayout()
