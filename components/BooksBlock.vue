<template>
    <h2>список книг</h2>
    <BookListByAuthor :books="filteredBooks"></BookListByAuthor>
    <h2>выберите автора</h2>
    <!-- <AuthorsSelect :list="authors" v-model="selected">
        <template #default="{value1}">
            <span>
            {{ value1.name }}
            </span>
        </template>
    </AuthorsSelect> -->
    <MyTooltip>
        <template v-slot:label>
            label
        </template>
        <template v-slot:content>
            <div v-for="(value, index) in authors" :key="index"
                @click="selected=value.id">
                {{ value.name }}
            </div>
        </template>
    </MyTooltip>
</template>


<script setup>
// import MyTooltip from './MyTooltip.vue';

    const selected = ref(3);
    const books = reactive([
        {author_id:1, name: 'Руководство Vue 1/том 1'},
        {author_id:2, name: 'Руководство Vue 2/том 1'},
        {author_id:2, name: 'Руководство Vue 2/том 2'},
        {author_id:2, name: 'Руководство Vue 2/том 3'},
        {author_id:3, name: 'Руководство Vue 3/том 1'},
        {author_id:3, name: 'Руководство Vue 3/том 2'},
        {author_id:3, name: 'Руководство Vue 3/том 3'},
        {author_id:3, name: 'Руководство Vue 3/том 4'},
        {author_id:3, name: 'Руководство Vue 3/том 5'}
    ])
    const authors = reactive([
        {id:1, name: 'test 1'},
        {id:2, name: 'test 2'},
        {id:3, name: 'test 3'}
    ])
    const filteredBooks = computed(()=>books.filter((el)=>el.author_id == selected.value))
</script>