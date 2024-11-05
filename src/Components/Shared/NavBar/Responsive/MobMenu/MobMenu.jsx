import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobMenu({ Menus }) {
    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState(null);
    const drawerRef = useRef(null);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        setClicked(null);
    };

    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const subMenuDrawer = {
        enter: { height: "auto", overflow: "hidden" },
        exit: { height: 0, overflow: "hidden" },
    };

    return (
        <div>
            <button onClick={toggleDrawer} className="lg:hidden z-[999] relative">
                {isOpen ? <X /> : <Menu />}
            </button>

            <motion.div
                ref={drawerRef}
                className="fixed left-0 right-20 top-16 overflow-y-auto h-full text-black bg-white z-50 pb-16"
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? "0%" : "-100%" }}
            >
                <ul>
                    {Menus.map(({ name, subMenu, link }, i) => {
                        const isClicked = clicked === i;
                        const hasSubMenu = subMenu?.length;
                        return (
                            <li key={name}>
                                <span
                                    className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                                    onClick={() => setClicked(isClicked ? null : i)}
                                >
                                    <Link to={`/${link}`} onClick={toggleDrawer}>
                                        {name}
                                    </Link>
                                    {hasSubMenu && (
                                        <ChevronDown
                                            className={`ml-auto ${isClicked && "rotate-180"}`}
                                        />
                                    )}
                                </span>
                                {hasSubMenu && (
                                    <motion.ul
                                        initial="exit"
                                        animate={isClicked ? "enter" : "exit"}
                                        variants={subMenuDrawer}
                                        className="ml-5"
                                    >
                                        {subMenu.map(({ name, link }) => (
                                            <li
                                                key={name}
                                                className="p-2 flex-center hover:bg-white/5 rounded-md gap-x-2 cursor-pointer"
                                            >
                                                {link ? (
                                                    <Link
                                                        to={`/products/${link}`}
                                                        className="text-black"
                                                        rel="noopener noreferrer"
                                                        onClick={toggleDrawer}
                                                    >
                                                        {name}
                                                    </Link>
                                                ) : (
                                                    <span>{name}</span>
                                                )}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </motion.div>
        </div>
    );
}




// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Menu, X, ChevronDown } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function MobMenu({ Menus }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [clicked, setClicked] = useState(null);
//     const toggleDrawer = () => {
//         setIsOpen(!isOpen);
//         setClicked(null);
//     };

//     const subMenuDrawer = {
//         enter: {
//             height: "auto",
//             overflow: "hidden",
//         },
//         exit: {
//             height: 0,
//             overflow: "hidden",
//         },
//     };

//     return (
//         <div>
//             <button onClick={toggleDrawer} className="lg:hidden z-[999] relative">
//                 {isOpen ? <X /> : <Menu />}
//             </button>

//             <motion.div
//                 className="fixed left-0 right-20 top-12 overflow-y-auto h-full text-black bg-white z-50 p-6 pb-16"
//                 initial={{ x: "-100%" }}
//                 animate={{ x: isOpen ? "0%" : "-100%" }}
//             >
//                 <ul>
//                     {Menus.map(({ name, subMenu, link }, i) => {
//                         const isClicked = clicked === i;
//                         const hasSubMenu = subMenu?.length;
//                         return (
//                             <li key={name} className="">
//                                 <span
//                                     className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
//                                     onClick={() => setClicked(isClicked ? null : i)}
//                                 >
//                                     <Link to={`/${link}`}>
//                                         {name}
//                                     </Link>
//                                     {hasSubMenu && (
//                                         <ChevronDown
//                                             className={`ml-auto ${isClicked && "rotate-180"} `}
//                                         />
//                                     )}
//                                 </span>
//                                 {hasSubMenu && (
//                                     <motion.ul
//                                         initial="exit"
//                                         animate={isClicked ? "enter" : "exit"}
//                                         variants={subMenuDrawer}
//                                         className="ml-5"
//                                     >
//                                         {subMenu.map(({ name, link }) => (
//                                             <li
//                                                 key={name}
//                                                 className="p-2 flex-center hover:bg-white/5 rounded-md gap-x-2 cursor-pointer"
//                                             >
//                                                 {link ? (
//                                                     <Link
//                                                         to={`/products/${link}`}
//                                                         className="text-black"
//                                                         rel="noopener noreferrer"
//                                                     >
//                                                         {name}
//                                                     </Link>
//                                                 ) : (
//                                                     <span>{name}</span>
//                                                 )}
//                                             </li>
//                                         ))}
//                                     </motion.ul>
//                                 )}
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </motion.div>
//         </div>
//     );
// }
