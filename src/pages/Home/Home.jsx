
import React, {useEffect, useRef} from "react";
import Swipe from "./Swiper";
import TopCats from "./TopCats.jsx";

function Home() {
    const TopCategories = useRef(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (TopCategories.current) {
                TopCategories.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        },5000)
        return () => clearTimeout(timer)
    },[])
    return (
        <div className="">
            <Swipe />
            <div ref={TopCategories}>
                <TopCats />
            </div>
        </div>
    );
}

export default Home;
