// Reducer tagList
export const tagListReducer = (
  state = { tags_list: [], by_tags_list: [] },
  action
) => {
  switch (action.type) {
    case "TAG_LIST_REQUEST":
      return { loading: true, tags_list: [], by_tags_list: [] };
    case "TAG_LIST_SUCCESS":
      return {
        loading: false,
        tags_list: action.payload1,
        by_tags_list: action.payload2,
      };
    case "TAG_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//  Reducer video by tag
export const  tagDetailsReducer =(
    state ={tagData: {}},action
)=> {
    switch(action.type){
        case 'TAG_DETAILS_REQUEST':
            return {loading:true,tagData:{}}
        case 'TAG_DETAILS_SUCCESS':
            return {loading:false, tagData:action.payload}
        case 'TAG_DETAILS_FAIL':
            return {loading:false,error:action.payload}
        default: 
            return state;
    }
}

// Reducer create tag
export const tagCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "TAG_CREATE_REQUEST":
      return { loading: true };
    case "TAG_CREATE_SUCCESS":
      return { loading: false, tag: action.payload, success: true };
    case "TAG_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "TAG_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

// Reducer report by tag
export const  tagReportReducer =(
  state ={tagReportData: {}},action
)=> {
  switch(action.type){
      case 'TAG_REPORT_REQUEST':
          return {loading:true,tagReportData:{}}
      case 'TAG_REPORT_SUCCESS':
          return {loading:false, tagReportData:action.payload}
      case 'TAG_REPORT_FAIL':
          return {loading:false,error:action.payload}
      default: 
          return state;
  }
}
