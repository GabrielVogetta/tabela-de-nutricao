import {supabase} from '../services/supabase';

const supabaseApi = {
    getPatients: async () => {
        const res = await supabase.from('tabela-de-nutricao').select();
        return res;
    },
    
    insertPatient: async (name, weight, height, bmi) => {
        const res = await supabase
        .from('tabela-de-nutricao')
        .insert([
            {name, weight, height, bmi}
        ])

        return res;
    },

    deletePatient: async (id) => {
        const res = await supabase
        .from('tabela-de-nutricao')
        .delete()
        .match({ id: id });

        return res;
    },

    updatePatient: async (id, name, weight, height, bmi) => {
        const res = await supabase
        .from('tabela-de-nutricao')
        .update({
            name,
            weight,
            height,
            bmi: bmi
        })
        .match({ id: id })

        return res;
    }
}

export default supabaseApi;