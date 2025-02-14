import React from 'react';
import { assets } from '../assets/assets';


const ChatbotPopup = () => {
    return (
        <div className='fixed bottom-[100px] right-5 cursor-pointer' >
            <img className='w-10 ' src={assets.chatbot} alt="" />
        </div>
    );
};

export default ChatbotPopup;