migrate(
  (app) => {
    const questions = [
      {
        id: 101,
        tema: 'Fontes de Energia',
        pergunta: 'O que caracteriza uma fonte de energia RENOVÁVEL?',
        alternativas: [
          'É aquela que se esgota rapidamente na natureza, como o petróleo.',
          'É aquela que se regenera naturalmente em um curto período de tempo, como o sol e o vento.',
          'É aquela que polui muito o meio ambiente.',
          'É aquela que só pode ser usada uma vez.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Fontes renováveis são aquelas que a natureza repõe constantemente e em pouco tempo, como a luz do sol, a força dos ventos e a água dos rios.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 102,
        tema: 'Fontes de Energia',
        pergunta: 'O petróleo, o carvão mineral e o gás natural são exemplos de:',
        alternativas: [
          'Energias limpas e renováveis.',
          'Combustíveis fósseis (fontes não renováveis).',
          'Biocombustíveis.',
          'Energia geotérmica.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Combustíveis fósseis levaram milhões de anos para se formar a partir de restos orgânicos. Eles são finitos (não renováveis) e altamente poluentes.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 103,
        tema: 'Placas Tectônicas',
        pergunta:
          'A Teoria das Placas Tectônicas explica não apenas os terremotos, mas também a formação de:',
        alternativas: [
          'Nuvens de chuva.',
          'Fósseis de dinossauros.',
          'Cadeias de montanhas, como o Himalaia.',
          'Florestas tropicais.',
        ],
        resposta_correta: 'C',
        explicacao:
          'O movimento convergente (choque) das placas tectônicas faz a crosta terrestre se dobrar e se erguer, formando grandes cordilheiras como o Himalaia.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 104,
        tema: 'Limites Tectônicos',
        pergunta:
          'A falha de San Andreas, na Califórnia (EUA), é famosa por causar terremotos. Ela é um exemplo de limite transformante. O que as placas fazem nesse tipo de limite?',
        alternativas: [
          'Elas se afastam uma da outra.',
          'Elas batem de frente.',
          'Elas deslizam lateralmente (roçam) uma na outra.',
          'Elas afundam no núcleo.',
        ],
        resposta_correta: 'C',
        explicacao:
          'Em limites transformantes, as placas não colidem nem se afastam, mas deslizam lateralmente uma contra a outra, gerando muito atrito e fortes terremotos.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 105,
        tema: 'Vulcanismo',
        pergunta:
          'Quando um vulcão entra em erupção, ele pode liberar uma nuvem mortal de cinzas, pedras e gases superaquecidos que desce a montanha em alta velocidade. Como é chamado esse fenômeno?',
        alternativas: [
          'Chuva de meteoros.',
          'Fluxo piroclástico.',
          'Tornado de fogo.',
          'Inversão térmica.',
        ],
        resposta_correta: 'B',
        explicacao:
          'O fluxo piroclástico é uma mistura letal de gases tóxicos, cinzas e rochas superaquecidas que desce o vulcão a centenas de quilômetros por hora.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 106,
        tema: 'Camadas da Atmosfera',
        pergunta:
          'A atmosfera protege a Terra de detritos espaciais. Em qual camada da atmosfera a maioria dos meteoros (estrelas cadentes) queima e se desintegra devido ao atrito?',
        alternativas: ['Troposfera.', 'Estratosfera.', 'Mesosfera.', 'Exosfera.'],
        resposta_correta: 'C',
        explicacao:
          'A mesosfera é a camada do meio e a mais fria. Apesar do frio, o atrito do ar nessa camada é suficiente para incendiar e desintegrar a maioria dos meteoros.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 107,
        tema: 'Ozônio Troposférico',
        pergunta:
          'O gás ozônio (O3) é benéfico quando está na estratosfera (camada de ozônio). Mas o que acontece quando há excesso de ozônio na TROPOSFERA (perto do chão), gerado pela poluição dos carros?',
        alternativas: [
          'Ele melhora a respiração.',
          'Ele se torna um gás poluente e tóxico, causando irritação nos olhos e problemas respiratórios.',
          'Ele refresca a cidade.',
          'Ele vira água.',
        ],
        resposta_correta: 'B',
        explicacao:
          'O ozônio é bom na estratosfera (filtra UV), mas na troposfera (nível do solo) ele é um poluente tóxico formado pela reação da luz solar com a fumaça dos carros.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 108,
        tema: 'Pressão e Ebulição',
        pergunta:
          'A pressão atmosférica afeta o ponto de fervura da água. No alto de uma montanha (onde a pressão é menor), a água ferve a uma temperatura:',
        alternativas: [
          'Maior que 100 °C.',
          'Menor que 100 °C.',
          'Exatamente a 100 °C.',
          'A água não ferve em montanhas.',
        ],
        resposta_correta: 'B',
        explicacao:
          "Como a pressão atmosférica 'empurra' a água, uma pressão menor (no alto da montanha) facilita a evaporação, fazendo a água ferver a menos de 100 °C.",
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 109,
        tema: 'Sismologia',
        pergunta:
          'Um sismógrafo registra as ondas de um terremoto em um papel ou tela de computador. Como é chamado o gráfico gerado por esse aparelho?',
        alternativas: ['Eletrocardiograma.', 'Sismograma.', 'Holograma.', 'Termograma.'],
        resposta_correta: 'B',
        explicacao:
          'O sismograma é o registro em papel ou digital (o gráfico com linhas em zigue-zague) produzido pelo sismógrafo durante um tremor de terra.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 110,
        tema: 'Geologia Oceânica',
        pergunta: "O que é a 'Fossa das Marianas'?",
        alternativas: [
          'O vulcão mais alto do mundo.',
          'O ponto mais profundo dos oceanos, formado no encontro de placas tectônicas.',
          'Uma cratera na Lua.',
          'Um rio subterrâneo no Brasil.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A Fossa das Marianas é o local mais profundo dos oceanos (cerca de 11 km de profundidade), formada por uma zona de subducção de placas tectônicas.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 111,
        tema: 'Qualidade do Ar',
        pergunta:
          'A qualidade do ar é medida por estações de monitoramento. Qual índice é frequentemente divulgado nos jornais para informar se o ar está bom ou ruim para a saúde?',
        alternativas: [
          'Índice de Massa Corporal (IMC).',
          'Índice de Qualidade do Ar (IQA).',
          'Índice de Desenvolvimento Humano (IDH).',
          'Produto Interno Bruto (PIB).',
        ],
        resposta_correta: 'B',
        explicacao:
          'O Índice de Qualidade do Ar (IQA) traduz a concentração de poluentes em uma escala de cores e números, indicando se o ar está bom, regular ou péssimo.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 112,
        tema: 'Gases Tóxicos',
        pergunta:
          'O monóxido de carbono (CO) é um gás incolor e inodoro liberado na queima incompleta de combustíveis. Por que ele é extremamente perigoso em ambientes fechados?',
        alternativas: [
          'Porque ele causa explosões.',
          'Porque ele se liga à hemoglobina do sangue, impedindo o transporte de oxigênio e causando asfixia.',
          'Porque ele congela os pulmões.',
          'Porque ele corrói a pele.',
        ],
        resposta_correta: 'B',
        explicacao:
          "O monóxido de carbono (CO) tem alta afinidade com o sangue. Ele 'ocupa o lugar' do oxigênio nas hemácias, causando asfixia silenciosa e morte.",
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 113,
        tema: 'Chuva Ácida',
        pergunta:
          "A 'Chuva Ácida' é um problema ambiental sério. Ela ocorre quando gases poluentes (como dióxido de enxofre) se misturam com a umidade do ar. Qual é uma consequência da chuva ácida?",
        alternativas: [
          'Ela faz as plantas crescerem mais rápido.',
          'Ela purifica a água dos rios.',
          'Ela corrói monumentos, danifica florestas e acidifica lagos, matando peixes.',
          'Ela clareia as nuvens.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A chuva ácida altera o pH da água e do solo, matando plantas e peixes, além de corroer estruturas de metal e estátuas de mármore nas cidades.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 114,
        tema: 'Terrário',
        pergunta:
          'Em um terrário, a luz do Sol (ou de uma lâmpada) é essencial. Sem luz, qual processo vital as plantas deixariam de realizar, causando o colapso do ecossistema fechado?',
        alternativas: ['Transpiração.', 'Fotossíntese.', 'Decomposição.', 'Germinação.'],
        resposta_correta: 'B',
        explicacao:
          'A fotossíntese depende da energia luminosa para transformar CO2 e água em alimento (glicose) e oxigênio. Sem luz, a planta morre e o terrário entra em colapso.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 115,
        tema: 'Força Elástica',
        pergunta:
          'A força elástica é a força que surge quando deformamos um material flexível. Qual objeto do dia a dia funciona baseado na força elástica?',
        alternativas: [
          'Um ímã.',
          'Uma mola ou um elástico.',
          'Uma roda de madeira.',
          'Um espelho.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Molas e elásticos, quando esticados ou comprimidos, exercem uma força elástica que tenta fazê-los voltar ao seu formato original.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 116,
        tema: 'Massa e Peso',
        pergunta:
          "A força da gravidade atrai os objetos para o centro da Terra. Essa força nos dá a sensação de 'peso'. Se você viajar para a Lua (onde a gravidade é menor), o que acontece com a sua massa e o seu peso?",
        alternativas: [
          'A massa diminui e o peso aumenta.',
          'A massa permanece a mesma, mas o peso diminui.',
          'A massa aumenta e o peso zera.',
          'Ambos permanecem iguais.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A massa (quantidade de matéria) nunca muda. Mas o peso (Força = Massa x Gravidade) diminui na Lua porque a gravidade lunar é 6 vezes menor que a da Terra.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 117,
        tema: 'Sistemas de Polias',
        pergunta:
          'Um guindaste de construção civil consegue levantar toneladas de cimento usando um motor relativamente pequeno. Qual máquina simples, usada em conjunto (várias delas), permite essa multiplicação de força no guindaste?',
        alternativas: [
          'Cunha.',
          'Parafuso.',
          'Sistema de polias móveis (moitão).',
          'Plano inclinado.',
        ],
        resposta_correta: 'C',
        explicacao:
          'O moitão (associação de várias polias móveis) divide o peso da carga várias vezes, permitindo que o motor do guindaste levante toneladas com pouca força.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 118,
        tema: 'Engrenagens',
        pergunta:
          'As marchas (engrenagens) de uma bicicleta ajudam o ciclista a subir ladeiras com menos esforço. Como as engrenagens da bicicleta são conectadas?',
        alternativas: [
          'Por uma corda de nylon.',
          'Por uma corrente de metal.',
          'Por ímãs.',
          'Por elásticos.',
        ],
        resposta_correta: 'B',
        explicacao:
          'As marchas da bicicleta são engrenagens (coroas e catracas) conectadas por uma corrente de metal, que transmite a força do pedal para a roda traseira.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 119,
        tema: 'Calorimetria',
        pergunta: 'O calorímetro é um aparelho usado em laboratórios. Para que ele serve?',
        alternativas: [
          'Para medir a quantidade de calor trocada entre os corpos.',
          'Para medir a força do vento.',
          'Para medir a pressão atmosférica.',
          'Para medir a umidade do solo.',
        ],
        resposta_correta: 'A',
        explicacao:
          'O calorímetro é um recipiente termicamente isolado usado na Física para medir as trocas de calor entre substâncias colocadas em seu interior.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 120,
        tema: 'Trocas de Calor',
        pergunta:
          'Quando colocamos gelo em um copo de suco quente, o gelo derrete e o suco esfria. O que aconteceu termicamente?',
        alternativas: [
          'O gelo passou o seu frio para o suco.',
          'O suco transferiu calor para o gelo, fazendo-o derreter, enquanto o suco perdeu energia e esfriou.',
          'O copo de vidro absorveu todo o calor.',
          'O ar ao redor congelou o suco.',
        ],
        resposta_correta: 'B',
        explicacao:
          'O calor sempre flui do mais quente para o mais frio. O suco quente perdeu energia térmica (calor) para o gelo. O gelo usou essa energia para derreter.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 121,
        tema: 'Dilatação Térmica',
        pergunta:
          'A dilatação térmica pode causar problemas em construções. Por isso, pontes e trilhos de trem possuem pequenos espaços vazios entre suas partes. Como se chamam esses espaços?',
        alternativas: [
          'Juntas de expansão (ou dilatação).',
          'Falhas geológicas.',
          'Valas de ar.',
          'Roldanas de segurança.',
        ],
        resposta_correta: 'A',
        explicacao:
          'As juntas de dilatação são espaços deixados de propósito para que o concreto ou metal possa se expandir no calor sem rachar ou entortar a estrutura.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 122,
        tema: 'Evaporação e Calor',
        pergunta: 'Por que sentimos frio quando saímos molhados da piscina em um dia de vento?',
        alternativas: [
          'Porque a água da piscina é radioativa.',
          "Porque a água em nosso corpo evapora, e para evaporar ela 'rouba' calor da nossa pele.",
          'Porque o vento congela a água instantaneamente.',
          'Porque a água bloqueia os poros.',
        ],
        resposta_correta: 'B',
        explicacao:
          "A evaporação é um processo que absorve calor. A água sobre a pele 'rouba' o calor do nosso corpo para evaporar, e o vento acelera esse processo, causando frio.",
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 123,
        tema: 'Energia Geotérmica',
        pergunta: "O que é a 'Energia Geotérmica'?",
        alternativas: [
          'Energia gerada pela força das marés.',
          'Energia gerada pelo calor proveniente do interior da Terra (magma).',
          'Energia gerada por painéis solares.',
          'Energia gerada pela queima de lixo.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A energia geotérmica aproveita o calor intenso do interior da Terra (magma/gêiseres) para aquecer água, gerar vapor e movimentar turbinas elétricas.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 124,
        tema: 'Máquinas Térmicas',
        pergunta:
          "A geladeira é uma máquina térmica que funciona 'ao contrário', pois ela retira calor de onde está frio (dentro) e joga para onde está quente (fora). O que ela usa para fazer isso?",
        alternativas: [
          'Um motor elétrico e um gás refrigerante (fluido).',
          'Blocos de gelo colocados na fábrica.',
          'Pequenos ventiladores apenas.',
          'Energia nuclear.',
        ],
        resposta_correta: 'A',
        explicacao:
          'A geladeira usa um motor (compressor) para circular um gás refrigerante. Esse gás absorve o calor dos alimentos dentro e o libera na grade preta atrás da geladeira.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 125,
        tema: 'Biocombustíveis',
        pergunta: "O que é o 'Biogás'?",
        alternativas: [
          'Um gás venenoso encontrado em vulcões.',
          'Um combustível renovável produzido a partir da decomposição de matéria orgânica (lixo, fezes de animais).',
          'Um gás usado para encher balões de festa.',
          'O mesmo que gás de cozinha (GLP) extraído do petróleo.',
        ],
        resposta_correta: 'B',
        explicacao:
          'O biogás é produzido pela fermentação de matéria orgânica (lixo, esterco) em biodigestores, gerando gás metano que pode ser queimado para gerar energia.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 126,
        tema: 'Eficiência Energética',
        pergunta:
          'O uso de lâmpadas de LED nas casas é uma medida de eficiência energética. Por que o LED é melhor que a antiga lâmpada incandescente?',
        alternativas: [
          'Porque o LED esquenta muito mais.',
          'Porque o LED consome muito menos energia elétrica para iluminar a mesma quantidade, pois desperdiça menos energia em forma de calor.',
          'Porque o LED é feito de ouro.',
          'Porque o LED só funciona de dia.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Lâmpadas incandescentes transformam 90% da eletricidade em calor e só 10% em luz. O LED é muito mais eficiente, pois foca em gerar luz, quase sem esquentar.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 127,
        tema: 'Eficiência Energética',
        pergunta:
          'O que significa o selo Procel (aquele adesivo com letras de A a G) colado nos eletrodomésticos?',
        alternativas: [
          'Indica a cor do aparelho.',
          "Indica a eficiência energética do aparelho, sendo 'A' o mais eficiente e econômico.",
          'Indica o tamanho do motor.',
          'Indica a validade do produto.',
        ],
        resposta_correta: 'B',
        explicacao:
          "O selo Procel orienta o consumidor. Aparelhos com a letra 'A' consomem menos energia para realizar o mesmo trabalho, ajudando a economizar na conta de luz.",
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 128,
        tema: 'Ecossistemas',
        pergunta:
          'Qual é o bioma brasileiro conhecido por sua vegetação adaptada à seca e que abrange boa parte do Nordeste?',
        alternativas: ['Amazônia.', 'Mata Atlântica.', 'Caatinga.', 'Pampa.'],
        resposta_correta: 'C',
        explicacao:
          'A Caatinga é um bioma exclusivamente brasileiro, caracterizado por um clima semiárido e plantas xerófitas (que armazenam água e têm espinhos).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 129,
        tema: 'Ecossistemas',
        pergunta: "Manguezais são considerados 'berçários' da vida marinha. Por quê?",
        alternativas: [
          'Porque possuem muitas ondas fortes.',
          'Porque a água doce dos rios e a salgada do mar se encontram lá, oferecendo um ambiente protegido e rico em nutrientes para a reprodução de várias espécies.',
          'Porque não há predadores nesses locais.',
          'Porque a água é congelada.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A mistura de água doce e salgada e a grande quantidade de matéria orgânica fazem dos manguezais locais perfeitos para peixes e crustáceos se reproduzirem em segurança.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 130,
        tema: 'Efeito Estufa',
        pergunta: 'O Efeito Estufa é um fenômeno natural ou causado exclusivamente pelo homem?',
        alternativas: [
          'É totalmente causado pelo ser humano devido às indústrias.',
          'É um fenômeno natural que mantém a Terra aquecida, mas que está sendo intensificado de forma perigosa pela ação humana.',
          'É um fenômeno que resfria a Terra.',
          'Não existe Efeito Estufa.',
        ],
        resposta_correta: 'B',
        explicacao:
          'O Efeito Estufa natural é vital para a vida na Terra. No entanto, a emissão excessiva de gases (como o CO2) pela queima de combustíveis fósseis intensificou esse efeito, causando o aquecimento global.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 131,
        tema: 'Desmatamento',
        pergunta: 'Como o desmatamento contribui para o aumento do aquecimento global?',
        alternativas: [
          'Ao remover as árvores, aumenta-se a quantidade de vento frio.',
          'As árvores absorvem CO2 durante a fotossíntese. Menos árvores significam mais CO2 acumulado na atmosfera, retendo mais calor.',
          'As árvores produzem gases estufa, então o desmatamento deveria esfriar a Terra.',
          'O desmatamento não afeta o clima global.',
        ],
        resposta_correta: 'B',
        explicacao:
          "As florestas funcionam como 'sumidouros' de carbono. Sem elas, o dióxido de carbono que elas absorveriam permanece na atmosfera, intensificando o Efeito Estufa.",
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 132,
        tema: 'Ciclo da Água',
        pergunta:
          'A transpiração das plantas, especialmente em grandes florestas como a Amazônica, libera vapor de água para a atmosfera, formando os chamados:',
        alternativas: ['Rios voadores.', 'Tornados.', 'Rios subterrâneos.', 'Geiseres.'],
        resposta_correta: 'A',
        explicacao:
          "A umidade liberada pela floresta forma massas de ar carregadas de vapor d'água, conhecidas como 'rios voadores', que viajam pelo continente e levam chuva para outras regiões.",
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 133,
        tema: 'Energia Solar',
        pergunta:
          'Os painéis solares fotovoltaicos convertem a luz do Sol em qual tipo de energia?',
        alternativas: [
          'Energia térmica apenas.',
          'Energia elétrica.',
          'Energia nuclear.',
          'Energia cinética.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Os painéis fotovoltaicos possuem células feitas de materiais como o silício, que absorvem a luz solar e geram uma corrente elétrica (energia elétrica).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 134,
        tema: 'Energia Eólica',
        pergunta: 'Qual é a principal desvantagem da energia eólica?',
        alternativas: [
          'Ela emite muita fumaça tóxica.',
          'Ela consome muita água.',
          'Ela depende da força dos ventos, que não é constante o tempo todo.',
          'Os aerogeradores (cataventos) são muito silenciosos.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A intermitência dos ventos é o principal desafio da energia eólica. Quando não há vento suficiente, os aerogeradores não produzem eletricidade.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 135,
        tema: 'Camada de Ozônio',
        pergunta:
          "O que causou o aparecimento do 'buraco' na Camada de Ozônio, especialmente sobre a Antártida?",
        alternativas: [
          'O aumento da temperatura dos oceanos.',
          'O uso excessivo de gases CFC (clorofluorcarbonos), antes usados em aerossóis e geladeiras.',
          'A erupção contínua de vulcões.',
          'O lançamento de foguetes espaciais.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Os gases CFCs, quando liberados, sobem até a estratosfera e destroem as moléculas de ozônio (O3), afinando essa camada protetora essencial contra os raios UV.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 136,
        tema: 'Atmosfera e Clima',
        pergunta:
          'Em dias de inversão térmica (comum no inverno em cidades grandes), o que acontece com a poluição?',
        alternativas: [
          'Ela é levada rapidamente pelos ventos.',
          "Uma camada de ar quente fica sobre o ar frio (perto do solo), 'tampando' a poluição na cidade.",
          'A poluição é congelada e cai como neve.',
          'A poluição se transforma em ar puro.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Na inversão térmica, o ar frio (mais denso) fica aprisionado perto da superfície por uma camada de ar quente acima dele. Isso impede a dispersão dos poluentes, formando uma névoa tóxica (smog).',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 137,
        tema: 'Vigilância Epidemiológica',
        pergunta:
          'Doenças como a dengue são fortemente influenciadas pelo clima e pelas condições do ambiente (acúmulo de água limpa e parada). O mosquito transmissor é o:',
        alternativas: ['Anopheles.', 'Aedes aegypti.', 'Culex.', 'Barbeiro.'],
        resposta_correta: 'B',
        explicacao:
          'O Aedes aegypti é o vetor da dengue, Zika e chikungunya. Ele se prolifera em locais urbanos com água parada.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 138,
        tema: 'Máquinas Simples',
        pergunta:
          'Um machado cortando lenha funciona com base no princípio de qual máquina simples?',
        alternativas: ['Roda e eixo.', 'Polia fixa.', 'Cunha.', 'Alavanca interfixa.'],
        resposta_correta: 'C',
        explicacao:
          'A cunha é um tipo de plano inclinado em movimento. Ela concentra a força aplicada em uma área pequena (a lâmina) para afastar as partes do material, cortando a lenha.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 139,
        tema: 'Alavancas',
        pergunta:
          'Em um carrinho de mão, a carga (peso) fica entre o ponto de apoio (a roda) e o local onde fazemos a força (os cabos). Qual tipo de alavanca é essa?',
        alternativas: ['Interfixa.', 'Inter-resistente.', 'Interpotente.', 'Super-resistente.'],
        resposta_correta: 'B',
        explicacao:
          'É uma alavanca inter-resistente, pois a resistência (carga) está no meio, entre o apoio e a força potente, multiplicando a força do usuário.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 140,
        tema: 'Calor e Temperatura',
        pergunta: 'Calor e temperatura são a mesma coisa?',
        alternativas: [
          'Sim, são termos sinônimos na Física.',
          'Não. Calor é a energia em trânsito entre corpos, enquanto a temperatura mede o grau de agitação das partículas.',
          'Não. Calor é medido em graus Celsius e a temperatura em Joules.',
          'Sim, ambos medem a quantidade de frio de um corpo.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Temperatura é a medida da energia cinética média das moléculas. Calor é a energia térmica sendo transferida devido a uma diferença de temperatura.',
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 141,
        tema: 'Propagação do Calor',
        pergunta:
          'O Sol aquece a Terra através do vácuo espacial. Qual é a forma de propagação desse calor?',
        alternativas: [
          'Condução.',
          'Convecção.',
          'Irradiação (ou Radiação Térmica).',
          'Sublimação.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A irradiação térmica se dá por ondas eletromagnéticas (infravermelho) que não precisam de um meio material (como o ar ou água) para se propagar.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 142,
        tema: 'Convecção Térmica',
        pergunta: 'Por que o ar condicionado deve ser instalado na parte alta das paredes?',
        alternativas: [
          'Por estética apenas.',
          'Porque o ar frio (mais denso) desce, e o ar quente (menos denso) sobe, criando correntes de convecção que resfriam o ambiente por inteiro.',
          'Para evitar que as crianças alcancem os botões.',
          'Porque o teto absorve o calor.',
        ],
        resposta_correta: 'B',
        explicacao:
          'O ar frio sai do aparelho, desce (por ser mais pesado), empurrando o ar quente da sala para cima, onde será resfriado pelo aparelho, criando a convecção.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 143,
        tema: 'Condução Térmica',
        pergunta:
          'Por que a maioria das panelas é feita de metal (como alumínio ou aço), mas os cabos são de madeira ou plástico?',
        alternativas: [
          'O metal é bom condutor de calor, facilitando o cozimento. A madeira/plástico são isolantes térmicos, protegendo as mãos de queimaduras.',
          'A madeira conduz calor melhor que o metal.',
          'O plástico acelera o cozimento do alimento.',
          'Não há razão, é apenas para ficar bonito.',
        ],
        resposta_correta: 'A',
        explicacao:
          'Metais permitem que a energia térmica flua rapidamente para o alimento. Isolantes (plástico/madeira) evitam que o calor chegue facilmente à mão de quem cozinha.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 144,
        tema: 'Energia Hidrelétrica',
        pergunta:
          'As usinas hidrelétricas produzem a maior parte da energia no Brasil. Elas utilizam qual tipo de energia potencial para gerar eletricidade?',
        alternativas: [
          'Energia potencial elástica.',
          'Energia potencial química.',
          'Energia potencial gravitacional da água represada.',
          'Energia luminosa da água.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A água represada em um nível alto possui energia potencial gravitacional. Ao cair pelos dutos, essa energia vira cinética e gira as turbinas do gerador.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 145,
        tema: 'Saneamento Básico',
        pergunta:
          'O tratamento de esgoto é fundamental para a saúde pública e para o meio ambiente. O que acontece com a matéria orgânica no esgoto durante o tratamento biológico nas ETEs?',
        alternativas: [
          'Ela é vaporizada instantaneamente com lasers.',
          'Ela é decomposta por bactérias e outros microrganismos em tanques de aeração.',
          'Ela é compactada e transformada em carvão.',
          'Ela é congelada e enviada para aterros no polo norte.',
        ],
        resposta_correta: 'B',
        explicacao:
          "Nas Estações de Tratamento de Esgoto (ETEs), usam-se bactérias que 'comem' a matéria orgânica, purificando a água antes de ser devolvida aos rios.",
        nivel: 'Difícil',
        serie: '7º Ano',
      },
      {
        id: 146,
        tema: 'Reciclagem',
        pergunta:
          'A cor das lixeiras recicláveis é padrão. Em qual cor devemos descartar latas de refrigerante e embalagens de metal limpas?',
        alternativas: ['Azul.', 'Vermelho.', 'Amarelo.', 'Verde.'],
        resposta_correta: 'C',
        explicacao:
          'No padrão internacional, Amarelo é para metais, Azul para papel/papelão, Vermelho para plástico e Verde para vidro.',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 147,
        tema: 'Poluição dos Oceanos',
        pergunta:
          "As 'Ilhas de Plástico' nos oceanos são formadas por toneladas de lixo. Por que o plástico é um problema tão grave no mar?",
        alternativas: [
          'Porque ele dissolve em poucos dias na água salgada, envenenando-a.',
          'Porque ele leva centenas de anos para se decompor e se transforma em microplásticos que são ingeridos pelos animais marinhos.',
          'Porque o plástico atrai raios no mar.',
          'Porque ele aumenta muito a temperatura da água rapidamente.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A lenta decomposição gera microplásticos. Esses pequenos fragmentos entram na cadeia alimentar marinha, causando a morte de animais e chegando até os humanos.',
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 148,
        tema: 'Desastres Naturais',
        pergunta:
          'Deslizamentos de terra em encostas de morros são frequentes na época de chuvas fortes no Brasil. O que costuma agravar esse risco em áreas urbanas?',
        alternativas: [
          'A pavimentação das ruas e o plantio de grama.',
          'O desmatamento das encostas para a construção irregular de casas, deixando o solo sem a proteção das raízes.',
          'O uso de energia eólica nos topos dos morros.',
          'A presença de minhocas no solo.',
        ],
        resposta_correta: 'B',
        explicacao:
          "As raízes das árvores 'seguram' a terra e ajudam a absorver a água da chuva. Sem vegetação, a água encharca o solo nu, tornando-o pesado e propenso a deslizar.",
        nivel: 'Médio',
        serie: '7º Ano',
      },
      {
        id: 149,
        tema: 'Estrutura da Terra',
        pergunta:
          'Qual é a camada mais interna do nosso planeta, formada principalmente por ferro e níquel sob pressões e temperaturas extremas?',
        alternativas: [
          'Manto terrestre.',
          'Crosta oceânica.',
          'Litosfera.',
          'Núcleo terrestre (interno e externo).',
        ],
        resposta_correta: 'D',
        explicacao:
          'O núcleo é a região central da Terra, composto majoritariamente por ligas de ferro e níquel, sendo dividido em núcleo externo (líquido) e interno (sólido).',
        nivel: 'Fácil',
        serie: '7º Ano',
      },
      {
        id: 150,
        tema: 'Fósseis',
        pergunta: 'O estudo dos fósseis é muito importante para a Ciência. Por quê?',
        alternativas: [
          'Porque eles ajudam a prever o clima do próximo século com precisão.',
          'Porque são as únicas fontes de combustíveis fósseis que existem hoje.',
          'Porque revelam como eram as formas de vida do passado e ajudam a entender a evolução dos seres vivos e as mudanças do planeta.',
          'Porque podem ser transformados em animais vivos de novo.',
        ],
        resposta_correta: 'C',
        explicacao:
          "Fósseis são registros (ossos, pegadas, plantas preservadas) que funcionam como 'fotografias' do passado, permitindo aos cientistas reconstruir a história da vida na Terra.",
        nivel: 'Médio',
        serie: '7º Ano',
      },
    ]

    const col = app.findCollectionByNameOrId('questions')

    for (const q of questions) {
      try {
        app.findFirstRecordByData('questions', 'external_id', q.id)
      } catch (_) {
        const record = new Record(col)
        record.set('external_id', q.id)
        record.set('statement', q.pergunta)
        record.set('option_a', q.alternativas[0])
        record.set('option_b', q.alternativas[1])
        record.set('option_c', q.alternativas[2])
        record.set('option_d', q.alternativas[3])
        record.set('correct_option', q.resposta_correta)
        record.set('explanation', q.explicacao)
        record.set('theme', q.tema)
        record.set('difficulty', q.nivel)
        record.set('suggested_grade', q.serie)
        app.save(record)
      }
    }
  },
  (app) => {
    for (let id = 101; id <= 150; id++) {
      try {
        const record = app.findFirstRecordByData('questions', 'external_id', id)
        app.delete(record)
      } catch (_) {
        // ignore
      }
    }
  },
)
