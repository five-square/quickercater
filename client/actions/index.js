export const selectUser = (user) => {
	console.log('You clicked on user: ', user.name);
	return {
		type: "USER_SELECTED",
		payload: user
	}
};

export const handleNameChange = (e) => {
	console.log('handleNameChange: ', e.currentTarget.value);
	return {
		type: "USER_CREATED",
		payload: e.currentTarget.value
	}
};
