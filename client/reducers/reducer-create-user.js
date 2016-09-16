export default function(state=null, action) {
	switch(action.type) {
		case "USER_CREATED":
			return action.payload;
			break;
	}
	return state;
}