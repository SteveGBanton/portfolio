
const { Component } = React
const { render } = ReactDOM
const { combineReducers, createStore } = Redux

//==============================//
//Loading of Intital State
//Default data used if nothing in localStorage
//==============================//

//localStorage.clear()

const defaultData = {
  allRecipes: [
    {
      title: 'Pumpkin Pie',
      ingredients: ['pumpkin', 'sugar', 'baking powder', 'flour'],
      directions: 'Start by mashing the pumpkin. Add sugar. Mix baking powder with flour and add one cup water.'
    },
    {
      title: 'Hot Chocolate',
      ingredients: ['sugar', 'cocao', 'peppermint leaves', 'milk'],
      directions: 'Mix sugar, milk, cocao and peppermint leaves together in a bowl.\n\nMicrowave for 1.5 minutes, and stir until dissolved. Remove leaves and enjoy.'
    }
  ],
  current: ['Instructions', 'off'], //second field: editing on or off
  ingredients: [],
}

    const initialState = (localStorage['sb_recipe_state']) ? JSON.parse(localStorage['sb_recipe_state']) : defaultData;


//==============================//
//Actions List
//==============================//

const C = {
  ADD_RECIPE: 'ADD_RECIPE',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT',
  CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS',
  DELETE_RECIPE: 'DELETE_RECIPE',
  EDIT_RECIPE: 'EDIT_RECIPE',
  RECIPE_DISPLAYED: 'RECIPE_DISPLAYED',
}

//==============================//
//Reducers
//==============================//


const ingredients = (state=[], action) => {

  switch (action.type) {
    case C.ADD_INGREDIENT:
      const hasIngredient = state.some(ing => ing === action.payload)
      return (hasIngredient) || action.payload === '' ? state : [...state, action.payload]
    case C.DELETE_INGREDIENT:
      return state.filter((ingredient, i) => i !== action.payload)
    case C.CLEAR_INGREDIENTS:
      return action.payload
    case C.RECIPE_DISPLAYED:
      return action.ing
    default:
       return state


  }

}

const recipe = (state=null, action) => {

  switch (action.type) {
    case C.ADD_RECIPE:
      return action.payload
    case C.EDIT_RECIPE:
      return action.payload.recipe
    default:
       return state
  }
}

const allRecipes = (state=initialState, action) => {

  switch (action.type) {
    case C.ADD_RECIPE:
      const hasRecipe = state.some(recipe => recipe.title === action.payload.title)
      return (hasRecipe) ?
        state :
      [...state, recipe(null, action)]
    case C.DELETE_RECIPE:
      return state.filter((recipe, i) => i !== action.payload)
    case C.EDIT_RECIPE:

      if (action.payload.editIndex >= state.length) {
        return state
      } else {

       const mutated = state
      mutated[action.payload.editIndex] = recipe(null, action)
      return mutated

      }

    default:
      return state

  }
}

const current = (state=['Instructions', 'off'], action) => {

  if (action.type === C.RECIPE_DISPLAYED) {
    return action.payload
  } else {
    return state
  }

}


//Combine all reducers to appReducer

const appReducer = combineReducers({
  allRecipes,
  current,
  ingredients
})


//==============================//
//Creating Store & Subscribe to log state to localStorage
//==============================//

const store = createStore(appReducer, initialState)

const saveState = () => {
  const state = JSON.stringify(store.getState())
  localStorage['sb_recipe_state'] = state
  //console.log(`initial state: ${localStorage.getItem('sb_recipe_state')}`)

}

store.subscribe(() => {
  const state = JSON.stringify(store.getState())
  localStorage['sb_recipe_state'] = state
  //console.log(`new state: ${localStorage.getItem('sb_recipe_state')}`)
})

//==============================//
//Action Creators
//==============================//


const addIngredient = (ingredient) => {

  return {
    type: C.ADD_INGREDIENT,
    payload: ingredient
  }

}

