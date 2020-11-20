/**Get jwt token from local storage */
export const getJwt = () => {
  return localStorage.getItem("JWT");
};
