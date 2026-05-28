export interface BilingualText {
  en: string;
  hi: string;
}

export interface AdmissionStep {
  num: string;
  title: BilingualText;
  desc: BilingualText;
}

export interface AgeEligibility {
  class: string;
  age: string;
  criteria: BilingualText;
}

export interface FeeItem {
  range: string;
  admission: string;
  tuition: string;
  exam: string;
}

export const admissionSteps: AdmissionStep[] = [
  {
    num: "01",
    title: {
      en: "Collect Prospectus & Form",
      hi: "विवरणिका और फॉर्म प्राप्त करें"
    },
    desc: {
      en: "Collect the official admission form from the school counter in Khabharabhar, Kaptanganj during office hours (8:00 AM to 1:00 PM), or contact the Helpline Desk.",
      hi: "खबरभार, कप्तानगंज में विद्यालय काउंटर से कार्यालय समय (सुबह 8:00 बजे से दोपहर 1:00 बजे तक) के दौरान प्रवेश फॉर्म प्राप्त करें या हेल्पलाइन से संपर्क करें।"
    }
  },
  {
    num: "02",
    title: {
      en: "Submit Documents & Form",
      hi: "दस्तावेज़ और फॉर्म जमा करें"
    },
    desc: {
      en: "Fill in child details and submit the application at the school office along with photocopies of Birth Certificate, Aadhar Card, and Transfer Certificate.",
      hi: "बच्चे का विवरण भरें और जन्म प्रमाण पत्र, आधार कार्ड और स्थानांतरण पत्र (TC) की प्रतियों के साथ विद्यालय कार्यालय में आवेदन जमा करें।"
    }
  },
  {
    num: "03",
    title: {
      en: "Student Interactive Check",
      hi: "छात्र संवाद और बुनियादी जांच"
    },
    desc: {
      en: "For pre-primary classes, a simple verbal interactive session is scheduled. For class VI and above, a basic written check in Math and English occurs.",
      hi: "पूर्व-प्राथमिक कक्षाओं के लिए, एक सरल मौखिक संवाद सत्र निर्धारित है। कक्षा VI और उससे ऊपर के लिए, गणित और अंग्रेजी में एक बुनियादी समझ जांच होती है।"
    }
  },
  {
    num: "04",
    title: {
      en: "Fee Payment & Admission",
      hi: "शुल्क भुगतान और प्रवेश पुष्टि"
    },
    desc: {
      en: "Upon selection, secure the student seat by depositing the admission fee at the counter. Uniform details and text books list will be provided.",
      hi: "चयन के बाद, काउंटर पर प्रवेश शुल्क जमा करके छात्र की सीट सुरक्षित करें। ड्रेस (यूनिफॉर्म) विवरण और पुस्तकों की सूची प्रदान की जाएगी।"
    }
  }
];

export const ageEligibility: AgeEligibility[] = [
  {
    class: "Nursery / LKG",
    age: "3 to 4 Years",
    criteria: {
      en: "Should be toilet-trained and responsive to verbal instructions.",
      hi: "शौचालय-प्रशिक्षित और मौखिक निर्देशों का पालन करने में सक्षम होना चाहिए।"
    }
  },
  {
    class: "UKG / Class I",
    age: "4 to 5+ Years",
    criteria: {
      en: "Should recognize basic alphabet sounds and numbers.",
      hi: "बुनियादी वर्णमाला ध्वनियों और संख्याओं को पहचानने में सक्षम होना चाहिए।"
    }
  },
  {
    class: "Class II to V",
    age: "6 to 9 Years",
    criteria: {
      en: "Basic Hindi and English reading skills. Simple arithmetic.",
      hi: "बुनियादी हिन्दी और अंग्रेजी पढ़ने का कौशल। सरल अंकगणित।"
    }
  },
  {
    class: "Class VI to VIII",
    age: "10 to 12 Years",
    criteria: {
      en: "Passing certificate from previous school. Written check score.",
      hi: "पिछले स्कूल से उत्तीर्ण प्रमाण पत्र। बुनियादी लिखित समझ जांच।"
    }
  }
];

export const requiredDocuments: BilingualText[] = [
  {
    en: "Child's Original Birth Certificate (Hospital / Gram Panchayat issued)",
    hi: "बच्चे का मूल जन्म प्रमाण पत्र (अस्पताल / ग्राम पंचायत द्वारा जारी)"
  },
  {
    en: "Photocopy of Child's Aadhaar Card",
    hi: "बच्चे के आधार कार्ड की प्रतिलिपि"
  },
  {
    en: "Photocopy of Parents' (Mother & Father) Aadhaar Cards",
    hi: "माता-पिता (माता और पिता) के आधार कार्ड की प्रतिलिपि"
  },
  {
    en: "3 Recent Passport-size Photographs of the Child",
    hi: "छात्र की हाल ही में खींची गई 3 पासपोर्ट आकार की तस्वीरें"
  },
  {
    en: "Original School Transfer Certificate (TC) from Class II onwards",
    hi: "कक्षा II से ऊपर के लिए मूल स्थानांतरण प्रमाण पत्र (TC)"
  },
  {
    en: "Previous Class Report Card / Progress Marksheet",
    hi: "पिछली कक्षा का प्रगति पत्र (रिपोर्ट कार्ड)"
  },
  {
    en: "Category Certificate (OBC/SC/ST) if applicable for fee records",
    hi: "जाति प्रमाण पत्र (OBC/SC/ST) यदि शुल्क रिकॉर्ड के लिए लागू हो"
  }
];

export const subsidizedFees: FeeItem[] = [
  {
    range: "Nursery to UKG",
    admission: "₹1,000 (Once)",
    tuition: "₹650 / Month",
    exam: "₹300 / Term"
  },
  {
    range: "Class I to V",
    admission: "₹1,500 (Once)",
    tuition: "₹800 / Month",
    exam: "₹400 / Term"
  },
  {
    range: "Class VI to VIII",
    admission: "₹1,800 (Once)",
    tuition: "₹1,000 / Month",
    exam: "₹450 / Term"
  }
];
