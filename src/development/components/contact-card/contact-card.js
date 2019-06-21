/* global document */
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

class ContactCard {
  constructor(contactCard) {
    this.contactCard = contactCard;
    this.container = contactCard.querySelector(".js-card-container");
    this.underlay = contactCard.querySelector(".js-card-underlay");
    this.closeButton = contactCard.querySelector(".js-card-close-button");
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.detailWidth = 430;
    this.isOpen = false;
  }

  init() {
    this.container.addEventListener(
      "click",
      $event => this.open($event),
      false
    );
    this.underlay.addEventListener(
      "click",
      $event => this.close($event),
      false
    );
    this.closeButton.addEventListener(
      "click",
      $event => this.close($event),
      false
    );
  }

  close(e) {
    e.stopPropagation();
    if (!this.isOpen) {
      return;
    }
    this.contactCard.classList.remove("uxb-contact-card_show-bio");

    setTimeout(() => {
      this.contactCard.classList.remove("uxb-contact-card_open-bio");
      setTimeout(() => {
        this.container.style.top = `${this.oldTop}px`;
        this.container.style.left = `${this.oldLeft}px`;
        setTimeout(() => {
          this.contactCard.classList.remove("uxb-contact-card_show-wrapper");
          this.contactCard.classList.remove("uxb-contact-card_open");
          this.container.style.position = "static";
          this.container.style.top = "auto";
          this.container.style.left = "auto";
          this.isOpen = false;
          enableBodyScroll(this.contactCard);
        }, 250);
      }, 250);
    }, 250);
  }

  open(e) {
    e.stopPropagation();
    if (this.isOpen) {
      return;
    }
    disableBodyScroll(this.contactCard);
    this.contactCard.classList.add("uxb-contact-card_show-wrapper");
    this.height = this.contactCard.offsetHeight;
    this.originalWidth = this.contactCard.offsetWidth;
    this.width = this.contactCard.offsetWidth + this.detailWidth;
    this.oldTop = this.contactCard.getBoundingClientRect().top;
    this.oldLeft = this.contactCard.getBoundingClientRect().left;

    this.container.style.top = `${this.oldTop}px`;
    this.container.style.left = `${this.oldLeft}px`;

    this.contactCard.classList.add("uxb-contact-card_open");

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    this.container.style.position = "absolute";

    setTimeout(() => {
      if (windowWidth < 768) {
        this.container.style.left = "0px";
        this.container.style.top = "0px";
      } else {
        this.container.style.left =
          parseInt(windowWidth) / 2 - parseInt(this.width) / 2 + "px";
        this.container.style.top =
          parseInt(windowHeight) / 2 - parseInt(this.height) / 2 + "px";
      }
    }, 10);

    setTimeout(() => {
      this.contactCard.classList.add("uxb-contact-card_open-bio");
      setTimeout(() => {
        this.contactCard.classList.add("uxb-contact-card_show-bio");
        this.isOpen = true;
      }, 250);
    }, 250);
  }
}

function contactCardInit() {
  const contactCards = document.querySelectorAll(".js-contact-card");
  if (contactCards.length === 0) {
    return null;
  }
  for (let i = 0; i < contactCards.length; i += 1) {
    const contactCard = new ContactCard(contactCards[i]);
    contactCard.init();
  }
  return null;
}

export default contactCardInit;
