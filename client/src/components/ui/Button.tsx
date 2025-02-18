// import React, { ReactNode } from 'react'


// interface ButtonProps {
//     size?: "sm" | "md" | "lg" | 'xl'; 
//     colour?: string; 
//     onClickHandler?: () => void; 
//     text?: string; 
//     textColour?: string; 
//     startingIcon?: ReactNode; 
//     endingIcon?: ReactNode; 
//     hideText?:boolean
//   }

//   const sizeClasses = {
//     sm: "text-md sm:text-md md:text-lg space-x-3 px-2 py-2",
//     md: "text-lg sm:text-md md:text-lg space-x-5 px-3 py-2",
//     lg: "text-lg sm:text-md md:text-lg px-3 py-2",
//     xl: "text-2xl sm:text-md md:text-lg space-x-5 px-7 py-2",
//   };


// const Button: React.FC<ButtonProps> = ({ size, colour, onClickHandler,textColour, text, startingIcon,endingIcon, hideText }) => {
//   return (
//     <button 
//         type="submit"
//         onClick={onClickHandler} 
//         // style={{ backgroundColor: colour }}  
//         className={` flex justify-between items-center text-center  w-fit cursor-pointer ${textColour} ${sizeClasses[size]} ${colour} rounded-xl`}
//     >
//           <div className={`${startingIcon?"pr-2":""}`}>
//             {
//               startingIcon&&
//                 <div>
//                   <div>
//                     {startingIcon}
//                   </div>
//                 </div>
//             }
//           </div>
//           <div className={`${hideText ? "md:hidden" : "md:block"} lg:block`}>
//             {text}
//         </div>
//         <div>
//           {
//               endingIcon&&
//                 <div>
//                   <div>
//                     {endingIcon}
//                   </div>
//                 </div>
//             }
//         </div>
//     </button>
//   )
// }

// export default Button


import React, { ReactNode } from "react";

interface ButtonProps {
  size?: "sm" | "md" | "lg" | "xl";
  colour?: string;
  onClickHandler?: () => void;
  text?: string;
  textColour?: string;
  startingIcon?: ReactNode;
  endingIcon?: ReactNode;
  hideText?: boolean;
}

const sizeClasses = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
  xl: "text-xl px-6 py-3",
};

const Button: React.FC<ButtonProps> = ({
  size,
  colour ,
  onClickHandler,
  textColour,
  text,
  startingIcon,
  endingIcon,
  hideText,
}) => {
  return (
    <button
      type="submit"
      onClick={onClickHandler}
      className={`flex items-center justify-center w-auto min-w-[100px] px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${sizeClasses[size]} ${colour} ${textColour} hover:opacity-80 active:scale-95`}
    >

      {startingIcon && <div className="mr-2 flex items-center">{startingIcon}</div>}

      {!hideText && (
        <div className={`hidden md:inline-block lg:inline-block text-center`}>
          {text}
        </div>
      )}

      {/* Ending Icon */}
      {endingIcon && <div className="ml-2 flex items-center">{endingIcon}</div>}
    </button>
  );
};

export default Button;
