// Reducer ChannelList
export const dashboardDataReducer = (state = {dataDashboard: {}},action) => {
    switch(action.type){
        case 'DASHBOARD_REQUEST':
            return {loading:true, dataDashboard: {}}
        case 'DASHBOARD_SUCCESS':
            return {loading:false,dataDashboard:action.payload}
        case 'DASHBOARD_FAIL':
            return { loading: false, error: action.payload}
        default:
            return state;
}}