
export const filterLocalProducts = (products,descuento,marcasPicked) => {
    
    const filterDiscount = products.filter((prd)=>{
        if(descuento === 0) return prd;
        return prd.Descuento > 0
    })
    const filtered = filterDiscount.filter((prd)=>{
        if(!marcasPicked.length) return prd;
        return marcasPicked.includes(prd.Marca)
    })
  return filtered
}

