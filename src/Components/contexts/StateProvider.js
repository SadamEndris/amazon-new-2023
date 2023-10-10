// Import necessary modules from React
import React, { useContext, createContext, useReducer } from 'react'

// Create a new context named "stateProvider" for managing state
const stateProvider = createContext()

// Define a custom "StateProvider" component for managing state
const StateProvider = ({ reducer, initialState, children }) => {
  return (
    // Use the context's Provider component to share state and dispatch
    <stateProvider.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateProvider.Provider>
  )
}

// Create a custom hook "useStateValue" to easily access state and dispatch
export const useStateValue = () => useContext(stateProvider)

// Export the "StateProvider" component for use in other parts of the application
export default StateProvider
