class RecintosZoo {

    constructor() {
        this.animais = {
            LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };

        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const recintosViaveis = [];

        this.recintos.forEach((recinto) => {
            const espacoOcupado = recinto.animais.reduce((total, a) => {
                let espacoAdicional = 0;

                if (a.quantidade > 1) {
                    espacoAdicional = 1;
                }

                return total + (this.animais[a.especie].tamanho * a.quantidade) + espacoAdicional;
            }, 0);

            const espacoDisponivel = recinto.tamanho - espacoOcupado;

            if (biomas.includes(recinto.bioma) && espacoDisponivel >= tamanho * quantidade) {
                if (carnivoro && recinto.animais.some(a => this.animais[a.especie].carnivoro && a.especie !== animal)) {
                    return;
                }

                if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio" && recinto.animais.length > 0) {
                    return;
                }

                if (animal === "MACACO" && recinto.animais.length === 0 && quantidade < 2) {
                    return;
                }

                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - (tamanho * quantidade)} total: ${recinto.tamanho})`);
            }
        });

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo };