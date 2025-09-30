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
        <>
            <Swipe />
            <div ref={TopCategories}>
                <TopCats />
            </div>
        </>
    );
}

export default Home;
