import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getListVideo } from '../redux/actions/VideoAction'
import { getListTag } from '../redux/actions/TagAction'
import { getListData } from '../redux/actions/DashboardAction';
import Toast from "../components/loadingError/Toast";
import { toast } from "react-toastify";

const Flowdata = () => {
  const dispatch = useDispatch()
  const dataDashBoardState = useSelector((state)=> state.dataDashBoard)
  const  {loading,dataDashboard,error } = dataDashBoardState
  useEffect(()=> {
    dispatch(getListData())
  },[dispatch])

  return (
    <>

    </>
  )
}

export default Flowdata