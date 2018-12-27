/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Myths';
const OPENING_MESSAGE = "Welcome, I can tell you different mythologies from around the world.";
const HELP_MESSAGE = 'You can say tell me a myth, or, you can say goodbye to exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = `This skill can't help you with that. It can tell you mythologies from different countries if you say tell me a myth. Or if you want to exit say, goodbye. Thankyou!`;
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Thanks for your time, Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const skillData = [
    {
        Country_name: "INDIA",
        mythology: ('Most of India\'s myths, like the story of Durga, are part of Hinduism, one of the world\'s oldest religions. Hindu beliefs and myths are driven by two very powerful forces: creation and destruction. Everything in the cosmos, even gods and goddesses, spirals through an everlasting cycle of birth, death or dissolution, and reincarnation.')
    },
    {
        Country_name: "NORTH AMERICA",
        mythology: ('To Native Americans, the supernatural world has a tremendous impact on the natural world. There is a spirit quality to all things in the natural world. Contact with these spirits, through ceremonies such as the peace pipe ritual or the buffalo dance, is not only desirable, it is essential for the well-being of the community and for a deeper understanding of the world.')
    },
    {
        Country_name: "SOUTH AMERICA",
        mythology: ('Mama Ocllo: Her name means \'mother fertility.\' Mama Ocllo was the only named daughter of Inti and Mama Quilla. She married her brother Manco-Capac, and with him helped found Cuzco, the center of the Inca civilization. Like her husband, she helped to teach humankind about civilized living. She taught women about spinning, and thus became the goddess of spinning and weaving. Also, as the name suggests, she is also the goddess of fertility.')
    },
    {
        Country_name: "GREECE",
        mythology: ('Myths were viewed as embodying divine or timeless truths, whereas legends (or sagas) were quasi-historical. Hence, famous events in epics, such as the Trojan War, were generally regarded as having really happened, and heroes and heroines were believed to have actually lived. Earlier sagas, such as the voyage of the Argonauts, were accepted in a similar fashion. Most Greek legends were embellished with folktales and fiction, but some certainly contain a historical substratum.')
    },
    {
        Country_name: "AFRICA",
        mythology: ('Most African traditional religions have multiple gods, often grouped together in family relationships. Nearly every culture recognizes a supreme god, an all-powerful creator who is usually associated with the sky. Various West African peoples refer to the highest god as Amma or Olorun, while some East Africans use the name Mulungu. Africans who have adopted Christianity or Islam sometimes identify the supreme deity of those faiths with the supreme deity of traditional African religion and mythology')
    },
    {
        Country_name: "JAPAN",
        mythology: ('Japanese mythology includes a vast number of gods, goddesses, and spirits. Most of the stories concern the creation of the world, the foundation of the islands of Japan, and the activities of deities, humans, animals, spirits, and magical creatures. Some myths describe characters and events associated with particular places in Japan. Others are set in legendary locations, such as the heavens or the underworld.')
    },
    {
        Country_name: "CHINA",
        mythology: ('Jie, the last king of the Xia Dynasty, is said to have been a bloodthirsty despot. Tang of Shang, a tribal leader, revolted against Xia rule and eventually overthrew Jie and established the Shang Dynasty, based in Anyang. The Shang Dynasty ruled from ca. 1766 B.C.E. to ca. 1050 B.C.E.. It came to an end when the last despotic ruler, Zhou of Shang, was overthrown by the new Zhou Dynasty. The end of the Shang Dynasty and the establishment of the Zhou is the subject of the influential mythological fiction.')
    },
    {
        Country_name: "ROME",
        mythology: ('The ancient Romans had a rich mythology and, while much of it was derived from their neighbors and predecessors, the Greeks, it still defined the rich history of the Roman people as they eventually grew into an empire. Roman writers such as Ovid and Virgil documented and extended the mythological heritage of the ancient Mediterranean to gives us such long-lasting and iconic figures as Aeneas, Vesta, Janus, and the twin founders of Rome itself, Romulus and Remus.')
    },
    {
        Country_name: "EGYPT",
        mythology: ('Egyptian Mythology was the belief structure and underlying form of ancient Egyptian culture from at least c. 4000 BCE (as evidenced by burial practices and tomb paintings) to 30 CE with the death of Cleopatra VII, the last of the Ptolemaic rulers of Egypt.  Every aspect of life in ancient Egypt was informed by the stories which related the creation of the world and the sustaining of that world by the gods')
    }
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = 'Welcome, I can tell you mythologies from different countries around the globe. Which country mythology would you like to know?' + '\n' + 'Tell me a Country name and I will tell you some cool mythologies of that country.' + '\n' + 'Or if you want assistance, say help.';
        const reprompt = 'Sorry for inconvenience but if you want assistance, say help.';
        
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'GetNewFactIntent': function () {
      var Country_nameSlot = this.event.request.intent.slots.Country_name.value;
      const speechOutput = getSuggestion(skillData, 'Country_name', Country_nameSlot.toUpperCase()).mythology + '\n' + 'You can say help for assistance.' + '\n' + 'Or if you want to exit you can say goodbye';
      const reprompt = `This skill can't help you with that. It can tell you mythologies from different countries if you say tell me a myth. Or if you want to exit say, goodbye. Thankyou!`;
      
      this.response.speak(speechOutput).listen(reprompt);
      this.emit(':responseReady');
    },
    'Repeat': function () {
      var Country_nameSlot = this.event.request.intent.slots.Country_name.value;
      const speechOutput = getSuggestion(skillData, 'Country_name', Country_nameSlot.toUpperCase()).mythology + '\n' + 'You can say help for assistance.' + '\n' + 'Or if you want to exit you can say goodbye';
      const reprompt = 'goodbye';
      
      this.response.speak(speechOutput).listen(reprompt);
      this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'I can tell you different mythologies from India , North America, South America, Africa, Greece, Rome, japan, China and Egypt.' + '\n' + 'So, myths from which country would you like to know?';
        const reprompt = 'I can tell you different mythologies from India , North America, South America, Africa, Greece, Rome, japan, China and Egypt.' + '\n' + 'So, myths from which country would you like to know?';

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = 'Sorry, I can\'t do that for you' + '\n' + 'but you can say help for more options.';
        const reprompt = 'Sorry, I can\'t do that for you' + '\n' + 'but you can say help for more options.';
    
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
         this.response.speak(FALLBACK_MESSAGE).listen(FALLBACK_REPROMPT);
         this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
function getSuggestion(data, propName, propValue) {
  for (var i=0; i < data.length; i++) {
    if (data[i][propName] == propValue) {
      return data[i];
    }
  }
}
