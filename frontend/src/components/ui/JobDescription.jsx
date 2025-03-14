import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';


function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store)=>store.job)
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  
  const isInitiallyApplied = singleJob?.applications?.some(application => {
    return application.applicants === user?.id;
  }) || false;
  
  
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  
  useEffect(() => {
    const fetchSingleJob = async () => {
       try {
            const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true} )
            if(res.data.success){
              dispatch(setSingleJob(res.data.job))
            }
         } catch (error) {
            console.log(error);
        }
    }
    fetchSingleJob();
  },[jobId,dispatch, user?._id])

  const applyJobHandler = async () => {
    try {
      const jobId = singleJob?._id;
      const userId = user?._id;

      const res = await axios.get(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true} );
      console.log(res.data);
      
      if(res.data.success) {
        setIsApplied(true) // update local update
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:userId}] }
        dispatch(setSingleJob(updatedSingleJob))  //RealTime Ui Update
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <Navbar />
    <div className='max-w-7xl mx-7 lg:mx-auto my-10 ' >
      <div className='flex items-center justify-between ' >
        <div>
          <h1 className='font-bold text-xl' >{singleJob.title}</h1>
            <div className='flex mt-3 items-center gap-2 md:gap-  ' >
              <p className='text-blue-500 text-xs md:text-sm  font-medium rounded-lg px-2 md:px-2 md:py-1 border-[1px] border-gray-300 ' >{singleJob.positions}</p>
              <p className='text-red-400 text-xs md:text-sm font-medium rounded-lg px-2 md:px-2 md:py-1  border-[1px] border-gray-300 ' >{singleJob.jobType}</p>
              <p className='text-green-400 text-xs md:text-sm font-medium rounded-lg md:px-2 md:py-1 px-2 border-[1px] border-gray-300 ' >{singleJob.salary}Lpa</p>
            </div>
        </div>
        <button 
        onClick={isApplied ? null : applyJobHandler}
        disabled={isApplied} 
        className={`rounded-lg text-white px-3 py-2 ${isApplied ? 'bg-gray-400 cursor-not-allowed' :' bg-[#7209b7]  ' }`} >{ isApplied ? 'Already Applied' : 'Apply Now' }</button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium pt-7 pb-3' >Job Description</h1>
      <div className='my-3' >
         <h1 className='font-bold my-1' >Role: <span className='pl-4 font-normal text-gray-800' >{singleJob?.title}</span></h1>
         <h1 className='font-bold my-1' >Location: <span className='pl-4 font-normal text-gray-800' >{singleJob?.location}</span></h1>
         <h1 className='font-bold my-1' >Description: <span className='pl-4 font-normal text-gray-800' >{singleJob?.description}</span></h1>
         <h1 className='font-bold my-1' >Experience: <span className='pl-4 font-normal text-gray-800' >{singleJob?.experienceLevel}</span></h1>
         <h1 className='font-bold my-1' >Salary: <span className='pl-4 font-normal text-gray-800' >{singleJob?.salary}lpa</span></h1>
         <h1 className='font-bold my-1' >Total Applicants: <span className='pl-4 font-normal text-gray-800' >{singleJob?.applications?.length}</span></h1>
         <h1 className='font-bold my-1' >Posted On: <span className='pl-4 font-normal text-gray-800' >{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
    </div>
  )
}

export default JobDescription
