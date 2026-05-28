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
      en: "+91 99356 61144",
      hi: "+91 99356 61144"
    },
    desc: {
      en: "For general admission queries, parent updates, and document requests.",
      hi: "सामान्य प्रवेश पूछताछ, अभिभावक अपडेट और दस्तावेज़ अनुरोधों के लिए संपर्क सूत्र।"
    },
    actionLabel: {
      en: "Call Helpline",
      hi: "हेल्पलाइन कॉल करें"
    },
    href: "tel:+919935661144",
    iconName: "Phone",
    accentBg: "bg-primary-light",
    accentText: "text-primary",
    borderColor: "border-primary/10"
  },
  {
    title: {
      en: "WhatsApp Admissions",
      hi: "व्हाट्सएप प्रवेश"
    },
    detail: {
      en: "Chat Directly",
      hi: "सीधी चैट करें"
    },
    desc: {
      en: "Instant text helpline with admissions officers regarding class structures.",
      hi: "कक्षा की संरचना और विवरण के संबंध में प्रवेश अधिकारियों के साथ तत्काल पाठ हेल्पलाइन।"
    },
    actionLabel: {
      en: "Message Desk",
      hi: "व्हाट्सएप चैट"
    },
    href: "https://wa.me/919935661144?text=Hello%20Nav%20Jeevan%20School%2C%20I%20have%20an%20admission%20inquiry.",
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
      en: "info@navjeevanschool.org",
      hi: "info@navjeevanschool.org"
    },
    desc: {
      en: "For transfer requests, complaints, official records, or feedback submissions.",
      hi: "स्थानांतरण प्रमाण पत्र, शिकायतों, आधिकारिक रिकॉर्ड या प्रतिक्रिया सबमिशन के लिए।"
    },
    actionLabel: {
      en: "Send Email",
      hi: "ईमेल भेजें"
    },
    href: "mailto:info@navjeevanschool.org",
    iconName: "Mail",
    accentBg: "bg-accent-light",
    accentText: "text-accent",
    borderColor: "border-accent/10"
  },
  {
    title: {
      en: "Campus Office Hours",
      hi: "कार्यालय कार्य समय"
    },
    detail: {
      en: "08:00 AM - 01:30 PM",
      hi: "08:00 AM - 01:30 PM"
    },
    desc: {
      en: "Subsidized fee counters and physical document reception are active Mon - Sat.",
      hi: "रियायती शुल्क काउंटर और भौतिक दस्तावेज़ जमा करने की सुविधा सोमवार से शनिवार तक उपलब्ध है।"
    },
    actionLabel: {
      en: "Visit Campus",
      hi: "परिसर में आएं"
    },
    href: "#campus-location",
    iconName: "Clock",
    accentBg: "bg-neutral-light",
    accentText: "text-neutral-dark",
    borderColor: "border-border"
  }
];
