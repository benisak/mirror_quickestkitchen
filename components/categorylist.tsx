"use client"; // Ensure this component can use client-side features

import { useState } from "react";
import Link from "next/link";
import {
  AllPostCategories,
  PostCategory
} from "@/shared/entities/PostCategory";

interface CategoryListProps {
  topAndOtherCategories: AllPostCategories;
  onLinkClick: () => void; // Add onLinkClick prop
}

const CategoryList: React.FC<CategoryListProps> = ({
  topAndOtherCategories,
  onLinkClick // Destructure onLinkClick
}) => {
  const { topCategories, otherCategories } = topAndOtherCategories;
  useState(false); // This state seems unused; consider removing if not needed

  return (
    <div className="w-full"> {/* Ensure full width */}
      <div className="grid w-full grid-cols-4 gap-4 md:grid-cols-8 md:gap-6"> {/* Make the grid full width */}
        <h2 className="sr-only">Categories</h2> {/* Accessibility improvement */}

        {topCategories.map(category => (
          <Link
            key={category._id}
            href={`/category/${category.slug ? category.slug : "#"}`}
            passHref
            onClick={onLinkClick} // Call onLinkClick when the link is clicked
          >
            <div className="flex flex-col items-center text-center">
              {/* Container for category image */}
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg md:rounded-t-lg md:rounded-b-none bg-gray-100 md:h-[120px] md:w-[120px]">
                {category.image?.asset?.url ? (
                  <img
                    src={category.image.asset.url}
                    alt={category.image.alt || "Category image"}
                    className="h-[72px] w-[72px] rounded-lg md:rounded-t-lg md:rounded-b-none object-cover md:h-[120px] md:w-[120px]"
                  />
                ) : (
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg md:rounded-t-lg md:rounded-b-none bg-gray-200 md:h-[120px] md:w-[120px]">
                    <span className="text-sm text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Category title */}
              <h3
                className="w-[72px] bg-white md:bg-[#f6f6f6] py-2 text-center text-[14px] font-[400] leading-[20px] text-[#000000] rounded-b-lg overflow-hidden whitespace-nowrap md:w-[120px] md:text-[16px] md:leading-[24px]"
              >
                {category.title}
              </h3>
            </div>
          </Link>
        ))}

        {/* "All Recipes" Link */}
        <div className="flex flex-col items-center text-center">
          <Link href="/archive" passHref onClick={onLinkClick}>
            {/* Container for "All Recipes" */}
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg md:rounded-t-lg md:rounded-b-none bg-[#d3efc8] md:h-[120px] md:w-[120px]">
              <p className="text-center text-[16px] font-[700] leading-[19.36px] text-[#000000] md:text-[20px] md:leading-[24.2px]">
                <span>All</span>
                <br />
                <span>recipes</span>
              </p>
            </div>
          </Link>
          <Link href="/archive" passHref onClick={onLinkClick}>
            {/* Typography for "View more" */}
            <p className="w-[72px] bg-white md:bg-[#f6f6f6] py-2 text-center text-[14px] font-[400] leading-[20px] text-[#000000] rounded-b-lg md:w-[120px] md:text-[16px] md:leading-[24px]">
              View more
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
