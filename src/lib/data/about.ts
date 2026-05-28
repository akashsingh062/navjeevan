export interface BilingualText {
  en: string;
  hi: string;
}

export interface ValueItem {
  title: BilingualText;
  desc: BilingualText;
  iconName: "Compass" | "Sparkles" | "Heart";
  color: string;
}

export interface MilestoneItem {
  year: string;
  title: BilingualText;
  desc: BilingualText;
}

export interface AchievementItem {
  title: BilingualText;
  desc: BilingualText;
  iconName: "BookOpen" | "Award" | "GraduationCap";
  color: string;
}

export const coreValues: ValueItem[] = [
  {
    title: {
      en: "Our Mission",
      hi: "हमारा उद्देश्य"
    },
    desc: {
      en: "To deliver high-standard bilingual (Hindi & English) education that fosters intellectual growth, physical fitness, computer literacy, and strong civic character in every student.",
      hi: "हर छात्र में बौद्धिक विकास, शारीरिक तंदुरुस्ती, कंप्यूटर साक्षरता और मजबूत नागरिक चरित्र को बढ़ावा देने वाली उच्च स्तरीय द्विभाषी (हिन्दी और अंग्रेजी) शिक्षा प्रदान करना।"
    },
    iconName: "Compass",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: {
      en: "Our Vision",
      hi: "हमारी दृष्टि"
    },
    desc: {
      en: "To build an empowered rural student body capable of competing with urban standards, while staying rooted in strong moral, cultural, and national values.",
      hi: "एक सशक्त ग्रामीण छात्र निकाय का निर्माण करना जो मजबूत नैतिक, सांस्कृतिक और राष्ट्रीय मूल्यों में निहित रहते हुए शहरी मानकों के साथ प्रतिस्पर्धा करने में सक्षम हो।"
    },
    iconName: "Sparkles",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: {
      en: "Our Core Ethos",
      hi: "हमारा मूल लोकाचार"
    },
    desc: {
      en: "Honesty, respect, discipline, and community development. We believe every child is a beacon of hope and positive progress for their family and society.",
      hi: "ईमानदारी, सम्मान, अनुशासन और सामुदायिक विकास। हमारा मानना है कि प्रत्येक बच्चा अपने परिवार और समाज के लिए आशा और सकारात्मक प्रगति की किरण है।"
    },
    iconName: "Heart",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export const milestones: MilestoneItem[] = [
  {
    year: "2008",
    title: {
      en: "Founding Year",
      hi: "स्थापना वर्ष"
    },
    desc: {
      en: "Established with just 50 students in a modest brick building to address the urgent need for quality primary English-medium instruction in Khabharabhar.",
      hi: "खबरभार में गुणवत्तापूर्ण प्राथमिक अंग्रेजी-माध्यम शिक्षा की तत्काल आवश्यकता को पूरा करने के लिए एक मामूली ईंट की इमारत में केवल 50 छात्रों के साथ स्थापित।"
    },
  },
  {
    year: "2014",
    title: {
      en: "Infrastructure Expansion",
      hi: "बुनियादी ढांचे का विस्तार"
    },
    desc: {
      en: "Constructed the secondary academic wing, library room, and pure water cooling filters. Student count crossed 400.",
      hi: "माध्यमिक शैक्षणिक विंग, पुस्तकालय कक्ष और शुद्ध पेयजल कूलिंग फिल्टर का निर्माण। छात्रों की संख्या 400 पार हुई।"
    },
  },
  {
    year: "2020",
    title: {
      en: "Digital IT Lab Launch",
      hi: "डिजिटल आईटी लैब का शुभारंभ"
    },
    desc: {
      en: "Equipped a dedicated laboratory with 15 computer units, integrating basic computing skills into the weekly curriculum.",
      hi: "15 कंप्यूटर इकाइयों के साथ एक समर्पित प्रयोगशाला से सुसज्जित, बुनियादी कंप्यूटिंग कौशल को साप्ताहिक पाठ्यक्रम में एकीकृत किया गया।"
    },
  },
  {
    year: "2024",
    title: {
      en: "Smart Classroom Adoption",
      hi: "स्मार्ट क्लासरूम को अपनाना"
    },
    desc: {
      en: "Fitted primary teaching blocks with digital audio-visual screens to aid interactive science, reading, and language comprehension.",
      hi: "इंटरैक्टिव विज्ञान, पठन और भाषा की समझ में सहायता के लिए प्राथमिक शिक्षण ब्लॉकों को डिजिटल ऑडियो-विजुअल स्क्रीन से लैस किया गया।"
    },
  },
];

export const achievements: AchievementItem[] = [
  {
    title: {
      en: "100% Board Results",
      hi: "100% बोर्ड परीक्षा परिणाम"
    },
    desc: {
      en: "Consecutive academic batches have achieved a 100% pass record in Class X standard curriculum tests, with top students scoring over 90% in Science and Math.",
      hi: "लगातार शैक्षणिक बैचों ने कक्षा X मानक पाठ्यक्रम परीक्षाओं में 100% उत्तीर्ण रिकॉर्ड हासिल किया है, जिसमें शीर्ष छात्रों ने विज्ञान और गणित में 90% से अधिक अंक प्राप्त किए हैं।"
    },
    iconName: "BookOpen",
    color: "text-primary",
  },
  {
    title: {
      en: "District Sports Trophies",
      hi: "जिला खेलकूद ट्राफियां"
    },
    desc: {
      en: "Our student sports contingents have bagged Gold and Silver placements in block-level Kabaddi, Kho-Kho, and 400m sprint events in Kushinagar tournaments.",
      hi: "हमारे छात्र खेल दलों ने कुशीनगर टूर्नामेंटों में ब्लॉक-स्तरीय कबड्डी, खो-खो और 400 मीटर दौड़ स्पर्धाओं में स्वर्ण और रजत पदक हासिल किए हैं।"
    },
    iconName: "Award",
    color: "text-emerald-600",
  },
  {
    title: {
      en: "Regional Scholarship Qualifiers",
      hi: "क्षेत्रीय छात्रवृत्ति अर्हता प्राप्तकर्ता"
    },
    desc: {
      en: "Multiple children from weaker economic backgrounds have successfully cracked government merit scholarship programs under our teacher coaching models.",
      hi: "कमजोर आर्थिक पृष्ठभूमि के कई बच्चों ने हमारे शिक्षक कोचिंग मॉडलों के तहत सरकारी योग्यता छात्रवृत्ति कार्यक्रमों को सफलतापूर्वक पास किया है।"
    },
    iconName: "GraduationCap",
    color: "text-amber-600",
  },
];

export const historyDetails = {
  title: {
    en: "Our History",
    hi: "हमारा इतिहास"
  },
  p1: {
    en: "Nav Jeevan Public School was established in 2008 with a simple yet ambitious goal: to bring premium, modern, and value-based education to children in the rural pockets of Kaptanganj, Kushinagar, Uttar Pradesh. Recognizing that language fluency and computer literacy are key barriers for rural progress, we structured our curricula around bilingual teaching guidelines.",
    hi: "नव जीवन पब्लिक स्कूल की स्थापना 2008 में एक सरल लेकिन महत्वाकांक्षी लक्ष्य के साथ की गई थी: कप्तानगंज, कुशीनगर, उत्तर प्रदेश के ग्रामीण क्षेत्रों में बच्चों के लिए उत्कृष्ट, आधुनिक और मूल्य-आधारित शिक्षा प्रदान करना। यह पहचानते हुए कि भाषा प्रवाह और कंप्यूटर साक्षरता ग्रामीण प्रगति के लिए मुख्य बाधाएं हैं, हमने द्विभाषी शिक्षण दिशानिर्देशों के तहत अपने पाठ्यक्रमों को संरचित किया।"
  },
  p2: {
    en: "Over the last decade and a half, our institution has grown from a local primary class center into a reputable CBSE-pattern co-educational school. Today, we cater to hundreds of boys and girls from Khabharabhar and nearby villages, ensuring they secure high scores in higher education exams and clear entrance competitions successfully.",
    hi: "पिछले डेढ़ दशक में, हमारी संस्था एक स्थानीय प्राथमिक कक्षा केंद्र से एक प्रतिष्ठित CBSE-पैटर्न सह-शैक्षणिक विद्यालय के रूप में विकसित हुई है। आज, हम खबरभार और आसपास के गांवों के सैकड़ों लड़कों और लड़कियों की शैक्षणिक आवश्यकताओं को पूरा करते हैं, यह सुनिश्चित करते हुए कि वे उच्च शिक्षा परीक्षाओं में उच्च अंक प्राप्त करें और प्रवेश प्रतियोगिताओं को सफलतापूर्वक पास करें।"
  },
  recognitionTitle: {
    en: "Recognition & Affiliation",
    hi: "मान्यता और संबद्धता"
  },
  recognitionDesc: {
    en: "Nav Jeevan is recognized under the educational standards of Uttar Pradesh. The school operates on strict CBSE pattern methodologies, preparing children for modern competitive challenges. Both English and Hindi instruction formats are actively sustained.",
    hi: "नव जीवन उत्तर प्रदेश के शैक्षिक मानकों के तहत मान्यता प्राप्त है। स्कूल सख्त CBSE पैटर्न पद्धतियों पर काम करता है, बच्चों को आधुनिक प्रतिस्पर्धी चुनौतियों के लिए तैयार करता है। अंग्रेजी और हिन्दी दोनों निर्देश स्वरूप सक्रिय रूप से बनाए रखे गए हैं।"
  },
  journeyTitle: {
    en: "Our Journey (Milestones)",
    hi: "हमारी यात्रा (मुख्य पड़ाव)"
  }
};

export const principalNote = {
  tag: {
    en: "Leadership Note",
    hi: "नेतृत्व संदेश"
  },
  title: {
    en: "Message from the Principal's Desk",
    hi: "प्रधानाचार्य का संदेश"
  },
  salutation: {
    en: "Dear Parents, Guardians, and Well-Wishers,",
    hi: "प्रिय अभिभावक, संरक्षक और शुभचिंतक,"
  },
  p1: {
    en: "Welcome to Nav Jeevan Public School! It is a distinct privilege to lead an educational community where our staff members, student body, and parents collaborate in building supportive, character-defining, and capable lives.",
    hi: "नव जीवन पब्लिक स्कूल में आपका स्वागत है! एक ऐसे शैक्षणिक समुदाय का नेतृत्व करना एक विशिष्ट विशेषाधिकार है जहाँ हमारे स्टाफ सदस्य, छात्र और अभिभावक मिलकर सहायक, चरित्र-निर्धारक और सक्षम जीवन बनाने में सहयोग करते हैं।"
  },
  p2: {
    en: "We recognize that rural areas in Kushinagar are brimming with pure talent, child analytical capability, and creative energies. However, students often face hurdles in competitive exam fields due to a lack of core English language confidence and digital computing literacy.",
    hi: "हम जानते हैं कि कुशीनगर के ग्रामीण क्षेत्रों में प्रतिभा, विश्लेषणात्मक क्षमता और रचनात्मक ऊर्जा प्रचुर मात्रा में है। हालांकि, कोर अंग्रेजी भाषा के आत्मविश्वास और डिजिटल कंप्यूटर साक्षरता की कमी के कारण छात्रों को अक्सर प्रतिस्पर्धी परीक्षा क्षेत्रों में बाधाओं का सामना करना पड़ता है।"
  },
  p3: {
    en: "At Nav Jeevan, we bridges this divide. Our bilingual classrooms are geared toward removing language fear. Our computer practicals ensure kids from class III can handle digital systems comfortably. Our moral drills establish strong character, respect for elders, and national pride.",
    hi: "नव जीवन में, हम इस अंतर को पाटते हैं। हमारी द्विभाषी कक्षाएं भाषा के डर को दूर करने के लिए तैयार की गई हैं। हमारे कंप्यूटर प्रैक्टिकल यह सुनिश्चित करते हैं कि कक्षा III से बच्चे आराम से डिजिटल सिस्टम का संचालन कर सकें। हमारे नैतिक अभ्यास मजबूत चरित्र, बड़ों के प्रति सम्मान और राष्ट्रीय गौरव स्थापित करते हैं।"
  },
  p4: {
    en: "We welcome you to partner with us in this beautiful journey. Let us hold hands to secure the absolute best developmental path for our children.",
    hi: "हम इस खूबसूरत यात्रा में हमारे साथ भागीदार बनने के लिए आपका स्वागत करते हैं। आइए अपने बच्चों के लिए सर्वोत्तम विकासात्मक मार्ग सुरक्षित करने के लिए हाथ मिलाएं।"
  },
  name: {
    en: "Shri Rajesh Kumar Mishra",
    hi: "श्री राजेश कुमार मिश्रा"
  },
  role: {
    en: "Principal, Nav Jeevan Public School",
    hi: "प्रधानाचार्य, नव जीवन पब्लिक स्कूल"
  },
  credentials: {
    en: "M.Sc., B.Ed., M.Ed. | 22+ Years Educational Service",
    hi: "एम.एससी., बी.एड., एम.एड. | 22+ वर्ष का शैक्षिक सेवा अनुभव"
  }
};

export const visionMissionDetails = {
  title: {
    en: "Vision & Mission",
    hi: "विजन और मिशन"
  },
  subtitle: {
    en: "The core principles that guide everything we do at Nav Jeevan.",
    hi: "मूल सिद्धांत जो नव जीवन में हमारे हर काम का मार्गदर्शन करते हैं।"
  },
  vision: {
    title: {
      en: "Our Vision",
      hi: "हमारी दृष्टि"
    },
    quote: {
      en: "\"Every child growing to be educated, committed and empowered global persons.\"",
      hi: "\"प्रत्येक बच्चा शिक्षित, प्रतिबद्ध और सशक्त वैश्विक नागरिक बनने की दिशा में आगे बढ़े।\""
    },
    desc: {
      en: "We envision a future where no child in rural Uttar Pradesh is deprived of quality education. Every student who walks through our gates leaves with the knowledge, confidence, and character to be a responsible global citizen while remaining rooted in their cultural heritage.",
      hi: "हम एक ऐसे भविष्य की कल्पना करते हैं जहाँ ग्रामीण उत्तर प्रदेश में कोई भी बच्चा गुणवत्तापूर्ण शिक्षा से वंचित न रहे। हमारे विद्यालय में प्रवेश करने वाला प्रत्येक छात्र ज्ञान, आत्मविश्वास और चरित्र के साथ एक जिम्मेदार वैश्विक नागरिक बनकर निकले, जबकि वह अपनी सांस्कृतिक विरासत से जुड़ा रहे।"
    }
  },
  mission: {
    title: {
      en: "Our Mission",
      hi: "हमारा उद्देश्य"
    },
    quote: {
      en: "\"To accompany every child and facilitate integrated development, joyful learning and empowerment with character and competence.\"",
      hi: "\"प्रत्येक बच्चे के साथ चलना और चरित्र तथा क्षमता के साथ एकीकृत विकास, आनंदमयी शिक्षा और सशक्तिकरण को सुगम बनाना।\""
    },
    desc: {
      en: "Our mission goes beyond academics. We walk alongside each child as a guide and mentor — nurturing intellectual curiosity, emotional resilience, physical wellness, and moral character so they grow as complete, capable human beings.",
      hi: "हमारा उद्देश्य केवल शिक्षा तक सीमित नहीं है। हम प्रत्येक बच्चे के साथ एक मार्गदर्शक और सलाहकार के रूप में चलते हैं - बौद्धिक जिज्ञासा, भावनात्मक लचीलापन, शारीरिक कल्याण और नैतिक चरित्र का पोषण करते हैं ताकि वे एक संपूर्ण, सक्षम इंसान के रूप में विकसित हो सकें।"
    }
  },
  strategy: {
    title: {
      en: "Our Strategy",
      hi: "हमारी कार्यनीति"
    },
    quote: {
      en: "\"A process of joyful learning coupled with constant accompaniment, whole person paradigm and child centered education.\"",
      hi: "\"निरंतर सहयोग, समग्र व्यक्तित्व विकास और बाल-केंद्रित शिक्षा के साथ आनंदमयी सीखने की एक प्रक्रिया।\""
    },
    desc: {
      en: "We implement a child-centered pedagogy that treats every student as a unique individual. Through interactive classrooms, bilingual instruction (Hindi & English), computer literacy, cultural activities, and regular sports, we make learning joyful and holistic — never just rote memorization.",
      hi: "हम एक बाल-केंद्रित शिक्षाशास्त्र लागू करते हैं जो प्रत्येक छात्र को एक अद्वितीय व्यक्ति के रूप में देखता है। इंटरैक्टिव कक्षाओं, द्विभाषी निर्देश (हिन्दी और अंग्रेजी), कंप्यूटर साक्षरता, सांस्कृतिक गतिविधियों और नियमित खेलकूद के माध्यम से, हम सीखने को आनंदमय और समग्र बनाते हैं - कभी भी केवल रटना नहीं।"
    }
  }
};

export const managerNote = {
  tag: {
    en: "Management Desk",
    hi: "प्रबंधन संदेश"
  },
  title: {
    en: "Message from the Managing Director",
    hi: "प्रबंध निदेशक का संदेश"
  },
  salutation: {
    en: "Dear Students, Parents, and Well-Wishers,",
    hi: "प्रिय छात्रों, अभिभावकों और शुभचिंतकों,"
  },
  p1: {
    en: "It is with immense pride and deep humility that I welcome you to Nav Jeevan Public School. When we founded this institution in 2008, our singular goal was simple yet profound — to ensure that no child in Khabharabhar and the surrounding villages of Kaptanganj would have to travel far for quality education.",
    hi: "मुझे नव जीवन पब्लिक स्कूल में स्वागत करते हुए अत्यधिक गर्व और गहरी विनम्रता की अनुभूति हो रही है। जब हमने 2008 में इस संस्थान की स्थापना की थी, तो हमारा एकमात्र उद्देश्य सरल लेकिन गहरा था - यह सुनिश्चित करना कि खबरभार और कप्तानगंज के आसपास के गाँवों के किसी भी बच्चे को गुणवत्तापूर्ण शिक्षा के लिए दूर न जाना पड़े।"
  },
  p2: {
    en: "Education is not merely the transfer of knowledge. It is the awakening of a young mind to its own potential. At Nav Jeevan, we strive every day to create an environment where children feel safe, celebrated, and inspired to grow — academically, morally, and socially.",
    hi: "शिक्षा केवल ज्ञान का हस्तांतरण नहीं है। यह एक युवा दिमाग को उसकी अपनी क्षमता के प्रति जागृत करना है। नव जीवन में, हम हर दिन एक ऐसा वातावरण बनाने का प्रयास करते हैं जहाँ बच्चे सुरक्षित, सम्मानित महसूस करें और शैक्षणिक, नैतिक और सामाजिक रूप से आगे बढ़ने के लिए प्रेरित हों।"
  },
  p3: {
    en: "I am deeply grateful to our dedicated faculty, our supportive parent community, and each student who has placed their trust in this institution. Together, we are building a stronger, more educated Kushinagar.",
    hi: "मैं हमारे समर्पित शिक्षकों, हमारे सहायक अभिभावक समुदाय और प्रत्येक छात्र का हृदय से आभारी हूँ जिन्होंने इस संस्थान में अपना विश्वास जताया है। साथ मिलकर, हम एक मजबूत और अधिक शिक्षित कुशीनगर का निर्माण कर रहे हैं।"
  },
  name: {
    en: "Shri Anil Kumar Singh",
    hi: "श्री अनिल कुमार सिंह"
  },
  role: {
    en: "Managing Director, Nav Jeevan Public School",
    hi: "प्रबंध निदेशक, नव जीवन पब्लिक स्कूल"
  }
};

export const findUsDetails = {
  title: {
    en: "Find Us",
    hi: "हमें ढूंढें"
  },
  tag: {
    en: "Location",
    hi: "स्थान"
  },
  addressTitle: {
    en: "Our Address",
    hi: "हमारा पता"
  },
  addressText: {
    name: {
      en: "Nav Jeevan Public School",
      hi: "नव जीवन पब्लिक स्कूल"
    },
    line1: {
      en: "Khabharabhar, Kaptanganj",
      hi: "खबरभार, कप्तानगंज"
    },
    line2: {
      en: "Kushinagar, Uttar Pradesh",
      hi: "कुशीनगर, उत्तर प्रदेश"
    },
    pin: {
      en: "PIN – 274301",
      hi: "पिन – 274301"
    },
    country: {
      en: "India",
      hi: "भारत"
    }
  },
  contactTitle: {
    en: "Contact",
    hi: "संपर्क"
  },
  phoneLabel: {
    en: "Phone",
    hi: "दूरभाष"
  },
  hoursLabel: {
    en: "Office Hours",
    hi: "कार्यालय समय"
  },
  hoursValue: {
    en: "Mon – Sat, 8:00 AM – 4:00 PM",
    hi: "सोम - शनि, सुबह 8:00 - शाम 4:00"
  },
  mapHeader: {
    en: "Map — Kaptanganj, Kushinagar",
    hi: "मानचित्र — कप्तानगंज, कुशीनगर"
  },
  mapTitle: {
    en: "Nav Jeevan Public School Location — Kaptanganj, Kushinagar",
    hi: "नव जीवन पब्लिक स्कूल का स्थान — कप्तानगंज, कुशीनगर"
  },
  openMapButton: {
    en: "Open in Google Maps",
    hi: "गूगल मैप्स में खोलें"
  },
  contactUsButton: {
    en: "Contact Us",
    hi: "संपर्क करें"
  }
};
