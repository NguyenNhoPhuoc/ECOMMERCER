import React from 'react';

function NewLetter() {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Đăng ký nhận tin từ PN</p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none bg-white' type='email' placeholder='Nhập Email' required/>
                <button onClick={onSubmitHandler} type='submit' className='bg-black text-white text-xs px-10 py-4 '>Đăng ký</button>
            </form>
        </div>
    )
}

export default NewLetter
