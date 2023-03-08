<template>
    <h2>список книг</h2>
    <BookListByAuthor
        :books="filteredBooks"
        @reload="reloadBooks"
    ></BookListByAuthor>
    <h2>выберите автора</h2>
    <MySelect v-model="selected" :list="newAuthors" @reload="reloadAuthors">
        <template #default="{ spanValue }">
            <span>
                {{ spanValue }}
            </span>
        </template>
    </MySelect>
    <hr />
    <AddAuthorForm />
</template>

<script setup lang="ts">
import type { FetchError } from 'ofetch'
import { useStorage } from '@vueuse/core'
import AddAuthorForm from './AddAuthorForm.vue'
import type Book from '@/types/book'
import type ResponseSimple from '@/types/responseSimple'
import type Author from '@/types/author'
const selected = ref(3)
const booksData = useStorage('books-list', {
    data: [] as Book[],
    timestamp: 0,
})
const authorsData = useStorage('authors-list', {
    data: [] as Author[],
    timestamp: 0,
})

const {
    data: books,
    // pending: pendingGetBookList,
    // error: errorGetBookList,
    execute: getBookList,
} = await useAsyncData<Book[], FetchError>(
    'books',
    async () => {
        return (
            await $fetch<ResponseSimple<Book[]>>(
                'https://analog.armdl.tech/api/books',
                { method: 'get' }
            )
        ).data
    },
    {
        server: false,
    }
)
const {
    data: authors,
    // pending: pendingGetAuthorList,
    // error: errorGetAuthorList,
    execute: GetAuthorList,
} = await useAsyncData<Author[], FetchError>(
    'authors',
    async () => {
        return await (
            await $fetch<ResponseSimple<Author[]>>(
                'https://analog.armdl.tech/api/authors',
                { method: 'get' }
            )
        ).data
    },
    {
        server: false,
    }
)
onMounted(async () => {
    if (booksData.value.timestamp + 3600 < Date.now() / 1000) {
        await reloadBooks()
    }
    if (authorsData.value.timestamp + 3600 < Date.now() / 1000) {
        await reloadAuthors()
    }
})

async function reloadBooks() {
    await getBookList()
    booksData.value.data = books.value ?? []
    booksData.value.timestamp = Date.now() / 1000
}
async function reloadAuthors() {
    await GetAuthorList()
    authorsData.value.data = authors.value ?? []
    authorsData.value.timestamp = Date.now() / 1000
}
const newAuthors = authorsData.value.data?.reduce((newAuthors, el) => {
    newAuthors.set(el.id, el.name)
    return newAuthors
}, new Map<number, string>())
const filteredBooks = computed(() =>
    booksData.value.data
        ?.filter((el) => el.author_id === selected.value)
        .reduce((newBooks, el) => {
            newBooks.set(el.id, el.title)
            return newBooks
        }, new Map<number, string>())
)
</script>
<style lang="post"></style>
