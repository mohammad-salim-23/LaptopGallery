// import Marquee from "react-fast-marquee";


// const Category = () => {
//     const categories = [
//         {
//             "id": 1,
//             "title": "Laptop",
//             "icon": "📷"
//         },
//         {
//             "id": 2,
//             "title": "Laptop Accessories",
//             "icon": "📷"
//         },
//         {
//             "id": 3,
//             "title": "Mobile ",
//             "icon": "📷"
//         }, {
//             "id": 4,
//             "title": "Mobile Accessories",
//             "icon": "📷"
//         }
//     ];

//     return (
//         <div className="mx-auto container">
//             <div className="text-center my-10">
//                 <h1 className="text-3xl font-bold">Featured Category</h1>
//                 <p className="text-xl text-black text-opacity-50 my-2">
//                     Get Your Desired Product from Featured Category!
//                 </p>
//             </div>

//             <Marquee pauseOnHover={true}>
//                 <div className="flex justify-center space-x-7">
//                     {categories.map(category => (
//                         <div
//                             key={category.id}
//                             className="flex flex-col items-center p-6 bg-slate-300 hover:bg-slate-400 cursor-pointer rounded-lg shadow-md w-56"
//                         >
//                             <div className="text-4xl mb-4">{category.icon}</div>
//                             <p className="text-lg font-medium">{category.title}</p>
//                         </div>
//                     ))}
//                 </div>
//             </Marquee>
//         </div>
//     );
// };

// export default Category;
