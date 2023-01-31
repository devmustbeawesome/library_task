<template>
    <ul>
        <li v-for="book in props.books">
            {{ book.name }}
        </li>
    </ul>
    {{ countBooks }}
</template>

<script setup>
    const props = defineProps(['books'])
    const countBooks = computed(()=>props.books.length)
</script>