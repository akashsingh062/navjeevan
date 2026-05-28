export interface BilingualText {
  en: string;
  hi: string;
}

export interface BilingualList {
  en: string[];
  hi: string[];
}

export interface AcademicStage {
  title: BilingualText;
  classes: BilingualText;
  focus: BilingualText;
  desc: BilingualText;
  subjects: BilingualList;
  iconName: "Smile" | "BookOpen" | "GraduationCap";
  borderColor: string;
  accentBg: string;
  accentText: string;
}

export interface SeasonalTiming {
  season: BilingualText;
  duration: string;
  break: BilingualText;
  bg: string;
  iconColor: string;
}

export interface CalendarEvent {
  title: BilingualText;
  date: BilingualText;
  desc: BilingualText;
  type: "academic" | "exam" | "event";
  badgeText: BilingualText;
}

export const academicsStages: AcademicStage[] = [
  {
    title: {
      en: "Foundational Pre-Primary Stage",
      hi: "बुनियादी पूर्व-प्राथमिक चरण"
    },
    classes: {
      en: "Classes: LKG & UKG",
      hi: "कक्षाएं: LKG और UKG"
    },
    focus: {
      en: "Play-Way & Sensory Discovery",
      hi: "खेल-कूद और संवेदी खोज"
    },
    desc: {
      en: "An engaging, activity-filled environment where young minds learn through hands-on games, interactive storytelling, and sensory play. We prioritize motor skill development, basic vocabulary, social manners, and self-expression with absolutely zero exam pressure.",
      hi: "खेल-कूद, कहानियों और संवेदी खेल के माध्यम से बच्चे सीखते हैं। हम बिना किसी परीक्षा के दबाव के शारीरिक कौशल, बुनियादी शब्दावली और व्यावहारिक शिष्टाचार को प्राथमिकता देते हैं।"
    },
    subjects: {
      en: ["Foundational English & Phonics", "Hindi Varnamala & Recitation", "Basic Numbers & Counting", "Art, Coloring & Creative Craft", "General Awareness & Nature Study", "Rhymes & Actions"],
      hi: ["बुनियादी अंग्रेजी और नादविद्या (फोनिक्स)", "हिन्दी वर्णमाला और कविता पाठ", "बुनियादी संख्याएँ और गिनती", "कला, रंग भरना और रचनात्मक शिल्प", "सामान्य जागरूकता और प्रकृति अध्ययन", "गीत और क्रियाएं"]
    },
    iconName: "Smile",
    borderColor: "border-primary/20",
    accentBg: "bg-primary-light",
    accentText: "text-primary"
  },
  {
    title: {
      en: "Preparatory Primary Stage",
      hi: "प्रारंभिक प्राथमिक चरण"
    },
    classes: {
      en: "Classes: I to V",
      hi: "कक्षाएं: I से V (कक्षा 1 से 5)"
    },
    focus: {
      en: "Experiential & Concept-Based",
      hi: "अनुभवात्मक और अवधारणा-आधारित"
    },
    desc: {
      en: "Designed to fuel academic curiosity and concrete learning. Students transition seamlessly to structured subjects, focusing on reading fluency, math calculations, and local environment studies. Joyful worksheets and daily activities build high levels of student self-confidence.",
      hi: "अकादमिक जिज्ञासा और ठोस शिक्षा को बढ़ावा देने के लिए तैयार। छात्र समझ बढ़ाने के साथ भाषा पठन, गणितीय गणना और पर्यावरण अध्ययन पर ध्यान केंद्रित करते हैं।"
    },
    subjects: {
      en: ["English Language & Literature", "Hindi Vyakaran & Literature", "Mathematics & Speed Arithmetic", "Environmental Studies (EVS)", "Computer Literacy & ICT", "Moral Value Education", "General Knowledge & Quiz", "Visual & Performing Arts"],
      hi: ["अंग्रेजी भाषा और साहित्य", "हिन्दी व्याकरण और साहित्य", "गणित और त्वरित अंकगणित", "पर्यावरण अध्ययन (EVS)", "कंप्यूटर साक्षरता और ICT", "नैतिक मूल्य शिक्षा", "सामान्य ज्ञान और प्रश्नोत्तरी", "दृश्य और प्रदर्शन कला"]
    },
    iconName: "BookOpen",
    borderColor: "border-accent/20",
    accentBg: "bg-accent-light",
    accentText: "text-accent"
  },
  {
    title: {
      en: "Middle School Stage",
      hi: "माध्यमिक चरण"
    },
    classes: {
      en: "Classes: VI to VIII",
      hi: "कक्षाएं: VI से VIII (कक्षा 6 से 8)"
    },
    focus: {
      en: "Analytical & Critical Inquiry",
      hi: "विश्लेषणात्मक और तार्किक जांच"
    },
    desc: {
      en: "Prepares senior students with deeper conceptual clarity and analytical thinking skills. We introduce laboratory observation basics, mental math shortcuts, digital computing, and a third language to foster global perspectives and physical coordination through sports.",
      hi: "वरिष्ठ छात्रों को गहन अवधारणात्मक स्पष्टता और तार्किक सोच कौशल से समृद्ध किया जाता है। हम प्रयोगशालाओं का परिचय, कंप्यूटर कोडिंग और तृतीय भाषा शामिल करते हैं।"
    },
    subjects: {
      en: ["English Grammar & Literature", "Hindi Vyakaran & Sahitya", "Sanskrit (Third Language)", "Mathematics (Algebra, Geometry)", "Integrated Science (Physics, Chemistry, Biology)", "Social Sciences (History, Geography, Civics)", "Computer Applications & Coding Basics", "Physical & Health Education", "Art, Crafts & GK"],
      hi: ["अंग्रेजी व्याकरण और साहित्य", "हिन्दी व्याकरण और साहित्य", "संस्कृत (तृतीय भाषा)", "गणित (अंकगणित, बीजगणित, ज्यामिति)", "एकीकृत विज्ञान (भौतिकी, रसायन, जीव विज्ञान)", "सामाजिक विज्ञान (इतिहास, भूगोल, नागरिक शास्त्र)", "कंप्यूटर अनुप्रयोग और कोडिंग की बुनियादी बातें", "शारीरिक और स्वास्थ्य शिक्षा", "कला, शिल्प और सामान्य ज्ञान"]
    },
    iconName: "GraduationCap",
    borderColor: "border-neutral-dark/10",
    accentBg: "bg-neutral-light",
    accentText: "text-neutral-dark"
  }
];

