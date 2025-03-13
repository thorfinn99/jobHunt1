import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux' 


const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try { 
                const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/getadminjobs`, {withCredentials:true})
                console.log("Response received:", res);
                if(res.data.success){
                    console.log("Dispatching jobs to Redux store:", res.data.jobs);
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllAdminJobs()
    },[])
}

export default useGetAdminJobs
