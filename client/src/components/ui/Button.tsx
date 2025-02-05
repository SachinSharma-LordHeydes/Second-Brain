import React, { ReactNode } from 'react'


interface ButtonProps {
    size?: "sm" | "md" | "lg" | 'xl'; 
    colour?: string; 
    onClickHandler?: () => void; 
    text?: string; 
    textColour?: string; 
    startingIcon?: ReactNode; 
    endingIcon?: ReactNode; 
    hideText?:boolean
  }

  const sizeClasses = {
    sm: "text-md space-x-3 px-2 py-2",
    md: "text-lg space-x-5 px-3 py-2",
    lg: "text-lg md:text-lg px-3 py-2",
    xl: "text-2xl space-x-5 px-7 py-2",
  };


const Button: React.FC<ButtonProps> = ({ size, colour, onClickHandler,textColour, text, startingIcon,endingIcon,hideText }) => {
  return (
    <button 
        type="submit"
        onClick={onClickHandler} 
        // style={{ backgroundColor: colour }}  
        className={` flex justify-between items-center text-center  w-fit  cursor-pointer ${textColour} ${sizeClasses[size]} ${colour} rounded-xl`}
    >
          <div className={`${startingIcon?"pr-2":""}`}>
            {
              startingIcon&&
                <div>
                  <div>
                    {startingIcon}
                  </div>
                </div>
            }
          </div>
        <div className={`${hideText?"hidden md:block":""}`}>
            {text}
        </div>
        <div>
          {
              endingIcon&&
                <div>
                  <div>
                    {endingIcon}
                  </div>
                </div>
            }
        </div>
    </button>
  )
}

export default Button
