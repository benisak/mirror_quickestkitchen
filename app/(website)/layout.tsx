import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora, Nunito } from "next/font/google";
import {
  getAllRecipeSlugs,
  getCategorizedPostCategories,
  getSettings,
} from "@/lib/sanity/client";
import Footer from "@/components/footer";
import GetNavbar from "@/components/getnavbar";
import { urlForImage } from "@/lib/sanity/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

async function sharedMetaData(params: any) {
  const settings = await getSettings();

  return {
    // enable this for resolving opengraph the images
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Quickest Kitchen | Quick & Delicious Recipes for Busy Lives",
      template: "%s | Quickest Kitchen | Quick & Delicious Recipes for Busy Lives"
    },
    description:
      settings?.description ||
      "Discover quick, simple, and flavorful recipes perfect for your busy lifestyle. Quickest Kitchen makes cooking at home effortless and delicious, so you can enjoy great meals without the hassle.",
    keywords: ["recipes", "cooking", "easy recipes", "dinner ideas", "healthy recipes", "meal planning", "desserts", "baking", "quick meals", "homemade", "cooking tips", "food blog", "kitchen hacks", "family meals", "comfort food"],
    authors: [{ name: "Surjith" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||  
            "/img/opengraphQK.png",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Quickest Kitchen | Quick & Delicious Recipes for Busy Lives",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}


const siteUrl = "https://www.quickestkitchen.com/"; // Ensure this is correct

export async function generateMetadata({ params }: { params: any }) {
  const settings = await getSettings();

  const siteTitle = "Quickest Kitchen | Quick & Delicious Recipes for Busy Lives";
  const siteDescription =
    "Discover quick, simple, and flavorful recipes perfect for your busy lifestyle. Quickest Kitchen makes cooking at home effortless and delicious, so you can enjoy great meals without the hassle.";
    
  const keywords = [
    "recipes",
    "cooking",
    "easy recipes",
    "dinner ideas",
    "healthy recipes",
    "meal planning",
    "desserts",
    "baking",
    "quick meals",
    "homemade",
    "cooking tips",
    "food blog",
    "kitchen hacks",
    "family meals",
    "comfort food"
  ];

  const ogImage = `${siteUrl}/img/opengraphQK.png`;
  const twitterHandle = "@quickestkitchen";

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    },
    description: siteDescription,
    keywords: keywords,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl, // Ensure this is correct
      images: [
        {
          url: ogImage, // Corrected to avoid duplication
          width: 1200, // Recommended Open Graph size
          height: 630,
          alt: "Quickestkitchen Open Graph Image"
        }
      ],
      siteName: "Quickestkitchen",
      type: "website"
    },
    twitter: {
      title: siteTitle,
      description: siteDescription,
      card: "summary_large_image",
      site: twitterHandle,
      images: [ogImage]
    },
    icons: {
      icon: "/img/Favicon%20QK.png",
      apple: "/img/Favicon%20QK.png"
    }
  };
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const settings = await getSettings();

  const categoriesForNavbar = await getCategorizedPostCategories(2);
  const categoriesForNavbar1 = await getCategorizedPostCategories(3);
  const categoriesForNavbarMobileList =
    await getCategorizedPostCategories(7);

  const slugs = await getAllRecipeSlugs();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, nunito.variable)}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PXGJ36HN');`
          }}
        />
        {/* End Google Tag Manager */}
        {/* Custom favicon links */}
        <link rel="icon" type="image/png" sizes="32x32" href="/img/Favicon%20QK.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/Favicon%20QK.png" />
      </head>

      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXGJ36HN"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <GetNavbar
            topAndOtherCategories={categoriesForNavbar}
            Categoriesmobile3={categoriesForNavbar1}
            CategoriesmobileList={categoriesForNavbarMobileList}
          />
          <div>{children}</div>
          <Footer {...settings} />
        </Providers>
      </body>
    </html>
  );
}
