export const toggle = () => {
  return {
    type: 'TOGGLE',
  };
};

export const setCurrentPage = (count) => {
  return {
    type: 'CURRENT_PAGE',
    payload: count,
  };
};

export const success = (data) => {
  return {
    type: 'SUCCESS',
    payload: data,
  };
};

export const failure = (message) => {
  return {
    type: 'ERROR',
    payload: message,
  };
};
