import { useRouter } from "next/router"
import { useEffect } from "react"

const ProductsInterfaceRedirect = () => {
  const router = useRouter()
  useEffect(()=>{
    router.push("/productPages/busquedaProducts")
  },[])
}

export default ProductsInterfaceRedirect
