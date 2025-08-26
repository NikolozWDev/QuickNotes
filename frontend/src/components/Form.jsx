import React from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { useNavigate } from 'react-router-dom'

const Form = ({route, method}) => {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post(route, {username, password})
            if(method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="flex flex-col justify-center items-center gap-[30px] w-[100%] shadow-md bg-white px-[20px] py-[40px] rounded-[24px] border-[1px] border-gray-300 md:w-[600px]">
            <p className="text-black font-bold text-[20px]">{method === 'login' ? "Login" : "Register"}</p>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[16px] w-[100%]">
                <input className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black" type='text' placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                <input className="px-[14px] py-[6px] rounded-[8px] w-[100%] border-[1px] border-black" type='password' placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <button className="w-[100%] rounded-[8px] py-[6px] text-white text-[16px] bg-blue-400" type='submit'>{method === 'login' ? "Login" : "Register"}</button>
            </form>
        </div>
    )
}
export default Form