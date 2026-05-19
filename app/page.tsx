"use client";

import { useEffect, useState } from "react";

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

export default function SistemaPastasPreview() {
  const [aberto, setAberto] = useState<string | null>(null);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [editando, setEditando] = useState<Editando | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [carregado, setCarregado] = useState(false);

  const [historico, setHistorico] = useState<string[]>([
    "Sistema iniciado"
  ]);

  const [nova, setNova] = useState({
    codigo: "",
    ordem: "",
    nome: "",
    formato: "",
    cilindro: ""
  });

  const [dados, setDados] = useState<Cliente[]>([
      }
    ]
  },
  {
    codigo: "461",
    pedidos: [
      {
        ordem: "1°",
        nome: "dia das mães",
        formato: "60X100",
        cilindro: "58",
        status: "Armazenado"
      },
      {
        ordem: "2°",
        nome: "giassi geral",
        formato: "60X100",
        cilindro: "58",
        status: "Armazenado"
      },
      {
        ordem: "3°",
        nome: "giassi açougue 5kg",
        formato: "28X44",
        cilindro: "55",
        status: "Armazenado"
      }
    ]
  },
  {
    codigo: "5250",
    pedidos: [
      {
        ordem: "1°",
        nome: "volt",
        formato: "31X35",
        cilindro: "31,5",
        status: "Armazenado"
      },
      {
        ordem: "2°",
        nome: "diadora",
        formato: "31X35",
        cilindro: "31,5",
        status: "Armazenado"
      }
    ]
  },
  {
    codigo: "1596",
    pedidos: [
      {
        ordem: "1°",
        nome: "moda e cia",
        formato: "50X60",
        cilindro: "60",
        status: "Armazenado"
      },
      {
        ordem: "2°",
        nome: "K e A",
        formato: "50X60",
        cilindro: "60",
        status: "Armazenado"
      },
      {
        ordem: "3°",
        nome: "moda e cia",
        formato: "40X55",
        cilindro: "56",
        status: "Armazenado"
      }
    ]
  }
]);
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("grafaplast-dados");
    const historicoSalvo = localStorage.getItem("grafaplast-historico");

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
      localStorage.setItem(
        "grafaplast-dados",
        JSON.stringify(dados)
      );
    }
  }, [dados, carregado]);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem(
        "grafaplast-historico",
        JSON.stringify(historico)
      );
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
      const existe = prev.find(
        (cliente) => cliente.codigo === nova.codigo
      );

      if (existe) {
        return prev.map((cliente) =>
          cliente.codigo === nova.codigo
            ? {
                ...cliente,
                pedidos: [...cliente.pedidos, pedido]
              }
            : cliente
        );
      }

      return [
        ...prev,
        {
          codigo: nova.codigo,
          pedidos: [pedido]
        }
      ];
    });

    setHistorico((prev) => [
      `📁 Nova pasta criada (${nova.codigo}) - ${gerarData()}`,
      ...prev
    ]);

    setNova({
      codigo: "",
      ordem: "",
      nome: "",
      formato: "",
      cilindro: ""
    });

    setMostrarNova(false);
  };

  const excluirPasta = (codigo: string) => {
    setDados((prev) =>
      prev.filter((cliente) => cliente.codigo !== codigo)
    );

    setHistorico((prev) => [
      `🗑️ Pasta ${codigo} excluída - ${gerarData()}`,
      ...prev
    ]);

    setMenu(null);
  };

  const excluirPedido = (
    codigo: string,
    index: number
  ) => {
    const cliente = dados.find(
      (x) => x.codigo === codigo
    );

    const pedido = cliente?.pedidos[index];

    setDados((prev) =>
      prev.map((cliente) =>
        cliente.codigo === codigo
          ? {
              ...cliente,
              pedidos: cliente.pedidos.filter(
                (_, i) => i !== index
              )
            }
          : cliente
      )
    );

    if (pedido) {
      setHistorico((prev) => [
        `❌ Pedido ${pedido.nome} excluído - ${gerarData()}`,
        ...prev
      ]);
    }
  };

  const alterarStatus = (
    codigo: string,
    index: number,
    status: "Armazenado" | "Retirado"
  ) => {
    const cliente = dados.find(
      (x) => x.codigo === codigo
    );

    const pedido = cliente?.pedidos[index];

    setDados((prev) =>
      prev.map((cliente) =>
        cliente.codigo === codigo
          ? {
              ...cliente,
              pedidos: cliente.pedidos.map((pedido, i) =>
                i === index
                  ? { ...pedido, status }
                  : pedido
              )
            }
          : cliente
      )
    );

    if (pedido) {
      setHistorico((prev) => [
        `${status === "Armazenado" ? "📥" : "📤"} Pedido ${
          pedido.nome
        } ${status.toLowerCase()} - ${gerarData()}`,
        ...prev
      ]);
    }
  };

  const salvarEdicao = (
    codigo: string,
    index: number
  ) => {
    if (!editando) return;

    setDados((prev) =>
      prev.map((cliente) =>
        cliente.codigo === codigo
          ? {
              ...cliente,
              pedidos: cliente.pedidos.map(
                (pedido, i) =>
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    proximo: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const el = document.querySelector(
        `[name='${proximo}']`
      ) as HTMLInputElement | null;

      if (el) {
        el.focus();
      }
    }
  };

  const dadosFiltrados = dados.filter(
    (cliente) =>
      cliente.codigo
        .toLowerCase()
        .includes(pesquisa.toLowerCase()) ||
      cliente.pedidos.some((pedido) =>
        pedido.nome
          .toLowerCase()
          .includes(pesquisa.toLowerCase())
      )
  );

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
                fontSize: "38px",
                marginTop: "-10px",
                marginLeft: "260px",
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
              onClick={() =>
                setHistoricoAberto(!historicoAberto)
              }
              className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-bold"
            >
              📜 Histórico
            </button>

            <div className="ml-auto flex gap-5 font-bold">
              <div>
                📁 Clientes: {dados.length}
              </div>

              <div>
                📦 Pastas:{" "}
                {dados.reduce(
                  (a, b) => a + b.pedidos.length,
                  0
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <input
              value={pesquisa}
              onChange={(e) =>
                setPesquisa(e.target.value)
              }
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
              <h2 className="text-2xl font-black mb-4">
                Nova Pasta
              </h2>

              <div className="flex flex-col gap-3">
                <input
                  name="codigo"
                  placeholder="Código"
                  className="border p-3 rounded-xl"
                  value={nova.codigo}
                  onChange={(e) =>
                    setNova({
                      ...nova,
                      codigo: e.target.value
                    })
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, "ordem")
                  }
                />

                <input
                  name="ordem"
                  placeholder="Ordem"
                  className="border p-3 rounded-xl"
                  value={nova.ordem}
                  onChange={(e) =>
                    setNova({
                      ...nova,
                      ordem: e.target.value
                    })
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, "nome")
                  }
                />

                <input
                  name="nome"
                  placeholder="Nome"
                  className="border p-3 rounded-xl"
                  value={nova.nome}
                  onChange={(e) =>
                    setNova({
                      ...nova,
                      nome: e.target.value
                    })
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, "formato")
                  }
                />

                <input
                  name="formato"
                  placeholder="Formato"
                  className="border p-3 rounded-xl"
                  value={nova.formato}
                  onChange={(e) =>
                    setNova({
                      ...nova,
                      formato: e.target.value
                        .split(" ")
                        .join("X")
                    })
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, "cilindro")
                  }
                />

                <input
                  name="cilindro"
                  placeholder="Cilindro"
                  className="border p-3 rounded-xl"
                  value={nova.cilindro}
                  onChange={(e) =>
                    setNova({
                      ...nova,
                      cilindro: e.target.value
                    })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && adicionar()
                  }
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
                  onClick={() =>
                    setMostrarNova(false)
                  }
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
                onClick={() =>
                  setAberto(
                    aberto === cliente.codigo
                      ? null
                      : cliente.codigo
                  )
                }
                className="font-black text-xl flex items-center gap-2"
              >
                <span>
                  {aberto === cliente.codigo
                    ? "▼"
                    : "▶"}
                </span>

                📁 {cliente.codigo}
              </button>

              <div className="relative">
                <button
                  onClick={() =>
                    setMenu(
                      menu === cliente.codigo
                        ? null
                        : cliente.codigo
                    )
                  }
                >
                  🗑️
                </button>

                {menu === cliente.codigo && (
                  <div className="absolute right-0 top-10 bg-white border p-3 rounded-2xl shadow-xl">
                    <button
                      onClick={() =>
                        excluirPasta(cliente.codigo)
                      }
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
                {cliente.pedidos.map(
                  (pedido, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-2xl p-4"
                    >
                      {editando &&
                      editando.codigo ===
                        cliente.codigo &&
                      editando.index === index ? (
                        <div className="flex flex-col gap-3">
                          <input
                            className="border p-3 rounded-xl"
                            value={editando.ordem}
                            onChange={(e) =>
                              setEditando({
                                ...editando,
                                ordem:
                                  e.target.value
                              })
                            }
                          />

                          <input
                            className="border p-3 rounded-xl"
                            value={editando.nome}
                            onChange={(e) =>
                              setEditando({
                                ...editando,
                                nome:
                                  e.target.value
                              })
                            }
                          />

                          <input
                            className="border p-3 rounded-xl"
                            value={editando.formato}
                            onChange={(e) =>
                              setEditando({
                                ...editando,
                                formato:
                                  e.target.value
                              })
                            }
                          />

                          <input
                            className="border p-3 rounded-xl"
                            value={editando.cilindro}
                            onChange={(e) =>
                              setEditando({
                                ...editando,
                                cilindro:
                                  e.target.value
                              })
                            }
                          />

                          <button
                            onClick={() =>
                              salvarEdicao(
                                cliente.codigo,
                                index
                              )
                            }
                            className="bg-green-500 text-white py-3 rounded-2xl font-bold"
                          >
                            Salvar Alterações
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="font-bold text-lg">
                            {pedido.ordem} -{" "}
                            {pedido.nome}
                          </div>

                          <div className="mt-2">
                            📐 {pedido.formato} |
                            ⚙️ {pedido.cilindro}
                          </div>

                          <div className="mt-3">
                            <span
                              className={
                                pedido.status ===
                                "Armazenado"
                                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
                                  : "bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold"
                              }
                            >
                              {pedido.status}
                            </span>
                          </div>

                          <div className="flex gap-2 flex-wrap mt-4">
                            <button
                              onClick={() =>
                                alterarStatus(
                                  cliente.codigo,
                                  index,
                                  "Armazenado"
                                )
                              }
                              className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold"
                            >
                              📥 Armazenar
                            </button>

                            <button
                              onClick={() =>
                                alterarStatus(
                                  cliente.codigo,
                                  index,
                                  "Retirado"
                                )
                              }
                              className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold"
                            >
                              📤 Retirar
                            </button>

                            <button
                              onClick={() =>
                                setEditando({
                                  ...pedido,
                                  codigo:
                                    cliente.codigo,
                                  index
                                })
                              }
                              className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-bold"
                            >
                              ✏️ Editar
                            </button>

                            <button
                              onClick={() =>
                                excluirPedido(
                                  cliente.codigo,
                                  index
                                )
                              }
                              className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold"
                            >
                              ❌ Excluir
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}