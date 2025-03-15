import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CgProfile } from "react-icons/cg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Navbar from "../shared/Navbar";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

function Applicants() {
    const params = useParams()
  const dispatch = useDispatch()
  const {applicants} = useSelector(store=>store.application)

  const statusHandler = async (status, id) => {
    console.log('called');
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/status/${id}/update`, { status });
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

  useEffect(()=> {
        const fetchApplicants = async ()=> {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials:true})
                if(res.data.success){
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplicants()
  },[])
  console.log(applicants);


  return (
    <>
    <Navbar />
    <div>
      <div className="max-w-5xl mt-7 mx-auto my-5">
        <table className="min-w-full border border-gray-300 bg-white shadow-md">
          <thead className=" bg-gray-100">
            <tr className="" >
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Resume</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
            <>
              {applicants.applications?.map((job) => {
                return (
                    <tbody>
                        <tr key={job._id} className="border-b">
                          <td className="h-11 p-2">{job?.applicants?.fullName}</td>
                          <td className="p-3 grid grid-col-1">
                            <div>{job?.applicants?.email}</div>
                            <div>{job?.applicants?.phoneNumber}</div> </td>
                          <td className="p-3" ><a target="blank" className="text-blue-500  w-full hover:underline cursor-pointer " href={job?.applicants?.profile?.resume}>{job?.applicants?.profile?.resumeOriginalName}</a></td>
                          <td className="p-3">{job?.applicants.createdAt?.split("T")[0]}</td>
                          <td className="p-3 ">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Avatar className=" cursor-pointer">
                                  <BsThreeDotsVertical className="text-gray-600 ml-5 cursor-pointer" />
                                </Avatar>
                              </PopoverTrigger>
                              <PopoverContent className=" bg-gray-100 border-0 p-4 shadow-md outline-0 w-52">
                                <div className=" flex pt-2 gap-9 ">
                                {
                                    shortlistingStatus.map((status, index) => {
                                      return (
                                        <div onClick={() => statusHandler(status, job?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                            <span>{status}</span>
                                        </div>
                                              )
                                      })
                                 }
                                </div>
                              </PopoverContent>
                            </Popover>
                          </td>
                        </tr>
                    </tbody>
                );
              })}
            </>
        </table>
      </div>
      <div className=" mx-auto" >
        <p className="text-center text-gray-400 " >list of applicants..</p>
      </div>
    </div>
    </>
  );
}

export default Applicants;
