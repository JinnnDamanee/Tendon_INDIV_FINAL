import TYPES, { localStorageInterface, User } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";
import AuthService from "linkWithBackend/services/auth_service";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify';
import UserService from "linkWithBackend/services/user_service";

const authService = container.get<AuthService>(TYPES.AuthService)
const memService = container.get<MemoryService>(TYPES.MemoryService)
const userSerivce = container.get<UserService>(TYPES.UserService)

export default function ViewModel(){
    const router = useRouter();
    const {theme} = useTheme() 
    const [userProps, setUserProps] = useState<User>({} as User)

    const onChange = (e: any) => {
        setUserProps({
            ...userProps,
            [e.target.name]: e.target.value
        })
    }

    const submitHandle = (e:FormEvent) => {
        console.log('submit')
        e.preventDefault()
        login()
    }

    const login = async() => {
        let memStore = {} as localStorageInterface
        
        const response = await authService.signIn(userProps)
        memStore.token = response.accessToken
        memService.setLocalStorage(memStore)

        const responseUser = await userSerivce.getUserByID()        // **
        const message = authService.getMessage()
        const status = authService.getStatus()
    
        memStore.firstName = responseUser.user.firstName
        memStore.lastName = responseUser.user.lastName
        memService.setLocalStorage(memStore)

        if (status === 200) {
            router.push(`/${responseUser.user.firstName+responseUser.user.lastName}/dashboard`)
        } else {
            toast.error(`${message}`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: theme === 'dark' ? 'colored' : 'light',
            });
        }
    }

    return {
        userProps,
        onChange,
        submitHandle
    }
}