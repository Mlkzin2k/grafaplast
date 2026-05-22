"use client";

import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";

type Pedido = {
  ordem: string;
  nome: string;
  formato: string;
  cilindro: string;
  status: "Armazenado" | "Retirado";
};

type Cliente = {
  codigo: string;
  pedidos: Pedido[];
};

type Editando = Pedido & {
  codigo: string;
  index: number;
};

const dadosIniciais: Cliente[] = [
  {
    "codigo": "2104",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "super mercado baklizi brasil free shop",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "baklizi brasil free shop",
        "formato": "50X55",
        "cilindro": "56",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4572",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "buphallos jeans",
        "formato": "30X40",
        "cilindro": "61",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "buphallos jeans",
        "formato": "58X100",
        "cilindro": "48",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "stabulos country",
        "formato": "58X100",
        "cilindro": "48",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1810",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "garra linha pvc",
        "formato": "44X50",
        "cilindro": "45",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "cartom 360 basic",
        "formato": "32X45",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "cartom lider eletricista",
        "formato": "32X45",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "cartom lider",
        "formato": "32X45",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "cabana magazine",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "cartom top plus isso 9001",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "cartom flex bidencidade isso 9001",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "8°",
        "nome": "garra iso 9001",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "9°",
        "nome": "cartom monodensidade",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "10°",
        "nome": "worker bota pvc cano longo",
        "formato": "50X50",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "11°",
        "nome": "worker bota pvc",
        "formato": "45X50",
        "cilindro": "46",
        "status": "Armazenado"
      },
      {
        "ordem": "12°",
        "nome": "cartom bota pvc 36 a 46",
        "formato": "45X50",
        "cilindro": "45",
        "status": "Armazenado"
      },
      {
        "ordem": "13°",
        "nome": "artro calçados uso profissional",
        "formato": "32X45",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "14°",
        "nome": "cartom bota pvc",
        "formato": "50X50",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "15°",
        "nome": "worker botina de segurança 33a48 s/m",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "16°",
        "nome": "calçados cartom pizzi 33 a 46 s/m",
        "formato": "29X44",
        "cilindro": "58",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4916",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "berlim atadista",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1328",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "pedrinho sports",
        "formato": "30X40",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "pedrinho sports",
        "formato": "42X50",
        "cilindro": "48",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "2088",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "casa do pintor",
        "formato": "30X48",
        "cilindro": "50,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "373",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "hospital são josé",
        "formato": "28,5X42",
        "cilindro": "58",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1573/1593",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "maline",
        "formato": "70X80",
        "cilindro": "82",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1498",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "virtus v05",
        "formato": "15,5X17",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "virtus guardanapo p/estojo",
        "formato": "14X13,5",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "461",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "dia das mães",
        "formato": "60X100",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "giassi geral",
        "formato": "60X100",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "giassi açougue 5kg",
        "formato": "28X44",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "giassi pão doce",
        "formato": "24X34",
        "cilindro": "48",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "giassi",
        "formato": "21X50",
        "cilindro": "42",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "giassi só logo",
        "formato": "24X34",
        "cilindro": "48",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "giassi maçãs kids gala",
        "formato": "25X41",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "8°",
        "nome": "giassi cesta compacta",
        "formato": "42X54",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "9°",
        "nome": "giassi so logo",
        "formato": "21X42",
        "cilindro": "42",
        "status": "Armazenado"
      },
      {
        "ordem": "10°",
        "nome": "giassi açougue 3kg",
        "formato": "25X35",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5250",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "volt",
        "formato": "31X35",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "diadora",
        "formato": "31X35",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4826",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "bambolina serena baby e roda cotia",
        "formato": "62X100",
        "cilindro": "61 ou 60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1379",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "d'frente faschion",
        "formato": "60X100",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1596",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "moda e cia",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "K e A",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "moda e cia",
        "formato": "40X55",
        "cilindro": "56",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "nativa produtos naturais e organicos",
        "formato": "40X55",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "K e A",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "dominante calçados e esportes",
        "formato": "45X55",
        "cilindro": "45",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "drogaria minas brasil",
        "formato": "36X46/36X48",
        "cilindro": "48/50,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4613",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "bali hai",
        "formato": "48X48,5",
        "cilindro": "41",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "bali hai",
        "formato": "31X43",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4455",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "cattucci denim",
        "formato": "36X46",
        "cilindro": "36",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "830",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "tarja vermelho",
        "formato": "80X100",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "casa 12",
        "formato": "90X100",
        "cilindro": "99",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "laboratorio são lucas",
        "formato": "22X16",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "dadri",
        "formato": "70X80",
        "cilindro": "82",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "magnani",
        "formato": "38X48",
        "cilindro": "48",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "gg pack inovar e ferragens",
        "formato": "50X100",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "magnani",
        "formato": "50X60",
        "cilindro": "61",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1565",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "sensual",
        "formato": "50X55",
        "cilindro": "55",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1492",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "sinhana modas",
        "formato": "45X60/50X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "930",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "tribus",
        "formato": "44X45",
        "cilindro": "45",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "562",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "super intimo",
        "formato": "42X50",
        "cilindro": "42",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1891",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "supermercados minatto forquilhinha",
        "formato": "40X50",
        "cilindro": "52/53",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "448",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "sapatolandia new york free shop",
        "formato": "30X50",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "sapatolandia new york free shop",
        "formato": "80X100",
        "cilindro": "99",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "calçados e conf monte cristo/new york",
        "formato": "51X63,5",
        "cilindro": "53",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "calçados e conf monte cristo/new york",
        "formato": "41X62,5",
        "cilindro": "42",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "sapatolandia new york free shop",
        "formato": "45X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1688",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "casa a favorita",
        "formato": "53X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "99999",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "produto da casa",
        "formato": "22X48/46/45",
        "cilindro": "45",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "produto da casa",
        "formato": "22X48/22X46/22X45",
        "cilindro": "45",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "produto da casa",
        "formato": "18X36",
        "cilindro": "36",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "pio pan farinha de rosca",
        "formato": "20X30",
        "cilindro": "41",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "farinha de rosca",
        "formato": "15X25",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "pão de forma",
        "formato": "22X48/22X46",
        "cilindro": "44",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4997",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "olá mamãe",
        "formato": "36X41",
        "cilindro": "36",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "olá mamãe",
        "formato": "44X56",
        "cilindro": "45",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "962",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "rebibras",
        "formato": "15X15",
        "cilindro": "46",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "551",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "delta pvc gg",
        "formato": "35X50",
        "cilindro": "36",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "delta pvc g",
        "formato": "32X46",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "delta pvc m",
        "formato": "32X46",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "delta pvc p",
        "formato": "32X46",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "delta flex p",
        "formato": "32X46",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "delta flex g",
        "formato": "32X46",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "delta flex m",
        "formato": "32X46",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "8°",
        "nome": "delta conj nylon",
        "formato": "30X46",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1395",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "3k",
        "formato": "34X37",
        "cilindro": "34",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "72",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "ciavest fitnesse",
        "formato": "31X44",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4330",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "monaco free shop",
        "formato": "60X70",
        "cilindro": "70,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "brasil free shop",
        "formato": "80X100",
        "cilindro": "99",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "brasil free shop",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "monaco free shop",
        "formato": "30X50",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "monaco free shop",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "monaco free shop",
        "formato": "80X100",
        "cilindro": "100",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "brasil free shop",
        "formato": "60X70",
        "cilindro": "70,5",
        "status": "Armazenado"
      },
      {
        "ordem": "8°",
        "nome": "monaco free shop",
        "formato": "31X38",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "9°",
        "nome": "brasil free shop",
        "formato": "34X62,5",
        "cilindro": "34",
        "status": "Armazenado"
      },
      {
        "ordem": "10°",
        "nome": "brasil free shop",
        "formato": "21,5X52",
        "cilindro": "43",
        "status": "Armazenado"
      },
      {
        "ordem": "11°",
        "nome": "brasil free shop",
        "formato": "51X63,5",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "12°",
        "nome": "monaco free shop",
        "formato": "21,5X52",
        "cilindro": "43",
        "status": "Armazenado"
      },
      {
        "ordem": "13°",
        "nome": "monaco free shop",
        "formato": "51X63,5",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "14°",
        "nome": "monaco free shop",
        "formato": "34X62,5",
        "cilindro": "34",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4794",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "mundo das variedade",
        "formato": "80X100",
        "cilindro": "99/36",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5261",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "pantanal free shop",
        "formato": "31X38",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "pantanal free shop",
        "formato": "51X63,5",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "pantanal free shop",
        "formato": "41X62,5",
        "cilindro": "42",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "pantanal free shop",
        "formato": "30X50",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "pantanal free shop",
        "formato": "21,5X52",
        "cilindro": "43",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "pantanal free shop",
        "formato": "34X62,5",
        "cilindro": "34",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "pantanal free shop",
        "formato": "31X55",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "8°",
        "nome": "pantanal free shop",
        "formato": "60X85",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4561",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "casas uruguai",
        "formato": "65X80",
        "cilindro": "82",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1287",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "camisart",
        "formato": "21X35",
        "cilindro": "42",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1986/5076",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "supermercados catarinense",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5096",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "boaroli supermercados",
        "formato": "40X50",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1985",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "sapatolandia",
        "formato": "45X45",
        "cilindro": "46",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4835",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "havan p",
        "formato": "30X44",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "havan m",
        "formato": "40X50",
        "cilindro": "40",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "havan g az",
        "formato": "50X60",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "havan g pink",
        "formato": "50X60",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "havan m pink",
        "formato": "40X50",
        "cilindro": "40",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "turminha da havan p",
        "formato": "30X44",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "7°",
        "nome": "turminha da havan m",
        "formato": "40X50",
        "cilindro": "40",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1265",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "dipano",
        "formato": "38X47",
        "cilindro": "38",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "274",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "forplast forros de pvc",
        "formato": "12X100",
        "cilindro": "58",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "hamper pulire residuos infectantes",
        "formato": "85X100",
        "cilindro": "48",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "pulire residuo infectante 200lt",
        "formato": "85X100",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "pulire residuo infectante 100lt",
        "formato": "70X100",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "pulire 60 l",
        "formato": "55X100",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5025",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "massa fresca pastel e lasanha",
        "formato": "12,5X31,5",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4583",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "rede sheik",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "rede sheik",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "rede sheik",
        "formato": "30X40",
        "cilindro": "40",
        "status": "Armazenado"
      },
      {
        "ordem": "4°",
        "nome": "rede sheik",
        "formato": "60X70",
        "cilindro": "72",
        "status": "Armazenado"
      },
      {
        "ordem": "5°",
        "nome": "rede sheik",
        "formato": "45X55",
        "cilindro": "46",
        "status": "Armazenado"
      },
      {
        "ordem": "6°",
        "nome": "rede sheik",
        "formato": "31X40",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4987",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "clinica imagem",
        "formato": "40X52",
        "cilindro": "42",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4695",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "estilo e cia",
        "formato": "35X45",
        "cilindro": "36",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "127",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "farmacia pizzolotto",
        "formato": "40X50",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "farmacia pizzolotto",
        "formato": "30X40",
        "cilindro": "41,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "862",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "supermercado gisele",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "supermercados giseli",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1986",
    "pedidos": [
      {
        "ordem": "2°",
        "nome": "supermercados catarinense",
        "formato": "80X100",
        "cilindro": "52",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "supermercados catarinense",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5002",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "black nine b9",
        "formato": "25X40",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1048",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "martinhago calçados",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4356",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "bah free shop",
        "formato": "21,5X52",
        "cilindro": "43",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "bah free shop",
        "formato": "41X62",
        "cilindro": "42",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "bah free shop",
        "formato": "31X55",
        "cilindro": "31,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "828",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "bistek pão francês",
        "formato": "28X48",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "bistek fornada",
        "formato": "22X30",
        "cilindro": "45",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4977",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "mattric",
        "formato": "27X47",
        "cilindro": "55",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1980",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "bm9",
        "formato": "25X35",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "894",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "pantaneiro bota pvc impermeavel",
        "formato": "40X56",
        "cilindro": "40",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4738",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "dellarini massa caseira 1kg",
        "formato": "26X36",
        "cilindro": "52",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4357/5093/4661",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "supermercado central chui",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5251",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "ooze",
        "formato": "35X45",
        "cilindro": "36",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "ooze",
        "formato": "28X40",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "ooze",
        "formato": "25X35",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4902",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "super a rodrigues",
        "formato": "40X50",
        "cilindro": "52",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1682",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "city blue",
        "formato": "25X34",
        "cilindro": "50",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "city blue",
        "formato": "30X45",
        "cilindro": "61",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4482",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "dress to",
        "formato": "18X26",
        "cilindro": "36",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "1040",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "cribras descartavel 1000/1250",
        "formato": "16X18",
        "cilindro": "32,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "empresa guguilhelmi",
        "formato": "21X30",
        "cilindro": "43",
        "status": "Armazenado"
      },
      {
        "ordem": "3°",
        "nome": "cribras descartavel 1000x1250 multiuso",
        "formato": "16X18",
        "cilindro": "32,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5167",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "targ duty free",
        "formato": "31X38",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "targ duty free",
        "formato": "60X70",
        "cilindro": "70,5",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "2254",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "moniari pão francês",
        "formato": "28X40",
        "cilindro": "55",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "moniari pães especiais",
        "formato": "25X35",
        "cilindro": "50",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5267",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "suprimix",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "863",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "talismã calçados",
        "formato": "60X82",
        "cilindro": "82",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "2234",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "hno jeans",
        "formato": "35X44",
        "cilindro": "36",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "2119",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "fada fit girls",
        "formato": "38X43",
        "cilindro": "40",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4869",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "onça preta",
        "formato": "31,5X46",
        "cilindro": "31,5",
        "status": "Armazenado"
      },
      {
        "ordem": "2°",
        "nome": "onça preta",
        "formato": "26X35",
        "cilindro": "52/53",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "5264",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "extensores 5mm",
        "formato": "16X31",
        "cilindro": "49",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4940",
    "pedidos": [
      {
        "ordem": "1°",
        "nome": "emporio gele laranjal s/endereço",
        "formato": "38X50",
        "cilindro": "52",
        "status": "Armazenado"
      }
    ]
  },
  {
    "codigo": "4357",
    "pedidos": [
      {
        "ordem": "2°",
        "nome": "supermercado central chui",
        "formato": "50X60",
        "cilindro": "60",
        "status": "Armazenado"
      }
    ]
  }
];

export default function SistemaPastasPreview() {
  const [aberto, setAberto] = useState<string | null>(null);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [editando, setEditando] = useState<Editando | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [carregado, setCarregado] = useState(false);

  const [historico, setHistorico] = useState<string[]>(["Sistema iniciado"]);

  const [nova, setNova] = useState({
    codigo: "",
    ordem: "",
    nome: "",
    formato: "",
    cilindro: ""
  });

  const [dados, setDados] = useState<Cliente[]>(dadosIniciais);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("grafaplast-dados-v2");
    const historicoSalvo = localStorage.getItem("grafaplast-historico-v2");

    if (dadosSalvos) {
      setDados(JSON.parse(dadosSalvos));
    }

    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo));
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem("grafaplast-dados-v2", JSON.stringify(dados));
    }
  }, [dados, carregado]);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem("grafaplast-historico-v2", JSON.stringify(historico));
    }
  }, [historico, carregado]);

  const gerarData = () => {
    return new Date().toLocaleString("pt-BR");
  };

  const adicionar = () => {
    if (!nova.codigo || !nova.nome) return;

    const pedido: Pedido = {
      ordem: nova.ordem,
      nome: nova.nome,
      formato: nova.formato,
      cilindro: nova.cilindro,
      status: "Armazenado"
    };

    setDados((prev) => {
      const existe = prev.find((cliente) => cliente.codigo === nova.codigo);

      if (existe) {
        return prev.map((cliente) =>
          cliente.codigo === nova.codigo
            ? { ...cliente, pedidos: [...cliente.pedidos, pedido] }
            : cliente
        );
      }

      return [...prev, { codigo: nova.codigo, pedidos: [pedido] }];
    });

    setHistorico((prev) => [
      `📁 Nova pasta criada (${nova.codigo}) - ${gerarData()}`,
      ...prev
    ]);

    setNova({ codigo: "", ordem: "", nome: "", formato: "", cilindro: "" });
    setMostrarNova(false);
  };

  const excluirPasta = (codigo: string) => {
    setDados((prev) => prev.filter((cliente) => cliente.codigo !== codigo));
    setHistorico((prev) => [`🗑️ Pasta ${codigo} excluída - ${gerarData()}`, ...prev]);
    setMenu(null);
  };

  const excluirPedido = (codigo: string, index: number) => {
    const cliente = dados.find((x) => x.codigo === codigo);
    const pedido = cliente?.pedidos[index];

    setDados((prev) =>
      prev.map((cliente) =>
        cliente.codigo === codigo
          ? { ...cliente, pedidos: cliente.pedidos.filter((_, i) => i !== index) }
          : cliente
      )
    );

    if (pedido) {
      setHistorico((prev) => [
        `❌ Pedido ${pedido.nome} excluído da pasta ${codigo} - ${gerarData()}`,
        ...prev
      ]);
    }
  };

  const alterarStatus = (
    codigo: string,
    index: number,
    status: "Armazenado" | "Retirado"
  ) => {
    const cliente = dados.find((x) => x.codigo === codigo);
    const pedido = cliente?.pedidos[index];

    setDados((prev) =>
      prev.map((cliente) =>
        cliente.codigo === codigo
          ? {
              ...cliente,
              pedidos: cliente.pedidos.map((pedido, i) =>
                i === index ? { ...pedido, status } : pedido
              )
            }
          : cliente
      )
    );

    if (pedido) {
      setHistorico((prev) => [
        `${status === "Armazenado" ? "📥" : "📤"} Pedido ${pedido.nome} ${status.toLowerCase()} - ${gerarData()}`,
        ...prev
      ]);
    }
  };

  const salvarEdicao = (codigo: string, index: number) => {
    if (!editando) return;

    setDados((prev) =>
      prev.map((cliente) =>
        cliente.codigo === codigo
          ? {
              ...cliente,
              pedidos: cliente.pedidos.map((pedido, i) =>
                i === index
                  ? {
                      ordem: editando.ordem,
                      nome: editando.nome,
                      formato: editando.formato,
                      cilindro: editando.cilindro,
                      status: editando.status
                    }
                  : pedido
              )
            }
          : cliente
      )
    );

    setHistorico((prev) => [
      `✏️ Pedido ${editando.nome} editado - ${gerarData()}`,
      ...prev
    ]);

    setEditando(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, proximo: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const el = document.querySelector(`[name='${proximo}']`) as HTMLInputElement | null;
      if (el) el.focus();
    }
  };

  const dadosFiltrados = dados
  .map((cliente) => {
    const termo = pesquisa.toLowerCase();

    const codigoBate = cliente.codigo.toLowerCase().includes(termo);

    const pedidosFiltrados = pesquisa
      ? cliente.pedidos.filter((pedido) =>
          pedido.nome.toLowerCase().includes(termo)
        )
      : cliente.pedidos;

    return {
      ...cliente,
      pedidos: codigoBate ? cliente.pedidos : pedidosFiltrados
    };
  })
  .filter((cliente) => cliente.pedidos.length > 0)
  .sort((a, b) => Number(a.codigo) - Number(b.codigo));

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-red-600 text-8xl font-black opacity-10 rotate-[-20deg]">
          by cauanss
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-white p-6 rounded-3xl shadow-xl mb-6">
          <h1
            className="text-center italic font-black uppercase leading-none select-none"
            style={{
              fontSize: "72px",
              color: "#d1d5db",
              textShadow: `
                0 2px 0 #9ca3af,
                0 4px 0 #6b7280,
                0 6px 12px rgba(0,0,0,0.45)
              `,
              fontFamily: "Arial Black"
            }}
          >
            grafaplast
            <span
              style={{
                display: "block",
                fontSize: "30px",
                marginTop: "-8px",
                marginLeft: "215px",
                color: "#d1d5db"
              }}
            >
              Embalagens
            </span>
          </h1>

          <h2 className="text-center text-2xl font-bold mt-2">
            Controle de Pastas
          </h2>

          <div className="flex gap-3 flex-wrap items-center mt-6">
            <button
              onClick={() => setMostrarNova(true)}
              className="bg-black text-white px-5 py-3 rounded-2xl font-bold"
            >
              ➕ Nova Pasta
            </button>

            <button
              onClick={() => setHistoricoAberto(!historicoAberto)}
              className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-bold"
            >
              📜 Histórico
            </button>

            <div className="ml-auto flex gap-5 font-bold">
              <div>📁 Clientes: {dados.length}</div>
              <div>📦 Pastas: {dados.reduce((a, b) => a + b.pedidos.length, 0)}</div>
            </div>
          </div>

          <div className="mt-4">
            <input
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              placeholder="Pesquisar cliente ou pasta..."
              className="border p-3 rounded-2xl w-full"
            />
          </div>

          {historicoAberto && (
            <div className="bg-gray-100 rounded-2xl p-4 mt-4">
              {historico.map((item, i) => (
                <div key={i}>• {item}</div>
              ))}
            </div>
          )}
        </div>

        {mostrarNova && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-3xl w-[420px]">
              <h2 className="text-2xl font-black mb-4">Nova Pasta</h2>

              <div className="flex flex-col gap-3">
                <input
                  name="codigo"
                  placeholder="Código"
                  className="border p-3 rounded-xl"
                  value={nova.codigo}
                  onChange={(e) => setNova({ ...nova, codigo: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, "ordem")}
                />

                <input
                  name="ordem"
                  placeholder="Ordem"
                  className="border p-3 rounded-xl"
                  value={nova.ordem}
                  onChange={(e) => setNova({ ...nova, ordem: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, "nome")}
                />

                <input
                  name="nome"
                  placeholder="Nome"
                  className="border p-3 rounded-xl"
                  value={nova.nome}
                  onChange={(e) => setNova({ ...nova, nome: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e, "formato")}
                />

                <input
                  name="formato"
                  placeholder="Formato"
                  className="border p-3 rounded-xl"
                  value={nova.formato}
                  onChange={(e) =>
                    setNova({ ...nova, formato: e.target.value.split(" ").join("X") })
                  }
                  onKeyDown={(e) => handleKeyDown(e, "cilindro")}
                />

                <input
                  name="cilindro"
                  placeholder="Cilindro"
                  className="border p-3 rounded-xl"
                  value={nova.cilindro}
                  onChange={(e) => setNova({ ...nova, cilindro: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && adicionar()}
                />
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={adicionar}
                  className="bg-black text-white py-3 rounded-2xl font-bold w-full"
                >
                  Adicionar
                </button>

                <button
                  onClick={() => setMostrarNova(false)}
                  className="bg-red-100 text-red-700 py-3 rounded-2xl font-bold w-full"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        )}

        {dadosFiltrados.map((cliente) => (
          <div
            key={cliente.codigo}
            className="bg-white p-5 rounded-3xl shadow-lg mb-4 relative"
          >
            <div className="flex justify-between items-center">
              <button
                onClick={() => setAberto(aberto === cliente.codigo ? null : cliente.codigo)}
                className="font-black text-xl flex items-center gap-2"
              >
                <span>{aberto === cliente.codigo ? "▼" : "▶"}</span>
                📁 {cliente.codigo}
              </button>

              <div className="relative">
                <button onClick={() => setMenu(menu === cliente.codigo ? null : cliente.codigo)}>
                  🗑️
                </button>

                {menu === cliente.codigo && (
                  <div className="absolute right-0 top-10 bg-white border p-3 rounded-2xl shadow-xl">
                    <button
                      onClick={() => excluirPasta(cliente.codigo)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold"
                    >
                      Excluir Pasta
                    </button>
                  </div>
                )}
              </div>
            </div>

            {aberto === cliente.codigo && (
              <div className="mt-5 flex flex-col gap-3">
                {cliente.pedidos.map((pedido, index) => (
                  <div key={index} className="bg-gray-100 rounded-2xl p-4">
                    {editando && editando.codigo === cliente.codigo && editando.index === index ? (
                      <div className="flex flex-col gap-3">
                        <input
                          className="border p-3 rounded-xl"
                          value={editando.ordem}
                          onChange={(e) => setEditando({ ...editando, ordem: e.target.value })}
                        />
                        <input
                          className="border p-3 rounded-xl"
                          value={editando.nome}
                          onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                        />
                        <input
                          className="border p-3 rounded-xl"
                          value={editando.formato}
                          onChange={(e) => setEditando({ ...editando, formato: e.target.value })}
                        />
                        <input
                          className="border p-3 rounded-xl"
                          value={editando.cilindro}
                          onChange={(e) => setEditando({ ...editando, cilindro: e.target.value })}
                        />
                        <button
                          onClick={() => salvarEdicao(cliente.codigo, index)}
                          className="bg-green-500 text-white py-3 rounded-2xl font-bold"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="font-bold text-lg">
                          {pedido.ordem} - {pedido.nome}
                        </div>
                        <div className="mt-2">
                          📐 {pedido.formato} | ⚙️ {pedido.cilindro}
                        </div>
                        <div className="mt-3">
                          <span
                            className={
                              pedido.status === "Armazenado"
                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
                                : "bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold"
                            }
                          >
                            {pedido.status}
                          </span>
                        </div>
                        <div className="flex gap-2 flex-wrap mt-4">
                          <button
                            onClick={() => alterarStatus(cliente.codigo, index, "Armazenado")}
                            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold"
                          >
                            📥 Armazenar
                          </button>
                          <button
                            onClick={() => alterarStatus(cliente.codigo, index, "Retirado")}
                            className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold"
                          >
                            📤 Retirar
                          </button>
                          <button
                            onClick={() => setEditando({ ...pedido, codigo: cliente.codigo, index })}
                            className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-bold"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => excluirPedido(cliente.codigo, index)}
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold"
                          >
                            ❌ Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
 