const deleteIngredient = (index) => {

  return {
    type: C.DELETE_INGREDIENT,
    payload: index
  }

}

const clearIngredients = () => {

   return {
    type: C.CLEAR_INGREDIENTS,
    payload: []
  }

}

const addRecipe = (title, ingredients, directions) => {

  return {
    type: C.ADD_RECIPE,
    payload: {
      title: title,
      ingredients: ingredients,
      directions: directions
    }
  }

}

const deleteRecipe = (index) => {

  return {
     type: C.DELETE_RECIPE,
     payload: index
  }

}

const editRecipe = (newRecipe, index) => {

  return {
      type: C.EDIT_RECIPE,
      payload: {
        recipe: newRecipe,
        editIndex: index
      }
  }
}

const changeDisplay = (displayed) => {

let ingredients = [];

  //When changing display to a recipe, finds & automatically loads ingredients into the temporary 'ingredients' state array so they are available as pills if user edits the recipe from the display page. Click a recipe and click edit to see how pills are pre-loaded with correct ingredients.
   for (let i = 0; i < store.getState().allRecipes.length;i++) {
      if (store.getState().allRecipes[i]['title'] === displayed[0]) {
        ingredients = store.getState().allRecipes[i]['ingredients']
      }
    }

  return {
      type: C.RECIPE_DISPLAYED,
      payload: displayed,
      ing: ingredients
  }
}

//==============================//
//REACT COMPONENTS
//==============================//

const AddButton = ({  }) => {

		return (
			<div id="add-button" onClick={() => {

          //Code to change the display:
          store.dispatch(
  changeDisplay(['add-menu', 'off'])
)
        }}>
        +Add
      </div>
		)
}

const EditRecipe = ({ title, ingredients, directions, indexNumber }) => {

  return (
    <div id='edit-form'>

      <h1>Editing {title}</h1>



    </div>
  )

}

//Major Windows, Called From Parent

const RecipeList = ({ recipes }) => {

		return (
			<div id="menu" className="col-sm-5">

        <h1>Steve Banton</h1>
        <h2>Full Stack Javascript Developer</h2>

        <p>$ About</p>
        <p>$ Services</p>
        <p>$ Work</p>
        <p>$ Contact</p>
        <br />
        <p>Created with [React, Redux, <i className="fa fa-coffee"></i>, <i className="fa fa-heart"></i>]</p>



        </div>
		)
}

const RecipeDetails = ({ current, allrecipes, editing }) => {

 let details = {}

 let title = '',
     ingredients = [],
     directions = '',
     indexNumber = ''

 for (let i = 0; i < allrecipes.length;i++) {
      if (allrecipes[i]['title'] === current[0]) {
        details.title = allrecipes[i]['title']
        details.ingredients = allrecipes[i]['ingredients']
        details.directions = allrecipes[i]['directions']
        details.indexNumber = i
      }
    }

		return (
			<div id="details" className="col-sm-7">

      </div>
		)
}


//Parent container, contains state methods

class App extends Component {

//constructor

  componentWillMount () {
    store.dispatch(
    clearIngredients()
)
  }

  componentDidMount () {
    localStorage.clear();
    store.subscribe(this.storeChange)
  }

  constructor (props) {
    super(props)
    this.state = {
      allRecipes: initialState.allRecipes,
      ingredients: initialState.ingredients,
      current: initialState.current,
    }
    this.storeChange = this.storeChange.bind(this)
  }

//methods

 storeChange () {
   this.setState({
     allRecipes: store.getState().allRecipes,
     ingredients: store.getState().ingredients,
     current: store.getState().current,
   })
   //console.log(store.getState())
   //console.log(JSON.stringify(this.state))
 }

 render() {
    return (
      <div className="app">
        <RecipeList recipes={this.state} />
        <RecipeDetails current={this.state.current} editing={this.state.editing} allrecipes={this.state.allRecipes}/>
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
