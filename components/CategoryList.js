import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categoryData } from "@/utils/categoryData";

function CategoryList({ onCategoryChange, searchCategory }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleClick = (item, index) => {
    if (selectedCategory !== index) {
      setSelectedCategory(index);
      onCategoryChange(item.value);
    } else {
      setSelectedCategory(null);
    }
  };
  useEffect(() => {
    const filteredCategories = categoryData.filter((item) =>
      item.name.toLowerCase().includes(searchCategory.toLowerCase()),
    );
    setCategoryList(filteredCategories);
  }, [searchCategory]);

  return (
    <div>
      <h2 className="font-bold px-2">Select Category</h2>
      <div className="h-[70vh] overflow-y-auto px-7">
        {categoryList.map((item, index) => (
          <motion.div
            key={index}
            className={`relative flex items-center h-[70px] pl-4 m-2 rounded-lg cursor-pointer text-[18px] border-[#283618] ${
              selectedCategory === index
                ? "bg-[#B7B7A4] shadow-lg text-shadow-lg border border-[#283618]/40"
                : "bg-[#D4D4D4] shadow-md"
            } bg-category`}
            onClick={() => handleClick(item, index)}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            animate={{
              scale: selectedCategory === index ? 1.05 : 1,
            }}
            style={{
              backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgb(240, 239, 235)), url(${item.icon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span
              className={` ${selectedCategory === index ? "border-text" : ""}`}
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
