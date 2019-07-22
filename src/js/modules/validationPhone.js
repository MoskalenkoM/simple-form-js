export default phone => {
  const regExp = /^[+, \d]\d{5,10}$/g;
  return regExp.test(phone);
};
