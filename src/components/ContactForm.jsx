import { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS SDK

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        phone: "+216",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object that matches the template's placeholders
        const templateParams = {
            first_name: formData.prenom, // Map 'prenom' to 'first_name'
            last_name: formData.nom, // Map 'nom' to 'last_name'
            email_address: formData.email, // Map 'email' to 'email_address'
            message: formData.message, // Map 'message' to 'message'
        };

        // Send the form data via EmailJS
        emailjs
            .send(
                "service_ID", // Your EmailJS service ID
                "template_Id", // Your EmailJS template ID
                templateParams, // Pass the object as the data to populate the template
                "user_id" // Your EmailJS user ID
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.log(error.text);
                    alert("An error occurred. Please try again.");
                }
            );
    };

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
                            <i className="fas fa-phone-alt mr-4"></i> +216 98
                            269 561
                        </div>
                        <div className="mb-4">
                            <i className="fas fa-envelope mr-4"></i>{" "}
                            hippocrate.tunisien@gmail.com
                        </div>
                        <div>
                            <i className="fas fa-map-marker-alt mr-4"></i> Bab
                            Saadoune, Tunisia, 1029
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
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
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
                                    name="nom"
                                    type="text"
                                    className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
                                    value={formData.nom}
                                    onChange={handleChange}
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
                                    name="prenom"
                                    type="text"
                                    className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
                                    value={formData.prenom}
                                    onChange={handleChange}
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
                                name="email"
                                type="email"
                                className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="phone"
                                type="text"
                                defaultValue={formData.phone}
                                className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-1"
                                onChange={handleChange}
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
                                name="message"
                                rows="2"
                                className="w-full border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2 resize-none"
                                placeholder="Écrivez votre message"
                                value={formData.message}
                                onChange={handleChange}
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
