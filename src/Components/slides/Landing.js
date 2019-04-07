import React, { Component, Fragment } from "react";

import TitleSlide from "./TitleSlide";
import PreviewSlide from "./PreviewSlide";
import SignupSlide from "./SignupSlide";

import uniqid from "uniqid";

class Landing extends Component {
  render() {
    var pages = [];

    var pageCounter = 0;

    var TitleBox = {
      name: "chive",
      tagline: "what's cookin good lookin",
      id: pageCounter++,
      opacity: 0.5,
      backgroundImage: "images/top.jpg",
      buttonText: "Learn More"
    };

    var PreviewBox1 = {
      id: pageCounter++,
      image: "images/middle1phone.png",
      header: "chive is your personal kitchen assistant",
      description: [
        "From managing what's in your fridge to recommending recipes for your next endeavours, it does it all.",
        "Upload what's in your fridge and pantry, and get recommendations based off of what you have, all following your own diet of course."
      ],
      flairImage: "images/rosemary.png",
      buttonText: "More",
      layout: "left",
      phoneClass: "phone"
    };

    var PreviewBox2 = {
      id: pageCounter++,
      image: "images/middle2phone.png",
      header: "Less wasted food means more moola for you",
      description: [
        "Only have bits and bobs lying around?",
        "chive will use what you have in stock and recommend recipes that only need a small trip to the store. You can set your cost preference and who knows, the World's Best Lasagna might just be some oregano and mozzarella away."
      ],
      flairImage: null,
      buttonText: "Like Lists?",
      layout: "right",
      phoneClass: "phone-single"
    };

    var PreviewBox3 = {
      id: pageCounter++,
      image: "images/FridgeandList.png",
      header: "This is how you waste less food",
      description: [
        "(It's really easy too)",
        "chive tracks all of your groceries to pick tailored recipes that use those soon to expire items first. If you decide to see what's in store just pick which recipes sound good and you'll have a budget friendly grocery list."
      ],
      flairImage: null,
      buttonText: "Interested?",
      layout: "left",
      phoneClass: "phone"
    };

    var SignupBox = {
      id: pageCounter++,
      opacity: 0.5,
      backgroundImage: "images/bottom.jpg",
      header: "Let's Keep in Touch",
      closer: "Thanks for signing up!"
    };

    pages.push(<TitleSlide box={TitleBox} key={uniqid.time()} />);
    pages.push(<PreviewSlide box={PreviewBox1} key={uniqid.time()} />);
    pages.push(<PreviewSlide box={PreviewBox2} key={uniqid.time()} />);
    pages.push(<PreviewSlide box={PreviewBox3} key={uniqid.time()} />);
    pages.push(<SignupSlide box={SignupBox} key={uniqid.time()} />);

    return <Fragment>{pages}</Fragment>;
  }
}

export default Landing;
