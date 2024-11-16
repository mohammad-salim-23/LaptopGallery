
import useProducts from '../../hooks/useProducts';
import ShopLayout from '../../Components/ReUseComponents/ShopLayout/ShopLayout';

const Phone = () => {
    document.title = `Laptop Gallery || Phone`;
    const [products, refetch] = useProducts();
    // console.log(products);
    const Phone = products.filter(item => item.type === "Mobile")
    return (
        <div>
            <ShopLayout items={Phone} title="Mobile"></ShopLayout>
        </div>
    );
};

export default Phone;