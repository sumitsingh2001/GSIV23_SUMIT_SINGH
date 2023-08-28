const initialState = {
  currentPage: 1,
};

const currentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_PAGE':
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

export default currentPageReducer;
