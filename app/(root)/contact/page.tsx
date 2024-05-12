'use client'
import React, {useState} from "react";
import Image from "next/image";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz dodać logikę do obsługi wysyłania formularza
        console.log("Wysłane dane:", {name, email,subject, message});
    };

    return (
        <div className="flex flex-col w-full justify-between gap-4">
            <h1 className="h1-bold text-dark100_light900 mb-8">Kontakt z administratorem strony</h1>
            <div className="card-wrapper mt-1 flex w-full gap-5 rounded-[10px] justify-evenly p-2 sm:px-11 md:items-center">
                <div className="flex flex-col justify-center items-center gap-1">
                    <Image alt="icon of eye - to hide password" src="/assets/icons/mail-unread-outline.svg" width={23}
                           height={20}/>
                    <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">medykuj@kontakt.pl</p>
                </div>

                <div className="flex flex-col justify-center items-center gap-1">
                    <Image alt="icon of eye - to hide password" src="/assets/icons/phone-portrait-outline.svg"
                           width={23}
                           height={20}/>
                    <p className="body-regular text-dark500_light700 my-2 max-w-[500px] flex-1 text-justify">+48 555 555 555</p>
                </div>
            </div>
            <div className="card-wrapper mt-8 flex w-full flex-col gap-5 rounded-[10px] p-2 sm:px-11">
                <h2 className="sm:h3-semibold base-semibold text-dark200_light900">Formularz kontaktowy</h2>
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-10">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Twoje Imię"
                        className="input-base body-regular text-primary-500 w-full rounded-lg border border-primary-500 px-4 py-3 background-light_dark300"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Twój Email"
                        className="input-base body-regular text-primary-500 w-full rounded-lg border border-primary-500 px-4 py-3 background-light_dark300"
                    />
                    <input
                        type="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Temat wiadomości"
                        className="input-base body-regular text-primary-500 w-full rounded-lg border border-primary-500 px-4 py-3 background-light_dark300"
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Twoja Wiadomość"
                        className="textarea-base body-regular text-primary-500 w-full h-[150px] rounded-lg border border-primary-500 p-4 background-light_dark300"
                    />
                    <button
                        type="submit"
                        className="paragraph-medium min-h-[46px] w-full rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900"
                    >
                        Wyślij wiadomość
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
