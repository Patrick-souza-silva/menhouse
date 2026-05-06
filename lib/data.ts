type Barber = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  experience: string;
  unit: string;
  hasCourse: boolean;
  instagram: string;
  image: string;
  images?: string[];
  staffOnly?: boolean;
  course?: {
    name: string;
    description: string;
    price: string;
    duration: string;
    modules: string[];
  };
};

export const BRAND = {
  name: "MenHouse",
  tagline: "A Arte do Corte Perfeito",
  description:
    "Barbearia premium em Francisco Beltrão - PR. Corte, barba e grooming com os melhores profissionais da região.",
  phone: "(46) 9985-2846",
  whatsappRaw: "554699852846",
  instagram: "@menhouse.barbearia",
  instagramUrl: "https://instagram.com/menhouse.barbearia",
  email: "contato@menhouse.com.br",
  city: "Francisco Beltrão",
  state: "PR",
  country: "Brasil",
};

export const UNITS = [
  {
    id: "centro",
    slug: "barbearia-centro-francisco-beltrao",
    name: "MenHouse",
    shortName: "MenHouse",
    address: "R. Ten. Camargo, 1000 — Centro",
    city: "Francisco Beltrão — PR",
    cep: "85605-090",
    phone: "(46) 9985-2846",
    whatsappRaw: "554699852846",
    mapUrl: "https://www.google.com/maps?q=-26.073339826923824,-53.04756405678305",
    mapEmbed: "https://maps.google.com/maps?q=-26.073339826923824,-53.04756405678305&z=17&output=embed&hl=pt-BR",
    hours: [
      { day: "Segunda a Sexta", time: "08:30 — 20:00" },
      { day: "Sábado", time: "08:30 — 17:00" },
      { day: "Domingo", time: "Fechado" },
    ],
    description:
      "Nossa unidade no coração de Francisco Beltrão. Ambiente sofisticado, cadeiras premium e a experiência completa MenHouse.",
    features: ["Estacionamento", "Wi-Fi", "Ar-condicionado", "Café & Drinks"],
    image: "/images/lojas/loja01-1.jpg",
  },
  {
    id: "zona-sul",
    slug: "barbearia-zona-sul-francisco-beltrao",
    name: "MenHouse Prime",
    shortName: "Prime",
    address: "Av. Júlio Assis Cavalheiro, 602 — Centro",
    city: "Francisco Beltrão — PR",
    cep: "85605-320",
    phone: "(46) 9985-2846",
    whatsappRaw: "554699852846",
    mapUrl: "https://www.google.com/maps?q=-26.077717974168657,-53.05381921593711",
    mapEmbed: "https://maps.google.com/maps?q=-26.077717974168657,-53.05381921593711&z=17&output=embed&hl=pt-BR",
    hours: [
      { day: "Segunda a Sexta", time: "08:30 — 20:00" },
      { day: "Sábado", time: "08:30 — 17:00" },
      { day: "Domingo", time: "Fechado" },
    ],
    description:
      "A experiência premium da MenHouse. Espaço exclusivo, atendimento de alto padrão e o melhor da barbearia moderna.",
    features: ["Estacionamento Amplo", "Wi-Fi", "Ar-condicionado", "Sala VIP"],
    image: "/images/lojas/loja02-1.jpg",
  },
];

