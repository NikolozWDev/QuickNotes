import React from 'react'
import Form from '../components/Form'

const LoginPage = () => {


    return (
        <div className="w-[100%] h-[100vh] flex flex-row justify-center items-center">
            <Form route={"/api/token/"} method={"login"} />
        </div>
    )
}
export default LoginPage