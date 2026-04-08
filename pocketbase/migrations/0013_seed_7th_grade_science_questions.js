migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('questions')

    const questions = [
      {
        tema: 'Placas Tectônicas',
        pergunta:
          'A litosfera terrestre não é uma peça única, mas sim dividida em grandes blocos rochosos que se movem lentamente. Como são chamados esses blocos?',
        alternativas: [
          'Continentes flutuantes.',
          'Placas tectônicas.',
          'Geleiras continentais.',
          'Falhas geológicas.',
        ],
        resposta_correta: 'Placas tectônicas.',
        explicacao:
          'A litosfera (crosta + parte superior do manto) é fragmentada em várias placas tectônicas que flutuam e se movem sobre a astenosfera.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Deriva Continental',
        pergunta:
          'A Teoria da Deriva Continental, proposta por Alfred Wegener, afirma que no passado todos os continentes estavam unidos em um único supercontinente. Qual era o nome desse supercontinente?',
        alternativas: ['Laurásia.', 'Gondwana.', 'Atlântida.', 'Pangeia.'],
        resposta_correta: 'Pangeia.',
        explicacao:
          "Pangeia (do grego 'toda a terra') foi o supercontinente que existiu há milhões de anos antes de se fragmentar na configuração atual.",
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Deriva Continental',
        pergunta:
          'Qual das alternativas abaixo é uma evidência que apoia a Teoria da Deriva Continental?',
        alternativas: [
          'O formato perfeitamente esférico da Terra.',
          'O encontro de fósseis da mesma espécie em continentes hoje separados por oceanos.',
          'A existência de gelo nos polos.',
          'A cor azul dos oceanos vista do espaço.',
        ],
        resposta_correta:
          'O encontro de fósseis da mesma espécie em continentes hoje separados por oceanos.',
        explicacao:
          'Fósseis de animais e plantas idênticos encontrados no Brasil e na África, por exemplo, provam que esses continentes já estiveram colados.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Camadas da Terra',
        pergunta:
          'As placas tectônicas deslizam sobre uma camada do manto terrestre que é muito quente e de consistência pastosa/maleável. Qual é o nome dessa camada?',
        alternativas: ['Crosta.', 'Núcleo interno.', 'Astenosfera.', 'Troposfera.'],
        resposta_correta: 'Astenosfera.',
        explicacao:
          'A astenosfera é a camada logo abaixo da litosfera. Por ser muito quente, as rochas têm comportamento plástico, permitindo o deslizamento das placas.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Movimentos Tectônicos',
        pergunta:
          'Quando duas placas tectônicas se afastam uma da outra, criando uma fenda por onde o magma sobe, dizemos que ocorre um movimento:',
        alternativas: ['Convergente.', 'Divergente.', 'Transformante.', 'Deslizante.'],
        resposta_correta: 'Divergente.',
        explicacao:
          'O movimento divergente ocorre quando as placas se separam. O magma sobe pela fenda, esfria e forma nova crosta (como as dorsais oceânicas).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Movimentos Tectônicos',
        pergunta:
          'O choque (colisão) entre duas placas tectônicas, onde uma mergulha sob a outra, é chamado de movimento convergente. O que esse movimento pode formar ao longo de milhões de anos?',
        alternativas: [
          'Planícies e desertos.',
          'Cadeias de montanhas (dobramentos).',
          'Rios e lagos.',
          'O buraco na camada de ozônio.',
        ],
        resposta_correta: 'Cadeias de montanhas (dobramentos).',
        explicacao:
          'Quando duas placas colidem (convergência), a enorme pressão dobra e ergue a crosta terrestre, formando grandes cordilheiras, como os Andes e o Himalaia.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Terremotos',
        pergunta:
          'Os terremotos são tremores na superfície da Terra. Qual é a principal causa geológica da maioria dos terremotos?',
        alternativas: [
          'O impacto de meteoritos na crosta.',
          'A atração gravitacional da Lua.',
          'A liberação repentina de energia acumulada pelo atrito e movimento das placas tectônicas.',
          'O aquecimento global.',
        ],
        resposta_correta:
          'A liberação repentina de energia acumulada pelo atrito e movimento das placas tectônicas.',
        explicacao:
          'O atrito entre as placas acumula muita tensão. Quando essa energia é liberada de uma vez, gera as ondas sísmicas que chamamos de terremoto.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Terremotos no Brasil',
        pergunta: 'Por que o Brasil raramente registra terremotos de grande magnitude?',
        alternativas: [
          'Porque o Brasil está localizado exatamente no centro da Placa Sul-Americana, longe das bordas onde ocorrem os choques.',
          'Porque o solo brasileiro é feito de borracha natural.',
          'Porque o Brasil não possui vulcões.',
          'Porque a Floresta Amazônica absorve os tremores.',
        ],
        resposta_correta:
          'Porque o Brasil está localizado exatamente no centro da Placa Sul-Americana, longe das bordas onde ocorrem os choques.',
        explicacao:
          'O Brasil está situado no interior (centro) da Placa Sul-Americana, longe das bordas tectônicas, onde os grandes choques e atritos ocorrem.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Tsunamis',
        pergunta:
          'Tsunamis são ondas gigantes e destrutivas. Como a maioria dos tsunamis é formada?',
        alternativas: [
          'Por furacões muito fortes no meio do oceano.',
          'Pelo derretimento rápido das geleiras.',
          'Por terremotos ou erupções vulcânicas que ocorrem no fundo do oceano.',
          'Pela atração das marés durante a Lua Cheia.',
        ],
        resposta_correta: 'Por terremotos ou erupções vulcânicas que ocorrem no fundo do oceano.',
        explicacao:
          'Terremotos de grande magnitude no fundo do mar movimentam abruptamente a coluna de água acima, gerando as ondas gigantes dos tsunamis.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Vulcanismo',
        pergunta:
          'O magma que atinge a superfície da Terra durante uma erupção vulcânica muda de nome. Como ele passa a ser chamado?',
        alternativas: ['Cinza vulcânica.', 'Rocha sedimentar.', 'Lava.', 'Geiser.'],
        resposta_correta: 'Lava.',
        explicacao:
          'Magma é a rocha derretida no interior da Terra. Quando ele é expelido para a superfície por um vulcão, passa a ser chamado de lava.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Sismologia',
        pergunta:
          'Qual instrumento os cientistas utilizam para detectar, medir e registrar as ondas sísmicas geradas por um terremoto?',
        alternativas: ['Barômetro.', 'Sismógrafo.', 'Anemômetro.', 'Telescópio.'],
        resposta_correta: 'Sismógrafo.',
        explicacao:
          'O sismógrafo é o aparelho ultrassensível que detecta e registra as vibrações do solo (ondas sísmicas), gerando um gráfico chamado sismograma.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Geologia',
        pergunta:
          'A região do Oceano Pacífico que concentra a maior parte dos vulcões ativos e terremotos do mundo é conhecida como:',
        alternativas: [
          'Triângulo das Bermudas.',
          'Círculo de Fogo do Pacífico.',
          'Fossa das Marianas.',
          'Dorsal Mesoatlântica.',
        ],
        resposta_correta: 'Círculo de Fogo do Pacífico.',
        explicacao:
          'O Círculo de Fogo do Pacífico é uma vasta área em formato de ferradura no Oceano Pacífico, famosa por sua intensa atividade sísmica e vulcânica.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Desastres Naturais',
        pergunta:
          'Deslizamentos de terra em encostas são eventos que podem se tornar grandes desastres. Qual ação humana agrava o risco de deslizamentos?',
        alternativas: [
          'O reflorestamento de morros.',
          'A construção de parques urbanos.',
          'O desmatamento e a construção irregular em áreas de encosta.',
          'A reciclagem de lixo.',
        ],
        resposta_correta: 'O desmatamento e a construção irregular em áreas de encosta.',
        explicacao:
          'Retirar a vegetação (que segura o solo com as raízes) e construir casas em morros desestabiliza o terreno, causando desmoronamentos nas chuvas.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Atmosfera',
        pergunta:
          'A atmosfera é a camada de gases que envolve a Terra. Qual é o gás mais abundante na nossa atmosfera?',
        alternativas: ['Gás Oxigênio.', 'Gás Carbônico.', 'Gás Nitrogênio.', 'Vapor de água.'],
        resposta_correta: 'Gás Nitrogênio.',
        explicacao:
          'O gás nitrogênio compõe cerca de 78% da atmosfera terrestre, seguido pelo oxigênio (21%) e outros gases (1%).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Camadas da Atmosfera',
        pergunta:
          'Em qual camada da atmosfera ocorrem os principais fenômenos meteorológicos, como chuvas, ventos e formação de nuvens?',
        alternativas: ['Estratosfera.', 'Mesosfera.', 'Troposfera.', 'Exosfera.'],
        resposta_correta: 'Troposfera.',
        explicacao:
          'A troposfera é a camada mais baixa, onde vivemos e onde há a maior concentração de gases e vapor de água, permitindo a formação do clima.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Camada de Ozônio',
        pergunta:
          "A camada de ozônio é um 'escudo' natural da Terra. Qual é a sua principal função?",
        alternativas: [
          'Reter o oxigênio para não escapar para o espaço.',
          'Filtrar a radiação ultravioleta (UV) nociva emitida pelo Sol.',
          'Impedir a queda de meteoros.',
          'Controlar a força dos ventos.',
        ],
        resposta_correta: 'Filtrar a radiação ultravioleta (UV) nociva emitida pelo Sol.',
        explicacao:
          'A camada de ozônio (O3), localizada na estratosfera, absorve a maior parte da radiação ultravioleta (UV) do Sol, que é nociva aos seres vivos.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Impactos Ambientais',
        pergunta:
          'Qual grupo de substâncias químicas, muito usado no passado em aerossóis e geladeiras, foi o principal responsável pela destruição da camada de ozônio?',
        alternativas: [
          'CFCs (Clorofluorcarbonetos).',
          'H2O (Água).',
          'CO2 (Gás Carbônico).',
          'NaCl (Cloreto de Sódio).',
        ],
        resposta_correta: 'CFCs (Clorofluorcarbonetos).',
        explicacao:
          "Os Clorofluorcarbonetos (CFCs) reagem com o ozônio, quebrando suas moléculas e criando 'buracos' na camada protetora.",
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Pressão Atmosférica',
        pergunta:
          'A pressão atmosférica é a força que o ar exerce sobre a superfície. O que acontece com a pressão atmosférica à medida que subimos uma montanha muito alta?',
        alternativas: [
          'A pressão aumenta.',
          'A pressão diminui.',
          'A pressão permanece a mesma.',
          'A pressão se transforma em vácuo.',
        ],
        resposta_correta: 'A pressão diminui.',
        explicacao:
          'Quanto maior a altitude, menor é a quantidade (coluna) de ar acima de nós, resultando em uma pressão atmosférica menor.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Altitude e Respiração',
        pergunta:
          "Em grandes altitudes, o ar se torna 'rarefeito'. O que isso significa para o corpo humano?",
        alternativas: [
          'Significa que o ar está mais puro e fácil de respirar.',
          'Significa que há menos moléculas de oxigênio disponíveis em cada respiração, causando cansaço e falta de ar.',
          'Significa que o ar está muito quente.',
          'Significa que a gravidade parou de funcionar.',
        ],
        resposta_correta:
          'Significa que há menos moléculas de oxigênio disponíveis em cada respiração, causando cansaço e falta de ar.',
        explicacao:
          'Ar rarefeito significa que as moléculas de gás (incluindo o oxigênio) estão mais espalhadas, dificultando a respiração e a oxigenação do sangue.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Saúde e Altitude',
        pergunta:
          "O 'Mal da Montanha' é um conjunto de sintomas (dor de cabeça, tontura, náusea) sentido por pessoas que viajam para locais muito altos. Isso ocorre devido à:",
        alternativas: [
          'Excesso de oxigênio no cérebro.',
          'Baixa pressão atmosférica e menor disponibilidade de oxigênio.',
          'Intoxicação alimentar.',
          'Exposição a gases vulcânicos.',
        ],
        resposta_correta: 'Baixa pressão atmosférica e menor disponibilidade de oxigênio.',
        explicacao:
          'A falta de oxigênio (hipóxia) devido ao ar rarefeito em grandes altitudes causa reações no corpo como dor de cabeça, cansaço e náuseas.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Qualidade do Ar',
        pergunta:
          'A qualidade do ar em grandes cidades costuma ser pior do que em áreas rurais. Qual é a principal fonte de poluição do ar nos centros urbanos?',
        alternativas: [
          'A respiração das plantas.',
          'A evaporação da água dos rios.',
          'A emissão de gases por veículos automotores e indústrias.',
          'O uso de energia solar e eólica.',
        ],
        resposta_correta: 'A emissão de gases por veículos automotores e indústrias.',
        explicacao:
          'A queima de combustíveis fósseis (gasolina, diesel) por carros, caminhões e chaminés industriais libera muitos poluentes atmosféricos.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Efeito Estufa',
        pergunta:
          'O efeito estufa é um fenômeno natural importante, mas tem sido intensificado pela ação humana. Qual é a sua principal função natural?',
        alternativas: [
          'Manter a Terra aquecida em temperaturas adequadas para a vida.',
          'Resfriar o planeta durante a noite.',
          'Bloquear os raios ultravioleta.',
          'Produzir oxigênio para a respiração.',
        ],
        resposta_correta: 'Manter a Terra aquecida em temperaturas adequadas para a vida.',
        explicacao:
          'Gases como o CO2 retêm parte do calor do Sol, evitando que a Terra congele. É o aumento excessivo desses gases que causa o aquecimento global.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Aquecimento Global',
        pergunta:
          'Qual das seguintes atividades humanas mais contribui para o aumento artificial do efeito estufa (aquecimento global)?',
        alternativas: [
          'O plantio de árvores em áreas desmatadas.',
          'O uso de bicicletas e transporte público.',
          'A queima de combustíveis fósseis, como carvão e petróleo.',
          'A reciclagem de papel e plástico.',
        ],
        resposta_correta: 'A queima de combustíveis fósseis, como carvão e petróleo.',
        explicacao:
          'A queima desses combustíveis libera grandes quantidades de gás carbônico (CO2), o principal gás responsável pelo aumento do efeito estufa.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Ventos',
        pergunta:
          'O vento é o ar em movimento. Qual é a principal causa natural da formação dos ventos?',
        alternativas: [
          'A rotação da Lua ao redor da Terra.',
          'O aquecimento desigual da superfície terrestre pelo Sol.',
          'As correntes oceânicas profundas.',
          'A gravidade terrestre puxando o ar para baixo.',
        ],
        resposta_correta: 'O aquecimento desigual da superfície terrestre pelo Sol.',
        explicacao:
          'O Sol aquece algumas regiões mais do que outras. O ar quente sobe (baixa pressão) e o ar frio desce para ocupar o espaço (alta pressão), criando correntes de vento.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Brisa litorânea',
        pergunta:
          'Durante o dia, na praia, o vento costuma soprar do mar para a terra (brisa marítima). Por que isso acontece?',
        alternativas: [
          'Porque a terra se aquece mais rápido que a água, fazendo o ar subir e puxar o ar mais frio do mar.',
          'Porque as ondas empurram o vento para a areia.',
          'Porque a água do mar ferve durante o dia.',
          'Porque a terra esfria mais rápido que o mar.',
        ],
        resposta_correta:
          'Porque a terra se aquece mais rápido que a água, fazendo o ar subir e puxar o ar mais frio do mar.',
        explicacao:
          'A areia (sólido) tem menor calor específico que a água e esquenta mais rápido. O ar acima dela sobe, e o ar mais fresco do mar vem ocupar o lugar.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Máquinas Simples',
        pergunta: 'O que é uma máquina simples na Física?',
        alternativas: [
          'Um dispositivo eletrônico complexo com motor.',
          'Qualquer dispositivo que altera a força ou a direção do movimento para facilitar um trabalho.',
          'Um robô de inteligência artificial.',
          'Uma ferramenta usada apenas na agricultura.',
        ],
        resposta_correta:
          'Qualquer dispositivo que altera a força ou a direção do movimento para facilitar um trabalho.',
        explicacao:
          'Máquinas simples, como alavancas, roldanas e planos inclinados, mudam a magnitude ou direção de uma força, exigindo menos esforço para realizar uma tarefa.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Alavancas',
        pergunta: 'Qual das opções abaixo é um exemplo clássico de alavanca interfixa?',
        alternativas: ['Um carrinho de mão.', 'Uma tesoura.', 'Uma pinça.', 'Uma vassoura.'],
        resposta_correta: 'Uma tesoura.',
        explicacao:
          'Na tesoura, o ponto de apoio (eixo central) fica entre a força potente (onde os dedos apertam) e a força resistente (o papel sendo cortado).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Alavancas',
        pergunta:
          'Em um carrinho de mão, a carga (resistência) fica entre a roda (ponto de apoio) e os braços de quem empurra (força potente). Esse é um exemplo de alavanca:',
        alternativas: ['Interfixa.', 'Interpotente.', 'Inter-resistente.', 'Inclinada.'],
        resposta_correta: 'Inter-resistente.',
        explicacao:
          'Alavancas onde a resistência (carga) fica no meio, entre o ponto de apoio e a força aplicada, são chamadas de inter-resistentes.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Plano Inclinado',
        pergunta:
          'Qual máquina simples é representada por uma rampa usada para empurrar cadeiras de rodas ou cargas pesadas para cima?',
        alternativas: ['Roldana.', 'Alavanca.', 'Plano inclinado.', 'Parafuso.'],
        resposta_correta: 'Plano inclinado.',
        explicacao:
          'A rampa é um plano inclinado. Ela aumenta a distância percorrida, mas diminui significativamente a força necessária para elevar o objeto.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Parafuso',
        pergunta:
          'Um parafuso é, na verdade, uma aplicação de qual outra máquina simples envolta em um cilindro?',
        alternativas: ['Roda e eixo.', 'Alavanca.', 'Plano inclinado.', 'Cunha.'],
        resposta_correta: 'Plano inclinado.',
        explicacao:
          'A rosca do parafuso é um plano inclinado em espiral ao redor de um cilindro, transformando movimento de rotação em força de avanço.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Cunha',
        pergunta:
          'Um machado ou uma faca usada para cortar madeira ou alimentos funciona com base em qual máquina simples?',
        alternativas: ['Cunha.', 'Roldana.', 'Alavanca.', 'Engrenagem.'],
        resposta_correta: 'Cunha.',
        explicacao:
          'A cunha é formada por dois planos inclinados unidos. Ela converte uma força aplicada na base em forças laterais, separando o material.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Roldanas',
        pergunta:
          'Uma roldana fixa (polia) presa no teto não diminui o peso de um objeto que está sendo erguido. Qual é, então, a sua vantagem?',
        alternativas: [
          'Ela multiplica a força aplicada por dois.',
          'Ela muda apenas a direção da força, permitindo puxar a corda para baixo em vez de levantar o peso para cima.',
          'Ela reduz a gravidade no objeto.',
          'Ela elimina o atrito completamente.',
        ],
        resposta_correta:
          'Ela muda apenas a direção da força, permitindo puxar a corda para baixo em vez de levantar o peso para cima.',
        explicacao:
          'Roldanas fixas apenas alteram a direção da força (é mais fácil usar o peso do corpo puxando para baixo), sem vantagem mecânica (multiplicação de força).',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Roldanas',
        pergunta:
          'Se você usar uma roldana móvel juntamente com uma fixa para levantar um balde de 20 kg, a força que você precisará fazer equivalerá a levantar quantos quilos (desconsiderando atritos)?',
        alternativas: ['20 kg.', '40 kg.', '10 kg.', '5 kg.'],
        resposta_correta: '10 kg.',
        explicacao:
          'Cada roldana móvel divide a força necessária pela metade. Com uma móvel, a força para erguer 20 kg será equivalente a erguer 10 kg.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Engrenagens',
        pergunta:
          'Em uma bicicleta, as catracas e coroas conectadas por uma corrente funcionam baseadas em rodas dentadas. Como chamamos essas rodas que transmitem movimento?',
        alternativas: ['Cunhas.', 'Engrenagens.', 'Polias simples.', 'Alavancas interfixas.'],
        resposta_correta: 'Engrenagens.',
        explicacao:
          'As engrenagens são rodas dentadas que se encaixam (diretamente ou por corrente) para transmitir movimento e força entre eixos rotativos.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Calor e Temperatura',
        pergunta: "Na ciência, calor e temperatura não são a mesma coisa. O que é 'temperatura'?",
        alternativas: [
          'É a energia que passa de um corpo para outro.',
          'É a medida do grau de agitação (energia cinética) das partículas de um corpo.',
          'É a quantidade de suor que o corpo produz.',
          'É a mesma coisa que sensação térmica.',
        ],
        resposta_correta:
          'É a medida do grau de agitação (energia cinética) das partículas de um corpo.',
        explicacao:
          'Temperatura mede a velocidade (agitação) das moléculas. Quanto mais agitadas, maior a temperatura do corpo.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Calor e Temperatura',
        pergunta: "E o que é 'calor' no conceito físico?",
        alternativas: [
          'É a sensação de estar suando no verão.',
          'É a temperatura alta de um ambiente.',
          'É a energia térmica em trânsito (transferência) de um corpo mais quente para um mais frio.',
          'É a medida em graus Celsius de um objeto.',
        ],
        resposta_correta:
          'É a energia térmica em trânsito (transferência) de um corpo mais quente para um mais frio.',
        explicacao:
          'Calor é a energia térmica fluindo espontaneamente do corpo de maior temperatura para o de menor temperatura, até que entrem em equilíbrio.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Escalas Termométricas',
        pergunta:
          'No Brasil, usamos a escala Celsius para medir a temperatura. Qual é a escala termométrica adotada como padrão internacional (SI) pelos cientistas?',
        alternativas: ['Fahrenheit.', 'Celsius.', 'Kelvin.', 'Joule.'],
        resposta_correta: 'Kelvin.',
        explicacao:
          "A escala Kelvin é o padrão no Sistema Internacional de Unidades (SI). Ela não possui valores negativos e inicia no 'zero absoluto'.",
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Escalas Termométricas',
        pergunta: "O que representa o 'Zero Absoluto' na escala Kelvin (0 K)?",
        alternativas: [
          'A temperatura em que a água congela.',
          'A temperatura mais quente possível no universo.',
          'O estado onde teoricamente cessa toda a agitação molecular (menor energia possível).',
          'A temperatura média no inverno na Antártida.',
        ],
        resposta_correta:
          'O estado onde teoricamente cessa toda a agitação molecular (menor energia possível).',
        explicacao:
          'O zero absoluto (-273,15 °C) é o limite inferior da temperatura, onde as partículas estariam completamente paradas.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Propagação de Calor',
        pergunta:
          'Existem três formas de propagação de calor. Como se chama a transferência de calor que ocorre através do contato direto entre as partículas de um material sólido?',
        alternativas: ['Convecção.', 'Irradiação.', 'Condução.', 'Vaporização.'],
        resposta_correta: 'Condução.',
        explicacao:
          'A condução ocorre principalmente em sólidos. Uma partícula aquecida vibra e transmite energia para a partícula vizinha (ex: segurar uma barra de metal no fogo).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Propagação de Calor',
        pergunta:
          'O calor do Sol viaja pelo espaço sideral, onde não há ar (vácuo), até chegar à Terra. Qual forma de propagação de calor permite isso?',
        alternativas: ['Condução.', 'Convecção.', 'Irradiação (Radiação).', 'Isolamento.'],
        resposta_correta: 'Irradiação (Radiação).',
        explicacao:
          'A irradiação é a única forma de propagação de calor que ocorre por ondas eletromagnéticas e, portanto, consegue viajar pelo vácuo.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Propagação de Calor',
        pergunta:
          'Quando aquecemos água numa panela, a água quente sobe e a fria desce, criando correntes circulares. Qual é o nome dessa propagação de calor típica dos fluidos (líquidos e gases)?',
        alternativas: ['Condução.', 'Convecção.', 'Irradiação.', 'Fricção.'],
        resposta_correta: 'Convecção.',
        explicacao:
          'A convecção ocorre quando o fluido aquece, fica menos denso (mais leve) e sobe, enquanto o fluido mais frio desce, formando correntes de convecção.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Materiais Térmicos',
        pergunta:
          'Materiais que dificultam a passagem do calor são chamados de isolantes térmicos. Qual das opções abaixo é um bom isolante térmico?',
        alternativas: ['Cobre.', 'Alumínio.', 'Isopor.', 'Ferro.'],
        resposta_correta: 'Isopor.',
        explicacao:
          'Isopor, lã, madeira e plástico são isolantes, pois não permitem que o calor se propague com facilidade através deles. Os metais são bons condutores.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Sensação Térmica',
        pergunta:
          'Ao pisar descalço num tapete e num piso de cerâmica no mesmo ambiente, a cerâmica parece mais fria. Isso ocorre porque:',
        alternativas: [
          'A cerâmica está numa temperatura muito menor que o tapete.',
          'A cerâmica é um isolante e repele o frio.',
          'A cerâmica é melhor condutora de calor do que o tapete e rouba calor do nosso pé mais rapidamente.',
          'O tapete produz seu próprio calor através dos pelos.',
        ],
        resposta_correta:
          'A cerâmica é melhor condutora de calor do que o tapete e rouba calor do nosso pé mais rapidamente.',
        explicacao:
          'Os dois estão na mesma temperatura ambiente. Como a cerâmica conduz calor melhor (o tapete é isolante), o corpo perde calor para ela mais rápido, causando a sensação de frio.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Pressão Atmosférica',
        pergunta:
          'Se você tentar ferver água no topo do Monte Everest, ela entrará em ebulição (ferverá) a uma temperatura maior ou menor do que 100 °C (temperatura ao nível do mar)?',
        alternativas: [
          'Menor que 100 °C, pois a pressão atmosférica é mais baixa.',
          'Maior que 100 °C, pois o ar lá é muito frio.',
          'A mesma temperatura (100 °C).',
          'A água não ferve no Everest.',
        ],
        resposta_correta: 'Menor que 100 °C, pois a pressão atmosférica é mais baixa.',
        explicacao:
          'Com a pressão atmosférica mais baixa em grandes altitudes, as moléculas de água precisam de menos energia para escapar na forma de gás, fervendo a menos de 100 °C (cerca de 70 °C no Everest).',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Alavancas',
        pergunta:
          'Em uma pinça de sobrancelha, a força que aplicamos com os dedos fica no meio, entre o ponto de apoio (união das hastes) e a resistência (o fio puxado). Essa é uma alavanca:',
        alternativas: ['Interfixa.', 'Inter-resistente.', 'Interpotente.', 'Neutra.'],
        resposta_correta: 'Interpotente.',
        explicacao:
          'Quando a força (potência) é aplicada entre o ponto de apoio e a carga (resistência), a alavanca é interpotente. Exemplos: pinça e o braço humano.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        tema: 'Materiais Térmicos',
        pergunta:
          'Qual material a seguir é considerado um excelente condutor térmico, sendo amplamente usado em panelas?',
        alternativas: ['Borracha.', 'Alumínio.', 'Madeira.', 'Plástico.'],
        resposta_correta: 'Alumínio.',
        explicacao:
          'Os metais, como o alumínio e o cobre, têm elétrons livres que facilitam a rápida transferência de calor por condução.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Equilíbrio Térmico',
        pergunta:
          'Quando colocamos um cubo de gelo em um copo com água quente, após algum tempo, toda a mistura atinge uma única temperatura intermediária. Como se chama esse estado?',
        alternativas: [
          'Congelamento instantâneo.',
          'Equilíbrio térmico.',
          'Convecção forçada.',
          'Zero absoluto.',
        ],
        resposta_correta: 'Equilíbrio térmico.',
        explicacao:
          'O equilíbrio térmico é atingido quando corpos de temperaturas diferentes trocam calor até alcançarem a mesma temperatura.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Atmosfera',
        pergunta:
          'Qual gás atmosférico é essencial para a respiração de animais e plantas e também é responsável pela combustão (fogo)?',
        alternativas: ['Gás Carbônico.', 'Gás Metano.', 'Gás Nitrogênio.', 'Gás Oxigênio.'],
        resposta_correta: 'Gás Oxigênio.',
        explicacao:
          'O oxigênio (O2) é fundamental para o processo de respiração celular aeróbica e atua como o comburente necessário para que o fogo exista.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        tema: 'Qualidade do Ar',
        pergunta:
          "Um fenômeno causado pela poluição do ar nas cidades é a 'inversão térmica', que agrava os problemas respiratórios no inverno. O que acontece na inversão térmica?",
        alternativas: [
          'O sol fica bloqueado pelas nuvens por meses.',
          'Uma camada de ar quente estaciona sobre a cidade, prendendo uma camada de ar frio e poluído próximo ao solo.',
          'Os poluentes derretem as antenas de celular.',
          'O ar quente sobe muito rápido, causando furacões.',
        ],
        resposta_correta:
          'Uma camada de ar quente estaciona sobre a cidade, prendendo uma camada de ar frio e poluído próximo ao solo.',
        explicacao:
          'Normalmente, o ar quente perto do solo sobe, dissipando poluentes. Na inversão, uma camada superior quente bloqueia a subida do ar frio da superfície, prendendo a poluição.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        tema: 'Máquinas Simples',
        pergunta:
          'Qual foi uma das invenções mais antigas da humanidade, baseada no princípio de eixos e rolamentos, que revolucionou o transporte terrestre?',
        alternativas: ['A asa-delta.', 'A roda.', 'O motor a vapor.', 'O paraquedas.'],
        resposta_correta: 'A roda.',
        explicacao:
          'A roda conectada a um eixo é uma máquina simples (roda e eixo) fundamental que reduziu o atrito e permitiu o transporte eficiente de cargas pesadas.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
    ]

    for (const q of questions) {
      try {
        app.findFirstRecordByData('questions', 'statement', q.pergunta)
      } catch (_) {
        const record = new Record(collection)
        record.set('statement', q.pergunta)
        record.set('option_a', q.alternativas[0])
        record.set('option_b', q.alternativas[1])
        record.set('option_c', q.alternativas[2])
        record.set('option_d', q.alternativas[3])

        const correctIndex = q.alternativas.indexOf(q.resposta_correta)
        const correctLetter = ['A', 'B', 'C', 'D'][correctIndex]
        record.set('correct_option', correctLetter)

        record.set('explanation', q.explicacao)
        record.set('theme', q.tema)
        record.set('difficulty', q.nivel)
        record.set('suggested_grade', '7º Ano')

        app.save(record)
      }
    }
  },
  (app) => {
    const statements = [
      'A litosfera terrestre não é uma peça única, mas sim dividida em grandes blocos rochosos que se movem lentamente. Como são chamados esses blocos?',
      'A Teoria da Deriva Continental, proposta por Alfred Wegener, afirma que no passado todos os continentes estavam unidos em um único supercontinente. Qual era o nome desse supercontinente?',
      'Qual das alternativas abaixo é uma evidência que apoia a Teoria da Deriva Continental?',
      'As placas tectônicas deslizam sobre uma camada do manto terrestre que é muito quente e de consistência pastosa/maleável. Qual é o nome dessa camada?',
      'Quando duas placas tectônicas se afastam uma da outra, criando uma fenda por onde o magma sobe, dizemos que ocorre um movimento:',
      'O choque (colisão) entre duas placas tectônicas, onde uma mergulha sob a outra, é chamado de movimento convergente. O que esse movimento pode formar ao longo de milhões de anos?',
      'Os terremotos são tremores na superfície da Terra. Qual é a principal causa geológica da maioria dos terremotos?',
      'Por que o Brasil raramente registra terremotos de grande magnitude?',
      'Tsunamis são ondas gigantes e destrutivas. Como a maioria dos tsunamis é formada?',
      'O magma que atinge a superfície da Terra durante uma erupção vulcânica muda de nome. Como ele passa a ser chamado?',
      'Qual instrumento os cientistas utilizam para detectar, medir e registrar as ondas sísmicas geradas por um terremoto?',
      'A região do Oceano Pacífico que concentra a maior parte dos vulcões ativos e terremotos do mundo é conhecida como:',
      'Deslizamentos de terra em encostas são eventos que podem se tornar grandes desastres. Qual ação humana agrava o risco de deslizamentos?',
      'A atmosfera é a camada de gases que envolve a Terra. Qual é o gás mais abundante na nossa atmosfera?',
      'Em qual camada da atmosfera ocorrem os principais fenômenos meteorológicos, como chuvas, ventos e formação de nuvens?',
      "A camada de ozônio é um 'escudo' natural da Terra. Qual é a sua principal função?",
      'Qual grupo de substâncias químicas, muito usado no passado em aerossóis e geladeiras, foi o principal responsável pela destruição da camada de ozônio?',
      'A pressão atmosférica é a força que o ar exerce sobre a superfície. O que acontece com a pressão atmosférica à medida que subimos uma montanha muito alta?',
      "Em grandes altitudes, o ar se torna 'rarefeito'. O que isso significa para o corpo humano?",
      "O 'Mal da Montanha' é um conjunto de sintomas (dor de cabeça, tontura, náusea) sentido por pessoas que viajam para locais muito altos. Isso ocorre devido à:",
      'A qualidade do ar em grandes cidades costuma ser pior do que em áreas rurais. Qual é a principal fonte de poluição do ar nos centros urbanos?',
      'O efeito estufa é um fenômeno natural importante, mas tem sido intensificado pela ação humana. Qual é a sua principal função natural?',
      'Qual das seguintes atividades humanas mais contribui para o aumento artificial do efeito estufa (aquecimento global)?',
      'O vento é o ar em movimento. Qual é a principal causa natural da formação dos ventos?',
      'Durante o dia, na praia, o vento costuma soprar do mar para a terra (brisa marítima). Por que isso acontece?',
      'O que é uma máquina simples na Física?',
      'Qual das opções abaixo é um exemplo clássico de alavanca interfixa?',
      'Em um carrinho de mão, a carga (resistência) fica entre a roda (ponto de apoio) e os braços de quem empurra (força potente). Esse é um exemplo de alavanca:',
      'Qual máquina simples é representada por uma rampa usada para empurrar cadeiras de rodas ou cargas pesadas para cima?',
      'Um parafuso é, na verdade, uma aplicação de qual outra máquina simples envolta em um cilindro?',
      'Um machado ou uma faca usada para cortar madeira ou alimentos funciona com base em qual máquina simples?',
      'Uma roldana fixa (polia) presa no teto não diminui o peso de um objeto que está sendo erguido. Qual é, então, a sua vantagem?',
      'Se você usar uma roldana móvel juntamente com uma fixa para levantar um balde de 20 kg, a força que você precisará fazer equivalerá a levantar quantos quilos (desconsiderando atritos)?',
      'Em uma bicicleta, as catracas e coroas conectadas por uma corrente funcionam baseadas em rodas dentadas. Como chamamos essas rodas que transmitem movimento?',
      "Na ciência, calor e temperatura não são a mesma coisa. O que é 'temperatura'?",
      "E o que é 'calor' no conceito físico?",
      'No Brasil, usamos a escala Celsius para medir a temperatura. Qual é a escala termométrica adotada como padrão internacional (SI) pelos cientistas?',
      "O que representa o 'Zero Absoluto' na escala Kelvin (0 K)?",
      'Existem três formas de propagação de calor. Como se chama a transferência de calor que ocorre através do contato direto entre as partículas de um material sólido?',
      'O calor do Sol viaja pelo espaço sideral, onde não há ar (vácuo), até chegar à Terra. Qual forma de propagação de calor permite isso?',
      'Quando aquecemos água numa panela, a água quente sobe e a fria desce, criando correntes circulares. Qual é o nome dessa propagação de calor típica dos fluidos (líquidos e gases)?',
      'Materiais que dificultam a passagem do calor são chamados de isolantes térmicos. Qual das opções abaixo é um bom isolante térmico?',
      'Ao pisar descalço num tapete e num piso de cerâmica no mesmo ambiente, a cerâmica parece mais fria. Isso ocorre porque:',
      'Se você tentar ferver água no topo do Monte Everest, ela entrará em ebulição (ferverá) a uma temperatura maior ou menor do que 100 °C (temperatura ao nível do mar)?',
      'Em uma pinça de sobrancelha, a força que aplicamos com os dedos fica no meio, entre o ponto de apoio (união das hastes) e a resistência (o fio puxado). Essa é uma alavanca:',
      'Qual material a seguir é considerado um excelente condutor térmico, sendo amplamente usado em panelas?',
      'Quando colocamos um cubo de gelo em um copo com água quente, após algum tempo, toda a mistura atinge uma única temperatura intermediária. Como se chama esse estado?',
      'Qual gás atmosférico é essencial para a respiração de animais e plantas e também é responsável pela combustão (fogo)?',
      "Um fenômeno causado pela poluição do ar nas cidades é a 'inversão térmica', que agrava os problemas respiratórios no inverno. O que acontece na inversão térmica?",
      'Qual foi uma das invenções mais antigas da humanidade, baseada no princípio de eixos e rolamentos, que revolucionou o transporte terrestre?',
    ]

    for (const statement of statements) {
      try {
        const record = app.findFirstRecordByData('questions', 'statement', statement)
        app.delete(record)
      } catch (_) {}
    }
  },
)
