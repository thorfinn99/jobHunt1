import { setSingleJob } from '@/redux/jobSlice'; 
import { JOB_API_END_POINT } from '@/utils/constant'; 
import axios from 'axios'; 
import React from 'react' 
import { CiBookmarkPlus } from "react-icons/ci"; 
import { useDispatch, useSelector } from 'react-redux'; 
import { Link, useNavigate } from 'react-router-dom'; 
 
function Job({job}) { 
  const jobId = job?._id; 
  const navigate = useNavigate() 
  const dispatch = useDispatch() 
  const { singleJob } = useSelector((store)=>store.job) 
 
  const detailsShow = async () => { 
    try { 
      const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true} ) 
      if(res.data.success){ 
        dispatch(setSingleJob(res.data.job))  
      } 
      } catch (error) { 
        console.log(error); 
      }
    navigate(`/description/${jobId}`) 
  } 
 
  const daysAgoFunction = (mongodbTime) => { 
    const createdAt = new Date(mongodbTime); 
    const currentTime = new Date(); 
    const timeDifference = currentTime - createdAt; 
    return Math.floor(timeDifference/(1000*24*60*60)); 
  } 
 
  return ( 
    <div className='shadow-lg border md:mr-0 mr-2 border-gray-200 rounded-lg p-2 md:p-4' > 
      <div className='flex items-center justify-between' > 
        <p className='text-sm  ' >{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p> 
        <div className='md:text-2xl text-lg  rounded-full ' ><CiBookmarkPlus /></div> 
      </div> 
      <div className='flex md:mt-4 mt-2 gap-3 items-center' > 
        <div><img className='w-9 h-9 p-1' src="https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_512px.png" alt="" /></div> 
        <div> 
          <h1 className='font-medium' >{job?.company?.name}</h1> 
          <h3>{job?.location}</h3> 
        </div> 
      </div> 
      <div> 
        <h1 className='font-bold text-lg mt-1 ' >{job?.title}</h1> 
        <p className='text-sm text-gray-600 leading-tight ' >{job?.description}</p> 
      </div> 
      <div className='flex mt-3 items-center gap-2 md:gap-  ' > 
        <p className='text-blue-500 text-xs md:text-sm  font-medium rounded-lg px-2 md:px-2 md:py-1 border-[1px] hover:bg-blue-400 hover:text-white border-gray-300 ' >{job?.positions}</p> 
        <p className='text-red-400 text-xs md:text-sm font-medium rounded-lg px-2 md:px-2 md:py-1  border-[1px] hover:bg-red-400 hover:text-white border-gray-300 ' >{job?.jobType}</p> 
        <p className='text-green-400 text-xs md:text-sm font-medium rounded-lg md:px-2 md:py-1 px-2 border-[1px] hover:bg-green-400 hover:text-white border-gray-300 ' >{job?.salary}Lpa</p> 
      </div> 
      <div className='flex gap-3 mt-3 '> 
 
        <button onClick={detailsShow} className='border border-gray-400 rounded-md md:px-2 px-2 font-normal md:font-semibold md:py-1 ' >Details</button> 
         
        <button className='border  bg-[#7209b7] font-normal px-2 md:font-semibold text-white rounded-md md:px-2 md:py-1 ' >Save For Later</button> 
      </div> 
    </div> 
  ) 
} 
 
export default Job