export const BARBERS: Barber[] = [
  {
    id: "pedro-caetano",
    slug: "pedro-caetano",
    name: "Pedro G. Caetano",
    role: "Barbeiro & Criador de Conteúdo",
    bio: "Pedro une técnica apurada à comunicação — barbeiro com especialidade em criação de conteúdo, mostrando nos bastidores tudo o que acontece na cadeira e fora dela.",
    specialties: ["Corte Masculino", "Fade", "Criação de Conteúdo"],
    experience: "8 anos",
    unit: "centro",
    hasCourse: false,
    instagram: "@pedro.caetano.pg",
    image: "/images/barbeiros/pedro-caetano.jpg",
  },
  {
    id: "danilo-teodoro",
    slug: "danilo-teodoro",
    name: "Danilo Teodoro",
    role: "Especialista em Imagem Masculina",
    bio: "Danilo vai além do corte — é especialista em imagem masculina, com consultoria completa para ajudar cada cliente a construir o perfil ideal para a sua identidade.",
    specialties: ["Consultoria de Imagem", "Imagem Masculina", "Estilo Personalizado", "Identidade Visual"],
    experience: "7 anos",
    unit: "centro",
    hasCourse: false,
    instagram: "@daniloteodoromenhouse",
    image: "/images/barbeiros/danilo-teodoro.jpg",
  },
  {
    id: "jeferson-barbosa",
    slug: "jeferson-barbosa",
    name: "Jeferson Barbosa",
    role: "Especialista em Cabelo Afro & Pigmentação",
    bio: "Jeferson é referência em cabelo afro, pigmentação e cortes secos e texturizados. Com domínio em freestyle, valoriza e respeita a identidade de cada tipo de cabelo.",
    specialties: ["Cabelo Afro", "Pigmentação", "Cortes Texturizados", "Freestyle"],
    experience: "6 anos",
    unit: "centro",
    hasCourse: false,
    instagram: "@jeff.baarber",
    image: "/images/barbeiros/jeferson-barbosa.webp",
    images: [
      "/images/barbeiros/jeferson-barbosa.webp",
      "/images/barbeiros/jeferson-barbosa-2.webp",
    ],
  },
  {
    id: "victor",
    slug: "victor",
    name: "Victor",
    role: "Especialista em Cortes Criativos & Fade",
    bio: "Barbeiro especializado em cortes criativos e técnicas de fade, com foco em estilo personalizado, acabamento preciso e valorização da identidade de cada cliente.",
    specialties: ["Cortes Criativos", "Fade", "Estilo Personalizado", "Acabamento Preciso"],
    experience: "5 anos",
    unit: "centro",
    hasCourse: false,
    instagram: "@wfzvictor",
    image: "/images/barbeiros/victor.jpg",
    images: [
      "/images/barbeiros/victor.jpg",
      "/images/barbeiros/victor-2.webp",
      "/images/barbeiros/victor-3.webp",
    ],
  },
  {
    id: "maria-eduarda-caetano",
    slug: "maria-eduarda-caetano",
    name: "Maria Eduarda Caetano",
    role: "Gerente Administrativo Financeiro",
    bio: "Maria Eduarda é responsável pela gestão administrativa e financeira da MenHouse Prime, garantindo que tudo funcione com excelência para que a equipe foque no que faz de melhor.",
    specialties: ["Gestão Administrativa", "Financeiro", "Operações"],
    experience: "5 anos",
    unit: "zona-sul",
    hasCourse: false,
    staffOnly: true,
    instagram: "@maria.menhouse",
    image: "/images/barbeiros/maria-eduarda-caetano.webp",
  },
  {
    id: "matteus-sauer",
    slug: "matteus-sauer",
    name: "Matteus Sauer",
    role: "Líder de Equipe & Posicionamento",
    bio: "Matteus Sauer é líder de equipe da MenHouse Prime. Ajuda barbeiros a se destacarem através do posicionamento — autoridade, agenda cheia e criação de conteúdo.",
    specialties: ["Posicionamento", "Liderança de Equipe", "Criação de Conteúdo", "Mentoria"],
    experience: "8 anos",
    unit: "zona-sul",
    hasCourse: false,
    instagram: "@sauer_matteus",
    image: "/images/barbeiros/matteus-sauer.webp",
  },
  {
    id: "luan-matheus",
    slug: "luan-matheus",
    name: "Luan Matheus",
    role: "Especialista em Barba",
    bio: "Luan é especializado em barba, com foco em shapes médios e longos com modelagens de alto padrão. Cada trabalho é um cuidado minucioso para realçar o melhor do cliente.",
    specialties: ["Barba Shape Médio", "Barba Longa", "Modelagem de Alto Padrão", "Design de Barba"],
    experience: "4 anos",
    unit: "zona-sul",
    hasCourse: false,
    instagram: "@luan_matheus1216",
    image: "/images/barbeiros/luan-matheus.png",
    images: [
      "/images/barbeiros/luan-matheus.png",
      "/images/barbeiros/luan-matheus-2.jpg",
      "/images/barbeiros/luan-matheus-3.jpg",
    ],
  },
];

