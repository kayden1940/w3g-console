const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// todo: finish below

// const getVarsFromStore = (vars) => {
//   const { ...vars } = useStore(
//     (state) => ({
//       vars.map(var=>var: state.var,)
//     }),
//     shallow
//   );
// };

export { validateEmail };
