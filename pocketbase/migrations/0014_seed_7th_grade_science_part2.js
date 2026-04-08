migrate(
  (app) => {
    const data = [
      {
        id: 51,
        tema: 'Máquinas Térmicas',
        pergunta:
          'As máquinas térmicas revolucionaram o mundo durante a Revolução Industrial. O que uma máquina térmica faz?',
        alternativas: [
          'Transforma energia elétrica em energia luminosa.',
          'Transforma energia térmica (calor) em energia mecânica (movimento).',
          'Transforma energia mecânica em frio.',
          'Transforma água em ouro.',
        ],
        resposta_correta: 'Transforma energia térmica (calor) em energia mecânica (movimento).',
        explicacao:
          'Uma máquina térmica (como o motor de um carro ou uma locomotiva) usa o calor gerado pela queima de combustível para produzir movimento (energia mecânica).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 52,
        tema: 'Combustíveis',
        pergunta:
          'Qual foi a principal fonte de combustível (queimado para gerar calor) nas primeiras máquinas a vapor e locomotivas?',
        alternativas: ['Gasolina.', 'Urânio.', 'Carvão mineral.', 'Energia solar.'],
        resposta_correta: 'Carvão mineral.',
        explicacao:
          'O carvão mineral foi o grande combustível da Revolução Industrial, queimado em caldeiras para ferver água e gerar vapor sob pressão.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 53,
        tema: 'Motores de Combustão',
        pergunta:
          "Os motores dos carros modernos são chamados de 'motores de combustão interna'. Por que eles recebem esse nome?",
        alternativas: [
          'Porque a queima do combustível ocorre do lado de fora do motor.',
          'Porque a queima do combustível (explosão) ocorre dentro dos cilindros do próprio motor.',
          'Porque eles não usam combustível.',
          'Porque eles funcionam a base de gelo interno.',
        ],
        resposta_correta:
          'Porque a queima do combustível (explosão) ocorre dentro dos cilindros do próprio motor.',
        explicacao:
          'Nos motores de carros, a mistura de ar e combustível é injetada e explode (queima) diretamente dentro dos cilindros do motor, empurrando os pistões.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 54,
        tema: 'Impactos Ambientais',
        pergunta:
          'Qual é o principal impacto ambiental negativo causado pelo uso excessivo de máquinas térmicas movidas a combustíveis fósseis (gasolina, diesel, carvão)?',
        alternativas: [
          'Aumento da quantidade de peixes nos rios.',
          'Resfriamento global.',
          'Emissão de gases poluentes que intensificam o efeito estufa e pioram a qualidade do ar.',
          'Aumento da camada de ozônio.',
        ],
        resposta_correta:
          'Emissão de gases poluentes que intensificam o efeito estufa e pioram a qualidade do ar.',
        explicacao:
          'A queima de combustíveis fósseis libera muito CO2 (intensificando o aquecimento global) e gases tóxicos que causam poluição do ar.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 55,
        tema: 'Máquinas Elétricas',
        pergunta:
          'Diferente das máquinas térmicas, as máquinas elétricas funcionam à base de eletricidade. Um ventilador e um liquidificador possuem um componente que transforma energia elétrica em movimento. Qual é esse componente?',
        alternativas: ['Gerador elétrico.', 'Bateria.', 'Motor elétrico.', 'Painel solar.'],
        resposta_correta: 'Motor elétrico.',
        explicacao:
          'O motor elétrico usa princípios do eletromagnetismo para transformar a energia elétrica da tomada ou bateria em energia mecânica (giro das pás).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 56,
        tema: 'Geração de Energia',
        pergunta:
          'Uma usina hidrelétrica faz o processo inverso do motor: ela usa a força da água (movimento) para girar turbinas e produzir eletricidade. Como se chama a máquina que transforma energia mecânica em energia elétrica?',
        alternativas: ['Gerador elétrico.', 'Motor elétrico.', 'Bússola.', 'Lâmpada.'],
        resposta_correta: 'Gerador elétrico.',
        explicacao:
          'O gerador elétrico faz o inverso do motor: ele usa o movimento (da água, do vento) para girar ímãs e bobinas, gerando corrente elétrica.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 57,
        tema: 'Veículos Elétricos',
        pergunta:
          'Qual é uma grande vantagem ambiental dos carros com motores 100% elétricos em comparação aos carros a combustão?',
        alternativas: [
          'Eles são mais barulhentos.',
          'Eles emitem fumaça colorida.',
          'Eles não emitem gases poluentes pelo escapamento durante o uso nas cidades.',
          'Eles usam gasolina mais barata.',
        ],
        resposta_correta:
          'Eles não emitem gases poluentes pelo escapamento durante o uso nas cidades.',
        explicacao:
          'Carros elétricos não queimam combustível, portanto não possuem escapamento e não emitem gases poluentes no local onde circulam.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 58,
        tema: 'Tecnologia',
        pergunta: "O que é a 'tecnologia' no contexto das Ciências?",
        alternativas: [
          'Apenas o uso de computadores e celulares.',
          'O conjunto de conhecimentos, ferramentas, máquinas e técnicas criadas para resolver problemas e facilitar a vida humana.',
          'O estudo exclusivo das plantas.',
          'A criação de obras de arte.',
        ],
        resposta_correta:
          'O conjunto de conhecimentos, ferramentas, máquinas e técnicas criadas para resolver problemas e facilitar a vida humana.',
        explicacao:
          'Tecnologia não é só eletrônica. É toda aplicação prática do conhecimento científico para criar ferramentas (desde a roda até o computador) que resolvem problemas.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 59,
        tema: 'Tecnologia na Saúde',
        pergunta:
          'A tecnologia na área da saúde trouxe avanços incríveis, como os exoesqueletos robóticos. Qual é a principal função de um exoesqueleto robótico para uso médico?',
        alternativas: [
          'Fazer cirurgias sozinho.',
          'Auxiliar pessoas com paralisia ou dificuldades motoras a ficarem de pé e caminharem.',
          'Substituir os médicos nos hospitais.',
          'Voar para resgatar pacientes.',
        ],
        resposta_correta:
          'Auxiliar pessoas com paralisia ou dificuldades motoras a ficarem de pé e caminharem.',
        explicacao:
          'Exoesqueletos são estruturas robóticas vestidas pelo paciente que leem sinais nervosos ou usam motores para ajudar na reabilitação e locomoção.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 60,
        tema: 'Automação',
        pergunta:
          'A automação industrial substituiu grande parte do trabalho manual por robôs e máquinas inteligentes. Qual é uma possível consequência social negativa da automação rápida?',
        alternativas: [
          'Aumento da segurança nas fábricas.',
          'Produção mais rápida de mercadorias.',
          'Perda de postos de trabalho para pessoas que realizavam tarefas repetitivas.',
          'Redução do preço dos produtos.',
        ],
        resposta_correta:
          'Perda de postos de trabalho para pessoas que realizavam tarefas repetitivas.',
        explicacao:
          'A substituição do trabalho humano por máquinas e inteligência artificial pode gerar desemprego estrutural se os trabalhadores não forem requalificados.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 61,
        tema: 'Lixo Eletrônico',
        pergunta:
          'O desenvolvimento tecnológico acelerado gera um problema ambiental grave relacionado ao descarte de celulares, computadores e baterias velhas. Como chamamos esse tipo de resíduo?',
        alternativas: [
          'Lixo orgânico.',
          'Lixo hospitalar.',
          'Lixo eletrônico (e-waste).',
          'Lixo radioativo.',
        ],
        resposta_correta: 'Lixo eletrônico (e-waste).',
        explicacao:
          'O e-waste (lixo eletrônico) engloba todos os aparelhos eletrônicos descartados, como celulares, TVs, baterias e computadores.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 62,
        tema: 'Lixo Eletrônico',
        pergunta: 'Por que o lixo eletrônico não deve ser jogado no lixo comum?',
        alternativas: [
          'Porque ele cheira mal.',
          'Porque ele contém metais pesados e substâncias tóxicas (como chumbo e mercúrio) que contaminam o solo e a água.',
          'Porque ele ocupa pouco espaço.',
          'Porque ele se decompõe em 2 dias.',
        ],
        resposta_correta:
          'Porque ele contém metais pesados e substâncias tóxicas (como chumbo e mercúrio) que contaminam o solo e a água.',
        explicacao:
          'O lixo eletrônico contém metais pesados (chumbo, mercúrio, cádmio) que são altamente tóxicos. Se jogados em lixões, contaminam o solo e os lençóis freáticos.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 63,
        tema: 'Consumo e Tecnologia',
        pergunta: "O que significa o termo 'obsolescência programada'?",
        alternativas: [
          'É quando um produto dura para sempre.',
          'É a estratégia de fabricar produtos para que quebrem, parem de funcionar ou fiquem ultrapassados rapidamente, forçando o consumidor a comprar um novo.',
          'É um programa de computador para reciclar lixo.',
          'É o estudo dos fósseis antigos.',
        ],
        resposta_correta:
          'É a estratégia de fabricar produtos para que quebrem, parem de funcionar ou fiquem ultrapassados rapidamente, forçando o consumidor a comprar um novo.',
        explicacao:
          'A obsolescência programada é uma tática da indústria para reduzir a vida útil dos produtos, obrigando o consumidor a comprar modelos novos constantemente.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 64,
        tema: 'Tecnologia Sustentável',
        pergunta:
          'Para garantir que o desenvolvimento tecnológico não destrua o planeta, a ciência busca criar soluções sustentáveis. Qual das alternativas é um exemplo de tecnologia sustentável?',
        alternativas: [
          'Motores a diesel mais potentes.',
          'Painéis de energia solar e turbinas eólicas.',
          'Desmatamento automatizado.',
          'Plásticos que não se decompõem nunca.',
        ],
        resposta_correta: 'Painéis de energia solar e turbinas eólicas.',
        explicacao:
          'Tecnologias sustentáveis buscam gerar energia ou produtos sem esgotar os recursos da natureza e sem poluir, como a energia solar e eólica.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 65,
        tema: 'Tecnologia Assistiva',
        pergunta:
          'As Tecnologias Assistivas são criadas para promover a inclusão. Qual das opções abaixo é um exemplo de tecnologia assistiva?',
        alternativas: [
          'Um videogame de última geração.',
          'Um software leitor de tela para pessoas com deficiência visual.',
          'Um carro esportivo de luxo.',
          'Uma televisão 8K.',
        ],
        resposta_correta: 'Um software leitor de tela para pessoas com deficiência visual.',
        explicacao:
          'Tecnologias assistivas são recursos e serviços que proporcionam independência e inclusão para pessoas com deficiência (ex: leitores de tela, próteses).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 66,
        tema: 'Crosta Terrestre',
        pergunta:
          'A crosta terrestre é dividida em duas partes principais: a crosta continental e a crosta oceânica. Qual delas é geralmente mais espessa?',
        alternativas: [
          'A crosta oceânica.',
          'A crosta continental.',
          'Ambas têm a mesma espessura.',
          'Nenhuma das duas.',
        ],
        resposta_correta: 'A crosta continental.',
        explicacao:
          'A crosta continental (onde estão os continentes e montanhas) é muito mais espessa (pode chegar a 70 km) do que a crosta oceânica (cerca de 5 a 10 km).',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 67,
        tema: 'Terremotos',
        pergunta:
          'O ponto no interior da Terra onde um terremoto realmente se origina é chamado de hipocentro. Como é chamado o ponto na superfície da Terra exatamente acima do hipocentro, onde o tremor é sentido com mais força?',
        alternativas: ['Epicentro.', 'Falha geológica.', 'Cratera.', 'Manto.'],
        resposta_correta: 'Epicentro.',
        explicacao:
          'O epicentro é o ponto na superfície terrestre diretamente acima do hipocentro (foco subterrâneo). É onde o tremor atinge a superfície primeiro e com mais força.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 68,
        tema: 'Medição de Terremotos',
        pergunta: 'A Escala Richter é famosa mundialmente. Para que ela serve?',
        alternativas: [
          'Para medir a temperatura da lava.',
          'Para medir a quantidade de chuva em um furacão.',
          'Para medir a magnitude (energia liberada) de um terremoto.',
          'Para medir a velocidade do vento.',
        ],
        resposta_correta: 'Para medir a magnitude (energia liberada) de um terremoto.',
        explicacao:
          'A Escala Richter é uma escala logarítmica usada para calcular a magnitude de um sismo, ou seja, a quantidade de energia sísmica liberada.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 69,
        tema: 'Vulcões',
        pergunta:
          'Alguns vulcões passam milhares de anos sem entrar em erupção, mas ainda podem acordar. Como eles são classificados?',
        alternativas: [
          'Vulcões ativos.',
          'Vulcões extintos.',
          'Vulcões adormecidos.',
          'Vulcões de gelo.',
        ],
        resposta_correta: 'Vulcões adormecidos.',
        explicacao:
          'Vulcões adormecidos não entram em erupção há muito tempo, mas ainda possuem uma câmara magmática ativa.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 70,
        tema: 'Vulcões',
        pergunta: 'O que é o magma depois que ele atinge a superfície da Terra e perde seus gases?',
        alternativas: ['Lava.', 'Pedra-pomes.', 'Cinza vulcânica.', 'Cristal.'],
        resposta_correta: 'Lava.',
        explicacao:
          'Quando o magma (rocha derretida) chega à superfície através de um vulcão e perde seus gases, ele passa a ser chamado de lava.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 71,
        tema: 'Tsunamis',
        pergunta: 'Tsunamis são ondas gigantes frequentemente causadas por qual fenômeno?',
        alternativas: [
          'Terremotos no fundo do oceano (maremotos).',
          'Ventos muito fortes (furacões).',
          'Mudanças na Lua.',
          'Derretimento de geleiras.',
        ],
        resposta_correta: 'Terremotos no fundo do oceano (maremotos).',
        explicacao:
          'Terremotos no fundo do oceano movem bruscamente a crosta, deslocando uma enorme quantidade de água que forma a onda gigante (tsunami).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 72,
        tema: 'Pressão Atmosférica',
        pergunta:
          'O ar atmosférico exerce pressão sobre todos os corpos mergulhados nele. Como chamamos essa pressão?',
        alternativas: [
          'Pressão arterial.',
          'Pressão atmosférica.',
          'Pressão hidrostática.',
          'Pressão sonora.',
        ],
        resposta_correta: 'Pressão atmosférica.',
        explicacao:
          'A força exercida pelo peso da coluna de ar atmosférico sobre a superfície da Terra é chamada de pressão atmosférica.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 73,
        tema: 'Pressão Atmosférica',
        pergunta:
          'O que acontece com a pressão atmosférica à medida que subimos uma montanha (aumentamos a altitude)?',
        alternativas: ['Aumenta.', 'Diminui.', 'Permanece igual.', 'Torna-se negativa.'],
        resposta_correta: 'Diminui.',
        explicacao:
          'Quanto maior a altitude, menor é a coluna de ar acima de nós e, consequentemente, menor é a pressão atmosférica e o ar se torna mais rarefeito.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 74,
        tema: 'Pressão Atmosférica',
        pergunta: 'Qual é o nome do instrumento usado para medir a pressão atmosférica?',
        alternativas: ['Termômetro.', 'Barômetro.', 'Anemômetro.', 'Higrômetro.'],
        resposta_correta: 'Barômetro.',
        explicacao:
          'O barômetro foi inventado por Torricelli e é o instrumento utilizado para medir a pressão atmosférica local.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 75,
        tema: 'Propriedades do Ar',
        pergunta:
          'O ar pode ser comprimido em um espaço menor, como dentro de um pneu. Essa propriedade é a:',
        alternativas: ['Expansibilidade.', 'Compressibilidade.', 'Elasticidade.', 'Viscosidade.'],
        resposta_correta: 'Compressibilidade.',
        explicacao:
          'A compressibilidade é a propriedade que o ar (e os gases em geral) tem de diminuir de volume quando submetido a uma pressão.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 76,
        tema: 'Propriedades do Ar',
        pergunta:
          'Se você abrir o bico do pneu, o ar que estava comprimido volta a ocupar um volume maior. Como chamamos essa propriedade?',
        alternativas: ['Inércia.', 'Compressibilidade.', 'Elasticidade.', 'Gravidade.'],
        resposta_correta: 'Elasticidade.',
        explicacao:
          'A elasticidade é a propriedade do ar de voltar ao seu volume inicial quando cessa a força que o estava comprimindo.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 77,
        tema: 'Composição do Ar',
        pergunta: 'Qual é o gás mais abundante na atmosfera terrestre?',
        alternativas: ['Oxigênio.', 'Gás carbônico.', 'Nitrogênio.', 'Hidrogênio.'],
        resposta_correta: 'Nitrogênio.',
        explicacao:
          'O gás nitrogênio compõe cerca de 78% do ar atmosférico, sendo o mais abundante, seguido pelo oxigênio com 21%.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 78,
        tema: 'Aquecimento Global',
        pergunta:
          'O aumento excessivo da concentração de gases de efeito estufa na atmosfera causa:',
        alternativas: [
          'O resfriamento global.',
          'O aquecimento global.',
          'A redução da camada de ozônio.',
          'As chuvas ácidas.',
        ],
        resposta_correta: 'O aquecimento global.',
        explicacao:
          'A retenção exagerada de calor pelos gases de efeito estufa eleva a temperatura média da Terra, resultando no aquecimento global.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 79,
        tema: 'Camada de Ozônio',
        pergunta: 'A camada de ozônio é essencial para a vida na Terra porque ela:',
        alternativas: [
          'Absorve a maior parte dos raios ultravioleta (UV) nocivos emitidos pelo Sol.',
          'Fornece oxigênio para a respiração.',
          'Impede a queda de meteoros.',
          'Regula as marés.',
        ],
        resposta_correta:
          'Absorve a maior parte dos raios ultravioleta (UV) nocivos emitidos pelo Sol.',
        explicacao:
          'A camada de ozônio funciona como um filtro natural, protegendo os seres vivos contra a radiação UV em excesso.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 80,
        tema: 'Efeito Estufa',
        pergunta: 'O efeito estufa é sempre algo prejudicial para o planeta Terra?',
        alternativas: [
          'Sim, ele apenas destrói a natureza.',
          'Não, o efeito estufa natural é essencial para manter o planeta aquecido e possibilitar a vida.',
          'Sim, é o causador do buraco na camada de ozônio.',
          'Não, ele serve para esfriar o planeta.',
        ],
        resposta_correta:
          'Não, o efeito estufa natural é essencial para manter o planeta aquecido e possibilitar a vida.',
        explicacao:
          'Sem o efeito estufa natural, a Terra seria congelante (cerca de -18°C). O problema atual é a intensificação desse efeito pela ação humana.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 81,
        tema: 'Força e Movimento',
        pergunta:
          'Na Física, uma interação capaz de alterar o estado de movimento ou de repouso de um corpo, ou deformá-lo, é chamada de:',
        alternativas: ['Inércia.', 'Aceleração.', 'Massa.', 'Força.'],
        resposta_correta: 'Força.',
        explicacao:
          'Força é toda ação capaz de modificar a velocidade de um objeto, tirá-lo do repouso ou causar sua deformação.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 82,
        tema: 'Leis de Newton',
        pergunta:
          'Qual lei de Newton afirma que um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a continuar em movimento retilíneo uniforme, a menos que uma força atue sobre ele?',
        alternativas: [
          'Primeira Lei de Newton (Inércia).',
          'Segunda Lei de Newton (Princípio Fundamental da Dinâmica).',
          'Terceira Lei de Newton (Ação e Reação).',
          'Lei da Gravitação Universal.',
        ],
        resposta_correta: 'Primeira Lei de Newton (Inércia).',
        explicacao:
          'A Primeira Lei de Newton descreve a inércia, a tendência natural dos objetos de resistirem a mudanças no seu estado de movimento.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 83,
        tema: 'Leis de Newton',
        pergunta:
          'Ao frear um ônibus bruscamente, os passageiros são jogados para frente. Isso é uma demonstração prática de qual conceito da Física?',
        alternativas: ['Força de atrito.', 'Inércia.', 'Ação e reação.', 'Força elástica.'],
        resposta_correta: 'Inércia.',
        explicacao:
          'Por inércia, o corpo dos passageiros tende a manter o movimento que tinha junto com o ônibus antes da frenagem.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 84,
        tema: 'Leis de Newton',
        pergunta: 'A Terceira Lei de Newton é popularmente conhecida como a lei da:',
        alternativas: ['Inércia.', 'Ação e Reação.', 'Aceleração.', 'Gravidade.'],
        resposta_correta: 'Ação e Reação.',
        explicacao:
          'A Terceira Lei de Newton afirma que para toda força de ação existe uma força de reação de mesma intensidade e direção, mas em sentido oposto.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 85,
        tema: 'Leis de Newton',
        pergunta:
          'Quando você empurra a parede (ação), a parede também empurra você (reação). Por que a parede não se move?',
        alternativas: [
          'Porque as forças se anulam.',
          'Porque a massa da parede (e do chão ao qual está presa) é muito grande, então sua aceleração é praticamente zero.',
          'Porque a força da parede é maior que a sua.',
          'Porque não existe atrito.',
        ],
        resposta_correta:
          'Porque a massa da parede (e do chão ao qual está presa) é muito grande, então sua aceleração é praticamente zero.',
        explicacao:
          'A força de reação é igual à de ação, mas como a parede possui enorme massa e está fixada na estrutura do prédio, ela não sofre aceleração perceptível.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 86,
        tema: 'Atrito',
        pergunta:
          'A força que sempre atua contra o deslizamento de um objeto sobre uma superfície, fazendo-o parar eventualmente, é a força de:',
        alternativas: ['Gravidade.', 'Atrito.', 'Empuxo.', 'Tensão.'],
        resposta_correta: 'Atrito.',
        explicacao:
          'O atrito surge do contato entre as superfícies e sempre se opõe ao movimento ou à tendência de movimento relativo entre elas.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 87,
        tema: 'Gravidade',
        pergunta: 'O que faz uma maçã cair no chão e mantém a Lua orbitando a Terra?',
        alternativas: [
          'Força magnética.',
          'Força gravitacional.',
          'Força elástica.',
          'Atrito do ar.',
        ],
        resposta_correta: 'Força gravitacional.',
        explicacao:
          'A gravidade é a força de atração mútua que existe entre todos os corpos com massa, como a maçã e a Terra, ou a Lua e a Terra.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 88,
        tema: 'Massa e Peso',
        pergunta: 'Existe diferença entre massa e peso?',
        alternativas: [
          'Não, são exatamente a mesma coisa.',
          'Sim. A massa é a quantidade de matéria de um corpo (medida em kg), e o peso é a força com que a gravidade puxa essa massa.',
          'Sim. O peso mede a quantidade de matéria, e a massa mede a gravidade.',
          'Não, ambos são medidos apenas em Newtons.',
        ],
        resposta_correta:
          'Sim. A massa é a quantidade de matéria de um corpo (medida em kg), e o peso é a força com que a gravidade puxa essa massa.',
        explicacao:
          'Massa é constante e medida em kg. Peso depende da gravidade local (Peso = massa x gravidade) e é uma força, medida em Newtons.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 89,
        tema: 'Massa e Peso',
        pergunta:
          'Se um astronauta viaja da Terra para a Lua (onde a gravidade é 6 vezes menor), o que acontece com a massa e o peso dele?',
        alternativas: [
          'Ambos diminuem.',
          'Ambos ficam iguais.',
          'O peso diminui, mas a massa continua a mesma.',
          'A massa diminui, mas o peso continua o mesmo.',
        ],
        resposta_correta: 'O peso diminui, mas a massa continua a mesma.',
        explicacao:
          'A massa (quantidade de matéria) não muda. O peso diminui porque a aceleração da gravidade na Lua é menor.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 90,
        tema: 'Calor e Temperatura',
        pergunta: 'O que é temperatura na Física?',
        alternativas: [
          'É a quantidade de calor de um corpo.',
          'É a medida do grau de agitação (energia cinética) das partículas de um corpo.',
          'É a energia térmica em trânsito.',
          'É apenas a sensação de frio.',
        ],
        resposta_correta:
          'É a medida do grau de agitação (energia cinética) das partículas de um corpo.',
        explicacao:
          'Temperatura mede a energia cinética média das moléculas. Quanto mais agitadas as moléculas, maior a temperatura.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 91,
        tema: 'Calor e Temperatura',
        pergunta: 'E o que é o calor?',
        alternativas: [
          'É a mesma coisa que temperatura alta.',
          'É a energia térmica em trânsito de um corpo mais quente para um corpo mais frio.',
          'É o ar do verão.',
          'É a energia que resfria os corpos.',
        ],
        resposta_correta:
          'É a energia térmica em trânsito de um corpo mais quente para um corpo mais frio.',
        explicacao:
          'Calor é transferência de energia. Ele só existe quando há diferença de temperatura entre dois corpos, fluindo do mais quente para o mais frio.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 92,
        tema: 'Equilíbrio Térmico',
        pergunta:
          'Quando você coloca gelo em um copo de água quente, a água esfria e o gelo derrete até ambos ficarem na mesma temperatura. Esse estado final é chamado de:',
        alternativas: [
          'Fusão total.',
          'Solidificação.',
          'Equilíbrio térmico.',
          'Evaporação térmica.',
        ],
        resposta_correta: 'Equilíbrio térmico.',
        explicacao:
          'O equilíbrio térmico é alcançado quando dois corpos ou substâncias em contato trocam calor até igualarem suas temperaturas.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 93,
        tema: 'Propagação do Calor',
        pergunta:
          'Quando você segura uma colher de metal e mergulha a outra ponta em sopa quente, logo sua mão se queima. Como o calor se propagou pela colher?',
        alternativas: ['Por condução.', 'Por convecção.', 'Por irradiação.', 'Por indução.'],
        resposta_correta: 'Por condução.',
        explicacao:
          'A condução é a propagação de calor típica dos sólidos, onde a energia é transferida de partícula para partícula (agitação).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 94,
        tema: 'Propagação do Calor',
        pergunta:
          'O ar quente sobe e o ar frio desce, criando correntes que aquecem ou resfriam o ambiente. Como é chamado esse tipo de propagação de calor (típica de fluidos)?',
        alternativas: ['Condução.', 'Convecção.', 'Irradiação.', 'Radiação.'],
        resposta_correta: 'Convecção.',
        explicacao:
          'A convecção ocorre em líquidos e gases, envolvendo o movimento da própria matéria (as correntes de convecção) devido à diferença de densidade.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 95,
        tema: 'Propagação do Calor',
        pergunta: 'Como o calor do Sol chega até a Terra, viajando pelo vácuo do espaço?',
        alternativas: [
          'Por condução espacial.',
          'Por convecção solar.',
          'Por irradiação (radiação térmica).',
          'Por ventos solares de calor.',
        ],
        resposta_correta: 'Por irradiação (radiação térmica).',
        explicacao:
          'A irradiação é a única forma de propagação de calor que ocorre no vácuo, feita através de ondas eletromagnéticas (como a luz e o infravermelho).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 96,
        tema: 'Máquinas Simples',
        pergunta:
          'A roda, a polia e a alavanca são invenções antigas que ajudam a multiplicar a força ou facilitar uma tarefa. Elas são chamadas de:',
        alternativas: [
          'Máquinas complexas.',
          'Máquinas térmicas.',
          'Máquinas elétricas.',
          'Máquinas simples.',
        ],
        resposta_correta: 'Máquinas simples.',
        explicacao:
          'Máquinas simples são dispositivos fundamentais (como plano inclinado, alavanca e roda) que alteram a direção ou magnitude de uma força para facilitar o trabalho.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 97,
        tema: 'Máquinas Simples',
        pergunta: 'Uma gangorra de parquinho é um exemplo prático de qual máquina simples?',
        alternativas: ['Polia.', 'Plano inclinado.', 'Alavanca.', 'Engrenagem.'],
        resposta_correta: 'Alavanca.',
        explicacao:
          'A gangorra é uma alavanca interfixa, onde o ponto de apoio fica entre a força potente (uma pessoa) e a força resistente (outra pessoa).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 98,
        tema: 'Saúde e Tecnologia',
        pergunta:
          'Vacinas são uma das maiores conquistas tecnológicas da medicina. Qual é a principal função de uma vacina?',
        alternativas: [
          'Curar a doença depois que você já pegou.',
          'Estimular o sistema imunológico a produzir anticorpos antes da infecção real, prevenindo a doença.',
          'Matar vírus que estão na pele.',
          'Agir como um antibiótico imediato.',
        ],
        resposta_correta:
          'Estimular o sistema imunológico a produzir anticorpos antes da infecção real, prevenindo a doença.',
        explicacao:
          "As vacinas possuem antígenos atenuados ou inativos que 'treinam' a memória do sistema imune para evitar futuras infecções graves.",
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 99,
        tema: 'Saúde e Tecnologia',
        pergunta:
          'Os antibióticos são medicamentos poderosos usados exclusivamente para combater qual tipo de agente causador de doenças?',
        alternativas: ['Vírus.', 'Bactérias.', 'Fungos.', 'Príons.'],
        resposta_correta: 'Bactérias.',
        explicacao:
          'Antibióticos não funcionam contra vírus (como o da gripe); eles são desenvolvidos para matar ou inibir o crescimento de bactérias (como as que causam pneumonia bacteriana).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 100,
        tema: 'Ondas e Som',
        pergunta:
          'O som é uma onda mecânica. Isso significa que ele precisa de um meio material (como o ar, a água ou um sólido) para se propagar. Sendo assim, o som pode se propagar no vácuo do espaço?',
        alternativas: [
          'Sim, igual nos filmes de ficção científica.',
          'Não, porque no vácuo não há matéria para vibrar e transmitir o som.',
          'Sim, mas ele viaja mais devagar.',
          'Apenas o som grave viaja no vácuo.',
        ],
        resposta_correta: 'Não, porque no vácuo não há matéria para vibrar e transmitir o som.',
        explicacao:
          'Diferente da luz (onda eletromagnética), o som é uma onda mecânica e precisa de moléculas (ar, água, metais) vibrando para se deslocar. No vácuo, há silêncio absoluto.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
    ]

    const col = app.findCollectionByNameOrId('questions')

    for (const q of data) {
      try {
        app.findFirstRecordByData('questions', 'external_id', q.id)
        // Already exists, skip
      } catch (_) {
        const record = new Record(col)
        record.set('statement', q.pergunta)
        record.set('option_a', q.alternativas[0])
        record.set('option_b', q.alternativas[1])
        record.set('option_c', q.alternativas[2])
        record.set('option_d', q.alternativas[3])

        const idx = q.alternativas.indexOf(q.resposta_correta)
        const letter = ['A', 'B', 'C', 'D'][idx]
        record.set('correct_option', letter)

        record.set('explanation', q.explicacao)
        record.set('theme', q.tema)
        record.set('difficulty', q.nivel)
        record.set('suggested_grade', q.serie)
        record.set('external_id', q.id)

        app.save(record)
      }
    }
  },
  (app) => {
    const idsToRemove = []
    for (let i = 51; i <= 100; i++) {
      idsToRemove.push(i)
    }

    for (const extId of idsToRemove) {
      try {
        const record = app.findFirstRecordByData('questions', 'external_id', extId)
        app.delete(record)
      } catch (_) {
        // Ignore if not found
      }
    }
  },
)
