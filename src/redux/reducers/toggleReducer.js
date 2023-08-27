const intialState = {
  isVisible: false,
};

const toggleReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isVisible: !state.isVisible };

    default:
      return state;
  }
};

export default toggleReducer;
