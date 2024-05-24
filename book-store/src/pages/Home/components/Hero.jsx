import Carousel from "./Carousel";
import { useState, useEffect } from "react";

import { slides, banner, iconMenu } from "../../../constants/index.js";

const Hero = () => {
  const [numIcons, setNumIcons] = useState(window.innerWidth < 992 ? 5 : 10);

  useEffect(() => {
    const handleResize = () => {
      setNumIcons(window.innerWidth < 992 ? 7 : 10);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="home" className="w-full min-h-screen">
      <div className="grid grid-rows-2 grid-flow-col gap-2 ">
        <div className="row-span-2 col-span-2 max-w-[830px] mx-auto my-auto">
          <Carousel autoSlide={true} autoSlideInterval={5000}>
            {[...slides.map((s) => <img src={s.img} alt="" />)]}
          </Carousel>
        </div>
        <img
          className="row-span-1 col-span-1 rounded-lg max-sm:hidden"
          src="https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/VNPay_392x156.jpg"
          alt=""
        ></img>
        <img
          className="row-span-1 col-span-1 rounded-lg max-sm:hidden"
          src="https://cdn0.fahasa.com/media/wysiwyg/Thang-01-2024/392x156_quy1.jpg"
          alt=""
        ></img>
      </div>
      <div className="grid grid-cols-4 gap-[10px] mt-5">
        {banner.map((s) => (
          <img key={s.id} src={s.img} alt="" className="rounded-lg" />
        ))}
      </div>

      <ul className="flex justify-between mt-4 bg-white px-6 pt-4 pb-6 rounded-lg">
        {iconMenu.slice(0, numIcons).map((s) => (
          <li className="w-20 flex flex-col items-center">
            <a href={`#${s.id}`}>
          <img key={s.id} src={s.img} alt="" className="sm:h-12 rounded-lg h-9 mb-2" />

            </a>
            <span className="text-[15px] text-center">{s.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hero;
