const New = (state = {}, action) => {
	switch (action.type) {
		case "Enter":
			return action.payload;
		default:
			return { ...state };
	}
};
export default New;
