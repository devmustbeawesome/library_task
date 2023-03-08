<template>
    <div class="modal-open" @click="activeModal = true">открыть окно</div>
    <MyModal v-model:active="activeModal" :able-close="true">
        <template #header> Добавить автора </template>
        <template #content>
            <form @submit.prevent="submit">
                <label>Имя</label>
                <MyInput v-model="form.name"></MyInput>
                <label>Фамилия</label>
                <MyInput v-model="form.surname"></MyInput>
                <label>Дата рождения</label>
                <MyInput v-model="form.birth"></MyInput>
                <label>Язык</label>
                <MySelect v-model="form.lang_id" :list="langList">
                    <template #default="{ spanValue }">
                        <span>
                            {{ spanValue }}
                        </span>
                    </template>
                </MySelect>
                <label>Страна</label>
                <MySelect v-model="form.county_id" :list="countryList">
                    <template #default="{ spanValue }">
                        <span>
                            {{ spanValue }}
                        </span>
                    </template>
                </MySelect>
            </form>
        </template>
        <template #footer>
            <button @click="submit">Добавить</button>
            <button @click="activeModal = false">Отмена</button>
        </template>
    </MyModal>
    <button @click="reloadLangs()">test</button>
</template>

<script setup lang="ts">
import type { FetchError } from 'ofetch'
import { useStorage } from '@vueuse/core'
import type Lang from '@/types/lang'
import type Country from '@/types/country'
import type ResponseSimple from '@/types/responseSimple'

const form = reactive({
    name: '',
    surname: '',
    birth: '',
    county_id: '',
    lang_id: '',
})
const activeModal = ref(false)
const langData = useStorage('lang-list', {
    data: [] as Lang[],
    timestamp: 0,
})
const countryData = useStorage('country-list', {
    data: [] as Country[],
    timestamp: 0,
})
const langList = langData.value.data?.reduce((newMap, el) => {
    newMap.set(el.id, el.name)
    return newMap
}, new Map<number, string>())

const countryList = countryData.value.data?.reduce((newMap, el) => {
    newMap.set(el.id, el.name)
    return newMap
}, new Map<number, string>())
onMounted(async () => {
    if (langData.value.timestamp + 3600 < Date.now() / 1000) {
        await reloadLangs()
    }
    if (countryData.value.timestamp + 3600 < Date.now() / 1000) {
        await reloadCountries()
    }
})

async function reloadLangs() {
    await getLangList()
    langData.value.data = langListRes.value ?? []
    langData.value.timestamp = Date.now() / 1000
}
async function reloadCountries() {
    await getCountryList()
    countryData.value.data = countryListRes.value ?? []
    countryData.value.timestamp = Date.now() / 1000
}
const {
    data: langListRes,
    // pending: pendingGetLangList,
    // error: errorGetLangList,
    execute: getLangList,
} = await useAsyncData<Lang[], FetchError>(
    'langs',
    async () => {
        return (
            await $fetch<ResponseSimple<Lang[]>>(
                'https://analog.armdl.tech/api/languages',
                { method: 'get' }
            )
        ).data
    },
    {
        server: false,
    }
)
const {
    data: countryListRes,
    // pending: pendingGetCountryList,
    // error: errorGetCountryList,
    execute: getCountryList,
} = await useAsyncData<Country[], FetchError>(
    'countries',
    async () => {
        return (
            await $fetch<ResponseSimple<Lang[]>>(
                'https://analog.armdl.tech/api/countries',
                { method: 'get' }
            )
        ).data
    },
    {
        server: false,
    }
)
function submit() {
    console.log(form)
}

// async function submit() {
//     await addAuthor();
//     console.log(resultAddAuthor)
// }
// const {
//     data: resultAddAuthor,
//     pending: pendingaddAuthor,
//     error: erroraddAuthor,
//     execute: addAuthor,
// } = await useAsyncData<Author, FetchError>(
//     'add_author',
//     async () => {
//         return (
//             await $fetch<ResponseSimple<Author>>(
//                 'https://analog.armdl.tech/api/authors',
//                 { method: 'post', body: form }
//             )
//         ).data
//     },
//     {
//         server: false,
//     }
// )
</script>
