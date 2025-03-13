import { setLoading, setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui/button'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.auth)
    const { user } = useSelector(store => store.auth);
    console.log('User from Redux after login:', user);
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const changeEventHandler = (e)=> {
        setInput({...input, [e.target.name]:e.target.value})
    }
    const submitHandler = async (e)=> {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate("/")  
                }, 1000);
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
      <a href="#" class="flex text-3xl items-center mb-6 font-semibold text-gray-900 dark:text-white">
          <Link to="/" ><h1>Job<span className='text-red-500' >Hunt</span></h1></Link>   
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={submitHandler} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" value={input.email} onChange={changeEventHandler} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" value={input.password} onChange={changeEventHandler} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex">
                        <div class="flex items-center me-4">
                            <input id="inline-radio" type="radio" value="student" name="role" checked={input.role === 'student'} onChange={changeEventHandler} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Student</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-2-radio" type="radio" value="recruiter" name="role" checked={input.role === 'recruiter'} onChange={changeEventHandler} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recruiter</label>
                        </div>
                    </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"  />
                          </div>
                          <div class="ml-3 text-sm">
                            <label htmlFor="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  {
                    loading ? <Button className="w-full my-4" > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait </Button> :  <button type="submit" class="w-full text-white bg-orange-600 hover:bg-orange-600 hover:shadow-md focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  }
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="/signup" ><span class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span></Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Login
