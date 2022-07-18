export default function access(initialState) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: false,
    normalUser: true,
    User: currentUser?.userName ? true : false,
  };
}
