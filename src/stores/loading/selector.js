import { createSelector } from 'reselect';

const loadingState = (state) => state.loading;
const selectorLoading = (action) => {
  const selector = createSelector(loadingState, (state) => {
    const loading = state.effects[action] || false;
    return loading;
  });
  return selector;
};

export { selectorLoading };
