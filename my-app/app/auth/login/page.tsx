"use client"
import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useAuthHttp from '@/utils/useAuthHttp'
import { useRouter } from 'next/navigation'
import {useParams,useSearchParams} from 'next/navigation'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import setCookie from '@/utils/setCookie'
type ApiResponse = {
  isAdmin:boolean,
  token:string
  status:number
} |{
  reason:string
  status:number
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  //const [cookies,setCookie] = useCookies(['auth-token'])
  const redirectFrom = searchParams.get('redirectedFrom')?.includes('/auth')?'/':searchParams.get('redirectedFrom')
  //const authHttp = useAuthHttp()
  const formik = useFormik({
    initialValues:{
        username:'',
        password:'',
        credentialErrors:false
    },
    validationSchema:yup.object().shape({
      username:yup.string().required('The username is required').min(3,'The username must be more than 2 letters'),
      password:yup.string().required('The password is required').min(8,'The password must be > 8 ')
      
    }),
    onSubmit:async ({username,password},{resetForm})=>{
      try{
        const data :{ 
          token:string,
          isAdmin:boolean,
          status:number

        } = await (await axios.post('http://localhost:3000/api/auth/login',{
          
            username,
            password
          
        })).data
        
        setCookie('auth-token',data.token,1)
       if(redirectFrom){ 
        router.push(redirectFrom)
        
      }else{
      // console.log(cookies['auth-token'])
      router.push('/dashboard')
      }

    }catch(err:any){
        //console.error(err)
        
        const reason = err?.response?.data?.reason
     console.log('it failed because',reason)
        

      }
    }
  })
  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        {formik.touched.credentialErrors && formik.errors.credentialErrors ? (
            <div className="error">{formik.errors.credentialErrors}</div>
          ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
