export interface BilingualText {
  en: string;
  hi: string;
}

export interface ContactCard {
  title: BilingualText;
  detail: BilingualText;
  desc: BilingualText;
  actionLabel: BilingualText;
  href: string;
  iconName: "Phone" | "Mail" | "Clock" | "MessageSquare";
  accentBg: string;
  accentText: string;
  borderColor: string;
}

export const contactDirectory: ContactCard[] = [
  {
    title: {
      en: "General Hotline",
      hi: "सामान्य हॉटलाइन"
    },
    detail: {
      en: "+91 98898 97057",
      hi: "+91 98898 97057"
    },
    desc: {
      en: "For general admission queries, parent updates, and document requests.",
      hi: "सामान्य प्रवेश पूछताछ, अभिभावक अपडेट और दस्तावेज़ अनुरोधों के लिए संपर्क सूत्र।"
    },
    actionLabel: {
      en: "Call Helpline",
      hi: "हेल्पलाइन कॉल करें"
    },
    href: "tel:+919889897057",
    iconName: "Phone",
    accentBg: "bg-primary-light",
    accentText: "text-primary",
    borderColor: "border-primary/10"
  },
  {
    title: {
      en: "Alternative Hotline",
      hi: "वैकल्पिक हॉटलाइन"
    },
    detail: {
      en: "+91 94159 06899",
      hi: "+91 94159 06899"
    },
    desc: {
      en: "Alternative mobile helpline for direct calls and WhatsApp queries regarding registrations.",
      hi: "पंजीकरण के संबंध में सीधी कॉल और व्हाट्सएप पूछताछ के लिए वैकल्पिक हेल्पलाइन।"
    },
    actionLabel: {
      en: "Call Alternative",
      hi: "वैकल्पिक नंबर कॉल करें"
    },
    href: "tel:+919415906899",
    iconName: "Phone",
    accentBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    accentText: "text-emerald-700",
    borderColor: "border-emerald-200/50"
  },
  
  {
    title: {
      en: "WhatsApp Channel",
      hi: "व्हाट्सएप चैनल"
    },
    detail: {
      en: "Follow for Updates",
      hi: "अपडेट्स के लिए फॉलो करें"
    },
    desc: {
      en: "Get instant notifications for exam schedules, holidays, and event announcements directly on WhatsApp.",
      hi: "व्हाट्सएप पर सीधे परीक्षा कार्यक्रम, छुट्टियों और कार्यक्रम की घोषणाओं के लिए त्वरित सूचनाएं प्राप्त करें।"
    },
    actionLabel: {
      en: "Follow Channel",
      hi: "चैनल फॉलो करें"
    },
    href: "https://whatsapp.com/channel/0029Vb6llG17j6g1HkdrW239",
    iconName: "MessageSquare",
    accentBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    accentText: "text-emerald-700",
    borderColor: "border-emerald-200/50"
  },
  {
    title: {
      en: "Email Support Desk",
      hi: "ईमेल सहायता डेस्क"
    },
    detail: {
      en: "navjeevanschool2011@gmail.com",
      hi: "navjeevanschool2011@gmail.com"
    },
    desc: {
      en: "For transfer requests, complaints, official records, or feedback submissions.",
      hi: "स्थानांतरण प्रमाण पत्र, शिकायतों, आधिकारिक रिकॉर्ड या प्रतिक्रिया सबमिशन के लिए।"
    },
    actionLabel: {
      en: "Send Email",
      hi: "ईमेल भेजें"
    },
    href: "mailto:navjeevanschool2011@gmail.com",
    iconName: "Mail",
    accentBg: "bg-accent-light",
    accentText: "text-accent",
    borderColor: "border-accent/10"
  }
];
