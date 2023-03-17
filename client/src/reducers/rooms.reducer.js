import { GET_ROOMS } from "../actions/room.action";

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return action.payload
            default: 
            return state;
    }

}