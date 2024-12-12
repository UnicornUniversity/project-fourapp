import Input from "../../components/input/Input";
import Accordion from "../../components/accordion/Accordion";
import Table from "../../components/table/Table";

function ProductForm() {

    const data = [
        {
            id: 1,
            name: "Variety 1",
            size: "XL",
            color: "#FFFFF",
            stock: 4,
        },
        {
            id: 2,
            name: "Variety 2",
            size: "XL",
            color: "#FFFFF",
            stock: 4,
        },
        {
            id: 36,
            name: "Variety 3",
            size: "XL",
            color: "#FFFFF",
            stock: 4,
        },
    ];


    const headers = ["Variety", "Size", "Color", "Stock"];
    const columnKeys = ["name", "size", "color", "stock"]; // Map header order to object keys



    const handleSubmitProduct = (event) => {

    };
    const handleSubmitVariety = (event) => {

    };

    return (
        <div className="productForm">
            <Accordion accordionTitle="Product">
                <form onSubmit={handleSubmitProduct}>
                    <Input
                        type="text"
                        className="profileInput"
                        placeholder="Name"
                        name="name"
                    >
                        <label className="inputLabel">Name</label>
                    </Input>
                    <Input
                        type="text"
                        className="profileInput"
                        placeholder="Price"
                        name="price"
                    >
                        <label className="inputLabel">Price</label>
                    </Input>
                    <textarea
                        className="profileInput"
                        name="description"
                    >
                        <label className="inputLabel" name="description">Description</label>
                    </textarea>
                    <div className="productFormCheckSelect">
                        <Input
                            type="checkbox"
                            className="profileInput"
                            name="isOnline"

                        >
                            <label className="inputLabel">isOnline</label>
                        </Input>
                        <select
                            name="category"
                        >
                            <option value="">Select Category</option>
                            <option value="1">Test 1</option>
                            <option value="2">Test 2</option>
                        </select>
                    </div>
                    <Input
                        type="submit"
                        className="profileInput"
                        name="submit"
                        value="Create product"
                    />
                </form>
            </Accordion>


            <Accordion accordionTitle="Varieties">
                <Table data={data} headers={headers} columnKeys={columnKeys} renderAction={() => (
                    <div>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                )} />

                <form onSubmit={handleSubmitVariety}>
                    <Input
                        type="text"
                        className="profileInput"
                        placeholder="Variety name"
                        name="varietyName"
                    >
                        <label className="inputLabel">Variety name</label>
                    </Input>
                    <Input
                        type="text"
                        className="profileInput"
                        placeholder="Size"
                        name="varietySize3"
                    >
                        <label className="inputLabel">Variety size</label>
                    </Input>
                    <Input
                        type="color"
                        className="profileInput"
                        placeholder="Variety color"
                        name="varietyColor"
                    >
                        <label className="inputLabel">Variety color</label>
                    </Input>

                    <Input
                        type="number"
                        className="profileInput"
                        placeholder="Variety stock"
                        name="varietyStock"
                    >
                        <label className="inputLabel">Variety stock</label>
                    </Input>


                    <Input
                        type="submit"
                        className="profileInput"
                        name="submit"
                        value="Create variety"
                    />
                </form>
            </Accordion>


        </div>
    );
}

export default ProductForm;
