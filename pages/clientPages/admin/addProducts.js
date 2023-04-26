import {AddProductsForm} from "../../../components/forms/addProducts/AddProductsForm";
import FormatBlank from "../../../components/FormatBlank"
const addProducts = () => {  
  return (
    <FormatBlank title="Agregar Productos">
      <AddProductsForm />
    </FormatBlank>
  );
};

export default addProducts;
