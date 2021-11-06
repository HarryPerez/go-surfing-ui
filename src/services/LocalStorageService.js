export const setUser = (value) => {
  window.localStorage.setItem("user", JSON.stringify(value));
};

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};
