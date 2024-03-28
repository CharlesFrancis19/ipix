import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome</h1>
      <p className="text-lg text-center mb-6">
        To view the shop page, use the <code className="bg-gray-200 px-2 py-1 rounded-md">/shop</code> route. Here, you can select items based on category. You can click on the image to redirect to the item's single page.
      </p>
      <p className="text-lg text-center mb-6">
        For users, you can utilize the <code className="bg-gray-200 px-2 py-1 rounded-md">/users</code> route to access and view the list of users.
      </p>
      <iframe
        src="/cv.pdf"
        className="w-full h-screen"
        title="CV"
      />
    </div> 
  );
}
