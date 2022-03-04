

const userInfo = localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null

const initialState = {
  user: userInfo,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        user: action.user,
      };

    default:
      return state;
  }
};
