import logo from "../../../../resources/d3xtra_logo.png";
import Modal from "./Modal";
import ContactsCard from "./ContactsCard";
import { contacts } from "../data/contacts";

function Logo() {
  return (
    <div className={`flex flex-col items-center pb-6 xl:pb-8`}>
      <img
        src={logo}
        alt="D3xtra Logo"
        className="w-[150px] py-6 xl:w-[200px] xl:py-8"
      />

      <Modal>
        <Modal.Open open={"contacts"}>
          <button className="rounded-full bg-gray200 px-6 py-2.5 text-xs font-[600] transition-all duration-300 ease-in-out hover:bg-blue200">
            Emergency Contacts
          </button>
        </Modal.Open>
        <Modal.Window name={"contacts"}>
          <div>
            <h1 className="mb-4 text-3xl">Emergecy Contacts</h1>
            <div className="grid w-[50vw] min-w-0 grid-cols-3 gap-4 xl:gap-8">
              {contacts.map((contact, index) => (
                <ContactsCard
                  key={index}
                  organization={contact.organization}
                  number={contact.number}
                  image={contact.image}
                  specialties={contact.specialties}
                  icon={contact.icon}
                />
              ))}
            </div>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Logo;
