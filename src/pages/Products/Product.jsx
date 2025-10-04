import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Button } from '../../components/ui/button.jsx'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';1
function Product() {
  return (
    <div className='flex border-2 border-black w-full h-screen gap-1'>
        <aside className='border-2 border-black w-1/5 p-1 flex flex-col items-center gap-5'>
            <div className='flex gap-2 items-center pt-5'>
                <FilterAltIcon/>
                <p className={`text-xl font-semibold`}>Filters</p>
            </div>
            <Accordion type="single" collapsible className="w-full lg:w-[75%]">
                <AccordionItem value="reui-1">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>Men's Clothings</AccordionContent>
                    <AccordionContent>Women's Clothings</AccordionContent>
                    <AccordionContent>Men's Clothings</AccordionContent>
                </AccordionItem>

            </Accordion>
        </aside>
        <main className={ 'w-4/5 border-2 border-black'}>
            Main
            <Button>Add to Cart</Button>
        </main>
    </div>
  )
}

export default Product
