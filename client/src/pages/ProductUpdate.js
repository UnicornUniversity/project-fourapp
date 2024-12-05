import ProductForm from "../containers/profile/ProductForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProductUpdate() {
    return (
        <section className="profileContent">
            <ProfileSidebar />

            <ProductForm
                initialData={{ name: "John", price: "20CZK", description: "bla bal bla", isOnline: true, category: "category" }}
                onSubmit={(data) => {
                    if (data.id) {
                        // Update logic
                        console.log("Updating:", data);
                    } else {
                        // Create logic
                        console.log("Creating:", data);
                    }
                }}
            />


        </section>
    );
}

export default ProductUpdate;
