export const initialState = {
  items: [],
};

export default function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        items: [
          {
            key: Math.random().toString(),
            title: action.payload,
          },
          ...state.items,
        ],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        items: state.items.filter((item, index) => {
          return item.key != action.payload;
        }),
      };
    default:
      return state;
  }
}
