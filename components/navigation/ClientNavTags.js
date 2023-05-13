export const linkTags =(user)=> {
    return[
        ["Mi Cuenta", "/clientPages/miCuenta"],
        ["Ajustes", "/clientPages/configuracion"],
        ["Favoritos", `/clientPages/favoritos?cd=${user ? user?.uid : "noUser"}`],
        ["Mis Compras", "/clientPages/misCompras"],
        ["Ayuda", "/ayuda"],
      ];
}
export const sellerTags = (loading, user)=>{
    return [
        ["Perfil del vendedor",`/productPages/vendedores/${!loading && user?.uid}`],
        ["Agregar Productos", "/clientPages/admin/addProducts"],
      ];
}