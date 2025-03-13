import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      console.log("Button clicked");
      const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/logout` , {withCredentials: true} )
      if(res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  

  return (
    <div className="shadow-md p-2 px-3 ">
      <div className="flex items-center justify-between mx-2 md:mx-6 lg:mx-auto max-w-7xl h-16">
        <div>
          <Link to="/" ><h1 className="text-2xl cursor-pointer md:text-3xl font-bold">
            Job<span className="text-red-600">Hunt</span>
          </h1>
          </Link>
        </div>
        <div className="flex items-center mx-2 gap-12 h-full ">
          <ul className="flex font-normal font-bold items-center gap-2 gap-5">
            {
               user && user.role === 'recruiter' ? (
                <>
                 <Link to='/'><div className="flex items-center gap-1 " >
                 <li className="text-lg md:block " >Companies</li>
                 </div></Link>
                 <Link to="/admin/jobs" ><div className="flex items-center gap-1 " >
                 <li className="text-lg  md:block " >Jobs</li>
                 </div></Link>
                </>
              ) : (
                <>
                  <Link to='/'><div className="flex items-center gap-1 " >
            <IoHome />
            <li className="hidden md:text-lg md:block " >Home</li>
            </div></Link>
            <Link to="/jobs" ><div className="flex items-center gap-1 " >
            <MdOutlineWorkOutline />
            <li className="hidden md:text-lg  md:block " >Jobs</li>
            </div></Link>
            <Link to='/browse' ><div className="flex items-center gap-1 " >
            <MdExplore />
            <li className="hidden md:text-lg md:block " >Browse</li>
            </div></Link>
                </>
              )
            }
        
          </ul>

          {!user ? (
            <div>
              <div class="flex flex-wrap justify-center gap-4">
                <a class="relative" href="#">
                  <span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                  <Link to="/login" ><span class="md:text-lg text-xs relative inline-block h-full w-full rounded border-2 border-black bg-white px-1 md:px-3 py-1 font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">
                    Login
                  </span></Link>
                </a>
                <a href="#" class="relative">
                  <span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                  <Link to="/signup" ><span class="fold-bold text-xs md:text-lg relative inline-block h-full w-full rounded border-2 border-black bg-black px-1 md:px-3 py-1 font-bold text-white transition duration-100 hover:bg-gray-900 hover:text-yellow-500">
                    Sign Up
                  </span></Link>
                </a>
              </div>
            </div>
          ) : (
            <Popover >
              <PopoverTrigger asChild>
                <Avatar className=" cursor-pointer">
                  <AvatarImage
                    className="rounded-full h-8 w-8 ml-1"
                    src= {user?.profile?.profilePhoto}
                    alt="pfp"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className=" bg-white border-0 p-4 shadow-md outline-0 w-80">
                <div className="flex items-center gap-3 ">
                  <Avatar className=" cursor-pointer">
                    <AvatarImage 
                      className=" w-9 h-9 rounded-lg"
                      src={user?.profile?.profilePhoto}
                      alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullName}</h4>
                    <p className="text-sm text-muted-foreground ">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className=" flex pt-2 gap-10 ">
                  <div class=" flex  ">
                    <Link to="/profile" ><div class="relative p-1 flex gap-2 text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                      <User2 />
                      <span>View Profile</span>
                    </div></Link>
                  </div>

                  <div class=" flex ">
                    <div onClick={logoutHandler} class="relative p-1 flex gap-2 text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                      <LogOut />
                      <button  className="text-red-500">Logout</button>
                    </div>
                  </div>

                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
