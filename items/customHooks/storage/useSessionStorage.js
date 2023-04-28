import { useState } from "react"


export const useSessionStorage = (key, initialValue) => {
    const [storageValue, setStorageValue] = useState(()=>{
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch(error){
            return initialValue
        }
    })
    const setValue = (value) => {
        try{
            setStorageValue(value)
            window.sessionStorage.setItem(key, JSON.stringify(value))
        } catch(error){
            console.log(error)
        }
    }
  return [storageValue, setValue]
}