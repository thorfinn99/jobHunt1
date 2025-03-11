import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.auth)
    const {user} = useSelector(store=>store.auth)
    // console.log(user);
    
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        file: "",
    })
    const changeEventHandler = (e)=> {
        setInput({...input, [e.target.name]:e.target.value})
    }
    const changeFileHandler = (e) => {
        setInput({...input, file:e.target.files?.[0] })
    }
    
    const submitHandler = async (e)=> {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
        formData.append("file", input.file)
        }
        
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${process.env.USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            console.log(res.data);
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message)
            }
            
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            console.log(input);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

  return (
    <div>
      <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
      <h1>Job<span className='text-red-500' >Hunt</span></h1>     
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={submitHandler} class="space-y-4 md:space-y-6" action="#">
                   <div>
                      <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                      <input type="fullName" name="fullName" value={input.fullName} onChange={changeEventHandler} id="fullName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Do" required=""/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" value={input.email} onChange={changeEventHandler} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                      <input type="Nuber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8080808080" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" value={input.password} onChange={changeEventHandler} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirmPassword" value={input.confirmPassword} onChange={changeEventHandler} id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                    <div class="flex">
                        <div class="flex items-center me-4">
                            <input id="inline-radio" type="radio" value="student" name="role" checked={input.role === 'student'} onChange={changeEventHandler} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Student</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-2-radio" type="radio" value="recruiter" name="role" checked={input.role === 'recruiter'} onChange={changeEventHandler} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recruiter</label>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                            <p>Profile</p>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>

                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  {
                    loading ? <Button className="w-full my-4" > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait </Button> :  <button type="submit" class="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  }
                  
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/login" ><a class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default SignUp
