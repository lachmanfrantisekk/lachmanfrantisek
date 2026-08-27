const coffees = [

    {
        id: "white-chocolate-strawberry",

        name: "White Chocolate & Strawberry",

        image: "white-chocolate-strawberry.webp",

        accent: "#F56FB3",

        volume: 230,

        cup: "mug",

        caffeine: true,

        intensity: 3,

        description: "Krémová ochucená káva s tóny bílé čokolády a jahod.",

        scores: {

            milk: 3,

            iced: 2,

            caffeine: 3,

            flavors: {

                chocolate: 2,
                roasted: 0,
                fruity: 3,
                floral: 0,
                vanilla: 1,
                sweet: 3,
                nutty: 0,
                cereal: 0

            }

        },

        notes: [

            "Bílá čokoláda",
            "Jahody",
            "Limited Edition"

        ]

    },

    {
        id: "coconut-vanilla-over-ice",

        name: "Coconut Vanilla Over Ice",

        image: "coconut-vanilla-over-ice.webp",

        accent: "#66C6E8",

        volume: 230,

        cup: "mug",

        caffeine: true,

        intensity: 3,

        description: "Vanilkovo-kokosová káva vytvořená pro ledové recepty.",

        scores: {

            milk: 2,

            iced: 3,

            caffeine: 3,

            flavors: {

                chocolate: 0,
                roasted: 0,
                fruity: 1,
                floral: 0,
                vanilla: 3,
                sweet: 3,
                nutty: 1,
                cereal: 0

            }

        },

        notes: [

            "Kokos",
            "Vanilka",
            "Over Ice"

        ]

    },

    {
        id: "pumpkin-spice-cake",

        name: "Pumpkin Spice Cake",

        image: "pumpkin-spice-cake.webp",

        accent: "#D87428",

        volume: 230,

        cup: "mug",

        caffeine: true,

        intensity: 4,

        description: "Sladká sezónní káva s kořeněnými tóny dýňového koláče.",

        scores: {

            milk: 3,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 0,
                roasted: 1,
                fruity: 0,
                floral: 0,
                vanilla: 1,
                sweet: 3,
                nutty: 1,
                cereal: 2

            }

        },

        notes: [

            "Dýňové koření",
            "Sladká",
            "Limited Edition"

        ]

    },

    {
        id: "french-lavender-vanilla-decaf",

        name: "French Lavender & Vanilla Decaffeinato",

        image: "french-lavender-vanilla-decaf.webp",

        accent: "#A87CEB",

        volume: 230,

        cup: "mug",

        caffeine: false,

        intensity: 2,

        description: "Jemná bezkofeinová ochucená káva s levandulí a vanilkou.",

        scores: {

            milk: 3,

            iced: 2,

            caffeine: 0,

            flavors: {

                chocolate: 0,
                roasted: 0,
                fruity: 0,
                floral: 3,
                vanilla: 3,
                sweet: 3,
                nutty: 0,
                cereal: 0

            }

        },

        notes: [

            "Bez kofeinu",
            "Levandule",
            "Vanilka"

        ]

    },

    {
        id: "double-espresso-dolce",

        name: "Double Espresso Dolce",

        image: "double-espresso-dolce.webp",

        accent: "#B57A44",

        volume: 80,

        cup: "double",

        caffeine: true,

        intensity: 5,

        description: "Jemné Double Espresso se sladovými cereálními tóny.",

        scores: {

            milk: 3,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 1,
                roasted: 1,
                fruity: 0,
                floral: 0,
                vanilla: 0,
                sweet: 2,
                nutty: 1,
                cereal: 3

            }

        },

        notes: [

            "80 ml",
            "Sladové tóny",
            "Vyvážená"

        ]

    },

     {
        id: "costa-rica",

        name: "Costa Rica",

        image: "costa-rica.webp",

        accent: "#B86F3D",

        volume: 150,

        cup: "gran-lungo",

        caffeine: true,

        intensity: 7,

        description: "Single Origin z Kostariky s výraznými sladovými a ovocnými tóny.",

        scores: {

            milk: 1,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 0,
                roasted: 1,
                fruity: 2,
                floral: 1,
                vanilla: 0,
                sweet: 2,
                nutty: 1,
                cereal: 3

            }

        },

        notes: [

            "150 ml",
            "Single Origin",
            "Sladové tóny"

        ]

    },

    {
        id: "ethiopia",

        name: "Ethiopia",

        image: "ethiopia.webp",

        accent: "#A65E3A",

        volume: 150,

        cup: "gran-lungo",

        caffeine: true,

        intensity: 4,

        description: "Lehká a aromatická arabika s květinovými a ovocnými tóny.",

        scores: {

            milk: 0,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 0,
                roasted: 0,
                fruity: 3,
                floral: 3,
                vanilla: 0,
                sweet: 1,
                nutty: 0,
                cereal: 0

            }

        },

        notes: [

            "Arabica",
            "Květinová",
            "Lehká"

        ]

    },

    {
        id: "melozio-decaffeinato",

        name: "Melozio Decaffeinato",

        image: "melozio-decaffeinato.webp",

        accent: "#B59C66",

        volume: 230,

        cup: "mug",

        caffeine: false,

        intensity: 6,

        description: "Vyvážená bezkofeinová káva s jemnou sladkostí.",

        scores: {

            milk: 2,

            iced: 1,

            caffeine: 0,

            flavors: {

                chocolate: 1,
                roasted: 1,
                fruity: 0,
                floral: 0,
                vanilla: 0,
                sweet: 2,
                nutty: 1,
                cereal: 2

            }

        },

        notes: [

            "230 ml",
            "Bez kofeinu",
            "Vyvážená"

        ]

    },

    {
        id: "colombia",

        name: "Colombia",

        image: "colombia.webp",

        accent: "#B34A2F",

        volume: 230,

        cup: "mug",

        caffeine: true,

        intensity: 8,

        description: "Plná kolumbijská arabika s ovocným charakterem a vínovou aciditou.",

        scores: {

            milk: 1,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 1,
                roasted: 2,
                fruity: 3,
                floral: 1,
                vanilla: 0,
                sweet: 1,
                nutty: 0,
                cereal: 1

            }

        },

        notes: [

            "230 ml",
            "Single Origin",
            "Ovocná"

        ]

    },

    {
        id: "bianco-doppio",

        name: "Bianco Doppio",

        image: "bianco-doppio.webp",

        accent: "#D2B18C",

        volume: 80,

        cup: "double",

        caffeine: true,

        intensity: 0,

        description: "Double Espresso navržené speciálně pro mléčné recepty.",

        scores: {

            milk: 3,

            iced: 2,

            caffeine: 3,

            flavors: {

                chocolate: 1,
                roasted: 1,
                fruity: 0,
                floral: 0,
                vanilla: 1,
                sweet: 2,
                nutty: 1,
                cereal: 3

            }

        },

        notes: [

            "80 ml",
            "Na mléko",
            "Barista Creations"

        ]

    },

    {
        id: "sweet-vanilla-decaffeinato",

        name: "Sweet Vanilla Decaffeinato",

        image: "sweet-vanilla-decaffeinato.webp",

        accent: "#E0C27B",

        volume: 230,

        cup: "mug",

        caffeine: false,

        intensity: 6,

        description: "Bezkofeinová ochucená káva s výraznou vanilkou a jemnou sladkostí.",

        scores: {

            milk: 3,

            iced: 2,

            caffeine: 0,

            flavors: {

                chocolate: 0,
                roasted: 0,
                fruity: 0,
                floral: 0,
                vanilla: 3,
                sweet: 3,
                nutty: 1,
                cereal: 1

            }

        },

        notes: [

            "230 ml",
            "Bez kofeinu",
            "Vanilka"

        ]

    },

    {
        id: "pistachio-vanilla-over-ice",

        name: "Pistachio Vanilla Flavour Over Ice",

        image: "pistachio-vanilla-over-ice.webp",

        accent: "#8CCF7E",

        volume: 230,

        cup: "mug",

        caffeine: true,

        intensity: 4,

        description: "Sladká pistáciovo-vanilková káva vytvořená pro ledové recepty.",

        scores: {

            milk: 3,

            iced: 3,

            caffeine: 3,

            flavors: {

                chocolate: 0,
                roasted: 0,
                fruity: 0,
                floral: 0,
                vanilla: 3,
                sweet: 3,
                nutty: 3,
                cereal: 0

            }

        },

        notes: [

            "Over Ice",
            "Pistácie",
            "Vanilka"

        ]

    },

    {
        id: "altissio",

        name: "Altissio",

        image: "altissio.webp",

        accent: "#6D3B28",

        volume: 40,

        cup: "espresso",

        caffeine: true,

        intensity: 9,

        description: "Plné espresso s hustou cremou a kakaovými tóny.",

        scores: {

            milk: 3,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 3,
                roasted: 2,
                fruity: 0,
                floral: 0,
                vanilla: 0,
                sweet: 1,
                nutty: 1,
                cereal: 0

            }

        },

        notes: [

            "40 ml",
            "Espresso",
            "Kakao"

        ]

    },

    {
        id: "double-espresso-scuro",

        name: "Double Espresso Scuro",

        image: "double-espresso-scuro.webp",

        accent: "#4B2C24",

        volume: 80,

        cup: "double",

        caffeine: true,

        intensity: 11,

        description: "Intenzivní dvojité espresso s kakaovými a praženými tóny.",

        scores: {

            milk: 3,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 3,
                roasted: 3,
                fruity: 0,
                floral: 0,
                vanilla: 0,
                sweet: 1,
                nutty: 1,
                cereal: 0

            }

        },

        notes: [

            "80 ml",
            "Kakao",
            "Intenzita 11"

        ]

    },

    {
        id: "double-espresso-chiaro",

        name: "Double Espresso Chiaro",

        image: "double-espresso-chiaro.webp",

        accent: "#A56B4A",

        volume: 80,

        cup: "double",

        caffeine: true,

        intensity: 8,

        description: "Jemnější Double Espresso s dřevitými a čokoládovými tóny.",

        scores: {

            milk: 3,

            iced: 1,

            caffeine: 3,

            flavors: {

                chocolate: 2,
                roasted: 1,
                fruity: 0,
                floral: 0,
                vanilla: 0,
                sweet: 1,
                nutty: 1,
                cereal: 2

            }

        },

        notes: [

            "80 ml",
            "Dřevité tóny",
            "Vyvážená"

        ]

    }

];

