
import useProducts from '../../hooks/useProducts';
import ShopLayout from '../../Components/ReUseComponents/ShopLayout/ShopLayout';

const Phone = () => {
    const [products, refetch] = useProducts();
    console.log(products);
    const Phone = products.filter(item => item.type === "mobile")
    return (
        <div>
            <ShopLayout items={Phone} title="Mobile"></ShopLayout>
        </div>
    );
};

export default Phone;