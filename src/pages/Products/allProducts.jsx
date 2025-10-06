// import React from  'react';
// import SmoothDrawer from '../../components/kokonutui/smooth-drawer.jsx';
//
// function AllProducts({ currentProducts, setProductId, truncateWords,gridRef }) {
//     return (
//         <div
//             ref={gridRef}
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 max-h-screen overflow-y-scroll"
//         >
//             {currentProducts.map((product, i) => (
//                 <div
//                     key={i}
//                     className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center text-center bg-white"
//                 >
//                     <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-cover mb-3 rounded-md"
//                     />
//                     <p className="font-medium text-gray-800">{truncateWords(product.name, 5)}</p>
//                     <p className="text-sm text-gray-500 mb-3">${product.price}</p>
//                     <SmoothDrawer onPreview={() => setProductId(product.id)} id={product.id} />
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default AllProducts;
