import * as React from "react";

const AppStateContext = React.createContext();
const AppStateDispatchContext = React.createContext();

function appStateReducer(state, action) {
  let newState;
  switch (action.type) {
    case "register": {
      newState = {
        ...state,
        ...action.value,
      };
      localStorage.setItem(process.env.CUSTOM_APP, JSON.stringify(newState));
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function AppStateProvider({ children, value }) {
  const [state, dispatch] = React.useReducer(appStateReducer, { ...value });
  return (
    <AppStateContext.Provider value={state}>
      <AppStateDispatchContext.Provider value={dispatch}>
        {children}
      </AppStateDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
function useAppState() {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error(
      "useAppStateContext must be used within a AppStateProvider"
    );
  }
  return context;
}
function useAppStateDispatch() {
  const context = React.useContext(AppStateDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAppStateDispatch must be used within a AppStateProvider"
    );
  }
  return context;
}
export { AppStateProvider, useAppState, useAppStateDispatch };
