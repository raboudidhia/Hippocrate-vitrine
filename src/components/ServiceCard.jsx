import PropTypes from "prop-types";

export const ServiceCard = ({ obj }) => {
  const { title, content, number, img } = obj;
  return (
    <div className="rounded-lg overflow-hidden w-[min(90vw,472px)] md:h-[450px] relative shadow-xl">
      <img
        src={img}
        className="md:h-[255px] h-[200px] w-full shadow-md"
        alt=""
      />
      <div className=" p-2 px-8 md:p-0">
        <p className="text-[#1F8287] text-opacity-[15%] text-[80px] font-extrabold absolute -translate-y-1 font-sans hidden md:block  ">
          {number}
        </p>
        <h2 className="text-[20px] font-semibold md:pl-24 md:pt-9">{title}</h2>
        <p
          className="text-[#535659] text-[18px] md:pl-12 pt-6 md:p-8"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};
export default ServiceCard;
