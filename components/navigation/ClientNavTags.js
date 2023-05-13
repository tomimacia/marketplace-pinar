export const linkTags =(user)=> {
    return[
        ["Mi Cuenta", "/clientPages/MiCuenta"],
        ["Ajustes", "/clientPages/Configuracion"],
        ["Favoritos", `/clientPages/Favoritos?cd=${user ? user?.uid : "noUser"}`],
        ["Mis Compras", "/clientPages/MisCompras"],
        ["Ayuda", "/Ayuda"],
      ];
}
export const sellerTags = (loading, user)=>{
    return [
        ["Perfil del vendedor",`/productPages/vendedores/${!loading && user?.uid}`],
        ["Agregar Productos", "/clientPages/admin/AddProducts"],
      ];
}