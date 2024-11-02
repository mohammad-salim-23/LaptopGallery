import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DesktopMenu({ menu }) {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  return (
    <motion.li
      className="group/link"
      onHoverStart={() => {
        toggleHoverMenu();
      }}
      onHoverEnd={toggleHoverMenu}
      key={menu.name}
    >
      <Link to={`${menu.link}`}>
        <span className="flex-center gap-1 hover:bg-white/5 cursor-pointer px-3 py-1 rounded-xl">
          {menu.name} 
         
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
          )}
        </span>
      </Link>
      {hasSubMenu && (
        <motion.div
          className="sub-menu"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${menu.gridCols === 3
              ? "grid-cols-3"
              : menu.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
              }`}
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => (
                <div className="relative cursor-pointer" key={i}>
                  <div className="flex-center gap-x-4 group/menubox">
                    <div>

                      <Link className="font-semibold" to={`/products/${submenu.link}`}>
                        {submenu.name}
                      </Link>

                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>

    
  );
}
