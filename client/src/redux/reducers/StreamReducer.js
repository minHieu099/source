// Reducer tagList
export const streamListReducer = (state = {videos:[]},action) => {
    switch(action.type){
        case 'STREAM_LIST_REQUEST':
            return {loading:true, videos:[]}
        case 'STREAM_LIST_SUCCESS':
            return {loading:false,videos:action.payload}
        case 'STREAM_LIST_FAIL':
            return { loading: false, error: action.payload}
        default:
            return state;
}}