export const SERVICES = [
  {
    id: "corte-premium",
    slug: "corte-masculino-francisco-beltrao",
    name: "Corte Premium",
    shortDesc: "O corte perfeito para o seu estilo",
    description:
      "Da consulta à finalização, cada corte MenHouse é uma experiência personalizada. Usamos produtos premium e técnicas que valorizam o seu tipo de cabelo e formato de rosto.",
    duration: "45 min",
    price: "A partir de R$ 55",
    includes: ["Lavagem com shampoo premium", "Corte personalizado", "Finalização com produtos exclusivos"],
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
  },
  {
    id: "barba-completa",
    slug: "barba-francisco-beltrao",
    name: "Barba Completa",
    shortDesc: "Design e cuidado para sua barba",
    description:
      "Modelagem, navalha quente, hidratação e acabamento perfeito. Nossa técnica de barba inclui toalha quente, óleo de barba premium e finalização com produtos selecionados.",
    duration: "40 min",
    price: "A partir de R$ 45",
    includes: ["Toalha quente", "Design personalizado", "Navalha profissional", "Óleo hidratante"],
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
  },
  {
    id: "combo-vip",
    slug: "combo-corte-barba-francisco-beltrao",
    name: "Combo VIP",
    shortDesc: "Corte + Barba com experiência completa",
    description:
      "A experiência completa MenHouse. Corte premium, barba completa e grooming. O tratamento que você merece, do início ao fim.",
    duration: "80 min",
    price: "A partir de R$ 90",
    includes: ["Corte premium", "Barba completa", "Sobrancelha", "Finalização com produtos"],
    featured: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
  },
  {
    id: "sobrancelha",
    slug: "design-sobrancelha-masculina",
    name: "Design de Sobrancelha",
    shortDesc: "Acabamento e design preciso",
    description:
      "Sobrancelha bem definida faz toda a diferença. Modelagem, design e acabamento preciso para um visual mais alinhado e expressivo.",
    duration: "20 min",
    price: "A partir de R$ 25",
    includes: ["Design personalizado", "Acabamento com pinça", "Finalização"],
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
  },
  {
    id: "tratamento-capilar",
    slug: "tratamento-capilar-masculino",
    name: "Tratamento Capilar",
    shortDesc: "Nutrição e força para o seu cabelo",
    description:
      "Hidratação profunda, nutrição e reconstrução capilar masculina. Devolvemos saúde, brilho e força ao seu cabelo.",
    duration: "60 min",
    price: "A partir de R$ 80",
    includes: ["Análise capilar", "Máscara de tratamento", "Finalização"],
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
  },
  {
    id: "pezinho",
    slug: "acabamento-pezinho-nuca",
    name: "Acabamento & Pezinho",
    shortDesc: "Manutenção e acabamento perfeito",
    description:
      "Manutenção do corte com acabamento na nuca, pezinho e alinhamento lateral. Mantenha sempre o visual impecável.",
    duration: "20 min",
    price: "A partir de R$ 20",
    includes: ["Pezinho", "Acabamento na nuca", "Alinhamento"],
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
  },
];

