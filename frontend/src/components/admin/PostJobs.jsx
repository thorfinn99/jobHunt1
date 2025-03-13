import { JOB_API_END_POINT } from '@/utils/constant';
import { Button } from '@material-tailwind/react'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';

function PostJobs() {
  const {user} = useSelector(store=>store.auth)
  const userId = user.id
  const {companies} = useSelector(store=>store.company)
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    title: "",
    description:"",
    requirements:"",
    salary:"",
    location:"",
    jobType:"",
    experience:"",
    positions:"",
    companyId:""
  })
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }
  const handleCompanyChange = (e) => {
    setInput({...input, companyId:e.target.value})
  }

  const submitHandler = async (e) => {
     e.preventDefault()
     
     try { 
      setLoading(true)
       const res = await axios.post(`${import.meta.env.VITE_JOB_API_END_POINT}/post`, input, {
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials:true
       })
       if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/jobs")
       }
     } catch (error) {
       console.log(error?.response?.data);
       toast.error(error?.response?.data?.message || "An error occurred");
      } finally {
      setLoading(false)
     }
  }

  return (
    <>
    <Navbar />
    <div>
      <div className='max-w-xl shadow-lg  mx-auto my-10' >
        <form onSubmit={submitHandler} >
           <div className='flex items-center gap-32  pl-3 py-7' >
              <button onClick={()=> navigate("/admin/jobs") } className='flex items-center gap-2 text-gray-500 font-semibold' >
                <IoMdArrowRoundBack />
                <span>Back</span>
              </button>
              <h1 className='font-bold text-xl' >Post Job</h1>
           </div>
           <div className='grid grid-cols-1 mx-5 gap-4' >
            <div>
            <label className='p-2 font-medium '>Job Title</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="text" value={input.title} name="title" onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Description</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="text" value={input.description} name="description" onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Requirements</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl' value={input.requirements} type="text" name="requirements" onChange={changeEventHandler} />
            </div>
        <div className='flex gap-6' >
            <div>
            <label className='p-2 font-medium '>Salary (in lpa) </label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' value={input.salary} type="text" name="salary" onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Location</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' value={input.location} type="text" name="location" onChange={changeEventHandler} />
            </div>
        </div>
            <div className='flex gap-6 ' >
            <label className='p-2 font-medium '>JobType :</label>
            <div className="flex">
                <div class="flex items-center me-4">
                    <input id="inline-radio" type="radio" value="fullTime" name="jobType" checked={input.jobType === 'fullTime'} onChange={changeEventHandler} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Time</label>
                </div>
                <div class="flex items-center me-4">
                    <input id="inline-2-radio" type="radio" value="internship" name="jobType" checked={input.jobType === 'internship'} onChange={changeEventHandler} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Internship</label>
                </div>
            </div>
            </div>
          <div className='flex gap-6' >
            <div>
            <label className='p-2 font-medium '>Experience (in years)</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' value={input.experience} type="text" name="experience" onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Positions(no. of Jobs Available)</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' value={input.positions} type="text" name="positions" onChange={changeEventHandler} />
            </div>
          </div>
          
          <div className="max-w-sm mx-auto">
      <select
        id="companies" value={input.filteredCompany} onChange={handleCompanyChange}
        className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
        <option value="" selected disabled>
          Choose Company
        </option>
        {companies.map((company) => (
          <option key={company._id} value={company._id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>

           {
              loading ? <Button className="w-full my-3" > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait </Button> :  <button type="submit" class="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Post Job</button>
           }
           {
            companies.length === 0 && <p className='text-xs mx-auto mb-5 font-bold text-red-500' >Register Your Company First!</p>
           }
         </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default PostJobs
