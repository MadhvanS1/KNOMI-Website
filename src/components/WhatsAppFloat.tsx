import { contact } from "@/content/site";
import { WhatsApp } from "./ui/Icons";
import styles from "./WhatsAppFloat.module.css";

export default function WhatsAppFloat() {
  return (
    <a
      href={contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatButton}
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
    >
      <WhatsApp className={styles.icon} size={20} />
      <span className={styles.label}>Chat with us</span>
    </a>
  );
}
