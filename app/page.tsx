"use client";

import { useEffect, useState } from "react";

export default function SistemaPastasPreview() {
  const [aberto, setAberto] = useState(null);
  const [mostrarNova, setMostrarNova] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [menu, setMenu] = useState(null);
  const [editando, setEditando] = useState(null);
  const [pesquisa, setPesquisa] = useState("");

  const [historico, setHistorico] = useState(["Sistema iniciado"]);

  const gerarData = () => {
    return new Date().toLocaleString('pt-BR');
  };

  const [nova, setNova] = useState({
    codigo: "",
    ordem: "",
    nome: "",
    formato: "",
    cilindro: ""
  });

  const [dados, setDados] = useState([
    {
      codigo: "1810",
      pedidos: [
        {
          ordem: "1°",
          nome: "Garra Linha PVC",
          formato: "44X50",
          cilindro: "52",
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
  }, []);

  useEffect(() => {
    localStorage.setItem("grafaplast-dados", JSON.stringify(dados));
  }, [dados]);

  useEffect(() => {
    localStorage.setItem("grafaplast-historico", JSON.stringify(historico));
  }, [historico]);

  const adicionar = () => {
    if (!nova.codigo || !nova.nome) return;

    const pedido = {
      ordem: nova.ordem,
      nome: nova.nome,
      formato: nova.formato,
      cilindro: nova.cilindro,
      status: "Armazenado"
    };

    setDados((prev) => {
      const existe = prev.find((x) => x.codigo === nova.codigo);

      if (existe) {
        return prev.map((item) => {
          if (item.codigo === nova.codigo) {
            return {
              ...item,
              pedidos: [...item.pedidos, pedido]
            };
          }

          return item;
        });
      }

      return [...prev, { codigo: nova.codigo, pedidos: [pedido] }];
    });

    setHistorico((prev) => [`📁 Nova pasta criada (${nova.codigo}) - ${gerarData()}`, ...prev]);

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
    setDados((prev) => prev.filter((x) => x.codigo !== codigo));
    setHistorico((prev) => [`🗑️ Pasta ${codigo} excluída - ${gerarData()}`, ...prev]);
    setMenu(null);
  };

  const excluirPedido = (codigo: string, index: number) => {
    const cliente = dados.find((x) => x.codigo === codigo);
    const pedido = cliente?.pedidos[index];
    setDados((prev) =>
      prev.map((cliente) => {
        if (cliente.codigo !== codigo) return cliente;

        return {
          ...cliente,
          pedidos: cliente.pedidos.filter((_, i) => i !== index)
        };
      })
    );

    if (pedido) {
      setHistorico((prev) => [
        `❌ Pedido ${pedido.nome} excluído da pasta ${codigo} - ${gerarData()}`,
        ...prev
      ]);
    }
  };

  const alterarStatus = (codigo, index, status) => {
    const cliente = dados.find((x) => x.codigo === codigo);
    const pedido = cliente?.pedidos[index];
    setDados((prev) =>
      prev.map((cliente) => {
        if (cliente.codigo !== codigo) return cliente;

        return {
          ...cliente,
          pedidos: cliente.pedidos.map((pedido, i) =>
            i === index ? { ...pedido, status } : pedido
          )
        };
      })
    );

    if (pedido) {
      setHistorico((prev) => [
        `${status === 'Armazenado' ? '📥' : '📤'} Pedido ${pedido.nome} ${status.toLowerCase()} - ${gerarData()}`,
        ...prev
      ]);
    }
  };

  const salvarEdicao = (codigo, index) => {
    setDados((prev) =>
      prev.map((cliente) => {
        if (cliente.codigo !== codigo) return cliente;

        return {
          ...cliente,
          pedidos: cliente.pedidos.map((pedido, i) =>
            i === index ? editando : pedido
          )
        };
      })
    );

    setEditando(null);
  };

  const handleKeyDown = (e, proximo) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const el = document.querySelector(`[name='${proximo}']`);
      if (el) el.focus();
    }
  };

  const dadosFiltrados = dados.filter((cliente) =>
    cliente.codigo.toLowerCase().includes(pesquisa.toLowerCase()) ||
    cliente.pedidos.some((pedido) =>
      pedido.nome.toLowerCase().includes(pesquisa.toLowerCase())
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
          <h1 className="text-center text-5xl font-black text-red-600">
            GRAFAPLAST
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
              <div>
                📦 Pastas: {dados.reduce((a, b) => a + b.pedidos.length, 0)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
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
                <input name="codigo" placeholder="Código" className="border p-3 rounded-xl" value={nova.codigo} onChange={(e) => setNova({ ...nova, codigo: e.target.value })} onKeyDown={(e) => handleKeyDown(e, 'ordem')} />

                <input name="ordem" placeholder="Ordem" className="border p-3 rounded-xl" value={nova.ordem} onChange={(e) => setNova({ ...nova, ordem: e.target.value })} onKeyDown={(e) => handleKeyDown(e, 'nome')} />

                <input name="nome" placeholder="Nome" className="border p-3 rounded-xl" value={nova.nome} onChange={(e) => setNova({ ...nova, nome: e.target.value })} onKeyDown={(e) => handleKeyDown(e, 'formato')} />

                <input name="formato" placeholder="Formato" className="border p-3 rounded-xl" value={nova.formato} onChange={(e) => setNova({ ...nova, formato: e.target.value.split(" ").join("X") })} onKeyDown={(e) => handleKeyDown(e, 'cilindro')} />

                <input name="cilindro" placeholder="Cilindro" className="border p-3 rounded-xl" value={nova.cilindro} onChange={(e) => setNova({ ...nova, cilindro: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && adicionar()} />
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={adicionar} className="bg-black text-white py-3 rounded-2xl font-bold w-full">
                  Adicionar
                </button>

                <button onClick={() => setMostrarNova(false)} className="bg-red-100 text-red-700 py-3 rounded-2xl font-bold w-full">
                  Voltar
                </button>
              </div>
            </div>
          </div>
        )}

        {dadosFiltrados.map((cliente) => (
          <div key={cliente.codigo} className="bg-white p-5 rounded-3xl shadow-lg mb-4 relative">
            <div className="flex justify-between items-center">
              <button onClick={() => setAberto(aberto === cliente.codigo ? null : cliente.codigo)} className="font-black text-xl flex items-center gap-2">
                <span>{aberto === cliente.codigo ? "▼" : "▶"}</span>
                📁 {cliente.codigo}
              </button>

              <div className="relative">
                <button onClick={() => setMenu(menu === cliente.codigo ? null : cliente.codigo)}>
                  🗑️
                </button>

                {menu === cliente.codigo && (
                  <div className="absolute right-0 top-10 bg-white border p-3 rounded-2xl shadow-xl">
                    <button onClick={() => excluirPasta(cliente.codigo)} className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold">
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

