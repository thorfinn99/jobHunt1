import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useSelect } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchQuery} = useSelector(store=>store.job)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get?keyword=${searchQuery}`, {withCredentials:true} )
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllJobs()
    },[])
}

export default useGetAllJobs
