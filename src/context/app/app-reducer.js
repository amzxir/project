const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case "CHANGE_SIDEBAR": {
      return {
        ...state,
        sidebar: !state.sidebar,
      };
    }
  }
};

export default appReducer;
