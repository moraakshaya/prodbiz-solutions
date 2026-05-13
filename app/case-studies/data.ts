export interface CaseStudyResult {
    label: string;
    value: string;
}

export interface CaseStudyImages {
    after: string;
    before?: string;
    mobile?: string;
}

export interface CaseStudyCategory {
    title: string;
    desc: string;
    points: string[];
}

export interface CaseStudy {
    client: string;
    industry: string;
    headline: string;
    problem: string;
    challenges: string;
    solution: string;
    categories?: CaseStudyCategory[];
    results: CaseStudyResult[];
    accent: string;
    polaroidAngle: string;
    polaroidAngle2: string;
    images: CaseStudyImages;
}

export const caseStudies: CaseStudy[] = [
    {
        client: "Ricchhotel Restaurant",
        industry: "Restaurant & Hospitality",
        headline: "From No Online Presence to a Professional Digital Experience",
        problem: "The client wanted to grow their restaurant business, attract more customers, and finally build a strong online presence.",
        challenges: "They had zero digital footprint, meaning customers couldn't find their menu, location, or even special offers online.",
        solution: "We built a modern, mobile-friendly website and a full social media strategy to make sure people could find and order from them easily.",
        categories: [
            {
                title: "Branding",
                desc: "Creating a professional visual identity.",
                points: [
                    "Designed a logo for brand recognition",
                    "Created offer posters to attract customers",
                    "Designed digital menu cards"
                ]
            },
            {
                title: "Website",
                desc: "Building a user-friendly digital flagship.",
                points: [
                    "Mobile-responsive menu and booking info",
                    "Fast loading speed for better UX",
                    "Easy contact and order placement"
                ]
            },
            {
                title: "Digital Marketing",
                desc: "Increasing visibility and customer reach.",
                points: [
                    "Social media management (IG/FB)",
                    "Regular content creation and posting",
                    "WhatsApp marketing for direct offers"
                ]
            }
        ],
        results: [
            { label: "Online Presence", value: "Brand New" },
            { label: "Engagement", value: "10x Higher" },
            { label: "Visibility", value: "SEO Ready" },
            { label: "Orders", value: "Daily Growth" },
            { label: "Brand", value: "Professional" },
        ],
        accent: "#2197A1",
        polaroidAngle: "-rotate-2",
        polaroidAngle2: "rotate-3",
        images: {
            after: "/images/ricch-img-01.png",
            mobile: "/case-studies/ricchhotel-after.png"
        }
    },
    {
        client: "Shriswara Multispeciality Hospital",
        industry: "Healthcare",
        headline: "Modernizing a Trusted Hospital's Digital Platform",
        problem: "Their old website was outdated and hard to use, which didn't match the high-quality medical care they provide to patients.",
        challenges: "It was slow on mobile and difficult for patients to find critical doctor info or departments during emergencies.",
        solution: "We created a clean, fast, and easy-to-navigate patient platform so people can access health services and hospital info instantly.",
        categories: [
            {
                title: "Website",
                desc: "Rebuilding the core healthcare experience.",
                points: [
                    "Custom patient-centric navigation",
                    "Optimized doctor and department directories",
                    "Integrated emergency contact flow"
                ]
            },
            {
                title: "Branding",
                desc: "Ensuring trust and accessibility.",
                points: [
                    "100% mobile-responsive interface",
                    "Simplified appointment inquiry path",
                    "Clean, professional healthcare aesthetic"
                ]
            }
        ],
        results: [
            { label: "Experience", value: "Patient First" },
            { label: "Speed", value: "Super Fast" },
            { label: "Mobile", value: "Fully Optimized" },
            { label: "Navigation", value: "Simplified" },
            { label: "Image", value: "Trustworthy" },
        ],
        accent: "#1b7a82",
        polaroidAngle: "rotate-2",
        polaroidAngle2: "-rotate-3",
        images: {
            before: "/case-studies/shriswara-before.png",
            after: "/case-studies/shriswara-after.png"
        }
    },
    {
        client: "GVR Info Systems",
        industry: "IT Services",
        headline: "Building Professional Credibility in the Tech Space",
        problem: "As a growing IT company, their simple self-built website didn't show the true level of their technical expertise.",
        challenges: "The old site was cluttered and hard to navigate, making it difficult for clients to understand their complex IT services.",
        solution: "We designed a high-end, professional website that highlights their services and builds instant trust with global clients.",
        categories: [
            {
                title: "Website",
                desc: "Creating a high-performance visual hierarchy.",
                points: [
                    "Modern tech-focused design language",
                    "Clear structured service portfolio",
                    "Interactive client success highlights"
                ]
            },
            {
                title: "Branding",
                desc: "Establishing authority and trust.",
                points: [
                    "Professional corporate typography",
                    "Optimized lead generation points",
                    "Fast, secure, and reliable performance"
                ]
            }
        ],
        results: [
            { label: "Trust", value: "Global Standard" },
            { label: "Navigation", value: "Clear & Crisp" },
            { label: "Layout", value: "Modern UI" },
            { label: "Brand", value: "Market Leader" },
            { label: "Growth", value: "More Leads" },
        ],
        accent: "#2197A1",
        polaroidAngle: "-rotate-2",
        polaroidAngle2: "rotate-3",
        images: {
            before: "/case-studies/gvr-before.png",
            after: "/case-studies/gvr-after.png"
        }
    },
    {
        client: "Russh Hospital",
        industry: "Healthcare",
        headline: "Expanding Patient Reach Through Digital Transformation",
        problem: "The hospital had an outdated online presence that wasn't reaching enough patients in their local community.",
        challenges: "They didn't have a clear way to show their medical expertise or an easy way for patients to learn about their surgical specialities.",
        solution: "We redesigned their website and launched targeted marketing campaigns to bring their world-class treatments to the right audience.",
        categories: [
            {
                title: "Website",
                desc: "Creating a modern healthcare gateway.",
                points: [
                    "High-converting landing pages",
                    "Speciality-focused content hierarchy",
                    "Integrated patient feedback systems"
                ]
            },
            {
                title: "Digital Marketing",
                desc: "Strategic outreach and engagement.",
                points: [
                    "Targeted local SEO optimization",
                    "Multi-channel content strategy",
                    "Result-driven patient acquisition"
                ]
            }
        ],
        results: [
            { label: "Visibility", value: "Search Rank #1" },
            { label: "Patient Reach", value: "Wider Coverage" },
            { label: "Brand", value: "Modernized" },
            { label: "Marketing", value: "Result Driven" },
            { label: "UI/UX", value: "Patient Centric" },
        ],
        accent: "#1b7a82",
        polaroidAngle: "rotate-2",
        polaroidAngle2: "-rotate-3",
        images: {
            before: "/case-studies/russh-before.png",
            after: "/case-studies/russh-after.png"
        }
    }
];
