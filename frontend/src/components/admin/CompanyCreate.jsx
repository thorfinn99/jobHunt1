import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

function CompanyCreate() {
    const [companyName, setCompanyName] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const registerNewCompany = async ()=> {
        try {
            const res = await axios.post(`${import.meta.env.VITE_COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: { 'Content-Type': 'application/json' }, withCredentials:true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl ml-5 mx-auto' >
        <div className='my-10' >
            <h1 className='font-bold text-2xl' >Your Company Name</h1>
            <p className='text-gray-400' >What would you like your company be called?</p>
        </div>
        <div class="relative">
            <input type="text" onChange={(e)=> setCompanyName(e.target.value) } className="block px-2.5 pb-2.5 pt-4 w-96 text-sm border-gray-400 text-gray-900 rounded-lg border-[1px] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Company Name</label>
        </div>
        <div className='flex items-center gap-5 my-7' >
            <button onClick={()=> navigate("/admin/companies")} className='hover:bg-gray-200 px-3 border-[1px]  py-2 rounded-xl' >Cancel</button>
            <button onClick={()=> {registerNewCompany()} } className='bg-black text-white px-2 py-2 rounded-xl' >Continue</button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
