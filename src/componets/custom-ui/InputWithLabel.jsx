import React from 'react'

const InputWithLabel = ({ name, onKeyDown, placeholder, value, onChange, type, maxLength, minLength }) => {
    return (
        <input
            type={type}
            className={`outline-none w-full text-sm leading-100 text-grey-light/80 placeholder:text-grey-light/30`}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            minLength={minLength}
            onKeyDown={onKeyDown}
        />
    )
}

export default InputWithLabel