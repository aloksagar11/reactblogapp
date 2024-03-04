import React,{useId} from 'react'

const SelectOption = ({
    options,
    lable,
    className ='',
    ...props
},ref) => {
    const id = useId();
  return (
    <div className='w-full'>
       {lable && <label htmlFor={id} ></label>}
    <select name="" id={id} ref={ref} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        {
            options?.map((option)=>{
                <option id={option} value={option}>
                    {option}
                </option>
            })
        }
    </select>
    </div>
  )
}

export default React.forwardRef(SelectOption);
