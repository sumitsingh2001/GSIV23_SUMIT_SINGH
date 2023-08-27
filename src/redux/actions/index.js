export const toggle = () => {
  return {
    type: 'TOGGLE',
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
    type: 'SUCCESS',
    payload: message,
  };
};
