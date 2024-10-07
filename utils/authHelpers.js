export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("token");
  }
  return null;
};

export const removeToken = () => {
  return localStorage?.removeItem("token");
};

export const setToken = (token) => {
  return localStorage?.setItem("token", token);
};

export const getLoginTime = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("loginTime");
  }
  return null;
};

export const removeLoginTime = () => {
  return localStorage?.removeItem("loginTime");
};

export const setLoginTime = () => {
  const loginTime = new Date().getTime();
  return localStorage?.setItem("loginTime", loginTime);
};
