// Reducer ChannelList
export const channelListReducer = (state = {channels_list:[],by_channels_list:[]},action) => {
    switch(action.type){
        case 'CHANNEL_LIST_REQUEST':
            return {loading:true, channels_list:[],by_channels_list:[]}
        case 'CHANNEL_LIST_SUCCESS':
            return {loading:false,channels_list:action.payload1,by_channels_list:action.payload2}
        case 'CHANNEL_LIST_FAIL':
            return { loading: false, error: action.payload}
        default:
            return state;
}}

//  Reducer video by channel
export const  channelDetailsReducer =(
    state ={channelData:{}},action
)=> {
    switch(action.type){
        case 'CHANNEL_DETAILS_REQUEST':
            return {loading:true,channelData:{}}
        case 'CHANNEL_DETAILS_SUCCESS':
            return {loading:false, channelData:action.payload}
        case 'CHANNEL_DETAILS_FAIL':
            return {loading:false,error:action.payload}
        default: 
            return state;
    }
}


// Reducer create channel
export const channelCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case "CHANNEL_CREATE_REQUEST":
        return { loading: true };
      case "CHANNEL_CREATE_SUCCESS":
        return { loading: false, channel: action.payload, success: true };
      case "CHANNEL_CREATE_FAIL":
        return { loading: false, error: action.payload };
      case "CHANNEL_CREATE_RESET":
        return {};
      default:
        return state;
    }
  };