import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await db.collection('maison_a_vendre').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        const data = await db.collection('maison_a_vendre').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return {};
    }
}

export async function getNom(nomMaison) {
    try {
        const data = await db.collection('maison_a_vendre').getFullList({
            filter: `nomMaison = "${nomMaison}"`
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en créant la maison', error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await db.collection('maison_a_vendre').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    try {
        const data = await db.collection('maison_a_vendre').getFullList({
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons par prix', error);
        return [];
    }
}

export async function getAgents() {
    try {
        let data = await db.collection('agent').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        const data = await db.collection('agent').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant l\'agent', error);
        return {};
    }
}

export async function getOffresByAgent(agentId) {
    try {
        const data = await db.collection('maison_a_vendre').getFullList({
            filter: `agent = "${agentId}"`
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les offres de l\'agent', error);
        return [];
    }
}