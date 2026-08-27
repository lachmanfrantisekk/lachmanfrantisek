export type Language = 'cs' | 'en';

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    work: string;
    contact: string;
    menu: string;
    theme: string;
    language: string;
  };
  hero: {
    availability: string;
    role: string;
    description: string;
    viewWork: string;
    contact: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    capabilities: {
      web: { title: string; body: string };
      ai: { title: string; body: string };
      design: { title: string; body: string };
      solving: { title: string; body: string };
    };
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
  };
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    viewProject: string;
    liveSite: string;
    sourceCode: string;
    empty: string;
    error: string;
    retry: string;
    back: string;
    problem: string;
    solution: string;
    result: string;
    technologies: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    subject: string;
    company: string;
    website: string;
    budget: string;
    message: string;
    optional: string;
    send: string;
    sending: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    errorTitle: string;
    errorBody: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageShort: string;
    };
  };
  footer: {
    tagline: string;
    nav: string;
    connect: string;
    rights: string;
    built: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
}

export const translations: Record<Language, Dictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      work: 'Work',
      contact: 'Contact',
      menu: 'Menu',
      theme: 'Toggle theme',
      language: 'Switch language',
    },
    hero: {
      availability: 'Available for selected projects',
      role: 'Web Developer · AI Builder · Creative Technologist',
      description:
        'I design and build modern websites, thoughtful digital experiences and AI-powered products — fast, refined and made to feel effortless.',
      viewWork: 'View my work',
      contact: "Let's work together",
    },
    about: {
      eyebrow: 'About',
      title: 'Building digital products with craft and intent',
      intro:
        'I work at the intersection of web development, artificial intelligence and design. I enjoy turning ideas into practical, polished products that people genuinely want to use.',
      capabilities: {
        web: {
          title: 'Web Development',
          body: 'Modern, responsive and high-performance websites built with care.',
        },
        ai: {
          title: 'AI',
          body: 'AI-powered tools, automation and intelligent digital experiences.',
        },
        design: {
          title: 'Design',
          body: 'Clean interfaces with strong attention to detail and hierarchy.',
        },
        solving: {
          title: 'Problem Solving',
          body: 'Turning ideas into practical, reliable digital products.',
        },
      },
    },
    services: {
      eyebrow: 'What I do',
      title: 'Services',
      subtitle: 'A focused set of things I help clients with.',
      items: [
        { title: 'Website development', body: 'Fast, accessible sites built on a modern stack.' },
        { title: 'Landing pages', body: 'Conversion-focused pages that look premium.' },
        { title: 'Modern UI implementation', body: 'Pixel-precise interfaces from design to code.' },
        { title: 'AI-powered websites', body: 'Sites enhanced with intelligent, useful features.' },
        { title: 'AI automation', body: 'Automating repetitive work with reliable tooling.' },
        { title: 'Custom digital experiences', body: 'Bespoke products tailored to your idea.' },
      ],
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'Selected Work',
      subtitle: 'A selection of recent projects across web and AI.',
      all: 'All',
      viewProject: 'View project',
      liveSite: 'Live site',
      sourceCode: 'Source code',
      empty: 'Projects are on their way. Check back soon.',
      error: 'We couldn’t load the projects right now.',
      retry: 'Try again',
      back: 'Back to work',
      problem: 'The problem',
      solution: 'The solution',
      result: 'The result',
      technologies: 'Technologies',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something great.",
      subtitle: 'Tell me a little about your project and I’ll get back to you.',
      name: 'Name',
      email: 'Email',
      subject: 'Project type',
      company: 'Company',
      website: 'Website',
      budget: 'Budget',
      message: 'Message',
      optional: 'optional',
      send: 'Send message',
      sending: 'Sending…',
      successTitle: 'Message sent',
      successBody: 'Thank you — I’ll be in touch shortly.',
      sendAnother: 'Send another message',
      errorTitle: 'Something went wrong',
      errorBody: 'Your message couldn’t be sent. Please try again in a moment.',
      validation: {
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'Please enter a valid email address.',
        messageRequired: 'Please enter a message.',
        messageShort: 'Please write a little more (at least 10 characters).',
      },
    },
    footer: {
      tagline: 'Web Developer · AI Builder · Creative Technologist',
      nav: 'Navigation',
      connect: 'Connect',
      rights: 'All rights reserved.',
      built: 'Designed & built with care.',
    },
    notFound: {
      title: 'Page not found',
      body: 'The page you are looking for doesn’t exist or has moved.',
      home: 'Back home',
    },
  },
  cs: {
    nav: {
      home: 'Domů',
      about: 'O mně',
      work: 'Práce',
      contact: 'Kontakt',
      menu: 'Menu',
      theme: 'Přepnout motiv',
      language: 'Přepnout jazyk',
    },
    hero: {
      availability: 'K dispozici pro vybrané projekty',
      role: 'Webový vývojář · Tvůrce AI · Kreativní technolog',
      description:
        'Navrhuji a stavím moderní weby, promyšlené digitální zážitky a produkty s umělou inteligencí — rychlé, vytříbené a příjemné na používání.',
      viewWork: 'Prohlédnout práci',
      contact: 'Pojďme spolupracovat',
    },
    about: {
      eyebrow: 'O mně',
      title: 'Tvořím digitální produkty s péčí a záměrem',
      intro:
        'Pohybuji se na pomezí webového vývoje, umělé inteligence a designu. Baví mě proměňovat nápady v praktické a vytříbené produkty, které lidé rádi používají.',
      capabilities: {
        web: {
          title: 'Webový vývoj',
          body: 'Moderní, responzivní a výkonné weby vytvořené s péčí.',
        },
        ai: {
          title: 'Umělá inteligence',
          body: 'Nástroje s AI, automatizace a chytré digitální zážitky.',
        },
        design: {
          title: 'Design',
          body: 'Čistá rozhraní s důrazem na detail a hierarchii.',
        },
        solving: {
          title: 'Řešení problémů',
          body: 'Proměna nápadů ve funkční a spolehlivé produkty.',
        },
      },
    },
    services: {
      eyebrow: 'Co dělám',
      title: 'Služby',
      subtitle: 'Zaměřený výběr toho, s čím klientům pomáhám.',
      items: [
        { title: 'Vývoj webů', body: 'Rychlé a přístupné weby na moderních technologiích.' },
        { title: 'Landing pages', body: 'Prodejní stránky, které působí prémiově.' },
        { title: 'Moderní UI', body: 'Přesná rozhraní od návrhu až po kód.' },
        { title: 'Weby s AI', body: 'Weby obohacené o chytré a užitečné funkce.' },
        { title: 'AI automatizace', body: 'Automatizace opakované práce spolehlivými nástroji.' },
        { title: 'Digitální zážitky na míru', body: 'Produkty ušité přesně vašemu nápadu.' },
      ],
    },
    work: {
      eyebrow: 'Portfolio',
      title: 'Vybraná práce',
      subtitle: 'Výběr nedávných projektů z oblasti webu a AI.',
      all: 'Vše',
      viewProject: 'Zobrazit projekt',
      liveSite: 'Živý web',
      sourceCode: 'Zdrojový kód',
      empty: 'Projekty se připravují. Vraťte se prosím brzy.',
      error: 'Projekty se teď nepodařilo načíst.',
      retry: 'Zkusit znovu',
      back: 'Zpět na práci',
      problem: 'Problém',
      solution: 'Řešení',
      result: 'Výsledek',
      technologies: 'Technologie',
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Pojďme vytvořit něco skvělého.',
      subtitle: 'Napište mi pár slov o svém projektu a ozvu se vám.',
      name: 'Jméno',
      email: 'E-mail',
      subject: 'Typ projektu',
      company: 'Společnost',
      website: 'Web',
      budget: 'Rozpočet',
      message: 'Zpráva',
      optional: 'nepovinné',
      send: 'Odeslat zprávu',
      sending: 'Odesílám…',
      successTitle: 'Zpráva odeslána',
      successBody: 'Děkuji — brzy se vám ozvu.',
      sendAnother: 'Odeslat další zprávu',
      errorTitle: 'Něco se pokazilo',
      errorBody: 'Zprávu se nepodařilo odeslat. Zkuste to prosím za chvíli znovu.',
      validation: {
        nameRequired: 'Zadejte prosím své jméno.',
        emailRequired: 'Zadejte prosím svůj e-mail.',
        emailInvalid: 'Zadejte prosím platnou e-mailovou adresu.',
        messageRequired: 'Napište prosím zprávu.',
        messageShort: 'Napište prosím trochu více (alespoň 10 znaků).',
      },
    },
    footer: {
      tagline: 'Webový vývojář · Tvůrce AI · Kreativní technolog',
      nav: 'Navigace',
      connect: 'Spojení',
      rights: 'Všechna práva vyhrazena.',
      built: 'Navrženo a vytvořeno s péčí.',
    },
    notFound: {
      title: 'Stránka nenalezena',
      body: 'Hledaná stránka neexistuje nebo byla přesunuta.',
      home: 'Zpět domů',
    },
  },
};
