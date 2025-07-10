import Link from "next/link";

const CtaButton = ({
  children,
  left,
  onClick,
  className,
  transparent,
  url,
  blank,
  main,
  ...rest
}) => {
  return url ? (
    <Link {...rest}
      onClick={onClick}
      href={url}
      target={blank}
      className={`${className} ${left ? "ml-0 text-left" : "mx-auto  text-center flex justify-center"
        } ${main ? "text-sm md:text-base py-2 px-4 bg-[#ECE8F2] text-[#4B5563] hover:opacity-85 w-auto" : "text-white bg-purple py-3 lg:py-4 w-full text-base hover:bg-purple-light"}  font-normal cursor-pointer leading-100 rounded-[10px] duration-300`}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${className} ${left ? "ml-0 text-left" : "mx-auto  text-center flex justify-center"
        } ${main ? "text-sm md:text-base py-2 px-4 bg-[#ECE8F2] text-[#4B5563] hover:opacity-85 w-auto" : "text-white bg-purple py-3 lg:py-4 w-full text-base hover:bg-purple-light"}  font-normal cursor-pointer leading-100 rounded-[10px] duration-300`}
    >
      {children}
    </button>
  );
};

export default CtaButton