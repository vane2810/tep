import React from "react";
import Styles from "../styles/globals.css";
import Video from "../components/video"
import Footer from "../components/footer"
import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('../components/video'), { ssr: false })
 

export default function HomePage(){
  return (
    <section>
      <div className="w-50 h-3 rosado"></div>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      <div className="w-50 h-3 rosado"></div>
      <div>
        <NoSSR/>
      </div>
      <div className="w-50 h-3 rosado"></div>
      <div className="flex justify-center items-center mt-10 mb-10">
        <img src="/img/page/starly.png" alt="Animated Image" className="h-40 w-auto mr-10 ml-10" />
      </div>
      <div className="w-50 h-3 rosado"></div>
      <div>
        <Footer/>
      </div>
    </section>
  );
}

