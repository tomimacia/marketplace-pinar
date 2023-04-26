import { useRouter } from "next/router"
import { useEffect } from "react"

const productsInterfaceRedirect = () => {
  const router = useRouter()
  useEffect(()=>{
    router.push("/productPages/busquedaProducts")
  },[])
}

export default productsInterfaceRedirect