export const PRODUCTS = [
  {
    id: "pomada-matte",
    name: "Pomada Matte Black",
    brand: "MenHouse",
    description: "Fixação forte com acabamento matte. Para looks modernos sem brilho.",
    price: "R$ 48",
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&q=80",
    category: "Styling",
  },
  {
    id: "oleo-barba",
    name: "Óleo Premium de Barba",
    brand: "MenHouse",
    description: "Hidratação profunda e brilho natural. Aroma amadeirado exclusivo.",
    price: "R$ 65",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
    category: "Barba",
  },
  {
    id: "shampoo-men",
    name: "Shampoo Men",
    brand: "MenHouse",
    description: "Limpeza profunda com ativos para couro cabeludo masculino.",
    price: "R$ 42",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    category: "Cabelo",
  },
  {
    id: "balm-barba",
    name: "Balm de Barba",
    brand: "MenHouse",
    description: "Condicionador para amaciar e modelar a barba no dia a dia.",
    price: "R$ 55",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80",
    category: "Barba",
  },
  {
    id: "cera-cabelo",
    name: "Cera de Cabelo",
    brand: "MenHouse",
    description: "Textura e definição natural. Fixação média com toque seco.",
    price: "R$ 52",
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=600&q=80",
    category: "Styling",
  },
  {
    id: "kit-grooming",
    name: "Kit Grooming Complete",
    brand: "MenHouse",
    description: "Kit completo com os essenciais MenHouse. O presente perfeito.",
    price: "R$ 189",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
    category: "Kits",
    featured: true,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "André Pasqualin",
    role: "Empresário",
    text: "A melhor experiência de barbearia que já tive. O ambiente, o atendimento, o resultado — tudo em outro nível. Virou minha barbearia definitiva em Francisco Beltrão.",
    rating: 5,
    unit: "centro",
    barber: "Lucas Silva",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Advogado",
    text: "Fui a primeira vez por indicação e não troco mais. O Rafael tem uma precisão no fade que não encontro em lugar nenhum. Recomendo demais.",
    rating: 5,
    unit: "centro",
    barber: "Rafael Costa",
  },
  {
    id: 3,
    name: "Fábio Rodrigues",
    role: "Médico",
    text: "Ambiente premium, equipe excepcional. O combo corte + barba do Gabriel é uma experiência à parte. Vale cada centavo.",
    rating: 5,
    unit: "zona-sul",
    barber: "Gabriel Santos",
  },
  {
    id: 4,
    name: "Leandro Souza",
    role: "Engenheiro",
    text: "Finalmente uma barbearia de alto padrão na Zona Sul. Ambiente incrível, profissionais top. A MenHouse elevou o nível de Francisco Beltrão.",
    rating: 5,
    unit: "zona-sul",
    barber: "Bruno Alves",
  },
];

export const FAQ = [
  {
    question: "Onde fica a MenHouse em Francisco Beltrão?",
    answer:
      "A MenHouse possui duas unidades em Francisco Beltrão - PR: Unidade Centro (Rua Getúlio Vargas, 1240 — Centro) e Unidade Zona Sul (Av. Júlio Assis Cavalheiro, 850 — Zona Sul). Ambas de segunda a sábado.",
  },
  {
    question: "Como agendar um horário na MenHouse?",
    answer:
      "O agendamento é feito diretamente pelo WhatsApp. Clique no botão 'Agendar' no site ou entre em contato pelo (46) 9985-2846 (Centro) ou (46) 9985-2846 (Zona Sul). Atendemos de segunda a sábado.",
  },
  {
    question: "Qual o melhor barbeiro para fade em Francisco Beltrão?",
    answer:
      "Na MenHouse, nosso especialista em fade é o Rafael Costa, com 8 anos de experiência. Reconhecido como referência em fade de alta precisão em Francisco Beltrão.",
  },
  {
    question: "A MenHouse vende produtos para cabelo e barba?",
    answer:
      "Sim! Temos nossa linha própria de produtos premium: pomadas, óleos de barba, shampoos e kits grooming. Disponíveis nas unidades e por encomenda via WhatsApp.",
  },
  {
    question: "Os barbeiros da MenHouse oferecem cursos profissionais?",
    answer:
      "Sim! Lucas Silva oferece o curso Master em Cortes Masculinos e Matheus Oliveira o curso Barbeiro Clássico Profissional. Ambos são os cursos mais completos do Sudoeste do Paraná.",
  },
  {
    question: "A barbearia atende no final de semana?",
    answer:
      "Atendemos aos sábados das 08:00 às 18:00 em ambas as unidades. Aos domingos as unidades estão fechadas. Recomendamos agendamento para garantir seu horário.",
  },
];

