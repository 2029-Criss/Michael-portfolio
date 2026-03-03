import type { ProjectArticle } from "@/features/projects/types";

export const articles: ProjectArticle[] = [
  {
    id: "P01",
    title: "Stratégie Durable",
    subtitle: "Pilier 1 : Clarté & Stratégie",
    category: "Pilier",
    date: "2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    author: {
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Consultant en développement durable",
    },
    content: {
      introduction: "La stratégie durable est le fondement de tout projet à impact. Elle commence par une vision claire et une compréhension profonde des enjeux environnementaux et sociaux.",
      sections: [
        { heading: "Définir la vision", content: "Une stratégie durable commence par la définition d'objectifs clairs, mesurables et alignés avec les valeurs de l'organisation." },
        { heading: "Analyser le contexte", content: "Comprendre l'environnement, les parties prenantes et les opportunités permet de construire une feuille de route réaliste et ambitieuse." },
      ],
      conclusion: "La clarté stratégique est le premier pas vers un impact durable et mesurable.",
    },
    tags: ["stratégie", "durabilité", "vision"],
  },
  {
    id: "P02",
    title: "Accompagnement Humain",
    subtitle: "Pilier 2 : Approche inspirante",
    category: "Pilier",
    date: "2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
    author: {
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Consultant en développement durable",
    },
    content: {
      introduction: "L'accompagnement humain place les personnes au cœur du changement. Inspirer, former et mobiliser sont les clés d'une transformation réussie.",
      sections: [
        { heading: "Inspirer le changement", content: "Le leadership inspirant crée l'adhésion et mobilise les équipes autour d'un objectif commun." },
        { heading: "Former les acteurs", content: "La montée en compétences des collaborateurs garantit la pérennité des pratiques responsables." },
      ],
      conclusion: "Un accompagnement humain de qualité transforme les intentions en actions concrètes.",
    },
    tags: ["accompagnement", "leadership", "formation"],
  },
  {
    id: "P03",
    title: "Impact Concret",
    subtitle: "Pilier 3 : Mise en action",
    category: "Pilier",
    date: "2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
    author: {
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Consultant en développement durable",
    },
    content: {
      introduction: "L'impact concret se mesure par les résultats tangibles : réduction de l'empreinte carbone, amélioration des conditions sociales, création de valeur partagée.",
      sections: [
        { heading: "Mesurer les résultats", content: "Des indicateurs précis permettent de suivre et communiquer l'impact réel des projets." },
        { heading: "Pérenniser le changement", content: "L'impact durable nécessite des systèmes de suivi et d'amélioration continue." },
      ],
      conclusion: "L'action concrète est la preuve de l'engagement. C'est ce qui transforme les promesses en réalités.",
    },
    tags: ["impact", "mesure", "action"],
  },
  {
    id: "R01",
    title: "Projet Baie des Rois",
    subtitle: "Réalisation majeure avec le FGIS",
    category: "Réalisation",
    date: "2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
    author: {
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Consultant en développement durable",
    },
    content: {
      introduction: "Le projet Baie des Rois est une réalisation emblématique d'urbanisme durable, mené en collaboration avec le FGIS pour créer un espace de vie exemplaire.",
      sections: [
        { heading: "Vision du projet", content: "Transformer un espace côtier en un modèle de développement urbain respectueux de l'environnement et inclusif." },
        { heading: "Approche adoptée", content: "Une méthodologie participative impliquant les communautés locales, les experts environnementaux et les investisseurs." },
      ],
      conclusion: "Le projet Baie des Rois démontre qu'urbanisme ambitieux et développement durable peuvent aller de pair.",
    },
    tags: ["urbanisme", "FGIS", "Baie des Rois"],
  },
  {
    id: "R02",
    title: "Engagement ONG",
    subtitle: "Soutien aux initiatives locales",
    category: "Réalisation",
    date: "2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    author: {
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Consultant en développement durable",
    },
    content: {
      introduction: "L'engagement auprès des ONG reflète une conviction profonde : les initiatives locales sont le moteur du changement global.",
      sections: [
        { heading: "Partenariats stratégiques", content: "Collaborer avec les ONG permet de démultiplier l'impact et de toucher les communautés les plus vulnérables." },
        { heading: "Résultats terrain", content: "Des projets concrets de reforestation, d'éducation environnementale et de développement communautaire." },
      ],
      conclusion: "Chaque initiative locale contribue à construire un monde plus juste et plus durable.",
    },
    tags: ["ONG", "initiatives locales", "engagement"],
  },
  {
    id: "R03",
    title: "Conseil Écoresponsable",
    subtitle: "Accompagnement des particuliers",
    category: "Réalisation",
    date: "2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80",
    author: {
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Consultant en développement durable",
    },
    content: {
      introduction: "Le conseil écoresponsable aide les particuliers à adopter des pratiques durables au quotidien, de la gestion de l'énergie à la consommation responsable.",
      sections: [
        { heading: "Audit personnel", content: "Un bilan complet de l'empreinte écologique pour identifier les leviers d'amélioration les plus efficaces." },
        { heading: "Plan d'action", content: "Des recommandations personnalisées et réalistes pour une transition écologique progressive." },
      ],
      conclusion: "Chaque geste compte. L'accompagnement écoresponsable rend le changement accessible à tous.",
    },
    tags: ["écoresponsable", "particuliers", "conseil"],
  },
];
