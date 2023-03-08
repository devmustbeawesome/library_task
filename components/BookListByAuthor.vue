<template>
    <ul>
        <li v-for="[key, book] in books" :key="key">
            {{ book }}
        </li>
    </ul>
    <button @click="$emit('reload')">обновить</button>
</template>

<script setup>
defineProps(['books'])
defineEmits(['reload'])
</script>
