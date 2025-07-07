import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import HeroSection from "@/components/HeroSection";
import Subscription from "@/components/Subscription";
import CategoryList from "@/components/categorylist";
import {
  getCategorizedPostCategories,
  getCategorizedPostCategoriesLabels,
  getFeaturedRecipes,
  getNonFeaturedRecipes
} from "@/lib/sanity/client";

export default async function HomeLifeStyle({}) {
  const featuredPost = await getFeaturedRecipes(18); // Fetching featured posts
  const posts = await getNonFeaturedRecipes(12); // Fetching non-featured posts
  const categoriesForList = await getCategorizedPostCategories(7); // Fetching categories

  return (
    <>
      {/* Main Content Section */}
      <div className="bg-white flex w-full flex-col gap-[1px] lg:gap-[55px] px-4 md:px-[160px]">
        {/* Hero Section */}
        <div className="w-full mt-[88px] lg:mt-[88px]">
          <HeroSection />
        </div>

        {/* Category List Section */}
        <div className="w-full pt-8">
          <CategoryList topAndOtherCategories={categoriesForList} />
        </div>

        {/* Favorite Recipes Section */}
        <div className="pb-6 pt-8">
          {featuredPost.length >= 6 && (
            <>
              <div className="mt-0 w-full">
              <h2 className="text-[#1f1f1f] text-xl font-medium font-nunito md:text-3xl md:font-medium">
  <strong>Favorite recipes</strong>
</h2>

              </div>

              <div className="mb-10 mt-[32px] grid w-full gap-[32px] md:grid-cols-3">
                {featuredPost.slice(0, 6).map((post) => (
                  <PostList
                    key={post._id}
                    post={post}
                    aspect="landscape"
                    pathPrefix="blog"
                    fontWeight="normal"
                    preloadImage={true}
                    className="w-full"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Full-width Subscription Section */}
      <div className="w-full bg-gray-100 mb-8">
        <Subscription />
      </div>

      {/* Other Posts Section */}
      <div className="flex w-full flex-col gap-[1px] lg:gap-[55px] px-4 md:px-[120px]">
        {/* Other 12 Posts Section */}
        <div className="pb-0 pt-6">
          {featuredPost.length > 6 && (
            <div className="mb-2 mt-0 grid w-full gap-[32px] md:grid-cols-3">
              {featuredPost.slice(6, 18).map((post) => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="landscape"
                  pathPrefix="blog"
                  fontWeight="normal"
                  preloadImage={true}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Archive Link */}
        <div className="archive-link flex w-full justify-center px-0 sm:px-[30px] sm:py-[50px] md:py-0 pb-[56px] md:pb-[32px] pt-[24px]">
          <Link
            href="/archive"
            className="bg-white border border-[#2d810d] hover:border-[#2d810d] text-[#2d810d] hover:bg-[#2d810d] hover:text-white transition-colors duration-300 ease-in-out relative inline-flex w-full max-w-[100%] items-center justify-center gap-1 rounded-md px-4 py-3 text-center text-sm font-medium focus:z-20 disabled:pointer-events-none disabled:opacity-40 md:w-auto"
            style={{
              borderRadius: "8px",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            <span>See all recipes</span>
          </Link>
        </div>
      </div>
    </>
  );
}
