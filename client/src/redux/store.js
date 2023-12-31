import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import ThemeReducer from "./reducers/ThemeReducer";
import {videoListReducer,videoDetailsReducer} from "./reducers/VideoReducer"
import { tagListReducer,tagDetailsReducer,tagCreateReducer, tagReportReducer } from "./reducers/TagReducer";
import { streamListReducer } from "./reducers/StreamReducer";
import { channelListReducer,channelDetailsReducer,channelCreateReducer, channelDeleteReducer, channelReportReducer } from "./reducers/ChannelReducer";
import { dashboardDataReducer } from "./reducers/DashboardReducer";
const rootReducer = combineReducers(
    {theme:ThemeReducer,
     videoList: videoListReducer,
     videoDetails: videoDetailsReducer,
     tagList:tagListReducer,
     tagDetails:tagDetailsReducer,
     tagCreate:tagCreateReducer,
     tagReport:tagReportReducer,
     streamList: streamListReducer,
     channelList:channelListReducer,
     channelDetails:channelDetailsReducer,
     channelCreate:channelCreateReducer,
     channelDelete:channelDeleteReducer,
     channelReport:channelReportReducer,
     dataDashBoard:dashboardDataReducer
    })

const middleware = [thunk]
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
