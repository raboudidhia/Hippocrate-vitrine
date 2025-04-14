export const Map = () => {
  return (
    <div className="w-full flex justify-center py-8 bg-gray-100">
      <div className="w-full max-w-screen-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.5042413487113!2d10.154764176235922!3d36.80643516734735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd331a505cedd1%3A0xb60990fec6992f9!2sL&#39;Hippocrate%20Tunisien!5e0!3m2!1sfr!2stn!4v1732650424086!5m2!1sfr!2stn"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
    </div>
  );
};
export default Map;