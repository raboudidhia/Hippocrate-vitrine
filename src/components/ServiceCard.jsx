import React from "react";

export const ServiceCard = ({ obj }) => {
    const { title, content, number, img } = obj;
    return (
        <div className="rounded-lg overflow-hidden w-[472px] h-[450px] relative shadow-xl">
            <img
                src="/src/assets/hipp5.jpg"
                className="h-[255px] w-[472px] shadow-md"
                alt=""
            />
            <div>
                <p className="text-[#1F8287] text-opacity-[15%] text-[80px] font-extrabold absolute -translate-y-1 font-sans ">
                    {number}
                </p>
                <h2 className="text-[20px] font-semibold pl-24 pt-9">
                    {title}
                </h2>
                <p
                    className="text-[#535659] text-[18px] pl-12 pt-6 p-8"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></p>
            </div>
        </div>
    );
};
