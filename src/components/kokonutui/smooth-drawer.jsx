import React, {useState, useEffect, useContext} from "react";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../components/ui/drawer";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";

function PriceTag({ price, discountedPrice }) {
    return (
        <div className="flex items-center justify-around gap-4 max-w-fit mx-auto">
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    ${discountedPrice}
                </span>
                <span className="text-lg line-through text-zinc-400 dark:text-zinc-500">
                    ${price}
                </span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Lifetime access
                </span>
                <span className="text-xs text-zinc-700 dark:text-zinc-300">
                    One-time payment
                </span>
            </div>
        </div>
    );
}

const drawerVariants = {
    hidden: { y: "100%", opacity: 0, rotateX: 5, transition: { type: "spring", stiffness: 300, damping: 30 } },
    visible: { y: 0, opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8, staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } },
};

export default function SmoothDrawer({ onPreview, productId }) {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const handleSecondaryClick = () => {};
    const [product, setProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Only fetch when drawer is opened
        if (!isOpen || !productId) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendURL}/api/Product/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [isOpen, productId]);

    const truncateWords = (text, wordLimit) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
        if (open && onPreview) {
            onPreview();
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                <Button variant="default">Preview</Button>
            </DrawerTrigger>

            <DrawerContent className="max-w-fit mx-auto p-6 rounded-2xl shadow-xl">
                {!product ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mx-auto w-full max-w-[340px] space-y-6"
                    >
                        <motion.div variants={itemVariants}>
                            <DrawerHeader className="px-0 space-y-2.5">
                                <DrawerTitle className="text-2xl font-semibold flex items-center gap-2.5 tracking-tighter p-2">
                                    <motion.div variants={itemVariants} className="flex-1/3">
                                        <div className="p-1.5 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                                            <img src={product.image} alt="Logo" className="hidden dark:block w-30 h-30 object-cover rounded-md" />
                                            <img src={product.image} alt="Logo" className="block dark:hidden w-30 h-30 object-cover rounded-md" />
                                        </div>
                                    </motion.div>
                                    <motion.span variants={itemVariants} className={`flex-2/3`}>{truncateWords(product.name, 5)}</motion.span>
                                </DrawerTitle>
                                <motion.div variants={itemVariants}>
                                    <DrawerDescription className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 tracking-tighter">
                                        {truncateWords(product.description, 20)}
                                    </DrawerDescription>
                                </motion.div>
                            </DrawerHeader>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <PriceTag price={product.price} discountedPrice={((33/100)*product.price).toFixed(2)} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <DrawerFooter className="flex flex-col gap-3 px-0">
                                <div className="w-full">
                                    <a
                                        href="https://kokonutui.pro/#pricing"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group w-full relative overflow-hidden inline-flex items-center justify-center h-11 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-900 dark:from-neutral-900 dark:to-black text-white text-sm font-semibold tracking-wide shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-black/30 hover:from-neutral-700 hover:to-neutral-800 dark:hover:from-neutral-800 dark:hover:to-neutral-950"

                                    >
                                        Add to Cart
                                    </a>
                                </div>

                                <DrawerClose asChild>
                                    <Button
                                        variant="outline"
                                        onClick={handleSecondaryClick}
                                        className="w-full h-11 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-sm font-semibold transition-colors tracking-tighter"
                                    >
                                        Product Details
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </motion.div>
                    </motion.div>
                )}
            </DrawerContent>
        </Drawer>
    );
}