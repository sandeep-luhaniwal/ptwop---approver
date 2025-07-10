import React from 'react'

const InputWithLabelSub = ({ name, onKeyDown, className, children, placeholder, value, onChange, type, maxLength, minLength }) => {
    return (
        <div className="flex flex-col w-full gap-[15px]">
            <label htmlFor={name} className='text-base md:text-lg text-black/60 leading-140'>{children}</label>
            <input
                type={type}
                className={`outline-none w-full ${className ?"placeholder:text-black/80 w-full" :"placeholder:text-black/30"} px-3 bg-[#F3F3F3] rounded-[10px] md:px-4 xl:px-5 py-2.5 lg:py-3 xl:py-[13px] text-sm leading-100 text-black `}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                minLength={minLength}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default InputWithLabelSub