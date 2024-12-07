// ContactForm.jsx
export const ContactForm = () => {
  return (
    <div className="w-full bg-white flex justify-center py-16" id="contact">
      <div className="max-w-screen-lg w-[95%] bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-2/5 bg-[#1f1f1f] text-white p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold font-['Poppins'] mb-3">
              Informations de contact
            </h2>
            <p className="text-[#c8c8c8] text-sm md:text-base mb-14">
              N&apos;hésitez pas à nous envoyer un message !
            </p>
            <div className="mb-4">
              <i className="fas fa-phone-alt mr-4"></i> +216 98 269 561
            </div>
            <div className="mb-4">
              <i className="fas fa-envelope mr-4"></i>{" "}
              hippocrate.tunisien@gmail.com
            </div>
            <div>
              <i className="fas fa-map-marker-alt mr-4"></i> Bab Saadoune,
              Tunisia, 1029
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <a
              href="https://www.facebook.com/Hippocrate.tunisien"
              className="w-9 h-9 bg-[#1F8287] rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#1F8287] rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8">
          <form className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="nom"
                  className="block text-[#8d8d8d] font-medium"
                >
                  NOM
                </label>
                <input
                  id="nom"
                  type="text"
                  className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
                />
              </div>
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-[#8d8d8d] font-medium"
                >
                  PRÉNOM
                </label>
                <input
                  id="prenom"
                  type="text"
                  className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[#8d8d8d] font-medium"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-[#8d8d8d] font-medium"
              >
                NUMÉRO DE TÉLÉPHONE
              </label>
              <input
                id="phone"
                type="text"
                defaultValue="+216"
                className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-[#8d8d8d] font-medium"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                rows="2"
                className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2 resize-none"
                placeholder="Écrivez votre message"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-40 bg-[#1f8287] text-white py-2 px-4 rounded shadow hover:bg-[#1d6f6f] text-base font-bold"
              >
                ENVOYER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