export const seasonalTimings: SeasonalTiming[] = [
  {
    season: {
      en: "Summer Routine (April – Sept)",
      hi: "ग्रीष्मकालीन समय (अप्रैल - सितंबर)"
    },
    duration: "07:30 AM to 12:30 PM",
    break: {
      en: "Recess: 10:00 AM - 10:20 AM",
      hi: "मध्यांतर (लंच): 10:00 AM - 10:20 AM"
    },
    bg: "bg-primary-light border-primary/20 text-primary",
    iconColor: "text-primary"
  },
  {
    season: {
      en: "Winter Routine (Oct – March)",
      hi: "शीतकालीन समय (अक्टूबर - मार्च)"
    },
    duration: "08:30 AM to 01:30 PM",
    break: {
      en: "Recess: 11:00 AM - 11:20 AM",
      hi: "मध्यांतर (लंच): 11:00 AM - 11:20 AM"
    },
    bg: "bg-accent-light border-accent/20 text-accent",
    iconColor: "text-accent"
  }
];

export const calendarMilestones: CalendarEvent[] = [
  {
    title: {
      en: "New Session Commencement",
      hi: "नवीन सत्र का शुभारंभ"
    },
    date: {
      en: "April 02",
      hi: "02 अप्रैल"
    },
    desc: {
      en: "Beginning of the new academic session. Distribution of NCERT textbooks and curriculum cards.",
      hi: "नए शैक्षणिक सत्र की शुरुआत। NCERT पाठ्यपुस्तकों और पाठ्यक्रम विवरणों का वितरण।"
    },
    type: "academic",
    badgeText: {
      en: "Academic",
      hi: "शैक्षणिक"
    }
  },
  {
    title: {
      en: "Mid-Term Examinations",
      hi: "अर्धवार्षिक परीक्षाएँ (मिड-टर्म)"
    },
    date: {
      en: "Sept 12 - Sept 22",
      hi: "12 सितंबर - 22 सितंबर"
    },
    desc: {
      en: "Evaluates first-term syllabus. Report cards distributed during the Parent-Teacher Desk meeting.",
      hi: "प्रथम सत्र के पाठ्यक्रम का मूल्यांकन। प्रगति रिपोर्ट का PTM में वितरण।"
    },
    type: "exam",
    badgeText: {
      en: "Exam",
      hi: "परीक्षा"
    }
  },
  {
    title: {
      en: "Annual Sports & Cultural Day",
      hi: "वार्षिक खेलकूद एवं सांस्कृतिक दिवस"
    },
    date: {
      en: "Dec 18",
      hi: "18 दिसंबर"
    },
    desc: {
      en: "Exhibition of athletic fitness, group dances, science working projects, and awards distribution.",
      hi: "एथलेटिक फिटनेस, समूह नृत्य, विज्ञान प्रदर्शनियों और पुरस्कार वितरण का भव्य आयोजन।"
    },
    type: "event",
    badgeText: {
      en: "Event",
      hi: "आयोजन"
    }
  },
  {
    title: {
      en: "Annual Finals Examination",
      hi: "वार्षिक मुख्य परीक्षा"
    },
    date: {
      en: "March 08 - March 18",
      hi: "08 मार्च - 18 मार्च"
    },
    desc: {
      en: "Evaluates comprehensive stage syllabus. Promotion results announced by late March.",
      hi: "सम्पूर्ण पाठ्यक्रम का अंतिम मूल्यांकन। कक्षा प्रोन्नति परिणामों की घोषणा मार्च के अंत तक।"
    },
    type: "exam",
    badgeText: {
      en: "Exam",
      hi: "परीक्षा"
    }
  }
];
