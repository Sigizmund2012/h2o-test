import User from "../components/User/User";
import Mailbox from "../components/Mailbox/Mailbox";
import "./MailboxPage.scss";

export default function MailboxPage() {
  return (
    <div className="mailbox-page">
      <header className="mailbox-page__header">
        <User />
      </header>
      <div className="mailbox-page__mails">
        <h1 className="page-heading">Почтовый ящик</h1>
        <Mailbox />
      </div>
    </div>
  );
}
