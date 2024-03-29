import TYPES, { localStorageInterface, User } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import AuthService from "linkWithBackend/services/auth_service";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify';

const authService = container.get<AuthService>(TYPES.AuthService)

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
        const response = await authService.signIn(userProps)
        const message = authService.getMessage()
        const status = authService.getStatus()

        if (status === 200) {
            router.push(`/${response.firstName+response.lastName}/dashboard`)
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