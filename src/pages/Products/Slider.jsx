'use client';

import React, { useId } from 'react';
import { useSliderInput } from '@/hooks/use-slider-input';
import { Input } from '@/components/ui/base-input';
import { Label } from '@/components/ui/base-label';
import { Slider, SliderThumb } from '@/components/ui/base-slider';

const items = [
    { id: 1, price: 20 },
    { id: 2, price: 95 },
    { id: 3, price: 110 },
    { id: 4, price: 125 },
    { id: 5, price: 130 },
    { id: 6, price: 900 },
];

function PriceRangeSlider() {
    const id = useId();

    // Calculate min and max prices
    const minValue = Math.min(...items.map((item) => item.price));
    const maxValue = Math.max(...items.map((item) => item.price));

    // Use your custom hook for handling slider/input state
    const {
        sliderValues,
        inputValues,
        handleSliderChange,
        handleInputChange,
        validateAndUpdateValue,
    } = useSliderInput({
        minValue,
        maxValue,
        initialValue: [200, 800],
    });

    return (
        <div className="space-y-4 p-2">
            {/* Slider Section */}
            <div className="flex flex-col gap-2.5">
                <Slider
                    value={sliderValues}
                    onValueChange={(value) => handleSliderChange(value)}
                    min={minValue}
                    max={maxValue}
                    step={10}
                    aria-label="Price Range Slider"
                >
                    <SliderThumb />
                    <SliderThumb />
                </Slider>

                {/* Display current values above slider */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${sliderValues[0]}</span>
                    <span>${sliderValues[1]}</span>
                </div>
            </div>

            {/* Inputs Section */}
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-2.5">
                    <Label htmlFor={`${id}-min`}>Min Price</Label>
                    <Input
                        id={`${id}-min`}
                        type="number"
                        value={inputValues[0]}
                        onChange={(e) => handleInputChange(e, 0)}
                        onBlur={() => validateAndUpdateValue(Number(inputValues[0]) || minValue, 0)}
                        placeholder={`$${minValue}`}
                    />
                </div>

                <div className="space-y-2.5">
                    <Label htmlFor={`${id}-max`}>Max Price</Label>
                    <Input
                        id={`${id}-max`}
                        type="number"
                        value={inputValues[1]}
                        onChange={(e) => handleInputChange(e, 1)}
                        onBlur={() => validateAndUpdateValue(Number(inputValues[1]) || maxValue, 1)}
                        placeholder={`$${maxValue}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default PriceRangeSlider;
