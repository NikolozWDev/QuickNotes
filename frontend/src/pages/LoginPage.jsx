import React from 'react'
import Form from '../components/Form'
import { ACCESS_TOKEN } from '../constants'

const LoginPage = () => {

    localStorage.removeItem(ACCESS_TOKEN)

    return (
        <div className="w-[100%] h-[100vh] flex flex-row justify-center items-center">
            <Form route={"/api/token/"} method={"login"} />
        </div>
    )
}
export default LoginPage