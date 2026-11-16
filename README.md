# Vivi Coiffeur

Site institucional do **Vivi Coiffeur**, salão de beleza em Copacabana, Rio de Janeiro. Apresenta o salão, seus serviços e a história da fundadora, Viviane Fagundes.

Site estático, mobile first, feito com HTML, CSS e JavaScript puros (sem frameworks nem dependências).

## Estrutura

```
vivi-coiffeur/
├── index.html        # Página única com todas as seções
├── css/
│   └── style.css     # Estilos (mobile first, índice no topo do arquivo)
├── js/
│   └── main.js       # Interações (índice no topo do arquivo)
└── images/           # Fotos do site (ver lista abaixo)
```

## Como abrir

Abra o `index.html` no navegador. Não precisa instalar nada.

Para testar no celular ou com recarregamento automático, use a extensão **Live Server** do VS Code.

## Seções

| Nº | Seção | Conteúdo |
|----|-------|----------|
| —  | Início | Nome do salão, chamada e botão de agendamento |
| 01 | Quem é Vivi? | Apresentação da fundadora |
| 02 | O salão | História, serviços, equipe, galeria, endereço, horários e mapa |
| 03 | Trajetória | Linha do tempo em 6 capítulos |
| 04 | Formação | Abas "Técnica em cor" e "Gestão" |
| 05 | Conquistas | Prêmio Star L'Oréal Pro 2026 e mentoria "Cor com Confiança" |
| 06 | O que dizem | Carrossel de avaliações do Google |
| 07 | Contato | WhatsApp, telefone e redes sociais |

## Imagens

Coloque as fotos na pasta `images/` com exatamente estes nomes. Enquanto um arquivo não existir, o site mostra um bloco colorido com o nome esperado.

| Arquivo | Onde aparece | Formato |
|---------|--------------|---------|
| `salao-capa.jpg` | Topo do site | Horizontal 4:3 |
| `vivi-retrato.jpg` | Quem é Vivi? | Vertical 4:5 |
| `equipe.jpg` | O salão / Equipe | Horizontal 16:10 |
| `salao-1.jpg` | Galeria | Horizontal (larga) |
| `salao-2.jpg` a `salao-5.jpg` | Galeria | Quadrada |
| `salao-6.jpg` | Galeria | Horizontal (larga) |
| `vivi-premio.jpg` | Conquistas | Horizontal 16:10 |

Recomendado: 1200px de largura e menos de 300 KB por foto.

## Paleta

Cores extraídas da logo, definidas como variáveis no início do `css/style.css`:

| Variável | Cor |
|----------|-----|
| `--pink-500` | `#e8185f` |
| `--crimson-600` | `#b80f4a` |
| `--crimson-700` | `#9a0a3c` |
| `--wine-800` | `#7a0a2e` |
| `--wine-900` | `#5a0420` |
| `--wine-950` | `#3d0013` |
| `--rose-100` | `#fdeef3` |

Fontes: **DM Serif Display** (títulos) e **Outfit** (texto), via Google Fonts.

## Funcionalidades (js/main.js)

- Menu em tela cheia no celular
- Destaque do link da seção atual no menu
- Animação de entrada das seções ao rolar
- Abas na seção Formação
- Carrossel de depoimentos com indicadores
- Indicador "Aberto agora / Fechado agora" e destaque do dia atual (horário de Brasília)
- Galeria com foto em destaque ao clicar
- Placeholder automático para imagens ausentes

## Como editar

- **Textos:** direto no `index.html`; cada seção está marcada com um comentário.
- **Horários:** altere a lista no `index.html` (seção "Visite") **e** a tabela `HORARIOS` no `js/main.js`.
- **WhatsApp:** procure por `wa.me/552125497085` no `index.html` e troque o número.
- **Cores:** altere as variáveis em `:root` no `css/style.css`.

## Contato do salão

- **Endereço:** R. Barata Ribeiro, 271 — Copacabana, Rio de Janeiro, RJ
- **Telefone / WhatsApp:** (21) 2549-7085
- **Instagram:** [@vivi_coiffeur](https://www.instagram.com/vivi_coiffeur/)
- **Facebook:** [vivicoiffeursalaodebeleza](https://www.facebook.com/vivicoiffeursalaodebeleza/)
