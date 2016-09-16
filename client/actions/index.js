export const selectUser = (user) => ({
  type: 'USER_SELECTED',
  payload: user,
});

export const handleNameChange = (e) => ({
  type: 'USER_CREATED',
  payload: e.currentTarget.value,
});
